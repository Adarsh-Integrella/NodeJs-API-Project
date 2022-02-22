const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//load env
dotenv.config({ path: "./config/config.env" });

//connect database
connectDB();

//load router
const bootcamps = require("./routes/bootcamps");
const app = express();

//Body parser
app.use(express.json());

//Dev logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// mount routers
app.use("/api/v1/bootcamps/", bootcamps);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
