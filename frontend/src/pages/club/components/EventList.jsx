import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";

export default function EventList({ onSelect }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/club-dashboard/events");
      setEvents(res.data.events || []);
    } catch {
      toast.error("Failed to load events");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Club Events</h2>
        <button onClick={load} className="text-sm px-3 py-1 border rounded">
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(ev.startTime).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="capitalize">{ev.status}</span>
                </div>
              </div>
              <button
                onClick={() => onSelect(ev)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
