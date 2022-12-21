import "./ProjectList.scss"
import { AnimatePresence, motion } from "framer-motion"

const ProjectListItem = (props) => {
    return (
        <li>
            <button className="project-name" type="button" onClick={() => props.ClickProject(props.item.id)}>
                {props.item.project.name}
            </button>
            <div className="project-menu">
                <button className="project-menu-toggler" type="button" onClick={() => props.ClickMenu(props.item.id)}>
                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                </button>
                <div className={"project-options " + (props.item.isActive ? "active" : "")}>
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
                <div className="sort">
                    <button className="sort-toggler" type="button" onClick={() => props.SetSortOption()}>
                        Sort
                        <ion-icon name="caret-down"></ion-icon>
                    </button>
                    <div className={"sort-options " + (props.isActiveSortOption ? "active" : "")}>
                        <button type="button" onClick={() => props.SortNewest()}>Newest</button>
                        <button type="button" onClick={() => props.SortOldest()}>Oldest</button>
                        <button type="button" onClick={() => props.SortDeadline()}>Deadline</button>
                        <button type="button" onClick={() => props.SortAlphabet()}>Alphabet</button>
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
                                    ClickProject={(id) => props.ClickProject(id)}
                                    ClickMenu={(id) => props.ClickMenu(id)}
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
                                    ClickProject={(id) => props.ClickProject(id)}
                                    ClickMenu={(id) => props.ClickMenu(id)}
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