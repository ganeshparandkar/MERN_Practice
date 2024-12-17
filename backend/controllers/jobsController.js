const asyncHandler = require("express-async-handler");
const Job = require("../model/jobModel");


// @desc Get Jobs
// @route GET /api/jobs
// @access Public
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});



// @desc Get Job by company_name & job_id
// @route GET /api/jobs//:companyName/:id
// access Public

const getJobById = asyncHandler(async (req, res) => {
  const { companyName: jobCompany, id: jobId } = req.params;

  // Validate input
  if (!jobCompany || !jobId) {
    res.status(400);
    throw new Error('Missing required parameters: companyName and id.');
  }

  try {
    // Query the database
    const job = await Job.findOne({ job_company: jobCompany, job_id: jobId });

    // Check if job exists
    if (!job) {
      res.status(404);
      throw new Error('Job not found! Please provide correct company and jobId details.');
    }

    // Send successful response
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    // Handle server errors
    res.status(500);
    throw new Error('An error occurred while fetching the job. Please try again later.');
  }
});


// @desc Set Jobs
// @route POST /api/jobs
// @access Private
const setJob = asyncHandler(async (req, res) => {
  const { jobTitle, jobLocation, jobCompanyName, jobId, jobLink } = req.body;

  // Check if required fields are missing
  if (!jobTitle || !jobLocation || !jobCompanyName || !jobId || !jobLink) {
    res.status(400);
    throw new Error(
      "Missing required fields: job_id, job_title, job_location, and job_company are required."
    );
  }
  const job = await Job.create({
    job_id: req.body.jobId,
    job_description: req.body.jobDescription || null,
    job_title: req.body.jobTitle,
    job_company: req.body.jobCompanyName,
    job_location: req.body.jobLocation,
    job_link: req.body.jobLink,
  });
  res.status(200).json(job);
});

// @desc Set Jobs
// @route POST /api/jobs
// @access Private
// @input Array of objects [{}]
const setJobsInBulk = asyncHandler(async (req, res) => {
  if (!Array.isArray(req.body) || req.body.length === 0) {
    res.status(400);
    throw new Error("Invalid input. Expected a non-empty array of objects.");
  }

  // Validate each job object in the array
  const jobsToInsert = req.body.map((job, index) => {
    const {
      jobTitle,
      jobLocation,
      jobCompanyName,
      jobId,
      jobLink,
      jobDescription,
    } = job;

    if (!jobTitle || !jobLocation || !jobCompanyName || !jobId || !jobLink) {
      throw new Error(`Missing required fields in job at index ${index}`);
    }

    // Prepare the job object for insertion
    return {
      job_id: jobId,
      job_description: jobDescription || null,
      job_title: jobTitle,
      job_company: jobCompanyName,
      job_location: jobLocation,
      job_link: jobLink,
    };
  });

  // Insert jobs in bulk
  try {
    const insertedJobs = await Job.insertMany(jobsToInsert);
    res.status(200).json({
      message: "Jobs added successfully",
      jobs: insertedJobs,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to insert jobs: " + error.message);
  }
});

// @desc Update Job with ID
// @route PUT /api/jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ jobId: req.params.id });
  if (!job) {
    res.status(400);
    throw new Error("Job Id not found!");
  }
  const { jobTitle, jobLocation, jobCompany, jobDescription } = req.body;

  // Use findOneAndUpdate to update the job
  const updatedJob = await Job.findOneAndUpdate(
    { jobId: req.params.id }, // Filter by job_id
    {
      job_title: jobTitle || job.jobTitle,
      job_location: jobLocation || job.jobLocation,
      job_company: jobCompany || job.jobCompany,
      job_description: jobDescription || job.jobDescription,
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
  const job = await Job.findOne({ jobId: req.params.id });
  if (!job) {
    res.status(400);
    throw new Error("Id not found!");
  }

  await Job.findOneAndDelete({ job_id: req.params.id });
  res.status(200).json({ id: `delete Job with id:${req.params.id}` });
});

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  setJobsInBulk,
  getJobById
};
