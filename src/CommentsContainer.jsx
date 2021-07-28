import React, { useState } from "react";
import './CommentsContainer.css'

import InfiniteScroll from "react-infinite-scroll-component";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [currPostId, setCurrPostId] = useState(1);

  const fetchMoreData = () => {
    try {
      if (!currPostId) {
        return;
      }

      let allItems = [];

      Promise.all([
        fetch(
          `http://jsonplaceholder.typicode.com/comments?postId=${
            currPostId + 0 <= 100 ? currPostId + 0 : currPostId + 0 - 100
          }`
        ),
        fetch(
          `http://jsonplaceholder.typicode.com/comments?postId=${
            currPostId + 1 <= 100 ? currPostId + 1 : currPostId + 1 - 100
          }`
        ),
        fetch(
          `http://jsonplaceholder.typicode.com/comments?postId=${
            currPostId + 2 <= 100 ? currPostId + 2 : currPostId + 2 - 100
          }`
        ),
        fetch(
          `http://jsonplaceholder.typicode.com/comments?postId=${
            currPostId + 3 <= 100 ? currPostId + 3 : currPostId + 3 - 100
          }`
        ),
      ]).then((responses) => {
        Promise.all([
          responses[0].json(),
          responses[1].json(),
          responses[2].json(),
          responses[3].json(),
        ]).then((commentsBatchesArray) => {
          if (commentsBatchesArray.length > 0) {
            commentsBatchesArray.forEach((item) => {
              allItems = allItems.concat(item);
            });

            setComments([...new Set([...comments, ...allItems])]);
            setCurrPostId(currPostId !== 97 ? currPostId + 4 : 0);
          }
        });
      });
    } catch (error) {
      // Catch error the way you decide.
    }
  };

  // Initial fetching of data
  if (currPostId === 1 && !comments.length) fetchMoreData();

  return (
    <div>
      <div className="comments-container" id="comments-container">
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchMoreData}
          hasMore={true}
          loader={(currPostId === 1 && !comments.length) ? <div className="loader" id="loader"></div> : ""}
          scrollThreshold={0.85}
          endMessage={
              <b style={{textAlign: 'center'}}>End of Results</b>
            }
        >
          <div>
            {comments.map((comment, index) => {
              return (
                <div className="comment" key={index}>
                  <br />
                  <span> {comment.email.split("@")[0]} </span>
                  <p>
                    <br />
                    <br />
                    {comment.body}
                  </p>
                </div>
              );
            })}
            <br />
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default CommentsContainer;
