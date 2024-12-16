const express = require("express");
const router = express.Router();
const {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController");

// you can clean below code like this 
// router.route('/').get(getJobs).post(setJob)
// router.route('/:id').put(updateJob).delete(deleteJob)

router.get("/", getJobs);
router.post("/", setJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
