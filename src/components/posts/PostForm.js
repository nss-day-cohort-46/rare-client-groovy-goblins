import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useHistory } from 'react-router-dom';

export const PostForm = () => {
    const { addPost } = useContext(PostContext)
    const session_user_id = localStorage.getItem(parseInt("rare_user_id"))

    //for edit, hold on to state of post in this view
    const [post, setPost] = useState({
      user_id: session_user_id,
      category_id: 0,  
      title: "",
      image_url: "",
      content: ""
    })

	  const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
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
        // Add a conditional for the category_id to make sure the user picks one
          addPost({
              user_id: post.user_id,
              category_id: post.category_id,
              title: post.title,
              image_url: parseInt(post.image_url),
              content: parseInt(post.content)
          })
          .then(() => history.push("/posts")) //This link string might be different for posts. Check it
    }

    // useEffect(() => {
    //   getCustomers()
    //   .then(getLocations)
    // }, [])

    return (
      <form className="postForm">
        <h2 className="postForm__title">Add post</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="postTitle">Post Title: </label>
            <input type="text" id="title" required autoFocus className="form-control"
            placeholder="post title"
            onChange={handleControlledInputChange}
            value={post.title}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
              <label htmlFor="content">post content:</label>
              <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus 
              className="form-control" 
              placeholder="post content" 
              value={post.content}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
              <label htmlFor="image_url"></label>
              <input type="text" id="image_url" onChange={handleControlledInputChange} required autoFocus 
              className="form-control" 
              placeholder="header image url" 
              value={post.image_url}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="category">Assign to category: </label>
            <select value={animal.category_id} id="category_id" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a category</option>
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
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSavePost()
          }}>Add Post</button>
      </form>
    )
}