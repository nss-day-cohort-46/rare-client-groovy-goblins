import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { CategoryList } from "./category/CategoryList"
import { CategoryProvider } from "./category/CategoryProvider"
import { CategoryForm } from "./category/CategoryForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <PostProvider>
                <Route path="/posts/user/:user_id(\d+)">
                    <PostList />
                </Route>
            </PostProvider>
            <CategoryProvider>
                <Route exact path="/categories/create" render={() => {
                    return <CategoryForm />
                }}/>
                <Route exact path="/categories">
                    <CategoryList />
                </Route>
            </CategoryProvider>
        </main>
    </>
}
