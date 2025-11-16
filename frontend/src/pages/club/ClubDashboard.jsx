import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import EventList from "./components/EventList";
import RegistrationList from "./components/RegistrationList";
import AttendanceList from "./components/AttendanceList";
import AnalyticsPanel from "./components/AnalyticsPanel";
import Loader from "../../components/Loader";
import { AuthContext } from "../../context/AuthContext";

export default function ClubDashboard() {
  const { loading } = useContext(AuthContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tab, setTab] = useState("events");

  // --- FIX #1: loading check must be INSIDE component
  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Club Dashboard</h1>

        <div className="flex items-center gap-2">
          {/* QR Scanner Button */}
          <Link
            to="/club/scanner"
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Open QR Scanner
          </Link>

          {/* Tabs */}
          <button
            className={`px-3 py-1 rounded ${
              tab === "events" ? "bg-blue-600 text-white" : "border"
            }`}
            onClick={() => setTab("events")}
          >
            Events
          </button>

          <button
            className={`px-3 py-1 rounded ${
              tab === "regs" ? "bg-blue-600 text-white" : "border"
            }`}
            onClick={() => setTab("regs")}
          >
            Registrations
          </button>

          <button
            className={`px-3 py-1 rounded ${
              tab === "att" ? "bg-blue-600 text-white" : "border"
            }`}
            onClick={() => setTab("att")}
          >
            Attendance
          </button>

          <button
            className={`px-3 py-1 rounded ${
              tab === "analytics" ? "bg-blue-600 text-white" : "border"
            }`}
            onClick={() => setTab("analytics")}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Event list (left column) */}
        <div className="md:col-span-1">
          <EventList
            onSelect={(ev) => {
              setSelectedEvent(ev);
              setTab("regs");
            }}
          />
        </div>

        {/* Event management panels */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-4 border rounded bg-white">

            {/* Selected event heading */}
            <div className="mb-3">
              <h2 className="text-lg font-semibold">
                {selectedEvent ? selectedEvent.title : "Select an event"}
              </h2>

              {selectedEvent && (
                <div className="text-sm text-gray-500">
                  {new Date(selectedEvent.startTime).toLocaleString()}
                </div>
              )}
            </div>

            {/* Conditional Tabs */}
            {tab === "events" && (
              <p className="text-gray-500">
                Choose an event on the left to view details or manage it.
              </p>
            )}

            {tab === "regs" && (
              <RegistrationList eventId={selectedEvent?.id} />
            )}

            {tab === "att" && (
              <AttendanceList eventId={selectedEvent?.id} />
            )}

            {tab === "analytics" && (
              <AnalyticsPanel eventId={selectedEvent?.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
