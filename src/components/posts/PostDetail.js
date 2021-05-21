import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams } from "react-router-dom"
import { TagContext } from "../tags/TagProvider"
// import { Multiselect } from 'multiselect-react-dropdown'

export const PostDetail = () => {
  const { getPostById } = useContext(PostContext)
  const {tags, getTags, addPostTag, removePostTag } = useContext(TagContext)
  const [postTags, setPostTags] = useState({
            tags: []
  })
	const [post, setPost] = useState({
      
  })
  console.log('post: ', post);
  const [isLoading, setIsLoading] = useState(true)
  const userId = localStorage.getItem("userId")
	const {postId} = useParams();

  useEffect(() => {
    
    getPostById(postId)
    .then((response) => {
      getTags()
      setPost(response)
    })
    }, [])
    
    const handleAddTagClick = (event) => {
      setIsLoading(true)
      const tagId = event.target.value
      addPostTag({
          postId: parseInt(postId),
          tagId: parseInt(tagId)
        })
        .then(res=>{
            if(res.statusText === "Created"){
            } else if(res.statusText === "No Content"){
              removePostTag({
                  postId: parseInt(postId),
                  tagId: parseInt(tagId)
              })
              }
              
        })
        setIsLoading(false)
    }
    // let user = post.user
    // console.log('id: ', user);
  return (
    <>
    <section className="post">
      <h3 className="post__title">{post.title}</h3>
      <img className="post__image" src={post.image_url} alt="" />
      <div className="post__content">{post.content}</div>
      <div className="post__created_on">{new Date(post.publication_date).toLocaleDateString()}</div>
      <div className="post__author__first_name">{post.user?.first_name} {post.user?.last_name}</div>
      <div>#Tags: {post.tags?.map(tag => {
            return tag.label
          }).join(", ")}</div>
    </section>

    <div>
      {userId ?
      <select value={post.tags} multiple>
        {tags.map(t => (
                <option key={t.id} value={t.id} onClick={handleAddTagClick}> 
                  {t.label}
                </option>
              ))}
      </select> : <></>}
      </div>
    </>
  )
}