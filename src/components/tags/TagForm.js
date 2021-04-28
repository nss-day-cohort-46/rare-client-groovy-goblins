import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TagContext } from "./TagProvider"

export const TagForm = () => {
    const { addTag } = useContext(TagContext)

    const [tag, setTag] = useState({
        label: ""
    })

    const history = useHistory()
    const tag_id = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag }
        let newLabel = event.target.value

        newTag.label = newLabel

        setTag(newTag)
    }

    const handleSaveTag = (event) => {
        event.preventDefault()
        addTag(tag)
        .then(history.push("/tags"))
    }

    useEffect(() => {
        if (tag_id > 0) {
            console.log(`tag_id = ${tag_id}`)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveTag}>
                <h2>Add Tag</h2>
                <fieldset>
                    <div>
                        <label htmlFor="label">New Tag: </label>
                        <input type="text" id="label" onChange={handleControlledInputChange} required autoFocus placeholder="New Tag" value={tag.label} />
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