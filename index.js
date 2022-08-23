const express = require("express");
const cors = require("cors");

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    msg: "welcome to my database homepage",
  });
});

const userRoute = require("./routes/userRoute");
app.use("/users", userRoute);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on http://localhost:${app.get("port")}`);
  console.log("Press Ctrl+C to exit the server");
});
