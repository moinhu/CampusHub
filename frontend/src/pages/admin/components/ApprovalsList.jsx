import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";

export default function ApprovalsList() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/admin/events/pending");
      setPending(res.data.pending);
    } catch {
      toast.error("Failed to load approvals");
    }
  }

  async function approve(id) {
    try {
      await api.post(`/events/${id}/approve`);
      toast.success("Approved");
      load();
    } catch {
      toast.error("Approval failed");
    }
  }

  async function reject(id) {
    try {
      await api.post(`/events/${id}/reject`);
      toast.success("Rejected");
      load();
    } catch {
      toast.error("Reject failed");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Event Approvals</h2>

      {!pending.length && <p className="text-gray-500">No pending approvals</p>}

      {pending.map((ev) => (
        <div key={ev.id} className="p-4 border rounded bg-white space-y-2">
          <h3 className="font-bold">{ev.title}</h3>
          <p>{new Date(ev.startTime).toLocaleString()}</p>
          <p>Venue: {ev.Venue?.name}</p>
          <p>Club: {ev.Club?.name}</p>

          <div className="flex gap-2">
            <button
              onClick={() => approve(ev.id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(ev.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
