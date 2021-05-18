import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { TagContext } from "./TagProvider"
import "./TagList.css"

export const TagList = () => {
 const { tags, getTags } = useContext(TagContext)
 const loggedInUser = localStorage.getItem("lu_token")

 useEffect(() => {
  getTags()
 }, [])

 // So we wouldn't have to worry about missing ?'s in the return component
 // and avoid the "cannot find label of undefined" error.
 if(!tags) return (<div>Loading Tags</div>)

 return (
  tags
  ?<>
   <h2>Labels</h2>
   <ul className="tags_list">
     {
      tags.map((tag, i) => <li key={i} className="tags_list--item">{ tag.label }</li>)
     }
   </ul>

     {
       loggedInUser
       ?
        <Link to="/tags/create">
          <button className="crateTag" type="button">
            Create Tag
          </button>
        </Link>
       : <></>
     }
  </> 
  : <>Loading Tags</>
 )
}