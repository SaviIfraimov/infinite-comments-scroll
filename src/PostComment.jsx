import React from 'react'
import './PostComment.css'

const PostComment = () => {
    return (
        <div>
            <form>
                <input className="input-text" type="text" placeholder="Write Your Comment..." required/>
                <input className="input-submit" type="submit" value="POST COMMENT"/>
            </form>
        </div>
    )
}

export default PostComment
