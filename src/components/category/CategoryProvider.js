import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories",{
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setCategories)
    }

    const addCategory = ( category ) => {
    return fetch(`http://localhost:8000/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(category)
        })
    .then(getCategories)

    } // addCategory

    const deleteCategory = id => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            method: "DELETE"
        })
            .then(getCategories)
    }


    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, deleteCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}