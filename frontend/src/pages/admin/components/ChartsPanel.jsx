import { useEffect, useState } from "react";
import api from "../../../api/api";

import {
  LineChart, Line,
  CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function ChartsPanel() {
  const [roleData, setRoleData] = useState([]);
  const [dailyRegs, setDailyRegs] = useState([]);
  const [categoryEvents, setCategoryEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await api.get("/admin/stats");
    const { roles, registrationsDaily, eventsByCategory } = res.data;

    setRoleData([
      { name: "Student", value: roles.student },
      { name: "Club", value: roles.club },
      { name: "Admin", value: roles.admin }
    ]);

    setDailyRegs(registrationsDaily);
    setCategoryEvents(eventsByCategory);
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-12">

      {/* Pie Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">User Distribution</h3>
        <PieChart width={350} height={300}>
          <Pie
            data={roleData}
            dataKey="value"
            nameKey="name"
            cx={180}
            cy={150}
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {roleData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>

      {/* Line Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Daily Registrations (Past 7 Days)
        </h3>
        <LineChart width={500} height={300} data={dailyRegs}>
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>

      {/* Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Events By Category
        </h3>
        <BarChart width={500} height={300} data={categoryEvents}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>

    </div>
  );
}
