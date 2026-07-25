import "./Dashboard.css";

function Dashboard({ tasks }) {

    const totalTasks = tasks.length;

    const completed = tasks.filter(
        task => task.status === "Completed"
    ).length;

    const pending = tasks.filter(
        task => task.status === "Pending"
    ).length;

    const inProgress = tasks.filter(
        task => task.status === "In Progress"
    ).length;

    return (

        <div className="dashboard">

            <div className="dashboard-card">
                <div className="card-icon">📋</div>
                <h3>Total Tasks</h3>
                <h2>{totalTasks}</h2>
            </div>

            <div className="dashboard-card">
                <div className="card-icon completed">✅</div>
                <h3>Completed</h3>
                <h2>{completed}</h2>
            </div>

            <div className="dashboard-card">
                <div className="card-icon pending">⏳</div>
                <h3>Pending</h3>
                <h2>{pending}</h2>
            </div>

            <div className="dashboard-card">
                <div className="card-icon progress">🚀</div>
                <h3>In Progress</h3>
                <h2>{inProgress}</h2>
            </div>

        </div>

    );

}

export default Dashboard;