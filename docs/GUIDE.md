# 📘 Panduan Mengerjakan Laporan Jobsheet Mingguan

> **Dokumentasi ini dibuat untuk membantu kamu membuat laporan yang informatif, mendalam, dan menunjukkan pemahaman konsep pemrograman jaringan—bukan sekedar log aktivitas.**

---

## 🎯 Tujuan Laporan

Laporan mingguan bertujuan untuk:

1. **Mendokumentasikan pembelajaran** konsep pemrograman jaringan
2. **Menunjukkan pemahaman mendalam** tentang teori dan implementasi
3. **Menganalisis** keputusan teknis dan trade-offs
4. **Merefleksikan** proses pembelajaran dan area improvement

**❌ Bukan untuk:**

-   Sekadar mencatat aktivitas harian
-   Copy-paste kode tanpa penjelasan
-   Menulis tutorial step-by-step

---

## 📋 Struktur Laporan & Cara Mengisi

### 1. 🎯 Fokus & Tujuan Pembelajaran

**Tujuan:** Menjelaskan apa yang ingin dicapai minggu ini.

**Cara mengisi:**

-   Baca jobsheet dengan teliti
-   Identifikasi topik utama (misal: "HTTP Request", "Asynchronous Programming")
-   Tulis 3-4 tujuan pembelajaran spesifik yang **measurable**

**✅ Contoh BAIK:**

```markdown
**Fokus minggu ini:** HTTP Request dan API Integration

**Tujuan pembelajaran:**

-   Memahami cara kerja HTTP request/response cycle
-   Mengimplementasikan API chaining (geocoding → weather data)
-   Menguasai error handling untuk network requests
-   Membandingkan callback vs promise vs async/await
```

**❌ Contoh BURUK:**

```markdown
**Fokus minggu ini:** Belajar API

**Tujuan pembelajaran:**

-   Belajar API
```

---

### 2. 🌐 Konsep Pemrograman Jaringan

**Tujuan:** Menjelaskan KONSEP TEORITIS yang dipelajari. **INI BAGIAN PALING PENTING!**

**Cara mengisi:**

1. Identifikasi konsep utama dari jobsheet (minimal 2-3 konsep)
2. Untuk setiap konsep, jelaskan:
    - **Definisi** dalam kata-katamu sendiri
    - **Mengapa penting** dalam konteks pemrograman jaringan
    - **Bagaimana bekerja** (mekanisme/alur)
    - **Use case** di dunia nyata

**Template per konsep:**

```markdown
**[Nama Konsep]:**

**Definisi:** [Jelaskan dengan kata-katamu sendiri]

**Mengapa Penting:** [Kenapa konsep ini relevan untuk pemrograman jaringan?]

**Cara Kerja:** [Jelaskan mekanisme/alurnya]

**Use Case:** [Contoh penerapan di aplikasi nyata]
```

**✅ Contoh BAIK:**

```markdown
**HTTP Request/Response Cycle:**

**Definisi:**
HTTP adalah protokol application layer yang mendefinisikan bagaimana client dan server berkomunikasi melalui jaringan. Komunikasi terjadi dalam bentuk request (dari client) dan response (dari server).

**Mengapa Penting:**
Ini adalah fondasi dari semua komunikasi web. Tanpa memahami HTTP, kita tidak bisa membangun aplikasi yang berkomunikasi dengan server atau API eksternal.

**Cara Kerja:**

1. Client membuat HTTP request dengan method (GET/POST), URL, headers, dan body (optional)
2. Request dikirim melalui jaringan ke server
3. Server memproses request dan mengirim response dengan status code, headers, dan body
4. Client menerima dan memproses response

**Use Case:**

-   Mobile app mengambil data dari server (GET request)
-   Form submission di website (POST request)
-   Integration dengan payment gateway, social media API, dll.
```

**✅ Contoh untuk Week 5 (Asynchronous):**

```markdown
**Non-Blocking I/O:**

**Definisi:**
Non-blocking I/O adalah teknik di mana operasi I/O (file read/write, network request) tidak menghentikan eksekusi program. Program bisa melanjutkan eksekusi kode lain sambil menunggu I/O selesai.

**Mengapa Penting:**
Dalam aplikasi jaringan, operasi network sering memakan waktu (bisa ratusan ms). Jika blocking, aplikasi akan freeze dan tidak bisa handle request lain—ini fatal untuk server.

**Cara Kerja:**
Node.js menggunakan event loop: ketika async operation dimulai, Node.js mendaftarkannya ke event loop dan melanjutkan kode berikutnya. Ketika operation selesai, callback dieksekusi.

**Use Case:**

-   Web server yang handle ribuan concurrent connections
-   Database query sambil melayani HTTP request lain
-   API call ke multiple services secara paralel
```

**❌ Contoh BURUK:**

