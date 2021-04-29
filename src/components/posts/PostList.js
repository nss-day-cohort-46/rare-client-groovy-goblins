import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Post.css"

export const PostList = () => {
    const { posts, getPosts, getPostsByUserId, deletePost } = useContext(PostContext)

    const { user_id } = useParams()
    const history = useHistory()

    useEffect(() => {
        if (user_id > 0) {
            getPostsByUserId(user_id)
        } else {
            getPosts()
        }
    }, [])

    const handleDelete = ( id ) => {
        
        if(window.confirm("Confirm Deletion")) {
            deletePost(id, user_id)
                .then(() => history.push(`/posts/user/${user_id}`))
        }
    }


    return (<>
        <div>
            {posts.map(post =>
                <div className="post_card" key={post.id}>
                    <p><b>Title: </b>{post?.title}</p>
                    <p><b>Category: </b>{post.category?.label}</p>
                    <p><b>Author: </b>{post.author?.first_name} {post.author?.last_name}</p>
                    <button type="button" id="deletePost" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(post.id)
                    }}>Delete</button>
                </div>
            )}
        </div>
    </>)
}
