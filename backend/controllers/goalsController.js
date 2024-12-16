const asyncHandler = require('express-async-handler')
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) =>{
    console.log(req.body)
    res.status(200).json({ message: "Get goals" });
})
// @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async(req,res) =>{
    if (!req.body.text) {
        // res.status(400).json({message: 'Please add a text field!'})
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: "set a goal" });
})
// @desc Update Goal with ID
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req,res) =>{
    res.status(200).json({ message: `update goal with id:${req.params.id}` });
})
// @desc Delete Goal with ID
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req,res) =>{
    res.status(200).json({ message: `delete goal with id:${req.params.id}` });
}
)
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}