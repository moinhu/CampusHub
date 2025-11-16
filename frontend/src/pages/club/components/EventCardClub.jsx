import { Link } from "react-router-dom";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EventCardClub({ event }) {
  const navigate = useNavigate();

  async function deleteEvent() {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${event.id}`);
      toast.success("Event deleted");
      navigate(0);
    } catch {
      toast.error("Failed to delete event");
    }
  }

  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{event.title}</h2>

      <p className="text-sm text-gray-600">
        {new Date(event.startTime).toLocaleString()}
      </p>

      <div className="mt-3 flex gap-2">
        <Link
          to={`/club/events/${event.id}/edit`}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
        >
          Edit
        </Link>

        <button
          onClick={deleteEvent}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          Delete
        </button>

        <Link
          to={`/events/${event.id}`}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          View
        </Link>
      </div>
    </div>
  );
}
