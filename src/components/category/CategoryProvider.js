import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8088/categories")
            .then(res => res.json())
            .then(setCategories)
    }

    const deleteCategory = id => {
        return fetch(`http://localhost:8088/categories/${id}`, {
            method: "DELETE"
        })
            .then(getCategories)
    }


    return (
        <CategoryContext.Provider value={{
            categories, getCategories, deleteCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}