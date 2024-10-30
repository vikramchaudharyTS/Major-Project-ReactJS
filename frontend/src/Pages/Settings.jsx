import React from "react";
import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-[13%] h-full">
          <Sidebar />
        </div>
        <div className="w-[87%] overflow-scroll">
          <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            {/* Settings Sections */}
            <div className="p-6 rounded-lg shadow-md">
              {/* Account Settings */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                <hr className="mb-4" />
                <div className="flex flex-col gap-4">
                  {/* Username */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Username</h3>
                      <p className="text-gray-600">Your unique username</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Change
                    </button>
                  </div>
                  {/* Email */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">example@example.com</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Change
                    </button>
                  </div>
                  {/* Phone Number */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Phone Number</h3>
                      <p className="text-gray-600">+123 456 7890</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>
                <hr className="mb-4" />
                <div className="flex flex-col gap-4">
                  {/* Account Privacy */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Account Privacy</h3>
                      <p className="text-gray-600">
                        Who can see your account and posts?
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Manage
                    </button>
                  </div>
                  {/* Two-factor Authentication */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        Two-factor Authentication
                      </h3>
                      <p className="text-gray-600">
                        Extra security for your account
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Setup
                    </button>
                  </div>
                  {/* Blocked Accounts */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Blocked Accounts</h3>
                      <p className="text-gray-600">Manage who you've blocked</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">
                  Notification Settings
                </h2>
                <hr className="mb-4" />
                <div className="flex flex-col gap-4">
                  {/* Email Notifications */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Email Notifications</h3>
                      <p className="text-gray-600">Receive updates via email</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Manage
                    </button>
                  </div>
                  {/* Push Notifications */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Push Notifications</h3>
                      <p className="text-gray-600">Control app notifications</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Manage
                    </button>
                  </div>
                  {/* SMS Notifications */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">SMS Notifications</h3>
                      <p className="text-gray-600">Receive SMS alerts</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Appearance</h2>
                <hr className="mb-4" />
                <div className="flex flex-col gap-4">
                  {/* Dark Mode */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Dark Mode</h3>
                      <p className="text-gray-600">Switch to dark mode</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Enable
                    </button>
                  </div>
                  {/* Font Size */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Font Size</h3>
                      <p className="text-gray-600">
                        Adjust text size for better readability
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Security</h2>
                <hr className="mb-4" />
                <div className="flex flex-col gap-4">
                  {/* Password */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Password</h3>
                      <p className="text-gray-600">
                        Change your account password
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Change
                    </button>
                  </div>
                  {/* Login Activity */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Login Activity</h3>
                      <p className="text-gray-600">
                        View where you've logged in
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </div>
                  {/* Authorized Apps */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Authorized Apps</h3>
                      <p className="text-gray-600">
                        Manage apps connected to your account
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                  Delete Account
                </h2>
                <hr className="mb-4" />
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600">
                    Permanently delete your account. This action is
                    irreversible.
                  </p>
                  <button className="text-red-600 hover:underline">
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
