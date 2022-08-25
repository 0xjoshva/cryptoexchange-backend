const express = require("express");
const router = express.Router();
const con = require("../database/dbConnection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// getting all users and displaying to /users route
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// gets a single user with a matching id
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM users WHERE user_id = ${req.params.id}`,
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

//update user needs to be tested
router.put("/:id", middleware, (req, res) => {
  const { user_name, password, email, age, address, phone_number } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    con.query(
      `UPDATE users set email="${email}", password="${hash}", user_name="${user_name}", phone_number="${phone_number}", address="${address}", age="${age}" WHERE id = "${req.params.id}"`,
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

//register
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const { user_name, password, email, age, address, phone_number } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      user_name,
      password: hash,
      email,
      age,
      address,
      phone_number,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.full_name, user.email)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});

//login and decryption
router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          // information stored within auth token
          const payload = {
            user: {
              user_id: result[0].user_id,
              full_name: result[0].full_name,
              email: result[0].email,
              user_type: result[0].user_type,
              balance: result[0].balance,
            },
          };
          // creating a token and setting an expiry
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
              console.log(req.body);
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// verify
router.get("/users/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: "Unauthorized Access!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});

router.get("/", middleware, (req, res) => {
  try {
    let sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
