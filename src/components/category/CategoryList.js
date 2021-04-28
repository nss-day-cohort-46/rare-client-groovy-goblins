import React, { useContext, useEffect, useRef, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryList = () => {
    const { categories, getCategories } = useContext(CategoryContext)
    const deleteWarning = useRef()
    const [deleteId, setDeleteId] = useState()

    useEffect(() => {
        getCategories()
    }, [])
    const sortedCats = categories.sort((a, b) => a.label > b.label ? 1 : -1)

    // filter out "deleted" categories
    const filteredCats = sortedCats.filter(cat => cat.deleted == 0)

    const handleDeleteWarning = event => {
        console.log(`clicked ${event.target.id}`)
        deleteWarning.current.showModal()
        setDeleteId(event.target.id)
    }

    const handleCloseModal = () => {
        setDeleteId(0)
        deleteWarning.current.close()
    }

    const handleClickDelete = () => {
        console.log(deleteId)
        handleCloseModal()
    }

    return (
        <>
            <div>
                <dialog className="dialog dialog--auth" ref={deleteWarning}>
                    <div>Are you sure you want to delete the category?</div>
                    <button className="button--close" onClick={handleCloseModal}>Cancel</button>
                    <button className="button--close" onClick={handleClickDelete}>Confirm</button>
                </dialog>
                {filteredCats.map(c =>
                    <div className="category_card" key={c.id}>
                        <p><b>label: </b>{c.label}</p>
                        <button id={c.id} onClick={handleDeleteWarning}>Delete</button>
                    </div>
                )}
            </div>
            <div>(=ↀωↀ=)✧</div>
        </>
    )
}