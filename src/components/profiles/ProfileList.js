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
        <h2>User Profiles</h2>
        <div>
            {allProfiles.length > 0 ? allProfiles.map(profile => 
                    <div key={profile.userName} className="profile_card">
                        <p>Name: {profile.first_name} {profile.last_name}</p>
                        <p>Username: {profile.username}</p>
                        <p>Admin: {profile.is_staff ? "Yes" : "No"}</p>
                    </div>
                    )
                    :
                    <h3>Hmmm...Looks like there was a problem. Try refreshing or logging in to an Admin account.</h3>
                }
        </div>
        </>
    )
}