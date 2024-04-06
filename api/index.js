import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import postRoute from './routes/post.route.js'
import commentRoute from './routes/comment.route.js'

dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected To MongoDb')
})
.catch(err => console.error(err))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
