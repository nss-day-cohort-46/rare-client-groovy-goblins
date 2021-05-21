import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setCategories)
    }

    const getCategoryById = ( id ) => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(response => response.json())
    } // getCategoryById

    const addCategory = ( category ) => {
    return fetch(`http://localhost:8000/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
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

    const editCategoryById = ( category ) => {
    return fetch(`http://localhost:8000/categories/${ category.id }`, {
        method: "PUT",
        headers: {
            'Authorization': `Token ${localStorage.getItem("rare_user_id")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
    .then(getCategories)
    } // editTagById


    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, deleteCategoryById, editCategoryById, getCategoryById
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}
