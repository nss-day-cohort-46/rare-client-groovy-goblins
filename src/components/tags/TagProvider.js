import React, {useState, createContext } from "react"

export const TagContext = createContext()

export const TagProvider = props => {
    const [ tags, setTags ] = useState([])

    const getTags = () => {
        return fetch("http://localhost:8000/tags", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setTags)
    } // getTags

    const addTag = new_tag => {
        return fetch("http://localhost:8088/tags", {
            method: "POST",
            headers: {
                "Content-Type": "aaplication/json"
            },
            body: JSON.stringify(new_tag)
        })
    }
    return (
        <TagContext.Provider value={{
            tags, addTag, getTags
        }}>
            {props.children}
        </TagContext.Provider>
    )
}
