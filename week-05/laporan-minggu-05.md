![header](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%202&section=header&reversal=false&textBg=false&fontAlign=70&fontAlignY=30&animation=fadeIn&rotate=20&desc=Node.js%20Module%20System%20and%20Args&descAlign=55&descAlignY=45)

---

# Laporan Mingguan

**Nama:** Dzaki Sultan Rabbani<br>
**NIM:** 23343035<br>
**Kelas:** Informatika — Universitas Negeri Padang<br>
**Minggu ke:** 5<br>
**Tanggal:** 29 Sep 2025 - 6 Okt 2025

---

## 1. Fokus & Tujuan

**Fokus minggu ini:** Sistem Modul Node.js dan Pengembangan Aplikasi CLI (Command-Line Interface)

**Tujuan pembelajaran:**

-   Memahami sistem modul Node.js (module.exports dan require) untuk pemrograman modular
-   Mengimplementasikan aplikasi CLI dengan parsing argumen menggunakan Yargs
-   Menguasai operasi File I/O untuk penyimpanan data persisten dengan JSON
-   Membandingkan berbagai pola modul dan praktik terbaik dalam organisasi kode

---

## 2. Konsep Pemrograman Jaringan (WAJIB!)

### 2.1 Sistem Modul Node.js

**Definisi:**

Sistem Modul Node.js adalah mekanisme untuk mengorganisir kode menjadi file-file terpisah yang dapat saling berkomunikasi melalui `module.exports` dan `require()`. Setiap file dalam Node.js adalah modul yang memiliki scope tersendiri, mencegah tabrakan variabel dan memungkinkan penggunaan ulang kode.

**Mengapa Penting:**

Dalam pemrograman jaringan, aplikasi sering memiliki banyak komponen yang kompleks (routing, operasi database, handler API, dll). Sistem modul memungkinkan:

-   **Pemisahan tanggung jawab:** Setiap modul menangani satu tanggung jawab spesifik
-   **Kemudahan pemeliharaan:** Lebih mudah untuk debugging dan update komponen individual
-   **Penggunaan ulang:** Modul dapat digunakan di berbagai proyek
-   **Manajemen dependensi:** Visualisasi yang jelas tentang ketergantungan antar modul

**Cara Kerja:**

1. **Pembuatan modul:** File JavaScript dengan kode yang di-export melalui `module.exports`
2. **Pemuatan modul:** File lain meng-import dengan `require('./path/to/module')`
3. **Caching:** Node.js meng-cache modul setelah pertama kali dimuat (pola singleton)
4. **Isolasi scope:** Variabel dalam modul tidak mencemari global scope

```javascript
// catatan.js - Exporting module
const simpanCatatan = function (data) {
	/* ... */
};
module.exports = { simpanCatatan };

// app.js - Importing module
const catatan = require("./catatan.js");
catatan.simpanCatatan(data); // Menggunakan fungsi yang di-export
```

**Use Case:**

-   **Web server:** Memisahkan routes, controllers, models, dan middleware
-   **API client:** Modul terpisah untuk berbagai endpoint API
-   **Microservices:** Setiap service sebagai modul independen dengan interface yang jelas
-   **Library dan framework:** Express.js, Socket.io, dll menggunakan sistem modul untuk extensibility

---

### 2.2 Pengembangan Command-Line Interface (CLI)

**Definisi:**

Pengembangan CLI adalah pembuatan aplikasi yang dioperasikan melalui terminal/command-line dengan perintah dan argumen berbasis teks. Dalam Node.js, ini melibatkan parsing `process.argv` untuk mendapatkan input pengguna dari command line.

**Mengapa Penting:**

Tool CLI adalah fondasi dari banyak developer tool dan script otomasi dalam ekosistem jaringan:

-   **Otomasi DevOps:** Script deployment, manajemen server
-   **Utilitas jaringan:** ping, curl, ssh—semuanya adalah tool CLI
-   **Build tool:** npm, webpack, git—semuanya berbasis command-line
-   **Testing dan debugging:** Tool testing command-line, analisis log

**Cara Kerja:**

1. **Process.argv:** Node.js menyimpan argumen command-line dalam array `process.argv`
    - Index 0: Path ke executable Node.js
    - Index 1: Path ke file script
    - Index 2+: Argumen yang diberikan pengguna
