import "./Projects.scss"
import { CreateModal } from "./CreateModal/CreateModal"
import { ProjectList } from "./ProjectList/ProjectList"
import { ProjectDetail } from "./ProjectDetail/ProjectDetail"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.4 }
}

export const Projects = () => {
    const [isOpenedList, setIsOpenedList] = useState(true)
    const [isActiveSortOption, setIsActiveSortOption] = useState(false)

    const [isDetail, setIsDetail] = useState(false)
    const [shownDetail, setShownDetail] = useState()

    const [isCreate, setIsCreate] = useState(false)
    const [projectList, setProjectList] = useState([])

    const AddProject = (item) => {
        projectList.push(item)
        setProjectList((prevValue) => [...prevValue])
        setIsCreate(false)
    }

    const ClickOutsideSort = (e) => {
        if (e.target.classList.contains("sort-toggler") === false && e.target.closest("div").classList.contains("sort-options") === false) {
            setIsActiveSortOption(false)
        }
    }

    const ClickOutsideProjectMenu = (e) => {
        let newList = projectList.map((item) => {
            if (e.target.classList.contains("project-menu-toggler") === false && e.target.closest("div").classList.contains("project-options") === false) {
                item.isActive = false
            }
            return item
        })

        setProjectList(newList)
    }
    
    useEffect(() => {
        document.addEventListener("mousedown", ClickOutsideSort)
        document.addEventListener("mousedown", ClickOutsideProjectMenu)
        return (() => {
            document.removeEventListener("mousedown", ClickOutsideSort)
            document.removeEventListener("mousedown", ClickOutsideProjectMenu)
        })
    })

    const ClickMenu = (id) => {
        let newList = projectList.map((item) => {
            if (item.id === id) {
                item.isActive = item.isActive ? false : true
            }
            else {
                item.isActive = false
            }
            return item
        })

        setProjectList(newList)
    }

    const DeleteProject = (id) => {
        setProjectList(projectList.filter((item) => item.id !== id))
    }

    const CloseProject = (id) => {
        let newList = projectList.map((item) => {
            if (item.id === id) {
                item.isOpened = false
            }
            return item
        })
        
        setProjectList(newList)
    }

    const OpenProject = (id) => {
        let newList = projectList.map((item) => {
            if (item.id === id) {
                item.isOpened = true
            }
            return item
        })
        
        setProjectList(newList)
    }

    const SortNewest = () => {
        const newList = [...projectList].sort((a, b) => b.createdTime - a.createdTime)
        setProjectList(newList)
    }

    const SortOldest = () => {
        const newList = [...projectList].sort((a, b) => a.createdTime - b.createdTime)
        setProjectList(newList)
    }

    const SortDeadline = () => {
        const newList = [...projectList].sort((a, b) => {
            const d1 = new Date(a.project.end.month + "-" + a.project.end.date + "-" + a.project.end.year)
            const d2 = new Date(b.project.end.month + "-" + b.project.end.date + "-" + b.project.end.year)

            return d1 - d2
        })
        setProjectList(newList)
    }

    const SortAlphabet = () => {
        const newList = [...projectList].sort((a, b) => a.project.name > b.project.name ? 1 : -1)
        setProjectList(newList)
    }

    const ClickProject = (id) => {
        setShownDetail(projectList.filter((item) => item.id === id)[0])
        setIsDetail(true)
    }

    const ReturnToProjectList = () => {
        setShownDetail()
        setIsDetail(false)
    }

    const AddTask = (value) => {
        let newList = projectList.map((project) => {
            if (value.name.trim().length !== 0) {
                project.taskList.push(value)
            }

            return project
        })

        setProjectList(newList)
    }

    const GetTaskUpdated = (id) => {
        let newList = projectList.map((project) => {
            project.taskList = project.taskList.map((task) => {
                task.isGetTaskUpdated = task.id === id ? true : false
                return task
            })

            return project
        })

        setProjectList(newList)
    }

    const SubmitUpdatedTask = (id, newValue) => {
        if (newValue.name.trim().length === 0) {
            let newList = projectList.map((project) => {
                project.taskList = project.taskList.map((task) => {
                    task.isGetTaskUpdated = false
                    return task
                })
    
                return project
            })
    
            setProjectList(newList)
        }
        else {
            let newList = projectList.map((project) => {
                project.taskList = project.taskList.map((task) => task.id === id ? newValue : task)
                return project
            })

            setProjectList(newList)
        }
    }

    const DeleteTask = (id) => {
        let newList = projectList.map((project) => {
            project.taskList = project.taskList.filter((task) => task.id !== id)
            return project
        })

        setProjectList(newList)
    }

    return (
        // Project list
        // Project detail
            // Project update
                // name, start, end
                // budget
                // member
                // task list
        <div id="projects" className="main-container active">
            <div className="create-btn" onClick={() => setIsCreate(true)}>
                <button type="button">
                    <ion-icon name="add"></ion-icon>
                    Create new project
                </button>
            </div>
            <hr />

            {isDetail ? (
                <AnimatePresence>
                    <ProjectDetail
                        variants={variants}
                        data={shownDetail}
                        ReturnToProjectList={ReturnToProjectList}
                        AddTask={AddTask}
                        GetTaskUpdated={GetTaskUpdated}
                        SubmitUpdatedTask={SubmitUpdatedTask}
                        DeleteTask={DeleteTask} />
                </AnimatePresence>
                
            ) : (
                <ProjectList
                    variants={variants}
                    projectList={projectList}
                    isOpenedList={isOpenedList}
                    isActiveSortOption={isActiveSortOption}                    
                    ClickProject={ClickProject} // Open project detail
                    ClickMenu={ClickMenu} // Menu of project
                    DeleteProject={DeleteProject}
                    CloseProject={CloseProject}
                    OpenProject={OpenProject}
                    SortNewest={SortNewest}
                    SortOldest={SortOldest}
                    SortDeadline={SortDeadline}
                    SortAlphabet={SortAlphabet}
                    SetOpen={() => setIsOpenedList(true)}
                    SetClose={() => setIsOpenedList(false)}
                    SetSortOption={() => setIsActiveSortOption(!isActiveSortOption)} />
            )}

            <CreateModal
                isCreate={isCreate}
                CloseModal={() => setIsCreate(false)}
                AddProject={AddProject} />
        </div>
    )
}