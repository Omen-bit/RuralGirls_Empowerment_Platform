import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    // Validate request
    const { message } = await req.json();
    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    // Call Gemini 2.0 Flash API directly
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: message }]
        }],
        generationConfig: {
          temperature: 0.9,
          topP: 1,
          topK: 32,
          maxOutputTokens: 2048,
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      throw new Error(data.error?.message || "Failed to generate response");
    }

    // Extract the response text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                 "No response generated";

    return NextResponse.json({
      success: true,
      response: text,
      model: "gemini-2.0-flash"
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process request",
        solution: "Please check your API key and try again"
      },
      { status: 500 }
    );
  }
}