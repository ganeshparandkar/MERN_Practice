const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async(req,res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // get token from header 
            token = req.headers.authorization.split(' ')[1] 
            // verify the token 
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
            // get user from token 
            // console.log(await User.findOne({_id:decodedToken.id}))

            // ! in mongodb id field is like _id 
            req.user = await User.findOne(
                {
                    _id: decodedToken.id 
            }).select('-password')

            console.log('decoded',decodedToken.id,req.user.id)
      
            // req.user = User.findById(decodedToken.id).select('-password')

            next() 
        }catch(err){

            console.log(err)
            res.status(401)
            throw new Error('Not authorized!')
        }

    }
    if (!token){
        res.status(401)
        throw new Error('Not authorized! Token Missing!')

    }

})

module.exports = {protect}