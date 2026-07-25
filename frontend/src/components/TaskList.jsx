import "./TaskList.css";
import TaskCard from "./TaskCard";

function TaskList({
    tasks,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    editTask,
    deleteTask
}) {

    const filteredTasks = tasks
        .filter((task) => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                filterStatus === "All" ||
                task.status === filterStatus;

            return matchesSearch && matchesStatus;

        })

        .sort((a, b) => {

            if (sortBy === "Newest")
                return b.id - a.id;

            if (sortBy === "Oldest")
                return a.id - b.id;

            if (sortBy === "A-Z")
                return a.title.localeCompare(b.title);

            if (sortBy === "Z-A")
                return b.title.localeCompare(a.title);

            if (sortBy === "Completed")
                return (b.status === "Completed") - (a.status === "Completed");

            if (sortBy === "Pending")
                return (b.status === "Pending") - (a.status === "Pending");

            return 0;

        });

    return (

        <div className="task-list">

            <div className="task-list-controls">

                <input
                    type="text"
                    placeholder="🔍 Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-box"
                />

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-box"
                >
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Completed">Completed First</option>
                    <option value="Pending">Pending First</option>
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-box"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

            </div>

            <h2>Tasks</h2>

          {tasks.length === 0 ? (

    <div className="empty-state">

        <div className="empty-icon">
            📝
        </div>

        <h2>No Tasks Yet</h2>

        <p>
            Create your first task and start organizing your work.
        </p>

    </div>

) : filteredTasks.length === 0 ? (

    <div className="empty-state">

        <div className="empty-icon">
            🔍
        </div>

        <h2>No Matching Tasks</h2>

        <p>
            Try changing your search or filters.
        </p>

    </div>

) : (

    filteredTasks.map((task) => (

        <TaskCard
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
        />

    ))

)}

        </div>

    );

}

export default TaskList;