import pg from "../pg.js";

const weight = {
  xs: -1,
  s: 0,
  m: 1,
  l: 2,
  xl: 3,
  xll: 4,
  xlll: 5,
  xllll: 6,
};

class ProductsController {
  async getAllProducts(req, res) {
    const popular = await pg.query(
      "SELECT * FROM parent_product ORDER BY product_name"
    );
    res.send(popular.rows);
  }

  async getChilds(req, res) {
    const { id_product } = req.query;
    const childs = await pg.query(
      `Select * from child_product WHERE id_parent = '${id_product}'`
    );
    const sortedChilds = childs.rows.sort((a, b) => {
      if (weight[a.size] > weight[b.size]) {
        return 1;
      }
      if (weight[a.size] < weight[b.size]) {
        return -1;
      }
      return 0;
    });
    res.send(200, sortedChilds);
    return;
  }
}

export default new ProductsController();
