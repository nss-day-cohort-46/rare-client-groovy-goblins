import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TagContext } from "./TagProvider"

export const TagForm = () => {
    const { addTag, getTagById, editTagById } = useContext(TagContext)

    const [tag, setTag] = useState({
        id: 0,
        label: ""
    })

    const history = useHistory()
    const { tagId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newTag = { ...tag }
        let newLabel = event.target.value

        newTag.label = newLabel

        setTag(newTag)
    }

    const handleSaveTag = (event) => {
        event.preventDefault()

        const tag = { ...tag }
        
        if(tagId) {
            editTagById(tag)
                .then(history.push("/tags"))
        } else {
            addTag(tag)
                .then(history.push("/tags"))

        }
    }

    useEffect(() => {
        if (tagId) {

            const tag = getTagById(tagId).then(setTag)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveTag}>
                { tagId ? <h2>Edit Tag</h2> : <h2>Add Tag</h2> }
                { tagId ? <div>{ tag.label }</div> : <></> }
                <fieldset>
                    <div>
                        <label htmlFor="label">{ tagId ? "Edit" : "New" } Tag: </label>
                        <input type="text" id="label" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={tag.label} 
                            placeholder={ tagId ? "Edit Tag" : "New Tag" }/>
                    </div>
                </fieldset>
                <button type="submit"
                    disabled={isLoading}>
                    Save Tag
                </button>
            </form>
        </>
    )
}