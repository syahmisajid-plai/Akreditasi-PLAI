import { Outlet, useLocation } from "react-router-dom";
import { status_prodi } from "../../data/datastatusakreditasi";

export default function Akreditasi() {
  const location = useLocation();

  const isRootAkreditasi = location.pathname === "/akreditasi";

  /* warna badge status */
  const statusColor = (status) => {
    if (status === "Unggul") return "bg-green-100 text-green-700";
    if (status === "Baik Sekali") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div>
      {/* DASHBOARD PARENT */}
      {isRootAkreditasi && (
        <>
          <h1 className="text-2xl font-bold mb-6">Dashboard Akreditasi</h1>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-sm text-gray-700">
                <tr>
                  <th className="p-3 text-left">Program Studi</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Target</th>
                  <th className="p-3 text-left">Re-Akreditasi</th>
                  <th className="p-3 text-left">Sertifikat</th>
                </tr>
              </thead>

              <tbody>
                {status_prodi.map((p, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50 transition">
                    {/* status_prodi */}
                    <td className="p-3 font-medium text-gray-800">{p.nama}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                          p.status,
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* TARGET */}
                    <td className="p-3 text-gray-700">{p.target}</td>

                    {/* RE-AKREDITASI */}
                    <td className="p-3 text-gray-700">{p.reakreditasi}</td>

                    {/* LINK SERTIFIKAT */}
                    <td className="p-3">
                      <a
                        href={p.sertifikat}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline text-sm font-medium"
                      >
                        Lihat Sertifikat
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* CHILD ROUTE */}
      <Outlet />
    </div>
  );
}
