import "./Projects.scss"
import { CreateModal } from "./CreateModal/CreateModal"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"

const ProjectListItem = (props) => {
    return (
        <li>
            <button className="project-name" type="button">
                {props.item.project.name}
            </button>
            <div className="project-menu">
                <button className="project-menu-toggler" type="button" onClick={() => props.ClickMenu(props.item.id)}>
                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                </button>
                <div className={"project-options " + (props.item.isActive ? "active" : "")}>
                    <button type="button" onClick={() => props.DeleteProject(props.item.id)}>Delete</button>
                    {props.item.isOpened ? (
                        <button type="button" onClick={() => props.CloseProject(props.item.id)}>Close project</button>
                    ) : (
                        <button type="button" onClick={() => props.OpenProject(props.item.id)}>Open project</button>
                    )}
                </div>
            </div>
        </li>
    )
}

export const Projects = (props) => {
    const [isCreate, setIsCreate] = useState(false)
    const [isOpenedList, setIsOpenedList] = useState(true)
    const [isActiveSortOption, setIsActiveSortOption] = useState(false)

    const [projectList, setProjectList] = useState([])

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

    const AddProject = (item) => {
        projectList.push(item)
        setProjectList((prevValue) => [...prevValue])
    }

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
            <div className="project-list">
                <div className="project-list-header">
                    <div className="list-show-options">
                        <button type="button" onClick={() => setIsOpenedList(true)}>
                            <span>{projectList.filter((item) => item.isOpened).length}</span>
                            Open
                        </button>
                        <button type="button" onClick={() => setIsOpenedList(false)}>
                            <span>{projectList.filter((item) => !item.isOpened).length}</span>
                            Close
                        </button>
                    </div>
                    <div className="sort">
                        <button className="sort-toggler" type="button" onClick={() => setIsActiveSortOption(!isActiveSortOption)}>
                            Sort
                            <ion-icon name="caret-down"></ion-icon>
                        </button>
                        <div className={"sort-options " + (isActiveSortOption ? "active" : "")}>
                            <button type="button" onClick={SortNewest}>Newest</button>
                            <button type="button" onClick={SortOldest}>Oldest</button>
                            <button type="button" onClick={SortDeadline}>Deadline</button>
                            <button type="button" onClick={SortAlphabet}>Alphabet</button>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {isOpenedList ? (
                        <motion.ul
                            className={projectList.filter((item) => item.isOpened).length === 0 ? "no-content" : ""}
                            key="open-project"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}>
                            {projectList.filter((item) => item.isOpened).length > 0 ? (
                                projectList.filter((item) => item.isOpened).map((item, index) => (
                                    <ProjectListItem
                                        key={index}
                                        item={item}
                                        ClickMenu={ClickMenu}
                                        DeleteProject={DeleteProject}
                                        CloseProject={CloseProject}
                                        OpenProject={OpenProject} />
                                ))
                            ) : (
                                <h1>No opened projects</h1>
                            )}
                        </motion.ul>
                    ) : (
                        <motion.ul
                            className={projectList.filter((item) => !item.isOpened).length === 0 ? "no-content" : ""}
                            key="close-project"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}>
                            {projectList.filter((item) => !item.isOpened).length > 0 ? (
                                projectList.filter((item) => !item.isOpened).map((item, index) => (
                                    <ProjectListItem
                                        key={index}
                                        item={item}
                                        ClickMenu={ClickMenu}
                                        DeleteProject={DeleteProject}
                                        CloseProject={CloseProject}
                                        OpenProject={OpenProject} />
                                ))
                            ) : (
                                <h1>No closed projects</h1>
                            )}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            <CreateModal
                isCreate={isCreate}
                CloseModal={() => setIsCreate(false)}
                AddProject={AddProject} />
        </div>
    )
}