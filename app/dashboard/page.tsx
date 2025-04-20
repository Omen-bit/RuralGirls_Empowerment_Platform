"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Heart,
  Lightbulb,
  Sparkles,
  Users,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring, useAnimation } from "framer-motion"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"

export default function Home() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const updatesRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  const isUpdatesInView = useInView(updatesRef, { once: true, margin: "-100px" })
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" })
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2])

  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)
  const [count4, setCount4] = useState(0)

  useEffect(() => {
    if (isStatsInView) {
      // Animate the counters
      const duration = 2000 // 2 seconds
      const interval = 20 // Update every 20ms

      const target1 = 10000
      const target2 = 500
      const target3 = 2500
      const target4 = 85

      const steps1 = Math.ceil(duration / interval)
      const steps2 = Math.ceil(duration / interval)
      const steps3 = Math.ceil(duration / interval)
      const steps4 = Math.ceil(duration / interval)

      const increment1 = target1 / steps1
      const increment2 = target2 / steps2
      const increment3 = target3 / steps3
      const increment4 = target4 / steps4

      let current1 = 0
      let current2 = 0
      let current3 = 0
      let current4 = 0

      const timer = setInterval(() => {
        current1 = Math.min(current1 + increment1, target1)
        current2 = Math.min(current2 + increment2, target2)
        current3 = Math.min(current3 + increment3, target3)
        current4 = Math.min(current4 + increment4, target4)

        setCount1(Math.floor(current1))
        setCount2(Math.floor(current2))
        setCount3(Math.floor(current3))
        setCount4(Math.floor(current4))

        if (current1 >= target1 && current2 >= target2 && current3 >= target3 && current4 >= target4) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isStatsInView])


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

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative bg-gradient-to-b from-purple-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-background"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-float" />
          <div className="absolute top-40 -right-20 w-60 h-60 bg-pink-200 rounded-full opacity-20 animate-float-delay-1" />
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-float-delay-2" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge
                    className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-purple-600 border-purple-200 shadow-sm"
                    variant="outline"
                  >
                    Empowering Rural Girls
                  </Badge>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  <span className="block">Building a</span>{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                    Brighter Future
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                >
                  Access education, develop skills, build businesses, and connect with a supportive community designed
                  specifically for rural girls.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-lg shadow-purple-200 dark:shadow-none"
                >
                  <Link href="/register">Join Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="gradient-border">
                  <Link href="#features">Explore Features</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="\home.png"
                alt="Rural girls using digital devices"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-purple-50 dark:from-background dark:to-gray-900"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isTestimonialsInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <Badge
                variant="outline"
                className="px-3 py-1 bg-white dark:bg-gray-800 text-purple-600 border-purple-200 shadow-sm"
              >
                Inspirational Stories
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hear From Our <span className="gradient-text">Community</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Real stories from girls who have transformed their lives through our platform.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isTestimonialsInView ? "visible" : "hidden"}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8"
          >
            {[
              {
                name: "Priya",
                location: "Rajasthan",
                quote:
                  "The digital literacy program helped me access government schemes for my family and start my own small business selling handcrafted jewelry. Now I earn enough to support my education and help my family.",
                image: "\priya.jpg",
              },
              {
                name: "Meena",
                location: "Bihar",
                quote:
                  "I learned tailoring through the skill marketplace and now earn enough to support my education. I've even started teaching other girls in my village and we're forming a cooperative to sell our products online.",
                image: "meena.jpg",
              },
              {
                name: "Lakshmi",
                location: "Tamil Nadu",
                quote:
                  "The health resources helped me understand important topics that were never discussed in my village. I've become a health ambassador, sharing what I've learned with other girls and women in my community.",
                image: "\lakshmi.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Card className="text-left h-full card-hover">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-purple-200">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.location}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" size="sm" className="px-0 text-purple-600">
                      Read full story <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" ref={featuresRef} className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comprehensive <span className="gradient-text">Features</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our platform offers extensive resources designed specifically for rural girls.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12"
          >
            {[
              {
                title: "Digital Literacy",
                description:
                  "Learn basic digital skills, online safety, and practical applications in your local language. Access resources even offline in areas with limited connectivity.",
                icon: <BookOpen className="h-10 w-10 text-purple-600" />,
                link: "/digital-literacy",
                color: "bg-purple-50 dark:bg-purple-900/20",
              },
              {
                title: "Skill Marketplace",
                description:
                  "Access vocational training courses, earn micro-certifications, participate in workshops, and find local job opportunities to build your career.",
                icon: <Briefcase className="h-10 w-10 text-pink-500" />,
                link: "/skill-marketplace",
                color: "bg-pink-50 dark:bg-pink-900/20",
              },
              {
                title: "Entrepreneurship Hub",
                description:
                  "Get business training, build a digital storefront, explore localized business ideas, and access microfinance resources and government schemes.",
                icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
                link: "/entrepreneurship",
                color: "bg-yellow-50 dark:bg-yellow-900/20",
              },
              {
                title: "Health & Hygiene",
                description:
                  "Access educational resources on menstrual hygiene, reproductive health, and connect with health services. Join safe community forums for discussions.",
                icon: <Heart className="h-10 w-10 text-red-500" />,
                link: "/health",
                color: "bg-red-50 dark:bg-red-900/20",
              },
              {
                title: "Community & Support",
                description:
                  "Join discussion forums, connect with mentors, participate in workshops and events. Get answers to your questions in a safe, supportive environment.",
                icon: <Users className="h-10 w-10 text-blue-500" />,
                link: "/community",
                color: "bg-blue-50 dark:bg-blue-900/20",
              },
              {
                title: "Scholarships & Rights",
                description:
                  "Discover educational scholarships, government schemes, and learn about your legal rights. Access resources to help you achieve your full potential.",
                icon: <GraduationCap className="h-10 w-10 text-green-500" />,
                link: "/opportunities",
                color: "bg-green-50 dark:bg-green-900/20",
              },
            ].map((feature, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Card className="h-full border-none shadow-lg card-hover">
                  <CardHeader className={`rounded-t-lg ${feature.color}`}>
                    <div className="mb-2 p-2 bg-white dark:bg-gray-800 rounded-full w-fit shadow-sm">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="px-0 text-purple-600">
                      <Link href={feature.link}>
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Updates */}
      <section
        ref={updatesRef}
        className="w-full py-12 md:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isUpdatesInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Latest <span className="gradient-text">Updates</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Stay informed about new resources, events, and opportunities.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isUpdatesInView ? "visible" : "hidden"}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8"
          >
            {[
              {
                title: "New Tailoring Course Added",
                date: "April 10, 2025",
                description:
                  "Learn professional tailoring skills with our new comprehensive course. Master garment construction, alterations, and design basics to start your own business.",
                category: "Skill Marketplace",
                color: "bg-pink-100 text-pink-700 border-pink-200",
              },
              {
                title: "Government Scheme Workshop",
                date: "April 15, 2025",
                description:
                  "Join our online workshop to learn about accessing government support schemes for education, entrepreneurship, and skill development. Expert guidance provided.",
                category: "Opportunities",
                color: "bg-green-100 text-green-700 border-green-200",
              },
              {
                title: "Health Camp Announcement",
                date: "April 20, 2025",
                description:
                  "Free health checkups and consultations in selected districts. Services include general health, reproductive health, and mental wellbeing support.",
                category: "Health & Hygiene",
                color: "bg-red-100 text-red-700 border-red-200",
              },
            ].map((update, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Card className="text-left h-full card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={update.color}>
                        {update.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{update.date}</span>
                    </div>
                    <CardTitle className="text-lg mt-2">{update.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{update.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="px-0 text-purple-600">
                      <Link href="#">
                        Read more <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community Today</h2>
              <p className="max-w-[700px] md:text-xl">
                Connect with other rural girls, access resources, and start your journey towards empowerment.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700"
              >
                <Link href="/register">Register Now</Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700">
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section ref={statsRef} className="w-full py-12 md:py-24 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our <AnimatedGradientText>Impact</AnimatedGradientText>
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-2">
              Transforming lives across rural communities
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: count1,
                label: "Girls Empowered",
                icon: <Sparkles className="h-6 w-6 text-purple-600" />,
                suffix: "+",
              },
              {
                number: count2,
                label: "Villages Reached",
                icon: <Users className="h-6 w-6 text-pink-500" />,
                suffix: "+",
              },
              {
                number: count3,
                label: "Businesses Started",
                icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
                suffix: "+",
              },
              {
                number: count4,
                label: "Continued Education",
                icon: <GraduationCap className="h-6 w-6 text-green-500" />,
                suffix: "%",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/20 mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold">
                  <AnimatedGradientText>
                    {stat.number.toLocaleString()}
                    {stat.suffix}
                  </AnimatedGradientText>
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-purple-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-2">
              Simple steps to start your empowerment journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                step: "1",
                title: "Register & Create Profile",
                description:
                  "Sign up for free and create your personal profile. Tell us about your interests and goals.",
              },
              {
                step: "2",
                title: "Explore Resources",
                description: "Browse courses, workshops, and resources tailored to your needs and interests.",
              },
              {
                step: "3",
                title: "Connect & Grow",
                description: "Join the community, connect with mentors, and start your journey toward empowerment.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute top-0 left-0 -mt-4 -ml-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <Card className="pt-8 h-full card-hover">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="px-0 text-purple-600">
                      <Link href="/register">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