2. **Parsing argumen:** Library seperti Yargs mem-parse argumen menjadi data terstruktur
3. **Routing perintah:** Berdasarkan argumen yang di-parse, aplikasi menjalankan fungsi yang sesuai
4. **Output:** Hasil dicetak ke stdout/stderr

```javascript
// Basic: node app.js tambah --judul="Test" --isi="Content"
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
	.command({
		command: "tambah",
		builder: { judul: { demandOption: true } },
		handler: argv => console.log(argv.judul),
	})
	.parse();
```

**Use Case:**

-   **Manajemen server:** `pm2 start server.js`, `docker compose up`
-   **Tool database:** `mysql -u root -p`, `mongo --host localhost`
-   **Testing API:** `curl -X POST https://api.example.com/data`
-   **Diagnostik jaringan:** `netstat -an`, `nslookup domain.com`

---

### 2.3 File I/O dan Persistensi Data

**Definisi:**

File I/O (Input/Output) adalah operasi membaca dan menulis data ke/dari sistem file. Dalam konteks aplikasi, ini digunakan untuk penyimpanan persisten—menyimpan data yang tetap ada bahkan setelah aplikasi ditutup.

**Mengapa Penting:**

Dalam pemrograman jaringan dan aplikasi server:

-   **Manajemen konfigurasi:** Config server, API key, kredensial database
-   **Logging:** Log error, log akses, audit trail untuk monitoring
-   **Caching:** Menyimpan response API untuk mengurangi panggilan jaringan
-   **Penyimpanan session:** Session pengguna, data sementara sebelum commit ke database
-   **Pertukaran data:** File JSON/XML sebagai format pertukaran data antar sistem

**Cara Kerja:**

Node.js menyediakan modul `fs` dengan metode synchronous dan asynchronous:

-   **Synchronous (blocking):** `fs.readFileSync()`, `fs.writeFileSync()`—memblokir eksekusi sampai operasi selesai
-   **Asynchronous (non-blocking):** `fs.readFile()`, `fs.writeFile()`—menggunakan callback, tidak memblokir eksekusi

```javascript
const fs = require("fs");

// Menulis data JSON
const data = [{ judul: "Test", isi: "Content" }];
fs.writeFileSync("catatan.json", JSON.stringify(data, null, 2));

// Membaca data JSON dengan error handling
try {
	const buffer = fs.readFileSync("catatan.json");
	const parsed = JSON.parse(buffer.toString());
} catch (e) {
	// File tidak ada, return array kosong
	return [];
}
```

**Use Case:**

-   **Web server:** Log akses, log error untuk troubleshooting
-   **Layanan API:** Cache response dalam file untuk request berikutnya yang lebih cepat
-   **Konfigurasi:** File `.env` untuk pengaturan spesifik environment
-   **Export data:** Generate laporan CSV/JSON dari query database

---

### 2.4 Diagram Arsitektur

```
┌──────────────────────────────────────────────────────────────┐
│                    Arsitektur Aplikasi CLI                   │
└──────────────────────────────────────────────────────────────┘
                    Input Penguna (T erminal)
                                 │
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────┐
│                             app.js                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Konfigurasi Yargs & Routing Perintah                  │  │
│  │  • command: tambah → handler: catatan.tambahCatatan()  │  │
│  │  • command: hapus  → handler: catatan.hapusCatatan()   │  │
│  │  • command: list   → handler: catatan.listCatatan()    │  │
│  │  • command: baca   → handler: catatan.bacaCatatan()    │  │
│  └─────────────┬──────────────────────────────────────────┘  │
└────────────────┼─────────────────────────────────────────────┘
                 │ require('./catatan.js')
                 ▼
┌──────────────────────────────────────────────────────────────┐
│                        catatan.js (Modul)                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Fungsi yang Di-export (Logika Bisnis)                 │  │
│  │  • tambahCatatan(judul, isi)                           │  │
│  │  • hapusCatatan(judul)                                 │  │
│  │  • listCatatan()                                       │  │
│  │  • bacaCatatan(judul)                                  │  │
│  └─────────┬──────────────────────────────────────────────┘  │
│            │                                                 │
│  ┌─────────▼──────────────────────────────────────────────┐  │
│  │  Fungsi Helper Internal (Private)                      │  │
│  │  • muatCatatan() - Membaca dari file                   │  │
│  │  • simpanCatatan(data) - Menulis ke file               │  │
│  └─────────┬──────────────────────────────────────────────┘  │
└────────────┼─────────────────────────────────────────────────┘
             │ fs.readFileSync / fs.writeFileSync
             ▼
┌──────────────────────────────────────────────────────────────┐
│                      catatan.json (Storage)                  │
│  [                                                           │
│    { "judul": "Catatan 1", "isi": "Isi catatan 1" },         │
│    { "judul": "Catatan 2", "isi": "Isi catatan 2" }          │
│  ]                                                           │
└──────────────────────────────────────────────────────────────┘
```

