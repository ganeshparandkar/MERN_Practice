const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')


// ! Generate JWT Token 
const generateToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'10d'}) // expire in 10 days
}


// ! Register
// @desc: create user
// @route: POST /api/user
// @access: Public
const registerUser = asyncHandler(async(req, res) => {
  const {firstName,lastName,email,password} =req.body


  if(!firstName || !lastName || !email || !password){
    res.status(400)
    throw new Error('Please add all the fields!')
  }

  const userExist = await User.findOne({user_email:email})
  if(userExist){
    res.status(400)
    throw new Error('User already exists!')
  }

  // Hash the password 
   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(password,salt)

  //  create user 
  console.log(email,hashPassword)
  const user = await User.create({
    first_name: firstName,
    last_name:lastName,
    user_email:email,
    password: hashPassword
  })
  if (user){
    res.status(200).json({data:{user:user,token:generateToken(user.id)},message:`user created with id:${user.id}`})
  }else{
    res.status(400)
    throw new Error('Invalid user Data!')
  }
});

// ! Login
// @desc: create user
// @route: POST /api/user/login
// @access: Public
const loginUser = asyncHandler(async(req, res) => {

  const {password} = req.body
  const email = req.body.email.trim();
  const user = await User.findOne({user_email:email})
  if(user){
    if(await bcrypt.compare(password,user.password)){
      res.status(200).json({data:{user:user,token:generateToken(user.id)},message:`user logged in Successfully`})

    }else{
      res.status(400)
      throw new Error('Password Incorrect')
    }
  }else{
    res.status(400)
    throw new Error('User does not Exist. Please Register!')
  }

});

// ! getMe
// @desc: get all users
// @route: GET /api/user
// @access: Public
const getMe = asyncHandler(async(req, res) => {
  const {id,first_name,last_name,user_email} = await User.findById(req.user.id)
  res.status(200).json({id,first_name,last_name,user_email})
});
// --------------------------------------------------------------

// ! For ADMIN only

const updateUser = asyncHandler(async(req, res) => {
  res.json({ message: "User updated" });
});

const deleteUser = asyncHandler(async(req, res) => {
  res.json({ message: "User Deleted" });
});

// @desc: get all users
// @route: GET /api/user
// @access: Private
const getUsers = asyncHandler(async (req, res) => {
  const authorization = req.headers.auth;
  console.log(req.headers)
  // Check if the authentication header is valid
  if (authorization == 'shriyash') {
    const users = await User.find();
    res.status(200).json({
      data: users,
      message: "All Users retrieved successfully"
    });
  } else {
    res.status(401); // Unauthorized status code
    throw new Error('You are not authorized!');
  }
});

// @desc: get user by id
// @route: GET /api/user/:id
// @access: Private
const getUserById = asyncHandler(async(req, res) => {
  res.json({ message: "User id:" + req.params.id });
});

const addMultipleUsers = asyncHandler(async(req, res) => {
  res.json({ message: "Bulk Users added" });
});

module.exports = {
  getMe,
  registerUser,
  getUsers,
  getUserById,
  loginUser,
  addMultipleUsers,
  updateUser,
  deleteUser,
};
