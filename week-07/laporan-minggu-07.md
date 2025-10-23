![header](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%205&section=header&reversal=false&textBg=false&fontAlign=70&fontAlignY=30&animation=fadeIn&rotate=20&desc=Web%20Server%20dan%20Express.js&descAlign=55&descAlignY=45)

---

# Laporan Mingguan

**Nama:** Dzaki Sultan Rabbani<br>
**NIM:** 23343035<br>
**Kelas:** Informatika — Universitas Negeri Padang<br>
**Minggu ke:** 7<br>
**Tanggal:** 23 Oktober 2025

---

## 1. Fokus & Tujuan

**Fokus minggu ini:** Web Server dan Express.js

**Tujuan pembelajaran:**

-   Memahami cara kerja Web Server dan protokol HTTP.
-   Mengimplementasikan web server sederhana menggunakan Express.js.
-   Mampu menyajikan konten statis (HTML, CSS, JS) dan dinamis (JSON).
-   Memahami konsep routing dan modularisasi dengan Express Router.
-   Menggunakan Handlebars (hbs) sebagai view engine untuk render halaman dinamis.

---

## 2. Konsep Pemrograman Jaringan

**Web Server:**
**Definisi:** Web server adalah perangkat lunak atau perangkat keras yang menyimpan file-file website (HTML, CSS, gambar) dan mengirimkannya ke browser pengguna melalui protokol HTTP. Ia bertugas menerima permintaan (request) dari klien dan memberikan respons yang sesuai.
**Mengapa Penting:** Web server adalah tulang punggung dari World Wide Web. Tanpa web server, tidak ada cara untuk mengakses konten website melalui internet. Dalam pemrograman jaringan, membangun atau berinteraksi dengan web server adalah tugas fundamental.
**Cara Kerja:**

1.  Browser mengirim HTTP request ke alamat IP server (didapat dari DNS).
2.  Web server (misal: Apache, Nginx, atau aplikasi Node.js) menerima request.
3.  Server memproses request: mencari file statis atau menjalankan logika aplikasi untuk menghasilkan konten dinamis.
4.  Server mengirimkan HTTP response kembali ke browser, berisi status code (misal: 200 OK, 404 Not Found) dan konten (HTML, JSON, dll).
    **Use Case:** Menyajikan website perusahaan, hosting API untuk aplikasi mobile, platform streaming video.

**Express.js sebagai Web Framework:**
**Definisi:** Express.js adalah framework minimalis untuk Node.js yang menyederhanakan pembuatan aplikasi web dan API. Ia menyediakan lapisan abstraksi di atas modul `http` bawaan Node.js, sehingga routing, middleware, dan penanganan request/response menjadi lebih mudah.
**Mengapa Penting:** Membuat web server dari nol menggunakan modul `http` Node.js sangatlah kompleks dan rentan error. Express menyediakan struktur dan toolset yang teruji untuk mempercepat pengembangan, menangani routing, dan mengelola middleware dengan efisien.
**Cara Kerja:** Express membungkus `http.createServer` dan menyediakan metode-metode seperti `app.get()`, `app.post()`, `app.use()` untuk mendefinisikan bagaimana server harus merespons berbagai URL dan metode HTTP. Ia juga mempopulerkan konsep middleware, yaitu fungsi-fungsi yang dapat memproses request secara berurutan.
**Use Case:** Membangun REST API, web aplikasi full-stack (dengan view engine), atau sebagai server untuk Single Page Application (SPA).

**Handlebars (hbs) sebagai View Engine:**
**Definisi:** View engine adalah perangkat lunak yang memungkinkan kita menyisipkan data dinamis ke dalam file template (seperti HTML) di sisi server sebelum mengirimkannya ke klien. Handlebars (hbs) adalah salah satu view engine populer yang menggunakan sintaks `{{variabel}}`.
**Mengapa Penting:** Dalam pemrograman jaringan, seringkali kita perlu menampilkan data yang berbeda untuk pengguna yang berbeda atau data yang berubah-ubah. View engine memisahkan logika aplikasi (JavaScript) dari presentasi (HTML), membuat kode lebih bersih dan mudah dikelola daripada harus membangun string HTML secara manual di dalam kode JavaScript.
**Cara Kerja:**

1.  Developer membuat file template (misal: `index.hbs`) dengan placeholder seperti `<h1>{{judul}}</h1>`.
2.  Di server, saat route diakses, kita memanggil `res.render('index', { judul: 'Halaman Utama' })`.
3.  Handlebars akan mengganti `{{judul}}` di template dengan nilai yang diberikan, menghasilkan file HTML final.
4.  HTML yang sudah jadi dikirim ke browser.
    **Use Case:** Menampilkan nama pengguna yang login, daftar produk dari database, atau konten dinamis lainnya di halaman web.

