import "./Dashboard.scss"

const cost = {
    totalBudget: 200,
    budgetUse: 86,
    targetUse: 90
}

export const Dashboard = (props) => {
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
        // Budget
            // Total budget, budget amount use, target amount use
            // Total budget, remaining, currently
        // Task
        // Workload
        // Progress
        <div id="dashboard" className="main-container active">
            <section className="budget-section">
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
            <section className="task-section">
                <h1>Task</h1>
            </section>
            <section className="workload-section">
                <h1>Workload</h1>
            </section>
            <section className="progress-section">
                <h1>Progress</h1>
            </section>
        </div>
    )
}