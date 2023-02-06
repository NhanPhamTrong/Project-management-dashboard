import "./Calendar.scss"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useState } from "react"
import { Modal } from "./Modal"

let eventId = 0

const createEventId = () => {
    return String(eventId++)
}

const renderEventContent = (eventInfo) => {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

export const Calendar = (props) => {
    const [type, setType] = useState("")
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
            setType("completed")

            calendarApi.addEvent({
                id: createEventId(),
                title: newEvent.title,
                detail: newEvent.detail,
                start: dateClickInfo.startStr,
                end: dateClickInfo.endStr
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
                end: dateClickInfo.endStr
            })
        }

        setModal({
            id: null,
            title: "",
            detail: ""
        })
        setType("completed")
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
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                />
            </div>

            <Modal
                type={type}
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