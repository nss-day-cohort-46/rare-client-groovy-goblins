import React, { useContext, useEffect, useRef, useState } from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Post.css"

export const PostList = () => {
    const { posts, getPosts, getPostsByUserId, deletePost, approvePost } = useContext(PostContext)
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)






    useEffect(() => {

        if (userId) {
            if (userId !== CurrentUserId) {
                setIsLoading(false)
            } else {
                getPostsByUserId(userId)
                    .then(() => setIsLoading(false))

            }
        } else {
            getPosts()
                .then(() => setIsLoading(false))
        }
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deletePost(id, userId)
                .then(() => history.push(`/posts/user/${userId}`))
        }
    }

    const approveButton = post => {

        if (isStaff) {

            {
                return (
                    <button type="button" key={`approve--${post.id}`} onClick={(e) => {
                        e.preventDefault()
                        approvePost(post)
                    }}> 
                    {post.approved ? "Un-approve" : "Approve"}
                    </button>
                )
            }

        }
    }


    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)


    return (<>

        <div>
            {sortedPosts.map(post =>
                <div className="post_card" key={post.id}>
                    <p><b>Title: </b><Link to={`/posts/detail/${post.id}`}> {post.title}</Link></p>
                    <p><b>Author: </b>{post.user.first_name} {post.user.last_name}</p>
                    <p><b>Category: </b>{post.category.label}</p>
                    {/* <p><b>Posted: </b>{post.publication_date}</p>
                    <p><b>user id: </b>{post.user.id}</p> */}

                    {
                        session_user_id === post.user_id
                            ? <button >
                                <Link to={{
                                    pathname: `/posts/user/edit/${post.id}`
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
                    {approveButton(post)}
                    {
                        parseInt(CurrentUserId) === post.user.id
                            ? <button >
                                <Link to={{
                                    pathname: `/posts/user/edit/${post.id}`
                                }}>edit</Link>
                            </button>
                            : ""
                    }
                    {
                        parseInt(CurrentUserId) === post.user.id
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



