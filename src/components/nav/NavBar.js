import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">New Post</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">Tag MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">Category MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home">User Profiles</Link>
            </li>
            <li className="nav-item">
                <Link className="navbar__link" to="/logout">Logout</Link>
            </li> 
                    
        </ul>
    )
}
