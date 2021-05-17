import React, { useContext, useEffect } from "react"
import { TagContext } from "./TagProvider"
import "./TagList.css"

export const TagList = () => {
 const { tags, getTags } = useContext(TagContext)

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
  </> 
  : <>Loading Tags</>
 )
}