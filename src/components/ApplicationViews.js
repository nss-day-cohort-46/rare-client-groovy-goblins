import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { CategoryList } from "./category/CategoryList"
import { CategoryProvider } from "./category/CategoryProvider"
import { PostForm } from "./posts/PostForm"

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
            <PostProvider>
            <CategoryProvider>
                <Route path="/categories">
                    <CategoryList />
                </Route>
                <Route exact path="/posting">
                    <PostForm />
                </Route>
                <Route exact path="/posts/user/edit/:postId(\d+)">
                    <PostForm />
                </Route>
            </CategoryProvider>
            </PostProvider>


        </main>
    </>
}
