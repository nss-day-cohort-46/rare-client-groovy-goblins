import React, { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CategoryContext } from "./CategoryProvider"

export const CategoryForm = () => {
 const { addCategory } = useContext(CategoryContext)
 const [ formField, setFormField ] = useState({
  "label": "",
 })

 const history = useHistory()

 const handleControlledInputChange = ( event ) => {
  const newformField = { ...formField }
 
  newformField[event.target.id] = event.target.value
  setFormField(newformField)
 } // handleControlledInputChange

 const submitUpdate = ( event ) => {
  event.preventDefault()
  const newformField = { ...formField }

  addCategory(newformField)
   .then(() => history.push("/categories"))
 } // updateMove


 return (
  <form action="" method="post">
   <fieldset>
    <label htmlFor="label">New Category: </label>
    <input 
    type="text" 
    id="label" 
    name="label"
    placeholder="Add New Category"
    value={formField.label}
    onChange={(e) => {handleControlledInputChange(e)}}
    autoFocus />

   </fieldset>
   <button type="submit" id="submit" onClick={submitUpdate}>Add</button>
  </form>
 )
}