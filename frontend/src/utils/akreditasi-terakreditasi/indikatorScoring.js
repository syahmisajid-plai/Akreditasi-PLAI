// indikatorScoring.js
export const skorDokumen = (tersedia) => {
  return tersedia ? 4 : 1;
};
export const skorJumlahDosen = (jumlah) => {
  return jumlah >= 5 ? 4 : 1;
};
export const skorRasioDosenMahasiswa = (dosen, mahasiswa) => {
  const rasio = mahasiswa / dosen;

  if (rasio <= 60) return 4;
  if (rasio <= 70) return 3;
  return 2;
};
export const skorDosenS3 = (s3, total) => {
  const persen = (s3 / total) * 100;

  if (persen > 50) return 4;
  if (persen >= 10) return 3;
  return 2;
};
export const skorJabatanFungsional = (jf, total) => {
  const persen = (jf / total) * 100;

  if (persen > 30) return 4;
  if (persen >= 10) return 3;
  return 2;
};
export const skorPersentase = (jumlah, total) => {
  const persen = (jumlah / total) * 100;

  if (persen > 80) return 4;
  if (persen >= 60) return 3;
  if (persen >= 40) return 2;
  return 1;
};
export const skorTepatWaktu = (jumlah, total) => {
  const persen = (jumlah / total) * 100;

  if (persen > 60) return 4;
  if (persen > 40) return 3;
  if (persen > 20) return 2;
  return 1;
};
export const skorRasio = (jumlah, dtpr) => {
  const rasio = jumlah / dtpr;

  if (rasio >= 1) return 4;
  if (rasio >= 0.5) return 3;
  if (rasio >= 0.25) return 2;
  return 1;
};
export const skorBoolean = (ok) => (ok ? 4 : 1);

export const simplifyRatio = (a, b) => {
  const numA = Number(a) || 0;
  const numB = Number(b) || 0;

  // fungsi FPB (GCD)
  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));

  const pembagi = gcd(numA, numB) || 1;

  return `${numA / pembagi}:${numB / pembagi}`;
};

export const calculatePercentage = (a, b) => {
  const numA = Number(a) || 0;
  const numB = Number(b) || 0;

  if (numB === 0) return "0%";

  const result = (numA / numB) * 100;

  return `${Math.round(result)}%`;
};
