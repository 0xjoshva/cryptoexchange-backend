const express = require("express");
const router = express.Router();
const con = require("../database/dbConnection");
const middleware = require("../middleware/auth");

// get all cryptos
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM cryptos", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//get single crypto
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM cryptos WHERE crypto_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/add", (req, res) => {
  const { crypto_name, abbreviation, price, info, icon } = req.body;
  try {
    con.query(
      `INSERT INTO cryptos (
            crypto_name, abbreviation, price, info, icon) VALUES ( "${crypto_name}", "${abbreviation}", "${price}", "${info}", "${icon}")`,
      (err, result) => {
        if (err) throw err;
        res.send("new crypto added");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/:id", middleware, (req, res) => {
  try {
    con.query(
      `DELETE FROM cryptos WHERE id ="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(`crypto #${req.params.id} deleted`);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put("/:id", middleware, (req, res) => {
  const { crypto_name, abbreviation, price, info, icon } = req.body;
  try {
    con.query(
      `UPDATE cryptos set crypto_name=${crypto_name}, abbreviation=${abbreviation}, price=${price}, info=${info}, icon=${icon} WHERE crypto_id = "${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send("blog successfully updated");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
module.exports = router;