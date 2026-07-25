import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
import Dashboard from "./components/Dashboard";
import ThemeSelector from "./components/ThemeSelector";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import TaskChart from "./components/TaskChart";


function App() {
    const navigate = useNavigate();
    const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 18) {
    greeting = "Good Afternoon";
}
  const userName = localStorage.getItem("name");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [theme, setTheme] = useState("purple");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  

  const fetchTasks = async () => {
    try {
        const response = await axios.get("http://localhost:8080/tasks");
        setTasks(response.data);
    } catch (error) {
        console.error(error);
    }
};
useEffect(() => {
    fetchTasks();
}, []);

  const addTask = async () => {

    const task = {
    title,
    description,
    status,
    priority,
    dueDate
};

    try {

        let response;

        if (editId) {

            response = await axios.put(
                `http://localhost:8080/tasks/${editId}`,
                task
            );

        } else {

            response = await axios.post(
                "http://localhost:8080/tasks",
                task
            );

        }

        console.log(response.data);

        await fetchTasks();

        setTitle("");
        setDescription("");
        setStatus("Pending");
        setEditId(null);
        setPriority("Medium");
        setDueDate("");

        
        if (editId) {
    toast.success("Task Updated Successfully!");
} else {
    toast.success("Task Added Successfully!");
}

    } catch (error) {

        console.error(error);
        console.log(error.response);
        console.log(error.response?.data);

        toast.error("Failed to save task!");
    }

};
const generatePriority = async () => {

    if (!title.trim()) {

        toast.warning("Enter a task title first!");

        return;
    }

    try {

        const response = await axios.post(
            "http://localhost:8080/api/ai/priority",
            {
                title
            }
        );

        setPriority(response.data.priority);

        toast.success("🔥 AI Priority Suggested!");

    } catch (error) {

        console.error(error);

        toast.error("AI service unavailable");

    }
};
const deleteTask = async (id, title) => {

    const result = await Swal.fire({
    title: "Delete Task?",
    html: `<b>${title}</b> will be permanently deleted.`,
    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "🗑 Delete",
    cancelButtonText: "Keep",

    confirmButtonColor: "#EF4444",
    cancelButtonColor: "#6B7280",

    background: "#18181B",
    color: "#fff",

    borderRadius: "20px",

    reverseButtons: true,

    customClass: {
        popup: "swal-popup"
    }
});

    if (!result.isConfirmed) return;

    try {

        await axios.delete(`http://localhost:8080/tasks/${id}`);

        await fetchTasks();

        toast.success("Task Deleted Successfully!");

    } catch (error) {

        console.error(error);

        toast.error("Failed to delete task");

    }

};




 const editTask = (task) => {

    setEditId(task.id);

    setTitle(task.title);

    setDescription(task.description);

    setStatus(task.status);

    setPriority(task.priority || "Medium");

    setDueDate(task.dueDate || "");

};


const generateDescription = async () => {
    if (!title.trim()) {
        toast.error("Please enter a task title first!");
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:8080/api/ai/description",
            {
                title: title
            }
        );

        setDescription(response.data.description);

        toast.success("✨ AI Description Generated!");

    } catch (error) {

        console.error(error);

        toast.error("Failed to generate AI description");
    }
};
const smartFill = async () => {

    if (!title.trim()) {
        alert("Enter task title first!");
        return;
    }

    setLoading(true);

    try {

        const response = await axios.post(
            "http://localhost:8080/api/ai/smartfill",
            {
                title
            }
        );

        setDescription(response.data.description);
        setPriority(response.data.priority);

        // Only set due date if AI returns one
        if (response.data.dueDate) {
            setDueDate(response.data.dueDate);
        }

    } catch (error) {

        console.error(error);

        alert("Smart Fill failed!");

    } finally {

        setLoading(false);

    }

};

const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("name");

    delete axios.defaults.headers.common["Authorization"];

    toast.success("Logged out successfully!");

    setTimeout(() => {
        navigate("/login");
    }, 1000);

};

const deleteAccount = async () => {

    const result = await Swal.fire({
        title: "Delete Account?",
        html: `
            <b>This action cannot be undone.</b><br><br>
            All your tasks will be permanently deleted.
        `,
        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "🗑 Delete Account",
        cancelButtonText: "Cancel",

        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",

        background: "#18181B",
        color: "#fff"
    });

    if (!result.isConfirmed) return;

    try {

        await axios.delete("http://localhost:8080/api/user/delete");

        localStorage.removeItem("token");
        localStorage.removeItem("name");

        delete axios.defaults.headers.common["Authorization"];

        await Swal.fire({
            icon: "success",
            title: "Account Deleted",
            text: "Your account has been deleted successfully.",
            timer: 1800,
            showConfirmButton: false,
            background: "#18181B",
            color: "#fff"
        });

        navigate("/login");

    } catch (error) {

        console.error(error);

        toast.error("Failed to delete account.");
    }
};
  return (
    <div className={`container ${theme}`}>
   <div className="header">

    <div className="header-left">

        <span className="logo">
            📋
        </span>

        <div>

            <h1 className="title">
                TaskFlow
            </h1>

            <p className="subtitle">

                {greeting}, {userName} 👋

            </p>

            <p className="subtitle2">

                Stay organized and accomplish your goals today.

            </p>

        </div>

    </div>

    <div className="header-right">

        <ThemeSelector
            theme={theme}
            setTheme={setTheme}
        />

        <button
            className="logout-btn"
            onClick={logout}
        >
            🚪 Logout
        </button>

    </div>

</div>
     
     <Dashboard tasks={tasks} />

<div className="analytics-section">

    <div className="analytics-header">

        <h2>📈 Task Analytics</h2>

        <p>
            Track your productivity and task progress
        </p>

    </div>

    <div className="chart-wrapper">

        <TaskChart tasks={tasks} />

    </div>

</div>


<div className="form-section">

    <div className="form-header">

        <h2>📝 Create New Task</h2>

        <p>
            Organize your work efficiently with AI assistance.
        </p>

    </div>

    <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        addTask={addTask}
        editId={editId}
        generateDescription={generateDescription}
        generatePriority={generatePriority}
        smartFill={smartFill}
         loading={loading}
    />

</div>

<TaskList
    tasks={tasks}
    search={search}
    setSearch={setSearch}
    filterStatus={filterStatus}
    setFilterStatus={setFilterStatus}
    sortBy={sortBy}
    setSortBy={setSortBy}
    editTask={editTask}
    deleteTask={deleteTask}
/>

<div className="account-section">

    <h2>⚙️ Account Settings</h2>

    <p>
        Delete your account permanently. This action cannot be undone.
    </p>

    <button
        className="delete-account-btn"
        onClick={deleteAccount}
    >
        🗑 Delete Account
    </button>

</div>

<ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="dark"
/>



    </div>
  );
}

export default App;