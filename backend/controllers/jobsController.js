const asyncHandler = require('express-async-handler')

// @desc Get Jobs
// @route GET /api/jobs
// @access Private
const getJobs = asyncHandler(async(req,res) =>{
    res.status(200).json({ message: "Get Jobs" });
})
// @desc Set Jobs
// @route POST /api/jobs
// @access Private
const setJob = asyncHandler(async(req,res) =>{
    res.status(200).json({ message: "set a Job" });
})
// @desc Update Job with ID
// @route PUT /api/jobs/:id
// @access Private
const updateJob =asyncHandler(async (req,res) =>{
    res.status(200).json({ message: `update Job with id:${req.params.id}` });
})
// @desc Delete Job with ID
// @route DELETE /api/jobs/:id
// @access Private
const deleteJob = asyncHandler(async(req,res) =>{
    res.status(200).json({ message: `delete Job with id:${req.params.id}` });
})

module.exports = {
    getJobs,
    setJob,
    updateJob,
    deleteJob
}