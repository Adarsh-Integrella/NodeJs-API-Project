const mongoose = require("mongoose");
const slugify = require("slugify");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, //Used to remmove white spaces
    maxlength: [50, "name cannot be more than 50 characters"],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
    maxlength: [500, "description cannot be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      "Please enter valid URL",
    ],
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number cannot be more than 20 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true,
    },
    cordinates: {
      type: [Number],
      // required: true,
      index: "2dsphere",
    },
    formettedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Minimum rating has to be 1"],
    max: [10, "Max rating cannot excess 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "No-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
