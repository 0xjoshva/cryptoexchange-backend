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



module.exports = router;