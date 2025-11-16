import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";
import { downloadCSV } from "../../../utils/csv";

export default function RegistrationList({ eventId }) {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventId) load();
    else setRegs([]);
  }, [eventId]);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get(`/club-dashboard/events/${eventId}/registrations`);
      setRegs(res.data.registrations || []);
    } catch {
      toast.error("Failed to load registrations");
    }
    setLoading(false);
  }

  function exportCSV() {
    const rows = regs.map((r) => ({
      id: r.id,
      userId: r.userId,
      fullName: r.User?.fullName || "",
      email: r.User?.email || "",
      status: r.status,
      createdAt: r.createdAt,
    }));
    downloadCSV(`registrations_event_${eventId}.csv`, rows);
  }

  if (!eventId)
    return <p className="text-gray-500">Select an event to see registrations</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Registrations</h3>
        <div className="flex gap-2">
          <button onClick={load} className="px-3 py-1 border rounded text-sm">Refresh</button>
          <button onClick={exportCSV} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Export CSV</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : regs.length === 0 ? (
        <p className="text-gray-500">No registrations yet.</p>
      ) : (
        <div className="overflow-auto max-h-80 border rounded">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="p-2 text-sm">#</th>
                <th className="p-2 text-sm">Name</th>
                <th className="p-2 text-sm">Email</th>
                <th className="p-2 text-sm">Status</th>
                <th className="p-2 text-sm">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {regs.map((r, idx) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2 text-sm">{idx + 1}</td>
                  <td className="p-2 text-sm">{r.User?.fullName || "—"}</td>
                  <td className="p-2 text-sm">{r.User?.email || "—"}</td>
                  <td className="p-2 text-sm capitalize">{r.status}</td>
                  <td className="p-2 text-sm">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
