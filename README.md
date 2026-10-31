# AUTOAPIK Linkhub (statis, gratis di-hosting)

Linkhub: WhatsApp, Asisten chat, Lokasi, Jasa Servis, Produk Semir Ban, Instagram.
Chatbot berjalan di browser dengan bot aturan, jadi **tidak perlu server, API key, atau biaya**.
Jam operasional: setiap hari 08.00–16.00 WIB (status buka/tutup otomatis).

## Struktur
| Bagian | Lokasi |
|---|---|
| Tampilan | `src/components/LinkHub.tsx`, `src/app/globals.css` |
| Chat (tampilan) | `src/components/Chat.tsx` |
| **Isi jawaban bot & harga** | `src/data/faq.ts`  <- edit di sini |
| Jam operasional | `src/lib/hours.ts` |
| Gambar | `public/price-list.jpg`, `public/produk-semir-ban.png` |
| Fitur AI opsional (butuh server) | `optional-ai/` |

## Jalankan di komputer
1. `npm install`
2. `npm run dev` lalu buka http://localhost:3000

## Bagikan link sementara (demo)
`npm run share` lalu cari baris `https://xxxx.trycloudflare.com`. Link mati bila terminal ditutup.

## Deploy gratis (link tetap)
1. `npm run build` -> hasilnya folder `out`.
2. Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Upload assets (Direct Upload).
3. Beri nama proyek (misalnya `autoapik`), lalu seret folder `out`.
4. Hasil: `https://autoapik.pages.dev` (bila nama masih tersedia). Update: ulangi langkah 1-3.
Hosting statis lain (Netlify, GitHub Pages) juga bisa; cek syarat pemakaian komersial masing-masing.

## Domain sendiri (opsional)
Tambahkan di pengaturan Custom Domains proyek Pages, lalu atur DNS sesuai petunjuk.

## Mengubah isi
- Harga/paket/jawaban: `src/data/faq.ts` (bagian `HARGA` dan `ENTRIES`).
- Link WhatsApp/Maps/Instagram: `src/components/LinkHub.tsx`.
- Setelah mengubah: `npm run build` dan upload ulang folder `out`.
