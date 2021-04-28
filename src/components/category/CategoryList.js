import React, { useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryList = () => {
    const { categories, getCategories } = useContext(CategoryContext)


    useEffect(() => {
            getCategories()
    }, [])
    const sortedCats = categories.sort((a, b) => a.label > b.label ? 1 : -1)
    
    return (
        <>
            <div>
                {sortedCats.map(c =>
                    <div className="category_card" key={c.id}>
                        <p><b>label: </b>{c.label}</p>
                    </div>
                )}
            </div>
            <div>(=ↀωↀ=)✧</div>
        </>
    )
}