---

## 3. Diagram Arsitektur

Diagram berikut mengilustrasikan alur kerja aplikasi `web-server` dari permintaan awal hingga respons akhir.

```
Browser Client
      │
      │
      │ 1. HTTP Request (GET / , /tentang, /infoCuaca)
      ▼
┌────────────────────────────────────────────────────────────────────────────────────┐
│                     Node.js Web Server                                             │
│ ┌────────────────────────────────────────────────────────────────────────────────┐ │
│ │                     Express.js App                                             │ │
│ │                                                                                │ │
│ │ ┌──────────────┐   2. Routing                     ┌──────────────┐             │ │
│ │ │   app.get('/') ├────────────────────────────────► res.render() │             │ │
│ │ └──────────────┘                                  └──────┬───────┘             │ │
│ │ ┌──────────────┐               4. Render                 │                     │ │
│ │ │ app.get('/infoCuaca')──────► res.send()                │                     │ │
│ │ └──────────────┘               (JSON)                    │                     │ │
│ │                                                          │                     │ │
│ └──────────────────────────────────────────────────────────┼─────────────────────┘ │
└────────────────────────────────────────────────────────────┼───────────────────────┘
                                                             │
            3. Static Files                                  │     5. Dynamic HTML
   ┌───────────────┴───────────────┐                         ▼
┌──┴───┐   ┌──────────┐   ┌────────┴──────┐       ┌─────────────────┐
│ .css │   │   .js    │   │     .png      │       │   HTML Response │
└──────┘   └──────────┘   └───────────────┘       └─────────────────┘
   ▲           ▲                  ▲                          ▲
   │           │                  │                          │     6. HTTP Response
   └───────────┼──────────────────┴──────────────────────────┘
               │
               ▼
         Browser Client
```

**Alur Eksekusi:**

1.  **Permintaan Klien:** Pengguna mengetik URL di browser, yang menghasilkan sebuah HTTP Request.
2.  **Middleware Statis:** Express pertama kali memeriksa apakah permintaan tersebut cocok dengan file di direktori statis (`public` atau `img`). Jika ya (misalnya, permintaan untuk `/css/styles.css`), file tersebut langsung dikirim dan proses berakhir.
3.  **Pencocokan Rute Dinamis:** Jika bukan file statis, Express melanjutkan ke rute dinamis yang telah didefinisikan.
    -   Jika permintaan cocok (misalnya, `GET /tentang`), fungsi callback yang sesuai akan dieksekusi, yang biasanya memanggil `res.render()` untuk halaman HTML atau `res.send()` untuk data JSON.
    -   Jika `res.render()` dipanggil, Express menyerahkan tugas ke **Handlebars Engine**. HBS akan mengambil file template dari `views`, menggabungkannya dengan partials dari `partials`, menyisipkan data yang diberikan, dan menghasilkan satu string HTML.
4.  **Middleware 404:** Jika permintaan tidak cocok dengan rute statis maupun dinamis (misalnya, `/halaman-acak`), permintaan tersebut akan "jatuh" ke middleware terakhir, yang akan merender halaman `404.hbs`.
5.  **Respons HTTP:** HTML, JSON, atau file aset yang telah diproses dikirim kembali ke browser sebagai HTTP Response untuk ditampilkan kepada pengguna.

---

## 4. Implementasi

Implementasi proyek ini mencakup beberapa komponen kunci yang bekerja sama untuk membentuk sebuah web server yang fungsional dan modular.

-   ✅ **Inisialisasi Server:** Mengkonfigurasi dan menjalankan server Express pada port yang ditentukan.
-   ✅ **Konfigurasi View Engine:** Mengatur Handlebars (hbs) sebagai view engine, termasuk mendefinisikan path untuk views dan partials.
-   ✅ **Penyajian Aset Statis:** Menggunakan middleware `express.static` untuk menyajikan file CSS, JavaScript sisi klien, dan gambar.
-   ✅ **Routing:** Mendefinisikan route untuk setiap halaman (`/`, `/tentang`, `/bantuan`) dan endpoint data (`/infoCuaca`).
-   ✅ **Modularisasi Route:** Memisahkan logika untuk `/infoCuaca` ke dalam modul `express.Router` tersendiri untuk menjaga kerapian kode.
-   ✅ **Templating & Partials:** Menggunakan partials `hbs` untuk elemen UI yang berulang (header, footer, head) demi efisiensi.
-   ✅ **Penanganan Error 404:** Menyediakan middleware catch-all untuk menangani permintaan ke URL yang tidak ada.

