![header](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%208&section=header&reversal=false&textBg=false&fontAlign=70&fontAlignY=30&animation=fadeIn&rotate=20&desc=MongoDB%20and%20Node.js&descAlign=55&descAlignY=45)

---

# Laporan Mingguan

**Nama:** Dzaki Sultan Rabbani<br>
**NIM:** 23343035<br>
**Kelas:** Informatika — Universitas Negeri Padang<br>
**Minggu ke:** 10<br>
**Tanggal:** 30 Desember 2025

---

## 1. Fokus & Tujuan

**Fokus minggu ini:** Penggunaan MongoDB (NoSQL) dengan Node.js untuk operasi CRUD.

**Tujuan pembelajaran:**

- Memahami perbedaan SQL vs NoSQL dan kapan menggunakan MongoDB
- Membangun dan mengoperasikan database MongoDB lokal (menggunakan `mongodb` driver)
- Mengimplementasikan operasi CRUD (Insert, Read, Update, Delete) menggunakan Node.js
- Mempraktikkan penanganan error, penggunaan `ObjectId`, dan environment variables untuk konfigurasi

---

## 2. Konsep Pemrograman Jaringan (WAJIB!)

**1. Perbedaan SQL vs NoSQL (MongoDB)**

SQL dan NoSQL melayani kebutuhan penyimpanan data yang berbeda. SQL (relasional) menggunakan skema tetap dan tabel yang terstruktur, cocok untuk aplikasi yang memerlukan konsistensi data dan transaksi kompleks. Sebaliknya, MongoDB sebagai contoh dokumen‑oriented NoSQL menyimpan data dalam dokumen JSON/BSON yang fleksibel, sehingga lebih mudah menampung variasi struktur data dan mendukung skalabilitas horizontal—fitur yang bermanfaat untuk aplikasi media sosial, sistem logging, atau platform IoT.

**2. Document Database & `ObjectId`**

Dalam MongoDB, setiap dokumen adalah unit data yang dapat memiliki struktur berbeda antara satu dokumen dengan yang lain, sehingga pengembangan dan perubahan skema menjadi lebih mudah. `_id` default pada dokumen biasanya berupa `ObjectId`, nilai 12-byte yang tidak hanya menjamin keunikan tetapi juga menyimpan timestamp pembuatan; ini berguna untuk tracking, indexing, dan operasi lookup berdasarkan waktu.

**3. Client-Server & Connection URI**

Aplikasi Node.js berperan sebagai client yang menyambung ke server MongoDB melalui connection URI (mis. `mongodb://127.0.0.1:27017`), sehingga konfigurasi koneksi dan pengelolaan kredensial sangat krusial. Di lingkungan development biasanya digunakan URI lokal, sementara di produksi connection string berisi detail autentikasi dan opsi keamanan (TLS, replica set, dsb.); `MongoClient` mengurus lifecycle koneksi, autentikasi, serta eksekusi query dan operasi CRUD.

---

## 3. Diagram Arsitektur

```
User / CLI (Node.js scripts)
   ┌────────────────────────────────────┐
   │ node insertDocument.js              │
   │ node readDocument.js                │
   │ node updateDocument.js              │
   │ node deleteDocument.js              │
   └────────────────────────────────────┘
                │
                │ TCP (mongodb://127.0.0.1:27017)
                ▼
        ┌───────────────────┐
        │   MongoDB Server  │
        │ (mongod - local)  │
        └───────────────────┘
                ▲
                │
        MongoDB Compass (GUI) / Studio3T
```

**Alur Eksekusi:**

1. Jalankan script Node.js (seperti `node insertDocument.js`).
2. Script membuka koneksi ke MongoDB (`MongoClient.connect`).
3. Lakukan operasi CRUD pada collection (`user`, `task`).
4. Tutup koneksi.

---

## 4. Implementasi & Pekerjaan yang Diselesaikan

**Fitur yang Diimplementasikan**

- **Setup environment** menggunakan `.env` (variabel `MONGODB_URL`)
- **Koneksi ke MongoDB** dengan `MongoClient` dari package `mongodb`
- **Insert Document** (`insertDocument.js`) — insertOne & insertMany
- **Read Document** (`readDocument.js`) — `findOne`, `find(...).toArray()`
- **Update Document** (`updateDocument.js`) — `updateOne` (menggunakan `$set`)
- **Delete Document** (`deleteDocument.js`) — `deleteOne`

**Contoh potongan kode penting**

- Koneksi & pemilihan DB:

```javascript
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = "taskManager";

await client.connect();
const db = client.db(dbName);
```

