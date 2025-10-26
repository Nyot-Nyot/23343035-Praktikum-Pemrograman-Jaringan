![header](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%206&section=header&reversal=false&textBg=false&fontAlign=70&fontAlignY=30&animation=fadeIn&rotate=20&desc=JSON%20HTTP%20Endpoints&descAlign=55&descAlignY=45)

# Laporan Mingguan — Minggu ke-8

**Nama:** Dzaki Sultan Rabbani<br>
**NIM:** 23343035<br>
**Kelas:** Informatika — Universitas Negri Padang<br>
**Minggu ke:** 8<br>
**Tanggal:** 26 Oktober 2025<br>

---

## 1. Fokus & Tujuan

Fokus minggu ini adalah mengimplementasikan HTTP JSON endpoints dan mengintegrasikannya dengan layanan pihak ketiga untuk membangun sebuah aplikasi cuaca sederhana. Tujuan praktikum adalah memahami bagaimana melakukan pemanggilan API eksternal (geocoding dan data cuaca), merangkai beberapa panggilan tersebut menjadi alur yang benar (API chaining), serta menampilkan hasilnya ke pengguna melalui endpoint JSON dan antarmuka web yang interaktif.

Secara terukur, tujuan yang saya tetapkan untuk minggu ini adalah: memastikan server Express dapat melayani endpoint pencarian cuaca berbasis query string, menghubungkan Mapbox Geocoding untuk mengonversi nama lokasi menjadi koordinat, memanggil Weatherstack untuk mendapatkan data cuaca berdasarkan koordinat tersebut, dan menampilkan hanya informasi cuaca yang relevan (deskripsi cuaca, suhu, indeks UV, visibilitas) di antarmuka klien.

## 2. Konsep Pemrograman Jaringan

Dalam tugas ini ada beberapa konsep jaringan penting yang menjadi pusat perhatian. Saya menjelaskan masing-masing secara ringkas dan menerapkannya pada kode.

HTTP Request/Response Cycle

HTTP adalah protokol application-layer yang menjadi tulang punggung komunikasi antara klien (browser) dan server (Express). Pada aplikasi ini alur dasarnya adalah: klien mengirim GET request ke endpoint `/cuaca` atau ke endpoint JSON (`/infoCuaca` sesuai jobsheet), server menerima request, melakukan satu atau lebih panggilan HTTP ke API eksternal, kemudian menyusun response JSON yang dikembalikan ke klien. Pemahaman tentang status code, headers, dan payload penting saat men-debug error dari layanan eksternal.

API Chaining dan Sequential Asynchronous Operations

Aplikasi ini membutuhkan dua panggilan berurutan: pertama ke Mapbox untuk geocoding (menghasilkan latitude/longitude), lalu ke Weatherstack untuk data cuaca berdasarkan koordinat. Karena kedua panggilan bersifat I/O dan asynchronous, kita tidak bisa meminta weather sebelum koordinat tersedia. Implementasi yang digunakan di repositori (callback-based) memperlihatkan pola "API chaining" dan menekankan pentingnya mengatur flow asynchronous dengan benar agar error tertangani dan response tetap cepat.

Non-blocking I/O dan Event Loop

Node.js bersifat non-blocking sehingga server tetap mampu merespons request lain sambil menunggu hasil panggilan ke Mapbox/Weatherstack. Pada implementasi callback ini, ketika request ke API eksternal sedang berjalan, Node tetap dapat menerima dan memproses request lain karena operasi I/O tidak mem-blok event loop.

Error Handling pada Network Calls

Panggilan jaringan rentan terhadap berbagai failure: kegagalan koneksi, perubahan struktur respons, limit rate, atau API key tidak valid. Oleh sebab itu kedua utilitas (`geoCode` dan `prediksiCuaca`) memiliki pengecekan defensif — menangani error jaringan, memeriksa keberadaan `response.body` dan elemen yang diharapkan, serta mengembalikan pesan error yang jelas kepada pemanggil.

