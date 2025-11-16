import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import LoadingButton from "../components/LoadingButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup() {
    if (!form.fullName || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      // create account
      await api.post("/auth/signup", form);

      // auto login
      await login({ email: form.email, password: form.password });

      toast.success("Account created");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-6 mt-10">
      <h1 className="text-2xl font-bold text-center">Create Account</h1>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="border p-2 rounded w-full"
        value={form.fullName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 rounded w-full"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 rounded w-full"
        value={form.password}
        onChange={handleChange}
      />

      <select
        name="role"
        className="border p-2 rounded w-full"
        value={form.role}
        onChange={handleChange}
      >
        <option value="student">Student</option>
        <option value="club">Club</option>
        <option value="admin">Admin</option>
      </select>

      <LoadingButton
        loading={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSignup}
      >
        Signup
      </LoadingButton>
    </div>
  );
}
