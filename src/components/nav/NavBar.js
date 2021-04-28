import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()
    const user_id = localStorage.getItem("rare_user_id")

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to={`/posts/user/${user_id}`}>My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">New Post</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Tag MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">User Profiles</Link>
            </li>
            {
                (localStorage.getItem("rare_user_id") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                // history.push({ pathname: "/" })
                            }}
                        ><Link className="navbar__link" to="/">Logout</Link></button>
                    </li> :
                    <li className="nav-item">
                    <button className="nav-link fakeLink"
                    ><Link className="navbar__link" to="/login">Login</Link></button>
                    </li> 
                    
            }         
        </ul>
    )
}
