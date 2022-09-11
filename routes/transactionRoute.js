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
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM transactions WHERE user_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/buy", (req, res) => {
  const { amount, crypto_name } = req.body;
  try {
    con.query(
      `INSERT INTO transactions (
            amount, crypto_name) VALUES ( "${amount}", "${crypto_name}" )`,
      (err, result) => {
        if (err) throw err;
        res.send("blog successfully created");
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
      `DELETE FROM transactions WHERE id ="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(`transaction #${req.params.id} deleted`);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;