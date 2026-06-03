import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const base =
    "flex items-center px-4 py-2 text-gray-200 rounded-lg transition";
  const active = "bg-gray-700 text-white";
  const inactive = "hover:bg-gray-700";

  // =========================
  // MENU CONFIG
  // =========================
  const menus = {
    main: [],

    akreditasi: [
      {
        to: "/akreditasi",
        label: "🏠 Status Akreditasi",
      },
      {
        to: "/akreditasi/progress-terakreditasi",
        label: "📊 Progress Terakreditasi",
      },
      { to: "/akreditasi/progress-unggul", label: "🏆 Progress Unggul" },
    ],

    standar: [
      { to: "/standar-mutu", label: "📋 Overview" },

      { divider: "ASPEK" },

      { to: "/standar-mutu/pendidikan", label: "🎓 Pendidikan" },
      { to: "/standar-mutu/penelitian", label: "🔬 Penelitian" },
      { to: "/standar-mutu/pkm", label: "🤝 PkM" },
      { to: "/standar-mutu/organisasi", label: "🏛 Organisasi" },
      { to: "/standar-mutu/kemahasiswaan", label: "👨‍🎓 Kemahasiswaan" },
      { to: "/standar-mutu/sdm", label: "👥 SDM" },
      { to: "/standar-mutu/sarpras", label: "🏢 Sarpras" },
      { to: "/standar-mutu/kerjasama", label: "🌐 Kerja Sama" },
      { to: "/standar-mutu/keuangan", label: "💰 Keuangan" },
      { to: "/standar-mutu/kesejahteraan", label: "❤️ Kesejahteraan" },
    ],
  };

  // =========================
  // DETEKSI HALAMAN
  // =========================
  let currentMenu = menus.main;

  if (location.pathname.startsWith("/akreditasi")) {
    currentMenu = menus.akreditasi;
  }

  if (location.pathname.startsWith("/standar-mutu")) {
    currentMenu = menus.standar;
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-800">
      {/* HEADER */}
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">SPMI Digital</span>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {currentMenu.length === 0 ? (
          <p className="text-gray-400 text-sm px-3">Tidak ada menu</p>
        ) : (
          currentMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/akreditasi" || item.to === "/standar-mutu"}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              {item.label}
            </NavLink>
          ))
        )}
      </nav>
    </aside>
  );
}
