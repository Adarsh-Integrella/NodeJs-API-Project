const express = require("express");

const {
  getBootcamps,
  getBootcamp,
  deleteBootcamp,
  updateBootcamp,
  createBootcamp,
} = require("../controller/bootcamps");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/").get(getBootcamps).post(protect, createBootcamp);
router
  .route("/:id")
  .put(protect, updateBootcamp)
  .get(getBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
