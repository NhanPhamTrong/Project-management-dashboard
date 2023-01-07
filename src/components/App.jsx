import { Navbar } from "./Navbar/Navbar"
import { Dashboard } from "./Dashboard/Dashboard"
import { Projects } from "./Projects/Projects"
import { Calendar } from "./Calendar/Calendar"
import { Profile } from "./Profile/Profile"
import { CreateModal } from "./CreateModal/CreateModal"
import { useState } from "react"

export const App = () => {
    const [projectList, setProjectList] = useState([])    
    const [eventList, setEventList] = useState([])
    console.log(eventList)
    const [isCreated, setIsCreated] = useState(false)

    // Navbar
    const OpenSection = (id) => {
        document.querySelectorAll(".main-container").forEach(item => {
            if (item.id === id) {
                item.classList.add("active")
            }
            else {
                item.classList.remove("active")
            }
        })
    }

    // Dashboard
    const [isDetailed, setIsDetailed] = useState(false)
    const [projectIndex, setProjectIndex] = useState(0)

    const GetProjectIndex = (id) => {
        setProjectIndex(projectList.indexOf(projectList.filter(project => project.id === id)[0]))
        setIsDetailed(true)
    }

    const GoToGeneralDashboard = () => {
        setIsDetailed(false)
    }

    // Projects
    const GoToProjectDashboard = (id) => {
        document.querySelectorAll("nav li button").forEach(item => {
            if (item.getAttribute("name") === "dashboard") {
                item.classList.add("active")
            }
            else {
                item.classList.remove("active")
            }
        })
        OpenSection("dashboard")
        setProjectIndex(projectList.indexOf(projectList.filter(project => project.id === id)[0]))
        setIsDetailed(true)
    }

    const CreateProject = (item) => {
        projectList.push(item)
        setProjectList(prevValue => [...prevValue])
        setIsCreated(false)
    }

    const DeleteProject = (id) => {
        setProjectList(projectList.filter(project => project.id !== id))
    }

    const CloseProject = (id) => {
        let newProjectList = projectList.map(project => {
            project.isOpened = project.id === id ? false : project.isOpened
            return project
        })        
        setProjectList(newProjectList)
    }

    const OpenProject = (id) => {
        let newProjectList = projectList.map(project => {
            project.isOpened = project.id === id ? true : project.isOpened
            return project
        })        
        setProjectList(newProjectList)
    }

    const SortProjectList = (name) => {
        let newProjectList = []

        if (name === "alphabet") {
            newProjectList = [...projectList].sort((a, b) => a.project.title > b.project.title ? 1 : -1)
        }
        else if (name === "deadline") {
            newProjectList = [...projectList].sort((a, b) => (new Date(a.project.end.dayForm)) - (new Date(b.project.end.dayForm)))
        }
        else {
            newProjectList = [...projectList].sort((a, b) => name === "oldest" ? (a.createdTime - b.createdTime) : (b.createdTime - a.createdTime))
        }
        setProjectList(newProjectList)
    }

    const CreateTask = (projectId, value) => {
        let newProjectList = projectList.map(project => {
            if (project.id === projectId) {
                project.taskList.push(value)
            }
            return project
        })
        setProjectList(newProjectList)
        
        let newEvent = {
            id: value.id,
            title: value.title,
            detail: "",
            start: new Date(value.start.dayForm).toISOString().replace(/T.*$/, '')
        }
        setEventList(prevValue => [...prevValue, newEvent])
    }

    const GetTaskUpdated = (projectId, taskId) => {
        let newProjectList = projectList.map(project => {
            project.taskList = project.id === projectId ? project.taskList.map(task => {
                task.isGetTaskUpdated = task.id === taskId ? true : false
                return task
            }) : project.taskList
            return project
        })
        setProjectList(newProjectList)
    }

    const SubmitUpdatedTask = (projectId, taskId, newValue) => {
        let newProjectList = projectList.map(project => {
            if (project.id === projectId) {
                project.taskList = newValue.title.trim().length === 0 ? project.taskList.map(task => {
                    let newEventList = eventList.map(event => {
                        let newEvent = {
                            id: task.id,
                            title: task.title,
                            detail: task.detail,
                            start: new Date(task.start.dayForm).toISOString().replace(/T.*$/, '')
                        }
                        return event.id === taskId ? newEvent : event
                    })
                    setEventList(newEventList)

                    task.isGetTaskUpdated = false
                    return task
                }) : (project.taskList.map(task => task.id === taskId ? newValue : task))
            }
            return project
        })
        setProjectList(newProjectList)
    }

    const DeleteTask = (projectId, taskId) => {
        let newProjectList = projectList.map(project => {
            project.taskList = project.id === projectId ? project.taskList.filter(task => task.id !== taskId) : project.taskList
            return project
        })
        setProjectList(newProjectList)

        setEventList(eventList.filter(event => event.id !== taskId))
    }

    const CreateMiniTask = (projectId, taskId, value) => {
        let newProjectList = projectList.map(project => {
            project.taskList = project.id === projectId ? project.taskList.map(task => {
                if (task.id === taskId) {
                    task.miniTaskList.push(value)
                }
                return task
            }) : project.taskList
            return project
        })
        setProjectList(newProjectList)
    }

    const GetMiniTaskUpdated = (projectId, taskId, miniTaskId) => {
        let newProjectList = projectList.map(project => {
            project.taskList = project.id === projectId ? project.taskList.map(task => {
                task.miniTaskList = task.id === taskId ? task.miniTaskList.map(miniTask => {
                    miniTask.isGetMiniTaskUpdated = miniTask.id === miniTaskId ? true : false
                    return miniTask
                }) : task.miniTaskList
                return task
            }) : project.taskList
            return project
        })
        setProjectList(newProjectList)
    }

    const SubmitUpdatedMiniTask = (projectId, taskId, miniTaskId, newValue) => {
        let newProjectList = projectList.map(project => {
            project.taskList = project.id === projectId ? project.taskList.map(task => {
                if (task.id === taskId) {
                    task.miniTaskList = newValue.title.trim().length === 0 ? task.miniTaskList.map(miniTask => {
                        miniTask.isGetMiniTaskUpdated = false
                        return miniTask
                    }) : task.miniTaskList.map(miniTask => miniTask.id === miniTaskId ? newValue : miniTask)
                }
                return task
            }) : project.taskList
            return project
        })
        setProjectList(newProjectList)
    }

    const DeleteMiniTask = (projectId, taskId, miniTaskId) => {
        let newProjectList = projectList.map(project => {
            project.taskList = project.id === projectId ? project.taskList.map(task => {
                task.miniTaskList = task.id === taskId ? task.miniTaskList.filter(miniTask => miniTask.id !== miniTaskId) : task.miniTaskList
                return task
            }) : project.taskList
            return project
        })
        setProjectList(newProjectList)
    }

    const GetMiniTaskCompleted = (projectId, taskId, miniTaskId) => {
        let newProjectList = projectList.map(project => {
            project.taskList = project.id === projectId ? project.taskList.map(task => {
                task.miniTaskList = task.id === taskId ? task.miniTaskList.map(miniTask => {
                    miniTask.isCompleted = miniTask.id === miniTaskId ? (miniTask.isCompleted ? false : true) : miniTask.isCompleted
                    return miniTask
                }) : task.miniTaskList
                return task
            }) : project.taskList
            return project
        })
        setProjectList(newProjectList)
    }

    // Calendar

    // Profile

    return (
        <>
            <Navbar OpenSection={OpenSection} />
            <main>
                <Dashboard
                    projectList={projectList}
                    isDetailed={isDetailed}
                    projectIndex={projectIndex}
                    GetProjectIndex={GetProjectIndex}
                    GoToGeneralDashboard={GoToGeneralDashboard}
                    OpenCreateProjectModal={() => setIsCreated(true)} />

                <Projects
                    projectList={projectList}
                    GoToProjectDashboard={GoToProjectDashboard}
                    OpenCreateProjectModal={() => setIsCreated(true)}
                    // Project CRUD
                    DeleteProject={DeleteProject}
                    CloseProject={CloseProject}
                    OpenProject={OpenProject}
                    SortProjectList={SortProjectList}
                    // Task CRUD
                    CreateTask={CreateTask}
                    GetTaskUpdated={GetTaskUpdated}
                    SubmitUpdatedTask={SubmitUpdatedTask}
                    DeleteTask={DeleteTask}
                    // Mini task CRUD
                    CreateMiniTask={CreateMiniTask}
                    GetMiniTaskUpdated={GetMiniTaskUpdated} // Get id of updated mini task
                    SubmitUpdatedMiniTask={SubmitUpdatedMiniTask}
                    DeleteMiniTask={DeleteMiniTask}
                    // Get mini task completed
                    GetMiniTaskCompleted={GetMiniTaskCompleted} />

                <Calendar />

                <Profile />
            </main>            

            <CreateModal
                isCreated={isCreated}
                CloseModal={() => setIsCreated(false)}
                CreateProject={CreateProject} />
        </>
    )
}