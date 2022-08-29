const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const productSchema = require("./schema/post");
const env = require("./env.json");
const PORT = process.env.PORT || env.PORT;
const BASE_URL = env.BASE_URL;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname));
const uri = BASE_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

{
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("connection success");
  });

  //fix: admin panel
  app.get("/", (req, res) => {
    res.json("hello world")
  });
  const Admin = require("./router/admin");
  app.use("/api", Admin);
  const modifyProduct = require("./router/post");
  app.use("/post", modifyProduct);
}

app.listen(PORT, () => {
  console.log(`Server start At ${PORT}`);
});
