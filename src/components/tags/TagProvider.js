import React, {useState, createContext } from "react"

export const TagContext = createContext()

export const TagProvider = props => {
    const [ tags, setTags ] = useState([])



    const addTag = new_tag => {
        return fetch("http://localhost:8088/tags", {
            method: "POST",
            headers: {
                "Content-Type": "aaplicatio/json"
            },
            body: JSON.stringify(new_tag)
        })
    }
    return (
        <TagContext.Provider value={{
            tags, addTag
        }}>
            {props.children}
        </TagContext.Provider>
    )
}
