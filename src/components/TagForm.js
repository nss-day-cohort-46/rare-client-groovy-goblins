import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TagContext } from "./TagProvider"

export const TagForm = () => {
    const { addTag } = useContext(TagContext)



    return (
        <h1>Tag Form</h1>
    )
}