import React, { useState, useEffect } from "react";
import './CommentsContainer.css'

const CommentsContainer = () => {
  // JSONPlaceholder API -  Fetching comments with a certain postId retreives 5 comments.
  // Randomize a num from 1 to 100 and start reading the comments based on it - it will be the postId
  const randomInt = Math.floor(Math.random() * 99) + 1;
  
  const [loader, setLoader] = useState(true);
  const [comments, setComments] = useState([]);
  
  // Scrolling state
  const [scrollTop, setScrollTop] = useState(document.body.scrollTop);
    
  useEffect(() => {
    // Get 20 more comments
    getComments()

    // Subscribe to scroll event
    window.addEventListener("scroll", handleOnScroll());
  }, []);
  
  const getComments = () => {
    try {
      let allItems = [];

      Promise.all([
            fetch(`http://jsonplaceholder.typicode.com/comments?postId=${ (randomInt + 0) <= 100 ? (randomInt + 0) : (randomInt + 0 - 100) }`),
            fetch(`http://jsonplaceholder.typicode.com/comments?postId=${ (randomInt + 1) <= 100 ? (randomInt + 1) : (randomInt + 1 - 100) }`),
            fetch(`http://jsonplaceholder.typicode.com/comments?postId=${ (randomInt + 2) <= 100 ? (randomInt + 2) : (randomInt + 2 - 100) }`),
            fetch(`http://jsonplaceholder.typicode.com/comments?postId=${ (randomInt + 3) <= 100 ? (randomInt + 3) : (randomInt + 3 - 100) }`),
      ]).then((responses) => {
          Promise.all([
            responses[0].json(),
            responses[1].json(),
            responses[2].json(),
            responses[3].json()
          ]).then((commentsBatchesArray) => {
              if (commentsBatchesArray.length > 0) {
                commentsBatchesArray.forEach(item => {
                  allItems = allItems.concat(item);
                });

                setComments(allItems);
                setLoader(false);
              }
          })
      }) 
    } catch(error) {
      // Catch error the way you decide.
    }
  }

  //TODO continue here
  ...
  const handleOnScroll = () => {
    // Check to see if scrolling near bottom of page, load more comments
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 1000
      ) {
      console.log(window.innerHeight)
      console.log(document.body.offsetHeight)
      getComments();
    }
  } 

  return (
    <div>
      <div className="comments-container" id="comments-container">

        {loader ? (
          <div className="loader" id="loader"></div>
        ) : (
          <>
            {comments.map(function(comment, index) {
              return (
                <div className="comment" key={index}>
                  <br/><span> {comment.email.split("@")[0]} </span>
                  <p> 
                  <br/><br/>
                  {comment.body}
                  </p>  
                </div> )
            })}
            <br/>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentsContainer;