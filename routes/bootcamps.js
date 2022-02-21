const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  deleteBootcamp,
  updateBootcamp,
  createBootcamp,
} = require("../controller/bootcamps");

const router = express.Router();

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .put(updateBootcamp)
  .get(getBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
