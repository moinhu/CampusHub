import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    toast.success("Logged out");
  }

  return (
    <nav className="p-4 shadow bg-white flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="font-bold text-lg">
        CampusHub
      </Link>

      <div className="flex gap-4 items-center">

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link to="/admin/dashboard" className="text-purple-600">
            Admin
          </Link>
        )}

        {/* CLUB */}
        {user?.role === "club" && (
          <>
            <Link to="/club/dashboard" className="text-blue-600">
              Club Dashboard
            </Link>

            <Link to="/club/events" className="text-blue-600">
              My Events
            </Link>
          </>
        )}

        {/* STUDENT */}
        {user?.role === "student" && (
          <Link to="/student/dashboard" className="text-green-600">
            Dashboard
          </Link>
        )}

        {/* AUTH */}
        {user ? (
          <>
            <span>{user.fullName}</span>

            <button
              onClick={handleLogout}
              className="text-red-600 border px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600">
              Login
            </Link>

            <Link to="/signup" className="text-green-600">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