- Insert satu dokumen (dari `insertDocument.js`):

```javascript
const { insertedId: userId } = await users.insertOne({
  _id: id,
  nama: "Dzaki",
  usia: 21,
});
```

- Read by name dan by \_id (dari `readDocument.js`):

```javascript
const user = await users.findOne({ nama: userName });
const userById = await users.findOne({
  _id: new ObjectId("6953893609272a35fd5bdfe6"),
});
```

- Update one (dari `updateDocument.js`):

```javascript
const result = await users.updateOne(
  { nama: "Dzaki" },
  { $set: { nama: "Dzaki Sultan Rabbani" } }
);
console.log(`${result.matchedCount} matched, ${result.modifiedCount} modified`);
```

- Delete one (dari `deleteDocument.js`):

```javascript
const deleteResult = await tasks.deleteOne({ deskripsi: "memasak nasi" });
```

**Catatan teknis:** Semua script menggunakan `async/await` dengan `try/catch/finally` untuk penanganan error dan menutup koneksi `client.close()`.

---

## 5. Kendala, Solusi & Pembelajaran

**1. Kendala: Variabel environment tidak di-set**

- **Masalah:** Script tidak bisa connect karena `MONGODB_URL` tidak ditemukan.
- **Penyebab:** `.env` belum dibuat atau belum memuat `MONGODB_URL`.
- **Solusi:** Tambahkan file `.env` dengan isi `MONGODB_URL=mongodb://127.0.0.1:27017` dan gunakan `require('dotenv').config()`.
- **Pembelajaran:** Konfigurasi aman via environment variable penting untuk menghindari hardcoded credentials.

**2. Kendala: Salah penggunaan `ObjectId`**

- **Masalah:** Pencarian by `_id` gagal karena ID bukan instance `ObjectId`.
- **Penyebab:** Mengirim string literal ke query tanpa mengkonversi ke `ObjectId`.
- **Solusi:** Gunakan `new ObjectId('hexstring')` saat mencari by `_id`.
- **Pembelajaran:** Perhatikan tipe data saat query di MongoDB.

**3. Kendala: Koneksi tidak ditutup pada error**

- **Masalah:** Proses tetap hidup karena koneksi tidak ditutup.
- **Penyebab:** Tidak menutup client di blok `finally`.
- **Solusi:** Pastikan `await client.close()` di `finally` atau gunakan `client.close()` di `.finally()` chain.
- **Pembelajaran:** Resource cleanup wajib untuk menghindari memory leak.

---

## 6. Testing & Validasi

**Cara menjalankan:**

- `node insertDocument.js`
- `node readDocument.js`
- `node updateDocument.js`
- `node deleteDocument.js`

### Tabel Test Case

| No  | Test Case               | Input                           | Expected                            | Actual                              | Status |
| --- | ----------------------- | ------------------------------- | ----------------------------------- | ----------------------------------- | ------ |
| 1   | Insert user             | N/A (script)                    | User tersimpan di collection `user` | Console: "User dimasukkan..."       |        |
| 2   | Insert tasks (multiple) | N/A                             | 3 dokumen di `task`                 | Console: "Tasks inserted: 3"        |        |
| 3   | Read by name            | `"Dzaki"`                       | Return document user                | Console: object user                |        |
| 4   | Read by \_id            | valid ObjectId                  | Return document                     | Bila id valid => (pass) else (fail) |        |
| 5   | Update name             | filter `{ nama: 'Dzaki' }`      | `modifiedCount` 1                   | Console: shows matched & modified   |        |
| 6   | Delete task             | `{ deskripsi: 'memasak nasi' }` | `deletedCount === 1`                | Console: success message            |        |
| 7   | Invalid connection      | wrong URL                       | Error / exception                   | Error thrown, handled by catch      |        |

**Edge cases:**

- Pencarian dengan id invalid => lempar error atau tidak ditemukan
- Duplicate document — saat perlu unik gunakan index atau cek sebelum insert

---

## 8. Referensi

- Modul & Jobsheet Minggu 8 (MongoDB + Node.js)
- MongoDB Node driver docs: https://mongodb.github.io/node-mongodb-native/
- MongoDB Manual: https://docs.mongodb.com/

---

> **Catatan:** Semua script CRUD ada di folder `week-11/task-manager` — `insertDocument.js`, `readDocument.js`, `updateDocument.js`, `deleteDocument.js`. Pastikan `MONGODB_URL` di file `.env` diisi (contoh: `MONGODB_URL=mongodb://127.0.0.1:27017`) sebelum menjalankan script.

---
