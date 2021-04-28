import React, { createContext, useState } from "react"


const BASEURL = `http://localhost:8088`


export const CategoryContext = createContext()

export const CategoryProvider = ( props ) => {

 const [ categories, setCategories ] = useState([])

 const addCategory = ( category ) => {
   return fetch(`${BASEURL}/categories`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(category)
   })
   .then(getCategories)

 } // addCategory


 const getCategories = () => {
  return fetch(`${BASEURL}/categories`)
   .then(res => res.json())
   .then(setCategories)
 } //getCategories

 return (
  <CategoryContext.Provider value={{
    addCategory,
   categories,
   getCategories
  }}>
   { props.children }
  </CategoryContext.Provider>
 )
}
