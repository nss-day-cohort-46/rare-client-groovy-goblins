import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams } from "react-router-dom"

export const PostDetail = () => {
  const { getPostById } = useContext(PostContext)

	const [post, setPost] = useState({})
  console.log('post: ', post);

	const {postId} = useParams();

  
  useEffect(() => {
    getPostById(postId)
    .then((response) => {
      setPost(response)
    })
    }, [])
    
    // const newObj = {
    //   image: post.image_url
    // }
  return (
    <>
    <section className="post">
      <h3 className="post__title">{post.title}</h3>
      <img className="post__image" src={post.image_url} alt="" />
      <div className="post__content">{post.content}</div>
      <div className="post__created_on">{new Date(post.publication_date).toLocaleDateString()}</div>
      <div className="post__author__first_name">{post.user?.first_name} {post.user?.last_name}</div>
    </section>
    <multiselect>Tags</multiselect>
    </>
  )
}