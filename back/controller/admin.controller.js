import pg from "../pg.js";

class AdminController {
  async getCategories(req, res) {
    const { query } = req;
    const { phone_number, password } = query;
    if (phone_number && password) {
      const employers = await pg.query(
        `SELECT * FROM employers WHERE password = '${password}' AND phone_number='${phone_number}'`
      );
      const [employer] = employers.rows;
      const { id_role } = employer;
      const categoriesQuery = await pg.query(
        `SELECT * from category_composition where id_role='${id_role}'`
      );
      const categories = categoriesQuery.rows;
      const categoriesPromises = categories.map(
        async ({ id_category }, index) => {
          const cateogryName = await pg.query(
            `SELECT * from categories WHERE id_category='${id_category}'`
          );
          const rows = cateogryName.rows;
          const [category] = rows;
          return { id: index, name: category.category_name };
        }
      );
      const categorieNames = await Promise.all(categoriesPromises);
      res.send(200, categorieNames);
      return;
    }
    res.send(400);
    return;
  }

  async updateOrderStatus(req, res) {
    const { body } = req;
    const { id_order, text } = body;
    await pg.query(
      `UPDATE "order" SET order_status=$1 WHERE id_order='${id_order}' `,
      [text]
    );
    res.send(200);
  }
}

export default new AdminController();