```markdown
**Asynchronous Programming:**
Saya belajar async programming untuk membuat program tidak blocking.
```

---

### 3. 🏗️ Arsitektur & Alur Sistem

**Tujuan:** Visualisasi arsitektur aplikasi yang dibuat.

**Cara mengisi:**

1. Buat diagram arsitektur menggunakan ASCII art atau tools seperti:
    - [Excalidraw](https://excalidraw.com/)
    - [Draw.io](https://app.diagrams.net/)
    - [untuk diagram sederhana)](https://asciiflow.com/#/)
2. Jelaskan alur eksekusi step-by-step
3. Highlight komponen jaringan (API calls, protocols, data flow)

**✅ Contoh BAIK (Week 6):**

```markdown
### Diagram Arsitektur

┌──────────────────────────────────────────────────────────┐
│ Aplikasi Node.js │
│ │
│ ┌────────────┐ ┌────────────┐ │
│ │ Input │ │ Output │ │
│ │ (city name)│ │ (weather) │ │
│ └─────┬──────┘ └──────▲─────┘ │
│ │ │ │
│ ▼ │ │
│ ┌─────────────┐ ┌────┴──────┐ │
│ │ geocodeCity │ │ getWeather│ │
│ │ function │───────────▶│ function │ │
│ └─────┬───────┘ coords └───────────┘ │
└────────┼──────────────────────────────────────────────┘
│ ▲
│ HTTP GET │ HTTP GET
│ (city name) │ (lat,lon)
▼ │
┌─────────────┐ ┌─────┴────────┐
│ Mapbox API │ │ Weatherstack │
│ (Geocoding) │ │ API │
└─────────────┘ └──────────────┘
Internet Internet

### Alur Eksekusi

1. **Input Processing:** User memasukkan nama kota (misal: "padang utara")
2. **Geocoding Request:**
    - Aplikasi membuat HTTP GET request ke Mapbox API
    - URL: `https://api.mapbox.com/search/geocode/v6/forward?q=padang+utara&access_token=...`
3. **Geocoding Response:**
    - Mapbox mengembalikan JSON dengan koordinat: {lat: -0.923939, lon: 100.36727}
4. **Weather Request:**
    - Aplikasi menggunakan koordinat untuk request ke Weatherstack
    - URL: `http://api.weatherstack.com/current?query=-0.923939,100.36727`
5. **Weather Response:**
    - Weatherstack mengembalikan data cuaca (temperature, description, dll)
6. **Output:** Aplikasi menampilkan hasil ke console
```

---

### 4. ⚙️ Implementasi & Pekerjaan yang Diselesaikan

**Tujuan:** Dokumentasikan implementasi teknis.

**Cara mengisi:**

-   List fitur yang diimplementasikan (gunakan checklist ✅)
-   Tampilkan potongan kode PENTING dengan penjelasan
-   Fokus pada bagian yang relevan dengan **pemrograman jaringan**

**✅ Contoh BAIK:**

````markdown
### Fitur yang Diimplementasikan

-   ✅ **Geocoding Integration:** Request ke Mapbox API untuk convert city name ke coordinates
-   ✅ **Weather Data Fetching:** Request ke Weatherstack API menggunakan coordinates
-   ✅ **API Chaining:** Output Mapbox menjadi input Weatherstack (nested callbacks)
-   ✅ **Error Handling:** Try-catch dan validasi response untuk kedua API

### Potongan Kode Penting

**API Chaining dengan Nested Callbacks:**

```javascript
// Request ke Mapbox dulu
request({ url: geocodeUrl, json: true }, (error, response) => {
	const coordinates = response.body.features[0].properties.coordinates;
	const lat = coordinates.latitude;
	const lon = coordinates.longitude;

	// Setelah dapat koordinat, request ke Weatherstack
	const weatherUrl = `http://api.weatherstack.com/current?query=${lat},${lon}`;
	request({ url: weatherUrl, json: true }, (err2, resp2) => {
		console.log("Suhu:", resp2.body.current.temperature);
	});
});
```
````

**Penjelasan:**
Kode ini mendemonstrasikan **API chaining** dan **nested callbacks**. Kita tidak bisa request weather data sebelum mendapat koordinat dari geocoding—ini adalah **sequential asynchronous operations** yang umum dalam pemrograman jaringan. Pattern ini disebut "callback hell" dan akan kita improve dengan Promise/async-await di minggu depan.

````

---

### 5. 🧩 Kendala, Solusi & Pembelajaran

**Tujuan:** Dokumentasikan problem-solving process.

**Cara mengisi:**
Untuk setiap kendala, gunakan format 4-poin:
1. **Masalah:** Apa yang terjadi?
2. **Penyebab:** Root cause analysis (debugging process)
3. **Solusi:** Langkah konkret yang diterapkan
4. **Pembelajaran:** Insight yang didapat (ini paling penting!)

**✅ Contoh BAIK:**
```markdown
**1. API Key Exposure di Git**
- **Masalah:** Setelah commit, API key terlihat di GitHub history—security risk!
- **Penyebab:** Hardcode API key langsung di source code
- **Solusi:**
  1. Buat file `.env` dengan `MAPBOX_KEY=xxx` dan `WEATHERSTACK_KEY=xxx`
  2. Install package `dotenv` dan load dengan `require('dotenv').config()`
  3. Tambahkan `.env` ke `.gitignore`
  4. Gunakan `process.env.MAPBOX_KEY` di kode
- **Pembelajaran:**
  - **Security best practice:** Never commit secrets to version control
  - **12-factor app methodology:** Configuration harus di environment, bukan kode
  - Di production, gunakan secret management tools (AWS Secrets Manager, dll)
  - Rotate API keys yang sudah ter-expose
````

---

### 6. 🧪 Testing & Validasi

**Tujuan:** Dokumentasikan testing yang dilakukan.

**Cara mengisi:**

-   Buat tabel test cases dengan hasil
-   Dokumentasikan edge cases
-   Lampirkan screenshot/output

**✅ Contoh BAIK:**

````markdown
### Test Cases

| No  | Test Case          | Input                 | Expected Output                  | Actual Result             | Status               |
| --- | ------------------ | --------------------- | -------------------------------- | ------------------------- | -------------------- |
| 1   | Valid city name    | "padang utara"        | Suhu dan data cuaca Padang Utara | Suhu: 28°C, Partly Cloudy | ✅                   |
| 2   | City with spaces   | "new york"            | Data cuaca New York              | Suhu: 15°C, Cloudy        | ✅                   |
| 3   | Invalid city       | "xyzabc123"           | Error message atau empty result  | Error: Location not found | ✅                   |
| 4   | Empty input        | ""                    | Error message                    | Error: Query required     | ✅                   |
| 5   | Special characters | "paris!@#"            | Sanitized atau error             | Error: Invalid characters | ❌ (perlu implement) |
| 6   | Network failure    | (disconnect internet) | Timeout error                    | Hangs forever             | ❌ (perlu timeout)   |

### Edge Cases

**1. Ambiguous city names:**

-   **Problem:** Banyak kota dengan nama sama (Paris di France vs Paris, Texas)
-   **Current behavior:** Mapbox return hasil pertama (usually yang paling populer)
-   **Improvement:** Tambahkan country parameter atau tampilkan multiple options

**2. API rate limiting:**

-   **Problem:** Weatherstack free tier limited 1000 requests/month
-   **Current behavior:** Akan error 429 jika exceed limit
-   **Improvement:** Implement caching dan request counter

### Output & Screenshots

**Test Run 1: Valid City**

```bash
$ node cekCuaca.js

Query yang dikirim: padang utara
Data yang ditemukan: Padang Utara, Padang, West Sumatra, Indonesia
Koordinat lokasi: { longitude: 100.36727, latitude: -0.923939 }

Cuaca untuk koordinat -0.923939,100.36727:
Suhu: 28 °C
Kemungkinan hujan: 0 %
Deskripsi: Partly Cloudy
```
````

**Screenshot:**
![Terminal Output](../assets/week-06-output.png)

---

### 7. 💡 Refleksi & Rencana Pengembangan

**Tujuan:** Refleksi personal dan growth mindset.

**Cara mengisi:**

-   Apa yang benar-benar kamu pelajari (bukan cuma "berhasil buat program")
-   Apa yang masih belum paham

**✅ Contoh BAIK:**

````markdown
### Apa yang Saya Pelajari

**Secara Teknis:**

-   Sebelumnya saya pikir semua API bisa dipanggil langsung dengan nama kota. Ternyata banyak API weather yang memerlukan koordinat karena:
    -   Lebih presisi (menghindari ambiguitas nama tempat)
    -   Database lookup by coordinates lebih efisien
    -   Standarisasi internasional (lat/lon universal)
-   Memahami konsep API chaining dan bagaimana output satu API menjadi input API lain
-   Callback hell adalah real problem—sekarang saya paham kenapa async/await penting

**Secara Konseptual:**

-   HTTP request/response bukan "magic"—ada protokol, format, dan konvensi yang harus diikuti
-   Asynchronous programming bukan cuma tentang "tidak blocking", tapi tentang bagaimana mengatur flow control untuk operasi yang timing-nya tidak predictable
-   Error handling di network programming jauh lebih kompleks dari programming biasa karena banyak failure points (network, server, rate limit, dll)

**Hubungan dengan Materi Sebelumnya:**

-   Week 5: Async programming dengan file I/O → Week 6: Async programming dengan network I/O
-   Konsep callback yang sama, tapi konteks berbeda (local vs network)

---

### 8. 📚 Referensi & Sumber Belajar

**Cara mengisi:**

-   Link dokumentasi yang kamu baca
-   Tutorial/artikel yang membantu
-   Stack Overflow threads yang solve problemmu

**✅ Contoh:**

```markdown
-   [Mapbox Geocoding API Documentation](https://docs.mapbox.com/api/search/geocoding/)
-   [Weatherstack API Documentation](https://weatherstack.com/documentation)
-   [Node.js Async Programming Guide](https://nodejs.dev/learn/asynchronous-flow-control)
-   [Stack Overflow: Handling nested callbacks](https://stackoverflow.com/questions/xxxxx)
-   Jobsheet Minggu 6: HTTP Request and API Integration
```
````

---

## 🎨 Tips Membuat Laporan yang Bagus

### 1. Visual > Text

-   Gunakan diagram untuk explain architecture
-   Tambahkan screenshot hasil eksekusi
-   Gunakan code blocks dengan syntax highlighting
-   Buat tabel untuk comparison

### 2. Show, Don't Just Tell

**❌ Buruk:** "Saya belajar async programming"
**✅ Bagus:** "Async programming memungkinkan Node.js handle 1000+ concurrent connections karena non-blocking I/O—ini yang membuat Node.js cocok untuk real-time applications"

### 3. Analyze, Don't Just Describe

**❌ Buruk:** "Saya menggunakan callback"
**✅ Bagus:** "Saya menggunakan callback karena library yang dipakai callback-based, tapi saya aware bahwa async/await lebih readable dan akan migrate next week"

### 4. Connect the Dots

-   Hubungkan dengan materi minggu sebelumnya
-   Explain bagaimana ini prepare kamu untuk minggu depan
-   Connect to real-world applications

### 5. Be Honest About What You Don't Know

**Lebih baik tulis:**

> "Saya masih belum fully understand kenapa perlu CORS di browser tapi tidak di Node.js—ini akan saya explore lebih lanjut"

**Daripada:**

> Pretend kamu sudah paham semua

---

## ✅ Checklist Sebelum Submit

Sebelum submit laporan, pastikan:

-   [ ] Semua section diisi dengan lengkap (tidak ada placeholder `[isi...]`)
-   [ ] Ada minimal 2-3 konsep pemrograman jaringan yang dijelaskan mendalam
-   [ ] Ada diagram/visualisasi arsitektur
-   [ ] Code snippets ada penjelasan konteksnya
-   [ ] Ada test cases dengan hasil
-   [ ] Ada refleksi personal (apa yang benar-benar dipelajari)
-   [ ] Link ke file kode bekerja dengan benar
-   [ ] Screenshot/output disertakan
-   [ ] Tidak ada typo atau grammar error yang mengganggu

---

## 🚀 Contoh Perbedaan Laporan Buruk vs Bagus

### ❌ BURUK (Log Aktivitas):

```markdown
## Fokus Minggu Ini

Belajar API

## Pekerjaan yang Diselesaikan

-   Buat file app.js
-   Install package
-   Panggil API Mapbox
-   Panggil API Weatherstack
-   Selesai

## Kendala

Error di line 10, tapi sudah fixed

## Kesimpulan

Sudah berhasil buat program
```

### ✅ BAGUS (Learning Documentation):

```markdown
## Fokus & Tujuan Pembelajaran

**Fokus minggu ini:** HTTP Request dan API Integration untuk aplikasi cuaca

**Tujuan pembelajaran:**

-   Memahami HTTP request/response cycle dan struktur API
-   Mengimplementasikan API chaining (geocoding → weather data)
-   Membandingkan callback vs promise vs async/await

## Konsep Pemrograman Jaringan

**HTTP Request/Response Cycle:**

HTTP adalah protokol application layer yang mendefinisikan format komunikasi client-server. Request berisi method (GET/POST), headers, dan body; response berisi status code, headers, dan data.

**Mengapa penting:** Semua web/mobile app berkomunikasi via HTTP. Understanding HTTP = understanding bagaimana internet bekerja.

**API Chaining & Sequential Async Operations:**

Dalam aplikasi nyata, sering kita perlu memanggil API secara berurutan di mana output API pertama menjadi input API kedua. Contoh: geocoding API → koordinat → weather API.

**Challenge:** Karena network asynchronous, kita perlu handle timing dengan callback/promise/async-await. Ini demonstrasi real-world async programming.

## Arsitektur & Alur Sistem

[Diagram mendetail dengan ASCII art]

## [... dst dengan analisis mendalam ...]
```

---

**Good luck! 🚀 Ingat: Laporan yang bagus = dokumentasi bahwa kamu benar-benar PAHAM, bukan sekedar SELESAI.**
