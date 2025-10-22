# Assets Directory

Folder ini digunakan untuk menyimpan aset pendukung dokumentasi praktikum.

## Struktur

```
assets/
├── images/              # Screenshot, diagram, visualisasi
│   ├── week-05/        # Gambar untuk week 5
│   ├── week-06/        # Gambar untuk week 6
│   └── ...
└── diagrams/           # Diagram arsitektur (exported dari Excalidraw, Draw.io, dll)
    └── ...
```

## Panduan Penggunaan

### 1. Screenshot

Simpan screenshot dengan naming convention:

```
week-XX-[description].png
```

Contoh:

-   `week-06-weather-output.png`
-   `week-07-express-routes.png`

### 2. Diagram

Export diagram dalam format:

-   **PNG/JPG** - untuk embed di laporan
-   **SVG** - untuk kualitas tinggi
-   **Source file** - `.excalidraw`, `.drawio` untuk future editing

### 3. Cara Embed di Laporan

**Relative path dari laporan:**

```markdown
![Deskripsi gambar](../assets/images/week-06-weather-output.png)
```

**Absolute path (jika laporan ada di subfolder):**

```markdown
![Deskripsi gambar](/assets/images/week-06/architecture-diagram.png)
```

## Tools Rekomendasi

-   **Diagram:** [Excalidraw](https://excalidraw.com/), [Draw.io](https://app.diagrams.net/)
-   **Screenshot:** Flameshot (Linux), Snipping Tool (Windows), Shift+Cmd+4 (Mac)
-   **ASCII Art:** [ASCIIFlow](https://asciiflow.com/)

## Notes

-   Compress images untuk ukuran file lebih kecil (gunakan TinyPNG, dll)
-   Max resolution: 1920px width untuk screenshot
-   Gunakan format PNG untuk diagram/screenshot (tidak lossy)
-   Tambahkan caption yang jelas untuk setiap gambar
