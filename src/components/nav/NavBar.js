import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()
    const userId = localStorage.getItem("userId")
    const isStaff = localStorage.getItem("isStaff") === "true"

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to={`/posts/user/${userId}`}>My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posting">New Post</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category MGMT</Link>
            </li>
            {
                isStaff
                ?   <li className="navbar__item">
                        <Link className="navbar__link" to="/reactions">Reaction MGMT</Link>
                    </li>
                :   <></>
            }   
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
                    ><Link className="navbar__link" to="/login">Login/Register</Link></button>
                    </li> 
                    
            }         
        </ul>
    )
}
