# Panduan Deployment Aplikasi

Dokumen ini berisi panduan langkah-demi-langkah untuk mendeploy aplikasi (backend dan frontend) ke layanan cloud.

**Strategi:**
-   **Backend**: Node.js + Prisma akan di-deploy ke **Render**.
-   **Database**: SQLite akan dimigrasi ke **PostgreSQL** yang disediakan oleh Render.
-   **Frontend**: React akan di-deploy ke **Vercel**.

---

## Langkah 1: Migrasi Database ke PostgreSQL (PENTING)

Database SQLite berbasis file dan tidak bisa digunakan di lingkungan produksi seperti Render. Kita harus beralih ke database online.

1.  **Buat Akun Render**: Daftar dan login ke [https://render.com/](https://render.com/).
2.  **Buat Database PostgreSQL Baru**:
    -   Di dashboard Render, klik "New" -> "PostgreSQL".
    -   Beri nama unik (misal: `db-registrasi-kelas`), pilih region terdekat, dan klik "Create Database".
    -   Tunggu beberapa menit hingga database selesai dibuat.
3.  **Dapatkan Connection URL**:
    -   Di halaman database Anda, cari bagian "Connections".
    -   Salin URL koneksi yang berlabel **"External Database URL"**. Ini akan terlihat seperti `postgres://user:password@host:port/database`.
4.  **Ubah Skema Prisma**:
    -   Buka file `backend/prisma/schema.prisma`.
    -   Ubah bagian `datasource` dari `sqlite` menjadi `postgresql`:
        ```prisma
        datasource db {
          provider = "postgresql"
          url      = env("DATABASE_URL")
        }
        ```
5.  **Ubah File `.env` Lokal**:
    -   Buka file `backend/.env`.
    -   Ganti nilai `DATABASE_URL` yang lama dengan **External Database URL** yang Anda salin dari Render.
6.  **Buat Migrasi Baru**:
    -   Jalankan perintah berikut di direktori `backend` untuk membuat migrasi yang sesuai dengan PostgreSQL:
        ```bash
        npx prisma migrate dev --name "init-postgres"
        ```
    -   Commit dan push semua perubahan ini ke repositori GitHub Anda.

---

## Langkah 2: Deploy Backend ke Render

1.  **Buat Web Service Baru**:
    -   Di dashboard Render, klik "New" -> "Web Service".
    -   Pilih repositori GitHub Anda.
2.  **Konfigurasi Service**:
    -   **Name**: Beri nama unik (misal: `api-registrasi-kelas`).
    -   **Root Directory**: `backend`
    -   **Build Command**: `npm install`
    -   **Start Command**: `npm start`
3.  **Tambahkan Environment Variables**:
    -   Klik tab "Environment".
    -   Tambahkan dua variabel:
        -   **Key**: `DATABASE_URL`
            -   **Value**: Pilih dari dropdown yang ada. Render akan otomatis menawarkan URL dari database PostgreSQL yang sudah Anda buat sebelumnya (pilih yang **Internal**).
        -   **Key**: `JWT_SECRET`
            -   **Value**: Buat sebuah string rahasia yang acak dan panjang (misal: `RahasiaSuperPentingJanganDisebar`).
4.  **Deploy**:
    -   Klik "Create Web Service". Render akan otomatis memulai proses build dan deploy.
    -   Setelah selesai, catat URL backend Anda (misal: `https://api-registrasi-kelas.onrender.com`).

---

## Langkah 3: Deploy Frontend ke Vercel

1.  **Buat Akun Vercel**: Daftar dan login ke [https://vercel.com/](https://vercel.com/) menggunakan akun GitHub Anda.
2.  **Impor Proyek Baru**:
    -   Di dashboard Vercel, klik "Add New..." -> "Project".
    -   Pilih repositori GitHub Anda.
3.  **Konfigurasi Proyek**:
    -   Vercel biasanya otomatis mendeteksi bahwa ini adalah aplikasi React (`Create React App`).
    -   Buka bagian "Build & Development Settings". Pastikan konfigurasinya benar:
        -   **Root Directory**: `frontend`
    -   Buka bagian "Environment Variables".
4.  **Tambahkan Environment Variable**:
    -   **Key**: `REACT_APP_API_URL`
    -   **Value**: Masukkan **URL backend Anda dari Render** yang sudah di-deploy (misal: `https://api-registrasi-kelas.onrender.com/api`).
5.  **Deploy**:
    -   Klik "Deploy". Vercel akan memulai proses build dan deployment.
    -   Setelah selesai, aplikasi Anda akan live dan bisa diakses di seluruh dunia!
