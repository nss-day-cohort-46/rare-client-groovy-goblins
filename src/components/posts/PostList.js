import React, { useContext, useEffect, useRef } from "react"
import { PostContext } from "./PostProvider"
import { Link, useParams } from "react-router-dom"
import "./Post.css"

export const PostList = () => {
    const { posts, getPosts, getPostsByUserId } = useContext(PostContext)

    const { user_id } = useParams()

    useEffect(() => {
        if (user_id > 0) {
            getPostsByUserId(user_id)
        } else {
            getPosts()
        }
    }, [])


    return (
        <>
            <div>
                {posts.map(post =>
                    <div className="post_card" key={post.id}>
                        <p><b>Title: </b>{post.title}</p>
                        <p><b>Category: </b>{post.category.label}</p>
                        <p><b>Author: </b>{post.author.first_name} {post.author.last_name}</p>
                        <button ><Link to={{ pathname: `/posts/user/edit/${post.id}`
                        }}>edit</Link></button>
                    </div>
                )}
            </div>
        </>
    )
}