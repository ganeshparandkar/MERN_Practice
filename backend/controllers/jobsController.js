const asyncHandler = require("express-async-handler");
const Job = require("../model/jobModel");



// @desc Get Jobs
// @route GET /api/jobs
// @access Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});




// @desc Set Jobs
// @route POST /api/jobs
// @access Private
const setJob = asyncHandler(async (req, res) => {
  const { job_title, job_location, job_company, job_id } = req.body;

  // Check if required fields are missing
  if (!job_title || !job_location || !job_company || !job_id) {
    res.status(400);
    throw new Error(
      "Missing required fields: job_id, job_title, job_location, and job_company are required."
    );
  }
  const job = await Job.create({
    job_id: req.body.job_id,
    job_description: req.body.job_description || null,
    job_title: req.body.job_title,
    job_company: req.body.job_company,
    job_location: req.body.job_location,
  });
  res.status(200).json(job);
});


// @desc Update Job with ID
// @route PUT /api/jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ job_id: req.params.id });
  if (!job) {
    res.status(400);
    throw new Error("Job Id not found!");
  }
  const { job_title, job_location, job_company, job_description } = req.body;

  // Use findOneAndUpdate to update the job
  const updatedJob = await Job.findOneAndUpdate(
    { job_id: req.params.id }, // Filter by job_id
    {
      job_title: job_title || job.job_title,
      job_location: job_location || job.job_location,
      job_company: job_company || job.job_company,
      job_description: job_description || job.job_description,
    },
    { new: true } // Return the updated job document
  );
  res.status(200).json({
    message: `Job with id:${req.params.id} updated successfully.`,
    updatedJob,
  });
});



// @desc Delete Job with ID
// @route DELETE /api/jobs/:id
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findOne({job_id:req.params.id})
    if(!job){
        res.status(400)
        throw new Error('Id not found!')
    }

    await Job.findOneAndDelete({job_id:req.params.id})
  res.status(200).json({ id: `delete Job with id:${req.params.id}` });
});

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
};
