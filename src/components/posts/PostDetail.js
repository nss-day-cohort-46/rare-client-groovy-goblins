import { Link, useParams } from "react-router-dom"
import { ReactionContext } from "../reaction/ReactionProvider"
import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { TagContext } from "../tags/TagProvider"
// import { Multiselect } from 'multiselect-react-dropdown'

export const PostDetail = () => {
  const { posts, getPostById } = useContext(PostContext)
  const { tags, getTags, addPostTag, removePostTag } = useContext(TagContext)
  const [postTags, setPostTags] = useState({
    tags: []
  })
  const { getReactions, addReaction, removeReaction } = useContext(ReactionContext)

  const [post, setPost] = useState({
    user: 0,
    category: 0,
    title: "",
    publication_date: "",
    image_url: "",
    content: ""
  })

  const [reactions, setReactions] = useState([])

  console.log('post: ', post);
  const [isLoading, setIsLoading] = useState(true)
  const userId = localStorage.getItem("userId")
  const { postId } = useParams();

  useEffect(() => {

    getPostById(postId)
      .then((response) => {
        getTags()
        setPost(response)
      })
  }, [])

  const handleAddTagClick = (event) => {
    setIsLoading(true)
    const tagId = event.target.value
    addPostTag({
      postId: parseInt(postId),
      tagId: parseInt(tagId)
    })
      .then(res => {
        if (res.statusText === "Created") {
        } else if (res.statusText === "No Content") {
          removePostTag({
            postId: parseInt(postId),
            tagId: parseInt(tagId)
          })
        }

      })
    setIsLoading(false)
  }

  const handleReactionClick = (event) => {
    setIsLoading(true)
    const [prefix, reactionId] = event.target.id.split("--")

    addReaction({
      postId: parseInt(postId),
      reactionId: parseInt(reactionId)
    })
      .then(res => {
        if (res.statusText === "Created") {
          let newReactions = [...reactions]
          for (const reaction of newReactions) {
            if (parseInt(reactionId) === reaction.id) {
              reaction.counter++
            }
          }
          setReactions(newReactions)
        } else if (res.statusText === "No Content") {
          removeReaction({
            postId: parseInt(postId),
            reactionId: parseInt(reactionId)
          })
          let newReactions = [...reactions]
          for (const reaction of newReactions) {
            if (parseInt(reactionId) === reaction.id) {
              reaction.counter--
            }
          }
          setReactions(newReactions)
        }
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getPostById(postId)
      .then((response) => {
        getReactions()
          .then(res => {
            let newReactions = [...res]
            newReactions = newReactions.map(reaction => {
              reaction.counter = 0
              return reaction
            })
            for (const postReaction of response.reactions) {
              for (const reaction of newReactions) {
                if (postReaction.id === reaction.id) {
                  reaction.counter++
                }
              }
            }
            setReactions(newReactions)
          })
        setPost(response)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <section className="post">
        {/* <h3 className="post__title">{post.title}</h3>
      <img className="post__image" src={post.image_url} alt="" />
      <div className="post__content">{post.content}</div>
      <div className="post__created_on">{new Date(post.publication_date).toLocaleDateString()}</div>
      <div className="post__author__first_name">{post.user?.first_name} {post.user?.last_name}</div> */}
        <button><Link to={`/posts/comments/${post.id}`}>View Comments</Link></button>
        {
          reactions.map(reaction => {
            return <button key={reaction.id} id={`reaction--${reaction.id}`} onClick={handleReactionClick} disabled={isLoading} ><img src={reaction.image_url} alt={reaction.label} style={{ pointerEvents: "None" }} width="20vh" height="20vh" /> {reaction.counter}</button>
          })
        }
        <div className="post__content">{post.content}</div>
        <div className="post__created_on">{new Date(post.publication_date).toLocaleDateString()}</div>
        <div className="post__author__first_name"><Link to={`/profiles/${post.user?.id}/detail`}>{post.user?.first_name} {post.user?.last_name}</Link></div>
        <div>#Tags: {post.tags?.map(tag => {
          return tag.label
        }).join(", ")}</div>
      </section>

      <div>
        {userId ?
          <select value={post.tags} multiple>
            {tags.map(t => (
              <option key={t.id} value={t.id} onClick={handleAddTagClick}>
                {t.label}
              </option>
            ))}
          </select> : <></>}
      </div>
    </>
  )

}