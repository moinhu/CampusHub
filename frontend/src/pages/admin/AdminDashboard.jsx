import { useState } from "react";
import UserList from "./components/UserList";
import VenueList from "./components/VenueList";
import ApprovalsList from "./components/ApprovalsList";
import AnalyticsPanel from "./components/AnalyticsPanel";
import ChartsPanel from "./components/ChartsPanel";
import EventCalendar from "./components/EventCalendar";

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-3">
        <button className={`px-4 py-2 rounded ${tab === "users" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setTab("users")}>Users</button>

        <button className={`px-4 py-2 rounded ${tab === "venues" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setTab("venues")}>Venues</button>

        <button className={`px-4 py-2 rounded ${tab === "approvals" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setTab("approvals")}>Approvals</button>

        <button className={`px-4 py-2 rounded ${tab === "analytics" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setTab("analytics")}>Analytics</button>

        <button className={`px-4 py-2 rounded ${tab === "charts" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setTab("charts")}>Charts</button>

        <button className={`px-4 py-2 rounded ${tab === "calendar" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setTab("calendar")}>Calendar</button>
      </div>

      <div className="p-4 border rounded bg-white shadow-sm">
        {tab === "users" && <UserList />}
        {tab === "venues" && <VenueList />}
        {tab === "approvals" && <ApprovalsList />}
        {tab === "analytics" && <AnalyticsPanel />}
        {tab === "charts" && <ChartsPanel />}
        {tab === "calendar" && <EventCalendar />}
      </div>
    </div>
  );
}
