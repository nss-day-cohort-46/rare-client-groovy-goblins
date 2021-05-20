import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { PostContext } from "../posts/PostProvider"
import { CommentContext } from "./CommentProvider"

export const CommentList = () => {
    const {getComments, comments} = useContext(CommentContext)
    const {getPostById} = useContext(PostContext)
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        getComments(postId)
        getPostById(postId)
        .then(setPost)
    }, [])

    return(
        <>
        <h3>{post.title}'s Comments</h3>
        {
            comments?.map(comment=>{
                return <div className="commentCard" key={comment.id}>
                    <div className="commentCard__author">Author: {comment.author}</div>
                    <div className="commentCard__date">Date: {comment.created_on}</div>
                    <div className="commentCard__content">{comment.content}</div>
                </div>
            })
        }
        </>
    )
}