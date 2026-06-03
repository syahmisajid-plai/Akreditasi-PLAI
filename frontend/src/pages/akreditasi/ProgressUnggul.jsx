import { useState } from "react";
import { DATA_PRODI, PPEPP } from "../../data/dataprogressunggul";

/* ================= HELPER ================= */
const avg = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

const hitungKategoriProgress = (kelompok = []) => {
  if (!kelompok.length) return 0;
  const values = kelompok.flatMap((k) =>
    k.indikator.flatMap((ind) => PPEPP.map((p) => ind.ppepp?.[p] ?? 0)),
  );
  return Math.round(avg(values));
};

const hitungKelompokProgress = (indikator = []) => {
  if (!indikator.length) return 0;
  const values = indikator.flatMap((ind) =>
    PPEPP.map((p) => ind.ppepp?.[p] ?? 0),
  );
  return Math.round(avg(values));
};

const getColor = (value) => {
  if (value >= 80) return "bg-green-500";
  if (value >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

/* ================= COMPONENT ================= */
export default function ProgressUnggul() {
  const [prodi, setProdi] = useState("Sains Data Terapan");
  const [openKategori, setOpenKategori] = useState(null);
  const [openKelompok, setOpenKelompok] = useState({}); // toggle indikator per kelompok

  const data = DATA_PRODI[prodi] || [];

  const toggleKategori = (index) => {
    setOpenKategori(openKategori === index ? null : index);
  };

  const toggleKelompok = (kategoriIndex, kelompokIndex) => {
    setOpenKelompok((prev) => {
      const key = `${kategoriIndex}-${kelompokIndex}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Progress Menuju Unggul
        </h1>
        <p className="text-sm text-gray-500">
          Monitoring kematangan siklus PPEPP
        </p>
      </div>

      {/* PILIH PRODI */}
      <div className="bg-white rounded-xl shadow p-4">
        <select
          value={prodi}
          onChange={(e) => {
            setProdi(e.target.value);
            setOpenKategori(null);
            setOpenKelompok({});
          }}
          className="border rounded-lg px-3 py-2"
        >
          {Object.keys(DATA_PRODI).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* OVERVIEW */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((sub, kategoriIndex) => {
          const kategoriScore = hitungKategoriProgress(sub.kelompok);
          const isKategoriOpen = openKategori === kategoriIndex;

          return (
            <div
              key={kategoriIndex}
              className="bg-white rounded-xl shadow transition"
            >
              {/* CARD HEADER */}
              <div
                onClick={() => toggleKategori(kategoriIndex)}
                className="p-6 cursor-pointer hover:shadow-lg"
              >
                <h2 className="font-semibold text-gray-800 mb-3">
                  {sub.kategori}
                </h2>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`${getColor(kategoriScore)} h-4 rounded-full transition-all`}
                    style={{ width: `${kategoriScore}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Maturity: {kategoriScore}% ({kategoriScore}/100)
                </p>
              </div>

              {/* DETAIL KELOMPOK */}
              {isKategoriOpen && (
                <div className="border-t px-6 pb-6 space-y-4">
                  {sub.kelompok.map((k, kelompokIndex) => {
                    const kelompokScore = hitungKelompokProgress(k.indikator);
                    const key = `${kategoriIndex}-${kelompokIndex}`;
                    const isKelompokOpen = openKelompok[key];

                    return (
                      <div key={kelompokIndex} className="space-y-2 mt-4">
                        {/* HEADER KELOMPOK */}
                        <div className="flex justify-between items-center p-3 rounded-md border-b-2 border-blue-400 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                          <span className="font-medium text-gray-700 flex items-center gap-2">
                            <span>📌</span> {k.nama_kelompok}
                          </span>
                          <div className="flex items-center gap-4">
                            <span
                              className={`px-2 py-1 rounded text-white ${getColor(
                                kelompokScore,
                              )}`}
                            >
                              {kelompokScore}%
                            </span>
                            <button
                              onClick={() =>
                                toggleKelompok(kategoriIndex, kelompokIndex)
                              }
                              className="text-sm text-blue-500"
                            >
                              {isKelompokOpen ? "Tutup" : "Detail"}
                            </button>
                          </div>
                        </div>

                        {/* DETAIL INDIKATOR HORIZONTAL PPEPP */}
                        {isKelompokOpen && (
                          <div className="space-y-3 mt-2">
                            {k.indikator.map((item, idx) => (
                              <div key={idx}>
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  {item.nama}
                                </p>

                                {/* Baris 1: Akronim PPEPP */}
                                <div className="flex gap-2 mb-1">
                                  {PPEPP.map((p) => (
                                    <div
                                      key={p}
                                      className="flex-1 text-center text-xs font-medium"
                                    >
                                      {p[0]}
                                    </div>
                                  ))}
                                </div>

                                {/* Baris 2: Nilai PPEPP */}
                                <div className="flex gap-2">
                                  {PPEPP.map((p) => {
                                    const val = item.ppepp?.[p] ?? 0;
                                    return (
                                      <div
                                        key={p}
                                        className={`flex-1 text-center text-white rounded-md py-1 ${getColor(
                                          val,
                                        )}`}
                                      >
                                        {val}%
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
