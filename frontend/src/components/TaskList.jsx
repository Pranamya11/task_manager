import { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "./TaskForm";


function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    }
    useEffect(() => {
        fetchTasks();
    }, []);
    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                    Task Tracker
                </h1>
                <TaskForm
                    refresh={fetchTasks}
                    editTask={editTask}
                    setEditTask={setEditTask}
                />
                <div className="grid gap-5">
                    {
                        tasks.map(task => (
                                   <div
                                key={task._id}
                                className="bg-white p-5 rounded-xl shadow"
                            >
                                <h2 className="text-xl font-bold">
                                    {task.title}
                                </h2>
                                <p className="text-gray-600">
                                    {task.description}
                                </p>
                                <p className="mt-2">
                                    Status : {task.status}
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => setEditTask(task)}
                                       className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                       Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}


export default TaskList;