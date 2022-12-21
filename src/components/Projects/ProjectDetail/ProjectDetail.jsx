import "./ProjectDetail.scss"
import { motion } from "framer-motion"
import { useState } from "react"

let taskId = 0
// let miniTaskId = 0

const CreateTaskId = () => {
    return String(taskId++)
}

// const CreateMiniTaskId = () => {
//     return String(miniTaskId++)
// }

const TaskForm = (props) => {
    const [input, setInput] = useState({
        title: props.type === "update" ? props.update.title : "",
        end: props.type === "update" ? props.update.end : {
            date: "",
            month: "",
            year: ""
        }
    })
    const [dateInput, setDateInput] = useState("")

    const HandleChange = (e) => {
        let value = e.target.value

        if (e.target.name === "end") {
            value = {
                date: e.target.value.split("-")[2],
                month: e.target.value.split("-")[1],
                year: e.target.value.split("-")[0]
            }

            setDateInput(e.target.value)
        }

        setInput({...input, [e.target.name]: value})
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        props.onSubmit({
            id: CreateTaskId(),
            title: input.title,
            end: dateInput,
            miniTaskList: []
        })

        setInput({
            title: "",
            end: {
                date: "",
                month: "",
                year: ""
            }
        })

        setDateInput("")
    }

    return props.type === "update" ? (
        <form onSubmit={HandleSubmit}>
            <input type="text" value={input.title} name="title" onChange={HandleChange} />
            <input
                id="task-end"
                type="date"
                value={dateInput}
                name="end"
                onChange={HandleChange} />
            <button type="submit">Submit</button>
        </form>
    ) : (
        <form onSubmit={HandleSubmit}>
            <input type="text" value={input.title} name="title" placeholder="Task's title..." onChange={HandleChange} />
            <input
                id="task-end"
                type="date"
                value={dateInput}
                name="end"
                onChange={HandleChange} />
            <button type="submit">Submit</button>
        </form>
    )
}

// const MiniTaskForm = (props) => {
//     const [input, setInput] = useState(props.type === "update" ? props.update.title : "")

//     const HandleChange = (e) => {
//         setInput(e.target.value)
//     }

//     const HandleSubmit = (e) => {
//         e.preventDefault()

//         props.onSubmit({
//             id: CreateMiniTaskId(),
//             name: input
//         })

//         setInput("")
//     }

//     return props.type === "update" ? (
//         <form onSubmit={HandleSubmit}>
//             <input type="text" value={input} onChange={HandleChange} />
//         </form>
//     ) : (
//         <form onSubmit={HandleSubmit}>
//             <input type="text" value={input} placeholder="Task's title..." onChange={HandleChange} />
//         </form>
//     )
// }

export const ProjectDetail = (props) => {
    const [updateTaskId, setUpdateTaskId] = useState()
    // const [updateMiniTaskId, setUpdateMiniTaskId] = useState()

    const GetDate = (item) => {
        return item.month + "-" + item.date + "-" + item.year
    }

    const AddTask = (value) => {
        props.AddTask(value)
    }

    const SubmitUpdatedTask = (newValue) => {
        props.SubmitUpdatedTask(updateTaskId, newValue)
    }

    return (
        // name
        // start, end
        // budget
        // task list
        <motion.div className="project-detail"
            key="project-detail"
            variants={props.variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition">
            <div className="header">
                <button className="return-btn" type="button" onClick={() => props.ReturnToProjectList()}>
                    <ion-icon name="caret-back-outline"></ion-icon>
                </button>
                <h1>{props.data.project.title}</h1>
                <button type="button">
                    Project dashboard
                    <span>
                        <ion-icon name="arrow-forward"></ion-icon>
                    </span>
                </button>
            </div>
            <div className="project-date">
                <div className="start">
                    <p>Start</p>
                    <p>{GetDate(props.data.project.start)}</p>
                </div>
                <div className="end">
                    <p>End</p>
                    <p>{GetDate(props.data.project.end)}</p>
                </div>
            </div>
            <div className="project-budget">
                <div className="total">
                    <p>Total</p>
                    <p>{"$" + props.data.budget.total}</p>
                </div>
                <div className="planned">
                    <p>Planned</p>
                    <p>{"$" + props.data.budget.planned}</p>
                </div>
                <div className="actual">
                    <p>Actual</p>
                    <p>asd</p>
                </div>
            </div>
            <div className="task-list-section">
                <h1>Task list</h1>
                <TaskForm type="input" onSubmit={AddTask} />
                <ul>
                    {props.data.taskList.map((task, index) => (
                        <li key={index}>
                            <div className="task">
                                <button type="button" onClick={() => props.OpenMiniTaskList(task.id)}>
                                    <ion-icon name="chevron-forward"></ion-icon>
                                </button>
                                {task.isGetTaskUpdated ? (
                                    <TaskForm type="update" update={task} onSubmit={SubmitUpdatedTask} />
                                ) : (
                                    <button type="button" onClick={() => {
                                        setUpdateTaskId(task.id)
                                        props.GetTaskUpdated(task.id)
                                    }}>{task.title}</button>
                                )}
                                <button type="button" onClick={() => props.DeleteTask(task.id)}>
                                    <ion-icon name="trash"></ion-icon>
                                </button>
                            </div>
                            <ul>
                                {/* {task.miniTaskList.map((miniTask) => (
                                    <li>
                                        <div className="mini-task">
                                            <div className="checkbox"></div>
                                            <button type="button" onClick={() => {
                                                setUpdateMiniTaskId(miniTask.id)
                                                props.GetMiniTaskUpdated(miniTask.id)
                                            }}>{miniTask.title}</button>
                                        </div>
                                    </li>
                                ))} */}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}