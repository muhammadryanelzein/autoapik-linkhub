import { openInfo } from "@/lib/hours";

// ====== DATA UTAMA: edit di sini bila harga/info berubah ======
export const WA_NUMBER = "+62 822-3154-1779";
export const WA_LINK = "https://wa.me/6282231541779";

const HARGA = {
  standard: "Rp550.000",
  premium: "Rp1.300.000",
  ultimate: "Rp1.700.000",
  semir: "Rp25.000",
};

const tanyaWA = `Untuk info itu, silakan tanya langsung lewat WhatsApp ${WA_NUMBER} (${WA_LINK}) supaya jawabannya akurat.`;

type Entry = { strong: string[]; keys: string[]; answer: () => string };

// Urutan penting: jika skor sama, entri yang lebih atas menang. "Sapaan" sengaja paling bawah.
const ENTRIES: Entry[] = [
  {
    strong: ["beda", "perbedaan", "bandingkan", "banding", "vs"],
    keys: ["pilih", "mana"],
    answer: () =>
      `Perbedaan paket:\n- Standard: cuci eksterior dan keringkan, bersihkan ban dan velg, vakum interior, bersihkan kaca.\n- Premium: semua isi Standard + hand waxing dan polishing, perawatan dashboard dan konsol, coating 1 lapis.\n- Ultimate: semua isi Premium + aplikasi paint sealant, shampoo karpet, engine detailing, coating 2 lapis.`,
  },
  {
    strong: ["semir", "tire shine", "shine"],
    keys: ["ban", "hitam", "kilap", "produk"],
    answer: () =>
      `Semir Ban AUTOAPIK (Tire Shine Black & Shine), isi 250 ml, harga mulai ${HARGA.semir}. Membuat ban lebih hitam dan kilap, melindungi dari sinar UV dan debu, tahan lama tidak mudah luntur, dan mudah digunakan. Untuk memesan, hubungi WhatsApp ${WA_NUMBER}.`,
  },
  {
    strong: ["standard", "standar", "basic"],
    keys: ["paket"],
    answer: () =>
      `Paket Standard, harga mulai ${HARGA.standard}: cuci eksterior dan keringkan, bersihkan ban dan velg, vakum interior, dan bersihkan kaca.`,
  },
  {
    strong: ["premium", "populer", "wax", "waxing", "polish", "polishing", "dashboard"],
    keys: ["paket"],
    answer: () =>
      `Paket Premium (paling populer), harga mulai ${HARGA.premium}: semua isi Standard + hand waxing dan polishing, perawatan dashboard dan konsol, serta coating 1 lapis.`,
  },
  {
    strong: ["ultimate", "sealant", "karpet", "engine", "mesin", "lengkap"],
    keys: ["paket"],
    answer: () =>
      `Paket Ultimate, harga mulai ${HARGA.ultimate}: semua isi Premium + aplikasi paint sealant, shampoo karpet, engine detailing, dan coating 2 lapis.`,
  },
  {
    strong: ["coating", "coat", "nano"],
    keys: ["lapis", "layer"],
    answer: () => `Coating tersedia di paket Premium (1 lapis) dan Ultimate (2 lapis). Untuk detail jenis coating, tanyakan lewat WhatsApp ${WA_NUMBER}.`,
  },
  {
    strong: ["servis", "jasa", "detailing", "paket", "cuci"],
    keys: ["harga", "biaya", "tarif", "price", "list", "berapa", "murah"],
    answer: () =>
      `Paket jasa servis AUTOAPIK (harga mulai dari):\n- Standard: ${HARGA.standard}\n- Premium: ${HARGA.premium} (paling populer)\n- Ultimate: ${HARGA.ultimate}\nHarga akhir bisa berbeda sesuai ukuran dan kondisi kendaraan. Ketik nama paket untuk rinciannya, atau buka menu Jasa Servis untuk melihat daftar harga.`,
  },
  {
    strong: ["jam", "buka", "tutup", "operasional", "libur", "kapan"],
    keys: ["hari", "minggu"],
    answer: () => {
      const o = openInfo();
      return `Bengkel buka setiap hari pukul 08.00–16.00 WIB. ${
        o.open ? "Saat ini bengkel sedang buka (tutup pukul 16.00 WIB)." : "Saat ini bengkel sedang tutup (buka pukul 08.00 WIB)."
      } Asisten ini online 24 jam, tapi booking dan pengerjaan hanya di jam operasional.`;
    },
  },
  {
    strong: ["lokasi", "alamat", "dimana", "maps", "tempat", "cabang", "arah"],
    keys: ["di mana", "letak"],
    answer: () => `Lokasi AUTOAPIK bisa dilihat lewat tombol Lokasi di halaman ini, yang membuka Google Maps.`,
  },
  {
    strong: ["booking", "pesan", "order", "reservasi", "jadwal", "antri", "antrian", "daftar"],
    keys: ["datang", "mau"],
    answer: () =>
      `Untuk booking atau pemesanan, silakan hubungi kami lewat WhatsApp ${WA_NUMBER} (${WA_LINK}). Pesan di luar jam operasional (08.00–16.00 WIB) akan dibalas saat bengkel buka.`,
  },
  {
    strong: ["bayar", "pembayaran", "transfer", "qris", "cash", "tunai", "cicil", "dp"],
    keys: [],
    answer: () => tanyaWA,
  },
  {
    strong: ["lama", "durasi", "selesai", "berapa jam", "estimasi"],
    keys: ["pengerjaan"],
    answer: () => tanyaWA,
  },
  {
    strong: ["motor", "mobil", "suv", "sedan", "truk", "ukuran", "kendaraan"],
    keys: ["bisa", "terima"],
    answer: () =>
      `Harga yang tertera adalah harga mulai dari, dan hasil akhirnya tergantung ukuran serta kondisi kendaraan. Untuk kepastian jenis kendaraan dan harga, silakan tanya lewat WhatsApp ${WA_NUMBER} (${WA_LINK}).`,
  },
  {
    strong: ["whatsapp", "wa", "nomor", "kontak", "hubungi", "telepon", "telp"],
    keys: ["chat"],
    answer: () => `WhatsApp AUTOAPIK: ${WA_NUMBER}. Langsung chat lewat ${WA_LINK}`,
  },
  {
    strong: ["instagram", "ig", "sosmed", "medsos"],
    keys: ["sosial"],
    answer: () => `Instagram AUTOAPIK: @autoapik_garage. Buka lewat tombol Instagram di halaman ini.`,
  },
  {
    strong: ["terima kasih", "makasih", "thanks", "thank you", "trims", "thx"],
    keys: [],
    answer: () => `Sama-sama! Kalau ada pertanyaan lain soal jasa servis atau semir ban, silakan tanya lagi.`,
  },
  {
    strong: ["halo", "hai", "hi", "hello", "assalamualaikum", "permisi", "pagi", "siang", "sore", "malam"],
    keys: [],
    answer: () => `Halo! Saya asisten AUTOAPIK. Mau tanya harga paket jasa servis, semir ban, jam buka, atau lokasi?`,
  },
];

export const fallback = () =>
  `Maaf, saya belum mengerti pertanyaan itu. Coba tanya soal harga jasa servis, isi paket, semir ban, jam buka, atau lokasi. Untuk hal lain, hubungi WhatsApp ${WA_NUMBER} (${WA_LINK}).`;

// ====== Mesin pencocok kata kunci ======
const norm = (s: string) =>
  ` ${s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim()} `;

function hit(text: string, kw: string) {
  if (text.includes(` ${kw} `)) return true; // kata/frasa utuh
  return kw.length >= 5 && text.includes(kw); // awalan/akhiran untuk kata panjang (harganya, pesanan)
}

export function reply(input: string): string | null {
  const t = norm(input);
  let best: Entry | null = null;
  let bestScore = 0;
  for (const e of ENTRIES) {
    let s = 0;
    for (const k of e.strong) if (hit(t, k)) s += 3;
    for (const k of e.keys) if (hit(t, k)) s += 1;
    if (s > bestScore) {
      best = e;
      bestScore = s;
    }
  }
  return best && bestScore >= 3 ? best.answer() : null; // minimal 1 kata kunci utama
}
