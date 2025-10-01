import { useState } from "react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [theme, setTheme] = useState("light");

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        ⚙️ Settings
      </h1>

      {/* Profile Settings */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Display Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Security
        </h2>
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300">
            Two-Factor Authentication
          </span>
          <input
            type="checkbox"
            checked={twoFactor}
            onChange={() => setTwoFactor(!twoFactor)}
            className="w-5 h-5"
          />
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-700 dark:text-gray-300">
            Change Password
          </span>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Update
          </button>
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Preferences
        </h2>
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300">
            Email Notifications
          </span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="w-5 h-5"
          />
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-700 dark:text-gray-300">Theme Mode</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">💻 System</option>
          </select>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
