import { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "./TaskForm";


function TaskList(){

const [tasks,setTasks]=useState([]);
const [editTask,setEditTask]=useState(null);


const fetchTasks = async()=>{

try{

const res = await API.get("/tasks");

setTasks([...res.data]);

}catch(err){

console.log(err);

}

};


useEffect(()=>{

fetchTasks();

},[]);



const deleteTask=async(id)=>{

await API.delete(`/tasks/${id}`);

fetchTasks();

};



const handleUpdate=()=>{

fetchTasks();

setEditTask(null);

};



return(

<div className="min-h-screen bg-gray-100 p-8">

<div className="max-w-4xl mx-auto">


<h1 className="text-4xl font-bold text-center text-blue-600 mb-8">

Task Tracker

</h1>


<TaskForm

refresh={handleUpdate}

editTask={editTask}

setEditTask={setEditTask}

/>



<div className="grid gap-5">


{

tasks.map(task=>(


<div

key={task._id}

className="bg-white p-5 rounded-xl shadow"

>


<h2 className="text-xl font-bold">

{task.title}

</h2>


<p>

{task.description}

</p>


<p>

Status : {task.status}

</p>



<button

onClick={()=>setEditTask(task)}

className="bg-green-500 text-white px-4 py-2 rounded mt-3"

>

Edit

</button>


<button

onClick={()=>deleteTask(task._id)}

className="bg-red-500 text-white px-4 py-2 rounded mt-3 ml-3"

>

Delete

</button>


</div>


))

}


</div>



</div>

</div>


)

}


export default TaskList;