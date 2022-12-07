import "./GeneralDashboard.scss"
import { motion } from "framer-motion"
import { wrap } from "popmotion"
import React, { useEffect, useRef, useState } from "react"
import { DistinguishTask } from "../Data"

// const content = [{
//     project: {
//         name: "Project 1",
//         start: "9/12/2022",
//         end: "2/16/2023"
//     },
//     progress: 46, // Percent of completed task / taskList.length
//     budget: {
//         planned: 429,
//         actual: 537
//     },
//     overdue: {
//         high: 2,    
//         medium: 1,
//         low: 3
//     }
// },
// {
//     project: {
//         name: "Project 2",
//         start: "8/28/2022",
//         end: "1/12/2023"
//     },
//     progress: 73,
//     budget: {
//         planned: 477,
//         actual: 586
//     },
//     overdue: {
//         high: 3,
//         medium: 2,
//         low: 1
//     }
// },
// {
//     project: {
//         name: "Project 3",
//         start: "5/12/2022",
//         end: "8/21/2023"
//     },
//     progress: 58,
//     budget: {
//         planned: 753,
//         actual: 486
//     },
//     overdue: {
//         high: 1,
//         medium: 2,
//         low: 1
//     }
// },
// {
//     project: {
//         name: "Project 4",
//         start: "9/26/2022",
//         end: "2/3/2023"
//     },
//     progress: 35,
//     budget: {
//         planned: 356,
//         actual: 267
//     },
//     overdue: {
//         high: 4,
//         medium: 2,
//         low: 2
//     }
// }]

const GeneralDashboardContent = (props) => {
    const progress = Math.round(props.item.taskList.filter((item) => item.isCompleted).length / props.item.taskList.length * 10000) / 100

    const maxBudget = Math.max(props.item.budget.planned, props.item.budget.actual)
    const budgetChartHeight = [props.item.budget.planned / maxBudget * 100, props.item.budget.actual / maxBudget * 100]

    let high = []
    let medium = []
    let low = []
    
    DistinguishTask(props.item.taskList).overdueTaskList.forEach((item) => {
        const deadline = new Date((item.deadline.month + 1) + "/" + item.deadline.date + "/" + item.deadline.year)
        const difference = Math.round(Math.abs(deadline - (new Date())) / (1000 * 3600 * 24))

        if (difference < 5) {
            low.push(item)
        }
        else if (difference >= 5 && difference < 10) {
            medium.push(item)
        }
        else {
            high.push(item)
        }
    })

    const maxOverdue = Math.max(high.length, medium.length, low.length)
    const overdueChartHeight = [high.length / maxOverdue * 100, medium.length / maxOverdue * 100, low.length / maxOverdue * 100]

    const projectStart = (props.item.project.start.month + 1) + "-" + props.item.project.start.date + "-" + props.item.project.start.year
    const projectEnd = (props.item.project.end.month + 1) + "-" + props.item.project.end.date + "-" + props.item.project.end.year

    return (
        <motion.div
            className="general-content"
            key={props.item.project.name}
            custom={props.direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="project">
                <button type="button" onClick={() => props.paginate(-1)}>
                    <ion-icon name="arrow-back"></ion-icon>
                </button>
                <button className="name" type="button" onClick={() => props.GetProjectIndex(props.item.project.name)}>
                    {props.item.project.name}
                </button>
                <button type="button" onClick={() => props.paginate(1)}>
                    <ion-icon name="arrow-forward"></ion-icon>
                </button>
                <div className="start">
                    <strong>Start</strong>
                    <p>{projectStart}</p>
                </div>
                <div className="end">
                    <strong>End</strong>
                    <p>{projectEnd}</p>
                </div>
            </div>
            <div className="progress">
                <svg>
                    <circle cx="80" cy="80" r="80"></circle>
                    <circle cx="80" cy="80" r="80" id="fill"
                        style={{ "--dashOffset" : 502 - progress * 502 / 100 }}></circle>
                </svg>
                <h1>{progress + "%"}</h1>
            </div>
            <div className="budget">
                <div className="chart">
                    <div style={{ "--height" : budgetChartHeight[0] + "%" }}><p>{props.item.budget.planned}</p></div>
                    <div style={{ "--height" : budgetChartHeight[1] + "%" }}><p>{props.item.budget.actual}</p></div>
                </div>
                <div className="bar-title">
                    <p>Planned</p>
                    <p>Actual</p>
                </div>
            </div>
            <div className="overdue">
                <div className="bar-title">
                    <p>High</p>
                    <p>Medium</p>
                    <p>Low</p>
                </div>
                <div className="chart">
                    <div style={{ "--width" : overdueChartHeight[0] + "%" }}><p>{high.length > 0 && high.length}</p></div>
                    <div style={{ "--width" : overdueChartHeight[1] + "%" }}><p>{medium.length > 0 && medium.length}</p></div>
                    <div style={{ "--width" : overdueChartHeight[2] + "%" }}><p>{low.length > 0 && low.length}</p></div>
                </div>
            </div>
        </motion.div>
    )
}

export const GeneralDashboard = (props) => {
    const [[project, direction], setProject] = useState([0, 0])
    const contentIndex = wrap(0, props.data.length, project)

    const [isSmall, setIsSmall] = useState(window.innerWidth < 992 ? true : false)

    const [carouselWidth, setCarouselWidth] = useState(0)
    const carousel = useRef()

    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth < 992 ? true : false)
            setCarouselWidth(props.data.length * 320 - carousel.current.offsetWidth)
        }
        
        setCarouselWidth(props.data.length * 320 - carousel.current.offsetWidth)
      
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [props.data])

    const paginate = (newDirection) => {
        setProject([project + newDirection, newDirection]);
    }

    const GetProjectIndex = (name) => {
        props.GetProjectIndex(name)
    }

    return (
        // Project (name, start, end)
        // Progress (circle)
        // Budget (plan and actual)
        // Risk and issue (overdue)
        <div className="general-dashboard">
            <div className="general-heading">
                <h1>Project</h1>
                <h1>Progress</h1>
                <h1>Budget</h1>
                <h1>Overdue</h1>
            </div>
            <React.Fragment key={carouselWidth}>
                {isSmall ? (
                    <motion.div className="carousel" ref={carousel}>
                        <GeneralDashboardContent item={props.data[contentIndex]} direction={direction} paginate={paginate} GetProjectIndex={GetProjectIndex} />
                    </motion.div>
                ) : (
                    <motion.div className="carousel" ref={carousel}>
                        <motion.ul drag="x" dragConstraints={{ right: 0, left: -carouselWidth }}>
                            {props.data.map((item, index) => (
                                <li key={index}>
                                    <GeneralDashboardContent item={item} GetProjectIndex={GetProjectIndex} />
                                </li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </React.Fragment>
        </div>
    )
}