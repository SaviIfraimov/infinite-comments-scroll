import React, {useState} from 'react'
import './PostComment.css'

const PostComment = () => {
    const [inputText, setInputText] = useState("")

    return (
        <div>
            <form>
                <input className="input-text" type="text" placeholder="Write Your Comment..." onChange={(e) => setInputText(e.target.value)} required/>
                <input className="input-submit" type="submit" value="POST COMMENT" onClick={(e) => { e.preventDefault(); if (inputText !== "") sendCommentPostRequest(inputText) }}/>
            </form>
        </div>
    )
}

const sendCommentPostRequest = (value) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            postId: 0,
            name: 'the one who posts comments',
            body: value,
            email: "abc000@jsonplaceholderapi.com",
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };
    
    fetch('http://test.steps.me/test/testAssignComment', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            console.error('There was an error!', error);
        });
}

export default PostComment
