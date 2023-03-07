const mongoose = require("mongoose");

// Connect the database
mongoose
  .connect(process.env.MONGO_DB)
  .then((con) => {
    console.log("DB connection successfully!");
  })
  .catch((err) => {
    console.error("DB can't connect: ", err);
  });
