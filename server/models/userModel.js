const mongoose =require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user must have a name'],
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:[true,'email must have a name'],
        minlength:3,
        maxlength:30,
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required field'],
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema)
module.exports=User