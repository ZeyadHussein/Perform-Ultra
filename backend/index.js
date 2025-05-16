const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const employeeRoute = require("./Routes/employeeRoutes");
const userRoute = require("./Routes/userRoutes");
const feedbackRoute = require("./Routes/feedbackRoutes");
const departmentRoute = require("./Routes/departmentRoutes");
const taskRoute = require("./Routes/taskRoutes");
const taskAssignmentRoute = require("./Routes/taskAssignmentRoutes");
const teamRoute = require("./Routes/teamRoutes");
const performanceRoutes = require('./Routes/performanceRoutes');
const calendarRoutes = require("./Routes/calendarRoutes"); 
const managerRoutes = require("./Routes/managerRoutes"); 
const attendanceRoutes = require("./Routes/attendanceRoutes"); // Ensure this is the correct path

// Register Routes
app.use("/api", employeeRoute);
app.use("/api", userRoute);
app.use("/api", feedbackRoute);
app.use("/api", departmentRoute);
app.use("/api", taskRoute);
app.use("/api", taskAssignmentRoute);
app.use("/api", teamRoute);
app.use('/api/perfor', performanceRoutes);
app.use("/api", calendarRoutes);
app.use("/api", managerRoutes); 
app.use("/api", attendanceRoutes); // Ensure this is the correct path

app.get("/", (req, res) => {
  res.send("✅ API is running! Use /api/{table} to access data.");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
