import pg from "../pg.js";
import { v4 } from "uuid";

class BagController {
  async createBag(req, res) {
    const { id_client } = req.query;
    const id_bag = v4();
    await pg.query(
      `INSERT INTO bag (id_client, id_bag, amount, total_price, products) VALUES ($1, $2, $3, $4, $5)`,
      [id_client, id_bag, 0, 0, ""]
    );
    res.send(200, id_bag);
  }

  async getBagByBagId(req, res) {
    const bag = await pg.query(
      `SELECT * FROM bag WHERE id_bag = '${req.query.id_bag}'`
    );
    res.send(bag.rows[0]);
  }

  async getBagByClientId(req, res) {
    const bag = await pg.query(
      `SELECT * FROM bag WHERE id_client = '${req.query.id_client}'`
    );
    console.log(bag.rows);
    res.send(bag.rows[bag.rows.length - 1]);
  }
}

export default new BagController();
