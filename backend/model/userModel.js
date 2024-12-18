const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true,'Please add First Name'],
      trim:true
    },
    last_name: {
      type: String,
      required: [true,'Please add Last Name'],
        trim:true
    },
    user_email: {
      type: String,
      required: [true,'Please add an Email'],
      unique:true
    },
    password: {
      type: String,
      required: [true,'Please add a password'],
    },
    phone_number: {
      type: String,
      unique:true
    },
    profile_picture: {
      type: String,
      default:''
    },
    resume: {
      type: String,
      default:''
    },
    current_company: {
      type: String,
      default:''

    },
    current_designation: {
      type: String,
      default:''

    },
    profile_summary: {
      type: String,
      default:''

    },
    skills: {
      type: [
        {
          type: String,
        },
      ],
    },
    education: {
      type: [
        {
          degree: String,
          institution: String,
          year: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
