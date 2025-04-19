"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { doc, getDoc } from "firebase/firestore"
import { Award, BadgeIcon as Certificate, Download, Star, Trophy, CheckCircle, Medal, Calendar } from "lucide-react"

export default function AchievementsPage() {
  const { user, db } = useFirebase()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user, db])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Sample achievement data - in a real app, this would come from Firebase
  const achievements = {
    badges: [
      {
        id: "digital-explorer",
        name: "Digital Explorer",
        description: "Completed the Digital Literacy 101 course",
        icon: <Star className="h-8 w-8 text-yellow-500" />,
        date: "2023-05-15",
        progress: 100,
      },
      {
        id: "financial-wizard",
        name: "Financial Wizard",
        description: "Completed the Financial Literacy course",
        icon: <Trophy className="h-8 w-8 text-amber-500" />,
        date: "2023-06-20",
        progress: 75,
      },
      {
        id: "coding-novice",
        name: "Coding Novice",
        description: "Started learning programming basics",
        icon: <Medal className="h-8 w-8 text-blue-500" />,
        date: "2023-07-10",
        progress: 30,
      },
      {
        id: "community-contributor",
        name: "Community Contributor",
        description: "Actively participated in community discussions",
        icon: <Award className="h-8 w-8 text-green-500" />,
        date: "2023-08-05",
        progress: 50,
      },
    ],
    certificates: [
      {
        id: "cert-digital-literacy",
        name: "Digital Literacy Certificate",
        course: "Digital Literacy 101",
        issueDate: "2023-05-15",
        instructor: "Priya Sharma",
        description: "Successfully completed all modules of Digital Literacy 101",
      },
      {
        id: "cert-financial-basics",
        name: "Financial Basics Certificate",
        course: "Financial Literacy",
        issueDate: "2023-06-20",
        instructor: "Anita Desai",
        description: "Completed 75% of the Financial Literacy course",
      },
    ],
    completedTasks: [
      {
        id: "task-1",
        name: "Create a digital profile",
        module: "Digital Literacy",
        completedDate: "2023-05-10",
        points: 50,
      },
      {
        id: "task-2",
        name: "Set up emergency contacts",
        module: "Safety",
        completedDate: "2023-05-12",
        points: 30,
      },
      {
        id: "task-3",
        name: "Complete financial planning quiz",
        module: "Financial Literacy",
        completedDate: "2023-06-15",
        points: 40,
      },
      {
        id: "task-4",
        name: "Create first HTML page",
        module: "Coding Basics",
        completedDate: "2023-07-08",
        points: 60,
      },
      {
        id: "task-5",
        name: "Participate in community discussion",
        module: "Community",
        completedDate: "2023-08-01",
        points: 25,
      },
    ],
  }

  // Calculate total points
  const totalPoints = achievements.completedTasks.reduce((sum, task) => sum + task.points, 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Achievements</h1>
          <p className="text-gray-500">Track your progress and celebrate your accomplishments</p>
        </div>
        <Card className="w-full md:w-auto bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-md">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Points</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="badges">Badges & Progress</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.badges.map((badge) => (
              <Card key={badge.id} className="card-hover-effect">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">{badge.description}</p>

                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(badge.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      <div className="mb-1 flex justify-between items-center">
                        <span className="text-xs font-medium">Progress</span>
                        <span className="text-xs font-medium">{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.certificates.map((certificate) => (
              <Card key={certificate.id} className="card-hover-effect overflow-hidden">
                <div className="bg-primary/10 p-4 border-b border-primary/20">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{certificate.name}</h3>
                    <Certificate className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Course</p>
                      <p>{certificate.course}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Issued On</p>
                      <p>
                        {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Instructor</p>
                      <p>{certificate.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-sm">{certificate.description}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t p-4">
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>Tasks you've successfully completed on your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{task.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{task.module}</Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(task.completedDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                        <span className="font-medium">{task.points} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
