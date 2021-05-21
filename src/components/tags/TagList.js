import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { TagContext } from "./TagProvider"
import "./TagList.css"

export const TagList = () => {
 const { tags, getTags, deleteTagById, editTagById } = useContext(TagContext)
 const loggedInUser = localStorage.getItem("rare_user_id")
 const isStaff = JSON.parse(localStorage.getItem("isStaff"))

 useEffect(() => {
  getTags()
 }, [])

 const deleteHandler = ( indx ) => deleteTagById(indx)

 // So we wouldn't have to worry about missing ?'s in the return component
 // and avoid the "cannot find label of undefined" error.
 // Comment to commit and push for pull request.
 // Array.isArray(tags) - for some rason, component is keeping state after navigating to a different
 // page and then navigating back. This can cause an error if Arra.isArray(tags) is replaced by just
 // tags. To recreate the error, log out and clear cache/user token.
 // Replace Array.isArray(tags) with tags.
 // Click on the Tags Mangement link.
 // Click on Login link and log in.
 // Click on Tags Mangement link again.
 if(!Array.isArray(tags)) return (<div>Loading Tags</div>)

 return (
    loggedInUser && Array.isArray(tags)
    ?
      <>
        <h2>Tags</h2>

        <ul className="tags_list">
          {
            tags.map((tag) => {

              return <li key={tag.id} className="tags_list--item">
                <div className="tag_label">{ tag.label }</div>
                { isStaff && <div>

                <Link className="link--edit" to={`/tags/edit/${tag.id}`}>
                  <button className="btn--edit" type="button">
                    Edit Tag
                  </button>
                </Link>
                  <button className="btn--delete" onClick={(e) => {
                    e.preventDefault()
                    deleteHandler(tag.id)
                  }}>Delete</button>
                </div> }
              </li>
            })
          }
        </ul>
        <Link to="/tags/create">
          <button className="createTag" type="button">
            Create Tag
          </button>
        </Link>
      </>
    :
      <>
        Please Log In to View
      </>
 )
}
