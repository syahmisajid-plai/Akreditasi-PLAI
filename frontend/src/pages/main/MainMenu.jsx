import { useState } from "react";
import { standarData } from "../../data/standarData";
import { DATA_PRODI, PPEPP } from "../../data/dataprogressunggul";
import { DATA_PRODI_TERAKREDITASI } from "../../data/dataprogressterakreditasi";
import { status_prodi } from "../../data/datastatusakreditasi";
import { rumusTerakreditasi } from "../../utils/akreditasi-terakreditasi/buildIndikatorResult";
import { NavLink } from "react-router-dom";

/* ================= HELPERS ================= */
const avg = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

const getColor = (v) => {
  if (v >= 85) return "bg-green-500";
  if (v >= 70) return "bg-yellow-500";
  return "bg-red-500";
};

/* ===== Standar Mutu ===== */
const getStandarScore = () => {
  const indikator = standarData
    .flatMap((aspek) => aspek.standar)
    .flatMap((s) => s.indikator);
  if (!indikator.length) return 0;

  const totalPersen = indikator.reduce((sum, item) => {
    if (!item.target) return sum;
    const persen = Math.min(item.progress / item.target, 1);
    return sum + persen;
  }, 0);

  return Math.round((totalPersen / indikator.length) * 100);
};

/* ===== PPEPP Overall ===== */
const getPPEPPScore = () => {
  const values = Object.values(DATA_PRODI).flatMap((prodi) =>
    prodi.flatMap((sub) =>
      sub.kelompok.flatMap((k) =>
        k.indikator.map((ind) => PPEPP.map((p) => ind.ppepp?.[p] ?? 0)).flat(),
      ),
    ),
  );
  return Math.round(avg(values));
};

/* ===== Akreditasi Overall ===== */
const getTotalProdi = (rawData) => {
  const hasil = rumusTerakreditasi(rawData);
  const semuaSkor = Object.values(hasil).flatMap((kategori) =>
    kategori.map((item) => item.skor),
  );
  const total = semuaSkor.reduce((a, b) => a + b, 0);
  const max = semuaSkor.length * 4; // skor max tiap indikator = 4
  const persen = Math.round((total / max) * 100);
  return { total, max, persen };
};

const getAkreditasiScore = () => {
  const semuaProdi = Object.values(DATA_PRODI_TERAKREDITASI);
  let totalSkor = 0;
  let maxSkor = 0;

  semuaProdi.forEach((rawData) => {
    const { total, max } = getTotalProdi(rawData);
    totalSkor += total;
    maxSkor += max;
  });

  const persen = Math.round((totalSkor / maxSkor) * 100);
  return { totalSkor, maxSkor, persen };
};

/* ================= COMPONENT ================= */
export default function MainMenu() {
  const standarScore = getStandarScore();
  const ppeppScore = getPPEPPScore();
  const { totalSkor, maxSkor, persen: akreditasiScore } = getAkreditasiScore();
  const overall = Math.round(avg([standarScore, ppeppScore, akreditasiScore]));

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Mutu Program Studi
        </h1>
        <p className="text-sm text-gray-500">
          Ringkasan kondisi mutu dan akreditasi seluruh prodi
        </p>
      </div>

      {/* GRID SECTION */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* STATUS AKREDITASI */}
        <NavLink
          to="/akreditasi"
          className={({ isActive }) =>
            `block bg-white rounded-xl shadow p-6 transition hover:bg-gray-100 ${isActive ? "ring-2 ring-blue-400" : ""}`
          }
        >
          <h3 className="font-semibold text-gray-800 mb-4">
            Status Akreditasi Prodi
          </h3>
          <div className="space-y-3 text-sm text-black">
            {status_prodi.map((s, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <span>{s.nama}</span>
                <span className="font-medium">{s.status}</span>
              </div>
            ))}
          </div>
        </NavLink>

        {/* STANDAR MUTU */}
        <NavLink
          to="/standar-mutu"
          className={({ isActive }) =>
            `block bg-white rounded-xl shadow p-6 transition hover:bg-gray-100 ${isActive ? "ring-2 ring-blue-400" : ""}`
          }
        >
          <h3 className="font-semibold text-gray-800 mb-4">Standar Mutu</h3>
          <p className="text-4xl font-bold text-black">{standarScore}%</p>
          <div className="mt-4 bg-gray-200 h-3 rounded-full">
            <div
              className={`${getColor(standarScore)} h-3 rounded-full`}
              style={{ width: `${standarScore}%` }}
            />
          </div>
        </NavLink>

        {/* PROGRESS AKREDITASI */}
        <NavLink
          to="/akreditasi/progress-terakreditasi"
          className={({ isActive }) =>
            `block bg-white rounded-xl shadow p-6 transition hover:bg-gray-100 ${isActive ? "ring-2 ring-blue-400" : ""}`
          }
        >
          <h3 className="font-semibold text-gray-800 mb-4">Terakreditasi</h3>
          <p className="text-4xl font-bold text-black">{akreditasiScore}%</p>
          <p className="text-xs text-gray-400 mt-1">
            {totalSkor} / {maxSkor} Poin
          </p>
          <div className="mt-4 bg-gray-200 h-3 rounded-full">
            <div
              className={`${getColor(akreditasiScore)} h-3 rounded-full`}
              style={{ width: `${akreditasiScore}%` }}
            />
          </div>
        </NavLink>

        {/* PPEPP */}
        <NavLink
          to="/akreditasi/progress-unggul"
          className={({ isActive }) =>
            `block bg-white rounded-xl shadow p-6 transition hover:bg-gray-100 ${isActive ? "ring-2 ring-blue-400" : ""}`
          }
        >
          <h3 className="font-semibold text-gray-800 mb-4">
            Akreditasi Unggul
          </h3>
          <p className="text-4xl font-bold text-black">{ppeppScore}%</p>
          <div className="mt-4 grid grid-cols-5 gap-2 text-xs">
            {PPEPP.map((cycle) => {
              const values = Object.values(DATA_PRODI).flatMap((prodi) =>
                prodi.flatMap((sub) =>
                  sub.kelompok.flatMap((k) =>
                    k.indikator.map((i) => i.ppepp?.[cycle] ?? 0),
                  ),
                ),
              );
              const score = Math.round(avg(values));
              return (
                <div
                  key={cycle}
                  className={`${getColor(score)} text-white text-center py-2 rounded`}
                  title={`${cycle}: ${score}%`}
                >
                  {cycle[0]}
                </div>
              );
            })}
          </div>
        </NavLink>
      </div>
    </div>
  );
}
