import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories")
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

    const deleteCategoryById = id => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(getCategories)
    }


    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, deleteCategoryById
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}