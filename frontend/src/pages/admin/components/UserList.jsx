import { useEffect, useState } from "react";
import api from "../../../api/api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch {
      alert("Failed to load users");
    }
  }

  async function changeRole(id, role) {
    try {
      await api.post(`/admin/users/${id}/role`, { role });
      load();
    } catch {
      alert("Failed to update role");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      <div className="overflow-auto max-h-96 border rounded">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.fullName}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">{u.role}</td>

                <td className="p-2">
                  <select
                    className="border px-2 py-1 rounded"
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value)}
                  >
                    <option value="student">student</option>
                    <option value="club">club</option>
                    <option value="admin">admin</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
