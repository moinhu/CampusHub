import { useEffect, useState } from "react";
import api from "../../api/api";
import EventCardClub from "./components/EventCardClub";

export default function ClubEventsPage() {
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
    } catch (err) {
      console.error(err);
      alert("Failed to load your club events");
    }
    setLoading(false);
  }

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Club Events</h1>

        <a
          href="/club/events/create"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          + Create Event
        </a>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <EventCardClub key={ev.id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
}
