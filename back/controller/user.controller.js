import pg from "../pg.js";
import { v4 as uuidv4 } from "uuid";

class UserController {
  async getUserById(req, res) {
    const popular = await pg.query(
      `SELECT * FROM client where id_client='${req.query.id}'`
    );
    res.send(JSON.stringify(popular.rows[0]));
  }
  async addNewUser(req, res) {
    const user = await pg.query(
      `SELECT * FROM client where phone_number = '${req.body.phone_number}'`
    );
    if (user.rows.length > 0) {
      res.send(401, "alredy exist");
      return;
    }
    await pg.query(
      `INSERT INTO client(id_client, first_name, second_name, middle_name, date_of_birth, address, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        uuidv4(),
        req.body.first_name,
        req.body.second_name,
        req.body.middle_name,
        req.body.date_of_birth,
        req.body.address,
        req.body.phone_number,
      ]
    );
    res.send("ok");
  }
  async login(req, res) {
    const { query } = req;
    const { password, phone_number } = query;
    const user = await pg.query(
      `SELECT * from client where password = '${password}' AND phone_number='${phone_number}'`
    );
    const employer = await pg.query(`
      SELECT * from employers WHERE password = '${password}' AND phone_number='${phone_number}'`);
    const { rows: userRows } = user;
    if (userRows.length) {
      res.send(200, { ...userRows[0], isEmployer: employer.rows.length > 0 });
      return;
    }
    res.send("bad :(");
    return;
  }

  async getOrders(req, res) {
    const { query } = req;
    const { id_client } = query;
    const orders = await pg.query(
      `SELECT * FROM "order" WHERE id_client='${id_client}' order by order_creation_date`
    );
    const ordersRows = orders.rows;
    const promises = ordersRows.map(
      async (item) =>
        await pg.query(
          `SELECT total_price from bag where id_bag='${item.id_bag}' `
        )
    );
    const bagsPrices = await Promise.all(promises);
    const ordersWithPrices = ordersRows.map((item, index) => ({
      ...item,
      total_price: bagsPrices[index].rows[0].total_price,
    }));
    res.send(200, { orders: ordersWithPrices.reverse() });
  }
  async getOrderDetails(req, res) {
    const { query } = req;
    const { id_order } = query;
    const order = await pg.query(
      `SELECT * from "order" WHERE id_order='${id_order}'`
    );
    const [orderRow] = order.rows;
    const { id_bag } = orderRow;
    const bag = await pg.query(`SELECT * from bag WHERE id_bag='${id_bag}'`);
    const [bagRow] = bag.rows;

    const childs = await pg.query(
      `SELECT * FROM bag_composition WHERE id_bag='${id_bag}'`
    );

    const childsPromises = childs.rows.map(async (item) => {
      const childPromise = await pg.query(
        `SELECT * FROM child_product where id_child = '${item.id_child}'`
      );
      return childPromise.rows;
    });

    const childsArr = await Promise.all(childsPromises);
    const parentsPromises = childsArr.map(async (item) => {
      const parentPromise = await pg.query(
        `SELECT * FROM parent_product where id_product = '${item[0].id_parent}'`
      );
      return parentPromise.rows;
    });
    const parentsArr = await Promise.all(parentsPromises);

    const items = childs.rows.map((item, index) => {
      return {
        amount: item.qty,
        product_name: parentsArr[index][0].product_name,
        cost: item.qty * parentsArr[index][0].price,
        size: childsArr[index][0].size,
        id_child: childsArr[index][0].id_child,
      };
    });

    res.send(200, { ...orderRow, ...bagRow, items });
    return;
  }
}

export default new UserController();
