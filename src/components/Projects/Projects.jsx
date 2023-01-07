import "./Projects.scss"
import { ProjectList } from "./ProjectList/ProjectList"
import { ProjectDetail } from "./ProjectDetail/ProjectDetail"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.4 }
}

export const Projects = (props) => {
    const [isOpenedList, setIsOpenedList] = useState(true)

    const [isDetail, setIsDetail] = useState(false)
    const [shownDetail, setShownDetail] = useState()

    const OpenProjectDetail = (id) => {
        setShownDetail(props.projectList.find(item => item.id === id))
        setIsDetail(true)
    }

    const ReturnToProjectList = () => {
        setShownDetail()
        setIsDetail(false)
    }

    const GoToProjectDashboard = (id) => {
        props.GoToProjectDashboard(id)
    }

    return (
        // Project list
        // Project detail
            // Project update
                // name, start, end
                // budget
                // member
                // task list
        <div id="projects" className="main-container">
            <div className="create-btn">
                <button type="button" onClick={() => props.OpenCreateProjectModal()}>
                    <ion-icon name="add"></ion-icon>
                    Create new project
                </button>
            </div>
            <hr />

            {isDetail ? (
                <AnimatePresence>
                    <ProjectDetail
                        variants={variants}
                        data={shownDetail} // Data shown in ProjectDetail
                        ReturnToProjectList={ReturnToProjectList}
                        GoToProjectDashboard={GoToProjectDashboard}
                        // Task CRUD
                        CreateTask={(projectId, value) => props.CreateTask(projectId, value)}
                        ClickTaskMenuToggler={(projectId, taskId) => props.ClickTaskMenuToggler(projectId, taskId)}
                        GetTaskUpdated={(projectId, taskId) => props.GetTaskUpdated(projectId, taskId)} // Get id of updated task
                        SubmitUpdatedTask={(projectId, taskId, newValue) => props.SubmitUpdatedTask(projectId, taskId, newValue)}
                        DeleteTask={(projectId, taskId) => props.DeleteTask(projectId, taskId)}
                        // Open mini task list
                        OpenMiniTaskList={(projectId, taskId) => props.OpenMiniTaskList(projectId, taskId)}
                        // Mini task CRUD
                        CreateMiniTask={(projectId, taskId, value) => props.CreateMiniTask(projectId, taskId, value)}
                        GetMiniTaskUpdated={(projectId, taskId, miniTaskId) => props.GetMiniTaskUpdated(projectId, taskId, miniTaskId)} // Get id of updated mini task
                        SubmitUpdatedMiniTask={(projectId, taskId, miniTaskId, newValue) => props.SubmitUpdatedMiniTask(projectId, taskId, miniTaskId, newValue)}
                        DeleteMiniTask={(projectId, taskId, miniTaskId) => props.DeleteMiniTask(projectId, taskId, miniTaskId)}
                        // Get mini task completed
                        GetMiniTaskCompleted={(projectId, taskId, miniTaskId) => props.GetMiniTaskCompleted(projectId, taskId, miniTaskId)} />
                </AnimatePresence>
                
            ) : (
                <ProjectList
                    variants={variants}
                    projectList={props.projectList}
                    isOpenedList={isOpenedList} // Check if opened or closed projects list is shown
                    OpenProjectDetail={OpenProjectDetail} // Open project detail
                    DeleteProject={id => props.DeleteProject(id)}
                    CloseProject={id => props.CloseProject(id)}
                    OpenProject={id => props.OpenProject(id)}
                    SortProjectList={name => props.SortProjectList(name)}
                    SetOpen={() => setIsOpenedList(true)}
                    SetClose={() => setIsOpenedList(false)}
                    SetSortOption={() => props.SetSortOption()} />
            )}
        </div>
    )
}