**Potongan Kode Penting:**

Berikut adalah cuplikan kode yang paling representatif dari arsitektur aplikasi ini, sebagian besar berasal dari `src/app.js` sebagai file utama.

**1. Konfigurasi Inti di `src/app.js`**

```javascript
// In src/app.js
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const infoCuacaRouter = require("./infoCuaca"); // Impor router

const app = express();
const port = process.env.PORT || 4000;

// Mendefinisikan path untuk konfigurasi Express
const directoryPublic = path.join(__dirname, "../public");
const directoryViews = path.join(__dirname, "../templates/views");
const directoryPartials = path.join(__dirname, "../templates/partials");

// Setup handlebars engine dan lokasi views
app.set("view engine", "hbs");
app.set("views", directoryViews);
hbs.registerPartials(directoryPartials);

// Setup direktori statis untuk disajikan
app.use(express.static(directoryPublic));
app.use("/img", express.static(path.join(__dirname, "../img")));
```

**Penjelasan:** Blok kode ini adalah fondasi dari server. Ia mengimpor semua dependensi yang diperlukan, mendefinisikan path absolut untuk aset-aset proyek (sebuah praktik terbaik untuk menghindari masalah path antar sistem operasi), mengkonfigurasi `hbs` sebagai view engine, dan yang terpenting, mendaftarkan middleware `express.static`. Middleware ini secara otomatis menyajikan file dari direktori `public` dan `img` ketika ada permintaan ke URL yang cocok.

**2. Routing dan Menjalankan Server di `src/app.js`**

```javascript
// In src/app.js

// Route untuk halaman utama
app.get("", (req, res) => {
	res.render("index", {
		judul: "Aplikasi Ingfo Cuaca",
		nama: "Dzaki Sultan Rabbani",
	});
});

// ... (route untuk /tentang dan /bantuan) ...

// Menggunakan router eksternal untuk /infoCuaca
app.use("/infoCuaca", infoCuacaRouter);

// Middleware untuk menangani 404 - harus di paling akhir
app.use((req, res) => {
	res.status(404).render("404", {
		judul: "404",
		nama: "Dzaki Sultan Rabbani",
		pesanError: "Halaman tidak ditemukan.",
	});
});

// Menjalankan server
app.listen(port, () => {
	console.log(`Server berjalan pada port ${port}.`);
});
```

**Penjelasan:** Bagian ini menunjukkan bagaimana Express menangani permintaan. `app.get()` digunakan untuk mendefinisikan respons untuk URL tertentu. `res.render()` memproses file `hbs` dan menyuntikkan data dinamis ke dalamnya. `app.use("/infoCuaca", ...)` menunjukkan bagaimana modul router eksternal diintegrasikan. Terakhir, middleware 404 berfungsi sebagai jaring pengaman untuk semua permintaan yang tidak cocok, dan `app.listen()` secara resmi memulai server.

**3. Modularisasi dengan `express.Router`**

```javascript
// In src/infoCuaca.js
const express = require("express");
const router = express.Router();

// Halaman info cuaca (di-mount pada path /infoCuaca)
router.get("", (req, res) => {
	res.send([
		{
			Prediksi_Cuaca: "Cerah",
			Lokasi: "Padang",
		},
	]);
});

module.exports = router;
```

**Penjelasan:** File ini adalah contoh sempurna dari modularisasi. Daripada menempatkan semua logika di `app.js`, fungsionalitas yang terkait dengan "info cuaca" diisolasi di sini. `express.Router()` menciptakan sebuah "mini-aplikasi" yang dapat diekspor dan kemudian "dipasang" ke aplikasi utama. Ini membuat kode lebih mudah dikelola dan diskalakan.

**4. Efisiensi Template dengan Partials**

```handlebars
{{! In templates/partials/head.hbs }}
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{judul}}</title>
    <link rel="icon" href="/img/gambar.jpg">
    <link rel="stylesheet" href="/css/styles.css">
</head>

{{! Penggunaan di templates/views/index.hbs }}
<!DOCTYPE html>
<html lang="en">
    {{> head}}
<body>
    <div class="container">
        {{> header}}
        <p>Gunakan situs ini untuk mendapatkan info cuaca!</p>
        {{> footer}}
    </div>
</body>
</html>
```

