"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle, signInWithPhone, auth, isInitialized } = useFirebase()
  const { toast } = useToast()

  // Email login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Phone login state
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationId, setVerificationId] = useState<string | null>(null)
  const [phoneLoading, setPhoneLoading] = useState(false)

  // Check if Firebase is initialized
  useEffect(() => {
    if (!isInitialized) {
      toast({
        title: "Firebase Not Initialized",
        description: "Please set up your Firebase environment variables to use authentication features.",
        variant: "destructive",
      })
    }
  }, [isInitialized, toast])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isInitialized) {
      toast({
        title: "Firebase Not Initialized",
        description: "Please set up your Firebase environment variables to use authentication features.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!isInitialized) {
      toast({
        title: "Firebase Not Initialized",
        description: "Please set up your Firebase environment variables to use authentication features.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await signInWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Google Login Failed",
        description: error.message || "Failed to login with Google. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSendVerificationCode = async () => {
    if (!isInitialized) {
      toast({
        title: "Firebase Not Initialized",
        description: "Please set up your Firebase environment variables to use authentication features.",
        variant: "destructive",
      })
      return
    }

    setPhoneLoading(true)

    try {
      // Create a new RecaptchaVerifier instance
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "normal",
        callback: () => {
          // reCAPTCHA solved, allow sending verification code
        },
        "expired-callback": () => {
          toast({
            title: "reCAPTCHA Expired",
            description: "Please solve the reCAPTCHA again.",
            variant: "destructive",
          })
        },
      })

      const confirmationResult = await signInWithPhone(phoneNumber, recaptchaVerifier)
      setVerificationId(confirmationResult.verificationId)

      toast({
        title: "Verification Code Sent",
        description: "Please check your phone for the verification code.",
      })
    } catch (error: any) {
      toast({
        title: "Failed to Send Code",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPhoneLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!isInitialized) {
      toast({
        title: "Firebase Not Initialized",
        description: "Please set up your Firebase environment variables to use authentication features.",
        variant: "destructive",
      })
      return
    }

    setPhoneLoading(true)

    try {
      if (!verificationId) {
        throw new Error("Verification ID not found. Please request a new code.")
      }

      // Verify the code
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode)
      await auth.signInWithCredential(credential)

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPhoneLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Login to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {!isInitialized && (
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <InfoIcon className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Firebase Not Configured</AlertTitle>
              <AlertDescription className="text-amber-700">
                Please set up your Firebase environment variables to enable authentication.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading || !isInitialized}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={loading || !isInitialized}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
                Google
              </Button>
            </TabsContent>

            <TabsContent value="phone">
              <div className="space-y-4">
                {!verificationId ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <p className="text-xs text-gray-500">Include country code (e.g., +91 for India)</p>
                    </div>

                    <div id="recaptcha-container" className="flex justify-center my-4"></div>

                    <Button
                      type="button"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={handleSendVerificationCode}
                      disabled={phoneLoading || !phoneNumber || !isInitialized}
                    >
                      {phoneLoading ? "Sending..." : "Send Verification Code"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="code">Verification Code</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="123456"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={handleVerifyCode}
                      disabled={phoneLoading || !verificationCode || !isInitialized}
                    >
                      {phoneLoading ? "Verifying..." : "Verify Code"}
                    </Button>

                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-purple-600"
                      onClick={() => setVerificationId(null)}
                      disabled={phoneLoading}
                    >
                      Back to Phone Number
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
