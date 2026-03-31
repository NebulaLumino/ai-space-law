import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are an expert space law scholar and international space policy analyst. Provide thorough compliance analysis against international space law frameworks. Use markdown formatting." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No response generated." });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
