import React, {useState, createContext } from "react"

export const TagContext = createContext()

export const TagProvider = props => {
    const [ tags, setTags ] = useState([])



    const addTag = new_tag => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(new_tag)
        })
    }
    
    const getTags = () => {
        return fetch("http://localhost:8000/tags", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setTags)
    } // getTags

    return (
        <TagContext.Provider value={{
            tags, addTag, getTags, setTags
        }}>
            {props.children}
        </TagContext.Provider>
    )
}
