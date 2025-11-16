import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);

  const [data, setData] = useState({
    title: "",
    description: "",
    mode: "",
    startTime: "",
    endTime: "",
    venueId: "",
    poster: ""
  });

  useEffect(() => {
    loadEvent();
    loadVenues();
  }, []);

  async function loadEvent() {
    try {
      const res = await api.get(`/events/${id}`);
      const ev = res.data.event;

      setData({
        title: ev.title,
        description: ev.description,
        mode: ev.mode,
        startTime: ev.startTime.slice(0, 16),
        endTime: ev.endTime.slice(0, 16),
        venueId: ev.venueId,
        poster: ev.poster || null
      });

    } catch (err) {
      alert("Failed to load event details");
    }
    setLoading(false);
  }

  async function loadVenues() {
    try {
      const res = await api.get("/clubs/venues");
      setVenues(res.data.venues);
    } catch {
      alert("Failed to load venues");
    }
  }

  async function handleSubmit() {
    try {
      await api.put(`/events/${id}`, data);
      toast.success("Event updated successfully!");
      navigate("/club/events");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update event");
    }
  }

  function handlePoster(e) {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setData({ ...data, poster: r.result });
    r.readAsDataURL(file);
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Edit Event</h1>

      <input
        className="border p-2 rounded w-full"
        placeholder="Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <textarea
        className="border p-2 rounded w-full"
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <select
        className="border p-2 rounded w-full"
        value={data.mode}
        onChange={(e) => setData({ ...data, mode: e.target.value })}
      >
        <option value="">Select Mode</option>
        <option value="Technical">Technical</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
        <option value="Workshop">Workshop</option>
        <option value="Fest">Fest</option>
      </select>

      <input
        type="datetime-local"
        className="border p-2 w-full rounded"
        value={data.startTime}
        onChange={(e) => setData({ ...data, startTime: e.target.value })}
      />

      <input
        type="datetime-local"
        className="border p-2 w-full rounded"
        value={data.endTime}
        onChange={(e) => setData({ ...data, endTime: e.target.value })}
      />

      <select
        className="border p-2 rounded w-full"
        value={data.venueId}
        onChange={(e) => setData({ ...data, venueId: e.target.value })}
      >
        <option value="">Select Venue</option>
        {venues.map((v) => (
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>

      {/* Poster Preview */}
      {data.poster && (
        <img src={data.poster} alt="poster" className="w-48 rounded shadow" />
      )}

      <input type="file" accept="image/*" onChange={handlePoster} />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
