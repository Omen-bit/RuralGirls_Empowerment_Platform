"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { doc, getDoc } from "firebase/firestore"
import { useState } from "react"
import { Bell, Home, BookOpen, Briefcase, GraduationCap, Users, Shield, Bot, LogOut } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, signOut, db, isInitialized, loading: authLoading } = useFirebase()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!isInitialized) {
        setLoading(false)
        return
      }

      // Wait for auth state to be determined
      if (authLoading) {
        return
      }

      if (!user) {
        router.push("/login")
        return
      }

      try {
        // Get user data from Firestore with timeout
        const userDocPromise = getDoc(doc(db, "users", user.uid))
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        )

        const userDoc = await Promise.race([userDocPromise, timeoutPromise]) as any

        if (userDoc.exists()) {
          const data = userDoc.data()
          setUserData(data)

          // Check if profile is complete (optional, don't block)
          if (!data.profileComplete) {
            // Don't redirect immediately, let user access dashboard
            console.log("Profile incomplete, but allowing access")
          }
        } else {
          // Create basic user data if doesn't exist
          setUserData({ name: user.email, profileComplete: false })
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        // Set basic user data even if Firestore fails
        setUserData({ name: user.email, profileComplete: false })
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [user, router, db, isInitialized, authLoading])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50 p-4">
        <div className="w-full max-w-md">
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <InfoIcon className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Firebase Not Configured</AlertTitle>
            <AlertDescription className="text-amber-700">
              Please set up your Firebase environment variables to access the dashboard.
            </AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="bg-purple-600 text-white p-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sparkles"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M3 5h4" />
                  <path d="M19 17v4" />
                  <path d="M17 19h4" />
                </svg>
              </div>
              <h1 className="text-lg font-bold">Rural Girls Empowerment</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard">
                        <Home size={20} />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/ai-mentor">
                        <Bot size={20} />
                        <span>AI Mentor</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/learn">
                        <BookOpen size={20} />
                        <span>Learn & Grow</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/career">
                        <GraduationCap size={20} />
                        <span>Career & Jobs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/safety">
                        <Shield size={20} />
                        <span>Health and Hygiene</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/business">
                        <Briefcase size={20} />
                        <span>My Business</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/community">
                        <Users size={20} />
                        <span>Community</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={userData?.profilePhotoURL || ""} />
                  <AvatarFallback className="bg-purple-100 text-purple-800">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userData?.name || user?.email}</p>
                  <p className="text-xs text-gray-500 truncate">{userData?.location || "Profile"}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4 lg:hidden" />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell size={16} />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData?.profilePhotoURL || ""} />
                <AvatarFallback className="bg-purple-100 text-purple-800">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
