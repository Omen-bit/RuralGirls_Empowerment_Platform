import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Configure the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // System prompt to guide the AI's behavior
    const systemPrompt = `
      You are an AI Mentor specializing in providing advice on health, legal matters, career development, 
      and emotional support. Your responses should be:
      - Helpful, accurate, and empathetic
      - Concise but thorough (aim for 2-4 paragraphs)
      - Tailored to the user's specific question
      - Include actionable advice when appropriate
      - Formatted with proper paragraphs for readability
      
      Remember that you're not a replacement for professional advice, especially for serious health, 
      legal, or mental health concerns. Suggest seeking professional help when appropriate.
    `

    // Create a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Please introduce yourself as my AI Mentor" }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hello! I'm your AI Mentor, ready to provide guidance on health, career, legal matters, and emotional support. How can I assist you today?",
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    })

    // Send the message to the model
    const result = await chat.sendMessage(systemPrompt + "\n\nUser  query: " + message)
    const response = result.response.text()

    // Return the response
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing request:", error)

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}