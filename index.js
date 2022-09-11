const express = require("express");
const cors = require("cors");

const app = express();
app.set("port", process.env.PORT || 1337);
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes//blogRoute");
const transactionRoute = require("./routes/transactionRoute");
const cryptoRoute = require("./routes/productRoute");

app.use("/users", userRoute);
app.use("/blogs", blogRoute);
app.use("/transactions", transactionRoute);
app.use("/cryptos", cryptoRoute)

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on http://localhost:${app.get("port")}`);
  console.log("Press Ctrl+C to exit the server");
});
