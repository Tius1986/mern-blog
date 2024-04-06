import { errorHandler } from "../utils/error.js"
import Comment from '../models/comment.model.js'

export const createComment = async(req, res, next) => {
    try {
        const { content, postId, userId } = req.body
        if(userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to create this comment'))
        }
        const comment  = new Comment({
            content,
            postId,
            userId
        })

        await comment.save()

        res.status(200).json(comment)

    } catch(error) {
        next(error)
    }
}