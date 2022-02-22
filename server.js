const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParsar = require("cookie-parser");
const connectDB = require("./config/db");
const errorhandler = require("./middleware/errorHandler");

//load env
dotenv.config({ path: "./config/config.env" });

//connect database
connectDB();

//load router
const bootcamps = require("./routes/bootcamps");
const user = require("./routes/auth");

const app = express();

//Body parser
app.use(express.json());
app.use(cookieParsar());
//Dev logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// mount routers
app.use("/api/v1/bootcamps/", bootcamps);
app.use("/api/v1/auth/", user);
app.use(errorhandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
