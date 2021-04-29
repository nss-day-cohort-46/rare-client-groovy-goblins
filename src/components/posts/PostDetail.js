import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams } from "react-router-dom"

export const PostDetail = () => {
  const { getPostById } = useContext(PostContext)

	const [post, setPost] = useState({})

	const {postId} = useParams();

  
  useEffect(() => {
    getPostById(postId)
    .then((response) => {
      setPost(response)
    })
    }, [])

  return (
    <section className="post">
      <h3 className="post__title">{post.title}</h3>
      <div className="post__image">{post.image_url}</div>
      <div className="post__content">{post.content}</div>
      <div className="post__created_on">{post.created_on}</div>
      <div className="post__author__first_name">{post.user?.first_name} {post.user?.last_name}</div>
    </section>
  )
}
