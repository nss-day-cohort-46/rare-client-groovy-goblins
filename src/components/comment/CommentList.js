import React, { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { CommentContext } from "./CommentProvider"

export const CommentList = () => {
    const {getComments, comments} = useContext(CommentContext)
    const {postId} = useParams()

    useEffect(() => {
        getComments(postId)
    }, [])

    return(
        <>
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