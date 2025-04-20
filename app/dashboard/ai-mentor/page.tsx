"use client"
import { useState, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Loader2,
  Send,
  HeartPulse,
  Scale,
  Briefcase,
  Trash2,
  Brain,
  GraduationCap,
  Lightbulb,
  Sparkles,
  BookOpen,
  Rocket,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const quickActions = [
  {
    label: "Health Advice",
    icon: <HeartPulse className="h-5 w-5 text-rose-500" />,
    prompt: "Give me health advice about...",
  },
  {
    label: "Legal Help",
    icon: <Scale className="h-5 w-5 text-blue-500" />,
    prompt: "I need legal information about...",
  },
  {
    label: "Business Tips",
    icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    prompt: "Share business strategies for...",
  },
  {
    label: "Mental Wellness",
    icon: <Brain className="h-5 w-5 text-violet-500" />,
    prompt: "How can I improve my mental wellbeing?",
  },
  {
    label: "Education",
    icon: <GraduationCap className="h-5 w-5 text-emerald-500" />,
    prompt: "Help me learn about...",
  },
  {
    label: "Creative Ideas",
    icon: <Lightbulb className="h-5 w-5 text-orange-500" />,
    prompt: "Generate creative ideas for...",
  },
]

const suggestedTopics = [
  "How to manage stress effectively?",
  "What are the best practices for time management?",
  "Can you explain blockchain technology simply?",
  "What are some healthy meal prep ideas?",
  "How to start investing with minimal capital?",
  "What are my rights as an employee?",
]

export default function AIMentorPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input
    if (!messageToSend.trim() || loading) return

    setInput("")
    setLoading(true)
    setShowSuggestions(false)

    const userMsg: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "API request failed")
      }

      const aiMsg: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Request failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/20 backdrop-blur-sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4"
      >
        <motion.h1
          className="text-4xl font-bold mb-6 text-primary"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2,
          }}
        >
          <span className="inline-block">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center"
            >
              Prakriti AI Mentor
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "linear" },
                  scale: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
                }}
                className="ml-2"
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.div>
            </motion.span>
          </span>
        </motion.h1>

        <Card className="w-full max-w-5xl h-[80vh] flex flex-col border-2 border-primary/30 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-primary/20 to-purple-300/40 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotateZ: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/pri.png"
                    alt="Prakriti AI"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white shadow-md"
                  />
                </motion.div>
                <div>
                  <CardTitle className="text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Prakriti AI Mentor
                  </CardTitle>
                  <p className="text-xs text-gray-600">Your personal guide to knowledge and wisdom</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                title="Clear Chat"
                className="hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="AI Assistant"
                    width={120}
                    height={120}
                    className="mx-auto mb-4 rounded-full shadow-lg border-4 border-primary/20"
                  />
                </motion.div>

                <h3 className="text-xl font-semibold mb-5 text-gray-800">How can I help you today?</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant="outline"
                        className="py-4 flex flex-col items-center gap-2 w-full text-sm border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                        onClick={() => handleSendMessage(action.prompt)}
                      >
                        <motion.div
                          whileHover={{
                            rotate: [0, -10, 10, 0],
                            boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
                          }}
                          transition={{ duration: 0.5 }}
                          className="bg-gradient-to-br from-primary/20 to-purple-400/20 p-3 rounded-lg shadow-md border border-primary/10 flex items-center justify-center"
                        >
                          <div className="text-primary w-5 h-5 flex items-center justify-center">{action.icon}</div>
                        </motion.div>
                        <span>{action.label}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                  <h4 className="text-sm font-medium mb-3 text-gray-600 flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Popular Topics
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedTopics.map((topic, index) => (
                      <motion.div
                        key={topic}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs bg-white/80 border shadow-sm hover:bg-primary/10"
                          onClick={() => handleSendMessage(topic)}
                        >
                          {topic}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.sender === "user" ? 50 : -50, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-md ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-primary to-primary/90 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {message.sender === "ai" && (
                        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-100">
                          <Image src="/pri.png" alt="Prakriti AI" width={20} height={20} className="rounded-full" />
                          <span className="text-xs font-medium text-primary">Prakriti AI</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">
                        {message.sender === "ai" ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: message.content.replace(/\n/g, "<br/>"),
                            }}
                          />
                        ) : (
                          message.content
                        )}
                      </p>
                      <p className="text-[10px] mt-1 text-right opacity-60">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="bg-white rounded-xl p-4 max-w-[75%] border shadow-md">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    >
                      <Loader2 className="h-4 w-4" />
                    </motion.div>
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                    >
                      Prakriti is thinking...
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="border-t p-4 gap-2 bg-gradient-to-r from-gray-100 to-gray-50">
            <div className="relative flex-1">
              <Input
                placeholder="Ask Prakriti about health, legal, business, or anything else..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  } else if (e.key === "Escape") {
                    setShowSuggestions(false)
                  }
                }}
                className="flex-1 border-primary/30 focus:border-primary focus:ring-primary pr-10 shadow-sm"
              />
              {input.length === 0 && showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border p-2 z-10"
                >
                  <div className="text-xs font-medium text-gray-500 mb-1 px-2">Quick suggestions:</div>
                  <div className="grid grid-cols-1 gap-1">
                    {suggestedTopics.slice(0, 3).map((topic) => (
                      <Button
                        key={topic}
                        variant="ghost"
                        size="sm"
                        className="justify-start text-xs h-auto py-1.5 hover:bg-primary/10"
                        onClick={() => handleSendMessage(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="bg-gradient-to-br from-blue-100 to-purple-100 p-1.5 rounded-md shadow-sm border border-primary/10 flex items-center justify-center"
                >
                  <Rocket className="h-4 w-4 text-primary" />
                </motion.div>
              </Button>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || loading}
                className="bg-primary hover:bg-primary/90 shadow-md"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Send />
                  </motion.div>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 text-xs text-center text-gray-500"
        >
          Powered by advanced AI technology • Your personal knowledge companion
        </motion.div>
      </motion.div>
    </div>
  )
}
