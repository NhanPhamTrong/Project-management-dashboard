import "./ProjectList.scss"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const ProjectListItem = (props) => {
    const ref = useRef()
    const [isOpen, setIsOpen] = useState(false)

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

    return (
        <li>
            <button className="project-name" type="button" onClick={() => props.OpenProjectDetail(props.item.id)}>
                {props.item.project.title}
            </button>
            <div className="project-menu" ref={ref}>
                <button className="project-menu-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                </button>
                <div className={"project-options " + (isOpen ? "active" : "")}>
                    <button type="button" onClick={() => props.DeleteProject(props.item.id)}>Delete</button>
                    {props.item.isOpened ? (
                        <button type="button" onClick={() => props.CloseProject(props.item.id)}>Close project</button>
                    ) : (
                        <button type="button" onClick={() => props.OpenProject(props.item.id)}>Open project</button>
                    )}
                </div>
            </div>
        </li>
    )
}

export const ProjectList = (props) => {
    const ref = useRef()
    const [isOpen, setIsOpen] = useState(false)

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

    const SortProjectList = (e) => {
        props.SortProjectList(e.target.name)
    }

    return (
        <motion.div className="project-list"
            key="project-list"
            variants={props.variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition">
            <div className="project-list-header">
                <div className="list-show-options">
                    <button type="button" onClick={() => props.SetOpen()}>
                        <span>{props.projectList.filter((item) => item.isOpened).length}</span>
                        Open
                    </button>
                    <button type="button" onClick={() => props.SetClose()}>
                        <span>{props.projectList.filter((item) => !item.isOpened).length}</span>
                        Close
                    </button>
                </div>
                <div className="sort" ref={ref}>
                    <button className="sort-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
                        Sort
                        <ion-icon name="caret-down"></ion-icon>
                    </button>
                    <div className={"sort-options " + (isOpen ? "active" : "")}>
                        <button type="button" onClick={SortProjectList} name="newest">Newest</button>
                        <button type="button" onClick={SortProjectList} name="oldest">Oldest</button>
                        <button type="button" onClick={SortProjectList} name="deadline">Deadline</button>
                        <button type="button" onClick={SortProjectList} name="alphabet">Alphabet</button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {props.isOpenedList ? (
                    <motion.ul
                        className={props.projectList.filter((item) => item.isOpened).length === 0 ? "no-content" : ""}
                        key="open-project"
                        variants={props.variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition="transition">
                        {props.projectList.filter((item) => item.isOpened).length > 0 ? (
                            props.projectList.filter((item) => item.isOpened).map((item, index) => (
                                <ProjectListItem
                                    key={index}
                                    item={item}
                                    OpenProjectDetail={(id) => props.OpenProjectDetail(id)}
                                    DeleteProject={(id) => props.DeleteProject(id)}
                                    CloseProject={(id) => props.CloseProject(id)}
                                    OpenProject={(id) => props.OpenProject(id)} />
                            ))
                        ) : (
                            <h1>No opened projects</h1>
                        )}
                    </motion.ul>
                ) : (
                    <motion.ul
                        className={props.projectList.filter((item) => !item.isOpened).length === 0 ? "no-content" : ""}
                        key="close-project"
                        variants={props.variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition="transition">
                        {props.projectList.filter((item) => !item.isOpened).length > 0 ? (
                            props.projectList.filter((item) => !item.isOpened).map((item, index) => (
                                <ProjectListItem
                                    key={index}
                                    item={item}
                                    OpenProjectDetail={(id) => props.OpenProjectDetail(id)}
                                    DeleteProject={(id) => props.DeleteProject(id)}
                                    CloseProject={(id) => props.CloseProject(id)}
                                    OpenProject={(id) => props.OpenProject(id)} />
                            ))
                        ) : (
                            <h1>No closed projects</h1>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    )
}