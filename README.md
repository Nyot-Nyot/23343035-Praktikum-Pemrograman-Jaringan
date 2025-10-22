![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Praktikum%20Pemograman%20Jaringan&section=header&fontSize=40&desc=Node.js%20|%20MonggoDB%20|%20Express.js%20|%20Git%20|%20Vercel&descAlignY=57&fontAlignY=45)

👨‍💻 Dzaki Sultan Rabbani — Informatika UNP<br>
📘 Praktikum Pemrograman Jaringan | INF1.62.5010<br>
👨‍🏫 Randi Proska Sandra, S.Pd., M.Sc<br>

---

<br>
<p align="center">
  <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/NodeJS/nodejs1.svg">
  <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Express/express1.svg">
  <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/MongoDB/mongodb1.svg">
  <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Git/git1.svg">
  <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Vercel/vercel1.svg">
</p>

---

<details open>
<summary><h2>1. Deskripsi Umum</h2></summary>

Repositori ini merupakan dokumentasi resmi kegiatan **Praktikum Pemrograman Jaringan**, yang berfokus pada pengembangan aplikasi berbasis jaringan menggunakan **Node.js** dan teknologi pendukungnya.

Seluruh kegiatan praktikum disusun secara berkelanjutan dari minggu ke minggu, dengan tujuan akhir menghasilkan sebuah **aplikasi web berbasis jaringan** yang mengimplementasikan seluruh konsep yang telah dipelajari.

### 1.1 Dokumentasi Pendukung

-   **[Panduan Lengkap Laporan](docs/GUIDE.md)** - Tutorial detail cara mengisi setiap section laporan (WAJIB BACA!)
-   **[Quick Reference](docs/QUICK-REFERENCE.md)** - Cheat sheet cepat untuk pengerjaan laporan
-   **[Template Laporan](docs/!template.md)** - Template kosong untuk copy-paste
-   **[Assets Guide](assets/README.md)** - Panduan penggunaan folder assets

</details>

---

<details>
<summary><h2>2. Capaian Pembelajaran Mata Kuliah (CPMK)</h2></summary>

| No  | Capaian Pembelajaran                                                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Mengidentifikasi dan menjelaskan konsep dasar pemrograman berbasis jaringan serta aplikasinya pada sistem yang bersifat skalabel. |
| 2   | Membedakan pemrograman sinkron dan asinkron, serta memahami konsep I/O blocking dan non-blocking.                                 |
| 3   | Mengimplementasikan bahasa pemrograman **JavaScript** dalam pengembangan aplikasi berbasis jaringan.                              |
| 4   | Menjelaskan mekanisme **HTTP/HTTPS** serta konsep dasar **API**.                                                                  |
| 5   | Merancang **web server** dan **JSON HTTP endpoints** untuk pertukaran data dalam konteks aplikasi berbasis jaringan.              |
| 6   | Memahami penggunaan **Git** untuk version control dan melakukan **deployment** aplikasi.                                          |
| 7   | Membangun **REST API** menggunakan basis data **NoSQL (MongoDB)**.                                                                |
| 8   | Menjelaskan serta merancang mekanisme protokol **SMTP** dan **POP3** dalam pengiriman email.                                      |
| 9   | Mengembangkan aplikasi jaringan dengan komunikasi **real-time** menggunakan **Socket Programming**.                               |

</details>

---

<details open>
<summary><h2>3. Rencana dan Dokumentasi Praktikum</h2></summary>

Laporan praktikum dimulai dari **Week 5** hingga **Week 15**, sedangkan **Week 1–4** merupakan kegiatan eksplorasi mandiri dari sumber luar (tanpa laporan).

