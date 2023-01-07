import "./Navbar.scss"
import { useState } from "react"
import logo from "../../assets/images/GitHub_logo.png"

export const Navbar = (props) => {
    const [isActive, setIsActive] = useState(false)

    const OpenSection = (e) => {
        document.querySelectorAll("nav li button").forEach(item => {
            item.classList.remove("active")
        })
        e.currentTarget.classList.add(e.target.classList.contains("active") ? "" : "active")
        props.OpenSection(e.currentTarget.getAttribute("name"))
        setIsActive(false)
    }

    return (
        <>
            <button className="menu-toggler" type="button" onClick={() => setIsActive(true)}>
                <ion-icon name="reorder-three-outline"></ion-icon>
            </button>
            <nav className={isActive ? "active" : ""}>
                <div className="navbar-heading">
                    <div className="brand">
                        <img src={logo} alt="Logo" />
                    </div>
                    <button type="button" onClick={() => setIsActive(!isActive)}>
                        <ion-icon name={isActive ? "caret-back-outline" : "reorder-three-outline"}></ion-icon>
                    </button>
                </div>
                <ul>
                    <li>
                        <button className="active" type="button" name="dashboard" onClick={OpenSection}>
                            <span>
                                <ion-icon name="apps-outline"></ion-icon>
                            </span>
                            <p>Dashboard</p>
                        </button>
                    </li>
                    <li>
                        <button type="button" name="projects" onClick={OpenSection}>
                            <span>
                                <ion-icon name="analytics-outline"></ion-icon>
                            </span>
                            <p>Projects</p>
                        </button>
                    </li>
                    <li>
                        <button type="button" name="calendar" onClick={OpenSection}>
                            <span>
                                <ion-icon name="calendar-outline"></ion-icon>
                            </span>
                            <p>Calendar</p>
                        </button>
                    </li>
                    <li>
                        <button type="button" name="profile" onClick={OpenSection}>
                            <span>
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <p>Profile</p>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}