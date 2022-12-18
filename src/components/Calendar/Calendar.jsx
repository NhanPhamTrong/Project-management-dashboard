import "./Calendar.scss"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useState } from "react"
import { Modal } from "./Modal"

let eventGuid = 0

const createEventId = () => {
    return String(eventGuid++)
}

const renderEventContent = (eventInfo) => {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

export const Calendar = () => {
    const [type, setType] = useState("")    
    const [eventList, setEventList] = useState([])
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [dateClickInfo, setDateClickInfo] = useState()
    const [eventClickInfo, setEventClickInfo] = useState()
    const [modal, setModal] = useState({
        id: null,
        title: "",
        detail: ""
    })

    const CloseModal = () => {
        setIsActiveModal(false)
    }

    const handleDateSelect = (selectInfo) => {
        setDateClickInfo(selectInfo)
        setIsActiveModal(true)
        setType("input")
    }

    const AddEvent = (newEvent) => {
        let calendarApi = dateClickInfo.view.calendar
        calendarApi.unselect()

        if (newEvent.title.trim().length !== 0) {
            eventList.push(newEvent)
            setEventList(prevValue => [...prevValue, newEvent])
            setType("completed")

            calendarApi.addEvent({
                id: createEventId(),
                title: newEvent.title,
                detail: newEvent.detail,
                start: dateClickInfo.startStr,
                end: dateClickInfo.endStr,
                allDay: dateClickInfo.allDay
            })
        }
    }

    const handleEventClick = (clickInfo) => {
        setEventClickInfo(clickInfo)
        setIsActiveModal(true)
        setType("view")
        setModal({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            detail: clickInfo.event.extendedProps.detail
        })
    }

    const ClickRemove = (id) => {
        eventClickInfo.event.remove()
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
            let calendarApi = dateClickInfo.view.calendar
            calendarApi.unselect()

            eventClickInfo.event.remove()

            calendarApi.addEvent({
                id: createEventId(),
                title: newValue.title,
                detail: newValue.detail,
                start: dateClickInfo.startStr,
                end: dateClickInfo.endStr,
                allDay: dateClickInfo.allDay
            })
        }

        setEventList(eventList.map((event) => event.id === modal.id ? newValue : event))

        setModal({
            id: null,
            title: "",
            detail: ""
        })
        setType("completed")
    }

    const handleEvents = (events) => {
        setEventList(events)
    }

    return (
        <div id="calendar" className="main-container">
            <div className="heading">
                <h1>Calendar</h1>
            </div>

            <div className="calendar-section">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev,next",
                        right: "title"
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    initialEvents={eventList}
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                />
            </div>

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