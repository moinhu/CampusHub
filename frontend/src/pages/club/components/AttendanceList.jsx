import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";

export default function AttendanceList({ eventId }) {
  const [att, setAtt] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventId) load();
    else setAtt([]);
  }, [eventId]);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get(`/club-dashboard/events/${eventId}/attendance`);
      setAtt(res.data.attendance || []);
    } catch {
      toast.error("Failed to load attendance");
    }
    setLoading(false);
  }

  if (!eventId)
    return <p className="text-gray-500">Select an event to see attendance</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Attendance</h3>
        <button onClick={load} className="px-3 py-1 border rounded text-sm">
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : att.length === 0 ? (
        <p className="text-gray-500">No attendance recorded yet.</p>
      ) : (
        <div className="space-y-2">
          {att.map((a) => (
            <div
              key={a.id}
              className="p-2 border rounded flex justify-between"
            >
              <div>
                <div className="font-medium">
                  {a.User?.fullName || `User ${a.userId}`}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