## 3. Arsitektur & Alur Sistem

Aplikasi disusun sebagai server Express sederhana yang menaruh static web di `public/` dan views HBS di `templates/views`. Logika jaringan ditempatkan di `src/utils` agar terpisah dari routing. Diagram arsitektur berikut memberikan visual yang lebih terstruktur: komponen klien di kiri, server dan util di tengah, dan layanan pihak ketiga di kanan. Panah menunjukkan arah panggilan dan protokol/endpoint utama.

```
┌─────────────────┐       HTTP GET /cuaca?address=...      ┌────────────────────────┐
│   User Browser  │ ─────────────────────────────────────► │   Express Server       │
│ (public + JS)   │ ◄───────────────────────────────────── │  (src/app.js)          │
│ - index.hbs     │     JSON { forecast, location, ... }   │  - routing & views     │
└─────────────────┘                         │              └────────────────────────┘
                                            │
                                            │ calls (internal)
                                            ▼
                                    ┌───────────────────────────────┐
                                    │ Controller / Router Handler   │
                                    └────────┬──────────────────────┘
                                             │
                          ┌──────────────────┴──────────────────────────────────────┐
                          │                                                         │
                          ▼                                                         ▼
                ┌────────────────────────────────┐                         ┌───────────────────────────────┐
                │ geoCode (src/utils/geoCode.js) │                         │| prediksiCuaca (src/utils/*)  │
                │ - builds Mapbox URL            │                         │ - builds Weatherstack URL     │
                │ - returns { latitude, lon }    │                         │ - returns { current weather } │
                └─────────┬──────────────────────┘                         └─────────┬─────────────────────┘
                          │                                                          │
                          │ HTTPS request (Mapbox)                                   │ | HTTP request (Weatherstack)
                          ▼                                                          ▼
                  ┌────────────────────────────┐                          ┌────────────────────────────────┐
                  │ Mapbox Geocoding API       │                          │ Weatherstack API (current)     │
                  │ (https://api.mapbox.com)   │                          │ (http://api.weatherstack.com)  │
                  └───────┬────────────────────┘                          └────────────────────────────────┘
                          ▲                                                          ▲
                          │                                                          │
                          └─────────────────┐ coordinates ───────────────────────────┘
                                            │
                                            ▼
                                   Express aggregates results & responds JSON

```

Komponen utama:

- Server: `src/app.js` (routing, view rendering, static files)
- Controller / Router: menangani validasi query, memanggil util, dan menyusun response JSON
- Geocoding util: `src/utils/geoCode.js` (Mapbox) — bertugas mendapatkan koordinat dari nama lokasi
- Weather util: `src/utils/prediksiCuaca.js` (Weatherstack) — bertugas mengambil data cuaca berdasarkan koordinat
- Klien: `public/js/app.js` (fetch + render) — melakukan `fetch('/cuaca?address=...')` lalu merender hasil ke DOM

## 4. Implementasi & Pekerjaan yang Diselesaikan

Saya mengikuti struktur yang direkomendasikan jobsheet dan memodularisasi code agar tiap bagian bertanggung jawab atas satu hal.

Geocoding (`src/utils/geoCode.js`)

Modul ini melakukan request HTTP ke Mapbox Geocoding API. Beberapa poin implementasi penting:

- Membaca kunci API dari `process.env.MAPBOX_KEY` (file `.env`).
- URL dibangun dengan `encodeURIComponent(address)` untuk menghindari masalah karakter.
- Melakukan pengecekan terhadap `response.body.features` agar tidak mencoba mengakses properti yang tidak ada.

Potongan kode inti (disederhanakan):

