const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    chatId:String,
    senderId:String,
    text:String
},{
    timestamps:true
})


const messageModel=mongoose.model('message',messageSchema)
module.exports=messageModel