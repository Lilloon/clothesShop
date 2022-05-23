import pg from "../pg.js";
import { v4 as uuidv4 } from "uuid";

class UserController {
  async getUserById(req, res) {
    const popular = await pg.query(
      `SELECT * FROM client where id_client='${req.query.id}'`
    );
    console.log(popular);
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
}

export default new UserController();