```javascript
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  address
)}.json?access_token=${MAPBOX_KEY}&limit=1`;
request({ url, json: true }, (error, response) => {
  if (error)
    return callback("Unable to connect to location services!", undefined);
  if (!response || !response.body)
    return callback("No response from location services.", undefined);
  if (
    !Array.isArray(response.body.features) ||
    response.body.features.length === 0
  ) {
    return callback("Unable to find location. Try another search.", undefined);
  }
  const feature = response.body.features[0];
  callback(undefined, {
    latitude: feature.center[1],
    longitude: feature.center[0],
    location: feature.place_name,
  });
});
```

Prediksi cuaca (`src/utils/prediksiCuaca.js`)

Modul ini memanggil Weatherstack dengan koordinat yang diperoleh dari Mapbox, kemudian mengekstrak field yang dibutuhkan: `weather_descriptions`, `temperature`, `uv_index`, `visibility`, dan `precip` (jika tersedia). Kunci API juga diambil dari `.env`.

Potongan kode inti (disederhanakan):

```javascript
const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${latitude},${longitude}`;
request({ url, json: true }, (error, { body } = {}) => {
  if (error) {
    callback("Unable to connect to weather service!", undefined);
  } else if (body && body.error) {
    callback("Unable to find weather for the given location.", undefined);
  } else {
    const data = body.current;
    callback(undefined, {
      weather_descriptions: data.weather_descriptions,
      temperature: data.temperature,
      uv_index: data.uv_index,
      visibility: data.visibility,
      precipitation: data.precip,
    });
  }
});
```

Routing & Rendering (`src/app.js`)

Endpoint penting adalah `GET /cuaca` yang menerima query `address`. Alur di router:

1. Validasi `req.query.address` — jika kosong kembalikan error JSON.
2. Panggil `geoCode(address, ...)`. Jika error, kirimkan error.
3. Jika berhasil, panggil `forecast(lat, lon, ...)`. Jika error, kirimkan error.
4. Bila sukses, kirimkan response JSON yang berisi `forecast`, `location`, dan `address`.

Klien (`public/js/app.js`)

Di sisi klien, sebuah form dengan `id="weather-form"` mengirimkan request via fetch ke `/cuaca?address=...`. Hasil kemudian dirender ke dalam `#weather-result`. Saya mengubah rendering supaya menampilkan hanya empat informasi yang diminta: deskripsi cuaca, suhu, index UV, dan visibilitas.

Potongan rendering (klien):

```javascript
resultContainer.innerHTML = `
  <div class="weather-card">
    <h4 class="weather-location">${escapeHtml(location)}</h4>
    <p class="weather-desc">${escapeHtml(description)}</p>
    <div class="weather-grid">
      <div class="weather-row"><span class="label">Suhu</span><span>${escapeHtml(
        String(forecast.temperature ?? "-")
      )} °C</span></div>
      <div class="weather-row"><span class="label">Index UV</span><span>${escapeHtml(
        String(forecast.uv_index ?? "-")
      )}</span></div>
      <div class="weather-row"><span class="label">Visibilitas</span><span>${escapeHtml(
        String(forecast.visibility ?? "-")
      )} km</span></div>
    </div>
  </div>
`;
```

Kunci dan lingkungan

Semua kunci API disimpan di file `.env` pada folder `week-08/web-server/.env` sehingga tidak hard-coded ke source. Contoh variabel:

```
WEATHERSTACK_KEY=...
MAPBOX_KEY=...
```

Ini memudahkan untuk menukar kunci saat mencoba di mesin lain dan mencegah kebocoran kunci ke repository jika `.env` ditambahkan ke `.gitignore`.

## 5. Kendala, Solusi & Pembelajaran

1. Masalah: Respons server cepat menampilkan "Server berjalan pada port 4000" namun klien tidak mendapatkan data (atau menampilkan "-").

Penyebab: Bisa jadi disebabkan oleh beberapa hal: kunci API tidak valid, respons dari Weatherstack mengandung error object, atau struktur respons berbeda dari yang diasumsikan (misal nama field berbeda). Selain itu, pada environment development kadang proses dijalankan dari working directory yang berbeda sehingga `dotenv` tidak memuat `.env` yang benar.

