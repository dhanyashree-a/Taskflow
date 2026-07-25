import "./TaskForm.css";
function TaskForm({
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    addTask,
    editId,
    generateDescription,
    generatePriority,
    smartFill,
    loading
})
{

    return (

        <div className="task-form">

            <input
                type="text"
                placeholder="Enter Task Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

           <button
    type="button"
    className="ai-btn"
    onClick={smartFill}
    disabled={loading}
>
    {loading ? "🤖 Thinking..." : "🚀 Smart Fill"}
</button>

            <button
    type="button"
    className="ai-btn"
    onClick={generatePriority}
>
    🤖 Suggest Priority
</button>

            <button
    type="button"
    className="ai-btn"
    onClick={generateDescription}
>
    ✨ Generate Description
</button>

            <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />

            <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
            >

                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>

            </select>

            <select
    value={priority}
    onChange={(e)=>setPriority(e.target.value)}
>

    <option>High</option>

    <option>Medium</option>

    <option>Low</option>

</select>

<input
    type="date"

    value={dueDate}

    onChange={(e)=>setDueDate(e.target.value)}
/>

            <button onClick={addTask}>
                {editId ? "Update Task" : "Add Task"}
            </button>

        </div>

    );
    

}

export default TaskForm;