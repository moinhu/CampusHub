import { useEffect, useState } from "react";
import api from "../../../api/api";
import toast from "react-hot-toast";

export default function AnalyticsPanel() {
  const [stats, setStats] = useState(null);
  const [heatmap, setHeatmap] = useState(null);

  useEffect(() => {
    loadStats();
    loadHeat();
  }, []);

  async function loadStats() {
    try {
      const res = await api.get("/admin/analytics/stats");
      setStats(res.data.stats);
    } catch {
      toast.error("Failed loading analytics");
    }
  }

  async function loadHeat() {
    try {
      const res = await api.get("/admin/analytics/heatmap");
      setHeatmap(res.data.heatmap);
    } catch {
      toast.error("Failed loading heatmap");
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-3">Campus Analytics</h2>

      {stats && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500 capitalize">{k}</div>
              <div className="text-2xl font-bold">{v}</div>
            </div>
          ))}
        </div>
      )}

      {heatmap && (
        <div>
          <h3 className="font-semibold mb-2">Daily Heatmap</h3>
          {Object.entries(heatmap).map(([d, c]) => (
            <div key={d} className="flex justify-between border p-2 rounded">
              <span>{d}</span>
              <span className="font-bold">{c}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
