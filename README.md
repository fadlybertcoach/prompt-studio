# Prompt Studio

Aplikasi web progresif (PWA) dalam Bahasa Melayu untuk meneroka 10 templat prompt dan menjana prompt tersuai.

## Kandungan
- `index.html` — antara muka aplikasi
- `styles.css` — reka bentuk responsif
- `app.js` — 10 templat, pembina prompt, salin prompt dan pintasan ke ChatGPT
- `manifest.webmanifest` — metadata pemasangan
- `sw.js` — cache aset asas untuk penggunaan luar talian selepas lawatan pertama
- `assets/` — ikon aplikasi berdasarkan imej logo yang dibekalkan

## Cara menjalankan
PWA memerlukan `localhost` atau hos HTTPS untuk service worker. Jalankan pelayan statik dari folder ini, contohnya:

```bash
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

Untuk penggunaan sebenar, muat naik kandungan folder ini ke hos yang menyokong HTTPS. Pada iPhone/iPad, buka URL HTTPS menggunakan Safari, tekan Share dan pilih Add to Home Screen. Pada pelayar yang menyokong pemasangan PWA, pilihan pemasangan mungkin muncul secara automatik.

## Privasi dan had
Input prompt diproses di dalam pelayar dan tidak dihantar ke pelayan oleh aplikasi ini. Butang “Buka ChatGPT” hanya membuka laman ChatGPT; pengguna perlu menampal prompt sendiri. Semak ketepatan jawapan AI dan sumber sebelum menggunakannya.
