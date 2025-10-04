# Sistem Pendaftaran Kelas

Aplikasi web full-stack untuk sistem pendaftaran kelas dengan kuota real-time. Aplikasi ini memungkinkan mahasiswa untuk melihat dan mendaftar ke kelas yang tersedia, sementara admin dapat mengelola kelas dan melihat peserta yang terdaftar.

## Fitur Utama

- **Otentikasi Pengguna:** Sistem login dan registrasi dengan peran (STUDENT, ADMIN).
- **Dashboard Mahasiswa:**
  - Melihat daftar kelas yang tersedia beserta sisa kuota.
  - Mendaftar ke kelas.
  - Melihat daftar kelas yang sudah diambil.
- **Dashboard Admin:**
  - Membuat, Membaca, Mengubah, dan Menghapus (CRUD) data kelas.
  - Mengelola kuota kelas.
  - Melihat daftar peserta untuk setiap kelas.
- **API Backend:** API RESTful yang aman untuk mengelola semua sumber daya aplikasi.

## Teknologi yang Digunakan

**Backend:**
- Node.js
- Express.js
- TypeScript
- Prisma (ORM)
- SQLite
- JSON Web Tokens (JWT) untuk otentikasi
- Jest & Supertest untuk testing

**Frontend:**
- React.js
- TypeScript
- React Router
- Axios
- Bootstrap & React-Bootstrap

## Panduan Instalasi & Menjalankan Proyek

### Prasyarat

- Node.js (v18 atau lebih tinggi)
- NPM

### 1. Backend Setup

Buka terminal baru dan jalankan perintah berikut:

```bash
# Masuk ke direktori backend
cd backend

# Instal dependensi
npm install

# Jalankan migrasi database dengan Prisma
npx prisma migrate dev

# (Opsional) Buat akun admin dengan Prisma Studio
npx prisma studio
# -> Buka model User, cari user Anda, dan ubah 'role' menjadi 'ADMIN'

# Jalankan server backend dalam mode development
npm run dev
```
Server backend akan berjalan di `http://localhost:3001`.

### 2. Frontend Setup

Buka terminal **kedua** (biarkan terminal backend tetap berjalan) dan jalankan perintah berikut:

```bash
# Masuk ke direktori frontend
cd frontend

# Instal dependensi
npm install

# Jalankan aplikasi React
npm start
```

Aplikasi frontend akan terbuka secara otomatis di browser Anda pada alamat `http://localhost:3000`.

## Menjalankan Tes

Untuk menjalankan unit test di backend, gunakan perintah berikut di dalam direktori `backend`:

```bash
npm test
```
