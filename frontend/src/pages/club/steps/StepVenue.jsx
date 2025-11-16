import { useEffect, useState } from "react";
import api from "../../../api/api";

export default function StepVenue({ data, setData, next, back }) {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadVenues();
  }, []);

  async function loadVenues() {
    try {
      const res = await api.get("/clubs/venues");
      setVenues(res.data.venues);
    } catch {
      alert("Failed to load venues");
    }
  }

  async function checkConflict() {
    try {
      const res = await api.post("/events/check-conflict", {
        venueId: data.venueId,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      if (res.data.conflict) {
        setError("Venue is already booked in this time range");
        return;
      }
      next();
    } catch {
      alert("Conflict check failed");
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Venue & Timing</h2>

      <input
        type="datetime-local"
        value={data.startTime}
        onChange={(e) => setData({ ...data, startTime: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <input
        type="datetime-local"
        value={data.endTime}
        onChange={(e) => setData({ ...data, endTime: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <select
        value={data.venueId}
        onChange={(e) => setData({ ...data, venueId: e.target.value })}
        className="border p-2 w-full rounded"
      >
        <option value="">Select Venue</option>
        {venues.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name} ({v.capacity} seats)
          </option>
        ))}
      </select>

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button onClick={back} className="px-4 py-2 bg-gray-400 text-white rounded">
          Back
        </button>

        <button
          onClick={checkConflict}
          disabled={!data.startTime || !data.endTime || !data.venueId}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
