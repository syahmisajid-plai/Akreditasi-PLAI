// buildIndikatorResult.js
import {
  skorDokumen,
  skorJumlahDosen,
  skorRasioDosenMahasiswa,
  skorDosenS3,
  skorJabatanFungsional,
  skorPersentase,
  skorTepatWaktu,
  skorRasio,
  skorBoolean,
  simplifyRatio,
  calculatePercentage,
} from "./indikatorScoring";

export const rumusTerakreditasi = (data) => {
  return {
    "Budaya Mutu": [
      {
        nama: "Dokumen Penetapan",
        value: String(data.budayaMutu.penetapan),
        target: "Tersedia",
        skor: skorDokumen(data.budayaMutu.penetapan),
      },
      {
        nama: "Dokumen Pelaksanaan",
        value: String(data.budayaMutu.pelaksanaan),
        target: "Tersedia",
        skor: skorDokumen(data.budayaMutu.pelaksanaan),
      },
      {
        nama: "Dokumen Evaluasi",
        value: String(data.budayaMutu.evaluasi),
        target: "Tersedia",
        skor: skorDokumen(data.budayaMutu.evaluasi),
      },
      {
        nama: "Dokumen Pengendalian",
        value: String(data.budayaMutu.pengendalian),
        target: "Tersedia",
        skor: skorDokumen(data.budayaMutu.pengendalian),
      },
      {
        nama: "Dokumen Peningkatan",
        value: String(data.budayaMutu.peningkatan),
        target: "Tersedia",
        skor: skorDokumen(data.budayaMutu.peningkatan),
      },
    ],

    "Relevansi Pendidikan": [
      {
        nama: "Jumlah Dosen Tetap",
        value: data.relevansiPendidikan.jumlahDosenTetap,
        target: 5,
        skor: skorJumlahDosen(data.relevansiPendidikan.jumlahDosenTetap),
      },
      {
        nama: "Rasio Dosen : Mahasiswa",
        value: simplifyRatio(
          data.relevansiPendidikan.jumlahDosenTetap,
          data.relevansiPendidikan.jumlahMahasiswa,
        ),
        target: "1:60",
        skor: skorRasioDosenMahasiswa(
          data.relevansiPendidikan.jumlahDosenTetap,
          data.relevansiPendidikan.jumlahMahasiswa,
        ),
      },
      {
        nama: "Persentase Dosen S3",
        value: calculatePercentage(
          data.relevansiPendidikan.jumlahDosenS3,
          data.relevansiPendidikan.jumlahDosenTotal,
        ),
        target: "50%",
        skor: skorDosenS3(
          data.relevansiPendidikan.jumlahDosenS3,
          data.relevansiPendidikan.jumlahDosenTotal,
        ),
      },
      {
        nama: "Jabatan Fungsional",
        value: calculatePercentage(
          data.relevansiPendidikan.jumlahJabatanFungsional,
          data.relevansiPendidikan.jumlahDosenTotal,
        ),
        target: "30%",
        skor: skorJabatanFungsional(
          data.relevansiPendidikan.jumlahJabatanFungsional,
          data.relevansiPendidikan.jumlahDosenTotal,
        ),
      },
      {
        nama: "Persentase Lulusan",
        value: calculatePercentage(
          data.relevansiPendidikan.jumlahLulusan,
          data.relevansiPendidikan.jumlahMahasiswa3Tahun,
        ),
        target: "80%",
        skor: skorPersentase(
          data.relevansiPendidikan.jumlahLulusan,
          data.relevansiPendidikan.jumlahMahasiswa3Tahun,
        ),
      },
      {
        nama: "Kelulusan Tepat Waktu",
        value: calculatePercentage(
          data.relevansiPendidikan.lulusanTepatWaktu,
          data.relevansiPendidikan.jumlahMahasiswa3Tahun,
        ),
        target: "60%",
        skor: skorTepatWaktu(
          data.relevansiPendidikan.lulusanTepatWaktu,
          data.relevansiPendidikan.jumlahMahasiswa3Tahun,
        ),
      },
    ],

    "Relevansi Penelitian": [
      {
        nama: "Rasio Penelitian",
        value: calculatePercentage(
          data.relevansiPenelitian.jumlahPenelitian,
          data.relevansiPenelitian.jumlahDTPR,
        ),
        target: "100%",
        skor: skorRasio(
          data.relevansiPenelitian.jumlahPenelitian,
          data.relevansiPenelitian.jumlahDTPR,
        ),
      },
      {
        nama: "Rasio Publikasi",
        value: calculatePercentage(
          data.relevansiPenelitian.jumlahPublikasi,
          data.relevansiPenelitian.jumlahDTPR,
        ),
        target: "100%",
        skor: skorRasio(
          data.relevansiPenelitian.jumlahPublikasi,
          data.relevansiPenelitian.jumlahDTPR,
        ),
      },
    ],

    "Relevansi Pengabdian kepada Masyarakat": [
      {
        nama: "Rasio Kegiatan PkM",
        value: calculatePercentage(
          data.pkm.jumlahKegiatan,
          data.pkm.jumlahDTPR,
        ),
        target: "100%",
        skor: skorRasio(data.pkm.jumlahKegiatan, data.pkm.jumlahDTPR),
      },
    ],

    Akuntabilitas: [
      {
        nama: "Struktur Organisasi & Tata Kelola",
        value: String(data.akuntabilitas.strukturOrganisasiLengkap),
        target: "Tersedia",
        skor: skorBoolean(data.akuntabilitas.strukturOrganisasiLengkap),
      },
    ],
  };
};
