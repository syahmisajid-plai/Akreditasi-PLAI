import { Outlet, useLocation } from "react-router-dom";

import { standarData } from "../../data/standarData";
import { Link } from "react-router-dom";

/* ================= HELPER ================= */

const avg = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

/* hitung maturity per standar */
const getStandarScore = (standar) => {
  const values = standar.indikator.map((i) => i.progress);
  return Math.round(avg(values));
};

const getAspekScore = (aspek) => {
  if (!aspek.standar.length) return 0;

  const standarScores = aspek.standar.map((standar) => {
    const indikator = standar.indikator;

    if (!indikator.length) return 0;

    // hitung rata-rata persen indikator
    const totalPersen = indikator.reduce((sum, item) => {
      if (!item.target) return sum;

      const persen = Math.min(item.progress / item.target, 1);
      return sum + persen;
    }, 0);

    return (totalPersen / indikator.length) * 100;
  });

  // rata-rata semua standar
  const aspekScore =
    standarScores.reduce((a, b) => a + b, 0) / standarScores.length;

  return Math.round(aspekScore);
};

const getColor = (value) => {
  if (value >= 80) return "bg-green-500";
  if (value >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

/* ================= COMPONENT ================= */

export default function StandarOverview() {
  const location = useLocation();

  const isRootStandar = location.pathname === "/standar-mutu";

  return (
    <div className="space-y-6">
      {/* ================= OVERVIEW ONLY ROOT ================= */}
      {isRootStandar && (
        <>
          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Overview Standar Mutu
            </h1>
            <p className="text-sm text-gray-500">
              Ringkasan ketercapaian seluruh standar institusi
            </p>
          </div>

          {/* GRID ASPEK */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standarData.map((aspek) => {
              const aspekScore = getAspekScore(aspek);

              return (
                <Link
                  key={aspek.id}
                  to={`/standar-mutu/${aspek.id}`}
                  className="group bg-white rounded-2xl border p-6 hover:shadow-lg transition"
                >
                  {/* TITLE */}
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    {aspek.nama}
                  </h2>

                  {/* SCORE */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-bold text-gray-900">
                        {aspekScore}
                      </p>
                      <p className="text-sm text-gray-400">Maturity Score</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs text-white ${getColor(
                        aspekScore,
                      )}`}
                    >
                      {aspekScore >= 80
                        ? "Unggul"
                        : aspekScore >= 60
                          ? "Baik"
                          : "Perlu Peningkatan"}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 text-sm text-blue-600 font-medium group-hover:translate-x-1 transition">
                    Lihat Detail →
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* ================= CHILD PAGE ================= */}
      <Outlet />
    </div>
  );
}
