import { useState, useEffect } from "react";
import API from "../api";

function TaskForm({ refresh, editTask, setEditTask }) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending"
    });
    useEffect(() => {
        if (editTask) {
            setTask({
                title: editTask.title,
                description: editTask.description,
                status: editTask.status
            });
        }
    }, [editTask]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title.trim()) {
            alert("Task title is required");
            return;
        }

        if (!task.description.trim()) {
            alert("Description is required");
            return;
        }
        try {
            if (editTask) {
                await API.put(
                    `/tasks/${editTask._id}`,
                    task
                );
            }
            else {
                await API.post("/tasks", {
                    ...task,
                    taskDate: new Date().toISOString()
                });
            }

            setTask({
                title: "",
                description: "",
                status: "Pending"
            });
            setEditTask(null);
            refresh();

        }
        catch (err) {
            console.log(err);
            }    }
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow mb-6"
        >
            <input
                className="w-full border p-3 rounded mb-3"
                placeholder="Task title"
                value={task.title}
                onChange={(e) =>
                    setTask({
                        ...task,
                        title: e.target.value
                    })
                }
            />

            <textarea
                className="w-full border p-3 rounded mb-3"
                placeholder="Description"
                value={task.description}
                onChange={(e) =>
                    setTask({
                        ...task,
                        description: e.target.value
                    })
                }
            />

            <select
                className="w-full border p-3 rounded mb-3"
                value={task.status}
                onChange={(e) =>
                    setTask({
                        ...task,
                        status: e.target.value
                    })
                }
            >
                <option value="Pending">
                    Pending
                </option>
                <option value="Done">
                    Done
                </option>
            </select>

            <button
                className="bg-blue-600 text-white px-5 py-2 rounded"
            >
                {
                       editTask ?
                        "Update Task"
                        :
                        "Add Task"
                }
            </button>
        </form>
    )
}
export default TaskForm;