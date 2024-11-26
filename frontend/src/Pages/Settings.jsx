import React, { useState } from 'react';

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="w-[86vw] pt-16">
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="p-6 rounded-lg shadow-md">
          {/* Scrollable Content Section */}
          <div className="h-[75vh] overflow-y-auto">
            <Section title="Account Settings">
              <SettingItem title="Username" description="Your unique username" />
              <SettingItem title="Email" description="example@example.com" />
            </Section>

            <Section title="Privacy Settings">
              <SettingItem title="Account Privacy" description="Who can see your account and posts?" />
              <SettingItem title="Blocked Accounts" description="Manage who you've blocked" />
            </Section>

            <Section title="Security">
              <SettingItem title="Password" description="Change your account password" />
            </Section>

            <Section title="Delete Account" titleColor="text-red-600">
              <p className="text-zinc-600">
                Permanently delete your account. This action is irreversible.
              </p>
              <button className="text-red-600 hover:underline">
                Delete My Account
              </button>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingItem({ title, description }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-zinc-600">{description}</p>
      </div>
      <button className="text-blue-600 hover:underline">Change</button>
    </div>
  );
}

function Section({ title, children, titleColor = "text-lg font-semibold" }) {
  return (
    <div className="mb-8">
      <h2 className={`${titleColor} mb-4`}>{title}</h2>
      <hr className="mb-4" />
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default Settings;
