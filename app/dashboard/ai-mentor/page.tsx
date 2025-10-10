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
          src="/pri.png"
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Improved Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200/50 p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Quick Start
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.slice(0, 4).map((action, index) => (
                    <div key={action.label}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-3 h-auto border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group rounded-lg"
                        onClick={() => handleSendMessage(action.prompt)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/10 to-purple-100 group-hover:from-primary/20 group-hover:to-purple-200 transition-colors">
                            {action.icon}
                          </div>
                          <span className="font-medium text-sm text-gray-700">{action.label}</span>
                        </div>
                      </Button>
                    </div>
                  ))}
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
                    src="/pri.png"
                    alt="AI Assistant"
                    width={120}
                    height={120}
                    className="mx-auto mb-4 rounded-full shadow-lg border-4 border-primary/20"
                  />
                </motion.div>

                <h3 className="text-xl font-semibold mb-5 text-gray-800">How can I help you today?</h3>

              {/* Popular Topics */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Popular Topics
                </h3>
                <div className="space-y-1">
                  {suggestedTopics.slice(0, 3).map((topic, index) => (
                    <div key={topic}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs text-gray-600 hover:text-primary hover:bg-primary/5 p-2 h-auto rounded-md"
                        onClick={() => handleSendMessage(topic)}
                      >
                        <div className="truncate text-left">{topic}</div>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats or Info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>AI Online</span>
                  </div>
                  <div>Ready to help 24/7</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Interface */}
          <Card className="lg:col-span-3 flex flex-col border border-gray-200/50 shadow-sm bg-white rounded-xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50/50 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-20"></div>
                    <Image
                      src="/pri.png"
                      alt="Prakriti AI"
                      width={40}
                      height={40}
                      className="relative rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      Chat with Prakriti
                    </CardTitle>
                    <p className="text-xs text-gray-500">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearMessages}
                    title="Clear Chat"
                    className="hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 bg-white">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="mb-6">
                    <Image
                      src="/pri.png"
                      alt="AI Assistant"
                      width={80}
                      height={80}
                      className="rounded-full shadow-lg border-3 border-white"
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Hello! I'm Prakriti AI
                    </h3>
                    <p className="text-gray-600 text-sm max-w-sm">
                      Ask me anything about health, legal matters, business, education, or any topic you need guidance on.
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    Type a message below or use the quick actions on the left to get started.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                        {message.sender === "ai" && (
                          <div className="flex-shrink-0 mt-1">
                            <div className="relative">
                              <Image 
                                src="/pri.png" 
                                alt="Prakriti AI" 
                                width={32} 
                                height={32} 
                                className="rounded-full border-2 border-white shadow-sm" 
                              />
                              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                            </div>
                          </div>
                        )}
                        
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-sm ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-primary to-purple-600 text-white rounded-br-md"
                              : "bg-white border border-gray-200 rounded-bl-md"
                          }`}
                        >
                          {message.sender === "ai" && (
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                              <span className="text-xs font-semibold text-primary">Prakriti AI</span>
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            </div>
                          )}
                          
                          <div className={`text-sm leading-relaxed ${message.sender === "user" ? "text-white" : "text-gray-800"}`}>
                            {message.sender === "ai" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: message.content.replace(/\n/g, "<br/>"),
                                }}
                              />
                            ) : (
                              message.content
                            )}
                          </div>
                          
                          <div className={`text-xs mt-2 ${
                            message.sender === "user" ? "text-white/70" : "text-gray-500"
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: "2-digit", 
                              minute: "2-digit" 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {loading && (
                <div className="flex justify-start mt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative">
                        <Image 
                          src="/pri.png" 
                          alt="Prakriti AI" 
                          width={32} 
                          height={32} 
                          className="rounded-full border-2 border-white shadow-sm" 
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-500 rounded-full border border-white animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                        <span className="text-xs font-semibold text-primary">Prakriti AI</span>
                        <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                        <span className="animate-pulse">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="border-t border-gray-100 p-6 bg-white">
              <div className="flex items-end gap-4 w-full">
                <div className="relative flex-1">
                  <Input
                    placeholder="Type your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[48px] px-4 py-3 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl resize-none shadow-sm"
                    disabled={loading}
                  />
                  {input.length === 0 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Rocket className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || loading}
                  size="lg"
                  className="h-12 px-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-md rounded-xl transition-all duration-200"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      <span className="hidden sm:inline">Send</span>
                    </div>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Powered by advanced AI • Your trusted companion for guidance and support
          </p>
        </div>
      </div>
    </div>
  )
}
