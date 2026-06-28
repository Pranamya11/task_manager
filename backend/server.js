const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});


app.get("/",(req,res)=>{
    res.send("Task Tracker API Running");
});


const taskRoutes=require("./routes/taskRoutes");

app.use("/api/tasks",taskRoutes);



const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});