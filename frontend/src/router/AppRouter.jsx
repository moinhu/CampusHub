import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

import StudentDashboard from "../pages/student/StudentDashboard";
import CreateEvent from "../pages/club/CreateEvent";
import ClubDashboard from "../pages/club/ClubDashboard";
import ClubEventsPage from "../pages/club/ClubEventsPage";
import QRScannerPage from "../pages/club/QRScanner";
import EditEvent from "../pages/club/EditEvent";

import EventDetails from "../pages/EventDetails";
import AdminDashboard from "../pages/admin/AdminDashboard";

import Navbar from "../components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute roles={["student", "club", "admin"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Club */}
        <Route
          path="/club/events"
          element={
            <ProtectedRoute roles={["club", "admin"]}>
              <ClubEventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/club/events/create"
          element={
            <ProtectedRoute roles={["club", "admin"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/club/events/:id/edit"
          element={
            <ProtectedRoute roles={["club", "admin"]}>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/club/dashboard"
          element={
            <ProtectedRoute roles={["club", "admin"]}>
              <ClubDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/club/scanner"
          element={
            <ProtectedRoute roles={["club", "admin"]}>
              <QRScannerPage />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
