import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { systemPrompt } from "./knowledge";
import { saveExchange } from "./db";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function clean(input: unknown): Msg[] {
  if (!Array.isArray(input)) return [];
  const out: Msg[] = input
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1000) }))
    .slice(-12);
  while (out.length && out[0].role !== "user") out.shift();
  return out;
}

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }

  const messages = clean(body?.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user")
    return NextResponse.json({ error: "Bad request" }, { status: 400 });

  try {
    const client = new Anthropic(); // membaca ANTHROPIC_API_KEY dari environment
    const res = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 400,
      system: systemPrompt(),
      messages,
    });
    const reply =
      res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("").trim() ||
      "Maaf, silakan hubungi kami lewat WhatsApp ya.";

    const sid = typeof body.sessionId === "string" && UUID.test(body.sessionId) ? body.sessionId : null;
    if (sid) await saveExchange(sid, messages[messages.length - 1].content, reply).catch((e) => console.error("db:", e));

    return NextResponse.json({ reply });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Chat unavailable" }, { status: 502 });
  }
}
