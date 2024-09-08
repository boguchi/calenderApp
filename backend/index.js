const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/test", (req, res) => {
  console.log(req.body);
  res.send({ text: "GET Success!" });
});

app.post("/test", (req, res) => {
  console.log(req.body.text);
});

app.listen(process.env.PORT || 3000);
