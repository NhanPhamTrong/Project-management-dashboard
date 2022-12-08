import "./Calendar.scss"
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import { useEffect, useState } from "react"
import { Modal } from "./Modal"

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CalendarSection = (props) => {
    const [current, setCurrent] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const [dateOfMonth, setDateOfMonth] = useState([])

    useEffect(() => {
        setDateOfMonth(() => {
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
                    date: lastDateOfLastMonth - i + 1,
                    month: current.month - 1,
                    year: current.month === 1 ? current.year - 1 : current.year,
                    isToday: false,
                    isActive: false
                })
            }

            for (let i = 1; i <= lastDateOfMonth; i++) {
                newList.push({
                    date: i,
                    month: current.month,
                    year: current.year,
                    isToday: CheckIsToday(i),
                    isActive: true
                })
            }

            for (let i = lastDayOfMonth; i < 6; i++) {
                newList.push({
                    date: i - lastDayOfMonth + 1,
                    month: current.month + 1,
                    year: current.month === 11 ? current.year + 1 : current.year,
                    isToday: false,
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
                    {dateOfMonth.map((date, index) => {
                        return (
                            <li key={index} className={date.isToday ? "today" : "" + (date.isActive ? "" : " inactive")}>
                                <div>{date.date}</div>
                                    <Droppable droppableId={(date.month + 1) + "-" + date.date + "-" + date.year}>
                                        {(provided) => (
                                            <ul ref={provided.innerRef} {...provided.droppableProps}>
                                                {props.eventList.map((item, index) => (item.year === date.year && item.month === date.month && item.date === date.date) && (
                                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <li onClick={() => props.ClickEvent(item)}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                    <p>{item.title}</p>
                                                                </li>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
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
        detail: "",
        date: 0,
        month: 0,
        year: 0
    })

    const Drop = (result) => {
        // setEventList(eventList.map((item) => item.id === parseInt(e.target.getAttribute("draggableId")) ? {
        //     id: item.id,
        //     title: item.title,
        //     detail: item.detail,
        //     date: 0,
        //     month: 0,
        //     year: 0
        // } : item))
        
        const {destination, source, draggableId} = result

        if (!destination) {return}

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        const start = source.droppableId
        const finish = destination.droppableId

        if (start === finish) {
            const newEventList = Array.from(eventList)
            newEventList.splice(source.index, 1)            
            newEventList.splice(destination.index, 0, eventList.filter((item) => item.id === parseInt(draggableId))[0])
            
            setEventList(newEventList)
        }
    }

    const SetNewDate = (date, data) => {
        setEventList(eventList.map((item) => item.id === data ? {
            id: item.id,
            title: item.title,
            detail: item.detail,
            date: date.date,
            month: date.month,
            year: date.year
        } : item))
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
            detail: item.detail,
            date: item.date,
            month: item.month,
            year: item.year
        })
    }

    const ClickRemove = (id) => {
        setEventList(eventList.filter((item) => item.id !== id))
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
            detail: "",
            date: 0,
            month: 0,
            year: 0
        })
        setType("completed")
    }

    const CloseModal = () => {
        setIsActiveModal(false)
    }

    return (
        <div id="calendar" className="main-container active">
            <div className="heading">
                <h1>Calendar</h1>
            </div>
            
            <DragDropContext onDragEnd={Drop}>
                <div className="event-section">
                    <button type="button" onClick={OpenAddEvent}>
                        <ion-icon name="add-outline"></ion-icon>
                        Add event
                    </button>
                        <Droppable droppableId="0-0-0">
                            {(provided) => (
                                <ul ref={provided.innerRef} {...provided.droppableProps}>
                                    {eventList.map((item, index) => (item.year === 0 && item.month === 0 && item.date === 0) && (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                            {(provided) => (
                                                <li onClick={() => ClickEvent(item)}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                        <p>{item.title}</p>
                                                    </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                </div>

                <CalendarSection SetNewDate={SetNewDate} eventList={eventList} ClickEvent={ClickEvent} />
            </DragDropContext>

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