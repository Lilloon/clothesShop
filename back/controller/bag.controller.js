import pg from "../pg.js";
import { v4 } from "uuid";

class BagController {
  async createBag(req, res) {
    const { id_client } = req.query;
    const id_bag = v4();
    await pg.query(
      `INSERT INTO bag (id_client, id_bag, amount, total_price) VALUES ($1, $2, $3, $4)`,
      [id_client, id_bag, 0, 0]
    );
    const bag = await pg.query(`SELECT * FROM bag WHERE id_bag = '${id_bag}'`);

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
    res.send(200, { ...bag.rows[0], items });
  }

  async getBagByBagId(req, res) {
    const bag = await pg.query(
      `SELECT * FROM bag WHERE id_bag = '${req.query.id_bag}'`
    );

    const childs = await pg.query(
      `SELECT * FROM bag_composition WHERE id_bag='${req.query.id_bag}'`
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
    res.send(200, { ...bag.rows[0], items });
  }

  async getBagByClientId(req, res) {
    const bag = await pg.query(
      `SELECT * FROM bag WHERE id_client = '${req.query.id_client}'`
    );
    if (bag.rows.length) {
      const childs = await pg.query(
        `SELECT * FROM bag_composition WHERE id_bag='${
          bag.rows[bag.rows.length - 1].id_bag
        }'`
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
        };
      });

      res.send({ ...bag.rows[bag.rows.length - 1], items });
      return;
    }
    res.send(null);
  }

  async addItemToBag(req, res) {
    const { body } = req;
    const { selected, id_bag, qty, id_parent } = body;
    const existingRow = await pg.query(
      `SELECT * FROM bag_composition WHERE id_bag='${id_bag}' AND id_child = '${selected}'`
    );
    if (existingRow.rows[0]) {
      await pg.query(
        `UPDATE bag_composition SET qty=$1 WHERE id_bag='${id_bag}' AND id_child='${selected}'`,
        [Number(existingRow.rows[0].qty) + Number(qty)]
      );
    } else {
      await pg.query(
        `INSERT INTO bag_composition (id_child, id_bag, qty) VALUES ($1, $2, $3)`,
        [selected, id_bag, qty]
      );
    }

    const oldBag = await pg.query(
      `SELECT * FROM bag WHERE id_bag='${id_bag}' `
    );
    const parentProduct = await pg.query(
      `SELECT * FROM parent_product WHERE id_product='${id_parent}' `
    );
    const oldBagRows = oldBag.rows[0];
    const { amount, total_price } = oldBagRows;
    await pg.query(`UPDATE bag SET amount=$1 WHERE id_bag='${id_bag}'`, [
      Number(amount) + Number(qty),
    ]);
    await pg.query(`UPDATE bag SET total_price=$1 WHERE id_bag='${id_bag}'`, [
      Number(total_price) + parentProduct.rows[0].price * qty,
    ]);
    res.send(200);
  }

  async deleteItemFromBag(req, res) {
    const { amount, cost, id_bag, id_child } = req.query;
    await pg.query(
      `DELETE from bag_composition WHERE id_bag='${id_bag}' AND id_child='${id_child}'`
    );
    const oldBagQuery = await pg.query(
      `SELECT * FROM bag WHERE id_bag='${id_bag}'`
    );
    const oldBag = oldBagQuery.rows[0];
    const { amount: oldQty, total_price: old_total_price } = oldBag;
    console.log(
      Number(old_total_price) - Number(cost),
      Number(oldQty) - Number(amount)
    );
    await pg.query(`UPDATE bag SET amount=$1 WHERE id_bag='${id_bag}'`, [
      Number(oldQty) - Number(amount),
    ]);
    await pg.query(`UPDATE bag SET total_price=$1 WHERE id_bag='${id_bag}'`, [
      Number(old_total_price) - Number(cost),
    ]);

    res.send(200);
  }

  async buyItems(req, res) {
    const { body } = req;
    const { id_bag } = body;
    const id_order = Math.round(Math.random() * 10000);
    const user = await pg.query(
      `SELECT id_client from bag WHERE id_bag='${id_bag}'`
    );
    const date = new Date();
    const id_client = user.rows[0].id_client;
    await pg.query(
      `INSERT INTO "order" (id_order, id_bag, id_client, order_status, order_creation_date) VALUES ($1, $2, $3, $4, $5)`,
      [id_order, id_bag, id_client, "Ожидает подтверждения", date]
    );
    res.send(200);
    return;
  }
}

export default new BagController();
