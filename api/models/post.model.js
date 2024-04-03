import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'https://unsplash.com/it/foto/adesivi-assortiti-kvIAk3J_A1c'
    },
    category: {
        type: String,
        default: 'Uncategoryzed'
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }

}, { timestamps: true })

const Post = new mongoose.model('Post', postSchema)

export default Post