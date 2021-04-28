import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { TagProvider } from "./tags/TagProvider"
import { TagForm } from "./tags/TagForm"

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

            <TagProvider>
                <Route path="/tags/create">
                    <TagForm />
                </Route>
            </TagProvider>

        </main>
    </>
}
