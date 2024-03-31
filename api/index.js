import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected To MongoDb')
})
.catch(err => console.error(err))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})