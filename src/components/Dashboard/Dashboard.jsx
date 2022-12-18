import "./Dashboard.scss"
import { useState } from "react"
import { Data } from "./Data"
import { ProjectDashboard } from "./ProjectDashboard/ProjectDashboard"
import { GeneralDashboard } from "./GeneralDashboard/GeneralDashboard"

export const Dashboard = () => {
    const [isGeneral, setIsGeneral] = useState(true)
    const [projectIndex, setProjectIndex] = useState(0)

    const GetProjectIndex = (name) => {
        setIsGeneral(false)
        Data.forEach((item) => {
            if (item.project.name === name) {
                setProjectIndex(Data.indexOf(item))
            }
        })
    }

    return (
        <div id="dashboard" className="main-container">
            <div className="position">
                <button type="button" onClick={() => setIsGeneral(true)}>Dashboard</button>
                <span style={{ display: (isGeneral ? "none" : "block") }}><ion-icon name="arrow-forward"></ion-icon></span>
                <p>{isGeneral ? "" : Data[projectIndex].project.name}</p>
            </div>
            {isGeneral ? (
                <GeneralDashboard data={Data} GetProjectIndex={GetProjectIndex} />
            ) : (
                <ProjectDashboard data={Data[projectIndex]} />
            )}
        </div>
    )
}