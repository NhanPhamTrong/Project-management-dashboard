import "./ProjectDashboard.scss"

const DistinguishTask = (taskList) => {
    let overdueTaskList = []
    let upcomingDeadlineList = []

    taskList.forEach((item) => {
        const end = new Date((item.end.month + 1) + "/" + item.end.date + "/" + item.end.year)
        const difference = end - (new Date())

        if (difference > 0) {
            upcomingDeadlineList.push(item)
        }
        else {
            overdueTaskList.push(item)
        }
    })

    return {
        overdueTaskList: overdueTaskList,
        upcomingDeadlineList: upcomingDeadlineList
    }
}

const ProjectBudget = (props) => {
    const highestCost = Math.max(props.budget.total, props.budget.actual, props.budget.planned)
    const highestVerticalValue = (parseInt(highestCost / 30) + 1) * 30
    const difference = Math.floor((props.budget.actual - props.budget.planned) / props.budget.planned * 10000) / 100

    const CalculateBarHeight = (value) => {
        return value * 160 / highestVerticalValue
    }

    const CalculateRemainValue = () => {
        return difference > 0 ? (difference + "% over") : (-difference + "% under")
    }

    return (
        <section className="project-budget-section">
            <h1>Project budget</h1>
            <div className="chart-and-stat">
                <div className="chart">
                    <div className="chart-background"></div>
                    <div className="chart-content">
                        <div className="vertical-value">
                            <p>{"$" + highestVerticalValue}</p>
                            <p>{"$" + highestVerticalValue * 2 / 3}</p>
                            <p>{"$" + highestVerticalValue / 3}</p>
                            <p>$0</p>
                        </div>
                        <div className="bar">
                            <div style={{ "--height": CalculateBarHeight(props.budget.total) + "px" }}></div>
                            <div style={{ "--height": CalculateBarHeight(props.budget.actual) + "px" }}></div>
                            <div style={{ "--height": CalculateBarHeight(props.budget.planned) + "px" }}></div>
                        </div>
                    </div>
                    <div className="note">
                        <div className="note-item">
                            <div></div><p>Total budget</p>
                        </div>
                        <div className="note-item">
                            <div></div><p>Budget amount use</p>
                        </div>
                        <div className="note-item">
                            <div></div><p>Target amount use</p>
                        </div>
                    </div>
                </div>
                <div className="stat">
                    <p>Total budget <span>{"$" + props.budget.total}</span></p>
                    <p>Remaining <span>{"$" + (props.budget.total - props.budget.actual)}</span></p>
                    <p className={difference > 0 ? "over" : "under"}>Currently <span>{CalculateRemainValue()}</span></p>
                </div>
            </div>
        </section>
    )
}

const OverdueTasks = (props) => {
    const unorderedContent = []

    props.distinguishTask.overdueTaskList.forEach((item) => {
        const end = new Date(item.end.month + "/" + item.end.date + "/" + item.end.year)
        const difference = Math.round(Math.abs(end - (new Date())) / (1000 * 3600 * 24))

        unorderedContent.push({
            overdue: difference,
            title: item.title,
            deadline: item.end.month + "-" + item.end.date + "-" + item.end.year,
            employee: "Anna"
        })
    })

    const content = [...unorderedContent].sort((a, b) => a.overdue - b.overdue)

    return (
        <section className="overdue-tasks-section">
            <h1>Overdue tasks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Overdue</th>
                        <th>Task</th>
                        <th>Deadline</th>
                        <th>Employee</th>
                    </tr>
                </thead>
                <tbody>
                    {content.map((item, index) => (
                        <tr key={index}>
                            <td className={item.overdue > 5 ? "late" : ""}>
                                {item.overdue + (item.overdue > 1 ? " days" : " day")}
                            </td>
                            <td>{item.title}</td>
                            <td>{item.deadline}</td>
                            <td>{item.employee}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

const Workload = () => {
    const content = [{
        name: "Anna",
        workload: 78
    },
    {
        name: "Alice",
        workload: 47
    },
    {
        name: "Lucy",
        workload: 96
    }]

    return (
        <section className="workload-section">
            <h1>Workload</h1>
            <div className="chart">
                <div className="name">
                    {content.map((item, index) => (
                        <p key={index} title={item.name}>{item.name}</p>
                    ))}
                </div>
                <div className="bar">
                    {content.map((item, index) => (
                        <div key={index} style={{ "--width": item.workload + "%" }}>
                            <p>{item.workload + "%"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const UpcomingDeadlines = (props) => {
    const unorderedContent = []

    props.distinguishTask.upcomingDeadlineList.forEach((item) => {
        unorderedContent.push({
            employee: item.employee,
            task: item.title,
            deadline: item.end.month + "-" + item.end.date + "-" + item.end.year,
            workload: item.miniTaskList.length !== 0 ? (Math.round(item.miniTaskList.filter((miniTask) => miniTask.isCompleted).length / item.miniTaskList.length * 10000) / 100) : 0
        })
    })

    const content = [...unorderedContent.filter((item) => item.workload !== 100)].sort((a, b) => {
        const date1 = a.deadline.split("-")
        const newDate1 = [date1[1], date1[0], date1[2]]
        const date2 = b.deadline.split("-")
        const newDate2 = [date2[1], date2[0], date2[2]]
        return new Date(...newDate1.reverse()) - new Date(...newDate2.reverse())
    })

    return (
        <section className="upcoming-deadlines-section">
            <h1>Upcoming deadlines</h1>
            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Task</th>
                        <th>Deadline</th>
                        <th>Workload</th>
                    </tr>
                </thead>
                <tbody>
                    {content.map((item, index) => (
                        <tr key={index}>
                            <td>{item.employee}</td>
                            <td>{item.task}</td>
                            <td>{item.deadline}</td>
                            <td>
                                <div style={{ "--width": item.workload + "%" }}></div>
                                <p>{item.workload + "%"}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export const ProjectDashboard = (props) => {
    const distinguishTask = DistinguishTask(props.data.taskList)

    return (
        // Budget
            // Total budget, budget amount use, target amount use
            // Total budget, remaining, currently
        // Overdue tasks
            // Table
            // Column: Overdue, Task, Deadline, Employee
            // days < 5 ? yellow : red
        // Workload
            // Bar chart
        // Upcoming deadline
            // Table
            // Column: Employee, Task, Deadline, Workload
        <div className="project-dashboard">
            <div className="header">
                <h1>{props.data.project.title}</h1>
                <button type="button" onClick={() => props.GoToProjectDetail(props.data.id)}>
                    Project details
                    <span>
                        <ion-icon name="arrow-forward"></ion-icon>
                    </span>
                </button>
            </div>
            <ProjectBudget budget={props.data.budget} />
            <OverdueTasks distinguishTask={distinguishTask} />
            <Workload />
            <UpcomingDeadlines distinguishTask={distinguishTask} />
        </div>
    )
}