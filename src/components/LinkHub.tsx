"use client";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import Chat from "./Chat";
import { openInfo } from "@/lib/hours";

const WA = "https://wa.me/6282231541779";
const MAPS = "https://maps.app.goo.gl/LY9j1AzqXBuXKAar7";
const IG = "https://www.instagram.com/autoapik_garage?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw==";

const st = (i: number) => ({ "--i": i }) as CSSProperties;

function Icon({ d, extra }: { d: string; extra?: ReactNode }) {
  return (
    <span className="ic">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />{extra}
      </svg>
    </span>
  );
}

function HoursBadge() {
  const [o, setO] = useState<ReturnType<typeof openInfo> | null>(null);
  useEffect(() => { const f = () => setO(openInfo()); f(); const t = setInterval(f, 60000); return () => clearInterval(t); }, []);
  return (
    <p className={"hrs " + (o ? (o.open ? "on" : "off") : "")}>
      <i /><span>{o ? (o.open ? "Buka sekarang" : "Tutup sekarang") + " · " : ""}setiap hari 08.00–16.00 WIB</span>
    </p>
  );
}

function Panel(p: { i: number; title: string; sub: string; icon: ReactNode; src: string; href: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="item" style={st(p.i)} aria-expanded={open} onClick={() => setOpen(!open)}>
        {p.icon}
        <span className="tx"><b>{p.title}</b><small>{p.sub}</small></span>
        <svg className="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div className={"panel" + (open ? " open" : "")} style={st(p.i)}>
        <div className="blur" style={{ backgroundImage: `url(${p.src})` }} />
        <a href={p.href} target="_blank" rel="noopener noreferrer"><img src={p.src} alt={p.alt} /></a>
        <p>Ketuk gambar untuk memperbesar</p>
      </div>
    </>
  );
}

export default function LinkHub({
  priceListHref = "/price-list.jpg",
  productHref = "/produk-semir-ban.png",
}: {
  priceListHref?: string;
  productHref?: string;
}) {
  const [chat, setChat] = useState(false);
  const circle = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} />;
  return (
    <>
      <div className="bg" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /></div>
      <main>
        <header style={st(0)}>
          <h1 className="logo">AUTO<span>APIK</span></h1>
          <p>Detailing &amp; perawatan kendaraan</p>
          <HoursBadge />
        </header>

        <a className="item wa" style={st(1)} href={WA} target="_blank" rel="noopener noreferrer">
          <Icon d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 20l1.3-5A8.4 8.4 0 1 1 21 11.5Z" />
          <span className="tx"><b>Chat WhatsApp</b><small>+62 822-3154-1779</small></span>
        </a>

        <button className="item ask" style={st(2)} aria-expanded={chat} onClick={() => setChat(true)}>
          <Icon d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
          <span className="tx"><b>Asisten AUTOAPIK</b><small>Tanya harga &amp; paket, dijawab instan 24 jam</small></span>
        </button>

        <a className="item" style={st(3)} href={MAPS} target="_blank" rel="noopener noreferrer">
          <Icon d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" extra={circle(12, 9.5, 2.5)} />
          <span className="tx"><b>Lokasi</b><small>Buka di Google Maps</small></span>
        </a>

        <Panel i={4} title="Jasa Servis" sub="Lihat daftar harga" src={priceListHref} href={priceListHref}
          alt="Daftar harga detailing AUTOAPIK: Standard mulai Rp550.000, Premium mulai Rp1.300.000, Ultimate mulai Rp1.700.000"
          icon={<Icon d="M3 13l2-5a2 2 0 0 1 2-1.5h10a2 2 0 0 1 2 1.5l2 5v5h-3v-2H6v2H3z" extra={<>{circle(7.5, 13.5, 1)}{circle(16.5, 13.5, 1)}</>} />} />

        <Panel i={5} title="Produk Semir Ban" sub="Mulai Rp25.000 · 250 ml" src={productHref} href={productHref}
          alt="AUTOAPIK Semir Ban Tire Shine 250 ml, harga mulai Rp25.000"
          icon={<Icon d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" extra={circle(12, 12, 4)} />} />

        <a className="item" style={st(6)} href={IG} target="_blank" rel="noopener noreferrer">
          <Icon d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Z" extra={<>{circle(12, 12, 4)}{circle(17.5, 6.5, 0.6)}</>} />
          <span className="tx"><b>Instagram</b><small>@autoapik_garage</small></span>
        </a>

        <footer style={st(7)}>© AUTOAPIK</footer>
      </main>
      <Chat open={chat} onClose={() => setChat(false)} />
    </>
  );
}
