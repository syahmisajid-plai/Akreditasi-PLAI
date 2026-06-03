import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { standarData } from "../../data/standarData";

/* =========================
   HELPER
========================= */

const avg = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

const hitungStandar = (indikator) => {
  if (!indikator.length) return 0;

  const totalPersen = indikator.reduce((sum, item) => {
    if (!item.target) return sum;

    // cap max 100%
    const persen = Math.min(item.progress / item.target, 1);

    return sum + persen;
  }, 0);

  return Math.round((totalPersen / indikator.length) * 100);
};

const hitungAspek = (standar) =>
  Math.round(avg(standar.map((s) => hitungStandar(s.indikator))));

const getColor = (progress) => {
  if (progress >= 85) return "bg-green-500";
  if (progress >= 70) return "bg-yellow-500";
  return "bg-red-500";
};

const getStatus = (progress) => {
  if (progress >= 85) return "Unggul";
  if (progress >= 70) return "Baik";
  return "Perlu Peningkatan";
};

/* =========================
   TEMPLATE COMPONENT
========================= */

export default function TemplateAspek({ aspekId, description }) {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const aspek = standarData.find((a) => a.id === aspekId);

  if (!aspek) {
    return <div>Aspek tidak ditemukan</div>;
  }

  const aspekScore = hitungAspek(aspek.standar);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{aspek.nama}</h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <button
          onClick={() => navigate("/standar-mutu")}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          ← Kembali
        </button>
      </div>

      {/* OVERVIEW */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Capaian Aspek</span>
          <span className="font-semibold">
            {aspekScore}/100 ({getStatus(aspekScore)})
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`${getColor(aspekScore)} h-4 rounded-full`}
            style={{ width: `${aspekScore}%` }}
          />
        </div>
      </div>

      {/* LIST STANDAR */}
      <div className="grid md:grid-cols-3 gap-5">
        {aspek.standar.map((standar, index) => {
          const score = hitungStandar(standar.indikator);
          const isOpen = openIndex === index;

          return (
            <div
              key={standar.id}
              onClick={() => toggle(index)}
              className="bg-white rounded-2xl shadow-sm border p-5 cursor-pointer hover:shadow-md transition"
            >
              <h2 className="text-sm text-gray-500 mb-3">{standar.nama}</h2>

              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-800">
                  {score}%
                </span>

                <span
                  className={`text-xs px-3 py-1 rounded-full text-white ${getColor(
                    score,
                  )}`}
                >
                  {getStatus(score)}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {standar.indikator.length} indikator
              </p>

              {isOpen && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div className="grid grid-cols-4 text-sm font-semibold text-gray-600">
                    <span className="col-span-2">Nama</span>
                    <span className="text-center">Progress</span>
                    <span className="text-right">Target</span>
                  </div>

                  {standar.indikator.map((indikator) => (
                    <div
                      key={indikator.id}
                      className="grid grid-cols-4 text-sm"
                    >
                      <span className="col-span-2">{indikator.nama}</span>

                      <span className="text-center font-medium">
                        {indikator.progress}
                      </span>

                      <span className="text-right font-medium">
                        {indikator.target}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
