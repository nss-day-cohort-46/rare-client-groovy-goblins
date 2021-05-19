import React, {useState, createContext } from "react"

export const TagContext = createContext()

export const TagProvider = props => {
    const [ tags, setTags ] = useState([])

    const getTags = () => {
        return fetch("http://localhost:8000/tags", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setTags)
    } // getTags

    const addTag = new_tag => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(new_tag)
        })
    }

    const deleteTagById = ( id ) => {
        return fetch(`http://localhost:8000/tags/${ id }`, {
            method: "DELETE",
            headers: {
                'Authorization': `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getTags)
    } // deleteTagById


    return (
        <TagContext.Provider value={{
            tags, addTag, getTags, deleteTagById
        }}>
            {props.children}
        </TagContext.Provider>
    )
}
