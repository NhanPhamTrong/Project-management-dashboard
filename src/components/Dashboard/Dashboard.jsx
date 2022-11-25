import "./Dashboard.scss"

const ProjectBudget = () => {
    const cost = {
        totalBudget: 200,
        budgetUse: 86,
        targetUse: 90
    }

    const highestCost = Math.max(cost.totalBudget, cost.budgetUse, cost.targetUse)
    const highestVerticalValue = (parseInt(highestCost / 30) + 1) * 30
    const difference = Math.floor((cost.budgetUse - cost.targetUse) / cost.targetUse * 10000) / 100

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
                            <div style={{height: CalculateBarHeight(cost.totalBudget) + "px"}}></div>
                            <div style={{height: CalculateBarHeight(cost.budgetUse) + "px"}}></div>
                            <div style={{height: CalculateBarHeight(cost.targetUse) + "px"}}></div>
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
                    <p>Total budget <span>{"$" + cost.totalBudget}</span></p>
                    <p>Remaining <span>{"$" + (cost.totalBudget - cost.budgetUse)}</span></p>
                    <p className={difference > 0 ? "over" : "under"}>Currently <span>{CalculateRemainValue()}</span></p>
                </div>
            </div>
        </section>
    )
}

const OverdueTasks = () => {
    const content = [{
        overdue: 1,
        task: "Update Facebook profile",
        deadline: new Date().getDate(),
        employee: "Anna"
    },
    {
        overdue: 6,
        task: "Set up new database",
        deadline: new Date().getDate(),
        employee: "Loren"
    }]

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
                            <td>{item.task}</td>
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
    },
    {
        name: "Pham Trong Nhan",
        workload: 56
    },
    {
        name: "Anna",
        workload: 28
    },
    {
        name: "Anna",
        workload: 51
    },
    {
        name: "Anna",
        workload: 73
    },
    {
        name: "Anna",
        workload: 64
    },
    {
        name: "Anna",
        workload: 37
    },
    {
        name: "Anna",
        workload: 47
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
                        <div key={index} style={{width: item.workload + "%"}}>
                            <p>{item.workload + "%"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const UpcomingDeadlines = () => {
    const content = [{
        employee: 1,
        task: "Update Facebook profile",
        deadline: new Date().getDate(),
        workload: "Anna"
    },
    {
        employee: 6,
        task: "Set up new database",
        deadline: new Date().getDate(),
        workload: "Loren"
    }]

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
                            <td>{item.workload}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export const Dashboard = () => {
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
        <div id="dashboard" className="main-container active">
            <ProjectBudget />
            <OverdueTasks />
            <Workload/>
            <UpcomingDeadlines />
        </div>
    )
}