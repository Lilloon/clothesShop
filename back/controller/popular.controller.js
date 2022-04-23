import pg from "../pg.js";

class PopularController {
  async getPopular(req, res) {
    const popular = await pg.query("SELECT * FROM popular ORDER BY id");
    res.send(popular.rows);
  }
}

export default new PopularController();
