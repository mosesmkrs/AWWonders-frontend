import Avatar from '@mui/material/Avatar';

import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
//import AddReactionIcon from '@mui/icons-material/AddReaction';
import ShareIcon from '@mui/icons-material/Share';



const WorkoutDetails = ({workout}) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentTextarea, setShowCommentTextarea] = useState(false);
  

  
    const handleLikeClick = () => {
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    };
    

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
      };
    
      const handleSubmitComment = (event) => {
        event.preventDefault();
        if (newComment.trim() !== '') {
          setComments((prevComments) => [...prevComments, newComment]);
          setNewComment('');
        }
      };

      const handleCommentIconClick = () => {
        setShowCommentTextarea((prevShowCommentTextarea) => !prevShowCommentTextarea);
      };

      
  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this post',
          text: `Check out this post by ${workout.username}: "${workout.caption}"`,
          url: window.location.href,
        });
      } else {
        // Fallback behavior for browsers that do not support Web Share API
        // You can implement custom sharing behavior here, like displaying a share dialog
        window.alert('Web Share API not supported. Implement custom sharing behavior here.');
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

    //   const handleEmoji = () => {
    //     return(
    //         <EmojiPicker />
    //     )
    //     // <EmojiPicker />
    //   }

      



       // Function to calculate the time difference in various units
  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const differenceInTime = now.getTime() - createdAtDate.getTime();
    const secondsDifference = Math.floor(differenceInTime / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(daysDifference / 365);

    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else if (weeksDifference < 4) {
      return `${weeksDifference} weeks ago`;
    } else if (monthsDifference < 12) {
      return `${monthsDifference} months ago`;
    } else {
      return `${yearsDifference} years ago`;
    }
  };
      
    return (
        <>
       
        <section className='post-container'>
        <div className='post'>
            <div className="post-header">
            <Avatar 
            className='post-avatar'
            src="/static/images/avatar/1.jpg" />
            <h3>{workout.username}</h3>
            </div>
            
            <p className='post-text'><u>{workout.caption}</u></p> 
            <div className='post__description'><p>{workout.description}</p></div>
            <img className='post-image' src={workout.url} alt="" />
            {/* <p>{workout.createdAt}</p> */}
            <div className='action-plan'>
            <div className="post-actions">
                    {isLiked ? (
                        <FavoriteIcon onClick={handleLikeClick} style={{ color: '#FF5733', cursor: 'pointer', fontSize: '30px', marginRight: '10px' }} />
                    ) : (
                        <FavoriteBorderIcon onClick={handleLikeClick} style={{ cursor: 'pointer', fontSize: '30px', marginRight: '10px' }} />
                    )}
                   
                   <CommentIcon onClick={handleCommentIconClick} style={{ color: '#33A3FF', cursor: 'pointer', fontSize: '30px', margin: '10px' }} />

                   <ShareIcon
                onClick={handleShareClick}
                style={{ color: 'blue', cursor: 'pointer', fontSize: '30px', margin: '10px' }}
              />
                   
            </div>
            <div>       
            <span>{likes} likes</span>
                    
                        {/* <span style={{ margin: '5px' }}>{comments.length} comments</span> */}
                        </div>
                            {showCommentTextarea && (
                                <div className="comments">
                                    <h4>Comments</h4>
                                    {comments.map((comment, index) => (
                                    <p key={index}><strong>{workout.username}</strong>  {comment}</p>
                                    ))}
                                    <form onSubmit={handleSubmitComment}>
                                    <textarea className='comment-form-textarea'
                                        placeholder="Write your comment..."
                                        value={newComment}
                                        onChange={handleCommentChange}
                                    />
                                    {/* <AddReactionIcon onClick={handleEmoji} /> */}
                                    <button className='comment-form-button' type="submit">Submit</button>
                                    </form>
                                    
                                </div>
                        )}
                   
                        </div>            

                        <span><strong><small>{calculateTimeDifference(workout.createdAt)}</small></strong></span> 
        </div>
                        
                    
        </section>
        </>
    )   
}

export default WorkoutDetails