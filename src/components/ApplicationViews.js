import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { TagForm } from "./tags/TagForm"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"
import { CategoryList } from "./category/CategoryList"
import { CategoryProvider } from "./category/CategoryProvider"
import { CategoryForm } from "./category/CategoryForm"
import { PostForm } from "./posts/PostForm"
import { PostDetail } from "./posts/PostDetail"
import { CommentProvider } from "./comment/CommentProvider"
import { CommentList } from "./comment/CommentList"
import { ReactionProvider } from "./reaction/ReactionProvider"
import { ReactionList } from "./reaction/ReactionList"

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
                <Route exact path="/posts/user/:userId(\d+)">
                    <PostList />
                </Route>
            </PostProvider>

            <PostProvider>
            <CategoryProvider>
                <Route exact path="/categories">
                    <CategoryList />
                </Route>
                <Route exact path="/posting">
                    <PostForm />
                </Route>
                <Route exact path="/posts/user/edit/:postId(\d+)">
                    <PostForm />
                </Route>
                <Route exact path="/categories/create" render={() => {
                    return <CategoryForm />
                }}/>
                <Route exact path="/categories/edit/:categoryId(\d+)">
                    <CategoryForm />
                </Route>
            </CategoryProvider>
            </PostProvider>
            
            <ReactionProvider>
            <PostProvider>
                <Route exact path="/posts/detail/:postId(\d+)">
                    <PostDetail />
                </Route>
            </PostProvider>
            </ReactionProvider>

            <TagProvider>
                <Route exact path="/tags">
                    <TagList />
                </Route>
                <Route exact path="/tags/create">
                    <TagForm />
                </Route>
                <Route exact path="/tags/edit/:tagId(\d+)">
                    <TagForm />
                </Route>
            </TagProvider>
            <PostProvider>
            <CommentProvider>
                <Route exact path="/posts/comments/:postId(\d+)">
                    <CommentList />
                </Route>
            </CommentProvider>
            </PostProvider>

            <ReactionProvider>
                <Route exact path="/reactions">
                    <ReactionList />
                </Route>
            </ReactionProvider>
        </main>
    </>
}