**Penjelasan:** Kode ini menunjukkan kekuatan dari view engine. Bagian `<head>` yang berulang di setiap halaman diekstraksi menjadi satu file partial (`head.hbs`). Sekarang, setiap halaman hanya perlu menyertakan `{{> head}}`. Ini tidak hanya mengurangi duplikasi tetapi juga membuat pemeliharaan menjadi sangat mudah; jika kita perlu menambahkan stylesheet baru, kita hanya perlu mengubah satu file. Variabel `{{judul}}` memastikan bahwa setiap halaman tetap dapat memiliki judul yang unik.

---

## 5. Kendala & Solusi

Selama proses pengembangan, beberapa kendala utama ditemui yang mencerminkan tantangan umum dalam pengembangan aplikasi Node.js/Express.

**1. Konflik Server dan Kegagalan Routing**

-   **Masalah:** Saat server dijalankan, hanya halaman utama (`/`) yang bisa diakses. Halaman lain seperti `/tentang` dan `/infoCuaca` mengembalikan error 404 (Not Found), meskipun file-file untuk route tersebut ada.
-   **Analisis:** Investigasi awal menemukan bahwa setiap file (`app.js`, `infoCuaca.js`, `tentang.js`) membuat instance Express baru (`const app = express()`) dan mencoba menjalankan servernya sendiri dengan `app.listen()`. Dalam praktiknya, hanya satu proses yang bisa mengikat port 4000, yaitu file yang pertama kali dieksekusi (`node src/app.js`). Akibatnya, logika routing di file lain tidak pernah terdaftar di server utama.
-   **Solusi:** Arsitektur diubah dari beberapa server yang saling bertentangan menjadi satu server utama dengan modul-modul router.
    1.  **Modularisasi:** `infoCuaca.js` diubah menjadi modul yang mengekspor `express.Router()`. Logika untuk `/tentang` yang sederhana dipindahkan langsung ke `app.js`.
    2.  **Sentralisasi Server:** Perintah `app.listen()` dihapus dari semua file kecuali `src/app.js`, yang sekarang bertindak sebagai satu-satunya titik masuk dan koordinator aplikasi.
    3.  **Integrasi Router:** Di `src/app.js`, router yang telah dimodularisasi diimpor dan dipasang menggunakan `app.use('/infoCuaca', infoCuacaRouter)`.
-   **Pembelajaran:** Ini adalah pelajaran fundamental dalam arsitektur Express: sebuah aplikasi harus memiliki satu titik masuk server (`app.listen()`). Fungsionalitas yang berbeda harus dienkapsulasi dalam modul (router) dan diintegrasikan ke dalam aplikasi utama.

**2. `nodemon` Tidak Dikenali sebagai Perintah**

-   **Masalah:** Setelah memperbaiki routing, saat mencoba menjalankan server dengan `nodemon src/app.js` untuk pengembangan, terminal menampilkan error `nodemon: command not found`.
-   **Analisis:** Perintah ini gagal karena `nodemon` diinstal sebagai dependensi lokal proyek (`devDependencies` di `package.json`), bukan secara global. Perintah yang dieksekusi langsung di shell hanya mencari binary yang terinstal secara global.
-   **Solusi:** Menggunakan runner skrip NPM untuk mengakses binary lokal.
    1.  Sebuah skrip `dev` ditambahkan ke `package.json`: `"dev": "nodemon src/app.js -e js,hbs"`.
    2.  Server sekarang dijalankan dengan perintah `npm run dev`. NPM secara otomatis menyelesaikan path ke `nodemon` yang ada di `node_modules/.bin/`.
-   **Pembelajaran:** Menginstal dependensi pengembangan secara lokal adalah praktik terbaik karena menjaga proyek tetap mandiri dan versinya terkunci. Skrip NPM adalah cara standar untuk menjalankan tool-tool lokal ini.

**3. Aset Statis (CSS & Gambar) Gagal Dimuat**

-   **Masalah:** Halaman HTML dirender dengan benar, tetapi tidak memiliki styling, dan gambar tidak muncul (rusak).
-   **Analisis:** Path aset di dalam file `.hbs` ditulis sebagai path file sistem (misalnya, `../public/css/styles.css`). Browser tidak memiliki akses ke struktur file server dan tidak dapat menyelesaikan path ini.
-   **Solusi:**
    1.  Mengkonfigurasi middleware `express.static` di `app.js` untuk "membuka" direktori `public` dan `img` ke web.
    2.  Memperbaiki semua path aset di file `.hbs` menjadi path URL absolut dari root situs (misalnya, `/css/styles.css` dan `/img/gambar.jpg`).
