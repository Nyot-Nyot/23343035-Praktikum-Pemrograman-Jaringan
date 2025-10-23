**Kampus** **informatika** Pemrograman Berbasis Jaringan **Merdeka** Menggunakan Node.JS

![](https://web-api.textin.com/ocr_image/external/1a1236f3bfe5c515.jpg)

<!-- MERRILA nNG -->

![](https://web-api.textin.com/ocr_image/external/1fff952d2032902a.jpg)

INDONESIA JAYAK Universitas Negeri Padang Randi Proska Sandra, S.Pd, M.Sc ©2023

**Modul 05**

![](https://web-api.textin.com/ocr_image/external/da9c5e97b0313d21.jpg)

# Web Server dan Express.js

# TUJUAN PEMBELAJARAN

1. Mampu memahami dan menjelaskan tentang Web Server

2. Mampu memahami dan menjelaskan tentang Express.JS sebagai Web Framework

# Hardware & Software

1. PC (Personal Computer) dengan akses Internet

2. JavaScript

3. Visual Studio Code atau IDE lainnya yang mendukung JavaScript

4. NPM

5. Express.JS

# URAIAN MATERI

# A.Web Server

Server web (web server) adalah entitas berupa komputer fisik atau perangkat lunak yang berfungsi sebagai pusat penyimpanan dan pengiriman data dalam bentuk halaman web kepada pengguna yang meminta akses. Ketika seorang pengguna mengakses suatu situs web,permintaannya diteruskan ke server web yang bersangkutan. Selanjutnya, server web ini mengolah permintaan tersebut dan mengirimkan halaman web yang sesuai ke perangkat pengguna melalui jaringan internet. Istilah web server dapat merujuk pada perangkat keras atau perangkat lunak, atau keduanya yang saling bekerja bersama.

**·** Dari sisi perangkat keras, web server adalah komputer yang menyimpan perangkat lunak server web dan file komponen situs web (misalnya, dokumen **HTML,** gambar, stylesheet CSS, dan file JavaScript). Sebuah server web terhubung ke Internet dan mendukung pertukaran data fisik dengan perangkat lain yang terhubung ke web.

**·** Dari sisi perangkat lunak, server web mencakup beberapa bagian yang mengendalikan bagaimana pengguna web mengakses file-file yang dihosting. Paling minimum adalah server HTTP. Sebuah server HTTP adalah perangkat lunak yang memahami URL (alamat web) dan

![](https://web-api.textin.com/ocr_image/external/488cf207bf77359e.jpg)

<!-- 1 -->

![](https://web-api.textin.com/ocr_image/external/4affc5feab905b47.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

HTTP (protokol yang digunakan oleh browser untuk melihat halaman web). Sebuah server HTTP dapat diakses melalui nama domain situs web yang disimpan di dalamnya, dan mengirimkan konten dari situs web yang dihosting tersebut ke perangkat pengguna akhir.

Pada level paling dasar, setiap kali browser membutuhkan sebuah file yang di-host di server web,browser tersebut meminta file melalui HTTP. Ketika permintaan mencapai server web yang tepat (perangkat keras), server **HTTP** (perangkat lunak) menerima permintaan tersebut,menemukan dokumen yang diminta, dan mengirimkannya kembali ke browser, juga melalui HTTP.(Jika server tidak menemukan dokumen yang diminta, maka akan mengembalikan respons 404).

<!-- HTTP HTTP Request Files server HTTP Response Web server Browser -->

![](https://web-api.textin.com/ocr_image/external/dfe12eeed255f579.jpg)

Gambar 1. Proses komunikasi browser dan web server menggunakan HTTP protocol

Untuk mempublikasikan sebuah situis web, diperlukan server web yang bersifat statis maupun dinamis.

· Sebuah server web statis, atau stack, terdiri dari komputer (perangkat keras) dengan server **HTTP** (perangkat lunak). Hal ini disebut "statis" karena server ini mengirimkan file yang di-host-nya apa adanya ke browser Anda.

· Sebuah server web dinamis terdiri dari server web statis ditambah perangkat lunak tambahan,yang paling umum adalah server aplikasi dan database. Hal ini disebut "dinamis" karena server aplikasi memperbarui file yang di-host sebelum mengirimkan konten ke browser Anda melalui server HTTP.

Sebagai contoh, untuk menghasilkan halaman web akhir yang bisa dilihat di browser, server aplikasi mungkin mengisi sebuah template HTML dengan konten dari database. Situs seperti Wikipedia memiliki ribuan halaman web. Biasanya, jenis situs seperti ini terdiri dari hanya beberapa template HTML dan sebuah database besar, bukan ribuan dokumen HTML statis.Pengaturan ini membuatnya lebih mudah untuk merawat dan mengirimkan konten.

# B. ExpressJS

Express.js, atau sering disebut hanya "Express," adalah framework web yang berjalan di atas bahasa pemrograman JavaScript. Ini merupakan salah satu framework yang paling populer dan umum digunakan untuk pengembangan aplikasi web di sisi server (server-side) dengan menggunakan bahasa JavaScript.

<!-- 2 -->

![](https://web-api.textin.com/ocr_image/external/0abcad7390717b7c.jpg)

![](https://web-api.textin.com/ocr_image/external/d6a289bef5d9b318.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

Express Home Getting started Guide API referenceAdvanced topics Resources

search

Express

Fast, unopinionated, minimalist

web framework for Node.js

&#36; npe install express--save

Gambar 2. Halaman web Expressjs yang dapat diakses melalui https://expressjs.com/

Express.js dan Node.js memiliki hubungan erat, di mana Express.js adalah sebuah framework web yang dibangun di atas platform Node.js. Ini berarti Express.js adalah salah satu dari banyak framework yang dapat digunakan untuk mengembangkan aplikasi web dengan menggunakan Node.js sebagai lingkungan runtime-nya.

Node.js adalah platform runtime JavaScript yang memungkinkan Anda menjalankan kode JavaScript di sisi server (server-side). Ini sangat efisien untuk menangani banyak permintaan I/O yang bersifat non-blocking, yang merupakan fitur kunci dalam pengembangan aplikasi web yang skalabel dan responsif. Express.js, di sisi lain, adalah framework yang dirancang khusus untuk memudahkan pengembangan aplikasi web dengan menggunakan Node.js. Ini menyediakan alat dan fitur tingkat tinggi untuk mengatur permintaan HTTP, menangani rute, mengelola sesi, dan banyak lagi. Express.js memungkinkan pengembang untuk membangun aplikasi web dengan cepat dan efisien dengan menggunakan Node.js sebagai basisnya. Pada tabel berikut dapat dilihat perbedaan express.js dan node.js

Tabel 1.Perbedaan Express.js Vs Node.js

| Aspek Pembeda            | Node.js                                                                         | Express.js                                                            |
| ------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Kegunaan                 | Digunakan untuk mengembangkan frontend dan backend dari sebuah<br>aplikasi web. | Digunakan untuk<br>mengembangkan backend dari<br>sebuah aplikasi web. |
| Definisi                 | Ini adalah platform pengembangan (development platform)                         | Ini adalah kerangka kerja web<br>(web framework)                      |
| Sisi<br>Pemrograman      | Digunakan untuk pemrograman<br>sisi klien dan sisi server.                      | Digunakan untuk pemrograman<br>sisi server.                           |
| Fitur                    | Fitur yang lebih sedikit<br>dibandingkan.                                       | Lebih banyak fitur daripada<br>Node.js.                               |
| Core technology'         | Dibangun di atas mesin V8<br>Google.                                            | Dibangun di atas Node.js                                              |
| Ditulis dalam<br>Bahasa? | C,C++,JavaScript                                                                | Express.js ditulis dalam<br>JavaScript                                |

![](https://web-api.textin.com/ocr_image/external/16508ca52710501d.jpg)

<!-- 3 -->

![](https://web-api.textin.com/ocr_image/external/5b65c11e3aaef0d3.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

| Mendukung<br>Bahasa?                     | TypeScript,CoffeeScript,Ruby               | JavaScript                                      |
| ---------------------------------------- | ------------------------------------------ | ----------------------------------------------- |
| Performa                                 | Kinerja lebih baik daripada<br>Express.js. | Secara relatif, tidak sebaik<br>kinerja Node.js |
| Ketersediaan<br>controller<br>provision2 | Tidak                                      | Ya                                              |
| Mendukung<br>routing3?                   | Tidak                                      | Ya                                              |
| Coding Time                              | Membutuhkan lebih banyak waktu             | Membutuhkan lebih sedikit waktu                 |

## Catatan:

1. teknologi inti yang membangun aplikasi

2. 'controller provision' merujuk pada komponen yang mengelola aliran data dan interaksi dalam sebuah aplikasi dan bertanggung jawab untuk menangani input pengguna dan mengkoordinasikan Tindakan antara model (data)dan tampilan (antarmuka pengguna).

3. 'routing' menentukan bagaimana berbagai URL atau endpoint berhubungan dengan fungsi (function) atau penanganan (handlers) tertentu, memungkinkan pengembang untuk mendefinisikan bagaimana aplikasi merespons permintaan klien yang berbeda.

Meski tabel diatas menunjukkan perbedaan node.js dan express.js, pada dasarnya keduanya tidak berdiri sendiri, melainkan saling bekerjasama dalam pengembangan sebuah aplikasi.Umumnya Express.js digunakan dalam pengembangan aplikasi-aplikasi berikut seperti single-page apps, reusable apps, aplikasi middleware, RESTful APIs, Melayani dan Mengakses Berkas Statis Menggunakan Browser, Apliksi web Enterprise dan aplikasi web e-commerce. Adapun beberapa keunggulan Express.js adalah sebagai berikut.

# 1. Durasi Pengembangan yang Lebih Singkat

Istilah 'Express' sendiri mengindikasikan bahwa Express.js dikenal karena pengembangannya yang cepat. Express.js menggunakan bahasa JavaScript, yang juga memungkinkan pemrograman yang cepat.

# 2. Penanganan Kesalahan (Error Handling) Express.js

Proses penanganan kesalahan Express.js dirancang sedemikian rupa sehingga mampu mendeteksi dan memperbaiki bug dalam kode yang bersifat sinkron dan asinkron.

# 3. Penanganan Permintaan I/O (I/O Request Handling) yang Sesuai

Tergantung pada musimnya, bisnis aplikasi berbasis on-demand dapat menerima ratusan atau bahkan ribuan notifikasi per hari. Jika dibangun dalam kerangka kerja backend Express,aplikasi-aplikasi ini memiliki keunggulan, karena kerangka kerja ini cukup kuat untuk menerima berbagai permintaan Masukan (Input) dan Keluaran (Output) secara bersamaan.

# 4. Kerangka Kerja yang bersifat non-preskriptif (Unopinionated Framework)

Pengembang menyukai kerangka kerja Express, karena tidak memiliki aturan ketat tentang penempatan atau urutan komponen kode.

<!-- 4 -->

![](https://web-api.textin.com/ocr_image/external/dbfb77ff7269c339.jpg)

![](https://web-api.textin.com/ocr_image/external/21dfd947e2cf1ff5.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

# 5. Instalasi yang Cepat & Mudah

Menginstal kerangka kerja adalah tugas yang sangat menjengkelkan dan membutuhkan waktu. Namun, menginstal Express.js cukup mudah. Selain itu, ia juga lebih sederhana untuk diatur, dikonfigurasi, dan disesuaikan.

# 6. Kemampuan untuk Membuat Server API REST Express.js (REST Expressjs API Server)

Peran utama dari server API REST adalah untuk mengakses dan menggunakan data.Dan tidak ada yang lebih memahami pentingnya membuat server API REST daripada seorang pengembang atau seorang ahli IT. Express memungkinkan pengguna pengembang untuk membuatnya dengan tingkat keamanan yang maksimal.

# 7. Integrasi Basis Data (DDatabase Integration) yang Mudah

Express adalah kerangka kerja backend yang mudah dikelola. Programmer dapat mengintegrasikan basis data apa pun dengan mudah seperti MongoDB, Redis, MySQL.

# LATIHAN

# a. Instalasi Express.js dan membuat halaman menggunakan fungsi app.get

1. Buatlah folder baru dengan nama **web-server** dan bukalah folder tersebut pada aplikasi visual studio code anda.

2. Buka direktori ke folder dengan cara **klik** **kanan,** lalu pilih **Open** **in** **Integrated** **Terminal.**Lalu ketikan perintah **npm** **init** **-y** untuk meng-generate file **package.json**

3. Selanjutnya install **express.js** versi **terbaru** yaitu versi 4.18.2 menggunakan perintah npm yang telah anda pelajari sebelumnya. Silakan cek package express.js melalui halaman ini https://www.npmjs.com/package/express. Buka **modul sebelumnya** jika anda lupa perintah atau cara menginstall package dari npm

4. Anda akan melihat bahwa folder baru **node_modules** dan file baru **package-lock.json** telah berhasil di generate

5. Buatlah **dua** buah folder baru dalam folder **web-server** melalui visual studio code anda. Beri nama folder pertama dengan **public** dan folder kedua dengan **src**

| web-server |
| ---------- |
| public     |
| &gt; srC   |

Gambar 3 Direktori aplikasi web-servers

6. Didalam folder src, buatlah file baru dengan nama **app.js**

7. Ketikan kode berikut ini

| const $express=require('\exp ress')$ |
| ------------------------------------ |
| const $app=\exp ress()$              |
| //ini halaman/page utama             |

![](https://web-api.textin.com/ocr_image/external/3e51b12ee9a0fae0.jpg)

<!-- 5 -->

![](https://web-api.textin.com/ocr_image/external/9b828afaa6d72e37.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

| app.get('',(req, res) =&gt;$\{$                                                             |
| ------------------------------------------------------------------------------------------- |
| res.send('Selamat datang di halaman utama')                                                 |
| })                                                                                          |
| //ini halaman bantuan/FAQ (Frequently Asked Questions)<br>app.get('/bantuan', $\Rightarrow$ |
| res.send('Ini halaman bantuan')                                                             |
| })                                                                                          |

# Catatan:

**a.** $app=$ **express()** menunjukan pembuatan sebuah variable constant baru dengan nama app dan diambil dari fungsi express yang diimport dari expressjs

b. Method **app.get** mendefinisikan sebuah rute HTTP GET menggunakan objek app dari Express.js

c.( $(\text {req},\text {res})\Rightarrow \{\ldots \}$ Bagian dari kode ini mendefinisikan sebuah fungsi callback yang akan dieksekusi ketika rute diakses. Dalam Express.js, fungsi ini memiliki dua argumen: req (objek request) dan res (objek response). Di dalam fungsi ini, Anda mendefinisikan apa yang harus terjadi ketika pengguna mengakses rute ini.

d. $res.send(...)$ digunakan untuk mengirimkan respons kembali ke klien (browser pengguna)

e. Expressjs memiliki banyak jenis method yang dapat diakses lebih jauh melalui dokumentasi berikut https://expressjs.com/en/4x/api.html

8. Lanjutkan koding diatas untuk membuat dua halaman lagi yaiut halaman **infoCuaca** dan halaman **tentang.** Lakukan sebagaimana mana baris kode halaman **bantuan** diatas

9. Lalu tambahkan baris kode berikut **diakhir** semua kode diatas

![](https://web-api.textin.com/ocr_image/external/84f8dca165d625c2.jpg)

app.listen(4000, $\Rightarrow$

console.log('Server berjalan pada port 4000.')

})

Anda dapat mengganti server port 4000 dengan 3000, 5000 atau yang lainnya

10. Buka direktori ke file app.js tersebut melalui terminal dengan cara **klik** **kanan,** lalu pilih **Open in Integrated Terminal**

11.Pastikan anda berada pada direktori **src,** lalu ketikan perintah **node** **app.js** untuk menjalankan program tersebut

12. Bukalah web browser anda lalu ketikan **http://localhost:4000/.** Angka 4000 dapat diganti sesuai dengan port yang telah anda set pada bari kode app.listen. Akan tampil seperti gambar dibawah ini

i localhost:4000

![](https://web-api.textin.com/ocr_image/external/2fb7c2940aa715f7.jpg)

Selamat datang di halaman utama

Gambar 4. Tampilan localhost:4000

13.Cobalah mengakses halaman lainnya dengan menambahkan url halaman dibelakang url utama. Contoh: http://localhost:4000/infoCuaca. Coba lakukan juga untuk halaman bantuan dan halaman tentang

<!-- 6 -->

![](https://web-api.textin.com/ocr_image/external/c0fbda1a50415bf9.jpg)

![](https://web-api.textin.com/ocr_image/external/62a5e3ce14c35640.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

# b. Integrasi HTML dan JSON pada Express.js

1. Cobalah ganti teks **selamat** **datang** **di** **halaman** **utama** dengan kode html &lt;h1&gt; sehingga menjadi

res.send('&lt;h1&gt;Selamat datang di halaman utama&lt;/h1&gt;')

2. Jalankan file app.js menggunakan perintah **nodemon** **app.js** dan lihat hasilnya pada browser. PENTING! Untuk selanjutnya, anda akan menggunakan perintah **nodemon** untuk menjalankan program bukan lagi **node.** Hal ini bertujuan agar perubahan dapat dilihat secara realtime setiap anda mengubah baris kode.

3. Selanjutnya cobalah ganti kode pada halaman **tentang** dengan kode berikut

app.get('/tentang,(req, $=>\{$

**res.send([{**

**nama: 'Randi Proska** Sandra',

pekerjaan: 'Dosen'

}])

})

**Catatan:** Teks pada nama dan pekerjaan dapat anda sesuaikan dengan keinginan anda.

4. Bukalah aplikasi anda di browser dan pastikan anda beradal url halaman **tentang.**http://localhost:4000/tentang

5. Perhatikan bahwa tampilan pada halaman utama berbeda dengan halaman tentang. Hal ini karena halaman utama menggunakan format HTML sedangkan halaman tentang menggunakan format JSON

6. Ubah juga teks untuk halaman **bantuan** dan halaman **infoCuaca.** Tambahkan teks pada halaman **bantuan** dengan kode HTML &lt;h1&gt; dan teks infoCuaca dengan kode JSON yang berisi dua objek yaitu **prediksiCuaca: 'cuaca berpotensi hujan'** dan **lokasi:'Padang',** sama seperti yang anda lakukan pada halaman **tentang.**

7. Bukalah setiap halaman di browser anda dan pastikan bahwa semuanya menampilkan tampilan yang diinginkan.

$\leftarrow \rightarrow C$ ① localhost4000 $\leftarrow \rightarrow C$ ① localhost:4000/bantuan

**Selamat datang di halaman utama** **Selamat datang di halaman bantuan**

![](https://web-api.textin.com/ocr_image/external/45fd5b8ef3a8f8a7.jpg)

![](https://web-api.textin.com/ocr_image/external/9c625e9983b7342a.jpg)

![](https://web-api.textin.com/ocr_image/external/a2a04fff13169c6b.jpg)

![](https://web-api.textin.com/ocr_image/external/ae45f7149d4be561.jpg)

localhost:4000/tentang localhost:4000/infoCuaca

{

"nama": "Randi Proska Sandra", "prediksiCuaca":"Cuaca Sedang Hujan",

<!-- { } ] -->

![](https://web-api.textin.com/ocr_image/external/ae7e73a55b1e3bee.jpg)

"lokasi":"Padang"

"pekerjaan":"Dosen"

}

]

Gambar 5. Halaman utama (kiri atas), halaman bantuan (kanan atas), halaman tentang (kiri bawah) dan

halaman infoCuaca (kanan bawah)

![](https://web-api.textin.com/ocr_image/external/16508ca52710501d.jpg)

<!-- 7 -->

![](https://web-api.textin.com/ocr_image/external/b4c95b3f38c2bf71.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

8. **PENTING.** Untuk selanjutnya, setiap kali anda melakukan perubahan pada program anda,pastikan untuk mengecek halaman yang anda ubah. Hal ini bertujuan untuk memastikan konten yang tampil sudah sesuai dengan yang diinginkan dan tidak ada error yang muncul

# c. Akses Static Assets pada Expressjs menggunakan Path module

1. Buatlah file baru pada folder **public** dan beri nama **index.html** dan tambahkan kode html berikut

&lt;!DOCTYPE html&gt;

&lt;html&gt;

&lt;head&gt;&lt;/head&gt;

&lt;body&gt;

&lt;h1&gt;Ini adalah halaman utama statis $s</1$

&lt;/body&gt;

&lt;/html&gt;

# 2. Selanjutnya, pada file app.js di folder src, tambakan kode berikut ini

1 const $ph=qu('ph')$

2 **const** $express=require('express')$

3

4 const $app=\exp ress()$

5 const **direktoriPublic = path.join(\_dirname,** '../public')

**6**

**7** **app.use(express.static(direktoriPublic))**

Gambar 6. Potongan baris kode pada file app.js

**Pastikan!** anda hanya menambahkan kode yang belum ada pada baris program anda. Jangan menghapus kode yang sudah ada

# Catatan:

a. Module **path** menyediakan utilitas untuk bekerja dengan path file dan direktori yang dapat dipelajari lebih jauh melalui dokumentasi berikut ini https://nodejs.org/api/path.html#path

b. **path.join()** adalah method untuk menggabungkan semua segmen path yang diberikan menggunakan pemisah yang spesifik, kemudian melakukan normalisasi terhadap jalur yang dihasilkan.

c. **\_dirname** menunjukkan bahwa yang diakses adalah direktori dalam hal ini adalah direktori public. Jika anda mengakses file maka akan menggunakan**\_filename**

d. **express.static** dapat dipahami melalui dokumentasi berikut

http://expressjs.com/en/api.html#express.static

3. Lanjutkan program dengan membuat dua file html lagi pada folder public dengan nama **tentang.html** dan **bantuan.html.** Silakan isi file html dengan baris kode html seperti pada halaman index.html.Gantilah teks pada baris kode $<1>$ agar sesuai dengan nama halaman.

4. Silakan akses aplikasi pada browser anda untuk melihat tampilannya. Cobalah akses masing-

masing halaman dengan menambahkan .html dibelakang. Contoh:

http://localhost:4000/tentang.html

<!-- 8 -->

![](https://web-api.textin.com/ocr_image/external/c6affffee87c0592.jpg)

![](https://web-api.textin.com/ocr_image/external/a5cf81543b7c14db.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

5. Selanjutnya buatlah **folder** **baru** pada folder **public** dengan nama css. Lalu, dalam folder tersebut, buatlah file baru dengan nama styles.css. Lalu tambahkanlah kode berikut ini

| color:grey;<br>{し |
| ------------------ |
|                    |
| img{               |
| width:250px;       |

h1{

}

6. Selanjutnya tambahkan baris kode berikut pada file **index.html** pada didalam heading &lt;head&gt;. Lakukan yang sama untuk file **bantuan.html** dan **tentang.html**

**&lt;link** $rel="stylesheet"$ $href="/css/styles.css"$ &gt;

7. Buatlah satu **folder** **baru** lagi di folder public dengan nama js. LLalu buatlah file baru dalam folder tersebut dengan nama **app.js** dan tambahkan kode berikut ini

**console.log('Client** side **javascript file diproses')**

8. Lalu tambahkan lagi baris kode berikut pada file index.html, tepat dibawah baris kode pada nomor 6

**&lt;script** $src="/js/app.js"></script>$

9. Jalankan program anda di browser. Sembari membuka halaman utama, cobalah inspect elemen pada browser chrome/firefox anda dan perhatikan bahwa fille **app.js** dalam folder js telah di proses

| $\leftarrow \rightarrow C$ ① localhost:4000 | $\leftarrow \rightarrow C$ ① localhost:4000 | $\leftarrow \rightarrow C$ ① localhost:4000                                                               | $\leftarrow \rightarrow C$ ① localhost:4000                                                               | $\leftarrow \rightarrow C$ ① localhost:4000                                                               | $\leftarrow \rightarrow C$ ① localhost:4000                                                               | $\leftarrow \rightarrow C$ ① localhost:4000                                                               |
| ------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Dimensions:Nest Hub 1024 600                | 75% :                                       |                                                                                                           | Elements Sources                                                                                          | Elements Sources                                                                                          | Network                                                                                                   | Console                                                                                                   |
| Dimensions:Nest Hub 1024 600                |                                             | $p>top$                                                                                                   |                                                                                                           | Filter                                                                                                    | Filter                                                                                                    | Filter                                                                                                    |
| Ini adalah halaman utama statis             | Ini adalah halaman utama statis             | Client side javascript file diproses<br>unpaywall: got settings ▶{showOaColor:true}<br>**_ websiteRoot_** | Client side javascript file diproses<br>unpaywall: got settings ▶{showOaColor:true}<br>**_ websiteRoot_** | Client side javascript file diproses<br>unpaywall: got settings ▶{showOaColor:true}<br>**_ websiteRoot_** | Client side javascript file diproses<br>unpaywall: got settings ▶{showOaColor:true}<br>**_ websiteRoot_** | Client side javascript file diproses<br>unpaywall: got settings ▶{showOaColor:true}<br>**_ websiteRoot_** |

R

$$p>top$$

Gambar 7. Tampilan pemrosesan file javascript sisi client pada browser

10. Selanjutnya buatlah folder baru lagi dengan nama **img.** Lalu masukanlah sebuah gambar berformat **.png** ke folder tersebut. Direkomendasikan memasukan foto anda.

11.Lalu tambahkan baris kode berikut pada file **tentang.html** tepat dibawah kode &lt;h1&gt; pada bagian &lt;body&gt;

# &lt;img $\text {Src="}/$ img/ISI_DENGAN_NAMA_FILE_GAMBAR_ANDA.png"&gt;

12. Silakan buka localhost pada browser anda untuk mengakses halaman tentang, bantuan dan halaman utama. Pastikan akhir halaman anda berekstensi **.html.** Contoh:http://localhost:4000/tentang.html

13. Keseluruhan direktori yang ada pada aplikasi anda adalah seperti pada gambar dibawah ini

![](https://web-api.textin.com/ocr_image/external/bd017cf2192254dc.jpg)

<!-- 9 -->

![](https://web-api.textin.com/ocr_image/external/4af99ea2e2fa7ad9.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

| web-server<br>&gt; node_modules<br>へ public<br>✓ CSS<br>styles.css<br>へ img<br>me.png<br>✓ js<br>JS app.js<br>bantuan.html<br>index.html<br>tentang.html<br>src<br>app.js<br>package-lock.json<br>package.json |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Gambar 8. Direktori dan file pada aplikasi web server

**d. Templating pada Expressjs menggunakan Handlebars.js**

Pada bagian ini, anda akan menggunakan **handlebars.** Handlebars.js adalah perluasan dari bahasa templating Mustache yang diciptakan oleh Chris Wanstrath. Handlebars.js dan Mustache keduanya adalah bahasa templating yang tidak memiliki logika yang menjaga pemisahan antara tampilan dan kode. Handlebars dapat dikatakan sebagai sebuah mesin template (template engine)yang dapat digunakan bersama dengan Express.js untuk menghasilkan tampilan dinamis dalam aplikasi web. Handlebars memungkinkan untuk memisahkan logika aplikasi dari tampilan pada aplikasi berbasis web. Handlebars menggunakan sintaksis yang mudah dibaca dan dapat memasukkan variabel, loop, kondisi, dan lainnya ke dalam template HTML.

1. Silakan stop nodemon anda pada terminal di visual studio code dengan menekan **ctrl** **+** **c**

2. Lakukan instalasi **hbs** menggunakan perintah npm. hbs adalah sebuah mesin tampilan(view engine) express.js untuk handlebars.js. Silakan akses informasi lebih jauh terkait hbs melalui url berikut https://www.npmjs.com/package/hbs

3. Setelah instalasi selesai jalankan kembali aplikasi web-server anda menggunakan perintah **nodemon app.js**

4. Bukalah file **app.js** yang ada di folder **src** dan tambahkan baris kode berikut tepat diatas baris kode **app.use(express.static(direktoriPublic))**

app.set('view engine', 'hbs')

**PENTING!** lalu, jadikan baris kode **app.use** diatas menjadi **komentar**

5. Ubah kembali kode pada baris **app.get** halaman **utama** dan app.get halaman **tentang** pada file **app.js** di folder src dengan kode berikut

//ini halaman utama

**app.get('',(req,** $\text {res)}=>\{$

res.render('index',{

judul: 'Aplikasi Cek Cuaca',

nama: 'Randi Proska Sandra'

})

<!-- 10 -->

![](https://web-api.textin.com/ocr_image/external/099009abeda35677.jpg)

![](https://web-api.textin.com/ocr_image/external/b7e424db3bcaa4bd.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

|                                       |
| ------------------------------------- |
| //ini halaman tentang                 |
| $\Rightarrow$app.get('/tentang',(req, |
| res.render('tentang',{                |
| judul: 'Tentang Saya',                |
| nama: 'Randi Proska Sandra'           |
| })                                    |

![](https://web-api.textin.com/ocr_image/external/42b45ea630503c4d.jpg)

6. Lanjutkan program, lakukan hal yang sama untuk halaman **bantuan.** Pada baris kode halaman bantuan, tambahkan satu objek lagi yaitu **teksBantuan:** **'ini** **adalah** **teks** **bantuan'.** Khusus halaman infoCuaca biarkan saja seperti kode awal.

7. Lalu,buatlah folder baru pada aplikasi web-server anda dan beri nama **views.** Didalam folder ini,buatlah file baru dengan nama **index.hbs**

8. Salinlah semua baris kode yang ada pada file **index.html** ke file **index.hbs.** Lalu gantilah kode yang ada dalam&lt;body&gt; dengan baris kode berikut

$$<h1>\{{judul}\}</h1>$$

&lt;p&gt;Dikembangkan oleh $\{{ama}\}</p$

Catatan:

{{title}} menunjukkan bahwa file index.hbs akan mengakses title yang pada baris kode di fileapp.js.Proses pengaksesan ini telah diatur oleh handlebars. Hal ini memungkinkan penggunaan kode secara berulang.

9. Buat dua buah file lagi dalam folder **views** dengan nama **bantuan.hbs** dan **tentang.hbs.**

10. Lalu salinlah baris kode **bantuan.html** ke **bantuan.hbs** dan ubahlah baris kode yang ada didalam &lt;body&gt; dengan kode berikut

&lt;h1&gt;Bantuan Apa yang anda butuhkan?&lt;/h1&gt;

&lt;p&gt;{{teksBantuan}}&lt;/p&gt;

&lt;p&gt;Dikembangkan oleh $\{nama\}</p>$

11.Lalu salin baris kode **tentang.html** **ke** **tentang.hbs** dan ubahlah baris kode yang ada didalam &lt;body&gt; dengan kode berikut

$$<h1>\{\{judul\}\}</h1>$$

&lt;img s $\text {Src="}$ img/ISI_DENGAN_NAMA_FILE_GAMBAR_ANDA.png"&gt;

&lt;p&gt;Dikembangkan oleh {{nama $\{\}</p$

12.Jika langkah-langkah diatas sudah selesai, buatlah folder baru didalam folder public dengan nama file_html.Lalu pindahkan semua file **.html** kedalam folder ini. Hal ini bertujuan agar aplikasi tidak membaca file .html lagi melainkan file **.hbs.** Dalam praktik sebenarnya, anda dapat menghapus semua file .html karena tidak akan digunakan lagi. Selain itu file .html ini juga bersifat statis. Namun, dalam praktikum ini file .html tetap dibiarkan ada sebagai bukti apa yang sudah anda kerjakan.

13. **Ubahlah** **nama** folder views dengan nama **templates.** Lalu pahami error yang tampil pada browser anda. Error ini terjadi karena expressjs menganggap folder views sebagai lokasi default untuk file-file yang terkait dengan tampilan website kita. Hal ini tidak efektif jika memiliki banyak file yang terkait dengan tampilan (views)

![](https://web-api.textin.com/ocr_image/external/b762ab1eaf34d279.jpg)

<!-- 11 -->

![](https://web-api.textin.com/ocr_image/external/478bc6051d8bfa00.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

14. Untuk mengatasinya maka kita harus meng-kustomisasi path ke direktori folder views.Tambahkanlah kode berikut kedalam file **app.js** yang ada folder src. Penting! Cukup tambahkan baris kode yang belum ada pada baris kode anda

1 **const** $path=require('path')$

2 const **express = require('express')**

3 con $sthbs=require('hbs')$

4

5 $constapp=\exp ress()$

6

7 // Mendefinisikan jalur/path untuk konfigurasi Express

8 **const direktoriPublic = path.join(\_dirname,'../public')**

9 const **direktoriViews** = path.join(\_dirname, '../templates')

10

11 // Setup handlebars engine dan lokasi folder views

**12** **app.set('view engine', 'hbs')**

**13** **app.set('views', direktoriViews)**

14

15 // Setup direktori statis

16 **app.use(express.static(direktoriPublic))**

Gambar 9. Potongan baris kode file app.js langkah d14

Baris kode baru yang seharusnya anda tambahkan berada pada baris 3, 9 dan 13.

15. Cek kembali program anda melalui browser apakah error sudah teratasi.

# e. Mengatur Tampilan Aplikasi menggunakan sistem templating

Bagian ini hanya melanjutkan **bagian** **d** **Langkah** **15** yang bertujuan untuk mengatur tampilan aplikasi anda sehingga lebih menarik.

1. Silakan hentikan nodemon pada terminal visual studi code dengan menekan **ctrl+c**

2. Lalu jalankan kembali dengan perintah berikut **nodemon** **app.js** **-e** **js,hbs.** **PENTING!**Untuk selanjutnya, anda akan menggunakan perintah ini untuk menjalankan program anda.

3. Selanjutnya, buatlah **dua** folder baru didalam folder **templates.** Beri nama folder tersebut dengan views dan **partials.** Folder **views** akan berisi file tampilan utama, sementara folder **partials** nantinya akan berisi file tampilan partial seperti header dan footer. Hal ini diperlukan untuk membuat beberapa baris kode program menjadi dapat digunakan kembali (reusable).

4. Masukan file **index.hbs, bantuan.hbs** dan **tentang.hbs** ke folder **views**

5. Buatlah dua buah file didalam folder **partials.** File pertama beri nama **header.hbs** dan yang kedua **footer.hbs**

6. Sesuaikanlah baris kode berikut pada file app.js anda. Pastikan anda hanya mengubah yang perlu diubah.

<!-- 12 -->

![](https://web-api.textin.com/ocr_image/external/1804628891202591.jpg)

![](https://web-api.textin.com/ocr_image/external/6f0aada698f1bc84.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

| 7 <br>8 <br>9<br>10<br>11<br>12<br>13 <br>14<br>15 | // Mendefinisikan jalur/path untuk konfigurasi Express<br>const direktoriPublic = path.join(\_dirname, '../public')<br>const direktoriViews = path.join(\_dirname,'../templates/views')<br>const direktoriPartials = path.join(\_dirname, '../templates/partials')// Setup handlebars engine dan lokasi folder views<br>app.set('view engine', 'hbs')<br>app.set('views',direktoriViews)<br>hbs.registerPartials(direktoripartials) |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Gambar 10. Potongan baris kode file app.js langkah e6

Pada tampilan diatas seharusnya anda hanya perlu mengubah baris 9, 10 dan 15

7. Masukan baris kode berikut pada file **header.hbs**

| 1   | &lt;header&gt;                           |
| --- | ---------------------------------------- |
| 2   | $<h1>\{\{judul\}\}</h1>$                 |
| 3   |                                          |
| 4   | $<ahref="/">Home</a>$                    |
| 5   | $href="/tentang">Tentang</a>$            |
| 6   | $2$ href="/bantuan"&gt;Bantuan&lt;/a&gt; |
| 7   | &lt;/header&gt;                          |

Gambar 11. Potongan baris kode header.hbs langkah e7

8. Lalu, masukan baris kode berikut pada file **footer.hbs**

&lt;footer&gt;

&lt;p&gt;Dikembangkan oleh by $\{\{\text {nama}\}\}</p>$

&lt;/footer&gt;

9. Unduh icon cuaca berikut ini https://cdn-icons-png.flaticon.com/512/1779/1779940.png dan letakan pada folder **img** di aplikasi web-server anda. Jika anda ingin menggunakan gambar lainnya, silakan cari di google dan pastikan formatnya **.png** dan tidak memiliki background

10. Tambahkanlah baris kode berikut pada didalam bagian **&lt;head&gt;** pada file **index.hbs**

&lt;title&gt;Aplikasi Cek $Cuaca</title>$

&lt;link $rel="icon"href="/$ img/cuaca.png"&gt;

$$<1ink\quad rel="stylesheet"href="/css/styles.css"$$

&lt;script $src="/js/app.js"></script>$

Silakan sesuaikan teks yang di blok dengan warna merah dengan nama file icon anda

11.Lakukan kembali langkah 8 untuk file **bantuan.hbs** **dan** **tentang.hbs.** Ubahlah teks yang di blok hijau sesuai dengan judul halaman masing-masing.

12. Ubalah kode pada file style.css dengan kode berikut ini

| body{                                                                           |
| ------------------------------------------------------------------------------- |
| color: #333333;                                                                 |
| font-family: arial;<br>max-width: 650px;<br>margin: 0 auto;<br>padding: 0 16px; |
| display: flex;                                                                  |
| flex-direction: column;                                                         |
| min-height:100vh                                                                |

![](https://web-api.textin.com/ocr_image/external/6a9b6cf14c09ca8e.jpg)

<!-- 13 -->

![](https://web-api.textin.com/ocr_image/external/cae10106e374c7ef.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

| }                                                                                           |
| ------------------------------------------------------------------------------------------- |
|                                                                                             |
| .main-content {                                                                             |
| flex-grow: 1;                                                                               |
| 1}                                                                                          |
|                                                                                             |
| footer {                                                                                    |
| color: #888888;<br>border-top: 1px solid #eeeeee;<br>margin-top: 16pox;<br>padding: 16px 0; |
| }                                                                                           |
|                                                                                             |
| header {                                                                                    |
| margin-top: 16px;                                                                           |
| margin-bottom: 48px;                                                                        |
| }                                                                                           |
| h1{                                                                                         |
| font-size: 64px;<br>margin-bottom: 16px;<br>}                                               |
|                                                                                             |
| header a {                                                                                  |
| color: #888888;                                                                             |
| margin-right:16px;<br>text-decoration: none;                                                |
| {し<br>.portrait {                                                                          |
| width: 250px;                                                                               |
| }                                                                                           |

13. Ubah lagi kode pada file index.hbs, tentang.hbs dan bantuan.hbs yang ada dalam bagian **&lt;body&gt;** dengan kode berikut

a) Baris kode didalam **&lt;body&gt;** pada file **index.hbs**

&lt;div class="main-content"&gt;

{{&gt;header}}

&lt;p&gt;Aplikasi ini digunakan untuk **mengecek** Cuaca!&lt;/p&gt;

&lt;/div&gt;

**{{&gt;footer}}**

Gambar 12. Potongan baris kode index.hbs langkah e13a

b) Baris kode didalam **&lt;body&gt;** pada file **tentang.hbs**

|     | &lt;div class="main-content"&gt;<br>{{&gt;header}}<br>&lt;img class="portrait" src="/img/GANTI_DENGAN_NAMA_FILE.png"&lt;/div&gt;<br>{{&gt;footer}} |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- |

Gambar 13. Potongan baris kode tentang.hbs langkah e13b

<!-- 14 -->

![](https://web-api.textin.com/ocr_image/external/b4f11d10a8da417e.jpg)

![](https://web-api.textin.com/ocr_image/external/08e002cb6057d718.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

## c) Baris kode didalam &lt;body&gt; pada file bantuan.hbs

| $<divclass="main-content">${{&gt;header}}<br>&lt;p $\{{teksBantuan}\}</p>$ $</$div&gt;<br>{{&gt;footer}} |
| -------------------------------------------------------------------------------------------------------- |

Gambar 14. Potongan baris kode tentang.hbs langkah e13c

Catatan:

**{{&gt;header}}** **dan** **{{&gt;footer}}** digunakan mengakses file header dan footer yang ada pada folder partials

14. Berikut adalah seharusnya tampilan akhir aplikasi anda

| Aplikasi Cek Cuaca Home Tentang Bantuan      | Tentang Saya<br>Home TentangBantuan                                            | Bantuan<br>Home Tentang Bantuan |
| -------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------- |
| Aplikasi ini digunakan untuk mengecek Cuacal | <img src="https://web-api.textin.com/ocr_image/external/847234e99d48b648.jpg"> | in adaiah teks bantuan          |

Dikembangkan oleh by Randi Proska Sandra Dikembangkan oleh by Randi Proskai Sandra Dikmbangkan olh by Rand Proska Sandra

Gambar 15. Tampilan akhir aplikasi web-server- halaman home (kiri), halaman tentang (tengah) dan

halaman bantuan (kanan)

# f. Wildcard route pada Expressjs

Expressjs memungkinkan pembuatan routing menggunakan wildcard seperti tanda \*. Hal ini biasa digunakan programmer untuk menunjukan bahwa sebuah halaman (page) tidak ada seperti error 404.

1. Silakan tambahkan baris kode berikut pada file **app.js** yang ada didalam folder src. Letakan tepat **diatas app.listen** dan **dibawah app.get** untuk halaman infoCuaca

51 app.get('/bantuan/\*' $(req,$ $=>\{$

52 **res.render('404',{**

53 **judul**: '404',

54 **nama: 'Randi Proska Sandra',**

55 **pesanKesalahan**: **'Artikel yang** dicari tidak ditemukan.'

56

**57** **})**

58

59 **app.get(** $\left('^{*\prime },\right.$ $(req,$ $=>\{$

60 **res.render('404',{**

61 **judul:'404',**

62 **nama: 'Randi Proska** Sandra',

63 **pesanKesalahan**: **'Halaman tidak** ditemukan.'

64

![](https://web-api.textin.com/ocr_image/external/e419f38117d8dd0f.jpg)

65 })

Gambar 16. Potongan baris kode file app.js langkah fl tentang wildcard

![](https://web-api.textin.com/ocr_image/external/99a38a248b8f1c48.jpg)

<!-- 15 -->

![](https://web-api.textin.com/ocr_image/external/2afebc573e54f042.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

Catatan:

a. **app.get('/bantuan/\*,.......)** digunakan untuk menampilkan pesan kesalahan ketika sebuah halaman artikel pada url ..../bantuan tidak ditemukan

b. app.get(\*\*........) digunakan untuk menampilkan pesan kesalahan ketika sebuah halaman di url manapun tidak ditemukan

2. Selanjutnya, buatlah file baru pada folder templates/views dengan nama **404.hbs** dan tambahkan baris kode berikut ini

| &lt;!DOCTYPE html&gt;                                |
| ---------------------------------------------------- |
| &lt;html&gt;                                         |
| &lt;head&gt;                                         |
| $<title>404</title>$ $f="/i$                         |
| &lt;link $\text {rel="icon"}$ hre mg/cuaca.png"&gt;  |
| &lt;link rel="stylesheet"$t"href="/css/styles.css">$ |
| &lt;Sscript $="ja.j"$ $></script>$                   |
| &lt;/head&gt;<br>\                                   |
| a dy&gt;                                             |
| $<dvl$ $ass="main-content">$                         |
| $\{\{\text {>heac}$der}}                             |
| &lt;p&gt;{{$</p>}$                                   |
| &lt;/div&gt;                                         |
| $\{>footer\}$                                        |
| &lt;/body&gt;                                        |
| &lt;/html&gt;                                        |

3. Silakan ketikan url berikut pada browser anda http://localhost:4000/tes dan http://localhost:4000/bantuan/tes. Lalu pahamilah apa yang ditampilkan.

## TUGAS

1. Perhatikan bahwa didalam kode anda pada file **index.hbs, tentang.hbs, bantuan.hbs** dan **404.hbs** terjadi penggunaan beberapa baris kode berulang pada bagian **&lt;head&gt;.** Buatlah kode tersebut menjadi lebih efisien dengan dengan menampungnya pada file.hbs terpisah didalam folder **partials.** Baris kode pada bagian **&lt;title&gt;teks&lt;/title&gt;** harus tetap bersifat dinamis sehingga ketika halaman diganti maka title halaman juga berganti.

# REFERENCES

1. Casciaro, M., & Mammino, L. (2020,July). Node. Js Design Patterns (3rd ed.) [Packtpub].Packt Publishing. https://www.packtpub.com/product/nodejs-design-patterns-third-

edition/9781839214110

2. Pasquali, S. (2013, November). Mastering Node.js [Packtpub]. Packt Publishing.https://www.packtpub.com/product/mastering-nodejs/9781782166320

3. Leka, M. (2020, August 12). Exploring the JavaScript Ecosystem: Popular Tools, Frameworks,Libraries. Medium. Retrieved October 1, 2023, from

<!-- and 16 -->

![](https://web-api.textin.com/ocr_image/external/8051342da362fd32.jpg)

![](https://web-api.textin.com/ocr_image/external/f5083bb48b33c857.jpg)

<!-- Pemrograman Berbasis Jaringan -->

<!-- Menggunakan Node.JS -->

<!-- Randi Proska Sandra, S.Pd, M.Sc ©2023 -->

https://mirzaleka.medium.com/exploring-javascript-ecosystem-popular-tools-frameworks-libraries-7901703ec88f

4. Panchal, M. (2022, May 4). What Is ExpressJS In Node JS?-Backend Framework For Web Apps. Excellent Webworld. Retrieved October 1, 2023, from https://www.excellentwebworld.com/what-is-expressjs-in-node-js/

5. MDN (Mozilla Developer Network). (2023, July3). What is a web server?. Mozilla Developer.Retrieved October 1, 2023, from https://developer.mozilla.org/en-US/docs/Learn/Common questions/Web mechanics/What is a web server

6. OpenJS Foundation. (n.d.). Express routing (StrongLoop/IBM, Trans.). Expressjs. Retrieved October 1,2023,from https://expressjs.com/en/guide/routing.html

![](https://web-api.textin.com/ocr_image/external/1220187d0925690a.jpg)

<!-- 17 -->

![](https://web-api.textin.com/ocr_image/external/73c34ed3cb10a9d6.jpg)
