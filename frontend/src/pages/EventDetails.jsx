import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import QRModal from "./student/components/QRModal";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
    if (user) loadRegistration();
  }, [user]);

  async function loadEvent() {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data.event);
    } catch (err) {
      toast.error("Failed to load event");
    } finally {
      setLoading(false);
    }
  }

  async function loadRegistration() {
    try {
      const res = await api.get("/registrations/my");
      const match = res.data.registrations?.find(r => r.eventId == id);
      setRegistration(match || null);
    } catch {}
  }

  async function register() {
    if (!user) return navigate("/login");

    try {
      const res = await api.post("/registrations", { eventId: id });
      toast.success("Registered successfully");
      loadRegistration();
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  }

  const showQR = () => {
    if (registration?.qrCode) setQrCode(registration.qrCode);
  };

  const closeQR = () => setQrCode(null);

  if (loading) return <Loader />;
  if (!event) return <p className="p-6">Event not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-sm rounded">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      {event.posterUrl && (
        <img src={event.posterUrl} alt="poster" className="rounded-md w-full" />
      )}

      <div className="space-y-2">
        <p className="text-gray-600">
          <b>Date:</b> {new Date(event.startTime).toLocaleString()}
        </p>

        <p className="text-gray-600">
          <b>Venue:</b> {event.Venue?.name || "TBA"}
        </p>

        <p>
          <b>Mode:</b> <span className="font-medium">{event.mode}</span>
        </p>

        <p className="text-gray-700">{event.description}</p>
      </div>

      {user ? (
        <div className="mt-4">
          {registration ? (
            <>
              <p>
                <b>Your Status:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    registration.status === "confirmed"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {registration.status}
                </span>
              </p>

              {registration.status === "confirmed" && registration.qrCode && (
                <button
                  onClick={showQR}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Show QR Pass
                </button>
              )}
            </>
          ) : (
            <button
              onClick={register}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Login to register.</p>
      )}

      <QRModal qr={qrCode} onClose={closeQR} />
    </div>
  );
}
