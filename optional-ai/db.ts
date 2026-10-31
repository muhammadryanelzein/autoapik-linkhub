import { createClient } from "@supabase/supabase-js";

function client() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null; // database opsional: chatbot tetap jalan tanpa log
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function saveExchange(sessionId: string, userText: string, reply: string) {
  const db = client();
  if (!db) return;
  const a = await db.from("chat_sessions").upsert({ id: sessionId });
  if (a.error) throw a.error;
  const b = await db.from("chat_messages").insert([
    { session_id: sessionId, role: "user", content: userText },
    { session_id: sessionId, role: "assistant", content: reply },
  ]);
  if (b.error) throw b.error;
}
