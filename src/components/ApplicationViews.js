import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { TagProvider } from "./tags/TagProvider"
import { TagForm } from "./tags/TagForm"
import { CategoryList } from "./category/CategoryList"
import { CategoryProvider } from "./category/CategoryProvider"
import { PostForm } from "./posts/PostForm"
import { PostDetail } from "./posts/PostDetail"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <PostProvider>
                <Route exact path="/posts">
                    <PostList />
                </Route>
                <Route exact path="/posts/user/:user_id(\d+)">
                    <PostList />
                </Route>
            </PostProvider>
            <CategoryProvider>
                <Route path="/categories">
                    <CategoryList />
                </Route>
            </CategoryProvider>
            <PostProvider>
                <CategoryProvider>
                    <Route path="/posting">
                        <PostForm />
                    </Route>
                </CategoryProvider>
            </PostProvider>
            <PostProvider>
                <Route exact path="/posts/detail/:postId(\d+)">
		            <PostDetail />
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
