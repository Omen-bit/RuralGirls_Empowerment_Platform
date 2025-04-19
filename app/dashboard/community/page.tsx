"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Search,
  Send,
  Share2,
  Star,
  ThumbsUp,
  User,
  Users,
  Video,
  Mail,
  Phone,
  Shield,
  BookOpen,
  FileText,
  Bell,
  Zap,
  ArrowRight,
  Award,
  Trophy,
  Target,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export default function CommunitySupportPage() {
  const [activeTab, setActiveTab] = useState("forums")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Topics")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [showCommentForm, setShowCommentForm] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [isLiveChat, setIsLiveChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [mentorApplicationSubmitted, setMentorApplicationSubmitted] = useState(false)
  const [mentorshipRequestSubmitted, setMentorshipRequestSubmitted] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)

  const forumRef = useRef<HTMLDivElement>(null)
  const mentorshipRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const helpRef = useRef<HTMLDivElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Mentor application form schema
  const mentorFormSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    location: z.string().min(2, { message: "Please enter your location." }),
    expertise: z.string().min(2, { message: "Please select your area of expertise." }),
    experience: z.string().min(1, { message: "Please select your years of experience." }),
    qualifications: z.string().min(10, { message: "Please provide your qualifications." }),
    specialties: z.string().optional(),
    motivation: z.string().min(50, { message: "Please tell us why you want to be a mentor (min 50 characters)." }),
    availability: z.array(z.string()).min(1, { message: "Please select at least one availability option." }),
    agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms and conditions." }),
  })

  // Mentorship request form schema
  const mentorshipRequestSchema = z.object({
    goals: z.string().min(20, { message: "Please describe your goals (min 20 characters)." }),
    interests: z.string().min(10, { message: "Please describe your interests (min 10 characters)." }),
    commitment: z.string().min(1, { message: "Please select your time commitment." }),
    preferredCommunication: z.array(z.string()).min(1, { message: "Please select at least one communication method." }),
    additionalInfo: z.string().optional(),
  })

  // Initialize forms
  const mentorForm = useForm<z.infer<typeof mentorFormSchema>>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      expertise: "",
      experience: "",
      qualifications: "",
      specialties: "",
      motivation: "",
      availability: [],
      agreeToTerms: false,
    },
  })

  const mentorshipRequestForm = useForm<z.infer<typeof mentorshipRequestSchema>>({
    resolver: zodResolver(mentorshipRequestSchema),
    defaultValues: {
      goals: "",
      interests: "",
      commitment: "",
      preferredCommunication: [],
      additionalInfo: "",
    },
  })

  // Handle mentor application submission
  function onMentorSubmit(data: z.infer<typeof mentorFormSchema>) {
    console.log("Mentor application submitted:", data)
    setMentorApplicationSubmitted(true)
    // In a real app, you would send this data to your backend
  }

  // Handle mentorship request submission
  function onMentorshipRequestSubmit(data: z.infer<typeof mentorshipRequestSchema>) {
    console.log("Mentorship request submitted:", data)
    setMentorshipRequestSubmitted(true)
    // In a real app, you would send this data to your backend
  }

  // Simulate online users count
  useEffect(() => {
    const baseCount = 127
    const interval = setInterval(() => {
      setOnlineUsers(baseCount + Math.floor(Math.random() * 20))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Simulate notifications
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "mention",
        content: "Priya mentioned you in a discussion",
        time: "5 minutes ago",
        read: false,
      },
      {
        id: 2,
        type: "event",
        content: "New event: Digital Marketing Workshop",
        time: "1 hour ago",
        read: false,
      },
      {
        id: 3,
        type: "reply",
        content: "Meena replied to your discussion",
        time: "3 hours ago",
        read: true,
      },
      {
        id: 4,
        type: "challenge",
        content: "New challenge available: Digital Skills Champion",
        time: "Just now",
        read: false,
      },
    ])
  }, [])

  // Simulate live chat messages
  useEffect(() => {
    if (isLiveChat) {
      const initialMessages = [
        {
          id: 1,
          user: {
            name: "Priya",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "Hello everyone! I'm new to the community. I'm interested in learning digital skills.",
          time: "10:05 AM",
        },
        {
          id: 2,
          user: {
            name: "Meena",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "Welcome Priya! I'm taking the web development course right now. It's really helpful.",
          time: "10:07 AM",
        },
        {
          id: 3,
          user: {
            name: "Community Bot",
            avatar: "/placeholder.svg?height=40&width=40",
            isBot: true,
          },
          message: "Welcome to the community chat, Priya! Feel free to ask any questions.",
          time: "10:08 AM",
        },
      ]

      setChatMessages(initialMessages)

      // Simulate incoming messages
      const messageInterval = setInterval(() => {
        const users = ["Anjali", "Lakshmi", "Sunita", "Fatima"]
        const messages = [
          "Has anyone taken the digital marketing course?",
          "I just completed my first project!",
          "Does anyone know when the next virtual meetup is?",
          "I'm looking for resources on starting a small business.",
          "The mentorship program has been so helpful for me.",
        ]

        if (Math.random() > 0.7) {
          const newMessage = {
            id: Date.now(),
            user: {
              name: users[Math.floor(Math.random() * users.length)],
              avatar: "/placeholder.svg?height=40&width=40",
            },
            message: messages[Math.floor(Math.random() * messages.length)],
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }

          setChatMessages((prev) => [...prev, newMessage])
          scrollToBottom()
        }
      }, 8000)

      return () => clearInterval(messageInterval)
    }
  }, [isLiveChat])

  useEffect(() => scrollToBottom(), [chatMessages])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the comment to a backend
    setCommentText("")
    setShowCommentForm(null)
    alert("Comment submitted successfully!")
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    const newMessage = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        isCurrentUser: true,
      },
      message: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages((prev) => [...prev, newMessage])
    setMessageInput("")
  }

  const categories = ["All Topics", "Education", "Skills", "Business", "Health", "Technology", "Personal Growth"]

  const discussionPosts = [
    {
      id: 1,
      title: "How did you start your small business?",
      category: "Business",
      author: {
        name: "Meena",
        age: 24,
        location: "Rajasthan",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 32,
      views: 215,
      lastActive: "1 hour ago",
      excerpt:
        "I want to start a small handicraft business but don't know where to begin. Has anyone here started their own business? What were the first steps you took?",
      likes: 45,
      comments: 12,
      tags: ["business", "startup", "handicrafts"],
      trending: true,
    },
    {
      id: 2,
      title: "Tips for learning digital skills with limited internet",
      category: "Technology",
      author: {
        name: "Priya",
        age: 19,
        location: "Bihar",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 28,
      views: 187,
      lastActive: "3 hours ago",
      excerpt:
        "Our village has limited internet connectivity. I'm trying to learn basic computer skills. Does anyone have tips for learning with limited internet access?",
      likes: 38,
      comments: 15,
      tags: ["digital-skills", "internet", "learning"],
    },
    {
      id: 3,
      title: "Balancing education and family responsibilities",
      category: "Education",
      author: {
        name: "Anjali",
        age: 17,
        location: "Uttar Pradesh",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 45,
      views: 310,
      lastActive: "5 hours ago",
      excerpt:
        "I'm trying to continue my education but also have responsibilities at home. How do you manage to balance both? I would appreciate any advice.",
      likes: 62,
      comments: 23,
      tags: ["education", "family", "balance"],
      trending: true,
    },
    {
      id: 4,
      title: "Finding markets for handmade products",
      category: "Business",
      author: {
        name: "Lakshmi",
        age: 26,
        location: "Tamil Nadu",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 36,
      views: 242,
      lastActive: "2 days ago",
      excerpt:
        "I make traditional embroidered items but struggle to find customers beyond my village. Has anyone successfully sold their handmade products to wider markets?",
      likes: 41,
      comments: 18,
      tags: ["marketing", "handicrafts", "sales"],
    },
    {
      id: 5,
      title: "Dealing with community resistance to girls' education",
      category: "Education",
      author: {
        name: "Fatima",
        age: 16,
        location: "Haryana",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 52,
      views: 378,
      lastActive: "1 day ago",
      excerpt:
        "Some people in my community don't support girls continuing education after a certain age. Has anyone faced this? How did you handle it?",
      likes: 73,
      comments: 31,
      tags: ["education", "community", "challenges"],
      trending: true,
    },
    {
      id: 6,
      title: "Mental health resources for rural girls",
      category: "Health",
      author: {
        name: "Sunita",
        age: 21,
        location: "Madhya Pradesh",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      replies: 29,
      views: 195,
      lastActive: "4 hours ago",
      excerpt:
        "I've been feeling overwhelmed lately with all my responsibilities. Are there any resources or techniques that have helped you manage stress and anxiety?",
      likes: 56,
      comments: 22,
      tags: ["mental-health", "stress", "self-care"],
    },
  ]

  const filteredPosts = discussionPosts.filter(
    (post) =>
      (selectedCategory === "All Topics" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  const mentors = [
    {
      id: 1,
      name: "Sunita Sharma",
      expertise: "Small Business Development",
      location: "Rajasthan",
      experience: "10+ years",
      bio: "Entrepreneur who built a successful handicraft business from her village and now exports internationally.",
      rating: 4.9,
      reviews: 56,
      image: "/placeholder.svg?height=150&width=150",
      availability: "Available for mentoring",
      specialties: ["Handicrafts", "Export", "Marketing", "Women Entrepreneurship"],
      featured: true,
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      expertise: "Women's Health Education",
      location: "Gujarat",
      experience: "15+ years",
      bio: "Doctor specializing in women's health who has worked extensively in rural communities.",
      rating: 5.0,
      reviews: 78,
      image: "/placeholder.svg?height=150&width=150",
      availability: "Limited availability",
      specialties: ["Reproductive Health", "Nutrition", "Mental Health", "Community Health"],
    },
    {
      id: 3,
      name: "Meena Reddy",
      expertise: "Digital Skills & Technology",
      location: "Telangana",
      experience: "8+ years",
      bio: "IT professional who teaches digital literacy to rural communities and helps bridge the digital divide.",
      rating: 4.8,
      reviews: 42,
      image: "/placeholder.svg?height=150&width=150",
      availability: "Available for mentoring",
      specialties: ["Basic Computer Skills", "Smartphone Usage", "Online Safety", "Digital Marketing"],
      featured: true,
    },
    {
      id: 4,
      name: "Anjali Singh",
      expertise: "Education & Scholarships",
      location: "Bihar",
      experience: "12+ years",
      bio: "Education specialist who helps rural girls access higher education opportunities and scholarships.",
      rating: 4.9,
      reviews: 63,
      image: "/placeholder.svg?height=150&width=150",
      availability: "Available for mentoring",
      specialties: ["Scholarship Applications", "Career Guidance", "Study Skills", "Higher Education"],
    },
    {
      id: 5,
      name: "Fatima Khan",
      expertise: "Textile & Handicraft Skills",
      location: "Uttar Pradesh",
      experience: "20+ years",
      bio: "Master artisan who teaches traditional crafts and helps artisans market their products.",
      rating: 4.7,
      reviews: 51,
      image: "/placeholder.svg?height=150&width=150",
      availability: "Limited availability",
      specialties: ["Traditional Textiles", "Embroidery", "Product Design", "Quality Control"],
    },
    {
      id: 6,
      name: "Lakshmi Nair",
      expertise: "Agricultural Entrepreneurship",
      location: "Kerala",
      experience: "15+ years",
      bio: "Agricultural expert who helps women start and grow farming-based businesses.",
      rating: 4.8,
      reviews: 47,
      image: "/placeholder.svg?height=150&width=150",
      availability: "Available for mentoring",
      specialties: ["Organic Farming", "Food Processing", "Agricultural Marketing", "Sustainable Practices"],
    },
  ]

  const events = [
    {
      title: "Digital Marketing for Rural Businesses",
      type: "Online Workshop",
      date: "April 25, 2025",
      time: "2:00 PM - 4:00 PM",
      host: "Meena Reddy, Digital Skills Mentor",
      description:
        "Learn how to promote your products and services online using social media and other digital channels. This workshop will cover creating engaging content, reaching your target audience, and converting followers into customers.",
      participants: 87,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["digital", "marketing", "business"],
      featured: true,
    },
    {
      title: "Financial Planning for Women Entrepreneurs",
      type: "Webinar",
      date: "April 30, 2025",
      time: "6:00 PM - 7:30 PM",
      host: "Priya Patel, Financial Advisor",
      description:
        "Essential financial management skills for running a successful small business and planning for growth. Topics include budgeting, pricing strategies, record-keeping, and accessing microfinance opportunities.",
      participants: 65,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["finance", "entrepreneurship", "planning"],
    },
    {
      title: "Health & Wellness Camp",
      type: "In-Person Event",
      date: "May 5, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Jaipur Community Center",
      host: "Dr. Sunita Sharma & Team",
      description:
        "A comprehensive health camp offering free check-ups, consultations, and workshops on women's health issues. Services include general health assessment, reproductive health guidance, and mental wellbeing support.",
      participants: 120,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["health", "wellness", "community"],
      featured: true,
    },
    {
      title: "Traditional Crafts Masterclass",
      type: "Hybrid Event",
      date: "May 12, 2025",
      time: "11:00 AM - 3:00 PM",
      host: "Fatima Khan, Master Artisan",
      description:
        "Learn advanced techniques in traditional embroidery and textile arts. This masterclass will cover design principles, color theory, and techniques to elevate your handicraft products for premium markets.",
      participants: 45,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["crafts", "skills", "traditional"],
    },
    {
      title: "Rural Women Leadership Summit",
      type: "Conference",
      date: "May 20-21, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Delhi Convention Center",
      host: "EmpowerRural Foundation",
      description:
        "A two-day summit bringing together rural women leaders, entrepreneurs, and change-makers from across India. Features keynote speeches, panel discussions, networking opportunities, and skill-building workshops.",
      participants: 250,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["leadership", "networking", "empowerment", "rural-development"],
    },
  ]

  const upcomingLiveSessions = [
    {
      title: "Success Stories: Rural Women Entrepreneurs",
      date: "April 20, 2025",
      time: "6:00 PM - 7:00 PM",
      host: "Anjali Singh",
      description: "Hear inspiring stories from successful rural women entrepreneurs and learn from their journeys.",
    },
    {
      title: "Q&A: Starting a Handicraft Business",
      date: "April 22, 2025",
      time: "5:00 PM - 6:00 PM",
      host: "Sunita Sharma",
      description: "Get your questions answered about starting and growing a handicraft business in rural areas.",
    },
    {
      title: "Introduction to E-commerce for Rural Businesses",
      date: "April 27, 2025",
      time: "6:00 PM - 7:00 PM",
      host: "Meena Reddy",
      description: "Learn the basics of setting up and managing an online store for your rural business.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Availability options for mentor application
  const availabilityOptions = [
    { id: "weekdays", label: "Weekdays" },
    { id: "weekends", label: "Weekends" },
    { id: "mornings", label: "Mornings" },
    { id: "afternoons", label: "Afternoons" },
    { id: "evenings", label: "Evenings" },
  ]

  // Communication method options for mentorship request
  const communicationOptions = [
    { id: "video", label: "Video Call" },
    { id: "audio", label: "Audio Call" },
    { id: "chat", label: "Text Chat" },
    { id: "email", label: "Email" },
    { id: "in-person", label: "In-Person (if possible)" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-violet-50 to-white dark:from-gray-900 dark:to-background overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-violet-200 rounded-full opacity-20"
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 -right-20 w-60 h-60 bg-pink-200 rounded-full opacity-20"
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              delay: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-20"
            animate={{
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 7,
              delay: 2,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge
                  className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-violet-600 border-violet-200 shadow-sm"
                  variant="outline"
                >
                  Community & Support
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
              >
                Connect, Share, and <AnimatedGradientText>Grow Together</AnimatedGradientText>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="max-w-[600px] text-muted-foreground md:text-xl"
              >
                Join a supportive community of rural girls and women to share experiences, ask questions, and learn from
                each other.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={() => {
                    setActiveTab("forums")
                    scrollToSection(forumRef)
                  }}
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white shadow-lg shadow-violet-200 dark:shadow-none group relative overflow-hidden"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join Discussions
                  <span className="absolute right-full group-hover:right-4 transition-all duration-500 ease-in-out">
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
                <Button
                  onClick={() => {
                    setActiveTab("mentorship")
                    scrollToSection(mentorshipRef)
                  }}
                  variant="outline"
                  size="lg"
                  className="gradient-border group relative overflow-hidden"
                >
                  <User className="mr-2 h-4 w-4" />
                  Find a Mentor
                  <span className="absolute right-full group-hover:right-4 transition-all duration-500 ease-in-out">
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
                <Button
                  onClick={() => {
                    setActiveTab("events")
                    scrollToSection(eventsRef)
                  }}
                  variant="outline"
                  size="lg"
                  className="gradient-border group relative overflow-hidden"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Explore Events
                  <span className="absolute right-full group-hover:right-4 transition-all duration-500 ease-in-out">
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </motion.div>
              {/* Prominent Challenges & Rewards Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="mt-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-none"
                >
                  <Link href="/dashboard/community/challenges">
                    <Trophy className="mr-2 h-5 w-5" /> Challenges & Rewards
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="\c.png"
                alt="Rural women in a community meeting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent" />

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 right-10 z-20 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <MessageCircle className="h-8 w-8 text-violet-500" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-10 z-20 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 7,
                  delay: 1,
                  ease: "easeInOut",
                }}
              >
                <Users className="h-8 w-8 text-pink-500" />
              </motion.div>

              <motion.div
                className="absolute bottom-40 right-20 z-20 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 8,
                  delay: 2,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-8 w-8 text-red-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats Bar */}
      <div className="bg-violet-600 text-white py-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-animation"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{onlineUsers} members online now</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">2,547 discussions this week</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">12 upcoming events</span>
            </div>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">
                <Link href="/dashboard/community/challenges" className="underline hover:text-white/90">
                  Join challenges & earn rewards
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {/* Notifications and Actions Bar */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className="h-5 w-5" />
                      {notifications.some((n) => !n.read) && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isLiveChat ? "default" : "outline"}
                      size="sm"
                      className={isLiveChat ? "bg-green-600 hover:bg-green-700" : ""}
                      onClick={() => setIsLiveChat(!isLiveChat)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat {isLiveChat && <span className="ml-1 animate-pulse">●</span>}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Join the community live chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/community/challenges">
                        <Award className="h-4 w-4 mr-2" />
                        Challenges & Rewards
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Complete challenges and earn rewards</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Notifications Panel */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Notifications</CardTitle>
                      <Button variant="ghost" size="sm">
                        Mark all as read
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start p-3 rounded-lg ${notification.read ? "bg-background" : "bg-muted/30"}`}
                        >
                          <div
                            className={`p-2 rounded-full mr-3 ${
                              notification.type === "mention"
                                ? "bg-blue-100 text-blue-600"
                                : notification.type === "event"
                                  ? "bg-green-100 text-green-600"
                                  : notification.type === "challenge"
                                    ? "bg-purple-100 text-purple-600"
                                    : "bg-violet-100 text-violet-600"
                            }`}
                          >
                            {notification.type === "mention" ? (
                              <User className="h-4 w-4" />
                            ) : notification.type === "event" ? (
                              <Calendar className="h-4 w-4" />
                            ) : notification.type === "challenge" ? (
                              <Award className="h-4 w-4" />
                            ) : (
                              <MessageCircle className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.content}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Notifications
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isLiveChat && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Card>
                  <CardHeader className="pb-3 border-b">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CardTitle className="text-lg">Community Live Chat</CardTitle>
                        <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 border-green-200">
                          <span className="animate-pulse mr-1">●</span> Live
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setIsLiveChat(false)}>
                        Minimize
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[300px] overflow-y-auto p-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start mb-4 ${message.user.isCurrentUser ? "justify-end" : ""}`}
                        >
                          {!message.user.isCurrentUser && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={message.user.avatar || "/placeholder.svg"} alt={message.user.name} />
                              <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.user.isBot
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                                : message.user.isCurrentUser
                                  ? "bg-violet-600 text-white ml-2"
                                  : "bg-muted"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span
                                className={`text-xs font-medium ${message.user.isCurrentUser ? "text-violet-100" : "text-muted-foreground"}`}
                              >
                                {message.user.name}
                              </span>
                              <span
                                className={`text-xs ${message.user.isCurrentUser ? "text-violet-100" : "text-muted-foreground"}`}
                              >
                                {message.time}
                              </span>
                            </div>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t">
                      <form onSubmit={handleChatSubmit} className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Type your message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" disabled={!messageInput.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs defaultValue="forums" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="forums">Discussion Forums</TabsTrigger>
              <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="help">Help & FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="forums" id="forums">
              <div className="space-y-8" ref={forumRef}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <MessageCircle className="mr-2 h-6 w-6 text-violet-600" /> Discussion Forums
                  </h2>
                  <p className="text-muted-foreground">
                    Connect with other rural girls and women to share experiences, ask questions, and support each
                    other.
                  </p>
                </div>

                {/* Challenges Banner */}
                <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-full">
                          <Trophy className="h-10 w-10" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">New Community Challenges!</h3>
                          <p className="text-white/80">Complete challenges, earn points, and unlock rewards</p>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white text-violet-700 hover:bg-white/90"
                        asChild
                      >
                        <Link href="/dashboard/community/challenges">
                          <Target className="mr-2 h-4 w-4" /> View Challenges
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-yellow-500" /> Trending Discussions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {discussionPosts
                      .filter((post) => post.trending)
                      .map((post) => (
                        <Card key={post.id} className="card-hover border-yellow-200">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base hover:text-violet-600 transition-colors">
                              <Link href="#">{post.title}</Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Trending
                              </Badge>
                              <Badge variant="outline">{post.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between text-xs text-muted-foreground">
                            <span>{post.replies} replies</span>
                            <span>Active {post.lastActive}</span>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-amber-500" /> Featured Challenges
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Digital Skills Champion",
                        description:
                          "Complete 5 courses in the Digital Skills section and help 3 other members with their questions.",
                        reward: "Digital Skills Champion Badge + 500 points",
                        deadline: "May 15, 2025",
                        participants: 87,
                      },
                      {
                        title: "Community Builder",
                        description:
                          "Start 3 discussions that receive at least 10 replies each and participate in 10 other discussions.",
                        reward: "Community Builder Badge + 300 points",
                        deadline: "Ongoing",
                        participants: 124,
                      },
                      {
                        title: "Entrepreneurship Challenge",
                        description:
                          "Create a business plan and get feedback from 3 mentors. Present your idea in the next virtual meetup.",
                        reward: "Entrepreneurship Badge + 400 points + Mentorship session",
                        deadline: "June 1, 2025",
                        participants: 56,
                      },
                    ].map((challenge, index) => (
                      <Card key={index} className="card-hover border-amber-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base hover:text-amber-600 transition-colors">
                            <Link href="/dashboard/community/challenges">{challenge.title}</Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Challenge
                            </Badge>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">{challenge.description}</p>
                          <div className="mt-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-amber-600 font-medium">Reward:</span>
                              <span className="text-muted-foreground">{challenge.reward}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-amber-600 font-medium">Deadline:</span>
                              <span className="text-muted-foreground">{challenge.deadline}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-amber-600 font-medium">Participants:</span>
                              <span className="text-muted-foreground">{challenge.participants}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full bg-amber-500 hover:bg-amber-600">
                            <Link href="/dashboard/community/challenges">Join Challenge</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? "bg-violet-600 hover:bg-violet-700"
                            : "hover:bg-violet-50 hover:text-violet-700"
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search discussions..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <motion.div key={post.id} variants={itemVariants}>
                        <Card className="overflow-hidden card-hover">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl hover:text-violet-600 transition-colors">
                                  <Link href="#">{post.title}</Link>
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <Badge
                                    variant="outline"
                                    className="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800"
                                  >
                                    {post.category}
                                  </Badge>
                                  {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-3">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="h-8 w-8 border border-violet-200">
                                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <span className="font-medium">{post.author.name}</span>, {post.author.age}
                                <div className="text-xs text-muted-foreground flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" /> {post.author.location}
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{post.excerpt}</p>
                          </CardContent>
                          <CardFooter className="flex flex-wrap justify-between border-t bg-muted/20 px-6 py-3">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{post.views} views</span>
                              <span>{post.replies} replies</span>
                              <span>Active {post.lastActive}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={likedPosts.includes(post.id) ? "text-violet-600" : ""}
                                onClick={() => handleLike(post.id)}
                              >
                                <ThumbsUp
                                  className={`mr-1 h-4 w-4 ${likedPosts.includes(post.id) ? "fill-violet-600" : ""}`}
                                />
                                {likedPosts.includes(post.id) ? post.likes + 1 : post.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowCommentForm(showCommentForm === post.id ? null : post.id)}
                              >
                                <MessageCircle className="mr-1 h-4 w-4" />
                                {post.comments}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="mr-1 h-4 w-4" />
                                Share
                              </Button>
                            </div>
                          </CardFooter>
                          <AnimatePresence>
                            {showCommentForm === post.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-6 py-3 border-t"
                              >
                                <form onSubmit={handleCommentSubmit} className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>ME</AvatarFallback>
                                    </Avatar>
                                    <Textarea
                                      placeholder="Write your comment..."
                                      value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      className="flex-1 min-h-[80px]"
                                    />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setShowCommentForm(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      size="sm"
                                      className="bg-violet-600 hover:bg-violet-700"
                                      disabled={!commentText.trim()}
                                    >
                                      <Send className="mr-2 h-4 w-4" /> Post Comment
                                    </Button>
                                  </div>
                                </form>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No discussions found</h3>
                      <p className="text-muted-foreground mt-1">Try adjusting your search or category filters</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("All Topics")
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </motion.div>

                <div className="flex justify-center mt-8">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600"
                  >
                    <Link href="#">Start New Discussion</Link>
                  </Button>
                </div>

                <Card className="border-violet-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Community Guidelines</CardTitle>
                    <CardDescription>
                      Please follow these guidelines to keep our community safe and supportive
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-violet-600" /> Be Respectful
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Treat others with kindness and respect. Disagreements are natural, but always communicate
                          constructively.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-violet-600" /> Protect Privacy
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Don't share personal details that could identify you or others. Respect confidentiality.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2 text-violet-600" /> Ask Freely
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          There are no "stupid questions." Feel free to ask anything without fear of judgment.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center">
                          <Users className="h-4 w-4 mr-2 text-violet-600" /> Support Each Other
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          We're here to lift each other up. Share your knowledge and experiences to help others.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="mentorship" id="mentorship">
              <div className="space-y-8" ref={mentorshipRef}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <User className="mr-2 h-6 w-6 text-violet-600" /> Mentorship Network
                  </h2>
                  <p className="text-muted-foreground">
                    Connect with experienced mentors who can guide you on your journey.
                  </p>
                </div>

                {/* Featured Mentors */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" /> Featured Mentors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentors
                      .filter((mentor) => mentor.featured)
                      .map((mentor) => (
                        <Card key={mentor.id} className="card-hover border-yellow-200 overflow-hidden">
                          <div className="absolute top-0 right-0">
                            <Badge className="m-2 bg-yellow-500 text-white border-none">Featured</Badge>
                          </div>
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-yellow-200">
                                <Image
                                  src={mentor.image || "/placeholder.svg"}
                                  alt={mentor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{mentor.name}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <span>
                                    {mentor.rating} ({mentor.reviews} reviews)
                                  </span>
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                {mentor.expertise}
                              </Badge>
                              <div className="flex justify-between mt-2 text-sm">
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1 text-muted-foreground" /> {mentor.location}
                                </span>
                                <span>{mentor.experience}</span>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{mentor.bio}</p>
                          </CardContent>
                          <CardFooter>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600">
                                  Request Mentorship
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                {mentorshipRequestSubmitted ? (
                                  <div className="text-center py-6">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                      <Check className="h-6 w-6 text-green-600" />
                                    </div>
                                    <DialogTitle className="text-xl mb-2">Mentorship Request Submitted!</DialogTitle>
                                    <DialogDescription>
                                      Your request has been sent to {selectedMentor || mentor.name}. They will review
                                      your request and get back to you soon.
                                    </DialogDescription>
                                    <Button className="mt-6" onClick={() => setMentorshipRequestSubmitted(false)}>
                                      Close
                                    </Button>
                                  </div>
                                ) : (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle>Request Mentorship from {mentor.name}</DialogTitle>
                                      <DialogDescription>
                                        Please provide some information about what you're looking for in this mentorship
                                        relationship.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <Form {...mentorshipRequestForm}>
                                      <form
                                        onSubmit={mentorshipRequestForm.handleSubmit((data) => {
                                          setSelectedMentor(mentor.name)
                                          onMentorshipRequestSubmit(data)
                                        })}
                                        className="space-y-4"
                                      >
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="goals"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>What are your goals for this mentorship?</FormLabel>
                                              <FormControl>
                                                <Textarea
                                                  placeholder="I want to learn about..."
                                                  {...field}
                                                  className="min-h-[80px]"
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="interests"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>
                                                What specific topics or skills are you interested in?
                                              </FormLabel>
                                              <FormControl>
                                                <Input placeholder="Digital marketing, handicrafts, etc." {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="commitment"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>How much time can you commit to this mentorship?</FormLabel>
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Select your time commitment" />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                  <SelectItem value="1-hour-weekly">1 hour weekly</SelectItem>
                                                  <SelectItem value="2-hours-weekly">2 hours weekly</SelectItem>
                                                  <SelectItem value="1-hour-biweekly">
                                                    1 hour every two weeks
                                                  </SelectItem>
                                                  <SelectItem value="flexible">Flexible schedule</SelectItem>
                                                </SelectContent>
                                              </Select>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="preferredCommunication"
                                          render={() => (
                                            <FormItem>
                                              <div className="mb-2">
                                                <FormLabel>Preferred communication methods</FormLabel>
                                                <FormDescription>Select all that apply</FormDescription>
                                              </div>
                                              <div className="grid grid-cols-2 gap-2">
                                                {communicationOptions.map((option) => (
                                                  <FormField
                                                    key={option.id}
                                                    control={mentorshipRequestForm.control}
                                                    name="preferredCommunication"
                                                    render={({ field }) => {
                                                      return (
                                                        <FormItem
                                                          key={option.id}
                                                          className="flex flex-row items-start space-x-2 space-y-0"
                                                        >
                                                          <FormControl>
                                                            <Checkbox
                                                              checked={field.value?.includes(option.id)}
                                                              onCheckedChange={(checked) => {
                                                                return checked
                                                                  ? field.onChange([...field.value, option.id])
                                                                  : field.onChange(
                                                                      field.value?.filter(
                                                                        (value) => value !== option.id,
                                                                      ),
                                                                    )
                                                              }}
                                                            />
                                                          </FormControl>
                                                          <FormLabel className="text-sm font-normal">
                                                            {option.label}
                                                          </FormLabel>
                                                        </FormItem>
                                                      )
                                                    }}
                                                  />
                                                ))}
                                              </div>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="additionalInfo"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Additional information (optional)</FormLabel>
                                              <FormControl>
                                                <Textarea
                                                  placeholder="Anything else you'd like your mentor to know..."
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <DialogFooter className="mt-6">
                                          <Button type="submit">Submit Request</Button>
                                        </DialogFooter>
                                      </form>
                                    </Form>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
                    <Button variant="default" size="sm" className="bg-violet-600 hover:bg-violet-700">
                      All Categories
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Business
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Education
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Technology
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Health
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Skills
                    </Button>
                  </div>
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search mentors..." className="pl-8 w-full md:w-[250px]" />
                  </div>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {mentors
                    .filter((mentor) => !mentor.featured)
                    .map((mentor) => (
                      <motion.div key={mentor.id} variants={itemVariants}>
                        <Card className="h-full card-hover">
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-violet-200">
                                <Image
                                  src={mentor.image || "/placeholder.svg"}
                                  alt={mentor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{mentor.name}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <span>
                                    {mentor.rating} ({mentor.reviews} reviews)
                                  </span>
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <Badge
                                variant="outline"
                                className="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800"
                              >
                                {mentor.expertise}
                              </Badge>
                              <div className="flex justify-between mt-2 text-sm">
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1 text-muted-foreground" /> {mentor.location}
                                </span>
                                <span>{mentor.experience}</span>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{mentor.bio}</p>
                            <div>
                              <h4 className="text-sm font-medium mb-1">Specialties:</h4>
                              <div className="flex flex-wrap gap-1">
                                {mentor.specialties.map((specialty, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Badge
                                variant={mentor.availability.includes("Available") ? "default" : "outline"}
                                className={
                                  mentor.availability.includes("Available")
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-amber-100 text-amber-700 border-amber-200"
                                }
                              >
                                {mentor.availability}
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600">
                                  Request Mentorship
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                {mentorshipRequestSubmitted ? (
                                  <div className="text-center py-6">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                      <Check className="h-6 w-6 text-green-600" />
                                    </div>
                                    <DialogTitle className="text-xl mb-2">Mentorship Request Submitted!</DialogTitle>
                                    <DialogDescription>
                                      Your request has been sent to {selectedMentor || mentor.name}. They will review
                                      your request and get back to you soon.
                                    </DialogDescription>
                                    <Button className="mt-6" onClick={() => setMentorshipRequestSubmitted(false)}>
                                      Close
                                    </Button>
                                  </div>
                                ) : (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle>Request Mentorship from {mentor.name}</DialogTitle>
                                      <DialogDescription>
                                        Please provide some information about what you're looking for in this mentorship
                                        relationship.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <Form {...mentorshipRequestForm}>
                                      <form
                                        onSubmit={mentorshipRequestForm.handleSubmit((data) => {
                                          setSelectedMentor(mentor.name)
                                          onMentorshipRequestSubmit(data)
                                        })}
                                        className="space-y-4"
                                      >
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="goals"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>What are your goals for this mentorship?</FormLabel>
                                              <FormControl>
                                                <Textarea
                                                  placeholder="I want to learn about..."
                                                  {...field}
                                                  className="min-h-[80px]"
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="interests"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>
                                                What specific topics or skills are you interested in?
                                              </FormLabel>
                                              <FormControl>
                                                <Input placeholder="Digital marketing, handicrafts, etc." {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="commitment"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>How much time can you commit to this mentorship?</FormLabel>
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Select your time commitment" />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                  <SelectItem value="1-hour-weekly">1 hour weekly</SelectItem>
                                                  <SelectItem value="2-hours-weekly">2 hours weekly</SelectItem>
                                                  <SelectItem value="1-hour-biweekly">
                                                    1 hour every two weeks
                                                  </SelectItem>
                                                  <SelectItem value="flexible">Flexible schedule</SelectItem>
                                                </SelectContent>
                                              </Select>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="preferredCommunication"
                                          render={() => (
                                            <FormItem>
                                              <div className="mb-2">
                                                <FormLabel>Preferred communication methods</FormLabel>
                                                <FormDescription>Select all that apply</FormDescription>
                                              </div>
                                              <div className="grid grid-cols-2 gap-2">
                                                {communicationOptions.map((option) => (
                                                  <FormField
                                                    key={option.id}
                                                    control={mentorshipRequestForm.control}
                                                    name="preferredCommunication"
                                                    render={({ field }) => {
                                                      return (
                                                        <FormItem
                                                          key={option.id}
                                                          className="flex flex-row items-start space-x-2 space-y-0"
                                                        >
                                                          <FormControl>
                                                            <Checkbox
                                                              checked={field.value?.includes(option.id)}
                                                              onCheckedChange={(checked) => {
                                                                return checked
                                                                  ? field.onChange([...field.value, option.id])
                                                                  : field.onChange(
                                                                      field.value?.filter(
                                                                        (value) => value !== option.id,
                                                                      ),
                                                                    )
                                                              }}
                                                            />
                                                          </FormControl>
                                                          <FormLabel className="text-sm font-normal">
                                                            {option.label}
                                                          </FormLabel>
                                                        </FormItem>
                                                      )
                                                    }}
                                                  />
                                                ))}
                                              </div>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <FormField
                                          control={mentorshipRequestForm.control}
                                          name="additionalInfo"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Additional information (optional)</FormLabel>
                                              <FormControl>
                                                <Textarea
                                                  placeholder="Anything else you'd like your mentor to know..."
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <DialogFooter className="mt-6">
                                          <Button type="submit">Submit Request</Button>
                                        </DialogFooter>
                                      </form>
                                    </Form>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>

                <Card className="mt-12">
                  <CardHeader>
                    <CardTitle>Become a Mentor</CardTitle>
                    <CardDescription>
                      Share your knowledge and experience to help other rural girls and women
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      If you have expertise in any area that could benefit others in our community, consider becoming a
                      mentor. Mentors provide guidance, answer questions, and help mentees develop skills and
                      confidence.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          title: "Share Knowledge",
                          description: "Help others learn from your experience and expertise.",
                          icon: <BookOpen className="h-8 w-8 text-violet-600" />,
                        },
                        {
                          title: "Flexible Commitment",
                          description: "Mentor as much or as little as your schedule allows.",
                          icon: <Clock className="h-8 w-8 text-violet-600" />,
                        },
                        {
                          title: "Make a Difference",
                          description: "Help other rural women achieve their goals.",
                          icon: <Heart className="h-8 w-8 text-violet-600" />,
                        },
                      ].map((benefit, index) => (
                        <Card key={index} className="border-violet-100">
                          <CardHeader className="pb-2">
                            <div className="mb-2">{benefit.icon}</div>
                            <CardTitle className="text-lg">{benefit.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600">
                          Apply to Become a Mentor
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        {mentorApplicationSubmitted ? (
                          <div className="text-center py-6">
                            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                              <Check className="h-6 w-6 text-green-600" />
                            </div>
                            <DialogTitle className="text-xl mb-2">Application Submitted!</DialogTitle>
                            <DialogDescription>
                              Thank you for applying to become a mentor. Our team will review your application and get
                              back to you within 5-7 business days.
                            </DialogDescription>
                            <Button className="mt-6" onClick={() => setMentorApplicationSubmitted(false)}>
                              Close
                            </Button>
                          </div>
                        ) : (
                          <>
                            <DialogHeader>
                              <DialogTitle>Mentor Application</DialogTitle>
                              <DialogDescription>
                                Please provide information about your qualifications and experience to become a mentor.
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...mentorForm}>
                              <form onSubmit={mentorForm.handleSubmit(onMentorSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={mentorForm.control}
                                    name="fullName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Your full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={mentorForm.control}
                                    name="email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                          <Input type="email" placeholder="Your email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={mentorForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Your phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={mentorForm.control}
                                    name="location"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                          <Input placeholder="City, State" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <FormField
                                  control={mentorForm.control}
                                  name="expertise"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Area of Expertise</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select your primary area of expertise" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                                          <SelectItem value="technology">Technology & Digital Skills</SelectItem>
                                          <SelectItem value="education">Education & Academics</SelectItem>
                                          <SelectItem value="health">Health & Wellness</SelectItem>
                                          <SelectItem value="crafts">Traditional Crafts & Skills</SelectItem>
                                          <SelectItem value="agriculture">Agriculture & Farming</SelectItem>
                                          <SelectItem value="other">Other (specify in qualifications)</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={mentorForm.control}
                                  name="experience"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Years of Experience</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select your years of experience" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="1-3">1-3 years</SelectItem>
                                          <SelectItem value="4-6">4-6 years</SelectItem>
                                          <SelectItem value="7-10">7-10 years</SelectItem>
                                          <SelectItem value="10+">10+ years</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={mentorForm.control}
                                  name="qualifications"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Qualifications & Credentials</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Please list your relevant qualifications, certifications, and credentials..."
                                          {...field}
                                          className="min-h-[100px]"
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Include education, certifications, and relevant work experience
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={mentorForm.control}
                                  name="specialties"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Specialties</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="List specific skills or topics you can mentor in (e.g., Digital Marketing, Traditional Embroidery, Financial Planning)"
                                          {...field}
                                          className="min-h-[80px]"
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Be specific about the skills and knowledge areas you can help with
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={mentorForm.control}
                                  name="motivation"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Why do you want to be a mentor?</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Share your motivation for becoming a mentor..."
                                          {...field}
                                          className="min-h-[100px]"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={mentorForm.control}
                                  name="availability"
                                  render={() => (
                                    <FormItem>
                                      <div className="mb-2">
                                        <FormLabel>Availability</FormLabel>
                                        <FormDescription>Select all that apply</FormDescription>
                                      </div>
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {availabilityOptions.map((option) => (
                                          <FormField
                                            key={option.id}
                                            control={mentorForm.control}
                                            name="availability"
                                            render={({ field }) => {
                                              return (
                                                <FormItem
                                                  key={option.id}
                                                  className="flex flex-row items-start space-x-2 space-y-0"
                                                >
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={field.value?.includes(option.id)}
                                                      onCheckedChange={(checked) => {
                                                        return checked
                                                          ? field.onChange([...field.value, option.id])
                                                          : field.onChange(
                                                              field.value?.filter((value) => value !== option.id),
                                                            )
                                                      }}
                                                    />
                                                  </FormControl>
                                                  <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                                                </FormItem>
                                              )
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={mentorForm.control}
                                  name="agreeToTerms"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-4">
                                      <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>I agree to the mentor guidelines and code of conduct</FormLabel>
                                        <FormDescription>
                                          By checking this box, you agree to maintain confidentiality, provide
                                          constructive feedback, and uphold the values of our community.
                                        </FormDescription>
                                      </div>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <DialogFooter className="mt-6">
                                  <Button type="submit">Submit Application</Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="events" id="events">
              <div className="space-y-8" ref={eventsRef}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <Calendar className="mr-2 h-6 w-6 text-violet-600" /> Events & Workshops
                  </h2>
                  <p className="text-muted-foreground">
                    Join virtual and in-person events to learn new skills and connect with others.
                  </p>
                </div>

                {/* Featured Events */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" /> Featured Events
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events
                      .filter((event) => event.featured)
                      .map((event, index) => (
                        <Card key={index} className="card-hover border-yellow-200 overflow-hidden">
                          <div className="relative h-[200px] w-full">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Badge
                              className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600 text-white border-none"
                              variant="default"
                            >
                              Featured
                            </Badge>
                            <Badge
                              className="absolute top-3 right-3 bg-violet-600 hover:bg-violet-700 text-white border-none"
                              variant="default"
                            >
                              {event.type}
                            </Badge>
                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="text-white font-bold text-xl">{event.title}</h3>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-white/90 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  {event.date}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {event.time}
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardContent className="py-4">
                            <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                            <div className="flex items-center mt-3 text-sm">
                              <User className="h-3.5 w-3.5 mr-1 text-violet-500" />
                              <span>Hosted by: {event.host}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {event.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              <span>{event.participants} participants</span>
                            </div>
                            <Button className="bg-violet-600 hover:bg-violet-700" size="sm">
                              Register
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
                    <Button variant="default" size="sm" className="bg-violet-600 hover:bg-violet-700">
                      All Events
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Online
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      In-Person
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Workshops
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-700">
                      Webinars
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <option>This Month</option>
                      <option>Next Month</option>
                      <option>All Upcoming</option>
                    </select>
                  </div>
                </div>

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                  <h3 className="text-xl font-bold">All Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events
                      .filter((event) => !event.featured)
                      .map((event, index) => (
                        <motion.div key={index} variants={itemVariants}>
                          <Card className="overflow-hidden card-hover h-full">
                            <div className="relative h-[200px] w-full">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <Badge
                                className="absolute top-3 left-3 bg-violet-600 hover:bg-violet-700 text-white border-none"
                                variant="default"
                              >
                                {event.type}
                              </Badge>
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">{event.title}</CardTitle>
                              <CardDescription>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                  <div className="flex items-center text-sm">
                                    <Calendar className="h-3.5 w-3.5 mr-1 text-violet-500" />
                                    {event.date}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Clock className="h-3.5 w-3.5 mr-1 text-violet-500" />
                                    {event.time}
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center text-sm">
                                      <MapPin className="h-3.5 w-3.5 mr-1 text-violet-500" />
                                      {event.location}
                                    </div>
                                  )}
                                </div>
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                              <div className="flex items-center mt-3 text-sm">
                                <User className="h-3.5 w-3.5 mr-1 text-violet-500" />
                                <span>Hosted by: {event.host}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-3">
                                {event.tags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="h-3.5 w-3.5 mr-1" />
                                <span>{event.participants} participants</span>
                              </div>
                              <Button className="bg-violet-600 hover:bg-violet-700" size="sm">
                                Register
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                  </div>

                  <div className="mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Live Sessions</CardTitle>
                        <CardDescription>Join these free live sessions to learn from experts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {upcomingLiveSessions.map((session, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div>
                                <h3 className="font-medium">{session.title}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1 text-violet-500" />
                                    {session.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1 text-violet-500" />
                                    {session.time}
                                  </div>
                                  <div className="flex items-center">
                                    <User className="h-3.5 w-3.5 mr-1 text-violet-500" />
                                    {session.host}
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{session.description}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Calendar className="mr-1 h-3.5 w-3.5" /> Remind Me
                                </Button>
                                <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                                  <Video className="mr-1 h-3.5 w-3.5" /> Join
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" asChild className="w-full">
                          <Link href="#">View All Live Sessions</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value="help" id="help">
              <div className="space-y-8" ref={helpRef}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <MessageCircle className="mr-2 h-6 w-6 text-violet-600" /> Help & FAQ
                  </h2>
                  <p className="text-muted-foreground">
                    Find answers to common questions and get help with using the platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          question: "How do I join a discussion forum?",
                          answer:
                            "Navigate to the Discussion Forums tab, browse the available topics, and click on any discussion to read or participate. To start a new discussion, click the 'Start New Discussion' button at the bottom of the page.",
                        },
                        {
                          question: "How can I connect with a mentor?",
                          answer:
                            "Go to the Mentorship tab, browse the available mentors, and click 'Request Mentorship' on the profile of the mentor you'd like to connect with. You'll be prompted to fill out a short form explaining what you're looking for in a mentorship relationship.",
                        },
                        {
                          question: "Are the events free to attend?",
                          answer:
                            "Most events on our platform are free to attend. Some specialized workshops or conferences may have a nominal fee, which will be clearly indicated on the event page. We offer scholarships for paid events to ensure everyone can participate regardless of financial constraints.",
                        },
                        {
                          question: "How can I become a mentor?",
                          answer:
                            "If you have expertise or experience that could benefit others, you can apply to become a mentor by clicking the 'Apply to Become a Mentor' button in the Mentorship section. Our team will review your application and get back to you within 5-7 business days.",
                        },
                        {
                          question: "Is my information kept private?",
                          answer:
                            "Yes, we take privacy very seriously. Your personal information is protected and only shared according to our privacy policy. You can control what information is visible to others in your profile settings.",
                        },
                      ].map((faq, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-medium text-lg">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Need More Help?</CardTitle>
                        <CardDescription>Contact our support team</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <MessageCircle className="mr-2 h-4 w-4" /> Chat with Support
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="mr-2 h-4 w-4" /> Email Support
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Phone className="mr-2 h-4 w-4" /> Call Helpline
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Guides</CardTitle>
                        <CardDescription>Learn how to use the platform</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Link href="#" className="flex items-center p-2 hover:bg-muted rounded-md">
                          <FileText className="h-4 w-4 mr-2 text-violet-600" />
                          <span>Getting Started Guide</span>
                        </Link>
                        <Link href="#" className="flex items-center p-2 hover:bg-muted rounded-md">
                          <Users className="h-4 w-4 mr-2 text-violet-600" />
                          <span>Community Guidelines</span>
                        </Link>
                        <Link href="#" className="flex items-center p-2 hover:bg-muted rounded-md">
                          <Shield className="h-4 w-4 mr-2 text-violet-600" />
                          <span>Privacy & Safety</span>
                        </Link>
                        <Link href="#" className="flex items-center p-2 hover:bg-muted rounded-md">
                          <Video className="h-4 w-4 mr-2 text-violet-600" />
                          <span>Video Tutorials</span>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          asChild
          size="lg"
          className="rounded-full shadow-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
        >
          <Link href="/dashboard/community/challenges">
            <Trophy className="mr-2 h-5 w-5" /> Challenges & Rewards
          </Link>
        </Button>
      </div>
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-violet-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our <AnimatedGradientText>Community</AnimatedGradientText> in Numbers
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-2">
              Join thousands of rural girls and women connecting and growing together
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15,000+", label: "Community Members", icon: <Users className="h-6 w-6 text-violet-600" /> },
              {
                number: "8,500+",
                label: "Active Discussions",
                icon: <MessageCircle className="h-6 w-6 text-pink-500" />,
              },
              { number: "250+", label: "Expert Mentors", icon: <User className="h-6 w-6 text-yellow-500" /> },
              { number: "120+", label: "Monthly Events", icon: <Calendar className="h-6 w-6 text-green-500" /> },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-violet-50 dark:bg-violet-900/20 mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold gradient-text">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-violet-600 to-purple-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Community Today</h2>
              <p className="max-w-[700px] md:text-xl">
                Connect with other rural girls, share experiences, find mentors, and attend events to grow together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-violet-600 hover:bg-gray-100 hover:text-violet-700"
              >
                <Link href="/register">Register Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#forums">Explore Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
