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

    const getTagById = ( id ) => {
      return fetch(`http://localhost:8000/tags/${id}`, {
        headers:{
          "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        }
      })
      .then(response => response.json())
    } // getTagById

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

    const editTagById = ( tag ) => {
        return fetch(`http://localhost:8000/tags/${ tag.id }`, {
            method: "PUT",
            headers: {
                'Authorization': `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(getTags)
    } // editTagById

    return (
        <TagContext.Provider value={{
            tags, addTag, getTags, deleteTagById, editTagById, getTagById
        }}>
            {props.children}
        </TagContext.Provider>
    )
}