**Alur Eksekusi:**

1. **Input pengguna:** `node app.js tambah --judul="Meeting Notes" --isi="Discuss project"`
2. **Parsing Yargs:** Argumen di-parse menjadi objek `{ judul: "Meeting Notes", isi: "Discuss project" }`
3. **Routing perintah:** Yargs memanggil fungsi handler `catatan.tambahCatatan()`
4. **Memuat data existing:** `muatCatatan()` membaca dari `catatan.json`, mengembalikan array of objects
5. **Validasi:** Cek duplikasi judul dengan method `filter()`
6. **Manipulasi data:** Push objek baru ke array jika unik
7. **Simpan ke file:** `simpanCatatan()` menulis array yang diperbarui ke `catatan.json` dengan format pretty-print
8. **Feedback pengguna:** Console.log pesan sukses/error

---

## 3. Implementasi

### Fitur yang Diimplementasikan

-   ✅ **Arsitektur modular:** Pemisahan logika CLI (app.js) dan logika bisnis (catatan.js)
-   ✅ **Integrasi Yargs:** Registrasi perintah yang proper dengan builder dan handler
-   ✅ **Operasi CRUD:** Create, Read, Update (implisit), Delete untuk manajemen catatan
-   ✅ **Pencegahan duplikasi:** Validasi keunikan judul sebelum insert
-   ✅ **Persistensi berbasis file:** Penyimpanan JSON dengan error handling untuk file yang tidak ada
-   ✅ **Pretty-print JSON:** Output terformat dengan indentasi untuk kemudahan pembacaan

### Potongan Kode Penting

**1. Pola Export Modul (catatan.js):**

```javascript
// Fungsi helper private (tidak di-export)
const muatCatatan = function () {
	try {
		const dataBuffer = fs.readFileSync("catatan.json");
		return JSON.parse(dataBuffer.toString());
	} catch (e) {
		return []; // File tidak ada → return array kosong
	}
};

const simpanCatatan = function (catatan) {
	const dataJson = JSON.stringify(catatan, null, 2); // Pretty-print dengan indent 2 spasi
	fs.writeFileSync("catatan.json", dataJson, "utf8");
};

// API publik (di-export untuk digunakan modul lain)
module.exports = {
	tambahCatatan: tambahCatatan,
	hapusCatatan: hapusCatatan,
	listCatatan: listCatatan,
	bacaCatatan: bacaCatatan,
	ambilCatatan: muatCatatan, // Expose fungsi baca dengan nama berbeda
};
```

**Penjelasan:**
Ini mendemonstrasikan **enkapsulasi** dalam sistem modul. Fungsi `muatCatatan` dan `simpanCatatan` adalah **helper private**—hanya digunakan secara internal dalam modul. API publik yang di-export memiliki interface yang jelas untuk penggunaan eksternal. Pola ini sama dengan metode private/public di OOP, memungkinkan perubahan implementasi internal tanpa merusak kode eksternal.

**2. Registrasi Perintah Yargs dengan hideBin (app.js):**

```javascript
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argvBuilder = yargs(hideBin(process.argv));

argvBuilder.command({
	command: "tambah",
	describe: "tambah sebuah catatan baru",
	builder: {
		judul: {
			describe: "Judul catatan",
			demandOption: true, // Argumen wajib
			type: "string",
		},
		isi: {
			describe: "Isi catatan",
			demandOption: true,
			type: "string",
		},
	},
	handler: function (argv) {
		catatan.tambahCatatan(argv.judul, argv.isi);
	},
});

argvBuilder.parse(); // Jalankan parsing & routing
```

