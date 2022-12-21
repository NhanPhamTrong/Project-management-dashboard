import { useState } from "react"
import "./CreateModal.scss"

const CreateModalForm = (props) => {
    const [input, setInput] = useState({
        name: "",
        start: {
            date: "",
            month: "",
            year: ""
        },
        end: {
            date: "",
            month: "",
            year: ""
        },
        member: "",
        total: "",
        planned: ""
    })

    const [dateInput, setDateInput] = useState({
        start: "",
        end: ""
    })

    const [isMissing, setIsMissing] = useState({
        start: false,
        end: false,
        inappropriate: false
    })

    const HandleChange = (e) => {
        let value = e.target.value

        if (e.target.name === "start" || e.target.name === "end") {
            value = {
                date: e.target.value.split("-")[2],
                month: e.target.value.split("-")[1],
                year: e.target.value.split("-")[0]
            }

            setDateInput({...dateInput, [e.target.name]: e.target.value})
        }

        setInput({ ...input, [e.target.name]: value })
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        const start = new Date(input.start.month + "-" + input.start.date + "-" + input.start.year)
        const end = new Date(input.end.month + "-" + input.end.date + "-" + input.end.year)

        if (isNaN(start)) {
            setIsMissing({...isMissing, start: true})
        }
        else if (isNaN(end)) {
            setIsMissing({...isMissing, start: false, end: true})
        }
        else if (end - start <= 0) {
            setIsMissing({start: false, end: false, inappropriate: true})
        }
        else {
            props.onSubmit({
                id: Math.floor(Math.random() * 1000),
                createdTime: new Date(),
                isOpened: true,
                isActive: false,
                project: {
                    name: input.name,
                    start: {
                        date: input.start.date,
                        month: input.start.month,
                        year: input.start.year
                    },
                    end: {
                        date: input.end.date,
                        month: input.end.month,
                        year: input.end.year
                    }
                },
                member: "",
                budget: {
                    total: input.total,
                    planned: input.planned
                },
                taskList: []
            })
    
            setInput({
                name: "",
                start: {
                    date: "",
                    month: "",
                    year: ""
                },
                end: {
                    date: "",
                    month: "",
                    year: ""
                },
                member: "",
                total: "",
                planned: ""
            })
    
            setDateInput({
                start: "",
                end: ""
            })

            setIsMissing({
                start: false,
                end: false,
                inappropriate: false
            })
        }
    }

    return (
        <form className="create-modal-form" onSubmit={HandleSubmit}>
            <section>
                <h1>Project</h1>
                <div className="w-100">
                    <input
                        id="project-name"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={HandleChange}
                        required />
                    <label htmlFor="project-name">Project name</label>
                </div>
                <div className="w-100">
                    <input
                        id="project-start"
                        className={isMissing.start ? "error" : ""}
                        type="date"
                        value={dateInput.start}
                        name="start"
                        onChange={HandleChange} />
                    <label htmlFor="project-start">Start</label>
                    <p className={isMissing.start ? "error" : ""}>Missing start day</p>
                </div>
                <div className="w-100">
                    <input
                        id="project-end"
                        className={(isMissing.end || isMissing.inappropriate) ? "error" : ""}
                        type="date"
                        value={dateInput.end}
                        name="end"
                        onChange={HandleChange} />
                    <label htmlFor="project-end">End</label>
                    <p className={(isMissing.end || isMissing.inappropriate) ? "error" : ""}>
                        {isMissing.end ? "Missing end day" : "Inappropriate end day (must be after start day)"}
                    </p>
                </div>
            </section>
            <section>
                <h1>Member</h1>
                <div className="w-100">
                    <input
                        id="member"
                        type="number"
                        value={input.member}
                        name="member"
                        onChange={HandleChange}
                        required />
                    <label htmlFor="total">Member</label>
                </div>
            </section>
            <section>
                <h1>Budget</h1>
                <div className="w-50">
                    <input
                        id="total"
                        type="number"
                        value={input.total}
                        name="total"
                        onChange={HandleChange}
                        required />
                    <label htmlFor="total">Total</label>
                </div>
                <div className="w-50">
                    <input
                        id="planned"
                        type="number"
                        value={input.planned}
                        name="planned"
                        onChange={HandleChange}
                        required />
                    <label htmlFor="planned">Planned</label>
                </div>
            </section>
            <div className="submit-btn">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export const CreateModal = (props) => {
    const AddProject = (item) => {
        props.AddProject(item)
    }

    return (
        // CREATE MODAL CONTENT
        // Project: name, start, end
        // Budget: total, planned
        // Task list
            // Title
            // Deadline
            // Mini task list
                // Description
        <div className={"create-modal " + (props.isCreate ? "active" : "")}>
            <div className="create-modal-background" onClick={() => props.CloseModal()}></div>
            <div className="create-modal-content">
                <CreateModalForm onSubmit={AddProject} />
            </div>
        </div>
    )
}