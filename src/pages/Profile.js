// src/pages/Profile.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USERS_API = "https://todo-backend-6c6i.onrender.com/users";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(USERS_API);
        const foundUser = res.data.find((u) => u.id === userId);
        if (foundUser) setUser(foundUser);
      } catch (err) {
        console.error("❌ Lỗi khi fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Không tìm thấy thông tin người dùng
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:300%] animate-gradient p-6">
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-3xl animate-fadeIn">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
              alt="avatar"
              className="w-28 h-28 rounded-full ring-4 ring-indigo-500 ring-offset-2 shadow-xl transition-transform group-hover:scale-110"
            />
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-ping"></span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            {user.username}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">ID: {user.id}</p>
        </div>

        {/* Role */}
        <div className="mt-6 flex justify-center">
          <span
            className={`px-5 py-2 text-sm font-bold rounded-full shadow-inner tracking-wider transition-transform hover:scale-105 ${
              user.role === "admin"
                ? "bg-red-200 text-red-800"
                : user.role === "manager"
                  ? "bg-blue-200 text-blue-800"
                  : user.role === "viewer"
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200 text-gray-800"
            }`}
          >
            {user.role.toUpperCase()}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-10 flex gap-4 justify-center">
          <button
            onClick={() => alert("🚧 Chức năng chỉnh sửa sẽ cập nhật sau")}
            className="px-6 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-xl hover:bg-gradient-to-l hover:scale-105 transition-all"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-2xl bg-red-500 text-white font-semibold shadow-xl hover:bg-red-600 hover:scale-105 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
