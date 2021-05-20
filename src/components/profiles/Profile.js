import React, { useEffect, useContext, useState } from "react"
import { HumanDate } from "../utils/HumanDate.js"
import { ProfileContext } from "./ProfileProvider.js"
import "./Profile.css"
import { useParams } from "react-router"


export const Profile = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const { profile, getProfile } = useContext(ProfileContext)
    const { userId } = useParams()

    useEffect(() => {
        getProfile(userId)
            .then(() => setIsLoading(false))
    }, [])

    const user = profile.user

    if (isLoading) return (<div>Loading</div>)
    return (
        <article className="profile">
            <header>
                <h1>{user.first_name}'s Profile</h1>
            </header>
            <img src={profile.profile_image_url} alt=""></img>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Detail</h3>
                </header>
                <div className="profile__name">
                    User: {user.first_name} {user.last_name}
                </div>
                <div className="profile__username">Username: {user.username}</div>
                <div className="profile__email">Email: {user.username}</div>
                <div className="profile__joined">Joined: {HumanDate(profile.created_on)}</div>
                <div className="profile__type">Type: {user.is_staff ? "Admin" : "Author"}</div>
            </section>
        </article>
    )
}