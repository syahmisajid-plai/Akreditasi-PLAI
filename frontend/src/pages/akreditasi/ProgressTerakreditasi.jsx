import { useState } from "react";
import { DATA_PRODI_TERAKREDITASI } from "../../data/dataprogressterakreditasi";
import { rumusTerakreditasi } from "../../utils/akreditasi-terakreditasi/buildIndikatorResult";
/* =========================
    HELPER
  ========================= */

const scoreToPercent = (score) => Math.round((score / 4) * 100);

const getKategoriProgress = (items) => {
  const total = items.reduce((sum, item) => sum + item.skor, 0) / items.length;

  return scoreToPercent(total);
};

const getKategoriProgressWithPoints = (items) => {
  const total = items.reduce((sum, item) => sum + item.skor, 0);
  const max = items.length * 4; // skor maksimum per indikator = 4
  const persen = Math.round((total / max) * 100);
  return { persen, total, max };
};

/* =========================
    COMPONENT
  ========================= */

export default function ProgressTerakreditasi() {
  const [prodi, setProdi] = useState("Sains Data Terapan");
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ ambil raw data
  const rawData = DATA_PRODI_TERAKREDITASI[prodi];

  // ✅ hitung skor otomatis
  const hasilIndikator = rumusTerakreditasi(rawData);

  // ✅ dipakai UI
  const kategoriList = Object.entries(hasilIndikator);

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Progress Terakreditasi
        </h1>
        <p className="text-sm text-gray-500">
          Monitoring capaian matriks akreditasi program studi
        </p>
      </div>

      {/* DROPDOWN */}
      <div className="bg-white rounded-xl shadow p-4">
        <select
          value={prodi}
          onChange={(e) => setProdi(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          {Object.keys(DATA_PRODI_TERAKREDITASI).map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* OVERVIEW */}
      {/* OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {kategoriList.map(([kategori, items], index) => {
          // <== ini bagian yang kamu tanyakan
          const {
            persen: kategoriProgress,
            total,
            max,
          } = getKategoriProgressWithPoints(items);
          const isOpen = openIndex === index;

          const getStatus = (v) => {
            if (v >= 85) return "Unggul";
            if (v >= 70) return "Baik";
            return "Perlu Peningkatan";
          };

          const getColor = (v) => {
            if (v >= 85) return "bg-green-500";
            if (v >= 70) return "bg-yellow-500";
            return "bg-red-500";
          };

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border hover:shadow-lg transition"
            >
              {/* ================= HEADER ================= */}
              <div
                onClick={() => toggleCard(index)}
                className="p-5 cursor-pointer"
              >
                {/* TITLE + STATUS */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-semibold text-gray-800 leading-snug">
                    {kategori}
                  </h2>

                  <span
                    className={`text-xs text-white px-2 py-1 rounded-full ${getColor(
                      kategoriProgress,
                    )}`}
                  >
                    {getStatus(kategoriProgress)}
                  </span>
                </div>

                {/* BIG SCORE */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900 leading-none">
                      {kategoriProgress}%
                    </p>
                    <p className="text-xs text-gray-400">
                      {total} / {max} Poin
                    </p>
                  </div>

                  <span className="text-sm text-gray-500">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${getColor(
                      kategoriProgress,
                    )} h-3 rounded-full transition-all`}
                    style={{ width: `${kategoriProgress}%` }}
                  />
                </div>
              </div>

              {/* ================= DETAIL ================= */}
              {isOpen && (
                <div className="border-t px-5 pb-5">
                  {/* HEADER KOLOM */}
                  <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 py-3 border-b">
                    <div className="col-span-2">Indikator</div>
                    <div className="text-center">Data</div>
                    <div className="text-center">Target</div>
                    <div className="text-center">Nilai</div>
                  </div>

                  {/* ROW DATA */}
                  <div className="space-y-3 mt-3">
                    {items.map((item, i) => {
                      const progress = scoreToPercent(item.skor);

                      return (
                        <div key={i} className="space-y-1">
                          {/* TEXT ROW */}
                          <div className="grid grid-cols-5 items-center text-sm">
                            <div className="col-span-2 text-gray-700">
                              {item.nama}
                            </div>

                            {/* DATA MENTAH */}
                            <div className="text-center font-medium">
                              {item.value}
                            </div>

                            {/* TARGET */}
                            <div className="text-center text-gray-500 font-bold">
                              {item.target}
                            </div>

                            {/* Poin */}
                            <div className="text-center font-semibold">
                              {item.skor} Poin
                            </div>
                          </div>

                          {/* PROGRESS BAR */}
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div
                              className="bg-indigo-500 h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
