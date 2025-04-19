"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Calendar,
  Heart,
  MessageCircle,
  Play,
  Shield,
  User,
  ShoppingBag,
  AlertCircle,
  Apple,
  CheckCircle,
  Download,
  Clock,
  Droplet,
  Moon,
  Activity,
  BookOpen,
  Award,
  ThumbsUp,
  Smile,
  Frown,
  Meh,
  Info,
  Send,
  PlusCircle,
  Sparkles,
  MoreHorizontal,
} from "lucide-react"

// Period Tracker Component
const PeriodTracker = () => {
  const [lastPeriod, setLastPeriod] = useState("")
  const [cycleLength, setCycleLength] = useState(28)
  const [periodLength, setPeriodLength] = useState(5)
  const [symptoms, setSymptoms] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [nextPeriod, setNextPeriod] = useState("")
  const [fertileWindow, setFertileWindow] = useState({ start: "", end: "" })
  const [currentPhase, setCurrentPhase] = useState("")
  const [phaseDay, setPhaseDay] = useState(0)
  const [phaseProgress, setPhaseProgress] = useState(0)

  const commonSymptoms = [
    "Cramps",
    "Bloating",
    "Headache",
    "Fatigue",
    "Mood swings",
    "Breast tenderness",
    "Backache",
    "Acne",
  ]

  const calculateCycle = () => {
    if (!lastPeriod) return

    const lastDate = new Date(lastPeriod)

    // Calculate next period
    const nextDate = new Date(lastDate)
    nextDate.setDate(nextDate.getDate() + cycleLength)
    setNextPeriod(nextDate.toLocaleDateString())

    // Calculate fertile window (typically 5 days before ovulation, day of ovulation, and 1 day after)
    const ovulationDate = new Date(lastDate)
    ovulationDate.setDate(ovulationDate.getDate() + Math.floor(cycleLength / 2) - 14)

    const fertileStart = new Date(ovulationDate)
    fertileStart.setDate(fertileStart.getDate() - 5)

    const fertileEnd = new Date(ovulationDate)
    fertileEnd.setDate(fertileEnd.getDate() + 1)

    setFertileWindow({
      start: fertileStart.toLocaleDateString(),
      end: fertileEnd.toLocaleDateString(),
    })

    // Determine current phase
    const today = new Date()
    const daysSinceLastPeriod = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24))

    if (daysSinceLastPeriod < periodLength) {
      setCurrentPhase("Menstrual Phase")
      setPhaseDay(daysSinceLastPeriod + 1)
      setPhaseProgress((daysSinceLastPeriod / periodLength) * 100)
    } else if (daysSinceLastPeriod < 14) {
      setCurrentPhase("Follicular Phase")
      setPhaseDay(daysSinceLastPeriod - periodLength + 1)
      setPhaseProgress(((daysSinceLastPeriod - periodLength) / (14 - periodLength)) * 100)
    } else if (daysSinceLastPeriod < 17) {
      setCurrentPhase("Ovulation Phase")
      setPhaseDay(daysSinceLastPeriod - 14 + 1)
      setPhaseProgress(((daysSinceLastPeriod - 14) / 3) * 100)
    } else if (daysSinceLastPeriod < cycleLength) {
      setCurrentPhase("Luteal Phase")
      setPhaseDay(daysSinceLastPeriod - 17 + 1)
      setPhaseProgress(((daysSinceLastPeriod - 17) / (cycleLength - 17)) * 100)
    } else {
      setCurrentPhase("Expected Period")
      setPhaseDay(1)
      setPhaseProgress(100)
    }

    setShowResults(true)
  }

  const toggleSymptom = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom))
    } else {
      setSymptoms([...symptoms, symptom])
    }
  }

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "Menstrual Phase":
        return "from-red-500 to-pink-500"
      case "Follicular Phase":
        return "from-yellow-500 to-orange-500"
      case "Ovulation Phase":
        return "from-green-500 to-teal-500"
      case "Luteal Phase":
        return "from-blue-500 to-indigo-500"
      case "Expected Period":
        return "from-purple-500 to-pink-500"
      default:
        return "from-gray-500 to-gray-700"
    }
  }

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case "Menstrual Phase":
        return "This is when you have your period. The uterine lining sheds, causing bleeding."
      case "Follicular Phase":
        return "Your body is preparing for ovulation. Estrogen levels rise and an egg-containing follicle grows."
      case "Ovulation Phase":
        return "An egg is released from the ovary. This is when you're most fertile."
      case "Luteal Phase":
        return "The body prepares for possible pregnancy. If the egg isn't fertilized, hormone levels drop."
      case "Expected Period":
        return "Your period is expected to start soon."
      default:
        return ""
    }
  }

  const getPhaseRecommendations = () => {
    switch (currentPhase) {
      case "Menstrual Phase":
        return [
          "Rest when needed and don't push yourself too hard",
          "Stay hydrated and eat iron-rich foods",
          "Use a heating pad for cramps",
          "Practice gentle yoga or walking",
        ]
      case "Follicular Phase":
        return [
          "Great time for starting new projects",
          "Energy levels are rising - good for more intense exercise",
          "Focus on building strength and endurance",
          "Socialize and connect with others",
        ]
      case "Ovulation Phase":
        return [
          "Peak energy and confidence - good for challenges",
          "Great time for important meetings or events",
          "Communication skills are enhanced",
          "If trying to conceive, this is your fertile window",
        ]
      case "Luteal Phase":
        return [
          "Practice self-care as PMS symptoms may appear",
          "Focus on completing existing projects",
          "Reduce caffeine and sugar to minimize mood swings",
          "Get plenty of sleep and rest",
        ]
      case "Expected Period":
        return [
          "Prepare menstrual products",
          "Plan for rest and self-care",
          "Stay hydrated and eat nutritious foods",
          "Have pain relief medication ready if needed",
        ]
      default:
        return []
    }
  }

  return (
    <Card className="border-2 border-pink-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950 rounded-t-lg">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-pink-500 mr-2" />
          <CardTitle>Period Tracker</CardTitle>
        </div>
        <CardDescription>Track your cycle and understand your body better</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {!showResults ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="last-period">When did your last period start?</Label>
              <Input
                id="last-period"
                type="date"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                className="border-pink-200 focus:border-pink-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="cycle-length">Cycle Length (days): {cycleLength}</Label>
                <span className="text-sm text-muted-foreground">Average: 28 days</span>
              </div>
              <Slider
                id="cycle-length"
                min={21}
                max={35}
                step={1}
                value={[cycleLength]}
                onValueChange={(value) => setCycleLength(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="period-length">Period Length (days): {periodLength}</Label>
                <span className="text-sm text-muted-foreground">Average: 5 days</span>
              </div>
              <Slider
                id="period-length"
                min={2}
                max={10}
                step={1}
                value={[periodLength]}
                onValueChange={(value) => setPeriodLength(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label>Common Symptoms</Label>
              <div className="grid grid-cols-2 gap-2">
                {commonSymptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Switch
                      id={`symptom-${index}`}
                      checked={symptoms.includes(symptom)}
                      onCheckedChange={() => toggleSymptom(symptom)}
                    />
                    <Label htmlFor={`symptom-${index}`}>{symptom}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={calculateCycle}
              disabled={!lastPeriod}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              Calculate My Cycle
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">Your Cycle Information</h3>
              <p className="text-muted-foreground">Based on a {cycleLength}-day cycle</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-pink-50 dark:bg-pink-950/30">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-pink-500 mr-2" />
                  <h4 className="font-medium">Next Period</h4>
                </div>
                <p className="text-2xl font-bold text-pink-600">{nextPeriod}</p>
                <p className="text-sm text-muted-foreground mt-1">Mark your calendar!</p>
              </div>

              <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/30">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-green-500 mr-2" />
                  <h4 className="font-medium">Fertile Window</h4>
                </div>
                <p className="text-lg font-bold text-green-600">
                  {fertileWindow.start} - {fertileWindow.end}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Higher chance of conception during this time</p>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30">
              <div className="flex items-center mb-4">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-r ${getPhaseColor()} flex items-center justify-center text-white`}
                >
                  <Clock className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-lg">Current Phase: {currentPhase}</h4>
                  <p className="text-sm text-muted-foreground">Day {phaseDay}</p>
                </div>
              </div>

              <Progress value={phaseProgress} className="h-2 mb-4" />

              <p className="mb-4">{getPhaseDescription()}</p>

              <div className="space-y-2">
                <h5 className="font-medium">Recommendations:</h5>
                <ul className="space-y-1">
                  {getPhaseRecommendations().map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {symptoms.length > 0 && (
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Your Tracked Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={() => setShowResults(false)} variant="outline" className="flex-1">
                Edit Information
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Save This Cycle
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

// Health Quiz Component
const HealthQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)

  const questions = [
    {
      question: "How often should you change your sanitary pad during your period?",
      options: [
        "Once a day",
        "Every 3-4 hours or when it's full",
        "Only when it feels uncomfortable",
        "Every 12 hours",
      ],
      correctAnswer: 1,
      explanation:
        "Sanitary pads should be changed every 3-4 hours or when they become full to maintain hygiene and prevent infections.",
    },
    {
      question: "Which of these is NOT a sign of a healthy menstrual cycle?",
      options: [
        "Regular periods",
        "Severe pain that interferes with daily activities",
        "Moderate flow that lasts 3-7 days",
        "Some mild cramping",
      ],
      correctAnswer: 1,
      explanation:
        "While mild discomfort is normal, severe pain that interferes with daily activities is not typical and may indicate conditions like endometriosis or fibroids.",
    },
    {
      question: "What is the best way to clean the genital area?",
      options: [
        "With strong soap and hot water",
        "Using vaginal douches regularly",
        "With mild soap and water on the external area only",
        "With antibacterial wipes several times a day",
      ],
      correctAnswer: 2,
      explanation:
        "The genital area should be cleaned with mild soap and water on the external areas only. The vagina is self-cleaning and douching can disrupt the natural balance.",
    },
    {
      question: "Which of these foods can help with menstrual cramps?",
      options: ["Sugary snacks", "Caffeinated drinks", "Salty processed foods", "Foods rich in omega-3 fatty acids"],
      correctAnswer: 3,
      explanation:
        "Foods rich in omega-3 fatty acids (like fish, walnuts, and flaxseeds) have anti-inflammatory properties that can help reduce menstrual cramps.",
    },
    {
      question: "What is NOT a sign that you should see a doctor about your period?",
      options: [
        "Bleeding through a pad/tampon every hour for several hours",
        "Severe pain that doesn't improve with over-the-counter medication",
        "A regular cycle that varies by a few days each month",
        "Passing large blood clots",
      ],
      correctAnswer: 2,
      explanation:
        "It's normal for periods to vary by a few days each month. The other options are signs that warrant medical attention.",
    },
  ]

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setShowResults(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "Excellent! You have a great understanding of menstrual health."
    if (percentage >= 60) return "Good job! You know the basics, but there's still more to learn."
    return "Keep learning! Understanding your body is an important part of staying healthy."
  }

  return (
    <Card className="border-2 border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950 dark:to-indigo-950 rounded-t-lg">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-purple-500 mr-2" />
          <CardTitle>Health Knowledge Quiz</CardTitle>
        </div>
        <CardDescription>Test your knowledge about menstrual and reproductive health</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {!showResults ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Score: {score}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-3 px-4 ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950/30"
                          : "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/30"
                        : "hover:bg-purple-50 dark:hover:bg-purple-950/30"
                    }`}
                    onClick={() => selectedAnswer === null && handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full border flex items-center justify-center mr-3">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>

                      {selectedAnswer === index &&
                        (index === questions[currentQuestion].correctAnswer ? (
                          <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                        ) : (
                          <Frown className="ml-auto h-5 w-5 text-red-500" />
                        ))}
                    </div>
                  </Button>
                ))}
              </div>

              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    isCorrect
                      ? "bg-green-50 border border-green-200 text-green-700 dark:bg-green-950/30"
                      : "bg-red-50 border border-red-200 text-red-700 dark:bg-red-950/30"
                  }`}
                >
                  <div className="flex items-start">
                    {isCorrect ? (
                      <ThumbsUp className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{isCorrect ? "Correct!" : "Not quite right"}</p>
                      <p className="text-sm mt-1">{questions[currentQuestion].explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center"
          >
            <div>
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-900 mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">Quiz Complete!</h3>
              <p className="text-muted-foreground">
                You scored {score} out of {questions.length}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
              <p className="font-medium">{getScoreMessage()}</p>
            </div>

            <div className="space-y-2">
              <Button
                onClick={resetQuiz}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
              >
                Take Quiz Again
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="#resources">Explore Health Resources</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

// Wellness Diary Component
const WellnessDiary = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "2025-04-15",
      mood: "happy",
      symptoms: ["Mild cramps", "Fatigue"],
      notes: "Feeling good overall. Took a walk in the morning which helped with the cramps.",
      sleep: 7,
      water: 6,
      exercise: true,
    },
    {
      id: 2,
      date: "2025-04-14",
      mood: "neutral",
      symptoms: ["Headache", "Bloating"],
      notes: "Busy day at school. Headache started in the afternoon.",
      sleep: 6,
      water: 4,
      exercise: false,
    },
  ])

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    mood: "neutral",
    symptoms: [],
    notes: "",
    sleep: 7,
    water: 4,
    exercise: false,
  })

  const [showForm, setShowForm] = useState(false)

  const moodOptions = [
    { value: "happy", label: "Happy", icon: <Smile className="h-5 w-5 text-green-500" /> },
    { value: "neutral", label: "Neutral", icon: <Meh className="h-5 w-5 text-blue-500" /> },
    { value: "sad", label: "Sad", icon: <Frown className="h-5 w-5 text-purple-500" /> },
  ]

  const symptomOptions = [
    "Cramps",
    "Headache",
    "Bloating",
    "Fatigue",
    "Mood swings",
    "Breast tenderness",
    "Backache",
    "Acne",
    "Nausea",
    "Dizziness",
    "Cravings",
  ]

  const handleAddEntry = () => {
    const entryWithId = {
      ...newEntry,
      id: Date.now(),
    }

    setEntries([entryWithId, ...entries])
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      mood: "neutral",
      symptoms: [],
      notes: "",
      sleep: 7,
      water: 4,
      exercise: false,
    })
    setShowForm(false)
  }

  const toggleSymptom = (symptom) => {
    if (newEntry.symptoms.includes(symptom)) {
      setNewEntry({
        ...newEntry,
        symptoms: newEntry.symptoms.filter((s) => s !== symptom),
      })
    } else {
      setNewEntry({
        ...newEntry,
        symptoms: [...newEntry.symptoms, symptom],
      })
    }
  }

  const getMoodIcon = (mood) => {
    const option = moodOptions.find((m) => m.value === mood)
    return option ? option.icon : null
  }

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 rounded-t-lg">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
          <CardTitle>Wellness Diary</CardTitle>
        </div>
        <CardDescription>Track your daily health and wellbeing</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Your Entries</h3>

          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Entry
          </Button>
        </div>

        {showForm ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 mb-6 bg-blue-50 dark:bg-blue-950/30"
          >
            <h4 className="font-medium mb-4">New Diary Entry</h4>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entry-date">Date</Label>
                  <Input
                    id="entry-date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mood</Label>
                  <div className="flex gap-2">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood.value}
                        type="button"
                        variant={newEntry.mood === mood.value ? "default" : "outline"}
                        className={`flex-1 ${newEntry.mood === mood.value ? "bg-blue-500 text-white" : ""}`}
                        onClick={() => setNewEntry({ ...newEntry, mood: mood.value })}
                      >
                        {mood.icon}
                        <span className="ml-2">{mood.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Symptoms (if any)</Label>
                <div className="flex flex-wrap gap-2">
                  {symptomOptions.map((symptom, index) => (
                    <Badge
                      key={index}
                      variant={newEntry.symptoms.includes(symptom) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        newEntry.symptoms.includes(symptom)
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "hover:bg-blue-100 dark:hover:bg-blue-900"
                      }`}
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sleep">Hours of Sleep</Label>
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 text-blue-500 mr-2" />
                    <Slider
                      id="sleep"
                      min={0}
                      max={12}
                      step={0.5}
                      value={[newEntry.sleep]}
                      onValueChange={(value) => setNewEntry({ ...newEntry, sleep: value[0] })}
                    />
                    <span className="ml-2 min-w-[2rem] text-center">{newEntry.sleep}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water">Glasses of Water</Label>
                  <div className="flex items-center">
                    <Droplet className="h-4 w-4 text-blue-500 mr-2" />
                    <Slider
                      id="water"
                      min={0}
                      max={12}
                      step={1}
                      value={[newEntry.water]}
                      onValueChange={(value) => setNewEntry({ ...newEntry, water: value[0] })}
                    />
                    <span className="ml-2 min-w-[2rem] text-center">{newEntry.water}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise">Exercise Today?</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="exercise"
                      checked={newEntry.exercise}
                      onCheckedChange={(checked) => setNewEntry({ ...newEntry, exercise: checked })}
                    />
                    <Label htmlFor="exercise">{newEntry.exercise ? "Yes" : "No"}</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="How are you feeling today? Any other observations?"
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  onClick={handleAddEntry}
                >
                  Save Entry
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No entries yet. Start tracking your wellness journey!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-blue-950/10 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Moon className="h-3 w-3 mr-1" /> {entry.sleep}h sleep
                        <Droplet className="h-3 w-3 ml-3 mr-1" /> {entry.water} glasses
                        {entry.exercise && <Activity className="h-3 w-3 ml-3 mr-1" />}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {entry.symptoms.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {entry.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {entry.notes && (
                  <div className="mt-3 text-sm">
                    <p>{entry.notes}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function HealthHygiene() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])
  
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState("menstrual")
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "Hello! I'm your health assistant. How can I help you today?" }
  ])
  const [messageInput, setMessageInput] = useState("")
  const chatEndRef = useRef(null)
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    
    // Add user message
    setChatMessages([...chatMessages, { role: "user", content: messageInput }])
    
    // Simulate response based on keywords
    setTimeout(() => {
      let response = "I'm not sure about that. Could you provide more details?"
      
      const lowercaseInput = messageInput.toLowerCase()
      
      if (lowercaseInput.includes("period") || lowercaseInput.includes("menstrual")) {
        response = "Periods typically last 3-7 days and occur every 21-35 days. If you're experiencing irregular periods, severe pain, or very heavy bleeding, it's a good idea to consult a healthcare provider."
      } else if (lowercaseInput.includes("pain") || lowercaseInput.includes("cramp")) {
        response = "For menstrual cramps, you can try: 1) Applying a heating pad to your lower abdomen, 2) Taking over-the-counter pain relievers like ibuprofen, 3) Light exercise like walking or yoga, 4) Drinking herbal teas like ginger or chamomile."
      } else if (lowercaseInput.includes("pregnant") || lowercaseInput.includes("pregnancy")) {
        response = "If you think you might be pregnant, it's important to take a pregnancy test and consult with a healthcare provider as soon as possible for proper care and guidance."
      } else if (lowercaseInput.includes("hygiene")) {
        response = "Good menstrual hygiene practices include: 1) Changing pads/tampons every 3-4 hours, 2) Washing hands before and after changing products, 3) Using clean products and storing them in a clean place, 4) Bathing daily with mild soap and water."
      }
      
      setChatMessages(prev => [...prev, { role: "system", content: response }])
    }, 1000)
    
    setMessageInput("")
  }
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])
  
  const healthTips = [
    {
      title: "Stay Hydrated",
      description: "Drink 8-10 glasses of water daily, especially during your period to reduce bloating and cramps.",
      icon: <Droplet className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Balanced Diet",
      description: "Eat iron-rich foods during your period to replace lost iron. Include leafy greens, beans, and nuts.",
      icon: <Apple className="h-8 w-8 text-green-500" />
    },
    {
      title: "Regular Exercise",
      description: "Light exercise like walking or yoga can help reduce period pain and improve mood.",
      icon: <Activity className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Proper Sleep",
      description: "Aim for 7-9 hours of sleep. Good sleep helps regulate hormones and reduces stress.",
      icon: <Moon className="h-8 w-8 text-purple-500" />
    }
  ]
  
  const testimonials = [
    {
      quote: "The period tracker helped me understand my cycle better. Now I can plan activities around my period days.",
      name: "Priya, 17",
      location: "Rajasthan"
    },
    {
      quote: "I learned so much from the health resources. The myths vs facts section cleared many misconceptions I had.",
      name: "Meena, 15",
      location: "Bihar"
    },
    {
      quote: "The community forum helped me realize I'm not alone in my experiences. It's comforting to share with others.",
      name: "Lakshmi, 16",
      location: "Tamil Nadu"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-pink-300 rounded-full opacity-20 animate-float" />
            <div className="absolute top-40 -right-20 w-80 h-80 bg-purple-300 rounded-full opacity-20 animate-float-delay-1" />
            <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-pink-300 rounded-full opacity-20 animate-float-delay-2" />
          </div>
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            ref={containerRef}
            style={{ opacity, scale }}
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge
                  className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-pink-600 border-pink-200 shadow-sm"
                  variant="outline"
                >
                  Health & Hygiene
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600"
              >
                Empowering Health Knowledge
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="max-w-[600px] text-muted-foreground md:text-xl"
              >
                Access reliable information about menstrual hygiene, reproductive health, and general wellness designed specifically for rural girls.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-200/50 dark:shadow-none"
                  onClick={() => {
                    document.getElementById("resources").scrollIntoView({ behavior: "smooth" })
                    setActiveTab("menstrual")
                  }}
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Explore Resources
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gradient-border"
                  onClick={() => {
                    document.getElementById("community").scrollIntoView({ behavior: "smooth" })
                    setActiveTab("community")
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Join Community
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Health education for rural girls"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent" />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 p-4 rounded-lg shadow-lg backdrop-blur-sm"
              >
                <h3 className="font-medium text-pink-600 dark:text-pink-400">Did you know?</h3>
                <p className="text-sm">Menstruation is a natural biological process. Understanding it helps you take better care of your body and health.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Health Tips */}
      <section className="w-full py-8 bg-white dark:bg-gray-950 border-y border-pink-100 dark:border-pink-900/20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {healthTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="h-12 w-12 rounded-full bg-pink-50 dark:bg-pink-950/50 flex items-center justify-center shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-medium">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="resources" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="menstrual" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                Menstrual Hygiene
              </TabsTrigger>
              <TabsTrigger value="reproductive" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                Reproductive Health
              </TabsTrigger>
              <TabsTrigger value="community" id="community" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                Community Forum
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                Health Services
              </TabsTrigger>
            </TabsList>

            {/* Menstrual Hygiene */}
            <TabsContent value="menstrual">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold tracking-tight">Menstrual Hygiene</h2>
                  <p className="text-muted-foreground">
                    Learn about menstrual health, hygiene practices, and managing your period with confidence.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Understanding Your Period",
                          description: "Learn about the menstrual cycle, what's normal, and what to expect each month.",
                          icon: <Calendar className="h-8 w-8 text-pink-500" />,
                          type: "Article",
                          readTime: "10 min read",
                          link: "#understanding-period"
                        },
                        {
                          title: "Menstrual Products Guide",
                          description:
                            "Explore different menstrual products, their benefits, costs, and how to use them properly.",
                          icon: <ShoppingBag className="h-8 w-8 text-pink-500" />,
                          type: "Guide",
                          readTime: "15 min read",
                          link: "#menstrual-products"
                        },
                        {
                          title: "Managing Period Pain",
                          description: "Learn about causes of period pain and simple remedies to help manage discomfort.",
                          icon: <Heart className="h-8 w-8 text-pink-500" />,
                          type: "Article",
                          readTime: "8 min read",
                          link: "#period-pain"
                        },
                        {
                          title: "Menstrual Hygiene Basics",
                          description:
                            "Essential hygiene practices during your period to stay clean and prevent infections.",
                          icon: <Shield className="h-8 w-8 text-pink-500" />,
                          type: "Video",
                          readTime: "5 min watch",
                          link: "#hygiene-basics"
                        },
                      ].map((resource, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="h-full border-pink-200 hover:border-pink-400 transition-colors">
                            <CardHeader>
                              <div className="mb-2">{resource.icon}</div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                                    {resource.type}
                                  </Badge>
                                  <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                                    {resource.readTime}
                                  </Badge>
                                </div>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{resource.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="link" asChild className="px-0 text-pink-600">
                                <Link href={resource.link}>
                                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <PeriodTracker />
                    </div>
                    
                    <div className="mt-8">
                      <Card className="border-pink-200">
                        <CardHeader>
                          <CardTitle>Interactive Learning</CardTitle>
                          <CardDescription>Videos and interactive content to learn about menstrual hygiene</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                              {
                                title: "Understanding Your Menstrual Cycle",
                                description: "An animated explanation of the menstrual cycle and how it works.",
                                duration: "4:30",
                                thumbnail: "/placeholder.svg?height=150&width=300",
                              },
                              {
                                title: "How to Use Different Menstrual Products",
                                description: "A practical guide to using pads, tampons, menstrual cups, and cloth pads.",
                                duration: "6:15",
                                thumbnail: "/placeholder.svg?height=150&width=300",
                              },
                            ].map((video, index) => (
                              <motion.div 
                                key={index} 
                                className="relative group"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="relative h-[150px] w-full rounded-lg overflow-hidden">
                                  <Image
                                    src={video.thumbnail || "/placeholder.svg"}
                                    alt={video.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                    <motion.div 
                                      className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Play className="h-6 w-6 text-pink-500" />
                                    </motion.div>
                                  </div>
                                </div>
                                <h3 className="font-medium mt-2">{video.title}</h3>
                                <p className="text-sm text-muted-foreground">{video.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{video.duration}</p>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                            <Link href="#">View All Videos</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <HealthQuiz />
                    
                    <Card className="border-pink-200">
                      <CardHeader>
                        <CardTitle>Myth vs. Fact</CardTitle>
                        <CardDescription>Common misconceptions about menstruation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              myth: "Women should not bathe during their period.",
                              fact: "Bathing during menstruation is not only safe but recommended for hygiene and comfort.",
                            },
                            {
                              myth: "Menstrual blood is impure.",
                              fact: "Menstrual blood is a natural bodily fluid and is not dirty or impure.",
                            },
                            {
                              myth: "Women should avoid certain foods during their period.",
                              fact: "There are no scientific restrictions on food during menstruation. Eating a balanced diet is beneficial.",
                            },
                          ].map((item, index) => (
                            <motion.div 
                              key={index} 
                              className="border rounded-lg p-4"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <div className="flex items-start gap-2">
                                <Badge variant="destructive" className="mt-0.5">
                                  Myth
                                </Badge>
                                <p>{item.myth}</p>
                              </div>
                              <div className="flex items-start gap-2 mt-2">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-0.5">
                                  Fact
                                </Badge>
                                <p>{item.fact}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                          <Link href="#">View All Myths & Facts</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-pink-200">
                      <CardHeader>
                        <CardTitle>Downloadable Resources</CardTitle>
                        <CardDescription>Materials you can save for offline use</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Menstrual Health Guide",
                              format: "PDF",
                              size: "2.4 MB",
                              languages: ["English", "Hindi", "Tamil"],
                            },
                            {
                              title: "Period Tracking Calendar",
                              format: "PDF",
                              size: "1.2 MB",
                              languages: ["English", "Hindi", "Marathi"],
                            },
                          ].map((resource, index) => (
                            <motion.div 
                              key={index} 
                              className="flex justify-between items-center p-3 border rounded-lg"
                              whileHover={{ backgroundColor: "rgba(249, 168, 212, 0.1)" }}
                            >
                              <div>
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {resource.format} • {resource.size}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {resource.languages.map((lang, langIndex) => (
                                    <Badge key={langIndex} variant="outline" className="text-xs">
                                      {lang}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" /> Download
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reproductive Health */}
            <TabsContent value="reproductive">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold tracking-tight">Reproductive Health</h2>
                  <p className="text-muted-foreground">
                    Essential information about reproductive health, puberty, and personal wellbeing.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Understanding Puberty",
                          description:
                            "Learn about the physical and emotional changes during puberty and how to navigate them.",
                          icon: <User className="h-8 w-8 text-purple-500" />,
                          type: "Guide",
                          readTime: "12 min read",
                        },
                        {
                          title: "Reproductive System Basics",
                          description: "An educational overview of female reproductive anatomy and how it functions.",
                          icon: <Heart className="h-8 w-8 text-purple-500" />,
                          type: "Article",
                          readTime: "15 min read",
                        },
                        {
                          title: "Personal Hygiene Practices",
                          description:
                            "Essential hygiene practices for maintaining reproductive health and preventing infections.",
                          icon: <Shield className="h-8 w-8 text-purple-500" />,
                          type: "Checklist",
                          readTime: "8 min read",
                        },
                        {
                          title: "Nutrition for Women's Health",
                          description:
                            "Learn about important nutrients for women's health and how to include them in your diet.",
                          icon: <Apple className="h-8 w-8 text-purple-500" />,
                          type: "Article",
                          readTime: "10 min read",
                        },
                      ].map((resource, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="h-full border-purple-200 hover:border-purple-400 transition-colors">
                            <CardHeader>
                              <div className="mb-2">{resource.icon}</div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    {resource.type}
                                  </Badge>
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    {resource.readTime}
                                  </Badge>
                                </div>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{resource.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="link" asChild className="px-0 text-purple-600">
                                <Link href="#">
                                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <WellnessDiary />
                    </div>
                    
                    <div className="mt-8">
                      <Card className="border-purple-200">
                        <CardHeader>
                          <CardTitle>Body Changes During Puberty</CardTitle>
                          <CardDescription>Understanding what happens during this important phase</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <h3 className="font-medium text-lg">Physical Changes</h3>
                                <ul className="space-y-2">
                                  {[
                                    "Breast development",
                                    "Growth of pubic and underarm hair",
                                    "Body shape changes - wider hips, narrower waist",
                                    "Height increase (growth spurt)",
                                    "Skin changes (may include acne)",
                                    "Beginning of menstruation"
                                  ].map((change, index) => (
                                    <motion.li 
                                      key={index} 
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: index * 0.1 }}
                                      viewport={{ once: true }}
                                    >
                                      <CheckCircle className="h-5 w-5 mr-2 text-purple-500 shrink-0" />
                                      <span>{change}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="space-y-4">
                                <h3 className="font-medium text-lg">Emotional Changes</h3>
                                <ul className="space-y-2">
                                  {[
                                    "Mood swings",
                                    "New feelings and emotions",
                                    "Interest in identity and independence",
                                    "Increased awareness of body image",
                                    "Changes in relationships with family and friends",
                                    "Developing romantic interests"
                                  ].map((change, index) => (
                                    <motion.li 
                                      key={index} 
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: index * 0.1 }}
                                      viewport={{ once: true }}
                                    >
                                      <CheckCircle className="h-5 w-5 mr-2 text-purple-500 shrink-0" />
                                      <span>{change}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                              <h3 className="font-medium mb-2">Remember:</h3>
                              <p>These changes are completely normal and happen to everyone. Each person's body develops at its own pace - there's no "right" timeline.</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                            <Link href="#">Learn More About Puberty</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="border-purple-200">
                      <CardHeader>
                        <CardTitle>When to See a Doctor</CardTitle>
                        <CardDescription>Signs that you should consult a healthcare provider</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            "Very heavy bleeding (soaking through a pad/tampon every hour for several hours)",
                            "Severe pain that doesn't improve with over-the-counter medication",
                            "Periods that last longer than 7 days",
                            "Irregular periods (after they've been regular)",
                            "No period by age 16 or no period for 3+ months after they've started",
                            "Unusual discharge with strong odor or itching",
                            "Severe acne or excessive hair growth"
                          ].map((sign, index) => (
                            <motion.div 
                              key={index} 
                              className="flex items-start p-3 border rounded-lg"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <AlertCircle className="h-5 w-5 mr-2 text-red-500 shrink-0" />
                              <p>{sign}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                          <Link href="#services">Find Healthcare Services</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-purple-200">
                      <CardHeader>
                        <CardTitle>Nutrition for Women's Health</CardTitle>
                        <CardDescription>Important nutrients for different phases</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              phase: "During Menstruation",
                              nutrients: [
                                "Iron-rich foods (leafy greens, beans, meat)",
                                "Omega-3 fatty acids (fish, flaxseeds)",
                                "Calcium (dairy, fortified plant milks)",
                                "Water (stay hydrated)"
                              ]
                            },
                            {
                              phase: "For Overall Reproductive Health",
                              nutrients: [
                                "Folate (leafy greens, citrus fruits)",
                                "Vitamin D (sunlight, fortified foods)",
                                "Protein (beans, lentils, eggs, meat)",
                                "Antioxidants (colorful fruits and vegetables)"
                              ]
                            }
                          ].map((item, index) => (
                            <motion.div 
                              key={index} 
                              className="border rounded-lg p-4"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <h4 className="font-medium mb-2">{item.phase}</h4>
                              <ul className="space-y-1">
                                {item.nutrients.map((nutrient, nIndex) => (
                                  <li key={nIndex} className="flex items-start">
                                    <Apple className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                                    <span className="text-sm">{nutrient}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200">
                      <CardHeader>
                        <CardTitle>Ask a Question</CardTitle>
                        <CardDescription>Submit your health questions anonymously</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Type your question here..." 
                            className="min-h-[100px] border-purple-200 focus:border-purple-500"
                          />
                          <div className="flex items-center">
                            <Switch id="anonymous" defaultChecked />
                            <Label htmlFor="anonymous" className="ml-2">Keep my question anonymous</Label>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                          <Send className="mr-2 h-4 w-4" /> Submit Question
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Community Forum */}
            <TabsContent value="community">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold tracking-tight">Community Forum</h2>
                  <p className="text-muted-foreground">
                    Join discussions with other girls and women about health topics in a safe, supportive environment.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="border-teal-200">
                      <CardHeader>
                        <CardTitle>Popular Discussions</CardTitle>
                        <CardDescription>Join conversations on topics that matter to you</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              title: "How do you manage period pain?",
                              author: "Priya, 17",
                              replies: 24,
                              views: 156,
                              lastActive: "2 hours ago",
                              tags: ["Period Pain", "Self Care"]
                            },
                            {
                              title: "Affordable menstrual products in rural areas",
                              author: "Meena, 22",
                              replies: 18,
                              views: 103,
                              lastActive: "1 day ago",
                              tags: ["Products", "Affordability"]
                            },
                            {
                              title: "Talking to parents about reproductive health",
                              author: "Anjali, 16",
                              replies: 32,
                              views: 210,
                              lastActive: "5 hours ago",
                              tags: ["Family", "Communication"]
                            },
                            {
                              title: "Dealing with period stigma at school",
                              author: "Lakshmi, 15",
                              replies: 27,
                              views: 189,
                              lastActive: "3 hours ago",
                              tags: ["School", "Stigma"]
                            },
                            {
                              title: "Natural remedies for menstrual cramps",
                              author: "Sunita, 19",
                              replies: 21,
                              views: 142,
                              lastActive: "12 hours ago",
                              tags: ["Natural Remedies", "Period Pain"]
                            },
                          ].map((discussion, index) => (
                            <motion.div 
                              key={index} 
                              className="border rounded-lg p-4 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium hover:text-teal-600 transition-colors">
                                    <Link href="#">{discussion.title}</Link>
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">Started by {discussion.author}</p>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {discussion.tags.map((tag, tagIndex) => (
                                      <Badge key={tagIndex} variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right text-sm text-muted-foreground">
                                  <p>{discussion.replies} replies</p>
                                  <p>{discussion.views} views</p>
                                  <p>Active {discussion.lastActive}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href="#">Browse All Topics</Link>
                        </Button>
                        <Button asChild className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600">
                          <Link href="#">Start New Discussion</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <div className="mt-8">
                      <Card className="border-teal-200">
                        <CardHeader>
                          <CardTitle>Live Chat</CardTitle>
                          <CardDescription>Chat with community members in real-time</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="border rounded-lg h-[300px] flex flex-col">
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                              {chatMessages.map((message, index) => (
                                <div 
                                  key={index} 
                                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                  <div 
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                      message.role === "user" 
                                        ? "bg-teal-500 text-white" 
                                        : "bg-muted"
                                    }`}
                                  >
                                    <p>{message.content}</p>
                                  </div>
                                </div>
                              ))}
                              <div ref={chatEndRef} />
                            </div>
                            <div className="border-t p-3 flex gap-2">
                              <Input 
                                placeholder="Type your message..." 
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                className="flex-1"
                              />
                              <Button 
                                onClick={handleSendMessage}
                                className="bg-teal-500 hover:bg-teal-600"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-teal-200">
                      <CardHeader>
                        <CardTitle>Community Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {[
                            "Be respectful and supportive of others",
                            "Maintain privacy - don't share personal details",
                            "Ask questions freely without fear of judgment",
                            "Report inappropriate content to moderators",
                            "Share accurate information and cite sources when possible",
                          ].map((guideline, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <CheckCircle className="h-5 w-5 mr-2 text-teal-500 shrink-0" />
                              <span>{guideline}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-teal-200">
                      <CardHeader>
                        <CardTitle>Ask a Health Mentor</CardTitle>
                        <CardDescription>Get answers from trained health educators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Have a question you'd prefer to ask privately? Our health mentors can help.
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden">
                              <Image
                                src="/placeholder.svg?height=100&width=100"
                                alt="Health Mentor"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">Dr. Sharma</h4>
                              <p className="text-sm text-muted-foreground">Women's Health Specialist</p>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                            onClick={() => setShowChatbot(true)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" /> Ask a Question
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-teal-200">
                      <CardHeader>
                        <CardTitle>Upcoming Events</CardTitle>
                        <CardDescription>Join virtual and local health events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Menstrual Health Workshop",
                              date: "May 15, 2025",
                              time: "3:00 PM - 4:30 PM",
                              type: "Virtual",
                              attendees: 42
                            },
                            {
                              title: "Q&A with Gynecologist",
                              date: "May 22, 2025",
                              time: "5:00 PM - 6:00 PM",
                              type: "Virtual",
                              attendees: 78
                            },
                            {
                              title: "Reproductive Health Awareness Day",
                              date: "June 5, 2025",
                              time: "10:00 AM - 4:00 PM",
                              type: "In-person (Multiple Locations)",
                              attendees: 156
                            }
                          ].map((event, index) => (
                            <motion.div 
                              key={index} 
                              className="border rounded-lg p-3"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
                            >
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Calendar className="h-3 w-3 mr-1" /> {event.date}
                                <Clock className="h-3 w-3 ml-3 mr-1" /> {event.time}
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                                  {event.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View All Events
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Health Services */}
            <TabsContent value="services">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold tracking-tight">Health Services</h2>
                  <p className="text-muted-foreground">
                    Connect with healthcare providers and access health services in your area.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="border-blue-200">
                      <CardHeader>
                        <CardTitle>Telemedicine Services</CardTitle>
                        <CardDescription>
                          Consult with healthcare professionals remotely through video or phone calls
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              name: "Women's Health Teleconsultation",
                              description:
                                "Speak with gynecologists and women's health specialists about reproductive health concerns.",
                              cost: "Free / Subsidized",
                              availability: "Mon-Sat, 9 AM - 5 PM",
                            },
                            {
                              name: "Mental Health Support",
                              description:
                                "Connect with counselors to discuss emotional wellbeing, stress, and mental health.",
                              cost: "Free",
                              availability: "24/7",
                            },
                            {
                              name: "General Health Consultation",
                              description:
                                "Consult with doctors about general health concerns and get basic medical advice.",
                              cost: "Free / Subsidized",
                              availability: "Mon-Sun, 8 AM - 8 PM",
                            },
                          ].map((service, index) => (
                            <motion.div 
                              key={index} 
                              className="border rounded-lg p-4"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                            >
                              <h3 className="font-medium">{service.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                              <div className="flex justify-between mt-2 text-sm">
                                <span>
                                  <strong>Cost:</strong> {service.cost}
                                </span>
                                <span>
                                  <strong>Available:</strong> {service.availability}
                                </span>
                              </div>
                              <Button className="mt-3 bg-gradient-to-r from-blue-500 to-purple-500">
                                Learn More
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
