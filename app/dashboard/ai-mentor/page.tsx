"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Mic,
  Send,
  Volume2,
  Loader2,
  Sparkles,
  MessageSquare,
  Lightbulb,
  Heart,
  Stethoscope,
  Scale,
  GraduationCap,
} from "lucide-react"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: any
  category?: string
}

// Declare webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechSynthesisUtterance: any
    speechSynthesis: any
  }
}

export default function AIMentorPage() {
  const { user, db } = useFirebase()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Speech recognition setup
  const recognition = useRef<any>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // @ts-ignore
      recognition.current = new window.webkitSpeechRecognition()
      recognition.current.continuous = true
      recognition.current.interimResults = true

      recognition.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("")

        setInput(transcript)
      }

      recognition.current.onend = () => {
        setIsListening(false)
      }
    }

    // Load initial messages
    if (user) {
      const chatRef = collection(db, "users", user.uid, "ai_chat")
      const q = query(chatRef, orderBy("timestamp", "asc"), limit(50))

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedMessages: Message[] = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          loadedMessages.push({
            id: doc.id,
            content: data.content,
            sender: data.sender,
            timestamp: data.timestamp,
            category: data.category || "general",
          })
        })
        setMessages(loadedMessages)
      })

      return () => unsubscribe()
    }
  }, [user, db])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !user) return

    const userMessage = input
    setInput("")
    setLoading(true)

    // Determine message category based on content
    let category = "general"
    const lowercaseMessage = userMessage.toLowerCase()

    if (
      lowercaseMessage.includes("health") ||
      lowercaseMessage.includes("sick") ||
      lowercaseMessage.includes("doctor")
    ) {
      category = "health"
    } else if (
      lowercaseMessage.includes("right") ||
      lowercaseMessage.includes("law") ||
      lowercaseMessage.includes("legal")
    ) {
      category = "legal"
    } else if (
      lowercaseMessage.includes("job") ||
      lowercaseMessage.includes("career") ||
      lowercaseMessage.includes("work")
    ) {
      category = "career"
    } else if (
      lowercaseMessage.includes("help") ||
      lowercaseMessage.includes("support") ||
      lowercaseMessage.includes("feel")
    ) {
      category = "support"
    }

    // Add user message to Firestore
    const chatRef = collection(db, "users", user.uid, "ai_chat")
    await addDoc(chatRef, {
      content: userMessage,
      sender: "user",
      timestamp: serverTimestamp(),
      category: category,
    })

    try {
      // In a real implementation, this would call a Cloud Function or API to get AI response
      // For now, we'll simulate an AI response
      setTimeout(async () => {
        const aiResponses: { [key: string]: string } = {
          hello: "Hello! How can I help you today?",
          hi: "Hi there! I'm your AI mentor. What would you like to learn about today?",
          help: "I'm here to help you with various topics like health, education, career guidance, and more. What do you need assistance with?",
          health:
            "Taking care of your health is important. Make sure to eat nutritious food, exercise regularly, and get enough rest. Do you have specific health questions?",
          education:
            "Education is key to empowerment. What specific educational topics are you interested in learning about?",
          career:
            "I can help you explore different career paths based on your interests and skills. What kind of work interests you?",
          business:
            "Starting a business requires planning and dedication. I can guide you through the basics of entrepreneurship. What kind of business are you thinking about?",
          rights:
            "Understanding your legal rights is important. Every person has fundamental rights including the right to education, health, and safety. Is there a specific area you'd like to know more about?",
          safety:
            "Your safety is paramount. Always be aware of your surroundings, keep emergency contacts handy, and don't hesitate to seek help when needed. Do you have specific safety concerns?",
          marriage:
            "Child marriage is illegal in many countries. The legal age for marriage varies, but you have the right to complete your education and make your own choices about marriage. Would you like to know more about your rights?",
          period:
            "Menstrual health is important. Regular periods are normal, and you should have access to sanitary products. If you're experiencing pain or irregular cycles, it might be good to consult a healthcare provider. Do you have specific questions?",
          sad: "I'm sorry to hear you're feeling sad. It's normal to have ups and downs. Would you like to talk about what's bothering you? Remember that sharing your feelings with someone you trust can help.",
          scared:
            "It's okay to feel scared sometimes. Your feelings are valid. Can you tell me more about what's making you feel this way? I'm here to listen and help if I can.",
        }

        // Generate a response based on keywords in the user's message
        let aiResponse =
          "I'm here to help you with any questions about health, education, career, business, rights, or safety. What would you like to know more about?"

        const lowercaseMessage = userMessage.toLowerCase()
        for (const [keyword, response] of Object.entries(aiResponses)) {
          if (lowercaseMessage.includes(keyword)) {
            aiResponse = response
            break
          }
        }

        // Add AI response to Firestore
        await addDoc(chatRef, {
          content: aiResponse,
          sender: "ai",
          timestamp: serverTimestamp(),
          category: category,
        })

        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop()
      setIsListening(false)
    } else {
      recognition.current?.start()
      setIsListening(true)
      setInput("")
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => {
        setIsSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const filteredMessages =
    activeCategory === "all" ? messages : messages.filter((message) => message.category === activeCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "health":
        return <Stethoscope className="h-4 w-4" />
      case "legal":
        return <Scale className="h-4 w-4" />
      case "career":
        return <GraduationCap className="h-4 w-4" />
      case "support":
        return <Heart className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden border-primary/20">
        <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 bg-primary/20 animate-pulse-slow">
                <AvatarFallback className="text-primary">AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="flex items-center gap-2">
                  AI Mentor
                  <Sparkles className="h-4 w-4 text-primary animate-pulse-slow" />
                </CardTitle>
                <CardDescription>
                  Ask me anything about health, education, career, business, rights, or safety
                </CardDescription>
              </div>
            </div>
            <Tabs defaultValue="all" className="w-[400px]" onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="legal">Legal</TabsTrigger>
                <TabsTrigger value="career">Career</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center text-gray-500 my-8">
                <div className="bg-primary/5 p-6 rounded-xl mb-4 inline-block">
                  <Lightbulb className="h-12 w-12 text-primary/60 mx-auto animate-float" />
                </div>
                <p className="text-lg font-medium mb-4">Start a conversation with your AI mentor</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { text: "Tell me about health", icon: <Stethoscope className="h-4 w-4" />, category: "health" },
                    { text: "Career advice", icon: <GraduationCap className="h-4 w-4" />, category: "career" },
                    { text: "My rights", icon: <Scale className="h-4 w-4" />, category: "legal" },
                    { text: "I'm feeling sad", icon: <Heart className="h-4 w-4" />, category: "support" },
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-sm justify-start card-hover-effect"
                      onClick={() => {
                        setInput(suggestion.text)
                      }}
                    >
                      {suggestion.icon}
                      <span className="ml-2">{suggestion.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.sender === "ai" && (
                      <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                        <Badge variant="outline" className="flex items-center gap-1 bg-white">
                          {getCategoryIcon(message.category || "general")}
                          {message.category?.charAt(0).toUpperCase() + message.category?.slice(1) || "General"}
                        </Badge>
                      </div>
                    )}
                    <p>{message.content}</p>
                    {message.sender === "ai" && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-500 rounded-full"
                          onClick={() => speakText(message.content)}
                          disabled={isSpeaking}
                        >
                          <Volume2 size={14} />
                          <span className="sr-only">Read aloud</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <p className="text-sm text-gray-500">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="border-t p-4">
          <div className="flex items-center w-full gap-2">
            <Button
              variant="outline"
              size="icon"
              className={isListening ? "bg-red-100 text-red-600 animate-pulse" : ""}
              onClick={toggleListening}
            >
              <Mic size={18} />
            </Button>
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="bg-primary hover:bg-primary/90 btn-glow"
            >
              <Send size={18} />
            </Button>
          </div>
          {isListening && <p className="text-xs text-center w-full mt-2 text-red-500">Listening... Speak now</p>}
          {isSpeaking && (
            <div className="text-xs text-center w-full mt-2">
              <Button variant="link" size="sm" onClick={stopSpeaking} className="h-auto p-0">
                Stop speaking
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
