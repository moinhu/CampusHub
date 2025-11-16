import { useEffect, useState, useContext } from "react";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import QRModal from "./components/QRModal";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function loadRegistrations() {
    try {
      const res = await api.get("/student/my-registrations");
      setRegistrations(res.data.events || []);
    } catch (err) {
      console.error(err);
      toast.error("Could not load your registered events");
    }
    setLoading(false);
  }

  const openQR = (qr) => setQrCode(qr);
  const closeQR = () => setQrCode(null);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Registered Events</h1>

      {registrations.length === 0 ? (
        <p className="text-gray-600">You have not registered for any events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {registrations.map((reg) => (
            <div
              key={reg.event.id}
              className="border rounded p-4 bg-white shadow-sm space-y-2"
            >
              <h2 className="text-xl font-semibold">{reg.event.title}</h2>

              <p className="text-sm text-gray-600">
                {new Date(reg.event.startTime).toLocaleString()}
              </p>

              <p className="text-sm text-gray-600">
                <b>Venue:</b> {reg.event.Venue?.name || "TBA"}
              </p>

              <p className="text-sm">
                <b>Status: </b>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    reg.status === "confirmed"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {reg.status}
                </span>
              </p>

              <div className="flex gap-2 mt-3">
                <a
                  href={`/events/${reg.event.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  View Event
                </a>

                {reg.status === "confirmed" && reg.qrCode && (
                  <button
                    onClick={() => openQR(reg.qrCode)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Show QR Pass
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Modal */}
      <QRModal qr={qrCode} onClose={closeQR} />
    </div>
  );
}
