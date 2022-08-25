const express = require("express");
const router = express.Router();
const con = require("../database/dbConnection");
const middleware = require("../middleware/auth");
+(
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
  })
);

// gets a single blog with a matching id
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM blogs WHERE blog_id = ${req.params.id}`,
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

// delete one blog
router.delete("/:id", middleware, (req, res) => {
  try {
    con.query(
      `DELETE FROM blogs WHERE blog_id ="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(`blog #${req.params.id} deleted`);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//update user
router.put("/:id", middleware, (req, res) => {
  const { title, author, blurb, article, category, date, image } = req.body;
  // realtime date when updated
  const date_now = new Date().toLocaleDateString();
  try {
    con.query(
      `UPDATE blogs set title=${title}, author=${author}, blurb=${blurb}, article=${article}, category=${category}, date=${date_now}, image=${image} WHERE blog_id = "${req.params.id}"`,
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

// add a new blog
router.post("/blogs", (req, res) => {
  const { title, author, blurb, article, category, date, image } = req.body;
  try {
    con.query(
      `INSERT INTO products (
            title, author, blurb, article, category, date, image) VALUES ( "${title}", "${author}", "${blurb}", "${article}", "${category}", "${date}", "${image}" )`,
      (err, result) => {
        if (err) throw err;
        res.send("product successfully created");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
module.exports = router;
