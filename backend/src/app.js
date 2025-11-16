const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const clubRoutes = require("./routes/club.routes");
const registrationRoutes = require("./routes/registration.routes");
const attendanceRoutes = require("./routes/attendance.routes"); // only ONCE
const studentRoutes = require("./routes/student.routes");
const clubDashboardRoutes = require("./routes/clubDashboard.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// -------------------- MIDDLEWARES --------------------
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/club-dashboard", clubDashboardRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
