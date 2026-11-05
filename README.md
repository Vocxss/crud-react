# SikolaV5 CRUD

SikolaV5 CRUD adalah simulasi LMS sederhana dengan sudut pandang dosen. Aplikasi
ini dibuat untuk mengelola struktur pembelajaran dalam sebuah mata kuliah,
terdiri dari bab dan materi pembelajaran.

## Fitur utama

- Membuat bab pembelajaran.
- Mengubah informasi bab.
- Menghapus bab melalui dialog konfirmasi.
- Menambahkan materi ke dalam bab.
- Menghapus materi dari bab.
- Memilih kategori materi: `MATERIAL` atau `ASSIGNMENT`.
- Menyimpan data secara lokal menggunakan `localStorage`.
- Tampilan responsif untuk desktop dan perangkat dengan layar lebih kecil.

## Tech stack

- **React 19** untuk membangun antarmuka dan mengelola state.
- **TypeScript** untuk type safety.
- **Vite** sebagai development server dan build tool.
- **Tailwind CSS 4** untuk styling.
- **Lucide React** untuk ikon antarmuka.
- **localStorage** sebagai penyimpanan data pada browser.
- **Oxlint** untuk pemeriksaan kualitas kode.

## Menjalankan proyek

### Prasyarat

- Node.js versi modern atau Bun.
- npm atau Bun sebagai package manager.

### Instalasi

```bash
npm install
```

Jika menggunakan Bun:

```bash
bun install
```

### Development server

Dengan npm:

```bash
npm run dev
```

Dengan Bun:

```bash
bun run dev
```

Setelah server berjalan, buka alamat yang ditampilkan Vite, biasanya
`http://localhost:5173`.

### Production build

```bash
npm run build
```

### Preview hasil build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Cara menggunakan CRUD

1. Jalankan aplikasi menggunakan development server.
2. Jika belum ada data, pilih **Tambah Data** untuk membuat bab pertama.
3. Isi nama dan deskripsi bab, lalu pilih **Submit**.
4. Untuk membuat bab lain, pilih **Tambah Bab Baru**.
5. Untuk mengubah bab, pilih **Edit**, perbarui datanya, lalu pilih **Submit**.
6. Untuk menghapus bab atau materi, pilih tombol **Hapus** dan konfirmasi.
7. Untuk menambahkan materi, pilih **Tambah materi** pada bab yang diinginkan.
8. Isi nama, deskripsi, URL file, dan kategori materi.

## Struktur data dan penyimpanan

Seluruh data disimpan pada `localStorage` browser dengan key `class_data`.
Karena itu, data hanya tersedia pada browser dan origin yang sama. Menghapus
data situs atau menjalankan aplikasi pada browser/origin berbeda dapat membuat
data tidak tersedia lagi.

Pendekatan ini dipilih karena sederhana dan sesuai untuk simulasi CRUD tanpa
backend. Untuk aplikasi produksi, penyimpanan sebaiknya dipindahkan ke API dan
database dengan autentikasi, validasi server, serta dukungan banyak pengguna.

## Struktur proyek

```text
src/
├── components/       # Komponen UI reusable
├── lib/
│   ├── services/     # Operasi CRUD dan localStorage
│   └── types.ts      # Definisi tipe data
├── App.tsx           # Halaman utama dan integrasi fitur
├── index.css         # Konfigurasi Tailwind dan style global
└── main.tsx          # Entry point React
```

## Catatan untuk pengembangan

Project ini berfokus pada demonstrasi frontend CRUD. Belum tersedia backend,
login, sinkronisasi antar pengguna, upload file aktual, atau validasi data
server-side. URL file yang dimasukkan berfungsi sebagai referensi data untuk
materi dan dapat dikembangkan lebih lanjut menjadi fitur upload atau integrasi
penyimpanan eksternal.
