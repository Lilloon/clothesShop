import e from "express";
import pg from "../pg.js";
import { v4 } from "uuid";

const additionalCategoties = {
  parent_product: {
    table: "material",
    fields: ["id_material", "material_name"],
  },
  child_product: {
    table: "parent_product",
    fields: ["id_product", "product_name"],
  },
  employers: {
    table: "roles",
    fields: ["id_role", "role_name"],
  },
};

class CategoryController {
  async getAvaliableCategories(req, res) {}
  async getCategoryPage(req, res) {
    const categoryItems = await pg.query(
      `SELECT * FROM "${req.query.category}"`
    );
    let additionalItems;
    if (additionalCategoties[req.query.category]) {
      additionalItems = await pg.query(
        `SELECT * FROM ${additionalCategoties[req.query.category].table}`
      );
      additionalItems = additionalItems.rows.map((item) => {
        return {
          id: item[additionalCategoties[req.query.category].fields[0]],
          value: item[additionalCategoties[req.query.category].fields[1]],
        };
      });
    }
    const fieldsWithoutId = categoryItems.fields.filter((item) => {
      if (req.query.category === "parent_product") {
        return !item.name.includes("id_") && item.name !== "amount";
      }
      return !item.name.includes("id_");
    });
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

  async addItem(req, res) {
    const { query, body } = req;
    const { category } = query;
    let notFilledFlag = false;
    const bodyArr = Object.entries(body);
    bodyArr.forEach((item) => {
      const [key, value] = item;
      console.log(!value);
      if (!value) {
        notFilledFlag = true;
      }
    });
    if (notFilledFlag) {
      res.send(400, "all fields must be filled");
      return;
    }
    switch (category) {
      case "parent_product":
        {
          const id_product = v4();
          const queryString = `INSERT INTO parent_product (product_name, amount, id_product) VALUES ($1, $2, $3)`;
          const { product_name, material } = body;
          await pg.query(queryString, [product_name, 0, id_product]);
          const material_row = await pg.query(
            `SELECT id_material from material WHERE material_name = '${material.value}'`
          );
          const [mat] = material_row.rows;
          const { id_material } = mat;
          await pg.query(
            `INSERT INTO product_composition (id_material, id_product, material_name, amount) VALUES ($1, $2, $3, $4);`,
            [id_material, id_product, material.value, 0]
          );
          res.send(200, "ok");
        }
        break;
      case "material":
        {
          const idMaterial = v4();
          const query =
            "INSERT INTO material (material_name, amount, id_material) VALUES ($1, $2, $3)";
          const { material_name, amount } = body;
          await pg.query(query, [material_name, amount, idMaterial]);
          res.send(200, "ok");
        }
        break;
      case "employers":
        {
          const { name, surname, password, roles, phone_number } = body;
          const id_employer = v4();
          await pg.query(
            `INSERT INTO employers (name, surname, password, id_role, id_employer, phone_number) VALUES ($1, $2, $3,$4, $5, $6)`,
            [name, surname, password, roles.id, id_employer, phone_number]
          );
          console.log(body);
          res.send(200);
        }
        break;
      case "roles":
        {
          const idRole = v4();
          const query =
            "INSERT INTO roles (role_name, id_role) VALUES ($1, $2)";
          const { role_name } = body;
          await pg.query(query, [role_name, idRole]);
          res.send(200, "ok");
        }
        break;
      case "child_product":
        {
          const { parent_product, size, amount } = body;
          const { rows } = await pg.query(
            `SELECT amount from parent_product WHERE id_product='${parent_product.id}';`
          );
          const [parentInDB] = rows;
          const { amount: prevAmount } = parentInDB;
          const changeParQtyQuery = `UPDATE parent_product SET amount=$1 WHERE id_product='${parent_product.id}'`;
          const changeCompQtyQuery = `UPDATE product_composition SET amount=$1 WHERE id_product='${parent_product.id}'`;
          await pg.query(changeParQtyQuery, [
            Number(amount) + Number(prevAmount),
          ]);
          await pg.query(changeCompQtyQuery, [
            Number(amount) + Number(prevAmount),
          ]);
          const { rows: existingChildArr } = await pg.query(
            `SELECT * FROM child_product WHERE size='${size.toLowerCase()}' AND id_parent='${
              parent_product.id
            }';`
          );
          if (existingChildArr.length) {
            const [existingChild] = existingChildArr;
            console.log(existingChild);
            pg.query(
              `UPDATE child_product SET amount=$1 WHERE id_child='${existingChild.id_child}' AND size='${existingChild.size}'`,
              [Number(amount) + Number(existingChild.amount)]
            );
          } else {
            const id_child = v4();
            const query =
              "INSERT INTO child_product (id_parent,size,amount, id_child) VALUES ($1, $2, $3, $4)";

            await pg.query(query, [
              parent_product.id,
              size.toLowerCase(),
              amount,
              id_child,
            ]);
          }

          res.send(200, "ok");
        }
        break;
      default:
        res.send(400, "category doesnt exist");
        break;
    }
  }
  async getData(req, res) {
    const categoryItems = await pg.query(
      `SELECT * FROM "${req.query.category}"`
    );
    let { rows, fields } = categoryItems;
    if (req.query.category === "child_product") {
      fields = [{ name: "product_name" }, ...fields];
      rows = rows.map(async (item) => {
        const { rows: addRows } = await pg.query(
          `SELECT product_name FROM parent_product WHERE id_product='${item.id_parent}'`
        );
        const [parentItem] = addRows;
        return { product_name: parentItem.product_name, ...item };
      });
      rows = await Promise.all(rows);
    }

    const items = rows.map((item) => {
      const newItem = [];
      const arr = Object.entries(item);
      arr.forEach((value) => {
        newItem.push(value[1]);
      });
      return newItem;
    });
    res.send({
      items: items.sort((a, b) => {
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
      }),
      fields,
    });
  }
}

export default new CategoryController();
