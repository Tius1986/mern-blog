import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Textarea, Button } from 'flowbite-react'
import { useState } from 'react'


export default function CommentSection({ postId }) {

    const { currentUser } = useSelector((state) => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            if(comment.length > 200) {
                return
            }
            const res = await fetch(`/api/comment/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            })
            const data = res.json()
            if(res.ok) {
                setComment('')
                setComment(null)
            }
        } catch(error) {
            setCommentError(error.message)
        }
        
    }

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as </p>
                    <img className='h-7 w-7 object-cover rounded-full' src={currentUser.profilePicture} alt='profile picture'/>
                    <Link to={'/dashboard?tab=profile'} className='text-xs text-teal-500 hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            ):(
                <div className='text-sm text-teal-400 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-700 hover:underline' to={'/sign-in'}>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form className='border border-gray-300 rounded-md p-3' onSubmit={handleSubmit}>
                    <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Add a comment...' rows='3' maxLength='200'/>
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                        <Button className='' outline type='submit' gradientDuoTone='purpleToBlue'>
                            Submit
                        </Button>
                    </div>
                    {commentError && (
                        <Alert color='failure' className='mt-5'>
                            {commentError}
                        </Alert>
                    )}
                </form>
            )}
        </div>
    )
}