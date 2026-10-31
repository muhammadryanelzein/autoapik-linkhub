// Jam operasional AUTOAPIK: setiap hari 08.00-16.00 WIB
export function openInfo(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  const t = h * 60 + m;
  const open = t >= 480 && t < 960;
  const text = open
    ? "BUKA sekarang, tutup pukul 16.00 WIB"
    : `TUTUP sekarang, buka pukul 08.00 WIB${t >= 960 ? " besok" : ""}`;
  return { open, text };
}
