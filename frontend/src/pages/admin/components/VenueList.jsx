import { useEffect, useState } from "react";
import api from "../../../api/api";

export default function VenueList() {
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState({ name: "", capacity: "", location: "" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/admin/venues");
      setVenues(res.data.venues);
    } catch {
      alert("Failed to load venues");
    }
  }

  async function addVenue() {
    if (!form.name || !form.capacity) {
      return alert("Name & capacity required");
    }

    try {
      await api.post("/admin/venues", form);
      setForm({ name: "", capacity: "", location: "" });
      load();
    } catch {
      alert("Failed to add venue");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Venues</h2>

      <div className="space-y-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Venue Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <button
          onClick={addVenue}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Venue
        </button>
      </div>

      <div className="space-y-2">
        {venues.map((v) => (
          <div key={v.id} className="p-3 border rounded bg-white">
            <div className="font-medium">{v.name}</div>
            <div className="text-sm text-gray-600">
              Capacity: {v.capacity}
            </div>
            <div className="text-sm text-gray-500">
              Location: {v.location || "N/A"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
