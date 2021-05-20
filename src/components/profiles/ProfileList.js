import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Link } from "react-router-dom"
import "./Profile.css"

export const ProfileList = () => {
    const { allProfiles, getAllProfiles } = useContext(ProfileContext)

    useEffect(() => {
        getAllProfiles()
    }, [])
    return (
        <>
        <h2>Hello there</h2>
        <div>
            {allProfiles.map(profile => 
                    <div key={profile.userName} className="profile_card">
                        <p>Name: {profile.first_name} {profile.last_name}</p>
                        <p>Username: {profile.username}</p>
                        <p>Admin: {profile.is_staff ? "Yes" : "No"}</p>
                    </div>)}
        </div>
        </>
    )
}