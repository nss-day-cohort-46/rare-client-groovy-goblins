import React, { createContext, useState } from "react"

export const ReactionContext = createContext()

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([])

    const getReactions = () => {
        return fetch("http://localhost:8000/reactions", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>{
            setReactions(res)
            return res
        })
    }

    const addReaction = reaction => {
        return fetch(`http://localhost:8000/posts/${reaction.postId}/react`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
    }
    
    const removeReaction = reaction => {
        return fetch(`http://localhost:8000/posts/${reaction.postId}/react`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
    }

    const createReaction = reaction => {
        return fetch("http://localhost:8000/reactions", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
        .then(getReactions)
    }

    return(
        <ReactionContext.Provider value={{
            getReactions, addReaction, removeReaction, createReaction, reactions
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}