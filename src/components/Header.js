// src/components/Header.js
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import useDarkMode from "./hooks/useDarkMode";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Unknown User");
  const [darkMode, setDarkMode] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Lấy username từ localStorage và cập nhật state
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!token);

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username || "Unknown User");
      } catch {
        setUsername("Unknown User");
      }
    } else {
      setUsername("Unknown User");
    }
  }, [location]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("Unknown User");
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-blue-600 dark:bg-gray-900 text-white p-4 shadow transition">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link
            to="/"
            className="hover:text-blue-200 dark:hover:text-gray-300 transition"
            onClick={closeMenu}
          >
            Internal CRM System
          </Link>
        </h1>

        {/* Hamburger (mobile menu) */}
        <button
          className="sm:hidden flex flex-col justify-center items-center ml-auto"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <span className="block w-7 h-1 bg-white rounded my-[3px]"></span>
          <span className="block w-7 h-1 bg-white rounded my-[3px]"></span>
          <span className="block w-7 h-1 bg-white rounded my-[3px]"></span>
        </button>

        {/* Navigation */}
        <nav
          className={`flex-col sm:flex-row sm:flex gap-3 items-center flex-wrap
            bg-blue-600 dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent
            absolute sm:static top-full left-0 right-0 w-full sm:w-auto transition-all duration-200 z-40
            ${menuOpen ? "flex" : "hidden sm:flex"}`}
        >
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              {/* Avatar button */}
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-full 
                           bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                           border border-gray-200 dark:border-gray-700 shadow-sm 
                           hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  {username?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-semibold">
                  {username}
                </span>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  {/* User info */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                      {username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Project Manager
                      </p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="flex flex-col py-2">
                    <button
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                      onClick={() => navigate("/profile")}
                    >
                      👤 Profile
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                      onClick={() => navigate("/settings")}
                    >
                      ⚙️ Settings
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                      onClick={() => setDarkMode((v) => !v)}
                    >
                      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                    <button
                      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 text-left"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                onClick={() => setDarkMode((v) => !v)}
              >
                {darkMode ? "🌙" : "☀️"}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
