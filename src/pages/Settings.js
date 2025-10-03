import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const USERS_API = "https://todo-backend-6c6i.onrender.com/users";

const Settings = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  // const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  // state đổi mật khẩu
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (!displayName || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const payload = {
      displayName,
      email,
      emailNotifications,
      twoFactor,
      // theme,
    };

    try {
      console.log("Saving settings:", payload);
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Settings saved successfully");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`${USERS_API}/${userId}`);
      const user = res.data;

      if (user.password !== oldPassword) {
        toast.error("Old password is incorrect");
        return;
      }

      await axios.put(`${USERS_API}/${userId}`, {
        ...user,
        password: newPassword,
      });

      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        ⚙️ Settings
      </h1>

      {/* Profile */}
      <section className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Profile
        </h2>
        <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Security */}
      <section className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Security
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">
            Two-Factor Authentication
          </span>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition 
              ${twoFactor ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition 
                ${twoFactor ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>

        {/* Change Password */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </div>
      </section>

      {/* Preferences */}
      <section className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Preferences
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">
            Email Notifications
          </span>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition 
              ${emailNotifications ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition 
                ${emailNotifications ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>
        {/* <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
            Theme Mode
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">💻 System</option>
          </select>
        </div> */}
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
