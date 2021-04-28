import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { CategoryForm } from "./CategoryForm"


export const Category = () => {

 const { categories, getCategories } = useContext(CategoryContext)

 const [ loaded, setIsLoaded ] = useState(false)

  useEffect(() => {
   getCategories()
    .then(() => setIsLoaded(true))
  }, []) // useEffect

 return (
  <>
    <CategoryForm />

   <div>Categories</div>
   {
    loaded
    ?
     <ul className="categories">
     {
      categories.map((category, idx) => <li className="category" key={idx}>{category.label}</li>)
     }
     </ul>
    
    : <div>Loading</div> 
   }
  </>
 )
}