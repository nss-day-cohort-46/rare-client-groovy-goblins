import React, { useContext, useEffect, useRef, useState } from "react"
import { PostContext } from "./PostProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Post.css"

export const PostList = () => {
    const { posts, getPosts, getPostsByUserId, deletePost } = useContext(PostContext)
    const sortedPosts = posts?.sort((a, b) => a.publication_date > b.publication_date ? -1 : 1)
    console.log('posts: ', posts);
    const CurrentUserId = localStorage.getItem("userId")
    // console.log('userId: ', userId);

    const { userId } = useParams()
    console.log('userId: ', userId);
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
    
    const handleDelete = ( id ) => {
        
        if(window.confirm("Confirm Deletion")) {
            deletePost(id, userId)
            .then(() => history.push(`/posts/user/${userId}`))
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
                    <p><b>Author: </b><Link to={`profiles/${post.user.id}/detail`}>{post.user.first_name} {post.user.last_name}</Link></p>
                    <p><b>Category: </b>{post.category.label}</p>
                    {/* <p><b>Posted: </b>{post.publication_date}</p>
                    <p><b>user id: </b>{post.user.id}</p> */}

                    {
                        parseInt(CurrentUserId)  === post.user.id
                        ? <button >
                            <Link to={{ pathname: `/posts/user/edit/${post.id}`
                            }}>edit</Link>
                        </button> 
                        : ""
                    }
                    {
                        parseInt(CurrentUserId)  === post.user.id 
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



