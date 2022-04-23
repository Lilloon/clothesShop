import pg from "../pg.js";

const additionalCategoties = {
  product: {
    table: "material",
    fields: ["id_material", "material_name"],
  },
};

class CategoryController {
  async getCategoryPage(req, res) {
    const categoryItems = await pg.query(`SELECT * FROM ${req.query.category}`);
    let additionalItems;
    if (additionalCategoties[req.query.category]) {
      additionalItems = await pg.query(
        `SELECT * FROM ${additionalCategoties[req.query.category].table}`
      );
      console.log();
      additionalItems = additionalItems.rows.map((item) => {
        return {
          id: item[additionalCategoties[req.query.category].fields[0]],
          value: item[additionalCategoties[req.query.category].fields[1]],
        };
      });
    }
    const fieldsWithoutId = categoryItems.fields.filter(
      (item) => item.name !== `id_${req.query.category}`
    );
    res.send({
      items: categoryItems.rows,
      fields: fieldsWithoutId,
      additionalItems: additionalCategoties[req.query.category]
        ? {
            field: additionalCategoties[req.query.category].table,
            values: additionalItems,
          }
        : null,
    });
  }
}

export default new CategoryController();
