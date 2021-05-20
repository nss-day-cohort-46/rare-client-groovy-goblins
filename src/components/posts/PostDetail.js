import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { Link, useParams } from "react-router-dom"
import { ReactionContext } from "../reaction/ReactionProvider"

export const PostDetail = () => {
    const { getPostById } = useContext(PostContext)
    const {reactions, getReactions, addReaction, removeReaction} = useContext(ReactionContext)

    const [post, setPost] = useState({})

    const {postId} = useParams();

  
    useEffect(() => {
        getReactions()
        .then(getPostById(postId))
        .then((response) => {
            setPost(response)
        })
    }, [])
        
        // const newObj = {
        //   image: post.image_url
        // }
    return (
        <section className="post">
        <h3 className="post__title">{post.title}</h3>
        <img className="post__image" src={post.image_url} alt="" />
        <button><Link to={`/posts/comments/${post.id}`}>View Comments</Link></button>
        {

        }
        <div className="post__content">{post.content}</div>
        <div className="post__created_on">{new Date(post.publication_date).toLocaleDateString()}</div>
        <div className="post__author__first_name">{post.user?.first_name} {post.user?.last_name}</div>
        </section>
    )
}