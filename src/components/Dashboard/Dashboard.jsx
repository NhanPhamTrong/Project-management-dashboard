import "./Dashboard.scss"
import { ProjectDashboard } from "./ProjectDashboard/ProjectDashboard"
import { GeneralDashboard } from "./GeneralDashboard/GeneralDashboard"

export const Dashboard = (props) => {
    const GetProjectIndex = (id) => {
        props.GetProjectIndex(id)
    }

    return (
        <div id="dashboard" className="main-container active">
            <div className="create-btn">
                <button type="button" onClick={() => props.OpenCreateProjectModal()}>
                    <ion-icon name="add"></ion-icon>
                    Create new project
                </button>
            </div>
            <hr />
            
            <div className="position" style={{ display: (props.isDetailed ? "flex" : "none") }}>
                <button type="button" onClick={() => props.GoToGeneralDashboard()}>Dashboard</button>
                <span>
                    <ion-icon name="arrow-forward"></ion-icon>
                </span>
                <p>{props.isDetailed ? props.projectList[props.projectIndex].project.title : ""}</p>
            </div>
            {props.isDetailed ? (
                <ProjectDashboard data={props.projectList[props.projectIndex]} GoToProjectDetail={id => props.GoToProjectDetail(id)} />
            ) : (
                <GeneralDashboard data={props.projectList} GetProjectIndex={GetProjectIndex} />
            )}
        </div>
    )
}