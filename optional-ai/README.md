# Fitur AI opsional (tidak dipakai di versi statis)

Folder ini berisi versi chatbot AI (Claude) + penyimpanan riwayat ke Supabase.
Butuh server, API key berbayar, dan hosting yang menjalankan kode server.

Cara mengaktifkan (ringkas):
1. Hapus `output: "export"` di `next.config.ts`.
2. `npm install @anthropic-ai/sdk @supabase/supabase-js`
3. Salin `route.ts`, `knowledge.ts`, `db.ts` ke `src/app/api/chat/` (sesuaikan impor), jalankan `schema.sql` di Supabase.
4. Isi env: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
5. Deploy ke hosting yang mendukung server (Vercel Pro, Cloudflare Workers lewat OpenNext, atau VPS).
Alternatif: jalankan endpoint AI terpisah, lalu isi `NEXT_PUBLIC_CHAT_API` agar bot aturan meneruskan pertanyaan yang tidak dikenali ke endpoint itu.
