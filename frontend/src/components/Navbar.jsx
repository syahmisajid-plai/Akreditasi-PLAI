import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // STYLE SAMA SEPERTI SIDEBAR
  const base = "rounded-md px-3 py-2 text-sm transition";
  const active = "bg-gray-900 text-white";
  const inactive = "text-gray-300 hover:bg-white/5 hover:text-white";

  return (
    <nav className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* MOBILE BUTTON */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* LOGO + MENU */}
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex items-center text-white font-bold">
              SPMI Digital
            </div>

            {/* MENU */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${base} ${isActive ? active : inactive}`
                  }
                >
                  🏠 Main Menu
                </NavLink>

                <NavLink
                  to="/akreditasi"
                  className={({ isActive }) =>
                    `${base} ${isActive ? active : inactive}`
                  }
                >
                  📊 Akreditasi
                </NavLink>

                <NavLink
                  to="/standar-mutu"
                  className={({ isActive }) =>
                    `${base} ${isActive ? active : inactive}`
                  }
                >
                  ✅ Standar Mutu
                </NavLink>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6">
            {/* NOTIFICATION */}
            <button className="rounded-full p-1 text-gray-400 hover:text-white">
              🔔
            </button>

            {/* PROFILE */}
            <div className="relative ml-3">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex rounded-full"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://i.pravatar.cc/100"
                  alt="profile"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                  <a className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Profile
                  </a>
                  <a className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Settings
                  </a>
                  <a className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="sm:hidden px-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 ${
                isActive ? "bg-gray-900 text-white" : "text-gray-300"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink to="/akreditasi" className="block px-3 py-2 text-gray-300">
            Akreditasi
          </NavLink>

          <NavLink to="/standar-mutu" className="block px-3 py-2 text-gray-300">
            Standar Mutu
          </NavLink>
        </div>
      )}
    </nav>
  );
}
