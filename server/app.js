const morgan = require('morgan')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')


//router imports
const userRouter=require('./routes/userRoutes')
const chatRouter=require('./routes/chatRoutes')
const messageRouter=require('./routes/messageRoutes')

const app = express()
dotenv.config({ path: './config.env' })


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/user',userRouter)
app.use('/api/v1/chat',chatRouter)
app.use('/api/v1/messages',messageRouter)




app.get('/', (req, res, next) => {
    res.status(200).end('Hello')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is runnning on port 5000')
})

const database = process.env.DATABASEURL.replace('<password>', process.env.password)
mongoose.connect(database).then(() => console.log('database connected successfully')).catch((err) => {
    console.log("mongo db connection failed", err.message)
})