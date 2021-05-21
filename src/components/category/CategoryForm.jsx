import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { CategoryContext } from "./CategoryProvider"

export const CategoryForm = () => {
 const { addCategory, getCategoryById, editCategoryById } = useContext(CategoryContext)
 
 const [ formField, setFormField ] = useState({
   id: 0,
   label: "",
  })
  
  const history = useHistory()
  const { categoryId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

 const handleControlledInputChange = ( event ) => {
   const newformField = { ...formField }
 
  newformField[event.target.id] = event.target.value
  setFormField(newformField)
 } // handleControlledInputChange

 const handleSaveCategory = ( event ) => {
  event.preventDefault()
  const newformField = { ...formField }
  
  if(categoryId) {
    editCategoryById(newformField)
      .then(history.push("/categories"))
  } else {
    addCategory(newformField)
      .then(history.push("/categories"))
  }

 } // handleSaveCategory


  useEffect(() => {
    if (categoryId) {
      const category = getCategoryById(categoryId).then(setFormField)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])


 return (
  //  method="post" 
  <>
    <form action="" onSubmit={handleSaveCategory}>
      { categoryId ? <h2>Edit Category</h2> : <h2>Add Category</h2> }
 
      { categoryId ? <div>{ formField.label } </div> : <></> }
      <fieldset>
        <label htmlFor="label">{ categoryId ? "Edit" : "New" } Category: </label>
        <input 
        type="text" 
        id="label" 
        name="label"
        placeholder={ categoryId ? "Edit Category" : "New Category" }
        value={formField.label}
        onChange={(e) => {handleControlledInputChange(e)}}
        autoFocus />
      </fieldset>
      {/* <button type="submit" id="submit" onClick={handleSaveCategory}>Add</button> */}
        <button type="submit" id="submit"
          // onClick={handleSaveCategory}
          disabled={isLoading}>
          { categoryId ? "Update" : "Save" }
        </button>
    </form>
  </>
 )
}