import React, { useState } from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({ events: [] })
    const [allProfiles, setAllProfiles] = useState([])

    const getProfile = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }
    const getAllProfiles = () => {
        return fetch("http://localhost:8000/profiles", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
            .then(response => {

                if (response.includes("admin") && response.includes("false")) {
                    setAllProfiles([])
                } else {
                    setAllProfiles(response)
                }
            })
    }

    return (
        <ProfileContext.Provider value={{
            profile, getProfile, allProfiles, getAllProfiles
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}
