"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { fallback, reply } from "@/data/faq";

type Msg = { role: "user" | "assistant"; content: string };
const API = process.env.NEXT_PUBLIC_CHAT_API; // opsional: endpoint AI sendiri
const CHIPS = ["Harga jasa servis?", "Beda Standard vs Premium?", "Info semir ban"];

export default function Chat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const sid = useRef("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => { sid.current = crypto.randomUUID(); }, []);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [msgs, busy]);

  async function send(t: string) {
    t = t.trim();
    if (!t || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next); setText(""); setBusy(true);
    try {
      let text = reply(t); // 1) bot aturan (gratis, di browser)
      if (!text && API) {
        // 2) opsional: tanya endpoint AI bila ada
        try {
          const r = await fetch(API, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: sid.current, messages: next }),
          });
          const d = await r.json();
          if (r.ok && d.reply) text = d.reply;
        } catch { /* lanjut ke fallback */ }
      }
      await new Promise((r) => setTimeout(r, 450));
      setMsgs([...next, { role: "assistant", content: text ?? fallback() }]);
    } finally { setBusy(false); }
  }
  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(text); };

  return (
    <section className={"chat" + (open ? " open" : "")} aria-label="Chat asisten AUTOAPIK">
      <div className="ch-h">
        <div><b>Asisten AUTOAPIK</b><small>Asisten online 24 jam · Bengkel buka 08.00–16.00</small></div>
        <button onClick={onClose} aria-label="Tutup chat">&times;</button>
      </div>
      <div className="log" ref={logRef} aria-live="polite">
        <div className="m bot">Halo! Saya asisten AUTOAPIK, online 24 jam. Bengkel buka setiap hari 08.00–16.00 WIB. Mau tanya jasa servis detailing atau semir ban?</div>
        {msgs.map((m, i) => <div key={i} className={"m " + (m.role === "user" ? "me" : "bot")}>{m.content}</div>)}
        {busy && <div className="m bot">Mengetik...</div>}
      </div>
      {msgs.length === 0 && (
        <div className="chips">{CHIPS.map((c) => <button key={c} onClick={() => send(c)}>{c}</button>)}</div>
      )}
      <div className="ch-w">Mau booking? <a href="https://wa.me/6282231541779" target="_blank" rel="noopener noreferrer">Lanjut di WhatsApp</a></div>
      <form className="ch-f" onSubmit={onSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tulis pertanyaan..." autoComplete="off" aria-label="Pesan" />
        <button type="submit" disabled={busy}>Kirim</button>
      </form>
    </section>
  );
}
