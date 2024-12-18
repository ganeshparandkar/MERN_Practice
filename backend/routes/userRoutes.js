const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getMe} = require('../controllers/usersController.js')
const {getUsers,getUserById,addMultipleUsers,updateUser,deleteUser}  = require('../controllers/usersController.js')

const {protect} = require('../middleware/authMiddleware.js')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect, getMe)


// for admin
router.get('/',getUsers)
router.get('/:id',getUserById)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.post('/add-multiple-users',addMultipleUsers)

module.exports = router