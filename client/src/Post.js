import React from 'react'
import { useSelector } from 'react-redux';
import { selectOpenPost } from './reducers/postReducer'
import moment from 'moment';
import './Post.css'

function Post() {
    const post = useSelector( selectOpenPost );

    return (
        <div className='post'>
            {post ? 
            (
                <>
                    <h2 className="post_creator">{post.name}</h2>
                    <p className="post_time">{moment(post.createdAt).fromNow()}</p>
                    <img className="post_image" src={post.selectedFile}/>
                    <p className="post_message"><span>{post.name}:</span>{post.message}</p>
                </>
            ) : null}
        </div>
    )
}

export default Post
