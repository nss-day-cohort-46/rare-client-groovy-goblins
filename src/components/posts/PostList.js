import React, { useContext, useEffect, useRef, useState } from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Post.css"

export const PostList = () => {
    const { posts, getPosts, getPostsByUserId, deletePost } = useContext(PostContext)
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const { user_id } = useParams()
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(true)


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
            {sortedPosts.map(post =>
                <div className="post_card" key={post.id}>
                    <p><b>Title: </b><Link to={`/posts/detail/${post.id}`}> {post.title}</Link></p>

                    <p><b>Category: </b>{post.category.label}</p>
                    <p><b>Author: </b>{post.user.id} {post?.author?.last_name}</p>
                    <p><b>Posted: </b>{post.publication_date}</p>

                    {
                        session_user_id === post.user_id 
                        ? <button >
                            <Link to={{ pathname: `/posts/user/edit/${post.id}`
                            }}>edit</Link>
                        </button> 
                        : ""
                    }
                    {
                        session_user_id === post.user_id
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



