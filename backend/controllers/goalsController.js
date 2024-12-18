const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) =>{

    const goals = await Goal.find({user:req.user.id})

    res.status(200).json({goals:goals,"user":req.user.first_name});
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
    const goal = await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal);
})
// @desc Update Goal with ID
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }
    const user = await User.findById(req.user.id)
    // check for user
    if (!user){
        res.status(401)
        throw new Error('User not found!')
    }
    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true}) //{new:true} this will create new object if that doesn't exist
    res.status(200).json(updatedGoal);
})
// @desc Delete Goal with ID
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }
    const user = await User.findById(req.user.id)
    // check for user
    if (!user){
        res.status(401)
        throw new Error('User not found!')
    }
    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized!')
    }
    
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({id:req.params.id});
}
)
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}