**Penjelasan:**
`hideBin(process.argv)` adalah praktik terbaik untuk Yargs v17+. Fungsi ini **menghapus 2 elemen pertama** dari `process.argv` (path executable node dan path script), menyisakan hanya argumen pengguna. Ini penting karena:

-   Membuat indexing argumen konsisten
-   Mencegah kebingungan dengan path sistem
-   Praktik standar untuk tool CLI di ekosistem Node.js

`demandOption: true` memastikan argumen wajib—jika pengguna tidak memberikan, Yargs otomatis menampilkan pesan error dan bantuan penggunaan.

**3. Deteksi Duplikasi dengan Array Filter (catatan.js):**

```javascript
const tambahCatatan = function (judul, isi) {
	const catatan = muatCatatan();

	// Filter mengembalikan array BARU dengan elemen yang lolos tes
	const catatanGanda = catatan.filter(function (note) {
		return note.judul === judul;
	});

	if (catatanGanda.length === 0) {
		// Judul unik
		catatan.push({ judul: judul, isi: isi });
		simpanCatatan(catatan);
		console.log("catatan baru berhasil disimpan");
	} else {
		console.log("judul catatan telah dipakai");
	}
};
```

**Penjelasan:**
Menggunakan `filter()` untuk pengecekan duplikasi adalah **pendekatan functional programming**. Alternatif lain menggunakan `find()` atau loop, tapi `filter()` lebih deklaratif dan intent-nya lebih jelas. Dalam sistem database, ini setara dengan constraint `UNIQUE`—mencegah entri duplikat berdasarkan field tertentu.

**4. Operasi Delete dengan Filter (catatan.js):**

```javascript
const hapusCatatan = function (judul) {
	const catatan = muatCatatan();

	// Simpan semua catatan KECUALI yang cocok dengan judul
	const catatanTetap = catatan.filter(function (note) {
		return note.judul !== judul; // Negasi: simpan yang TIDAK cocok
	});

	// Cek apakah ada yang dihapus dengan membandingkan panjang array
	if (catatanTetap.length < catatan.length) {
		simpanCatatan(catatanTetap);
		console.log("catatan berhasil dihapus");
	} else {
		console.log("judul tidak ditemukan");
	}
};
```

**Penjelasan:**
Operasi delete menggunakan **filter dengan negasi**—simpan semua kecuali target. Ini adalah pendekatan immutable (buat array baru daripada mengubah yang asli). Dalam sistem terdistribusi dan database, immutability penting untuk:

-   Keamanan concurrency (operasi ganda tidak saling mengganggu)
-   Kemampuan rollback (data asli tersimpan)
-   Audit trail (lacak apa yang dihapus)

---

## 4. Kendala & Solusi

**1. Inkompatibilitas Pola Import Yargs**

-   **Masalah:** Ketika menjalankan `node app.js tambah --judul="Test" --isi="Content"`, tidak ada output sama sekali. Perintah tidak ter-registrasi dan handler tidak dijalankan.

-   **Penyebab:** Kode awal menggunakan `const yargs = require('yargs')()` yang merupakan pola lama untuk Yargs v16 dan sebelumnya. Dengan Yargs v17+, pola ini tidak menginisialisasi argument builder dengan benar, menyebabkan metode seperti `command()` dan `parse()` undefined atau tidak bekerja dengan benar.

-   **Solusi:**

    ```javascript
    // ❌ Pola lama (tidak bekerja di Yargs v17+)
    const yargs = require("yargs")();

    // ✅ Pola baru (benar untuk Yargs v17+)
    const yargs = require("yargs/yargs");
    const { hideBin } = require("yargs/helpers");
    const argvBuilder = yargs(hideBin(process.argv));
    ```

    Langkah yang dilakukan:

    1. Import submodul `yargs/yargs` daripada modul utama
    2. Import helper `hideBin` dari `yargs/helpers`
    3. Inisialisasi dengan `yargs(hideBin(process.argv))` untuk parsing argumen yang benar
    4. Update semua registrasi perintah untuk menggunakan variabel `argvBuilder`

