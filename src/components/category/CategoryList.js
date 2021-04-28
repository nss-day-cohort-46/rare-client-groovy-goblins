import React, { useContext, useEffect, useRef, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryList = () => {
    const { categories, getCategories, deleteCategory } = useContext(CategoryContext)
    const deleteWarning = useRef()
    const [deleteCat, setDeleteCat] = useState({
        "label": "",
        "id": 0
    })

    useEffect(() => {
        getCategories()
    }, [])
    const sortedCats = categories.sort((a, b) => a.label > b.label ? 1 : -1)

    // filter out "deleted" categories
    const filteredCats = sortedCats.filter(cat => cat.deleted == 0)

    const handleDeleteWarning = event => {
        deleteWarning.current.showModal()
        
        const category = categories.find(cat => cat.id = parseInt(event.target.id))
        setDeleteCat(category)
    }

    const handleCloseModal = () => {
        setDeleteCat({"label": "",
        "id": 0})
        deleteWarning.current.close()
    }

    const handleClickDelete = () => {
        deleteCategory(deleteCat.id)
        handleCloseModal()
    }



    return (
        <>
            <div>
                <dialog className="dialog dialog--auth" ref={deleteWarning}>
                    <div>Are you sure you want to delete the category "{deleteCat.label}"?</div>
                    <button className="button--close" onClick={handleCloseModal}>Cancel</button>
                    <button className="button--close" onClick={handleClickDelete}>Confirm</button>
                </dialog>
                {filteredCats.map(c =>
                    <div className="category_card" key={c.id}>
                        <p><b>label: </b>{c.label}</p>
                        <button key={`button--${c.id}`} id={c.id} onClick={handleDeleteWarning}>Delete</button>
                    </div>
                )}
            </div>
            <div>(=ↀωↀ=)✧</div>
        </>
    )
}