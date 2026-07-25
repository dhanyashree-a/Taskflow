import "./TaskCard.css";

function TaskCard({ task, editTask, deleteTask }) {
    const today = new Date();

const due = task.dueDate ? new Date(task.dueDate) : null;

let daysLeft = null;

if (due) {

    today.setHours(0,0,0,0);

    due.setHours(0,0,0,0);

    daysLeft = Math.ceil(
        (due - today) / (1000 * 60 * 60 * 24)
    );
}

    return (

        <div className="task-card">

            <h3 className="task-title">
                {task.title}
            </h3>

            <p className="task-description">
              {task.description}
            </p>

<div className={`status-badge ${task.status.replace(" ", "-")}`}>
    {task.status === "Completed" && "🟢 Completed"}

    {task.status === "Pending" && "🟡 Pending"}

    {task.status === "In Progress" && "🔵 In Progress"}
</div>
<p
  className={`priority-badge ${task.priority}`}
>
  {task.priority === "High" && "🔴 High"}

  {task.priority === "Medium" && "🟡 Medium"}

  {task.priority === "Low" && "🟢 Low"}
</p>

<p className="task-date">

    {task.status === "Completed" ? (

        <>✅ Finished</>

    ) : daysLeft < 0 ? (

        <>🔴 Overdue by {Math.abs(daysLeft)} day{Math.abs(daysLeft) !== 1 ? "s" : ""}</>

    ) : daysLeft === 0 ? (

        <>🟠 Due Today</>

    ) : (

        <>⏳ {daysLeft} day{daysLeft !== 1 ? "s" : ""} left</>

    )}

</p>
            

            <div className="task-buttons">

                <button
                onClick={() => editTask(task)}
                 className="edit-btn"
            >
               Edit
            </button>

           <button
    onClick={() => deleteTask(task.id, task.title)}
    
    className="delete-btn"
>
    Delete
</button>

         </div>

        </div>

    );

}

export default TaskCard;