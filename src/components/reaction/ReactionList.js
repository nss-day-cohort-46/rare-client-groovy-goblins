import React, { createRef, useContext, useEffect, useState } from "react"
import { ReactionContext } from "./ReactionProvider"

export const ReactionList = () => {
    const {getReactions, createReaction, reactions} = useContext(ReactionContext)

    const isStaff = localStorage.getItem("isStaff") === "true"
    const [newReaction, setNewReaction] = useState({
        label: "",
        imageUrl: ""
    })

    const handleInputChange = (event) => {
        let reaction = {...newReaction}
        reaction[event.target.id] = event.target.value
        setNewReaction(reaction)
    }

    const handleSubmitClick = (event) => {
        event.preventDefault()
        createReaction(newReaction)
        .then(()=>{
            setNewReaction({
                label: "",
                imageUrl: ""
            })
        })
    }

    useEffect(() => {
        getReactions()
    }, [])

    return isStaff
    ?   <>
            <div className="reactionList">
                <h3>Reactions</h3>
                {
                    reactions.map(reaction=>{
                        return <section className="reactionCard" key={reaction.id}>
                            <div className="reactionCard__label">{reaction.label}</div>
                            <div className="reactionCard__image">{<img src={reaction.image_url} alt={reaction.label} style={{pointerEvents:"None"}} width="20vh" height="20vh" />}</div>
                        </section>
                    })
                }
            </div>
            <div className="reactionForm">
                <h3>Create a New Reaction</h3>
                <form>
                    <label htmlFor="label">Label: </label>
                    <input name="label" id="label" onChange={handleInputChange} autoFocus required></input><br />
                    <label htmlFor="imageUrl">Image URL: </label>
                    <input name="imageUrl" id="imageUrl" onChange={handleInputChange} required></input><br />
                    <button onClick={handleSubmitClick}>Create</button>
                </form>
            </div>
        </>
    :   <>
            <div>User Acess Denied</div>
        </>
}