-   **Pembelajaran:**
    -   **Kompatibilitas versi penting:** Versi berbeda dari library dapat memiliki breaking change dalam API
    -   **Baca release note:** Yargs v17 memperkenalkan breaking change—selalu cek CHANGELOG
    -   **Praktik terbaik:** Gunakan package-lock.json atau yarn.lock untuk versi konsisten di berbagai environment
    -   Dalam sistem produksi, ketidakcocokan versi dapat menyebabkan kegagalan kritis—pipeline CI/CD harus testing dengan versi yang sama persis yang akan di-deploy

---

**2. Ketidakcocokan Nama Properti di Fungsi Filter**

-   **Masalah:** Deteksi duplikasi tidak bekerja—aplikasi mengizinkan beberapa catatan dengan judul yang sama. Output debug menunjukkan fungsi filter mengembalikan array kosong meskipun duplikat ada.

-   **Penyebab:** Kode memeriksa `note.title === judul` tetapi objek JSON menggunakan nama properti `judul` (Bahasa Indonesia). Akses properti JavaScript bersifat **case-sensitive dan harus exact match**—`note.title` mengembalikan `undefined`, sehingga perbandingan selalu false.

    ```javascript
    // ❌ Salah: mengakses properti yang tidak ada
    catatan.filter(function (note) {
    	return note.title === judul; // note.title adalah undefined!
    });

    // ✅ Benar: mengakses nama properti yang sebenarnya
    catatan.filter(function (note) {
    	return note.judul === judul; // note.judul ada
    });
    ```

-   **Solusi:**

    1. Review struktur JSON di `catatan.json` untuk memverifikasi nama properti sebenarnya
    2. Update fungsi filter untuk menggunakan properti yang benar: `note.judul`
    3. Tambahkan console.log debugging untuk memverifikasi struktur data sebelum operasi
    4. Tetapkan konvensi penamaan yang konsisten untuk mencegah ketidakcocokan di masa depan

-   **Pembelajaran:**
    -   **Konsistensi skema krusial:** Dalam API dan database, ketidakcocokan skema adalah sumber bug yang umum
    -   **Manfaat TypeScript:** Sistem tipe TypeScript akan menangkap error ini saat compile time
    -   **Kontrak API:** Dalam microservices, menetapkan kontrak API yang jelas mencegah ketidakcocokan nama properti antar service
    -   **Pentingnya code review:** Jenis bug ini mudah tertangkap dalam peer review

---

**3. Error Sintaks Export Modul**

-   **Masalah:** Error `TypeError: catatan.tambahCatatan is not a function` saat memanggil fungsi dari modul yang diimport.

-   **Penyebab:** Kode export awal menggunakan sintaks yang salah:

    ```javascript
    // ❌ Salah: menggunakan 'this' dalam konteks modul
    module.exports = {
    	tambahCatatan: this.tambahCatatan,
    };
    ```

    Dalam konteks modul Node.js, `this` TIDAK merujuk ke export modul saat ini. `this.tambahCatatan` mengevaluasi ke `undefined`, sehingga objek export berisi nilai `undefined`.

-   **Solusi:**

    ```javascript
    // ✅ Benar: referensi fungsi langsung
    module.exports = {
    	tambahCatatan: tambahCatatan, // Referensi fungsi yang sebenarnya
    	hapusCatatan: hapusCatatan,
    	listCatatan: listCatatan,
    	bacaCatatan: bacaCatatan,
    };
    ```

    Alternatif dengan shorthand ES6 (jika nama fungsi cocok dengan nama export):

    ```javascript
    module.exports = {
    	tambahCatatan,
    	hapusCatatan,
    	listCatatan,
    	bacaCatatan,
    };
    ```

-   **Pembelajaran:**

    -   **Pemahaman scope modul:** `this` dalam modul Node.js tidak berperilaku seperti metode objek—ia merujuk ke objek `module.exports`, bukan scope saat ini
    -   **ES6 modules vs CommonJS:** Modul ES6 modern (`export`/`import`) memiliki sintaks yang lebih jelas dan mengurangi kebingungan
    -   **Testing export:** Selalu test export modul segera setelah pembuatan untuk menangkap masalah interface lebih awal
    -   Dalam arsitektur microservices, export fungsi yang salah dapat menyebabkan kegagalan komunikasi antar service

---

