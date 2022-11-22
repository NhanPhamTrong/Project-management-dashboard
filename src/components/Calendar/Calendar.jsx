import "./Calendar.scss"
import { useEffect, useState } from "react"
import { Modal } from "./Modal"

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CalendarSection = () => {
    const [current, setCurrent] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const [dayOfMonth, setDayOfMonth] = useState([])

    useEffect(() => {
        setDayOfMonth(() => {
            let newList = []

            let firstDayOfMonth = new Date(current.year, current.month, 1).getDay()
            let lastDateOfLastMonth = new Date(current.year, current.month, 0).getDate()

            let lastDateOfMonth = new Date(current.year, current.month + 1, 0).getDate()

            let lastDayOfMonth = new Date(current.year, current.month, lastDateOfMonth).getDay()

            const CheckIsToday = (thisDate) => {
                let date = new Date()
        
                return (date.getDate() === thisDate
                    && date.getMonth() === current.month
                    && date.getFullYear() === current.year) ? true : false
            }

            for (let i = firstDayOfMonth; i > 0; i--) {
                newList.push({
                    day: lastDateOfLastMonth - i + 1,
                    isToday: CheckIsToday(lastDateOfLastMonth - i + 1),
                    isActive: false
                })
            }

            for (let i = 1; i <= lastDateOfMonth; i++) {
                newList.push({
                    day: i,
                    isToday: CheckIsToday(i),
                    isActive: true
                })
            }

            for (let i = lastDayOfMonth; i < 6; i++) {
                newList.push({
                    day: i - lastDayOfMonth + 1,
                    isToday: CheckIsToday(i - lastDayOfMonth + 1),
                    isActive: false
                })
            }

            return newList
        })
    }, [current])

    const ClickForward = () => {
        setCurrent((prevValue) => ({
            month: prevValue.month === 11 ? 0 : prevValue.month + 1,
            year: prevValue.month === 11 ? prevValue.year + 1 : prevValue.year
        }))
    }

    const ClickBack = () => {
        setCurrent((prevValue) => ({
            month: prevValue.month === 0 ? 11 : prevValue.month - 1,
            year: prevValue.month === 0 ? prevValue.year - 1 : prevValue.year
        }))
    }

    const AllowDrop = (e) => {
        e.preventDefault()
    }

    const Drop = (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData("text")
        e.currentTarget.appendChild(document.getElementById(data))
    }

    return (
        <div className="calendar-section">
            <p className="current-date">
                {month[current.month] + " " + current.year}
            </p>
            <div className="arrow-btn">
                <button type="button" onClick={ClickBack}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button type="button" onClick={ClickForward}>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
            </div>
            <div>
                <ul className="week">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul className="date">
                    {dayOfMonth.map((item, index) => {
                        return (
                            <li key={index} className={item.isToday ? "today" : "" + (item.isActive ? "" : " inactive")}>
                                <div>{item.day}</div>
                                <ul onDrop={Drop} onDragOver={AllowDrop}></ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export const Calendar = () => {
    const [eventList, setEventList] = useState([])

    const [isActiveModal, setIsActiveModal] = useState(false)
    const [type, setType] = useState("")

    const [modal, setModal] = useState({
        id: null,
        title: "",
        detail: ""
    })

    const AllowDrop = (e) => {
        e.preventDefault()
    }
      
    const Drag = (e) => {
        e.dataTransfer.setData("text", e.currentTarget.id)
    }

    const Drop = (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData("text")
        e.currentTarget.appendChild(document.getElementById(data))
    }

    const OpenAddEvent = () => {
        setIsActiveModal(true)
        setType("input")
    }

    const AddEvent = (newEvent) => {
        if (newEvent.title.trim().length !== 0) {
            eventList.push(newEvent)
            setType("completed")
        }
    }

    const ClickEvent = (item) => {
        setIsActiveModal(true)
        setType("view")
        setModal({
            id: item.id,
            title: item.title,
            detail: item.detail
        })
    }

    const ClickRemove = (id) => {
        document.getElementById(id).closest("ul").removeChild(document.getElementById(id))
        setType("completed")
    }

    const ClickUpdate = () => {
        setType("update")
    }

    const SubmitUpdate = (newValue) => {
        if (newValue.title.trim().length === 0) {
            return
        }
        else {
            setEventList(eventList.map((item) => (item.id === modal.id ? newValue : item)))
        }
        setModal({
            id: null,
            title: "",
            detail: ""
        })
        setType("completed")
    }

    const CloseModal = () => {
        setIsActiveModal(false)
    }

    return (
        <div id="calendar" className="main-container">
            <div className="heading">
                <h1>Calendar</h1>
            </div>
            <div className="event-section">
                <button type="button" onClick={OpenAddEvent}>
                    <ion-icon name="add-outline"></ion-icon>
                    Add event
                </button>
                <ul onDrop={Drop} onDragOver={AllowDrop}>
                    {eventList.map((item, index) => (
                        <li key={index}
                            id={item.id}
                            draggable="true"
                            onDragStart={Drag}
                            onClick={() => ClickEvent(item)}>{item.title}</li>
                    ))}
                </ul>
            </div>

            <CalendarSection />

            <Modal type={type}
                isActiveModal={isActiveModal}
                item={modal}
                CloseModal={CloseModal}
                AddEvent={AddEvent}
                ClickUpdate={ClickUpdate}
                SubmitUpdate={SubmitUpdate}
                ClickRemove={ClickRemove} />
        </div>
    )
}