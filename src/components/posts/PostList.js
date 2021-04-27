import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { Link, useParams } from "react-router-dom"

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

    useEffect(() => {
        console.log(posts)
    }, [posts])

    return (
        <>
            <div>
                {posts.map(post =>
                    <div>
                        <p>{post.title}</p>
                        <p>{post.title}</p>
                    </div>
                )}
            </div>
        </>
    )
}