import Sidebar from "../components/Sidebars";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    // BACKGROUND HITAM FULL SCREEN
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-blue-950 flex items-center justify-center p-4">
      {/* CONTAINER UTAMA (CENTERED) */}
      <div className="flex h-[95vh] w-full max-w-7xl overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT AREA */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
