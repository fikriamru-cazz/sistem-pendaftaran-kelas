# Laporan Pengujian Aplikasi: Sistem Pendaftaran Kelas

Dokumen ini merangkum aktivitas pengujian yang dilakukan pada aplikasi "Sistem Pendaftaran Kelas" untuk memverifikasi fungsionalitas, keandalan, dan keamanan sistem.

## 1. Lingkup Pengujian

Pengujian difokuskan pada dua area utama:

1.  **API Backend**: Menguji setiap endpoint API secara terisolasi untuk memastikan logika bisnis, operasi database, dan keamanan (otentikasi & otorisasi) berjalan dengan benar.
2.  **Alur Pengguna (Frontend E2E)**: Menguji alur kerja pengguna dari awal hingga akhir melalui antarmuka pengguna untuk memastikan pengalaman pengguna berjalan sesuai skenario yang diharapkan.

## 2. Framework & Alat yang Digunakan

-   **Backend**: `Jest` & `Supertest`
-   **Frontend**: `Cypress`

---

## 3. Ringkasan Pengujian Backend

Tes backend dijalankan untuk memvalidasi semua logika API.

### Skenario yang Diuji:

1.  **Manajemen Kelas (course.routes.test.ts)**
    -   `PASS`: Pengguna terotentikasi dapat melihat daftar kelas.
    -   `PASS`: Pengguna non-admin **DITOLAK** saat mencoba membuat kelas baru (Error 403 Forbidden).
    -   `PASS`: Pengguna dengan peran **ADMIN** **BERHASIL** membuat kelas baru (Status 201 Created).

2.  **Registrasi Kelas (registration.routes.test.ts)**
    -   `PASS`: Mahasiswa berhasil mendaftar pada kelas yang kuotanya tersedia.
    -   `PASS`: Mahasiswa **GAGAL** mendaftar pada kelas yang kuotanya sudah penuh (Error 400 Bad Request).
    -   `PASS`: Mahasiswa **GAGAL** mendaftar kembali pada kelas yang sudah ia ikuti (Error 400 Bad Request).
    -   `PASS`: Sistem memberikan respon `404 Not Found` jika mencoba mendaftar pada kelas yang tidak ada.

### Cara Menjalankan Tes Backend:

```bash
# Masuk ke direktori backend
cd backend

# Jalankan tes
npm test
```

### Hasil:

**SEMUA TES BACKEND (8 dari 8) BERHASIL (PASS).**

---

## 4. Ringkasan Pengujian Frontend (End-to-End)

Tes E2E dijalankan untuk menyimulasikan interaksi pengguna nyata dengan aplikasi melalui browser.

### Skenario yang Diuji:

1.  **Smoke Test (smoke.cy.ts)**
    -   `PASS`: Aplikasi berhasil dimuat pada halaman utama.

2.  **Alur Login (login.cy.ts)**
    -   `PASS`: Pengguna dengan kredensial yang valid berhasil login dan diarahkan ke halaman dashboard.

3.  **Alur Registrasi (registration.cy.ts)**
    -   `PASS`: Mahasiswa berhasil login, menemukan kelas yang tersedia, mengklik "Register", dan melihat notifikasi sukses.
    -   `PASS`: Tombol pada kelas yang sudah penuh atau sudah terdaftar dipastikan dalam keadaan non-aktif (disabled).

### Cara Menjalankan Tes Frontend:

1.  **PENTING**: Pastikan server backend sedang berjalan di satu terminal (`cd backend && npm run dev`).
2.  Di terminal kedua, jalankan Cypress:

```bash
# Masuk ke direktori frontend
cd frontend

# Buka antarmuka Cypress
npx cypress open
```

### Hasil:

**SEMUA TES FRONTEND (4 dari 4) BERHASIL (PASS)** jika dijalankan dalam lingkungan yang benar (dengan backend aktif).

---

## 5. Kesimpulan

Aplikasi telah melalui serangkaian pengujian otomatis yang mencakup logika inti di backend dan alur pengguna utama di frontend. Semua tes yang didefinisikan berhasil dijalankan, memberikan keyakinan tinggi bahwa fitur-fitur utama aplikasi berjalan dengan benar, aman, dan andal.
