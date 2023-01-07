import { useState } from "react"

let taskId = 0
let miniTaskId = 0

const CreateTaskId = () => {
    return String(taskId++)
}

const CreateMiniTaskId = () => {
    return String(miniTaskId++)
}

export const TaskForm = (props) => {
    const [input, setInput] = useState({
        title: props.type === "update" ? props.update.title : "",
        end: props.type === "update" ? props.update.end : {
            date: "",
            month: "",
            year: "",
            dayForm: ""
        }
    })
    const [isInappropriateDate, setIsInappropriateDate] = useState(false)

    const HandleChange = (e) => {
        let value = e.target.value

        if (e.target.name === "end") {
            value = {
                date: e.target.value.split("-")[2],
                month: e.target.value.split("-")[1],
                year: e.target.value.split("-")[0],
                dayForm: e.target.value
            }
        }

        setInput({...input, [e.target.name]: value})
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        const taskEndDate = new Date(input.end.dayForm)
        const start = new Date(props.data.project.start.dayForm)
        const end = new Date(props.data.project.end.dayForm)

        if (taskEndDate - start <= 0) {
            setIsInappropriateDate(true)
        }
        else if (end - taskEndDate <= 0) {
            setIsInappropriateDate(true)
        }
        else {
            let today = new Date()

            props.onSubmit({
                id: CreateTaskId(),
                title: input.title,
                start: {
                    date: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear(),
                    dayForm: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
                },
                end: input.end,
                miniTaskList: []
            })
    
            setInput({
                title: "",
                end: {
                    date: "",
                    month: "",
                    year: "",
                    dayForm: ""
                }
            })

            setIsInappropriateDate(false)
        }
    }

    return (
        <form onSubmit={HandleSubmit}>            
            <input
                type="text"
                value={input.title}
                name="title"
                placeholder={props.type === "update" ? "" : "Task's title"}
                onChange={HandleChange}
                required={props.type === "update" ? false : true} />
            <input
                id="task-end"
                className={isInappropriateDate ? "error" : ""}
                type="date"
                value={input.end.dayForm}
                name="end"
                onChange={HandleChange}
                required />
            <p className={isInappropriateDate ? "error" : ""}>
                Inappropriate day (must be between start and end day)
            </p>
            <button type="submit">Submit</button>
        </form>
    )
}

export const MiniTaskForm = (props) => {
    const [input, setInput] = useState(props.type === "update" ? props.update.title : "")

    const HandleChange = (e) => {
        setInput(e.target.value)
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        props.onSubmit({
            id: CreateMiniTaskId(),
            title: input,
            isCompleted: false
        })

        setInput("")
    }

    return (
        <form onSubmit={HandleSubmit}>
            <input
                type="text"
                value={input}
                placeholder={props.type === "update" ? "" : "Mini task's title"}
                onChange={HandleChange}
                required={props.type === "update" ? false : true} />
        </form>
    )
} 