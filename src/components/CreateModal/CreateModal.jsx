import "./CreateModal.scss"
import { useState } from "react"
// import { WithContext as ReactTags } from 'react-tag-input'

let projectId = 0

const CreateProjectId = () => {
    return String(projectId++)
}
  
// const KeyCodes = {
//     comma: 188,
//     enter: 13
// }

// const delimiters = [KeyCodes.comma, KeyCodes.enter]

const CreateModalForm = (props) => {
    const [input, setInput] = useState({
        title: "",
        start: {
            date: "",
            month: "",
            year: "",
            dayForm: ""
        },
        end: {
            date: "",
            month: "",
            year: "",
            dayForm: ""
        },
        member: [],
        total: "",
        planned: ""
    })

    const [dateInput, setDateInput] = useState({
        start: "",
        end: ""
    })

    const [isInappropriateDate, setIsInappropriateDate] = useState(false)

    const HandleChange = (e) => {
        let value = e.target.value

        if (e.target.name === "start" || e.target.name === "end") {
            value = {
                date: e.target.value.split("-")[2],
                month: e.target.value.split("-")[1],
                year: e.target.value.split("-")[0],
                dayForm: e.target.value
            }

            setDateInput({...dateInput, [e.target.name]: e.target.value})
        }

        setInput({ ...input, [e.target.name]: value })
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        const start = new Date(input.start.month + "-" + input.start.date + "-" + input.start.year)
        const end = new Date(input.end.month + "-" + input.end.date + "-" + input.end.year)
        
        if (end - start <= 0) {
            setIsInappropriateDate(true)
        }
        else {
            props.onSubmit({
                id: CreateProjectId(),
                createdTime: new Date(),
                isOpened: true,
                isActive: false,
                project: {
                    title: input.title,
                    start: input.start,
                    end: input.end
                },
                member: [],
                budget: {
                    total: input.total,
                    planned: input.planned,
                    actual: 0
                },
                taskList: []
            })
    
            setInput({
                title: "",
                start: {
                    date: "",
                    month: "",
                    year: "",
                    dayForm: ""
                },
                end: {
                    date: "",
                    month: "",
                    year: "",
                    dayForm: ""
                },
                member: [],
                total: "",
                planned: ""
            })
    
            setDateInput({
                start: "",
                end: ""
            })

            setIsInappropriateDate(false)
        }
    }

    // const handleDeleteMember = i => {
    //     let newMemberList = input.member.filter((member, index) => index !== i)
    //     setInput({ ...input, member: newMemberList })
    // }
  
    // const handleAdditionMember = newMember => {
    //     setInput({ ...input, member: [...input.member, newMember] })
    // }

    return (
        <form className="create-modal-form" onSubmit={HandleSubmit}>
            <section>
                <h1>Project</h1>
                <div className="w-100">
                    <input
                        id="project-title"
                        type="text"
                        value={input.title}
                        name="title"
                        onChange={HandleChange}
                        required />
                    <label htmlFor="project-title">Project name</label>
                </div>
                <div className="w-100">
                    <input
                        id="project-start"
                        type="date"
                        value={dateInput.start}
                        name="start"
                        onChange={HandleChange}
                        required />
                    <label htmlFor="project-start">Start</label>
                </div>
                <div className="w-100">
                    <input
                        id="project-end"
                        className={isInappropriateDate ? "error" : ""}
                        type="date"
                        value={dateInput.end}
                        name="end"
                        onChange={HandleChange}
                        required />
                    <label htmlFor="project-end">End</label>
                    <p className={isInappropriateDate ? "error" : ""}>
                        Inappropriate end day (must be after start day)
                    </p>
                </div>
            </section>
            <section>
                <h1>Member</h1>
                <div className="w-100">
                    {/* <ReactTags
                        tags={input.member}
                        delimiters={delimiters}
                        allowDragDrop={false}
                        handleDelete={handleDeleteMember}
                        handleAddition={handleAdditionMember}
                        inputFieldPosition="bottom"
                        placeholder="Member"
                        autocomplete
                    /> */}
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
    return (
        // CREATE MODAL CONTENT
        // Project: name, start, end
        // Budget: total, planned
        // Task list
            // Title
            // Deadline
            // Mini task list
                // Description
        <div className={"create-modal " + (props.isCreated ? "active" : "")}>
            <div className="create-modal-background" onClick={() => props.CloseModal()}></div>
            <div className="create-modal-content">
                <CreateModalForm onSubmit={item => props.CreateProject(item)} />
            </div>
        </div>
    )
}