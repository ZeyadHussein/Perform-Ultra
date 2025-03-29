const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body

// Import Routes
const employeeRoute = require("./Routes/employeeRoutes");
const userRoute = require("./Routes/userRoutes");
const feedbackRoute = require("./Routes/feedbackRoutes");
const departmentRoute = require("./Routes/departmentRoutes");

// Register Routes
app.use("/api", employeeRoute); // ✅ Prefix all routes with "/api"
app.use("/api", userRoute); // ✅ Prefix all routes with "/api"
app.use("/api", feedbackRoute); // ✅ Prefix all routes with "/api"
app.use("/api", departmentRoute); // ✅ Prefix all routes with "/api"

// Root Route
app.get("/", (req, res) => {
  res.send("✅ API is running! Use /api/{table} to access data.");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
