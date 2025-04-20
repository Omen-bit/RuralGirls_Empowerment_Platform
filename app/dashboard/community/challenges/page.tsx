"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Gift,
  Heart,
  Lightbulb,
  MessageCircle,
  Star,
  Trophy,
  Users,
  Zap,
  Sparkles,
  Target,
  Flame,
  Crown,
} from "lucide-react"

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("challenges")
  const [userPoints, setUserPoints] = useState(125)
  const [userLevel, setUserLevel] = useState(2)
  const [userBadges, setUserBadges] = useState([
    {
      id: 1,
      name: "First Steps",
      description: "Completed your profile and first login",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      earned: true,
      date: "April 10, 2025",
    },
    {
      id: 2,
      name: "Helping Hand",
      description: "Answered 5 questions from other community members",
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      earned: true,
      date: "April 15, 2025",
    },
    {
      id: 3,
      name: "Knowledge Seeker",
      description: "Completed 3 digital literacy modules",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      earned: false,
      progress: 67,
    },
  ])

  const [challengeProgress, setChallengeProgress] = useState({
    dailyLogin: 5,
    courseCompletion: 2,
    communityHelp: 5,
    contentCreation: 1,
  })

  // Animation variants
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

  // Simulate progress update
  useEffect(() => {
    const timer = setTimeout(() => {
      setChallengeProgress((prev) => ({
        ...prev,
        dailyLogin: Math.min(prev.dailyLogin + 1, 7),
      }))
      setUserPoints((prev) => prev + 10)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Calculate level progress
  const levelProgress = ((userPoints % 100) / 100) * 100
  const pointsToNextLevel = 100 - (userPoints % 100)

  // Challenges data
  const challenges = [
    {
      id: 1,
      title: "7-Day Login Streak",
      description: "Login to the platform for 7 consecutive days",
      reward: "50 points + Consistency Badge",
      progress: challengeProgress.dailyLogin,
      total: 7,
      category: "daily",
      icon: <Flame className="h-10 w-10 text-orange-500" />,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: "Digital Skills Champion",
      description: "Complete all modules in the Digital Literacy section",
      reward: "200 points + Digital Champion Badge",
      progress: 3,
      total: 10,
      category: "learning",
      icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
      color: "from-yellow-500 to-amber-500",
    },
    {
      id: 3,
      title: "Community Helper",
      description: "Answer 10 questions from other community members",
      reward: "100 points + Helper Badge",
      progress: challengeProgress.communityHelp,
      total: 10,
      category: "community",
      icon: <Heart className="h-10 w-10 text-pink-500" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 4,
      title: "Content Creator",
      description: "Share 5 original posts or success stories",
      reward: "150 points + Creator Badge",
      progress: challengeProgress.contentCreation,
      total: 5,
      category: "creation",
      icon: <Sparkles className="h-10 w-10 text-purple-500" />,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: 5,
      title: "Health Awareness",
      description: "Complete the health quiz and track your wellness for 5 days",
      reward: "75 points + Wellness Badge",
      progress: 2,
      total: 5,
      category: "health",
      icon: <Heart className="h-10 w-10 text-red-500" />,
      color: "from-red-500 to-pink-500",
    },
    {
      id: 6,
      title: "Entrepreneurship Journey",
      description: "Complete the business roadmap and create a business plan",
      reward: "250 points + Entrepreneur Badge",
      progress: 1,
      total: 5,
      category: "business",
      icon: <Lightbulb className="h-10 w-10 text-blue-500" />,
      color: "from-blue-500 to-indigo-500",
    },
  ]

  // Leaderboard data
  const leaderboard = [
    {
      rank: 1,
      name: "Priya Sharma",
      points: 780,
      badges: 12,
      avatar: "/priya.jpg",
      location: "Rajasthan",
    },
    {
      rank: 2,
      name: "Meena Patel",
      points: 645,
      badges: 10,
      avatar: "/meena.jpg",
      location: "Gujarat",
    },
    {
      rank: 3,
      name: "Lakshmi Reddy",
      points: 590,
      badges: 9,
      avatar: "/lakshmi.jpg",
      location: "Andhra Pradesh",
    },
    {
      rank: 4,
      name: "Fatima Khan",
      points: 520,
      badges: 8,
      avatar: "/fatima.png",
      location: "Uttar Pradesh",
    },
    {
      rank: 5,
      name: "Anjali Singh",
      points: 480,
      badges: 7,
      avatar: "/placeholder.svg?height=50&width=50",
      location: "Bihar",
    },
    {
      rank: 6,
      name: "You",
      points: userPoints,
      badges: userBadges.filter((b) => b.earned).length,
      avatar: "/placeholder.svg?height=50&width=50",
      location: "Your Village",
      isCurrentUser: true,
    },
  ]

  // Rewards data
  const rewards = [
    {
      id: 1,
      title: "500MB Data Pack",
      description: "Get free mobile data to continue learning online",
      points: 200,
      image: "/placeholder.svg?height=100&width=100",
      available: true,
    },
    {
      id: 2,
      title: "Skill Workshop Access",
      description: "Exclusive access to a premium skill workshop",
      points: 350,
      image: "/placeholder.svg?height=100&width=100",
      available: false,
    },
    {
      id: 3,
      title: "Mentorship Session",
      description: "30-minute one-on-one session with an expert mentor",
      points: 500,
      image: "/placeholder.svg?height=100&width=100",
      available: false,
    },
    {
      id: 4,
      title: "Certificate of Achievement",
      description: "Digital certificate to showcase your skills",
      points: 750,
      image: "/placeholder.svg?height=100&width=100",
      available: false,
    },
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
                  Community Challenges
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
              >
                Complete <AnimatedGradientText>Challenges</AnimatedGradientText> & Earn Rewards
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="max-w-[600px] text-muted-foreground md:text-xl"
              >
                Participate in challenges, earn points and badges, and climb the leaderboard while developing valuable
                skills.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/reward.png"
                alt="Rural women earning badges and rewards"
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
                <Trophy className="h-8 w-8 text-yellow-500" />
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
                <Award className="h-8 w-8 text-purple-500" />
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
                <Star className="h-8 w-8 text-amber-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* User Progress Bar */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-animation"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {userLevel}
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-500 text-xs text-white font-medium rounded-full h-6 w-6 flex items-center justify-center">
                  <Crown className="h-3 w-3" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg">Level {userLevel}</h3>
                <div className="w-full max-w-[200px]">
                  <Progress value={levelProgress} className="h-2 bg-white/20" indicatorClassName="bg-yellow-400" />
                </div>
                <p className="text-xs mt-1">
                  {pointsToNextLevel} points to Level {userLevel + 1}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="flex items-center gap-1 text-xl font-bold">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  {userPoints}
                </div>
                <p className="text-xs">Points</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-xl font-bold">
                  <Award className="h-5 w-5 text-yellow-300" />
                  {userBadges.filter((b) => b.earned).length}
                </div>
                <p className="text-xs">Badges</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-xl font-bold">
                  <Target className="h-5 w-5 text-yellow-300" />
                  {challenges.filter((c) => c.progress === c.total).length}
                </div>
                <p className="text-xs">Completed</p>
              </div>
            </div>

            <Button variant="secondary" className="bg-white text-violet-700 hover:bg-white/90">
              View Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="challenges" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            {/* Challenges Tab */}
            <TabsContent value="challenges">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <Target className="mr-2 h-6 w-6 text-violet-600" /> Active Challenges
                  </h2>
                  <p className="text-muted-foreground">
                    Complete these challenges to earn points, badges, and unlock rewards.
                  </p>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {challenges.map((challenge) => (
                    <motion.div key={challenge.id} variants={itemVariants} whileHover={{ y: -5 }}>
                      <Card className="h-full overflow-hidden border-none shadow-lg">
                        <div className={`h-2 w-full bg-gradient-to-r ${challenge.color}`}></div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">{challenge.icon}</div>
                            <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                              {challenge.category}
                            </Badge>
                          </div>
                          <CardTitle className="mt-2">{challenge.title}</CardTitle>
                          <CardDescription>{challenge.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">
                                {challenge.progress}/{challenge.total}
                              </span>
                            </div>
                            <Progress
                              value={(challenge.progress / challenge.total) * 100}
                              className="h-2"
                              indicatorClassName={`bg-gradient-to-r ${challenge.color}`}
                            />
                            <p className="text-sm flex items-center mt-2">
                              <Gift className="h-4 w-4 mr-1 text-violet-500" />
                              <span className="text-muted-foreground">Reward: {challenge.reward}</span>
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className={`w-full ${challenge.progress === challenge.total ? "bg-green-600 hover:bg-green-700" : "bg-violet-600 hover:bg-violet-700"}`}
                            disabled={challenge.progress === challenge.total}
                          >
                            {challenge.progress === challenge.total ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" /> Completed
                              </>
                            ) : (
                              <>
                                <Zap className="mr-2 h-4 w-4" /> Continue Challenge
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex justify-center mt-8">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600"
                  >
                    <Link href="#">View All Challenges</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <Award className="mr-2 h-6 w-6 text-violet-600" /> Your Badges
                  </h2>
                  <p className="text-muted-foreground">
                    Collect badges by completing challenges and contributing to the community.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userBadges.map((badge) => (
                    <Card key={badge.id} className={`h-full ${!badge.earned ? "opacity-60" : ""}`}>
                      <CardHeader className="pb-2 text-center">
                        <div className="mx-auto p-4 bg-violet-50 dark:bg-violet-900/20 rounded-full w-20 h-20 flex items-center justify-center mb-2">
                          {badge.icon}
                        </div>
                        <CardTitle className="text-xl">{badge.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center pb-2">
                        <p className="text-muted-foreground">{badge.description}</p>
                        {badge.earned ? (
                          <Badge className="mt-4 bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="mr-1 h-3 w-3" /> Earned on {badge.date}
                          </Badge>
                        ) : (
                          <div className="mt-4 space-y-2">
                            <Badge variant="outline">In Progress</Badge>
                            <Progress value={badge.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">{badge.progress}% complete</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {/* Additional badges to unlock */}
                  {[
                    {
                      id: 4,
                      name: "Digital Champion",
                      description: "Complete all digital literacy modules",
                      icon: <Lightbulb className="h-8 w-8 text-gray-400" />,
                      earned: false,
                      progress: 30,
                    },
                    {
                      id: 5,
                      name: "Community Leader",
                      description: "Help 20 community members with their questions",
                      icon: <Users className="h-8 w-8 text-gray-400" />,
                      earned: false,
                      progress: 25,
                    },
                    {
                      id: 6,
                      name: "Health Advocate",
                      description: "Complete all health modules and quizzes",
                      icon: <Heart className="h-8 w-8 text-gray-400" />,
                      earned: false,
                      progress: 15,
                    },
                  ].map((badge) => (
                    <Card key={badge.id} className="h-full opacity-60">
                      <CardHeader className="pb-2 text-center">
                        <div className="mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mb-2">
                          {badge.icon}
                        </div>
                        <CardTitle className="text-xl">{badge.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center pb-2">
                        <p className="text-muted-foreground">{badge.description}</p>
                        <div className="mt-4 space-y-2">
                          <Badge variant="outline">In Progress</Badge>
                          <Progress value={badge.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">{badge.progress}% complete</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <Trophy className="mr-2 h-6 w-6 text-violet-600" /> Community Leaderboard
                  </h2>
                  <p className="text-muted-foreground">See how you rank against other community members.</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Based on points earned and badges collected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Top 3 with special styling */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {leaderboard.slice(0, 3).map((user, index) => (
                          <Card
                            key={index}
                            className={`border-none shadow-lg ${index === 0 ? "bg-gradient-to-b from-yellow-50 to-white border-yellow-200" : index === 1 ? "bg-gradient-to-b from-gray-50 to-white border-gray-200" : "bg-gradient-to-b from-amber-50 to-white border-amber-200"}`}
                          >
                            <CardHeader className="text-center pb-2">
                              <div className="relative mx-auto">
                                <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                  <Image
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.name}
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                  />
                                </div>
                                <div
                                  className={`absolute -top-2 -right-2 h-8 w-8 rounded-full flex items-center justify-center text-white ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"}`}
                                >
                                  {index === 0 ? (
                                    <Crown className="h-5 w-5" />
                                  ) : (
                                    <span className="font-bold">{user.rank}</span>
                                  )}
                                </div>
                              </div>
                              <CardTitle className="mt-2">{user.name}</CardTitle>
                              <CardDescription>{user.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                              <div className="flex justify-center gap-6">
                                <div>
                                  <p className="text-2xl font-bold text-violet-600">{user.points}</p>
                                  <p className="text-xs text-muted-foreground">Points</p>
                                </div>
                                <div>
                                  <p className="text-2xl font-bold text-amber-500">{user.badges}</p>
                                  <p className="text-xs text-muted-foreground">Badges</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Rest of the leaderboard */}
                      <div className="space-y-2">
                        {leaderboard.slice(3).map((user) => (
                          <div
                            key={user.rank}
                            className={`flex items-center justify-between p-4 rounded-lg ${user.isCurrentUser ? "bg-violet-50 border border-violet-200 dark:bg-violet-900/20" : "hover:bg-muted/50"}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-sm font-medium">
                                {user.rank}
                              </div>
                              <div className="h-10 w-10 rounded-full overflow-hidden">
                                <Image
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {user.name} {user.isCurrentUser && <span className="text-violet-600">(You)</span>}
                                </p>
                                <p className="text-xs text-muted-foreground">{user.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <p className="font-medium">{user.points}</p>
                                <p className="text-xs text-muted-foreground">Points</p>
                              </div>
                              <div className="text-center">
                                <p className="font-medium">{user.badges}</p>
                                <p className="text-xs text-muted-foreground">Badges</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">View Full Leaderboard</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Challenges</CardTitle>
                    <CardDescription>Special challenges that reset every week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Discussion Champion",
                          description: "Start 3 meaningful discussions in the community forums",
                          reward: "50 points",
                          progress: 1,
                          total: 3,
                          icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
                        },
                        {
                          title: "Knowledge Sharing",
                          description: "Share 2 useful resources or tips with the community",
                          reward: "30 points",
                          progress: 0,
                          total: 2,
                          icon: <BookOpen className="h-8 w-8 text-green-500" />,
                        },
                      ].map((challenge, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                              <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-full">
                                {challenge.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{challenge.title}</h3>
                                <p className="text-sm text-muted-foreground">{challenge.description}</p>
                                <div className="flex items-center mt-2 text-sm">
                                  <Gift className="h-4 w-4 mr-1 text-violet-500" />
                                  <span>{challenge.reward}</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">
                              {challenge.progress}/{challenge.total}
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight flex items-center">
                    <Gift className="mr-2 h-6 w-6 text-violet-600" /> Rewards Marketplace
                  </h2>
                  <p className="text-muted-foreground">
                    Redeem your points for valuable rewards to support your learning journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className={`h-full ${!reward.available ? "opacity-60" : ""}`}>
                      <div className="relative h-40 w-full">
                        <Image
                          src={reward.image || "/placeholder.svg"}
                          alt={reward.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-violet-600 hover:bg-violet-700">
                            <Zap className="mr-1 h-3 w-3" /> {reward.points} points
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{reward.title}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" disabled={!reward.available || userPoints < reward.points}>
                          {userPoints >= reward.points
                            ? "Redeem Reward"
                            : `Need ${reward.points - userPoints} more points`}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>How to Earn Points</CardTitle>
                    <CardDescription>Complete these activities to earn more points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          activity: "Daily Login",
                          points: "10 points",
                          description: "Log in to the platform every day",
                          icon: <Calendar className="h-8 w-8 text-blue-500" />,
                        },
                        {
                          activity: "Complete a Course Module",
                          points: "50 points",
                          description: "Finish any module in the learning sections",
                          icon: <BookOpen className="h-8 w-8 text-green-500" />,
                        },
                        {
                          activity: "Answer Community Questions",
                          points: "15 points",
                          description: "Help others by answering their questions",
                          icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
                        },
                        {
                          activity: "Share Your Success Story",
                          points: "100 points",
                          description: "Post about your achievements and inspire others",
                          icon: <Star className="h-8 w-8 text-yellow-500" />,
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-4 p-4 border rounded-lg">
                          <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-full h-fit">{item.icon}</div>
                          <div>
                            <h3 className="font-medium">{item.activity}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <Badge className="mt-2 bg-violet-100 text-violet-700 border-violet-200">
                              <Zap className="mr-1 h-3 w-3" /> {item.points}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-violet-600 to-purple-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Start Your Challenge Journey Today</h2>
              <p className="max-w-[700px] md:text-xl">
                Complete challenges, earn rewards, and develop valuable skills while having fun.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-violet-600 hover:bg-gray-100 hover:text-violet-700"
              >
                <Link href="#challenges">Start First Challenge</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/community">Back to Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
