import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";

export default function AnalyticsPanel({ eventId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventId) load();
    else setStats(null);
  }, [eventId]);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get(`/club-dashboard/events/${eventId}/analytics`);
      setStats(res.data.stats);
    } catch (err) {
      toast.error("Failed to load analytics");
    }
    setLoading(false);
  }

  if (!eventId)
    return <p className="text-gray-500">Select an event to see analytics</p>;

  return (
    <div>
      <h3 className="font-semibold mb-3">Event Analytics</h3>

      {loading ? (
        <p>Loading...</p>
      ) : stats ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-600">Confirmed</div>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
          </div>

          <div className="p-3 border rounded">
            <div className="text-sm text-gray-600">Waitlisted</div>
            <div className="text-2xl font-bold">{stats.waitlisted}</div>
          </div>

          <div className="p-3 border rounded">
            <div className="text-sm text-gray-600">Cancelled</div>
            <div className="text-2xl font-bold">{stats.cancelled}</div>
          </div>

          <div className="p-3 border rounded">
            <div className="text-sm text-gray-600">Attended</div>
            <div className="text-2xl font-bold">{stats.attended}</div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No analytics available</p>
      )}
    </div>
  );
}
