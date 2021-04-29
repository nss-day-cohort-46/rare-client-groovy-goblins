import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Post.css"

export const PostList = () => {
    const { posts, getPosts, getPostsByUserId, deletePost } = useContext(PostContext)

    const logged_in_user = localStorage.getItem("rare_user_id")
    const { user_id } = useParams()
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(true)

    console.log(`loged in user ${logged_in_user}`)
    console.log(`user_id ${user_id}`)

    useEffect(() => {
        if (user_id > 0) {
            getPostsByUserId(user_id)
                .then(() => setIsLoading(false))
        } else {
            getPosts()
                .then(() => setIsLoading(false))
        }
    }, [])

    const handleDelete = ( id ) => {
        
        if(window.confirm("Confirm Deletion")) {
            deletePost(id, user_id)
                .then(() => history.push(`/posts/user/${user_id}`))
        }
    }

    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if(isLoading) return (<div>Loading</div>)

    return (<>

        <div>
            {posts.map(post =>
                <div className="post_card" key={post.id}>
                    <p><b>Title: </b>{post.title}</p>
                    <p><b>Category: </b>{post.category.label}</p>
                    <p><b>Author: </b>{post.author.first_name} {post.author.last_name}</p>

                    {
                        user_id === logged_in_user
                        ?
                        <button type="button" id="deletePost" onClick={(e) => {
                            e.preventDefault()
                            handleDelete(post.id)
                        }}>Delete</button>
                        : <></>
                    }
                </div>
            )}
        </div>
    </>)
}
