import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const Form = (props) => {
    const [input, setInput] = useState(props.type === "update" ? {
        title: props.update.title,
        detail: props.update.detail
    } : {
        title: "",
        detail: ""
    })

    const [error, setError] = useState(false)

    const HandleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            title: input.title,
            detail: input.detail,
            date: props.type === "update" ? props.update.date : 0,
            month: props.type === "update" ? props.update.month : 0,
            year: props.type === "update" ? props.update.year : 0
        })

        if (input.title.trim().length !== 0) {
            setInput({
                title: "",
                detail: ""
            })
        }
        else {
            setError(true)
        }
    }

    return (
        <motion.form onSubmit={HandleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className={"input-box " + (error ? "error" : "")}>
                <label>Title:</label>
                <input type="text" value={input.title} name="title" onChange={HandleChange} />
            </div>
            <div className="input-box">
                <label>Detail:</label>
                <input type="text" value={input.detail} name="detail" onChange={HandleChange} />
            </div>
            <div className="btn">
                <button type="submit">{props.type === "input" ? "Add" : "Update"}</button>
            </div>
        </motion.form>
    )
}

export const Modal = (props) => {
    const AddEvent = (newEvent) => {
        props.AddEvent(newEvent)
    }

    const SubmitUpdate = (newValue) => {
        props.SubmitUpdate(newValue)
    }

    const ModalContent = (modalProps) => {
        if (modalProps.type === "input") {
            return (
                <Form type="input" onSubmit={AddEvent} />
            )
        }
        else if (modalProps.type === "view") {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <h1>{props.item.title}</h1>
                    <p>{props.item.detail}</p>
                    <div className="btn">
                        <button className="remove" type="button" onClick={() => props.ClickRemove(props.item.id)}>Remove</button>
                        <button type="button" onClick={() => props.ClickUpdate(props.item)}>Update</button>
                    </div>
                </motion.div>
            )
        }
        else if (modalProps.type === "update") {
            return (
                <Form update={props.item} type="update" onSubmit={SubmitUpdate} />
            )
        }
        else {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <div className="icon">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </div>
                    <h1>Completed</h1>
                </motion.div>
            )
        }
    }    

    const CloseModal = () => {
        props.CloseModal()
    }

    return (        
        <div className={"modal" + (props.isActiveModal ? " active" : "")}>
            <div className="modal-background" onClick={CloseModal}></div>
            <div className="modal-content">
                <AnimatePresence>
                    <ModalContent type={props.type} />
                </AnimatePresence>
            </div>
        </div>
    )
}