Solusi: Memastikan file `.env` berada di root project yang sama saat aplikasi dijalankan, memeriksa log server untuk error dari utilitas request, dan menambahkan pengecekan defensif di utilitas `geoCode` dan `prediksiCuaca`. Saat men-debug saya juga menjalankan server langsung dengan path absolut untuk memastikan Node membaca `.env` yang benar dan bukan dari folder berbeda.

Pembelajaran: Menyimpan konfigurasi (API keys) di environment sangat membantu. Selain itu, selalu periksa struktur JSON yang dikirimkan oleh API pihak ketiga karena dokumentasi free-tier kadang berbeda atau ada batasan fields.

2. Masalah: Multiple format respons atau missing fields (misal `weather_descriptions` tidak berupa array).

Penyebab: Provider API kadang mengubah field names atau format pada tier tertentu.

Solusi: Terapkan defensif parsing: jika `weather_descriptions` adalah array maka join, jika string maka tampilkan langsung, dan jika tidak ada tampilkan tanda '-' sebagai fallback.

Pembelajaran: Robust parsing mengurangi bug saat mengonsumsi data eksternal.

## 6. Testing & Validasi

Saya melakukan beberapa pengujian manual untuk memastikan endpoint dan UI berfungsi:

1. Menjalankan server di folder `week-08/web-server` dengan perintah:

```fish
npm run dev
```

2. Mengakses halaman: `http://localhost:4000` lalu memasukkan beberapa lokasi dan mengamati hasil.

Test cases singkat:

- Valid city name (contoh: "padang") — Mengembalikan deskripsi, suhu (angka), index UV, visibilitas → PASS
  ![Valid city](/assets/images/week-08/week-08-valid.png)

- City with spaces (contoh: "new york") — URL di-encode dan hasil kembali → PASS
  ![Space case](/assets/images/week-08/week-08-space.png)

- Invalid city ("xyzabc123") — Mapbox mengembalikan features kosong → server mengembalikan pesan error "Unable to find location. Try another search." → PASS
  ![invalid case](/assets/images/week-08/week-08-invalid.png)

- Empty input — Klien menampilkan pesan bahwa lokasi harus diisi (client-side validation + server-side check) → PASS
  ![Empty case](/assets/images/week-08/week-08-empty.png)

Catatan performa: karena kedua API eksternal memerlukan panggilan jaringan, pengalaman pengguna tergantung latensi. Untuk memperbaiki UX pada kondisi koneksi lambat, kita menampilkan state loading di `#weather-result` saat fetch sedang berjalan.

## 7. Refleksi & Rencana Pengembangan

Secara teknis saya belajar lebih banyak tentang handling data dari layanan pihak ketiga dan menerapkan defensive programming ketika mengonsumsi JSON yang mungkin berubah-ubah. Saya paham kenapa workflow "geocoding → weather" harus berurutan dan bagaimana Node.js event loop memungkinkan server tetap responsif meskipun menunggu panggilan jaringan.

## 8. Referensi & Sumber Belajar

- Mapbox Geocoding API Documentation: https://docs.mapbox.com/api/search/geocoding/
- Weatherstack API Documentation: https://weatherstack.com/documentation
- Node.js Async Programming Guide: https://nodejs.dev/learn/asynchronous-flow-control

---

### Lampiran: Lokasi file penting di repository

- `src/app.js` — Routing & server setup
- `src/utils/geoCode.js` — Geocoding Mapbox
- `src/utils/prediksiCuaca.js` — Weatherstack wrapper
- `public/js/app.js` — Client-side fetch + render
- `.env` (lokasi: `week-08/web-server/.env`) — menyimpan `MAPBOX_KEY` dan `WEATHERSTACK_KEY`

![footer](https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Module%206&section=footer&reversal=false&textBg=false&fontAlign=40&fontAlignY=70&animation=fadeIn&rotate=20&desc=JSON%20HTTP%20Endpoints&descAlign=45&descAlignY=80)
