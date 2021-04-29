import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useHistory, useParams } from 'react-router-dom';
import { CategoryContext } from "../category/CategoryProvider";

export const PostForm = () => {
    const { addPost, editPost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))


    const [post, setPost] = useState({
      
      user_id: session_user_id,
      category_id: 0,  
      title: "",
      image_url: "",
      content: ""
    })

	  const history = useHistory();
    const postId = useParams();
    console.log('postId: ', postId.postId);
    const parsePostId = postId
    console.log('parsePostId: ', parseInt(postId.postId));
    const user_id = localStorage.getItem("rare_user_id")

    
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
    } if (parsePostId !== 0) {
          editPost({
            id: postId.postId,
            title: post.title,
            content: post.content,
            category_id: parseInt(post.category_id),
            image_url: post.image_url
          })
    .then(() => history.push(`/posts/user/${user_id}`)) //This link string might be different for posts. Hasn't been coded yet.
        } else {
          addPost({
              user_id: post.user_id,
              category_id: parseInt(post.category_id),
              title: post.title,
              image_url: post.image_url,
              content: post.content
          })
          .then(() => history.push("/posts")) //This link string might be different for posts. Hasn't been coded yet.
    }   
  }

 

    useEffect(() => {
      getCategories()
    }, [])

    return (
      <form className="postForm">
        <h2 className="postForm__title">Make a Post</h2>
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
            <label htmlFor="category">Category:</label>
            <select value={post.category_id} id="category_id" className="form-control" onChange={handleControlledInputChange}>
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
          }}>{postId ? "Edit Post" : "Make Post"}</button>
      </form>
    )
}