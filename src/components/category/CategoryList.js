import React, { useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryList = () => {
    const { categories, getCategories } = useContext(CategoryContext)


    useEffect(() => {
            getCategories()
    }, [])
    const sortedCats = categories.sort((a, b) => a.label > b.label ? 1 : -1)

    // filter out "deleted" categories
    const filteredCats = sortedCats.filter(cat => cat.deleted == 0)

    const handleClickDelete = event => {
        console.log(`clicked ${event.target.id}`)
    }

    return (
        <>
            <div>
                {filteredCats.map(c =>
                    <div className="category_card" key={c.id}>
                        <p><b>label: </b>{c.label}</p>
                        <button id={c.id} onClick={handleClickDelete}>Delete</button>
                    </div>
                )}
            </div>
            <div>(=ↀωↀ=)✧</div>
        </>
    )
}