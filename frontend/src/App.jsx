import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

/* ===== MAIN MENU ===== */
import MainMenu from "./pages/main/MainMenu";

/* ===== AKREDITASI ===== */
import Akreditasi from "./pages/akreditasi/Akreditasi";
import ProgressTerakreditasi from "./pages/akreditasi/ProgressTerakreditasi";
import ProgressUnggul from "./pages/akreditasi/ProgressUnggul";

/* ===== STANDAR MUTU ===== */
import StandarMutu from "./pages/standar/StandarOverview";
import AspekPendidikan from "./pages/standar/AspekPendidikan";
import AspekPenelitian from "./pages/standar/AspekPenelitian";
import AspekPkM from "./pages/standar/AspekPkM";
import AspekOrganisasi from "./pages/standar/AspekOrganisasi";
import AspekKemahasiswaan from "./pages/standar/AspekKemahasiswaan";
import AspekSDM from "./pages/standar/AspekSDM";
import AspekSarpras from "./pages/standar/AspekSarpras";
import AspekKerjasama from "./pages/standar/AspekKerjasama";
import AspekKeuangan from "./pages/standar/AspekKeuangan";
import AspekKesejahteraan from "./pages/standar/AspekKesejahteraan";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* ================= MAIN MENU ================= */}
          <Route index element={<MainMenu />} />

          {/* ================= AKREDITASI ================= */}
          <Route path="akreditasi" element={<Akreditasi />}>
            <Route
              path="progress-terakreditasi"
              element={<ProgressTerakreditasi />}
            />
            <Route path="progress-unggul" element={<ProgressUnggul />} />
          </Route>

          {/* ================= STANDAR MUTU ================= */}
          <Route path="standar-mutu" element={<StandarMutu />}>
            <Route path="pendidikan" element={<AspekPendidikan />} />
            <Route path="penelitian" element={<AspekPenelitian />} />
            <Route path="pkm" element={<AspekPkM />} />
            <Route path="organisasi" element={<AspekOrganisasi />} />
            <Route path="kemahasiswaan" element={<AspekKemahasiswaan />} />
            <Route path="sdm" element={<AspekSDM />} />
            <Route path="sarpras" element={<AspekSarpras />} />
            <Route path="kerjasama" element={<AspekKerjasama />} />
            <Route path="keuangan" element={<AspekKeuangan />} />
            <Route path="Kesejahteraan" element={<AspekKesejahteraan />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
