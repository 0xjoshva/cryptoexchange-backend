const express = require("express");
const router = express.Router();
const con = require("../database/dbConnection");

// getting all blogs
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM blogs", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// gets a single blog with a matching id
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM blog WHERE id = ${req.params.id}`,
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

// delete one user
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users WHERE user_id ="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(`user ${req.params.id} deleted`);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//update user
router.put("/:id", middleware, (req, res) => {
  const { email, password, full_name, phone_number, join_date, user_type } =
    req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    con.query(
      `UPDATE users set email="${email}", password="${hash}", full_name="${full_name}", phone_number="${phone_number}", join_date="${join_date}", user_type="${user_type}" WHERE id = "${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send("user successfully updated");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
