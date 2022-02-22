const Bootcamp = require("../models/Bootcamp");
//@desc Get all bootcamps
//@route Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const Data = await Bootcamp.find();
    res.status(200).json({ success: true, count: Bootcamp.length, data: Data });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

//@desc Get single bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const getSingleData = await Bootcamp.findById(req.params.id);
    if (getSingleData === null) {
      return res.status(400).json({
        success: false,
        count: Bootcamp.length,
      });
    }
    res
      .status(200)
      .json({ success: true, count: Bootcamp.length, data: getSingleData });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

//@desc Create new bootcamp
//@route Post /api/v1/bootcamps/
//@access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
    console.log(error);
  }
};

//@desc Update bootcamp
//@route Put /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
  const getAndUpdate = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!getAndUpdate) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, count: Bootcamp.length, getAndUpdate });
};

//@desc Delete bootcamp
//@route Delete /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const getAndDelete = await Bootcamp.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, count: Bootcamp.length });
  } catch (error) {
    res.status(400).json({ success: false, count: Bootcamp.length });
  }
};
