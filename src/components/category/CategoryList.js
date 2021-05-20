import React, { useContext, useEffect, useRef, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"
import { Link } from "react-router-dom"

export const CategoryList = () => {
    const { categories, getCategories, deleteCategory } = useContext(CategoryContext)
     const loggedInUser = localStorage.getItem("rare_user_id")

    const deleteWarning = useRef()
    const [deleteCat, setDeleteCat] = useState({
        "label": "",
        "id": 0
    })

    useEffect(() => {
        getCategories()
    }, [])
    // const sortedCats = categories.sort((a, b) => a.label > b.label ? 1 : -1)

    // filter out "deleted" categories
    // const filteredCats = sortedCats.filter(cat => cat.deleted == 0)

    const handleDeleteWarning = event => {
        deleteWarning.current.showModal()
        
        const category = categories.find(cat => cat.id === parseInt(event.target.id))
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

    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if(!Array.isArray(categories)) return (<div>Please Log In to View</div>)

    return (
        loggedInUser && Array.isArray(categories)
        ?
        <>
            <h2>Labels</h2>

            <ul className="category_list">
            {
                categories.map((cat, i) => {
                    return <li key={i} className="category_list--item ">{ cat.label }</li>
                })
            }
            </ul>

            <div>
                <dialog className="dialog dialog--auth" ref={deleteWarning}>
                    <div>Are you sure you want to delete the category "{deleteCat.label}"?</div>
                    <button className="button--close" onClick={handleCloseModal}>Cancel</button>
                    <button className="button--close" onClick={handleClickDelete}>Confirm</button>
                </dialog>
                {/* {filteredCats.map(c =>
                    <div className="category_card" key={c.id}>
                        <p><b>label: </b>{c.label}</p>
                        {console.log(c.id)}
                        <button id={c.id} onClick={handleDeleteWarning}>Delete</button>
                    </div>
                )} */}
            </div>

            <Link to="/categories/create">
                <button className="createTag" type="button">
                Create Category
                </button>
            </Link>
            <div>(=ↀωↀ=)✧</div>
        </>
        :
        <>
            <div>Please Log In to View</div>
            <div>(=ↀωↀ=)✧</div>
        </>
    )
}
