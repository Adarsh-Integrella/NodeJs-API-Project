const express = require("express");
const dotenv = require("dotenv");

//load env
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
