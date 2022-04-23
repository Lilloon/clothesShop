import pg from "../pg.js";

class DrugsController {
  async getCountries(req, res) {
    const countries = await pg.query(
      "SELECT DISTINCT manuf_country FROM clear_meds ORDER BY manuf_country"
    );
    countries.rows.shift();
    res.send(countries.rows);
  }

  async getDrugById(req, res) {
    const Drug = await pg.query(
      `SELECT DISTINCT * FROM clear_meds WHERE id=${req.params.id}`
    );
    res.send(Drug.rows[0]);
  }

  async getSearchList(req, res) {
    const searchName =
      req.params.name[0].toUpperCase() + req.params.name.slice(1).toLowerCase();
    const numPage = Number(req.query.pageNumber);
    const minEl = numPage * 12;
    const maxEl = minEl + 11;
    const result = { drugs: [] };
    const query = `SELECT DISTINCT * FROM clear_meds WHERE${
      req.query.country !== undefined
        ? ` manuf_country='${req.query.country}' AND`
        : ""
    }  trade_name LIKE '${searchName}%' OR trade_name LIKE '%${req.params.name.toLowerCase()}' OR ath_code LIKE '${searchName.toUpperCase()}' OR mnn LIKE '${searchName.toUpperCase()}%' OR ftg LIKE '${searchName.toLowerCase()}%' ORDER BY trade_name`;
    const DrugList = await pg.query(query);
    DrugList.rows.forEach((currentItem, index) => {
      if (index >= minEl && maxEl >= index) {
        result.drugs.push(currentItem);
      }
    });
    result.totalPages = Math.ceil(DrugList.rowCount / 12);
    res.send(result);
  }

  async getAnalogs(req, res) {
    const drugQ = await pg.query(
      `SELECT * FROM clear_meds WHERE id='${Number(req.params.id)}'`
    );
    const drug = drugQ.rows[0];
    const Analogs = await pg.query(
      `SELECT DISTINCT * FROM clear_meds WHERE${
        drug.mnn !== "" ? ` mnn='${drug.mnn}'` : ""
      } OR ath_name='${drug.ath_name}' OR ftg='${drug.ftg_name}' OR ath_code='${
        drug.ath_code
      }' ORDER BY trade_name`
    );
    const minEl = Number(req.query.pageNumber) * 12;
    const maxEl = minEl + 11;
    const analogsPaginated = [];
    Analogs.rows.forEach((item, index) => {
      if (index >= minEl && index <= maxEl) {
        analogsPaginated.push(item);
      }
    });
    const result = {
      drugs: analogsPaginated,
      totalPages: Math.ceil(Analogs.rowCount / 12),
    };
    res.send(result);
  }
}

export default new DrugsController();
