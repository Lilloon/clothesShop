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
      `SELECT * FROM client where first_name = '${req.body.first_name}' and second_name='${req.body.second_name}'`
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
}

export default new UserController();