-   **Pembelajaran:** `express.static` adalah jembatan antara sistem file server dan URL yang dapat diakses browser. Semua referensi aset di sisi klien harus menggunakan URL, bukan path file.

---

## 6. Testing

| No  | Test Case                 | Input (URL)                            | Expected Output                                        | Actual Result                                           | Status |
| --- | ------------------------- | -------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- | ------ |
| 1   | Halaman Utama             | `http://localhost:4000/`               | Render `index.hbs` dengan judul "Aplikasi Ingfo Cuaca" | Halaman utama tampil dengan benar.                      | ✅     |
| 2   | Halaman Tentang           | `http://localhost:4000/tentang`        | Render `tentang.hbs` dengan gambar.                    | Halaman tentang tampil dengan gambar.                   | ✅     |
| 3   | Halaman Bantuan           | `http://localhost:4000/bantuan`        | Render `bantuan.hbs` dengan teks bantuan.              | Halaman bantuan tampil dengan benar.                    | ✅     |
| 4   | Endpoint JSON             | `http://localhost:4000/infoCuaca`      | Mengembalikan data JSON cuaca.                         | `[{"Prediksi_Cuaca":"Cerah","Lokasi":"Padang"}]`        | ✅     |
| 5   | Aset Statis (CSS)         | `http://localhost:4000/css/styles.css` | Mengembalikan konten file CSS.                         | File CSS terkirim dengan `Content-Type: text/css`.      | ✅     |
| 6   | Aset Statis (Gambar)      | `http://localhost:4000/img/gambar.jpg` | Mengembalikan file gambar.                             | File gambar terkirim dengan `Content-Type: image/jpeg`. | ✅     |
| 7   | Halaman Tidak Ditemukan   | `http://localhost:4000/halaman-acak`   | Render `404.hbs` dengan pesan error.                   | Halaman 404 tampil dengan benar.                        | ✅     |
| 8   | Penggunaan Partial `head` | View Source di halaman mana pun        | Kode `<head>` konsisten dan title dinamis.             | Semua halaman menggunakan partial `head` dengan benar.  | ✅     |

**Halaman Utama**

![Homepage](/assets/images/week-07/week-07-homepage.png)

**Halaman about**

![About](/assets/images/week-07/week-07-about.png)

**Halaman Help**

![Help](/assets/images/week-07/week-07-help.png)

---

## 7. Refleksi

### 7.1 Apa yang Saya Pelajari

**Secara Teknis:**

-   Saya belajar cara mengkonfigurasi web server dari awal menggunakan Express, termasuk routing, view engine, dan penyajian file statis.
-   Saya memahami pentingnya `path.join` dan `__dirname` untuk membuat path yang independen dari sistem operasi, yang krusial saat mendeploy aplikasi.
-   Saya sekarang bisa membedakan antara `res.send()` (untuk data mentah/JSON) dan `res.render()` (untuk memproses template).
-   Praktik modularisasi dengan `express.Router` sangat mencerahkan. Ini membuat struktur proyek jauh lebih terorganisir dibandingkan menumpuk semua route di satu file.

**Secara Konseptual:**

-   Saya benar-benar memahami perbedaan antara server-side rendering (menggunakan HBS) dan client-side logic. Data dinamis disuntikkan di server sebelum halaman dikirim, sementara JavaScript di folder `public` berjalan di browser setelah halaman diterima.
-   Konsep "middleware" menjadi lebih jelas. `express.static` adalah middleware pertama yang saya gunakan secara sadar. Saya mengerti bahwa middleware adalah fungsi yang dieksekusi di tengah-tengah siklus request-response dan bisa melakukan banyak hal, seperti otentikasi, logging, atau menyajikan file.
-   Hubungan antara Node.js dan Express.js: Node.js adalah fondasi (runtime environment), sementara Express.js adalah kerangka kerja yang memberikan struktur dan kemudahan di atas fondasi tersebut.

---

## 8. Referensi & Sumber Belajar

-   Jobsheet 5: Web Server dan Express.js
-   [Express.js Official Documentation](https://expressjs.com/)
-   [Handlebars.js Official Website](https://handlebarsjs.com/)
-   [MDN Web Docs: Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

![footer](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%205&section=footer&reversal=false&textBg=false&fontAlign=40&fontAlignY=70&animation=fadeIn&rotate=20&desc=Web%20Server%20dan%20Express.js&descAlign=45&descAlignY=80)
