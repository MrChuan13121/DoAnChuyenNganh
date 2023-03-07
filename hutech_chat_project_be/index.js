require("dotenv").config();
require("./src/services/mongodb");
require("./src/services/realtime-db");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// // Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//   // // App you wish to allow to connect
//   // res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL_APP);

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//Lấy hình ảnh
app.get("/imgs/:model/:file", (req, res) => {
  res.sendFile(
    "E://DACN/hutech_chat_project_be/imgs/" +
      req.params.model +
      "/" +
      req.params.file
  );
});

app.use("/api/v1", routes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

module.exports = app;