| Minggu | Topik Praktikum                                                             | Deskripsi Singkat                                    | Status |
| :----: | --------------------------------------------------------------------------- | ---------------------------------------------------- | :----: |
|  1–4   | Pengantar & JavaScript Essentials                                           | Eksplorasi mandiri konsep dasar Node.js & JavaScript |   —    |
|   5    | [Non-Blocking I/O & Asynchronous Programming](week-05/laporan-minggu-05.md) | Implementasi asynchronous dan sistem modular Node.js |   ✅   |
|   6    | [HTTP Protocol & API](week-06/laporan-minggu-06.md)                         | Dasar komunikasi antara klien dan server             |   ✅   |
|   7    | Web Server & Express.js                                                     | Membangun web server menggunakan Express             |   ⏳   |
|   8    | API Endpoints & Architectural Patterns                                      | Penerapan pola REST, GraphQL, WebSocket, dan WebHook |   ⏳   |
|   9    | Evaluasi Tengah Semester                                                    | Proyek mini untuk menilai pemahaman konsep dasar     |   🔒   |
|   10   | Version Control & App Deployment                                            | Implementasi Git Workflow & deployment aplikasi      |   ⏳   |
|   11   | MongoDB & NoSQL Databases                                                   | Integrasi MongoDB sebagai basis data aplikasi        |   ⏳   |
|   12   | NoSQL Databases (Lanjutan)                                                  | Query lanjutan dan integrasi REST API                |   ⏳   |
|   13   | Protokol Email (SMTP, POP3, IMAP)                                           | Simulasi sistem pengiriman dan penerimaan email      |   ⏳   |
|   14   | Socket Programming                                                          | Implementasi komunikasi real-time berbasis socket    |   ⏳   |
|   15   | Capstone Project                                                            | Integrasi seluruh materi menjadi satu aplikasi utuh  |   🔜   |
|   16   | Ujian Akhir Semester                                                        | Presentasi dan evaluasi hasil akhir proyek           |   🔒   |

</details>

---

<details>
<summary><h2>4. Struktur Repositori</h2></summary>

```
23343035_Praktikum-Pemrograman-Jaringan/
├── docs/
│   ├── !template.md          # Template laporan mingguan (gunakan ini sebagai basis)
│   └── GUIDE.md              # Panduan lengkap mengerjakan laporan (BACA INI!)
├── week-05/
│   ├── laporan-minggu-05.md  # Laporan minggu 5
│   └── buku-catatan/         # Implementasi kode minggu 5
│       ├── app.js
│       ├── catatan.js
│       ├── package.json
│       └── ...
├── week-06/
│   ├── laporan-minggu-06.md  # Laporan minggu 6
│   └── aplikasiCuaca/        # Implementasi kode minggu 6
│       ├── app.js
│       ├── cekCuaca.js
│       ├── package.json
│       └── ...
├── week-XX/
│   ├── laporan-minggu-XX.md  # Laporan mingguan
│   └── [nama-project]/       # Folder implementasi kode
│       └── ...
├── assets/                   # (Optional) Screenshot, diagram, images
│   └── images/
├── README.md                 # File ini - overview repository
├── LICENSE
└── .gitignore
```

**Konvensi Penamaan:**

-   Laporan: `laporan-minggu-XX.md` di root folder `week-XX/`
-   Project folder: Nama deskriptif sesuai topik (misal: `aplikasiCuaca`, `buku-catatan`)
-   Setiap week memiliki struktur mandiri (laporan + kode dalam satu folder)

</details>

---

<details>
<summary><h2>5. Capstone Project</h2></summary>

Pada tahap akhir praktikum, mahasiswa akan mengembangkan **aplikasi web berbasis jaringan** yang mengintegrasikan seluruh materi yang telah dipelajari, meliputi:

-   API modular dengan **Express.js**
-   Integrasi **MongoDB** sebagai database utama
-   Komunikasi **real-time** menggunakan Socket.IO
-   Implementasi **email protocol** dengan Nodemailer
-   Deployment aplikasi ke server publik

</details>

---

<details>
<summary><h2>6. Catatan & Disclaimer</h2></summary>

Repositori ini disusun sebagai bagian dari penilaian mata kuliah **Praktikum Pemrograman Jaringan** (INF1.62.5010) di bawah bimbingan **Randi Proska Sandra, S.Pd., M.Sc**.

Seluruh laporan, kode, dan dokumentasi dibuat dengan tujuan pembelajaran dan pengembangan kompetensi dalam bidang pemrograman jaringan.

</details>

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&height=100&color=gradient&section=footer)

</div>

---