## 5. Testing

### Test Cases

| No  | Test Case              | Input                                                 | Expected Output                 | Actual Result                                    | Status |
| --- | ---------------------- | ----------------------------------------------------- | ------------------------------- | ------------------------------------------------ | ------ |
| 1   | Add valid note         | `tambah --judul="Test" --isi="Content"`               | Success message + saved to file | "catatan baru berhasil disimpan"                 | ✅     |
| 2   | Add duplicate title    | `tambah --judul="Test" --isi="Different"`             | Error: title already used       | "judul catatan telah dipakai"                    | ✅     |
| 3   | List all notes         | `list`                                                | Show count + numbered list      | "Menampilkan 2 catatan<br>1. Test<br>2. Meeting" | ✅     |
| 4   | Read existing note     | `baca --judul="Test"`                                 | Display title + content         | "Judul: Test<br>Isi: Content"                    | ✅     |
| 5   | Read non-existent note | `baca --judul="NonExistent"`                          | Error: not found                | "Catatan tidak ditemukan"                        | ✅     |
| 6   | Delete existing note   | `hapus --judul="Test"`                                | Success message + removed       | "catatan berhasil dihapus"                       | ✅     |
| 7   | Delete non-existent    | `hapus --judul="NonExistent"`                         | Error: not found                | "judul tidak ditemukan"                          | ✅     |
| 8   | Missing required args  | `tambah --judul="Test"` (no --isi)                    | Yargs error + usage help        | Error shown by Yargs                             | ✅     |
| 9   | Empty JSON file case   | Delete catatan.json, run `list`                       | "Menampilkan 0 catatan"         | Works (fallback to [])                           | ✅     |
| 10  | Special characters     | `tambah --judul="Test!@#" --isi="Special chars: üöä"` | Save successfully               | Saved correctly                                  | ✅     |

### Edge Cases Tested

**1. Skenario file tidak ditemukan:**

-   **Problem:** Pertama kali menjalankan aplikasi, `catatan.json` belum ada
-   **Perilaku saat ini:** `muatCatatan()` menangkap error dan mengembalikan array kosong `[]`
-   **Hasil:** ✅ Aplikasi bekerja dengan lancar—pengguna tidak perlu membuat file secara manual

**2. Modifikasi konkuren:**

-   **Problem:** Jika beberapa proses memodifikasi `catatan.json` secara bersamaan, kemungkinan terjadi korupsi data
-   **Perilaku saat ini:** Operasi fs synchronous—tulisan terakhir yang menang (potensi kehilangan data)
-   **Perbaikan yang dibutuhkan:** Implementasi file locking atau migrasi ke database untuk penggunaan produksi

**3. Performa dataset besar:**

-   **Test:** Menambahkan 1000 catatan untuk test performa
-   **Hasil:** Operasi filter melambat secara signifikan (kompleksitas O(n) per operasi)
-   **Perbaikan:** Untuk dataset besar, database dengan indexing akan diperlukan

**4. Malformasi JSON:**

-   **Test:** Merusak `catatan.json` secara manual dengan sintaks JSON yang invalid
-   **Hasil:** ✅ Try-catch menangani dengan baik—mengembalikan array kosong dan aplikasi terus berjalan
-   **Ke depan:** Tambahkan validasi atau mekanisme backup untuk memulihkan data yang rusak

### Output Screenshots & Examples

**Test Run 1: Alur CRUD Lengkap**

```bash
$ node app.js tambah --judul="Meeting Notes" --isi="Discuss project timeline and milestones"
catatan baru berhasil disimpan

$ node app.js tambah --judul="Todo List" --isi="1. Review code 2. Write tests 3. Deploy"
catatan baru berhasil disimpan

$ node app.js list
Menampilkan 2 catatan
1. Meeting Notes
2. Todo List

$ node app.js baca --judul="Meeting Notes"
Judul: Meeting Notes
Isi: Discuss project timeline and milestones

$ node app.js hapus --judul="Todo List"
catatan berhasil dihapus

$ node app.js list
Menampilkan 1 catatan
1. Meeting Notes
```

![output test 1](/assets/images/week-05/week-05-test-run-1.png)

**Test Run 2: Error Handling**

