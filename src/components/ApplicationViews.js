import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { TagProvider } from "./tags/TagProvider"
import { PostList } from "./posts/PostList"

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

            </TagProvider>

        </main>
    </>
}
