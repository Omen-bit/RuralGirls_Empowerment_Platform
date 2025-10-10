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
  const [nextPeriod, setNextPeriod] = useState("")
  const [currentPhase, setCurrentPhase] = useState("")
  const [daysUntilNext, setDaysUntilNext] = useState(0)

  const phases = [
    { name: "Menstrual Phase", days: "1-5", color: "bg-red-500" },
    { name: "Follicular Phase", days: "1-13", color: "bg-yellow-500" },
    { name: "Ovulation Phase", days: "14", color: "bg-green-500" },
    { name: "Luteal Phase", days: "15-28", color: "bg-blue-500" },
  ]

  const calculateCycle = () => {
    if (!lastPeriod) return

    const lastDate = new Date(lastPeriod)
    const today = new Date()
    const daysSinceLast = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24))
    const nextPeriodDate = new Date(lastDate)
    nextPeriodDate.setDate(lastDate.getDate() + cycleLength)
    
    setNextPeriod(nextPeriodDate.toISOString().split('T')[0])
    setDaysUntilNext(Math.floor((nextPeriodDate - today) / (1000 * 60 * 60 * 24)))

    // Determine current phase
    const cycleDay = (daysSinceLast % cycleLength) + 1
    if (cycleDay <= periodLength) {
      setCurrentPhase("Menstrual Phase")
    } else if (cycleDay <= 13) {
      setCurrentPhase("Follicular Phase")
    } else if (cycleDay === 14) {
      setCurrentPhase("Ovulation Phase")
    } else {
      setCurrentPhase("Luteal Phase")
    }
  }

  useEffect(() => {
    calculateCycle()
  }, [lastPeriod, cycleLength, periodLength])

  return (
    <Card className="border-2 border-pink-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-pink-600" />
          Period Tracker
        </CardTitle>
        <CardDescription>
          Track your menstrual cycle and get personalized insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="lastPeriod">Last Period Date</Label>
            <Input
              id="lastPeriod"
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="cycleLength">Cycle Length (days)</Label>
            <Input
              id="cycleLength"
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              min="21"
              max="35"
            />
          </div>
          <div>
            <Label htmlFor="periodLength">Period Length (days)</Label>
            <Input
              id="periodLength"
              type="number"
              value={periodLength}
              onChange={(e) => setPeriodLength(Number(e.target.value))}
              min="3"
              max="7"
            />
          </div>
        </div>

        {lastPeriod && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-800 mb-2">📅 Next Period</h4>
                <p className="text-pink-700 font-medium">{nextPeriod}</p>
                <p className="text-sm text-pink-600">
                  {daysUntilNext > 0 ? `In ${daysUntilNext} days` : "Expected soon"}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">🌙 Current Phase</h4>
                <p className="text-purple-700 font-medium">{currentPhase}</p>
              </div>
            </div>

            {/* Detailed Phase Information */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">📚 What to Expect During {currentPhase}</h4>
              
              {currentPhase === "Menstrual Phase" && (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700"><strong>What's happening:</strong> Your body is shedding the uterine lining</p>
                  <p className="text-sm text-blue-700"><strong>Duration:</strong> Usually 3-7 days</p>
                  <p className="text-sm text-blue-700"><strong>What you might feel:</strong> Cramps, fatigue, mood changes</p>
                  <p className="text-sm text-blue-700"><strong>Self-care tips:</strong> Use heat pads, drink warm water, rest when needed</p>
                  <p className="text-sm text-blue-700"><strong>Foods to eat:</strong> Iron-rich foods like spinach, jaggery, dates</p>
                </div>
              )}

              {currentPhase === "Follicular Phase" && (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700"><strong>What's happening:</strong> Your body is preparing for ovulation</p>
                  <p className="text-sm text-blue-700"><strong>Duration:</strong> About 13 days from start of period</p>
                  <p className="text-sm text-blue-700"><strong>What you might feel:</strong> Increased energy, better mood</p>
                  <p className="text-sm text-blue-700"><strong>Best time for:</strong> Starting new activities, exercise, learning</p>
                  <p className="text-sm text-blue-700"><strong>Foods to eat:</strong> Fresh fruits, vegetables, whole grains</p>
                </div>
              )}

              {currentPhase === "Ovulation Phase" && (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700"><strong>What's happening:</strong> An egg is released from the ovary</p>
                  <p className="text-sm text-blue-700"><strong>Duration:</strong> Usually 1-2 days around day 14</p>
                  <p className="text-sm text-blue-700"><strong>What you might feel:</strong> Peak energy, confidence, social</p>
                  <p className="text-sm text-blue-700"><strong>Signs to watch:</strong> Slight temperature rise, clear discharge</p>
                  <p className="text-sm text-blue-700"><strong>Foods to eat:</strong> Antioxidant-rich foods, berries, nuts</p>
                </div>
              )}

              {currentPhase === "Luteal Phase" && (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700"><strong>What's happening:</strong> Body prepares for next cycle</p>
                  <p className="text-sm text-blue-700"><strong>Duration:</strong> About 14 days before next period</p>
                  <p className="text-sm text-blue-700"><strong>What you might feel:</strong> PMS symptoms, mood changes, cravings</p>
                  <p className="text-sm text-blue-700"><strong>Self-care tips:</strong> Gentle exercise, stress management, adequate sleep</p>
                  <p className="text-sm text-blue-700"><strong>Foods to eat:</strong> Complex carbs, magnesium-rich foods like bananas</p>
                </div>
              )}
            </div>

            {/* Cycle Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                <h5 className="font-semibold text-green-800 text-sm">💧 Hydration</h5>
                <p className="text-xs text-green-700 mt-1">Drink 8-10 glasses of water daily</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center">
                <h5 className="font-semibold text-orange-800 text-sm">🏃‍♀️ Exercise</h5>
                <p className="text-xs text-orange-700 mt-1">Light walking helps reduce cramps</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                <h5 className="font-semibold text-purple-800 text-sm">😴 Sleep</h5>
                <p className="text-xs text-purple-700 mt-1">Get 7-8 hours of quality sleep</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Menstrual Health Quiz Component with Gemini AI Integration
const MenstrualHealthQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [difficulty, setDifficulty] = useState<'basic' | 'intermediate' | 'advanced'>('basic')

  // Generate questions using Gemini AI
  const generateGeminiQuestions = async () => {
    setIsGenerating(true)
    try {
      // Simulate Gemini API call for now - replace with actual API integration
      const prompt = `Generate 5 multiple choice questions about menstrual health for rural girls in India. 
      Difficulty level: ${difficulty}
      Topics to cover: menstrual hygiene, nutrition during periods, myths vs facts, health symptoms, lifestyle during menstruation.
      
      Format each question as JSON with:
      - question: string
      - options: array of 4 strings
      - correct: number (0-3 index)
      - explanation: string
      - category: string
      
      Make questions culturally appropriate for rural Indian context.`

      // Fallback questions with enhanced content
      const enhancedQuestions = [
        {
          question: "In rural areas, what is the safest way to dispose of used sanitary pads?",
          options: ["Throw in open fields", "Burn safely in designated area", "Bury in backyard", "Throw in water bodies"],
          correct: 1,
          explanation: "Burning in a safe, designated area prevents contamination and is environmentally safer than other disposal methods.",
          category: "hygiene"
        },
        {
          question: "Which locally available food helps prevent anemia during periods?",
          options: ["White rice only", "Jaggery and green leafy vegetables", "Only dairy products", "Processed snacks"],
          correct: 1,
          explanation: "Jaggery is rich in iron and green leafy vegetables provide folate, both essential for preventing anemia.",
          category: "nutrition"
        },
        {
          question: "What should you do if periods suddenly become very irregular?",
          options: ["Ignore it completely", "Consult nearest health worker", "Only drink herbal tea", "Stop all activities"],
          correct: 1,
          explanation: "Sudden changes in menstrual patterns should be evaluated by a healthcare professional.",
          category: "health"
        },
        {
          question: "Is it true that girls become 'impure' during periods?",
          options: ["Yes, completely true", "No, this is a harmful myth", "Only partially true", "Depends on the family"],
          correct: 1,
          explanation: "Menstruation is a natural biological process. The concept of 'impurity' is a harmful myth that restricts girls' activities.",
          category: "myths"
        },
        {
          question: "What is the best way to track your menstrual cycle without apps?",
          options: ["Don't track at all", "Mark dates on calendar", "Only remember in mind", "Ask others to remember"],
          correct: 1,
          explanation: "Marking dates on a calendar helps track cycle patterns and identify any irregularities.",
          category: "tracking"
        },
        {
          question: "Which exercise is best during menstruation?",
          options: ["Heavy weightlifting", "Light walking and stretching", "Intense running", "No exercise at all"],
          correct: 1,
          explanation: "Light exercises like walking and stretching can help reduce cramps and improve mood.",
          category: "lifestyle"
        },
        {
          question: "What should you do if you don't have access to sanitary pads?",
          options: ["Use dirty cloth", "Use clean cotton cloth", "Use newspaper", "Don't use anything"],
          correct: 1,
          explanation: "Clean cotton cloth, properly washed and dried, is a safer alternative when commercial pads aren't available.",
          category: "hygiene"
        },
        {
          question: "How much water should you drink during periods?",
          options: ["Less than normal", "8-10 glasses daily", "Only when thirsty", "Avoid water completely"],
          correct: 1,
          explanation: "Staying well-hydrated (8-10 glasses daily) helps reduce bloating and supports overall health.",
          category: "health"
        }
      ]

      // Randomly select 5 questions
      const shuffled = enhancedQuestions.sort(() => 0.5 - Math.random())
      setQuizQuestions(shuffled.slice(0, 5))
      
    } catch (error) {
      console.error('Error generating questions:', error)
      // Fallback to basic questions if API fails
      generateBasicQuiz()
    }
    setIsGenerating(false)
  }

  const generateBasicQuiz = () => {
    const basicQuestions = [
      {
        question: "How often should you change your pad?",
        options: ["Once a day", "Every 4-6 hours", "Only when full", "Every 12 hours"],
        correct: 1,
        explanation: "Changing pads every 4-6 hours prevents infection and maintains hygiene.",
        category: "hygiene"
      }
    ]
    setQuizQuestions(basicQuestions)
  }

  useEffect(() => {
    generateGeminiQuestions()
  }, [difficulty])

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === quizQuestions[currentQuestion]?.correct) {
      setScore(score + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setScore(0)
    generateGeminiQuestions() // Generate new AI questions
  }

  if (quizQuestions.length === 0 || isGenerating) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">
            {isGenerating ? "Generating new questions with AI..." : "Loading quiz..."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-600" />
          AI-Powered Health Quiz
        </CardTitle>
        <CardDescription>
          Dynamic questions generated with AI • Difficulty: {difficulty}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showResults ? (
          <>
            {/* Difficulty Selector */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Difficulty Level:</span>
              <div className="flex gap-2">
                {(['basic', 'intermediate', 'advanced'] as const).map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={difficulty === level ? "default" : "outline"}
                    onClick={() => setDifficulty(level)}
                    className="capitalize"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="w-32" />
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold mb-2">{quizQuestions[currentQuestion]?.question}</h3>
                <Badge variant="outline" className="text-xs">
                  {quizQuestions[currentQuestion]?.category}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {quizQuestions[currentQuestion]?.options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 hover:bg-purple-50 transition-colors"
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="mr-3 text-purple-600 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="text-6xl mb-4">🎉</div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-purple-800">Quiz Complete!</h3>
              <div className="text-3xl font-bold text-primary">
                {score}/{quizQuestions.length}
              </div>
              <p className="text-sm text-gray-600">Difficulty: {difficulty}</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
              <p className="text-gray-700 font-medium">
                {score === quizQuestions.length 
                  ? "🌟 Excellent! You have outstanding knowledge about menstrual health!"
                  : score >= Math.ceil(quizQuestions.length * 0.7)
                  ? "👍 Great job! You have good understanding of menstrual health."
                  : score >= Math.ceil(quizQuestions.length * 0.5)
                  ? "📚 Good effort! Keep learning to improve your knowledge."
                  : "💪 Keep learning! Understanding your body is important for your health."}
              </p>
            </div>

            {/* Show explanations for incorrect answers */}
            <div className="text-left space-y-3">
              <h4 className="font-semibold text-gray-800">Learn from your answers:</h4>
              {quizQuestions.map((q, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p className="font-medium mb-1">Q{index + 1}: {q.question}</p>
                  <p className="text-green-700">
                    <span className="font-medium">Answer:</span> {q.options[q.correct]}
                  </p>
                  {q.explanation && (
                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">Why:</span> {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={resetQuiz} className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate New AI Questions
              </Button>
              <Button variant="outline" onClick={() => setShowResults(false)}>
                Review Quiz
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Mood Tracker Component
const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState("")
  const [moodNote, setMoodNote] = useState("")
  const [moodHistory, setMoodHistory] = useState([])

  const moodOptions = [
    { value: "happy", label: "Happy", icon: <Smile className="h-6 w-6" />, color: "text-green-600" },
    { value: "neutral", label: "Neutral", icon: <Meh className="h-6 w-6" />, color: "text-yellow-600" },
    { value: "sad", label: "Sad", icon: <Frown className="h-6 w-6" />, color: "text-blue-600" },
  ]

  const saveMood = () => {
    if (!selectedMood) return

    const newEntry = {
      mood: selectedMood,
      note: moodNote,
      date: new Date().toLocaleDateString(),
    }

    setMoodHistory([newEntry, ...moodHistory.slice(0, 6)])
    setSelectedMood("")
    setMoodNote("")
  }

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Mood Tracker
        </CardTitle>
        <CardDescription>
          Track your daily mood and emotions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div>
          <Label className="text-base font-medium">How are you feeling today?</Label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? "default" : "outline"}
                className="h-20 flex flex-col gap-2"
                onClick={() => setSelectedMood(mood.value)}
              >
                <div className={mood.color}>{mood.icon}</div>
                <span className="text-sm">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="moodNote">Add a note (optional)</Label>
          <Textarea
            id="moodNote"
            placeholder="How was your day? Any specific thoughts or feelings?"
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button onClick={saveMood} disabled={!selectedMood} className="w-full">
          Save Mood Entry
        </Button>

        {moodHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Recent Mood History</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {moodHistory.map((entry, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium capitalize">{entry.mood}</span>
                    <span className="text-gray-500">• {entry.date}</span>
                  </div>
                  {entry.note && <p className="text-gray-600">{entry.note}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function HealthHygiene() {
  const [activeTab, setActiveTab] = useState("menstrual")
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "Hello! I'm your health assistant. How can I help you today?" }
  ])
  const [messageInput, setMessageInput] = useState("")

  const nutritionGuide = [
    {
      title: "Iron-Rich Foods for Periods",
      description: "Essential to prevent anemia and maintain energy during menstruation",
      icon: <Apple className="h-5 w-5 text-red-600" />,
      foods: [
        { name: "Spinach (Palak)", nutrition: "Iron: 2.7mg per 100g", source: "Local vegetable markets", benefit: "Prevents anemia, boosts energy" },
        { name: "Jaggery (Gud)", nutrition: "Iron: 11mg per 100g", source: "Local grocery stores", benefit: "Natural iron source, satisfies sweet cravings" },
        { name: "Lentils (Dal)", nutrition: "Iron: 3.3mg per 100g", source: "Available everywhere", benefit: "Protein + iron combination" },
        { name: "Dates (Khajur)", nutrition: "Iron: 0.9mg per 100g", source: "Dry fruit shops", benefit: "Natural energy booster" }
      ],
      timing: "Consume daily, especially during periods",
      category: "iron"
    },
    {
      title: "Calcium & Magnesium Foods",
      description: "Reduce cramps and support bone health during adolescence",
      icon: <Droplet className="h-5 w-5 text-blue-600" />,
      foods: [
        { name: "Sesame Seeds (Til)", nutrition: "Calcium: 975mg per 100g", source: "Local oil mills", benefit: "Reduces menstrual cramps" },
        { name: "Milk & Yogurt", nutrition: "Calcium: 120mg per 100ml", source: "Local dairy", benefit: "Bone strength, muscle relaxation" },
        { name: "Green Leafy Vegetables", nutrition: "Magnesium: 79mg per 100g", source: "Kitchen gardens", benefit: "Natural muscle relaxant" },
        { name: "Bananas", nutrition: "Magnesium: 27mg per 100g", source: "Fruit vendors", benefit: "Reduces mood swings" }
      ],
      timing: "Throughout the cycle, increase during periods",
      category: "calcium"
    },
    {
      title: "Hydration & Detox Foods",
      description: "Flush toxins and reduce bloating during menstrual cycle",
      icon: <Shield className="h-5 w-5 text-green-600" />,
      foods: [
        { name: "Water", nutrition: "Essential for all body functions", source: "Clean, boiled water", benefit: "Reduces bloating, prevents dehydration" },
        { name: "Coconut Water", nutrition: "Natural electrolytes", source: "Fresh coconuts", benefit: "Natural hydration, reduces cramps" },
        { name: "Cucumber", nutrition: "95% water content", source: "Local farms", benefit: "Cooling effect, reduces bloating" },
        { name: "Watermelon", nutrition: "92% water, vitamins A & C", source: "Seasonal fruit", benefit: "Hydration + vitamins" }
      ],
      timing: "8-10 glasses daily, more during periods",
      category: "hydration"
    },
    {
      title: "Energy & Mood Foods",
      description: "Combat fatigue and mood swings naturally",
      icon: <Activity className="h-5 w-5 text-yellow-600" />,
      foods: [
        { name: "Whole Grains (Brown Rice)", nutrition: "Complex carbs, B vitamins", source: "Local rice mills", benefit: "Sustained energy, mood stability" },
        { name: "Nuts & Seeds", nutrition: "Healthy fats, protein", source: "Dry fruit shops", benefit: "Brain health, hormone balance" },
        { name: "Sweet Potato", nutrition: "Beta-carotene, fiber", source: "Local farms", benefit: "Natural sweetness, steady energy" },
        { name: "Dark Chocolate (70%+)", nutrition: "Magnesium, antioxidants", source: "Quality stores", benefit: "Mood booster, cramp relief" }
      ],
      timing: "Regular meals, small portions during periods",
      category: "energy"
    }
  ]

  const avoidFoods = [
    { name: "Excessive Salt", reason: "Increases bloating and water retention", alternative: "Use herbs and spices for flavor" },
    { name: "Refined Sugar", reason: "Causes energy crashes and mood swings", alternative: "Natural sweeteners like jaggery or honey" },
    { name: "Caffeine (excess)", reason: "Can worsen cramps and anxiety", alternative: "Herbal teas like ginger or chamomile" },
    { name: "Processed Foods", reason: "Low nutrition, high sodium", alternative: "Fresh, home-cooked meals" }
  ]

  const mythsFacts = [
    {
      myth: "You can't exercise during periods",
      fact: "Light exercise actually helps reduce cramps and improves mood",
      category: "menstrual"
    },
    {
      myth: "You shouldn't wash your hair during periods",
      fact: "There's no medical reason to avoid washing hair during menstruation",
      category: "hygiene"
    },
    {
      myth: "Periods sync up when women live together",
      fact: "Scientific studies show this is just a coincidence, not a real phenomenon",
      category: "menstrual"
    }
  ]

  const emergencyContacts = [
    { name: "Women's Helpline", number: "1091", description: "24/7 support for women in distress" },
    { name: "Health Helpline", number: "104", description: "Medical emergency and health advice" },
    { name: "Child Helpline", number: "1098", description: "Support for children and adolescents" }
  ]

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    
    setChatMessages([...chatMessages, { role: "user", content: messageInput }])
    
    setTimeout(() => {
      let response = "I'm here to help with your health questions. Could you provide more details?"
      
      const input = messageInput.toLowerCase()
      
      if (input.includes("period") || input.includes("menstrual")) {
        response = "Periods are a normal part of growing up. They typically last 3-7 days and occur every 21-35 days. It's important to use clean pads and change them regularly. If you have severe pain or irregular periods, consider talking to a healthcare provider."
      } else if (input.includes("pain") || input.includes("cramp")) {
        response = "For menstrual cramps, try: 1) Apply heat to your lower abdomen, 2) Do light exercise like walking, 3) Drink warm water, 4) Practice deep breathing. If pain is severe, consult a doctor."
      } else if (input.includes("hygiene")) {
        response = "Good hygiene practices: 1) Change pads every 4-6 hours, 2) Wash hands before and after changing pads, 3) Clean intimate areas with water, 4) Wear clean, cotton underwear."
      }
      
      setChatMessages(prev => [...prev, { role: "system", content: response }])
    }, 1000)
    
    setMessageInput("")
  }

  return (
    <div className="h-full bg-gradient-to-br from-pink-50 via-white to-purple-50/30 p-4">
      <div className="h-full max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 rounded-xl border border-pink-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Health & Hygiene Hub
              </h1>
              <p className="text-lg text-gray-700 font-medium">
                Your Complete Wellness Companion
              </p>
            </div>
          </div>
          <p className="text-base text-gray-600 leading-relaxed">
            Comprehensive health resources, period tracking, nutrition guidance, and expert support designed specifically for rural girls. 
            Empowering you with knowledge and tools for a healthy, confident life.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-white rounded-lg border border-pink-100 shadow-sm">
              <div className="text-2xl font-bold text-pink-600">5</div>
              <div className="text-sm text-gray-600">Health Sections</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-green-100 shadow-sm">
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">Health Tips</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-blue-100 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">AI Support</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-purple-100 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Private & Safe</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200">
            <TabsTrigger value="menstrual" className="text-sm font-semibold data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              🩸 Menstrual Health
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-sm font-semibold data-[state=active]:bg-green-500 data-[state=active]:text-white">
              🥗 Nutrition
            </TabsTrigger>
            <TabsTrigger value="mental" className="text-sm font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              🧠 Mental Wellness
            </TabsTrigger>
            <TabsTrigger value="myths" className="text-sm font-semibold data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              💡 Myths & Facts
            </TabsTrigger>
            <TabsTrigger value="emergency" className="text-sm font-semibold data-[state=active]:bg-red-500 data-[state=active]:text-white">
              🚨 Emergency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menstrual" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <PeriodTracker />
              <MenstrualHealthQuiz />
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                {nutritionGuide.slice(0, 2).map((guide, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {guide.icon}
                        {guide.title}
                      </CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {guide.foods.map((food, foodIndex) => (
                            <div key={foodIndex} className="p-3 bg-gray-50 rounded-lg border">
                              <h4 className="font-semibold text-gray-800 mb-1 text-sm">{food.name}</h4>
                              <div className="space-y-1 text-xs">
                                <p><span className="font-medium text-green-700">Nutrition:</span> {food.nutrition}</p>
                                <p><span className="font-medium text-blue-700">Source:</span> {food.source}</p>
                                <p><span className="font-medium text-purple-700">Benefits:</span> {food.benefit}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                          <p className="text-xs font-medium text-orange-800">
                            ⏰ <span className="font-semibold">Best Time:</span> {guide.timing}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                {nutritionGuide.slice(2, 4).map((guide, index) => (
                  <Card key={index + 2} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {guide.icon}
                        {guide.title}
                      </CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {guide.foods.map((food, foodIndex) => (
                            <div key={foodIndex} className="p-3 bg-gray-50 rounded-lg border">
                              <h4 className="font-semibold text-gray-800 mb-1 text-sm">{food.name}</h4>
                              <div className="space-y-1 text-xs">
                                <p><span className="font-medium text-green-700">Nutrition:</span> {food.nutrition}</p>
                                <p><span className="font-medium text-blue-700">Source:</span> {food.source}</p>
                                <p><span className="font-medium text-purple-700">Benefits:</span> {food.benefit}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                          <p className="text-xs font-medium text-orange-800">
                            ⏰ <span className="font-semibold">Best Time:</span> {guide.timing}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Foods to Avoid and Meal Plan - Full Width */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-red-200 bg-red-50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-5 w-5" />
                    Foods to Limit During Periods
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    These foods may worsen period symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {avoidFoods.map((food, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-1 text-sm">❌ {food.name}</h4>
                        <p className="text-xs text-red-700 mb-1"><strong>Why avoid:</strong> {food.reason}</p>
                        <p className="text-xs text-green-700"><strong>Try instead:</strong> {food.alternative}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Daily Meal Plan During Periods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2 text-sm">🌅 Morning (7-9 AM)</h4>
                      <ul className="text-xs text-yellow-700 space-y-1">
                        <li>• Warm water with jaggery</li>
                        <li>• Spinach paratha with yogurt</li>
                        <li>• Banana for magnesium</li>
                        <li>• Herbal tea (ginger/tulsi)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2 text-sm">☀️ Afternoon (12-2 PM)</h4>
                      <ul className="text-xs text-green-700 space-y-1">
                        <li>• Dal with brown rice</li>
                        <li>• Mixed vegetable curry</li>
                        <li>• Sesame seed laddu</li>
                        <li>• Buttermilk for probiotics</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2 text-sm">🌙 Evening (7-9 PM)</h4>
                      <ul className="text-xs text-purple-700 space-y-1">
                        <li>• Light khichdi with ghee</li>
                        <li>• Dates and nuts snack</li>
                        <li>• Warm milk with turmeric</li>
                        <li>• Coconut water if available</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mental" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <MoodTracker />
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smile className="h-5 w-5 text-yellow-600" />
                    Mental Wellness Guide
                  </CardTitle>
                  <CardDescription>
                    Comprehensive mental health support for rural girls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2 text-sm">🧘‍♀️ Daily Mindfulness</h4>
                      <p className="text-xs text-blue-700 mb-2">Practice deep breathing for 5-10 minutes daily.</p>
                      <ul className="text-xs text-blue-600 space-y-1">
                        <li>• Sit quietly and focus on breathing</li>
                        <li>• Count breaths from 1 to 10</li>
                        <li>• Best time: early morning or before sleep</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2 text-sm">💬 Stay Connected</h4>
                      <p className="text-xs text-green-700 mb-2">Build strong support networks in your community.</p>
                      <ul className="text-xs text-green-600 space-y-1">
                        <li>• Talk to trusted family members</li>
                        <li>• Join local women's groups</li>
                        <li>• Share experiences with friends</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2 text-sm">⚡ Stress Management</h4>
                      <p className="text-xs text-purple-700 mb-2">Learn to identify and manage stress effectively.</p>
                      <ul className="text-xs text-purple-600 space-y-1">
                        <li>• Recognize stress signals early</li>
                        <li>• Practice relaxation techniques</li>
                        <li>• Engage in physical activities</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <h4 className="font-semibold text-pink-800 mb-2 text-sm">🎯 Goal Setting</h4>
                      <p className="text-xs text-pink-700 mb-2">Set achievable goals for personal growth.</p>
                      <ul className="text-xs text-pink-600 space-y-1">
                        <li>• Start with small, daily goals</li>
                        <li>• Celebrate small achievements</li>
                        <li>• Focus on progress, not perfection</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                      <MessageCircle className="h-5 w-5 mb-1 text-blue-600" />
                      <span className="font-semibold text-xs">Talk to Someone</span>
                      <span className="text-xs text-gray-600">Find support</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                      <BookOpen className="h-5 w-5 mb-1 text-green-600" />
                      <span className="font-semibold text-xs">Self-Help Guide</span>
                      <span className="text-xs text-gray-600">Learn techniques</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-3 flex flex-col items-center">
                      <Activity className="h-5 w-5 mb-1 text-purple-600" />
                      <span className="font-semibold text-xs">Wellness Activities</span>
                      <span className="text-xs text-gray-600">Stay active</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="myths" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {mythsFacts.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      Myth vs Fact #{index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <Badge variant="destructive" className="mb-2">Myth</Badge>
                      <p className="text-red-700 font-medium">{item.myth}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Badge variant="default" className="mb-2 bg-green-600">Fact</Badge>
                      <p className="text-green-700">{item.fact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-red-200 bg-red-50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-5 w-5" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    Important helpline numbers for immediate assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
                        <Button variant="outline" className="font-mono font-bold w-full">
                          {contact.number}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-3">📞 How to Call</h4>
                    <ul className="text-sm text-orange-700 space-y-2">
                      <li>• Save these numbers in your phone</li>
                      <li>• Call from any mobile or landline</li>
                      <li>• Services available 24/7</li>
                      <li>• Free to call from most networks</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Safety Guidelines & Health Assistant
                  </CardTitle>
                  <CardDescription>
                    Know when to seek help and get instant health guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-3">🚨 When to Seek Help</h4>
                        <ul className="text-sm text-yellow-700 space-y-2">
                          <li>• Periods lasting more than 7 days</li>
                          <li>• Severe pain preventing daily activities</li>
                          <li>• Heavy bleeding (pad every hour)</li>
                          <li>• Missed periods for 3+ months</li>
                          <li>• Unusual discharge with strong odor</li>
                          <li>• Fever during periods</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-3">✅ Normal Signs</h4>
                        <ul className="text-sm text-green-700 space-y-2">
                          <li>• Mild cramping during periods</li>
                          <li>• Cycle length between 21-35 days</li>
                          <li>• Period lasting 3-7 days</li>
                          <li>• Light mood changes before periods</li>
                          <li>• Clear or white discharge between periods</li>
                          <li>• Slight breast tenderness before periods</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg bg-gray-50">
                      <div className="p-4 border-b bg-white">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 text-primary" />
                          Health Assistant
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="h-48 overflow-y-auto bg-white rounded border p-3 mb-4">
                          {chatMessages.map((msg, index) => (
                            <div key={index} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                              <div className={`inline-block p-3 rounded-lg max-w-sm ${
                                msg.role === 'user' 
                                  ? 'bg-primary text-white' 
                                  : 'bg-gray-100 border'
                              }`}>
                                {msg.content}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ask about health, periods, nutrition..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <Button onClick={handleSendMessage}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
