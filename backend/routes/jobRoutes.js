const express = require("express");
const router = express.Router();
const {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  setJobsInBulk,
  getJobById
} = require("../controllers/jobsController");

// you can clean below code like this 
// router.route('/').get(getJobs).post(setJob)
// router.route('/:id').put(updateJob).delete(deleteJob)

router.get("/", getJobs);
router.get("/:companyName/:id",getJobById)

router.post("/", setJob);
router.post('/add-multiple-jobs',setJobsInBulk)

router.put("/:id", updateJob);
router.delete("/:id", deleteJob);


module.exports = router;
