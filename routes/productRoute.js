const express = require("express");
const router = express.Router();
const con = require("../database/dbConnection");

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

module.exports = router;