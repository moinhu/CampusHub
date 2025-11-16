import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../../api/api";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

export default function QRScannerPage() {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleScan(result) {
    if (!result) return;

    try {
      const data = JSON.parse(result); // eventId, userId

      setLoading(true);

      const res = await api.post("/attendance/mark", data);

      setScanResult(res.data.message || "Attendance marked");
      toast.success("Attendance marked");
    } catch (err) {
      const msg = err.response?.data?.error || "Invalid QR";
      setScanResult(msg);
      toast.error(msg);
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">QR Scanner</h1>

      {loading && <Loader />}

      <div className="max-w-sm mx-auto">
        <Scanner
          onScan={(res) => handleScan(res[0].rawValue)}
          onError={(err) => console.error(err)}
        />
      </div>

      {scanResult && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded font-semibold">
          {scanResult}
        </div>
      )}
    </div>
  );
}
