const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ FIXED CORS (important for deployment)
app.use(cors({
    origin: [
        "http://localhost:5173", // local frontend (Vite)
        "http://localhost:3000", // CRA
        "https://your-frontend-domain.com" // production frontend
    ],
    credentials: true
}));

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("Mongo Error:", err);
});

// test route
app.get("/", (req, res) => {
    res.send("Task Tracker API Running");
});

// routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});