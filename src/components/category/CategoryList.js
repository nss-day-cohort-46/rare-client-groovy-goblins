import React, { useContext, useEffect, useRef, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"
import { Link } from "react-router-dom"

export const CategoryList = () => {
    const { categories, getCategories, deleteCategoryById } = useContext(CategoryContext)
     const loggedInUser = localStorage.getItem("rare_user_id")
     const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const deleteWarning = useRef()
    const [deleteCat, setDeleteCat] = useState({
        "label": "",
        "id": 0
    })

    useEffect(() => {
        getCategories()
    }, [])
    
    const deleteHanlder = ( indx ) => deleteCategoryById(indx)

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
        deleteCategoryById(deleteCat.id)
        handleCloseModal()
    }

    // if(!Array.isArray(categories)) return (<div>Loading Categories</div>)

    return (
        loggedInUser && Array.isArray(categories)
        ?
        <>
            <h2>Labels</h2>

            <ul className="category_list">
            {
                categories.map((cat) => {
                    return <li key={ cat.id } className="category_list--item">
                        <div className="cat_label">{ cat.label }</div>
                        { isStaff && <div>
                            {/* <dialog className="dialog dialog--auth" ref={deleteWarning}>
                                <div>Are you sure you want to delete the category `${cat.label}`?</div>
                                <button className="button--close" onClick={handleCloseModal}>Cancel</button>
                                <button className="button--close" onClick={handleClickDelete}>Confirm</button>
                            </dialog> */}
                            <button className="btn--delete" onClick={(e) => {
                                e.preventDefault()
                                deleteHanlder(cat.id)
                            }}>Delete</button>
                        </div> }
                    </li>
                })
            }
            </ul>
            <Link to="/categories/create">
                <button className="createTag" type="button">
                Create Category
                </button>
            </Link>

            {/* <div>
                <dialog className="dialog dialog--auth" ref={deleteWarning}>
                    <div>Are you sure you want to delete the category "{deleteCat.label}"?</div>
                    <button className="button--close" onClick={handleCloseModal}>Cancel</button>
                    <button className="button--close" onClick={handleClickDelete}>Confirm</button>
                </dialog>
                {filteredCats.map(c =>
                    <div className="category_card" key={c.id}>
                        <p><b>label: </b>{c.label}</p>
                        {console.log(c.id)}
                        <button id={c.id} onClick={handleDeleteWarning}>Delete</button>
                    </div>
                )}
            </div> */}

            <div>(=ↀωↀ=)✧</div>
        </>
        :
        <>
            <div>Please Log In to View</div>
            <div>(=ↀωↀ=)✧</div>
        </>
    )
}