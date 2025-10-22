![header](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%203&section=header&reversal=false&textBg=false&fontAlign=70&fontAlignY=30&animation=fadeIn&rotate=20&desc=HTTP%20Request%20and%20API&descAlign=55&descAlignY=45)

---

# 🧾 Laporan Mingguan

**Nama:** Dzaki Sultan Rabbani<br>
**NIM:** 23343035<br>
**Kelas:** Informatika — Universitas Negeri Padang<br>
**Minggu ke:** 6<br>
**Tanggal:** 22 Oktober 2025

---

## 🎯 Fokus Minggu Ini

> Implementasi HTTP request ke layanan eksternal (Mapbox untuk geocoding dan Weatherstack untuk data cuaca), mempelajari cara mengambil koordinat dari Mapbox lalu menggunakan koordinat tersebut untuk memanggil API Weatherstack secara dinamis.

---

## ⚙️ Pekerjaan yang Diselesaikan

-   Membaca Jobsheet 3: topik utama adalah HTTP Request dan penggunaan API eksternal.
-   Mengimplementasikan permintaan HTTP ke Mapbox (geocoding forward) untuk mendapatkan informasi lokasi dan koordinat.
-   Mengambil koordinat (latitude dan longitude) dari response Mapbox lalu membangun URL Weatherstack secara dinamis: `?query=<lat>,<lon>`.
-   Memanggil Weatherstack menggunakan URL dinamis dan menampilkan data cuaca (temperature, precip, weather description) di console.
-   Menambahkan latihan pemanggilan Weatherstack secara statis di `app.js` (menggunakan URL dengan koordinat tetap dan parsing JSON manual).

Contoh potongan kode (intinya):

```js
// setelah menerima response Mapbox
const lat = coordinates.latitude;
const lon = coordinates.longitude;
const dynamicWeatherUrl = `http://api.weatherstack.com/current?access_key=YOUR_ACCESS_KEY&query=${lat},${lon}`;
request({ url: dynamicWeatherUrl, json: true }, (err, resp) => {
	// implementasi data fetch
});
```

File utama yang diubah/dibuat:

-   `week-06/aplikasiCuaca/app.js` — latihan memanggil Weatherstack secara statis dan menampilkan `data.current.temperature`.
-   `week-06/aplikasiCuaca/cekCuaca.js` — menambahkan pembuatan URL Weatherstack dinamis dan permintaannya; juga memanggil Mapbox untuk geocoding.
-   `week-06/aplikasiCuaca/package.json` — berisi dependensi `postman-request` dan entry point `app.js`.

---

## 🧩 Kendala dan Solusi

-   Kendala: Format koordinat dari Mapbox bisa berbeda (objek dengan keys `latitude`/`longitude` atau array `[lon, lat]`).
    -   Solusi: Periksa format `coordinates` sebelum digunakan; jika berupa array, ambil index yang sesuai.
-   Kendala: Kunci API tertulis dalam kode (security/privacy).
    -   Solusi: Untuk produksi, pindahkan kunci ke environment variables dan jangan commit ke repo publik.

---

## 🧠 Pemahaman Teknis

-   HTTP GET sederhana ke API dapat dibangun dengan menambahkan query string pada URL (mis. `?access_key=...&query=lat,lon`).
-   Beberapa layanan mengembalikan koordinat dalam format berbeda; selalu validasi struktur response.
-   Alur asynchronous dengan callback: panggilan ke Mapbox harus selesai dulu untuk mendapatkan koordinat, lalu memanggil Weatherstack (nested callback atau gunakan async/await untuk lebih rapi).
-   Pentingnya penanganan error pada setiap request: network error, JSON parse error, dan response yang tidak lengkap.

---

## 📂 Dokumentasi Pendukung

-   File kode:
    -   `week-06/aplikasiCuaca/app.js` (latihan Weatherstack statis, parsing JSON manual).
    -   `week-06/aplikasiCuaca/cekCuaca.js` (Mapbox geocoding + Weatherstack dinamis).
    -   `week-06/aplikasiCuaca/package.json` (dependensi `postman-request`).
-   Contoh output saat dijalankan (console):

    Query yang dikirim: padang utara
    Data yang ditemukan: Padang Utara, Padang, West Sumatra, Indonesia
    Tipe data lokasi: locality
    Koordinat lokasi: { longitude: 100.36727, latitude: -0.923939 }

    Cuaca untuk koordinat -0.923939,100.36727:
    Suhu: 28 °C
    Kemungkinan hujan: 0 %
    Deskripsi: Partly Cloudy

(Anda bisa menjalankan skrip dengan: `node week-06/aplikasiCuaca/cekCuaca.js`)

---

**Dibuat oleh:**
_Dzaki Sultan Rabbani — Informatika UNP_
🗓️ 22 Oktober 2025

![footer](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%203&section=footer&reversal=false&textBg=false&fontAlign=40&fontAlignY=65&animation=fadeIn&rotate=20&desc=HTTP%20Request%20and%20API&descAlign=50&descAlignY=78)
