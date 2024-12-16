const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },
    job_id: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
    },
    job_location: {
      type: String,
      required: true,
    },
    job_company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job',jobSchema)