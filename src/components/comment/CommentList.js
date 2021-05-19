import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { CommentContext } from "./CommentProvider"

export const CommentList = () => {
    const {getComments, comments, createComment, deleteComment, getCommentById, editComment} = useContext(CommentContext)
    const {postId} = useParams()
    const userId = parseInt(localStorage.getItem("userId"))
    const [isLoading, setIsLoading] = useState(true)

    let d = new Date();
    d = new Date(d.getTime() - 3000000);
    const date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length===2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length===2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length===2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length===2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    
    const [comment, setComment] = useState({
        postId: parseInt(postId),
        content: "",
        createdOn: date_format_str
    })

    const handleInputChange = (event) => {
        let newComment = {...comment}
        newComment[event.target.id] = event.target.value
        setComment(newComment)
    }

    const handleSubmitClick = (event) => {
        setIsLoading(true)
        if(comment.id){
            return editComment(comment)
            .then(setComment({
                postId: parseInt(postId),
                content: "",
                createdOn: date_format_str
            }))
            .then(getComments(parseInt(postId)))
            .then(setIsLoading(false))
        } else{
            return createComment(comment)
            .then(setComment({
                postId: parseInt(postId),
                content: "",
                createdOn: date_format_str
            }))
            .then(getComments(parseInt(postId)))
            .then(setIsLoading(false))
        }
    }

    const handleDeleteClick = (event) => {
        setIsLoading(true)
        const [prefix, id] = event.target.id.split("--")
        return deleteComment({
            commentId: parseInt(id),
            postId: parseInt(postId)
        })
        .then(getComments(parseInt(postId)))
        .then(setIsLoading(false))
    }

    const handleEditClick = (event) => {
        const [prefix, id] = event.target.id.split("--")
        getCommentById(parseInt(id))
        .then(res=>setComment({
            id: res.id,
            postId: res.post,
            authorId: res.author,
            content: res.content,
            createdOn: res.created_on
        }))
    }

    useEffect(() => {
        getComments(postId)
        .then(setIsLoading(false))
    }, [])

    return(
        <>
        <section className="commentForm">
            <label htmlFor="commentForm__content">Comment: </label>
            <input type="text" onChange={handleInputChange} id="content" value={comment.content} autoFocus required></input>
            <button disabled={isLoading} onClick={handleSubmitClick}>Submit</button>
        </section>
        <section className="commentList">
            {comments?.map(comment=>{
                return <div className="commentCard" key={comment.id}>
                    <div className="commentCard__author">Author: {comment.author}</div>
                    <div className="commentCard__date">Date: {comment.created_on}</div>
                    <div className="commentCard__content">{comment.content}</div>
                    {
                        comment.author === userId 
                        ? <button id={`delete--${comment.id}`} onClick={handleDeleteClick}>Delete</button>
                        : <></>
                    }
                    {
                        comment.author === userId 
                        ? <button id={`edit--${comment.id}`} onClick={handleEditClick}>Edit</button>
                        : <></>
                    }
                </div>
            })}
        </section>
        </>
    )
}