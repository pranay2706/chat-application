const mongoose=require('mongoose')
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const validator=require('validator')
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
    const jwtKey=process.env.JWT_SECRET_KEY
    return jwt.sign({_id},jwtKey,{expiresIn:"3d"})
}


//register
exports.registerUser=async(req,res)=>{
  try{ const {name,email,password}=req.body;

   if(!name || !email || !password){
    return res.status(400).json("missing input details");
   }


   let user=await User.findOne({email})
   if(user){
    return res.status(400).json("user already exists with this email");
   }

   if(!validator.isEmail(email)){
    return res.status(400).json("enter a valid email");
   }

//    if(!validator.isStrongPassword(password)){
//     return res.status(400).json("enter a strong password")
//    }


   user =new User({name,email,password})

   const salt =await bcrypt.genSalt(10)
   user.password=await bcrypt.hash(user.password,salt)
   await user.save()

   const token=createToken(user._id)

   res.status(201).json({
    name:user.name,
    email:user.email,
    id:user._id,
    token
   })

}catch(err){
    console.log(err)
    res.status(500).json(err)
}


}

//login
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    
    try{
        let user=await User.findOne({email})
       
        if(!user){
            return res.status(200).json("Invalid email or password")
        }

        if(!email || !password){
            return res.status(400).json("enter both email and password correctly")
        }

        const isValidPassword=await bcrypt.compare(password,user.password)

        if(!isValidPassword) return res.status(400).json("Invalid email and password");

        const token=createToken(user._id);
        user.password = undefined; 
        res.status(201).json({
           status:"suucess",
           token, 
           name:user.name,
           email:user.email,
           id:user._id,
           })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}


//find one user
exports.findUser=async (req,res)=>{
    const userId=req.params.userId+""
    try{
        const user=await User.findById(userId)
        if(!user) return res.status(404).json("user does not exists")
        user.password=undefined
        user.createdAt=undefined
        user.updatedAt=undefined
        res.status(200).json({
            status:"suucess",
            user
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


exports.getUsers=async (req,res)=>{
    try{
        const user=await User.find()
       
        res.status(200).json({
            status:"suucess",
            user
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}