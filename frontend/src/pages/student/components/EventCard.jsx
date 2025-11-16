import { Link } from "react-router-dom";

export default function EventCard({ event, registration, onShowQR }) {
  return (
    <div className="border shadow-sm p-4 rounded bg-white">
      <h2 className="text-lg font-semibold">{event.title}</h2>

      <p className="text-sm text-gray-600">
        {new Date(event.startTime).toLocaleString()}
      </p>

      <p className="text-sm text-gray-700 mt-1">
        Venue: {event.Venue?.name || "TBA"}
      </p>

      <p className="text-sm mt-1">
        Mode: <span className="font-medium">{event.mode}</span>
      </p>

      {registration && (
        <div className="mt-2">
          <span
            className={`px-2 py-1 rounded text-xs ${
              registration.status === "confirmed"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {registration.status}
          </span>

          {registration.status === "confirmed" && registration.qrCode && (
            <button
              onClick={() => onShowQR(registration.qrCode)}
              className="ml-3 text-blue-600 underline text-sm"
            >
              View QR Pass
            </button>
          )}
        </div>
      )}
    </div>
  );
}
