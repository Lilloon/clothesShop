import pg from "../pg.js";

class BagController {
  async getBag(req, res) {
    const popular = await pg.query("SELECT * FROM popular ORDER BY id");
    res.send(popular.rows);
  }
}

export default new BagController();
