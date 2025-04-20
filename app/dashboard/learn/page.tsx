"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  Award,
  Clock,
  Code,
  FileText,
  Scissors,
  Search,
  Star,
  Users,
  Leaf,
  Sparkles,
  Utensils,
  User,
  CheckCircle,
  Calendar,
  Smartphone,
  Banknote,
  CreditCard,
  Heart,
  MessageSquare,
  Building,
  BarChart,
  ShoppingBag,
  TrendingUp,
  Briefcase,
  LightbulbIcon,
  AlertTriangle,
  ChevronRight,
  CircleDollarSign,
  GraduationCap,
  LineChart,
  PiggyBank,
  HandshakeIcon,
} from "lucide-react"
import { motion } from "framer-motion"

export default function SkillMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  // Course categories
  const categories = [
    "All Categories",
    "Handicrafts",
    "Tailoring",
    "Digital Skills",
    "Agriculture",
    "Beauty & Wellness",
    "Food Processing",
    "Business",
    "Health",
    "Language",
  ]

  // Course data organized by domains
  const courses = [
    // HANDICRAFTS & TAILORING
    {
      title: "Basic Tailoring",
      description: "Learn to stitch clothes, make alterations, and basic design principles.",
      icon: <Scissors className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.8,
      reviews: 245,
      image: "/tailoring.jpg",
      category: "Tailoring",
    },
    {
      title: "Advanced Embroidery",
      description: "Master traditional and modern embroidery techniques for clothing and home decor.",
      icon: <Scissors className="h-8 w-8 text-primary" />,
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.7,
      reviews: 189,
      image: "/advanced embroydery.jpg",
      category: "Handicrafts",
    },

    // DIGITAL SKILLS
    {
      title: "Web Development Basics",
      description: "Learn HTML, CSS, and basic JavaScript to build simple websites.",
      icon: <Code className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "10 weeks",
      rating: 4.6,
      reviews: 156,
      image: "/web development.jpg",
      category: "Digital Skills",
    },
    {
      title: "Digital Marketing Fundamentals",
      description: "Learn to promote products and services online using social media and other digital channels.",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "6 weeks",
      rating: 4.7,
      reviews: 178,
      image: "/digital marketing.jpg",
      category: "Digital Skills",
    },
    {
      title: "Smartphone Photography",
      description: "Take professional-quality photos using just ysour smartphone.",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.8,
      reviews: 132,
      image: "/smartphone photography.jpg",
      category: "Digital Skills",
    },

    // AGRICULTURE
    {
      title: "Organic Farming",
      description: "Learn sustainable farming techniques for vegetables and herbs.",
      icon: <Leaf className="h-8 w-8 text-primary" />,
      level: "All Levels",
      duration: "8 weeks",
      rating: 4.9,
      reviews: 210,
      image: "/organic farming.jpg",
      category: "Agriculture",
    },
    {
      title: "Water Conservation Techniques",
      description: "Learn efficient irrigation and water management for farming.",
      icon: <Leaf className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.8,
      reviews: 175,
      image: "/water conservation.jpg",
      category: "Agriculture",
    },

    // BEAUTY & WELLNESS
    {
      title: "Beauty & Wellness",
      description: "Learn professional beauty treatments, makeup, and hair styling.",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "6 weeks",
      rating: 4.7,
      reviews: 178,
      image: "/beauty and wellness.jpg",
      category: "Beauty & Wellness",
    },

    // FOOD PROCESSING
    {
      title: "Food Processing",
      description: "Learn to preserve, package, and market local food products.",
      icon: <Utensils className="h-8 w-8 text-primary" />,
      level: "Intermediate",
      duration: "5 weeks",
      rating: 4.8,
      reviews: 132,
      image: "/food processing.jpg",
      category: "Food Processing",
    },

    // BUSINESS & FINANCIAL
    {
      title: "Entrepreneurship Basics",
      description: "Learn the fundamentals of starting and running a small business.",
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.9,
      reviews: 220,
      image: "/entreprenuership.jpg",
      category: "Business",
    },
    {
      title: "Financial Literacy",
      description: "Understand savings, banking, budgeting, and financial planning.",
      icon: <Banknote className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.8,
      reviews: 195,
      image: "/finance literacy.jpg",
      category: "Business",
    },
    {
      title: "Digital Payments & Banking",
      description: "Learn to use mobile wallets, UPI, and online banking safely.",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "3 weeks",
      rating: 4.7,
      reviews: 165,
      image: "/digital payment.jpg",
      category: "Business",
    },

    // HEALTH
    {
      title: "Health & Hygiene Essentials",
      description: "Essential knowledge about personal health, nutrition, and hygiene.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.9,
      reviews: 230,
      image: "/hygiene essentials.jpg",
      category: "Health",
    },
    {
      title: "Women's Health",
      description: "Comprehensive guide to women's health and wellness.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      level: "All Levels",
      duration: "6 weeks",
      rating: 4.8,
      reviews: 210,
      image: "/women health.jpg",
      category: "Health",
    },

    // LANGUAGE
    {
      title: "English Communication",
      description: "Build confidence in speaking, reading, and writing English.",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      level: "Beginner",
      duration: "12 weeks",
      rating: 4.7,
      reviews: 185,
      image: "/english.jpg",
      category: "Language",
    },
  ]

  // Filter courses based on search query and selected category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Certification paths
  const certifications = [
    {
      title: "Certified Tailor",
      description: "Demonstrate proficiency in garment construction, alterations, and basic design.",
      icon: <Award className="h-8 w-8 text-primary" />,
      requirements: "Complete Basic Tailoring course + practical assessment",
      recognition: "Recognized by Textile Industry Association",
    },
    {
      title: "Digital Skills Certificate",
      description: "Prove your ability to use computers, internet, and basic office applications.",
      icon: <Award className="h-8 w-8 text-primary" />,
      requirements: "Complete 3 digital literacy modules + online test",
      recognition: "Recognized by National Digital Literacy Mission",
    },
    {
      title: "Handicraft Artisan Certificate",
      description: "Certify your expertise in traditional handicraft techniques and quality standards.",
      icon: <Award className="h-8 w-8 text-primary" />,
      requirements: "Submit portfolio + complete assessment",
      recognition: "Recognized by Handicrafts Export Promotion Council",
    },
    {
      title: "Organic Farming Practitioner",
      description: "Validate your knowledge of sustainable farming practices and organic standards.",
      icon: <Award className="h-8 w-8 text-primary" />,
      requirements: "Complete course + field demonstration",
      recognition: "Recognized by Organic Farming Association",
    },
    {
      title: "Beauty Professional",
      description: "Certify your skills in professional beauty treatments and client service.",
      icon: <Award className="h-8 w-8 text-primary" />,
      requirements: "Complete course + practical examination",
      recognition: "Recognized by Beauty & Wellness Sector Council",
    },
    {
      title: "Food Processing Technician",
      description: "Validate your knowledge of food safety, preservation, and processing techniques.",
      icon: <Award className="h-8 w-8 text-primary" />,
      requirements: "Complete course + food safety exam",
      recognition: "Recognized by Food Safety Standards Authority",
    },
  ]

  // Workshop data
  const workshops = [
    {
      title: "Modern Embroidery Techniques",
      description: "Learn contemporary embroidery styles that are in high demand in the fashion industry.",
      date: "April 25, 2025",
      time: "10:00 AM - 12:00 PM",
      instructor: "Meena Sharma, Fashion Designer",
      mode: "Online (Zoom)",
      seats: "Limited to 50 participants",
    },
    {
      title: "Digital Marketing for Small Businesses",
      description:
        "Learn how to promote your products and services online using social media and other digital channels.",
      date: "April 28, 2025",
      time: "2:00 PM - 4:00 PM",
      instructor: "Rahul Verma, Digital Marketing Expert",
      mode: "Online (Zoom)",
      seats: "Limited to 100 participants",
    },
    {
      title: "Natural Dyeing Workshop",
      description: "Learn to create and use natural dyes from plants and other sustainable sources for textiles.",
      date: "May 5, 2025",
      time: "11:00 AM - 3:00 PM",
      instructor: "Lakshmi Devi, Master Artisan",
      mode: "In-person (Jaipur Center)",
      seats: "Limited to 30 participants",
    },
    {
      title: "Financial Literacy for Entrepreneurs",
      description: "Learn essential financial management skills for running a successful small business.",
      date: "May 10, 2025",
      time: "10:00 AM - 12:00 PM",
      instructor: "Priya Patel, Financial Advisor",
      mode: "Online (Zoom)",
      seats: "Limited to 75 participants",
    },
  ]

  // Business types for entrepreneurship hub
  const businessTypes = [
    {
      title: "Handicrafts Business",
      description: "Create and sell traditional or modern handicrafts",
      icon: <Scissors className="h-8 w-8 text-primary" />,
      investment: "₹5,000 - ₹25,000",
      difficulty: "Medium",
      timeToProfit: "3-6 months",
      examples: ["Embroidery", "Pottery", "Jewelry", "Textiles", "Basket Weaving"],
    },
    {
      title: "Food Processing",
      description: "Process and package local foods for wider distribution",
      icon: <Utensils className="h-8 w-8 text-primary" />,
      investment: "₹10,000 - ₹50,000",
      difficulty: "Medium-High",
      timeToProfit: "3-8 months",
      examples: ["Pickles & Preserves", "Spice Blends", "Snacks", "Baked Goods"],
    },
    {
      title: "Agricultural Business",
      description: "Grow and sell crops or provide agricultural services",
      icon: <Leaf className="h-8 w-8 text-primary" />,
      investment: "₹15,000 - ₹75,000",
      difficulty: "High",
      timeToProfit: "6-12 months",
      examples: ["Organic Farming", "Seed Production", "Nursery", "Composting"],
    },
    {
      title: "Beauty & Wellness",
      description: "Offer beauty services or create beauty products",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      investment: "₹10,000 - ₹50,000",
      difficulty: "Medium",
      timeToProfit: "2-6 months",
      examples: ["Beauty Salon", "Herbal Products", "Spa Services", "Cosmetics"],
    },
    {
      title: "Digital Services",
      description: "Provide digital services to local businesses and individuals",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      investment: "₹5,000 - ₹30,000",
      difficulty: "Medium-High",
      timeToProfit: "1-4 months",
      examples: ["Digital Assistance", "Content Creation", "Computer Training", "Photography"],
    },
  ]

  // Case studies for entrepreneurship hub
  const caseStudies = [
    {
      title: "Madhubani Art Collective",
      location: "Bihar",
      founder: "Sarita Devi",
      business: "Handicrafts",
      description:
        "A group of women artists who sell traditional Madhubani paintings online and to urban markets. They started with just 5 women and now support 25 families.",
      challenge: "Limited access to markets beyond local village fairs",
      solution: "Created an online presence and partnered with urban retailers",
      results: "Annual revenue of ₹15 lakhs, supporting 25 families",
      image: "/art collective.jpg",
    },
    {
      title: "Organic Spice Enterprise",
      location: "Kerala",
      founder: "Lakshmi Nair",
      business: "Food Processing",
      description:
        "A family business that processes and packages organic spices from their farm and neighboring farms. They focus on quality and traditional processing methods.",
      challenge: "Competition from large commercial spice companies",
      solution: "Emphasized organic certification and traditional processing methods",
      results: "Exports to 5 countries, annual growth of 40%",
      image: "/spices.jpg",
    },
    {
      title: "Rural Digital Services",
      location: "Rajasthan",
      founder: "Meena Sharma",
      business: "Digital Services",
      description:
        "Provides digital assistance, photography, and computer training to her community and nearby villages. Started with just a computer and smartphone.",
      challenge: "Low digital literacy in the community",
      solution: "Offered free basic training to build trust and demonstrate value",
      results: "Serves 5 villages, monthly income of ₹25,000",
      image: "/digital sevice.jpg",
    },
    {
      title: "Sustainable Dairy Cooperative",
      location: "Punjab",
      founder: "Harpreet Kaur",
      business: "Agriculture",
      description:
        "A women-led dairy cooperative that produces organic milk products using sustainable practices. They started with 10 cows shared among 5 families.",
      challenge: "Lack of cold storage and transportation",
      solution: "Invested in solar-powered refrigeration and local delivery network",
      results: "50 member families, monthly turnover of ₹8 lakhs",
      image: "/dairy cooperative.jpg",
    },
  ]

  // Business roadmap steps
  const roadmapSteps = [
    {
      title: "Idea Validation",
      description: "Validate your business idea to ensure there's a market for it",
      icon: <LightbulbIcon className="h-8 w-8 text-primary" />,
      tasks: [
        "Research your target market to understand customer needs",
        "Identify and analyze competitors",
        "Create prototypes or samples and get feedback",
        "Determine pricing that covers costs and provides profit",
      ],
      resources: [
        { name: "Market Research Guide", type: "PDF" },
        { name: "Customer Interview Template", type: "Template" },
        { name: "Competitor Analysis Worksheet", type: "Template" },
      ],
    },
    {
      title: "Business Planning",
      description: "Create a solid plan for your business operations and finances",
      icon: <FileText className="h-8 w-8 text-primary" />,
      tasks: [
        "Create a simple business plan outlining key aspects",
        "Estimate startup costs, operating expenses, and revenue",
        "Identify resources (materials, equipment, skills) needed",
        "Assess potential risks and develop mitigation strategies",
      ],
      resources: [
        { name: "Simple Business Plan Template", type: "Template" },
        { name: "Financial Planning Spreadsheet", type: "Tool" },
        { name: "Risk Assessment Checklist", type: "PDF" },
      ],
    },
    {
      title: "Setup & Preparation",
      description: "Set up your business operations and prepare for launch",
      icon: <Building className="h-8 w-8 text-primary" />,
      tasks: [
        "Register your business and obtain necessary permits",
        "Set up your production space or workspace",
        "Establish relationships with suppliers",
        "Create your brand identity (name, logo, packaging)",
      ],
      resources: [
        { name: "Business Registration Guide", type: "PDF" },
        { name: "Supplier Evaluation Template", type: "Template" },
        { name: "Branding Basics for Small Business", type: "Course" },
      ],
    },
    {
      title: "Launch & Marketing",
      description: "Launch your business and implement marketing strategies",
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      tasks: [
        "Finalize your initial product or service offerings",
        "Create basic marketing materials",
        "Set up social media accounts or a simple website",
        "Plan and execute a small launch event or promotion",
      ],
      resources: [
        { name: "Product Catalog Template", type: "Template" },
        { name: "Social Media Setup Guide", type: "PDF" },
        { name: "Launch Event Planning Checklist", type: "PDF" },
      ],
    },
    {
      title: "Growth & Scaling",
      description: "Grow your business and explore new opportunities",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      tasks: [
        "Implement strategies to keep existing customers",
        "Develop new products or services based on feedback",
        "Bring on employees or partners to help grow",
        "Reinvest profits and explore funding for expansion",
      ],
      resources: [
        { name: "Customer Retention Strategies", type: "PDF" },
        { name: "Hiring Guide for Small Businesses", type: "PDF" },
        { name: "Funding Options for Rural Businesses", type: "Directory" },
      ],
    },
  ]

  // Funding and resources data
  const fundingOptions = [
    {
      title: "Government Schemes",
      description:
        "Government programs that provide financial support, subsidies, and resources for rural entrepreneurs.",
      icon: <Building className="h-8 w-8 text-primary" />,
      options: [
        {
          name: "Pradhan Mantri Mudra Yojana (PMMY)",
          description: "Loans up to ₹10 lakhs for small businesses with minimal documentation.",
          eligibility: "Any Indian citizen with a viable business plan",
        },
        {
          name: "Stand-Up India",
          description: "Loans between ₹10 lakhs to ₹1 crore for SC/ST and women entrepreneurs.",
          eligibility: "SC/ST and women entrepreneurs",
        },
        {
          name: "Prime Minister's Employment Generation Programme (PMEGP)",
          description: "Credit-linked subsidy for setting up micro-enterprises.",
          eligibility: "Individuals above 18 years with at least 8th grade education",
        },
        {
          name: "Mahila Samridhi Yojana",
          description: "Loans and subsidies specifically for women entrepreneurs in rural areas.",
          eligibility: "Women in rural areas",
        },
      ],
    },
    {
      title: "Microfinance Options",
      description: "Small loans with flexible terms for starting or growing your business.",
      icon: <Banknote className="h-8 w-8 text-primary" />,
      options: [
        {
          name: "Self-Help Group Loans",
          description: "Join a local SHG to access group loans with low interest rates.",
          amount: "₹25,000 - ₹3 lakhs",
          interest: "10-12% per annum",
        },
        {
          name: "Microfinance Institutions",
          description: "Specialized institutions offering small business loans to rural entrepreneurs.",
          amount: "₹10,000 - ₹2 lakhs",
          interest: "18-24% per annum",
        },
        {
          name: "Bank Linkage Programs",
          description: "Special programs from banks for rural entrepreneurs with simplified processes.",
          amount: "Up to ₹5 lakhs",
          interest: "8-12% per annum",
        },
      ],
    },
    {
      title: "Non-Financial Resources",
      description: "Support services and resources beyond funding to help your business succeed.",
      icon: <Users className="h-8 w-8 text-primary" />,
      options: [
        {
          name: "Business Mentorship",
          description:
            "Connect with experienced entrepreneurs who can guide you through starting and growing your business.",
          provider: "Various NGOs and government programs",
        },
        {
          name: "Skill Development Programs",
          description: "Free or subsidized training programs to build business and technical skills.",
          provider: "National Skill Development Corporation and partners",
        },
        {
          name: "Market Linkage Support",
          description: "Programs that help connect rural businesses with urban and online markets.",
          provider: "Ministry of Rural Development and various NGOs",
        },
        {
          name: "Technology Access",
          description: "Programs providing access to technology, equipment, and digital tools for rural businesses.",
          provider: "Common Service Centers and Digital India initiatives",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-3 py-1">
                Skill Marketplace
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Build Skills for a Better Future
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Access vocational training, earn certifications, and explore entrepreneurship opportunities designed for
                rural communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="#courses">Browse Courses</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#entrepreneurship">Explore Entrepreneurship</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/skill.png"
                alt="Women learning vocational skills"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="entrepreneurship">Entrepreneurship Hub</TabsTrigger>
            </TabsList>

            {/* Courses */}
            <TabsContent value="courses" id="courses">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Vocational Training Courses</h2>
                  <p className="text-muted-foreground">
                    Learn practical skills that can help you earn a living or start a business.
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      className="pl-8 h-9 w-[200px] rounded-md"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <Card key={index}>
                      <div className="relative h-[150px] w-full">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">{course.level}</Badge>
                                <Badge variant="outline">{course.duration}</Badge>
                              </div>
                            </CardDescription>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{course.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({course.reviews})</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{course.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="link" asChild className="px-0">
                          <Link href="#">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm">Enroll</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button variant="outline" asChild>
                    <Link href="#">View All Courses</Link>
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            {/* Certifications */}
            <TabsContent value="certifications">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Micro-Certifications</h2>
                  <p className="text-muted-foreground">
                    Earn recognized certifications to showcase your skills to potential employers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications.map((certification, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="mb-2">{certification.icon}</div>
                        <CardTitle>{certification.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{certification.description}</p>
                        <div>
                          <h4 className="text-sm font-medium">Requirements:</h4>
                          <p className="text-sm text-muted-foreground">{certification.requirements}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Recognition:</h4>
                          <p className="text-sm text-muted-foreground">{certification.recognition}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild>
                          <Link href="#">Apply for Certification</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Workshops */}
            <TabsContent value="workshops">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Workshops & Live Sessions</h2>
                  <p className="text-muted-foreground">
                    Join interactive workshops and live training sessions with industry experts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workshops.map((workshop, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{workshop.title}</CardTitle>
                          <Badge>{workshop.mode}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{workshop.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{workshop.time}</span>
                          </div>
                          <div className="flex items-center col-span-2">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{workshop.instructor}</span>
                          </div>
                          <div className="flex items-center col-span-2">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{workshop.seats}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href="#">More Details</Link>
                        </Button>
                        <Button>Register</Button>
                      </CardFooter>
                    </Card>
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
                        {[
                          {
                            title: "Success Stories: Rural Women Entrepreneurs",
                            date: "April 20, 2025",
                            time: "6:00 PM - 7:00 PM",
                          },
                          {
                            title: "Q&A: Starting a Handicraft Business",
                            date: "April 22, 2025",
                            time: "5:00 PM - 6:00 PM",
                          },
                          {
                            title: "Introduction to E-commerce for Rural Businesses",
                            date: "April 27, 2025",
                            time: "6:00 PM - 7:00 PM",
                          },
                        ].map((session, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{session.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {session.date} • {session.time}
                              </p>
                            </div>
                            <Button size="sm">Remind Me</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Entrepreneurship Hub */}
            <TabsContent value="entrepreneurship" id="entrepreneurship">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Entrepreneurship Hub</h2>
                  <p className="text-muted-foreground">
                    Explore business opportunities, learn how to start and grow your own business, and access resources
                    for entrepreneurs.
                  </p>
                </div>

                <Tabs defaultValue="business-types" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="business-types">Business Types</TabsTrigger>
                    <TabsTrigger value="roadmap">Business Roadmap</TabsTrigger>
                    <TabsTrigger value="funding">Funding & Resources</TabsTrigger>
                  </TabsList>

                  {/* Business Types */}
                  <TabsContent value="business-types">
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {businessTypes.map((business, index) => (
                          <Card key={index} className="h-full">
                            <CardHeader>
                              <div className="mb-2">{business.icon}</div>
                              <CardTitle>{business.title}</CardTitle>
                              <CardDescription>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline">Investment: {business.investment}</Badge>
                                  <Badge variant="outline">Difficulty: {business.difficulty}</Badge>
                                </div>
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-muted-foreground">{business.description}</p>
                              <div>
                                <h4 className="text-sm font-medium">Examples:</h4>
                                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
                                  {business.examples.map((example, exIndex) => (
                                    <li key={exIndex} className="text-sm text-muted-foreground flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-2 text-primary" />
                                      {example}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Time to Profitability:</h4>
                                <p className="text-sm text-muted-foreground">{business.timeToProfit}</p>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="link" asChild className="px-0">
                                <Link href="#">
                                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>

                      <div className="space-y-4 mt-8">
                        <h3 className="text-xl font-bold">Case Studies</h3>
                        <p className="text-muted-foreground">
                          Real examples of successful rural businesses started by women entrepreneurs.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          {caseStudies.map((study, index) => (
                            <Card key={index}>
                              <div className="relative h-[200px] w-full">
                                <Image
                                  src={study.image || "/placeholder.svg"}
                                  alt={study.title}
                                  fill
                                  className="object-cover rounded-t-lg"
                                />
                              </div>
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle>{study.title}</CardTitle>
                                    <CardDescription>
                                      {study.founder} • {study.location}
                                    </CardDescription>
                                  </div>
                                  <Badge>{study.business}</Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{study.description}</p>
                                <div className="space-y-2">
                                  <div>
                                    <h4 className="text-sm font-medium">Challenge:</h4>
                                    <p className="text-sm text-muted-foreground">{study.challenge}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Solution:</h4>
                                    <p className="text-sm text-muted-foreground">{study.solution}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Results:</h4>
                                    <p className="text-sm text-muted-foreground">{study.results}</p>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" asChild>
                                  <Link href="https://serialsjournals.com/abstract/90832_7-shweta_aggarwal.pdf">Read Full Case Study</Link>
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>

                        <div className="flex justify-center mt-6">
                          <Button asChild>
                            <Link href="#">View All Case Studies</Link>
                          </Button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>Business Analysis Tools</CardTitle>
                            <CardDescription>Tools to help you analyze and plan your business</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[
                                {
                                  title: "Market Analysis",
                                  description: "Understand your target market and competition",
                                  icon: <BarChart className="h-8 w-8 text-primary" />,
                                },
                                {
                                  title: "Financial Projections",
                                  description: "Estimate costs, revenue, and profitability",
                                  icon: <LineChart className="h-8 w-8 text-primary" />,
                                },
                                {
                                  title: "Risk Assessment",
                                  description: "Identify and mitigate potential business risks",
                                  icon: <AlertTriangle className="h-8 w-8 text-primary" />,
                                },
                              ].map((tool, index) => (
                                <Card key={index} className="border-dashed">
                                  <CardHeader className="pb-2">
                                    <div className="mb-2">{tool.icon}</div>
                                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                                  </CardContent>
                                  <CardFooter>
                                    <Button variant="outline" size="sm" asChild className="w-full">
                                      <Link href="#">Access Tool</Link>
                                    </Button>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* Business Roadmap */}
                  <TabsContent value="roadmap">
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Your Business Journey</h3>
                        <p className="text-muted-foreground mb-4">
                          Follow this step-by-step roadmap to start and grow your business from idea to successful
                          enterprise.
                        </p>
                        <div className="relative">
                          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-primary/20"></div>
                          <div className="space-y-8">
                            {roadmapSteps.map((step, index) => (
                              <div key={index} className="relative">
                                <div className="flex">
                                  <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                                      {index + 1}
                                    </div>
                                  </div>
                                  <div className="ml-6">
                                    <Card className="w-full">
                                      <CardHeader>
                                        <div className="flex items-center">
                                          <div className="mr-4">{step.icon}</div>
                                          <div>
                                            <CardTitle>{step.title}</CardTitle>
                                            <CardDescription>{step.description}</CardDescription>
                                          </div>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">Key Tasks:</h4>
                                          <ul className="space-y-1">
                                            {step.tasks.map((task, taskIndex) => (
                                              <li key={taskIndex} className="flex items-start">
                                                <CheckCircle className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm text-muted-foreground">{task}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">Helpful Resources:</h4>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {step.resources.map((resource, resIndex) => (
                                              <div
                                                key={resIndex}
                                                className="flex items-center p-2 border rounded-md hover:bg-muted/50 transition-colors"
                                              >
                                                <FileText className="h-4 w-4 mr-2 text-primary" />
                                                <span className="text-sm">{resource.name}</span>
                                                <Badge variant="outline" className="ml-auto text-xs">
                                                  {resource.type}
                                                </Badge>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </CardContent>
                                      <CardFooter>
                                        <Button asChild>
                                          <Link href="#">Start This Step</Link>
                                        </Button>
                                      </CardFooter>
                                    </Card>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>Advanced Business Planning</CardTitle>
                            <CardDescription>
                              Take your business to the next level with these advanced planning resources
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                              {[
                                {
                                  title: "Scaling Your Business",
                                  content:
                                    "Learn strategies for growing your business beyond the initial startup phase, including hiring employees, expanding product lines, and entering new markets.",
                                },
                                {
                                  title: "Digital Transformation",
                                  content:
                                    "Discover how to leverage digital tools and technologies to improve efficiency, reach more customers, and stay competitive in today's market.",
                                },
                                {
                                  title: "Building Business Partnerships",
                                  content:
                                    "Understand how to form strategic partnerships with suppliers, distributors, and other businesses to strengthen your position and create new opportunities.",
                                },
                                {
                                  title: "Export Readiness",
                                  content:
                                    "Prepare your business for international markets with guidance on export regulations, cultural considerations, and global market entry strategies.",
                                },
                              ].map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                  <AccordionTrigger>{item.title}</AccordionTrigger>
                                  <AccordionContent>
                                    <p className="text-muted-foreground mb-4">{item.content}</p>
                                    <Button variant="outline" size="sm" asChild>
                                      <Link href="#">Access Resources</Link>
                                    </Button>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex justify-center mt-8">
                        <Button size="lg" asChild>
                          <Link href="/entrepreneurship/roadmap">View Detailed Business Roadmap</Link>
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* Funding & Resources */}
                  <TabsContent value="funding">
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {fundingOptions.map((category, index) => (
                        <div key={index} className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div>{category.icon}</div>
                            <div>
                              <h3 className="text-xl font-bold">{category.title}</h3>
                              <p className="text-muted-foreground">{category.description}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.options.map((option, optIndex) => (
                              <Card key={optIndex}>
                                <CardHeader>
                                  <CardTitle className="text-lg">{option.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <p className="text-muted-foreground">{option.description}</p>
                                  {option.eligibility && (
                                    <div>
                                      <h4 className="text-sm font-medium">Eligibility:</h4>
                                      <p className="text-sm text-muted-foreground">{option.eligibility}</p>
                                    </div>
                                  )}
                                  {option.amount && (
                                    <div className="flex justify-between">
                                      <div>
                                        <h4 className="text-sm font-medium">Amount:</h4>
                                        <p className="text-sm text-muted-foreground">{option.amount}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium">Interest:</h4>
                                        <p className="text-sm text-muted-foreground">{option.interest}</p>
                                      </div>
                                    </div>
                                  )}
                                  {option.provider && (
                                    <div>
                                      <h4 className="text-sm font-medium">Provider:</h4>
                                      <p className="text-sm text-muted-foreground">{option.provider}</p>
                                    </div>
                                  )}
                                </CardContent>
                                <CardFooter>
                                  <Button variant="outline" asChild>
                                    <Link href="#">Learn More & Apply</Link>
                                  </Button>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="mt-8">
                        <Card className="bg-primary/5">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <CircleDollarSign className="h-8 w-8 text-primary" />
                              <CardTitle>Financial Planning Tools</CardTitle>
                            </div>
                            <CardDescription>
                              Use these tools to plan your business finances and prepare for funding applications
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[
                                {
                                  title: "Business Loan Calculator",
                                  description: "Calculate loan payments, interest costs, and repayment schedules",
                                  icon: <PiggyBank className="h-6 w-6 text-primary" />,
                                },
                                {
                                  title: "Cash Flow Projector",
                                  description: "Estimate your business's cash flow for the next 12 months",
                                  icon: <LineChart className="h-6 w-6 text-primary" />,
                                },
                                {
                                  title: "Startup Cost Calculator",
                                  description: "Estimate how much you need to start your business",
                                  icon: <BarChart className="h-6 w-6 text-primary" />,
                                },
                              ].map((tool, index) => (
                                <Card key={index} className="border-dashed">
                                  <CardHeader className="pb-2">
                                    <div className="mb-1">{tool.icon}</div>
                                    <CardTitle className="text-base">{tool.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                                  </CardContent>
                                  <CardFooter>
                                    <Button variant="outline" size="sm" asChild className="w-full">
                                      <Link href="#">Use Tool</Link>
                                    </Button>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="mt-8">
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <HandshakeIcon className="h-8 w-8 text-primary" />
                              <CardTitle>Business Support Network</CardTitle>
                            </div>
                            <CardDescription>
                              Connect with mentors, advisors, and other entrepreneurs for guidance and support
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                {
                                  title: "Find a Mentor",
                                  description:
                                    "Connect with experienced entrepreneurs who can guide you through starting and growing your business.",
                                  icon: <GraduationCap className="h-6 w-6 text-primary" />,
                                },
                                {
                                  title: "Join Entrepreneur Circles",
                                  description:
                                    "Participate in peer groups of rural women entrepreneurs for mutual support and learning.",
                                  icon: <Users className="h-6 w-6 text-primary" />,
                                },
                                {
                                  title: "Business Support Centers",
                                  description:
                                    "Visit local business support centers for guidance on registration, taxes, and compliance.",
                                  icon: <Building className="h-6 w-6 text-primary" />,
                                },
                                {
                                  title: "Expert Consultations",
                                  description:
                                    "Schedule one-on-one consultations with experts in marketing, finance, and operations.",
                                  icon: <User className="h-6 w-6 text-primary" />,
                                },
                              ].map((support, index) => (
                                <div key={index} className="flex items-start p-4 border rounded-lg">
                                  <div className="mr-4 mt-1">{support.icon}</div>
                                  <div>
                                    <h3 className="font-medium">{support.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{support.description}</p>
                                    <Button variant="link" className="px-0 mt-1" asChild>
                                      <Link href="#">
                                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Track Your Progress</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Monitor your learning journey and showcase your achievements.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Dashboard</CardTitle>
                <CardDescription>Track your course progress and certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Courses in Progress</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Basic Tailoring", progress: 65 },
                        { name: "Digital Marketing Fundamentals", progress: 30 },
                        { name: "Financial Literacy", progress: 80 },
                      ].map((course, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{course.name}</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Completed Courses</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Smartphone Basics", date: "March 15, 2025" },
                        { name: "Introduction to Embroidery", date: "February 20, 2025" },
                      ].map((course, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>{course.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{course.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <br />
                  <CardTitle>certifications</CardTitle>
                    <br />
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          name: "Digital Literacy",
                          date: "January 2025",
                          icon: <FileText className="h-8 w-8 text-primary" />,
                        },
                        {
                          name: "Basic Handicrafts",
                          date: "December 2024",
                          icon: <Award className="h-8 w-8 text-primary" />,
                        },
                      ].map((cert, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center p-4 border rounded-lg text-center"
                        >
                          <div className="mb-2">{cert.icon}</div>
                          <h4 className="text-sm font-medium">{cert.name}</h4>
                          <p className="text-xs text-muted-foreground">{cert.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Skill Badges</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: "Computer Skills", level: "Level 1" },
                        { name: "Communication", level: "Level 2" },
                        { name: "Creativity", level: "Level 1" },
                        { name: "Teamwork", level: "Level 2" },
                        { name: "Problem Solving", level: "Level 1" },
                        { name: "Leadership", level: "Level 1" },
                      ].map((badge, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center p-2 border rounded-lg text-center"
                        >
                          <Badge variant="outline" className="mb-1">
                            {badge.level}
                          </Badge>
                          <span className="text-xs">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Start Building Your Skills Today</h2>
              <p className="max-w-[700px] md:text-xl">
                Join thousands of rural girls who have transformed their lives through skill development and
                entrepreneurship.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Register Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="#entrepreneurship">Explore Entrepreneurship</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
