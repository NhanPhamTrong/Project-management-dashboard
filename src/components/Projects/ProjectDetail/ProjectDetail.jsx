import "./ProjectDetail.scss"
import { motion } from "framer-motion"
import { useState } from "react"
import { useEffect, useRef } from "react"
import { TaskForm, MiniTaskForm } from "./ProjectDetailForm"

const MiniTask = (props) => {
    return (        
        <div
            className={"mini-task-list-section " + (props.isOpenMiniTaskList ? "active" : "")}
            style={{ "--c": props.task.miniTaskList.length }}>
            <MiniTaskForm type="input" onSubmit={(value) => props.CreateMiniTask(value)} />
            <ul>
                {props.task.miniTaskList.map((miniTask, index) => (
                    <li key={index}>
                        <div className="mini-task">
                            <div className={"checkbox " + (miniTask.isCompleted ? "active" : "")}>
                                <button
                                    type="button"
                                    onClick={() => props.GetMiniTaskCompleted(miniTask.id)}>
                                    <span>
                                        <ion-icon name="checkmark"></ion-icon>
                                    </span>
                                </button>
                            </div>
                            {miniTask.isGetMiniTaskUpdated ? (
                                <MiniTaskForm
                                    type="update"
                                    update={miniTask}
                                    onSubmit={(newValue) => props.SubmitUpdatedMiniTask(miniTask.id, newValue)} />
                            ) : (
                                <button type="button" onClick={() => props.GetMiniTaskUpdated(miniTask.id)}>{miniTask.title}</button>
                            )}
                            <button type="button" onClick={() => props.DeleteMiniTask(miniTask.id)}>
                                <ion-icon name="trash"></ion-icon>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Task = (props) => {
    const ref = useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenMiniTaskList, setIsOpenMiniTaskList] = useState(false)

    useEffect(() => {
        const HandleClickOutside = (e) => {
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", HandleClickOutside)
        return (() => {
            document.removeEventListener("mousedown", HandleClickOutside)
        })
    })

    const GetTaskUpdated = () => {
        setIsOpen(false)
        props.GetTaskUpdated()
    }

    return (
        <li>
            <div className="task">
                <button
                    className={"open-mini-task-btn " + (isOpenMiniTaskList ? "active" : "")}
                    type="button"
                    onClick={() => setIsOpenMiniTaskList(!isOpenMiniTaskList)}>
                        <ion-icon name="chevron-forward"></ion-icon>
                </button>
                {props.task.isGetTaskUpdated ? (
                    <TaskForm
                        type="update"
                        data={props.data}
                        update={props.task}
                        onSubmit={(newValue) => props.SubmitUpdatedTask(newValue)} />
                ) : (
                    <p>{props.task.title}</p>
                )}
                <div className="task-menu" ref={ref}>
                    <button
                        className={"task-menu-toggler " + (isOpen ? "active" : "")}
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}>
                            <ion-icon name="ellipsis-vertical"></ion-icon>
                    </button>
                    <div className={"task-options " + (isOpen ? "active" : "")}>
                        <button
                            className="update"
                            type="button"
                            onClick={GetTaskUpdated}>Update</button>
                        <button
                            className="delete"
                            type="button"
                            onClick={() => props.DeleteTask()}>Delete</button>
                    </div>
                </div>
            </div>
            <MiniTask
                isOpenMiniTaskList={isOpenMiniTaskList}
                data={props.data}
                task={props.task}
                CreateMiniTask={value => props.CreateMiniTask(props.data.id, props.task.id, value)}
                GetMiniTaskCompleted={miniTaskId => props.GetMiniTaskCompleted(props.data.id, props.task.id, miniTaskId)}
                SubmitUpdatedMiniTask={(miniTaskId, newValue) => props.SubmitUpdatedMiniTask(props.data.id, props.task.id, miniTaskId, newValue)}
                GetMiniTaskUpdated={miniTaskId => props.GetMiniTaskUpdated(props.data.id, props.task.id, miniTaskId)}
                DeleteMiniTask={miniTaskId => props.DeleteMiniTask(props.data.id, props.task.id, miniTaskId)} />
        </li>
    )
}

export const ProjectDetail = (props) => {
    const GetDate = (item) => {
        return item.month + "-" + item.date + "-" + item.year
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
                <button type="button" onClick={() => props.GoToProjectDashboard(props.data.id)}>
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
                <TaskForm
                    type="input"
                    data={props.data}
                    onSubmit={(value) => props.CreateTask(props.data.id, value)} />
                <ul>
                    {props.data.taskList.map((task, index) => (
                        <Task
                            key={index}
                            data={props.data}
                            task={task}
                            OpenMiniTaskList={() => props.OpenMiniTaskList(props.data.id, task.id)}
                            SubmitUpdatedTask={newValue => props.SubmitUpdatedTask(props.data.id, task.id, newValue)}
                            GetTaskUpdated={() => props.GetTaskUpdated(props.data.id, task.id)}
                            DeleteTask={() => props.DeleteTask(props.data.id, task.id)}
                            // Mini task CRUD
                            CreateMiniTask={(projectId, taskId, value) => props.CreateMiniTask(projectId, taskId, value)}
                            GetMiniTaskCompleted={(projectId, taskId, miniTaskId) => props.GetMiniTaskCompleted(projectId, taskId, miniTaskId)}
                            SubmitUpdatedMiniTask={(projectId, taskId, miniTaskId, newValue) => props.SubmitUpdatedMiniTask(projectId, taskId, miniTaskId, newValue)}
                            GetMiniTaskUpdated={(projectId, taskId, miniTaskId) => props.GetMiniTaskUpdated(projectId, taskId, miniTaskId)}
                            DeleteMiniTask={(projectId, taskId, miniTaskId) => props.DeleteMiniTask(projectId, taskId, miniTaskId)}/>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}