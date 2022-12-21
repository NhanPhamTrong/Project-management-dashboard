import "./ProjectDetail.scss"
import { motion } from "framer-motion"
import { useState } from "react"

const TaskForm = (props) => {
    const [input, setInput] = useState(props.type === "update" ? props.update.name : "")

    console.log(input)

    const HandleChange = (e) => {
        setInput(e.target.value)
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            name: input
        })

        setInput("")
    }

    return props.type === "update" ? (
        <form onSubmit={HandleSubmit}>
            <input type="text" value={input} onChange={HandleChange} />
        </form>
    ) : (
        <form onSubmit={HandleSubmit}>
            <input type="text" value={input} placeholder="Task's name..." onChange={HandleChange} />
        </form>
    )
}

export const ProjectDetail = (props) => {
    const [updateId, setUpdateId] = useState()

    const GetDate = (item) => {
        return item.month + "-" + item.date + "-" + item.year
    }

    const AddTask = (value) => {
        props.AddTask(value)
    }

    const SubmitUpdatedTask = (newValue) => {
        props.SubmitUpdatedTask(updateId, newValue)
    }

    console.log(props.data)

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
                <button type="button" onClick={() => props.ReturnToList()}>
                    <ion-icon name="caret-back-outline"></ion-icon>
                </button>
                <h1>{props.data.project.name}</h1>
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
                <div className="plan">
                    <p>Plan</p>
                    <p>{"$" + props.data.budget.plan}</p>
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
                                        setUpdateId(task.id)
                                        props.GetTaskUpdated(task.id)
                                    }}>{task.name}</button>
                                )}
                                <button className="delete-btn" type="button" onClick={() => props.DeleteTask(task.id)}>
                                    <ion-icon name="trash"></ion-icon>
                                </button>
                            </div>
                            <ul></ul>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}