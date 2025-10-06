![header](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%202&section=header&reversal=false&textBg=false&fontAlign=70&fontAlignY=30&animation=fadeIn&rotate=20&desc=Node.js%20Module%20System%20and%20Args&descAlign=55&descAlignY=45)

---

# 🧾 Laporan Mingguan

**Nama:** Dzaki Sultan Rabbani<br>
**NIM:** 23343035<br>
**Kelas:** Informatika — Universitas Negeri Padang<br>
**Minggu ke:** 5<br>
**Tanggal:** 29 Sep 2025 - 6 Okt 2025<br>

---

## 🎯 Fokus Minggu Ini
Menambahkan dan memperbaiki fitur CLI untuk aplikasi 'buku-catatan' berbasis Node.js: memperbaiki penggunaan yargs, menambahkan fungsionalitas CRUD (tambah, hapus, list, baca) dan memastikan file JSON sebagai penyimpanan bekerja dengan benar.

---

## ⚙️ Pekerjaan yang Diselesaikan
Berikut ringkasan hasil yang dicapai minggu ini:

- Memperbaiki inisialisasi dan penggunaan `yargs` sehingga perintah CLI terdaftar dan handler berjalan.
- Mengimplementasikan fungsi `tambahCatatan`, `hapusCatatan`, `listCatatan`, dan `bacaCatatan` di `catatan.js`.
- Menambahkan perintah CLI pada `app.js`: `tambah`, `hapus --judul`, `list`, dan `baca --judul`.
- Menambahkan skrip test sederhana `testsite/1-jsontest.js` untuk menulis/mengecek JSON.
- Melakukan pengujian manual: menambahkan note, mencoba duplicate, menghapus, listing, dan membaca catatan.

Contoh cuplikan kode (pendaftaran command yargs):
```js
argvBuilder.command({
  command: 'tambah',
  builder: { judul: { demandOption: true }, isi: { demandOption: true } },
  handler(argv) { catatan.tambahCatatan(argv.judul, argv.isi) }
});
```

---

## 🧩 Kendala dan Solusi

- Kendala: Tidak ada output ketika menjalankan `node app.js tambah ...`.
  - Penyebab: Cara import/inisialisasi `yargs` yang tidak kompatibel dengan versi terpasang (`require('yargs')()` vs `require('yargs/yargs')` + `hideBin`). Akibatnya command tidak ter-registrasi atau method `command` tidak tersedia.
  - Solusi: Mengganti pola import menjadi:
    - `const yargs = require('yargs/yargs'); const { hideBin } = require('yargs/helpers'); const argvBuilder = yargs(hideBin(process.argv));`

- Kendala: Bug logika di `catatan.js` (membandingkan `note.title` bukan `note.judul`, ekspor yang salah menggunakan `this`).
  - Solusi: Memperbaiki pengecekan duplikasi menjadi `note.judul === judul`, mengekspor fungsi dengan benar (`ambilCatatan: muatCatatan`) dan menambahkan fungsi baru `hapusCatatan`, `listCatatan`, `bacaCatatan`.

---

## 🧠 Pemahaman Teknis

- Yargs: Saya belajar pola import `yargs/yargs` + `hideBin(process.argv)` untuk membuat builder yang konsisten lintas versi yargs. Ini memastikan `command`, `builder`, dan `parse()` bekerja seperti dokumentasi.
- Node FS: Menggunakan `fs.readFileSync` dan `fs.writeFileSync` untuk menyimpan data ke `catatan.json`. Menambahkan `JSON.stringify(obj, null, 2)` untuk menyimpan JSON yang mudah dibaca.
- Pattern CRUD sederhana: memuat data, melakukan transformasi (filter/push/find), lalu menyimpan kembali; menangani error dengan try/catch dan fallback ke array kosong bila file tidak ada.

---

## 📂 Dokumentasi Pendukung

File yang dibuat/diubah minggu ini:

- week-05/app.js — menambahkan command `tambah`, `hapus`, `list`, `baca` (yargs setup).
- week-05/catatan.js — implementasi CRUD: `tambahCatatan`, `hapusCatatan`, `listCatatan`, `bacaCatatan`, `muatCatatan`, `simpanCatatan`.
- week-05/testsite/1-jsontest.js — helper untuk menulis/mengecek JSON test.
- week-05/catatan.json — file penyimpanan yang dihasilkan oleh aplikasi saat testing.

Perintah yang bisa dijalankan untuk mereproduksi:
```powershell
cd week-05\buku-catatan
node app.js tambah --judul="catatan A" --isi="isi A"
node app.js list
node app.js baca --judul="catatan A"
node app.js hapus --judul="catatan A"
```

Cuplikan output yang terverifikasi:
```
catatan baru berhasil disimpan
Menampilkan 2 catatan
1. catatan A
2. catatan B
Judul: catatan A
Isi: isi A
catatan berhasil dihapus
```

---

**Dibuat oleh:**
_Dzaki Sultan Rabbani — Informatika UNP_
🗓️ 6 Okt 2025

---

![footer](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%202&section=footer&reversal=false&textBg=false&fontAlign=40&fontAlignY=65&animation=fadeIn&rotate=20&desc=Node.js%20Module%20System%20and%20Args&descAlign=50&descAlignY=78)

