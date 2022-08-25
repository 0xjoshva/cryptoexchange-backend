const express = require("express");
const router = express.Router();
const con = require("../database/dbConnection");
const middleware = require("../middleware/auth");

// get all transactions
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM transactions", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// show transactions for specific user id





module.exports = router;