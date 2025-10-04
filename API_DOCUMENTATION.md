# Dokumentasi API: Sistem Pendaftaran Kelas

Dokumen ini menyediakan spesifikasi lengkap untuk semua endpoint API yang tersedia di backend aplikasi.

**Base URL**: `http://localhost:3001/api`

---

## Otentikasi

Semua permintaan ke endpoint yang terproteksi harus menyertakan header `Authorization` dengan `Bearer Token` yang didapat saat login.

Contoh: `Authorization: Bearer <token>`

---

## 1. Auth Endpoints

Endpoint untuk registrasi dan login pengguna.

### `POST /auth/register`

-   **Deskripsi**: Mendaftarkan pengguna baru.
-   **Akses**: Publik
-   **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "name": "Nama Pengguna",
      "password": "password123"
    }
    ```
-   **Success Response (201 Created)**:
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "id": "user_id",
        "name": "Nama Pengguna",
        "email": "user@example.com",
        "role": "STUDENT"
      }
    }
    ```

### `POST /auth/login`

-   **Deskripsi**: Login untuk mendapatkan token otentikasi.
-   **Akses**: Publik
-   **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
-   **Success Response (200 OK)**:
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "id": "user_id",
        "name": "Nama Pengguna",
        "email": "user@example.com",
        "role": "STUDENT"
      }
    }
    ```

---

## 2. Course Endpoints

Endpoint untuk mengelola data kelas.

### `GET /courses`

-   **Deskripsi**: Mendapatkan daftar semua kelas beserta sisa kuota.
-   **Akses**: Terotentikasi (Semua Peran)

### `GET /courses/:id`

-   **Deskripsi**: Mendapatkan detail satu kelas berdasarkan ID.
-   **Akses**: Terotentikasi (Semua Peran)

### `POST /courses`

-   **Deskripsi**: Membuat kelas baru.
-   **Akses**: **Admin**
-   **Request Body**:
    ```json
    {
      "name": "Nama Kelas Baru",
      "description": "Deskripsi singkat kelas.",
      "quota": 30
    }
    ```

### `PUT /courses/:id`

-   **Deskripsi**: Memperbarui data kelas berdasarkan ID.
-   **Akses**: **Admin**
-   **Request Body**: (Sama seperti POST, field bersifat opsional)

### `DELETE /courses/:id`

-   **Deskripsi**: Menghapus kelas berdasarkan ID.
-   **Akses**: **Admin**

### `GET /courses/:id/registrations`

-   **Deskripsi**: Mendapatkan daftar semua peserta yang terdaftar di sebuah kelas.
-   **Akses**: **Admin**

---

## 3. Registration Endpoints

Endpoint untuk pendaftaran kelas oleh mahasiswa.

### `POST /registrations/:courseId/register`

-   **Deskripsi**: Mendaftarkan pengguna saat ini ke sebuah kelas berdasarkan `courseId`.
-   **Akses**: **Student**

### `GET /registrations/my-registrations`

-   **Deskripsi**: Mendapatkan daftar semua kelas yang telah diikuti oleh pengguna saat ini.
-   **Akses**: **Student**

---

## 4. User Endpoints

Endpoint untuk manajemen pengguna.

### `GET /users`

-   **Deskripsi**: Mendapatkan daftar semua pengguna di sistem (tanpa password).
-   **Akses**: **Admin**

---

## 5. Testing Endpoints (Development Only)

Endpoint ini hanya tersedia dalam mode development dan digunakan untuk keperluan E2E testing.

### `POST /testing/reset-user`

-   **Deskripsi**: Menghapus semua data registrasi milik seorang pengguna berdasarkan email.
-   **Akses**: Publik (Hanya di mode Development)
-   **Request Body**:
    ```json
    {
      "email": "hafsah@gmail.com"
    }
    ```