```bash
$ node app.js tambah --judul="Test"
Missing required argument: isi

$ node app.js tambah --judul="Meeting Notes" --isi="Duplicate test"
judul catatan telah dipakai

$ node app.js baca --judul="NonExistent"
Catatan tidak ditemukan

$ node app.js hapus --judul="NonExistent"
judul tidak ditemukan
```

![output test 2](/assets/images/week-05/week-05-test-run-2.png)

**File JSON yang Dihasilkan (catatan.json):**

```json
[
	{
		"judul": "Meeting Notes",
		"isi": "Discuss project timeline and milestones"
	},
	{
		"judul": "Shopping List",
		"isi": "Milk, Eggs, Bread, Coffee"
	}
]
```

![catatan.json](/assets/images/week-05/week-05-catatan-json.png)

---

## 6. Refleksi

### 6.1 Apa yang Saya Pelajari

**Secara Teknis:**

-   **Pentingnya sistem modul:** Sebelumnya saya pikir modul hanya untuk "mengorganisir kode", tapi sekarang paham bahwa batas modul mendefinisikan **kontrak API**. Dalam sistem terdistribusi, ini krusial—setiap service mengekspos interface yang jelas melalui export modul. Desain modul yang buruk = coupling yang ketat = mimpi buruk pemeliharaan.

-   **Keberadaan tool CLI di mana-mana:** Setiap hari saya menggunakan `npm install`, `git commit`, `node app.js`—semuanya adalah tool CLI. Sekarang saya paham **bagaimana mereka bekerja di balik layar**: parsing argumen, routing perintah, formatting output. Ini adalah fondasi untuk otomasi DevOps dan developer tool.

-   **Trade-off Synchronous vs Asynchronous I/O:**
    -   Synchronous (`readFileSync`) = kode lebih sederhana, tapi **memblokir eksekusi**
    -   Untuk tool CLI dengan interaksi manusia, blocking tidak masalah karena pengguna memang menunggu
    -   Untuk server yang menangani request konkuren, blocking = **masalah performa fatal**
    -   Minggu ini menggunakan sync I/O by design (konteks CLI), minggu depan akan menggunakan async untuk operasi jaringan

**Secara Konseptual:**

-   **Pola immutability:** Menggunakan `filter()` untuk membuat array baru daripada mengubah yang asli. Ini adalah pendekatan functional programming—prinsip yang sama digunakan di React (immutable state update) dan Redux. Manfaatnya: debugging lebih mudah, perilaku dapat diprediksi, aman untuk concurrency.

-   **Filosofi error handling:**
    ```javascript
    try {
    	return JSON.parse(fs.readFileSync("catatan.json"));
    } catch (e) {
    	return []; // Graceful degradation
    }
    ```
    Alih-alih crash dengan error, aplikasi memberikan default yang masuk akal. Dalam pemrograman jaringan, ini krusial—kegagalan jaringan itu umum, aplikasi harus **degradasi dengan baik** daripada kegagalan total.

**Hubungan dengan Materi Sebelumnya:**

-   **Week 4 (Dasar Node.js):** Belajar fundamental Node.js → Week 5: Diterapkan ke aplikasi nyata dengan modul
-   **Metode array JavaScript:** `filter()`, `find()`, `forEach()`—sekarang paham kenapa metode fungsional lebih disukai daripada loop imperatif
-   **Fondasi untuk Week 6:** Sistem modul dan pola async yang dipelajari minggu ini akan krusial untuk HTTP request dan integrasi API

---

## E. Resources

-   **Node.js Module Documentation:** [https://nodejs.org/api/modules.html](https://nodejs.org/api/modules.html)
-   **Yargs Documentation:** [https://yargs.js.org/docs/](https://yargs.js.org/docs/)
-   **Node.js File System (fs) Module:** [https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html)
-   **JavaScript Array Methods (MDN):** [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
-   **CommonJS vs ES Modules:** [https://nodejs.org/api/esm.html](https://nodejs.org/api/esm.html)
-   Jobsheet Minggu 5: Node.js Module System and Command-Line Arguments

---

![footer](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%202&section=footer&reversal=false&textBg=false&fontAlign=40&fontAlignY=75&animation=fadeIn&rotate=20&desc=Node.js%20Module%20System%20and%20Args&descAlign=45&descAlignY=85)
