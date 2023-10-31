const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./routes/router");
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/bookingAssets", express.static(__dirname + "/asset/"));

app.get("/api", (req, res) => {
  res.send("Hello");
});
app.use("/", router);

app.listen(PORT, () => {
  console.log("Express API running in Port: " + PORT);
});
