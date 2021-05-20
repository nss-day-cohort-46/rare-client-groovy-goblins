import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useHistory, useParams } from 'react-router-dom';
import { CategoryContext } from "../category/CategoryProvider";

export const PostForm = () => {
    const { addPost, editPost, getPosts, posts } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    console.log('categories: ', categories);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    
    
    const [post, setPost] = useState({
      user_id: session_user_id,
      category: 0,  
      title: "",
      image_url: "",
      content: ""
    })
    console.log('posts: ', posts);

	  const history = useHistory();
    const {postId} = useParams();
    const userId = localStorage.getItem("userId")

    
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newPost = { ...post }
      //post is an object with properties.
      //set the property to the new value
      newPost[event.target.id] = event.target.value
      //update state
      setPost(newPost)
    }

    const handleSavePost = () => {
    if (parseInt(post.category_id) === 0) {
      window.alert("Please select a category")
    } if (postId > 0) {
          editPost({
            id: post.id,
            title: post.title,
            content: post.content,
            categoryId: parseInt(post.category.id),
            imageUrl: post.image_url
          })
    .then(() => history.push(`/posts/user/${userId}`)) //This link string might be different for posts. Hasn't been coded yet.
        } else {
          addPost({
              user_id: post.user_id,
              categoryId: parseInt(post.category.id),
              title: post.title,
              imageUrl: post.image_url,
              content: post.content
          })
          .then(() => history.push("/posts")) //This link string might be different for posts. Hasn't been coded yet.
    }   
  }

useEffect(() => {
  getCategories()
  if (postId) {
  getPosts()
  .then(posts => { 
    const PostById = posts.find(p => p.id === parseInt(postId))
    
    setPost(PostById)
  })}
}, [])
    
    return (
      <form className="postForm">
        <h2 className="postForm__title">{postId > 0 ? "Edit a post" : "Make a post"}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="postTitle">Title:</label>
            <input type="text" id="title" required autoFocus className="form-control"
            placeholder="Post Title"
            onChange={handleControlledInputChange}
            value={post.title}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
              <label htmlFor="content">Content:</label>
              <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus 
              className="form-control" 
              placeholder="Post Content" 
              value={post.content}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
              <label htmlFor="image_url">Image URL (optional):</label>
              <input type="text" id="image_url" onChange={handleControlledInputChange} autoFocus 
              className="form-control" 
              placeholder="Header Image URL" 
              value={post.image_url}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="categoryId">Category:</label>
            <select value={post.category.id} id="category" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleSavePost()
          }}>{postId > 0 ? "Edit post" : "Make post"}</button>
        {postId.postId > 0 ? <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            history.push(`/posts/user/${userId}`)}}
          >Cancel</button> : "" }
      </form>
    )
}