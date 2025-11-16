import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingButton from "../components/LoadingButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    if (!form.email || !form.password) {
      return toast.error("Enter both email and password");
    }

    setLoading(true);
    try {
      await login(form);
      toast.success("Login successful");
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-6 mt-10">
      <h1 className="text-2xl font-bold text-center">Login</h1>

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

      <LoadingButton
        loading={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </div>
  );
}
