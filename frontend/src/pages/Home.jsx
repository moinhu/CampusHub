import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/events?status=approved&upcomingOnly=true");
      setEvents(res.data.events || []);
    } catch {
      toast.error("Failed to load events");
    }
    setLoading(false);
  }

  async function register(eventId) {
    if (!user) return toast.error("Login first");

    try {
      const res = await api.post("/registrations", { eventId });
      toast.success(`Registered: ${res.data.registration.status}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  }

  const filtered = events.filter(ev =>
    filter === "all" ? true : ev.mode === filter
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Upcoming Campus Events</h1>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {["all", "Technical", "Cultural", "Sports", "Workshop", "Fest"].map((m) => (
          <button
            key={m}
            onClick={() => setFilter(m)}
            className={`px-4 py-1 rounded border ${
              filter === m ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(ev => (
            <div key={ev.id} className="border p-4 rounded bg-white shadow">
              <h2 className="text-lg font-semibold">{ev.title}</h2>

              <p className="text-sm text-gray-600">
                {new Date(ev.startTime).toLocaleString()}
              </p>

              <p className="text-sm text-gray-700 mt-1">
                Venue: {ev.Venue?.name}
              </p>

              <p className="text-sm mt-1">
                Mode: <span className="font-medium">{ev.mode}</span>
              </p>

              <button
                onClick={() => register(ev.id)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
