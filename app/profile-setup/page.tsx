"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const STEPS = [
  "Basic Info",
  "Education & Skills",
  "Goals & Aspirations",
  "Emergency Setup",
  "Business Info",
  "Connectivity",
  "Profile Photo",
]

export default function ProfileSetupPage() {
  const router = useRouter()
  const { user, db, storage } = useFirebase()
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    age: "",
    location: "",
    language: "",

    // Education & Skills
    educationLevel: "",
    digitalSkills: "",
    interestAreas: "",

    // Goals & Aspirations
    goals: "",
    aspirations: "",

    // Emergency Setup
    emergencyContact1: "",
    emergencyContact2: "",
    emergencyContact3: "",
    sosPhrase: "",
    locationAccess: false,

    // Business Info
    existingBusiness: "",
    currentProducts: "",

    // Connectivity
    internetAccess: "",
    preferredLearning: "",

    // Profile Photo
    profilePhotoURL: "",
  })

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfilePhoto(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to complete your profile.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setLoading(true)

    try {
      const profileData = { ...formData }

      // Upload profile photo if selected
      if (profilePhoto) {
        const storageRef = ref(storage, `profile-photos/${user.uid}`)
        await uploadBytes(storageRef, profilePhoto)
        const photoURL = await getDownloadURL(storageRef)
        profileData.profilePhotoURL = photoURL
      }

      // Update user document in Firestore
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        ...profileData,
        profileComplete: true,
        updatedAt: new Date(),
      })

      toast({
        title: "Profile Setup Complete",
        description: "Your profile has been successfully set up!",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Profile Setup Failed",
        description: error.message || "Failed to set up profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Your age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Your village/town/city"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="bengali">Bengali</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                  <SelectItem value="gujarati">Gujarati</SelectItem>
                  <SelectItem value="kannada">Kannada</SelectItem>
                  <SelectItem value="malayalam">Malayalam</SelectItem>
                  <SelectItem value="punjabi">Punjabi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 1: // Education & Skills
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="educationLevel">Education Level</Label>
              <Select
                value={formData.educationLevel}
                onValueChange={(value) => handleSelectChange("educationLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary School</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College/University</SelectItem>
                  <SelectItem value="vocational">Vocational Training</SelectItem>
                  <SelectItem value="none">No Formal Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="digitalSkills">Digital Skills</Label>
              <Textarea
                id="digitalSkills"
                name="digitalSkills"
                placeholder="Describe your experience with computers, smartphones, internet, etc."
                value={formData.digitalSkills}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestAreas">Areas of Interest</Label>
              <Textarea
                id="interestAreas"
                name="interestAreas"
                placeholder="What topics are you interested in learning about?"
                value={formData.interestAreas}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )

      case 2: // Goals & Aspirations
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goals">Short-term Goals</Label>
              <Textarea
                id="goals"
                name="goals"
                placeholder="What do you want to achieve in the next 6-12 months?"
                value={formData.goals}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aspirations">Long-term Aspirations</Label>
              <Textarea
                id="aspirations"
                name="aspirations"
                placeholder="What are your dreams for the future? (job, business, education, etc.)"
                value={formData.aspirations}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )

      case 3: // Emergency Setup
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact1">Emergency Contact 1</Label>
              <Input
                id="emergencyContact1"
                name="emergencyContact1"
                placeholder="Phone number with country code"
                value={formData.emergencyContact1}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact2">Emergency Contact 2 (Optional)</Label>
              <Input
                id="emergencyContact2"
                name="emergencyContact2"
                placeholder="Phone number with country code"
                value={formData.emergencyContact2}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact3">Emergency Contact 3 (Optional)</Label>
              <Input
                id="emergencyContact3"
                name="emergencyContact3"
                placeholder="Phone number with country code"
                value={formData.emergencyContact3}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sosPhrase">SOS Phrase</Label>
              <Input
                id="sosPhrase"
                name="sosPhrase"
                placeholder="A phrase to activate emergency mode (e.g., 'Help me')"
                value={formData.sosPhrase}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="locationAccess"
                name="locationAccess"
                checked={formData.locationAccess}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <Label htmlFor="locationAccess">Allow location access for emergency services</Label>
            </div>
          </div>
        )

      case 4: // Business Info
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="existingBusiness">Existing Business/Income Source (Optional)</Label>
              <Textarea
                id="existingBusiness"
                name="existingBusiness"
                placeholder="Describe any business or income-generating activities you currently have"
                value={formData.existingBusiness}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentProducts">Current Products/Services (Optional)</Label>
              <Textarea
                id="currentProducts"
                name="currentProducts"
                placeholder="List any products or services you currently offer"
                value={formData.currentProducts}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )

      case 5: // Connectivity
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="internetAccess">Internet Access Level</Label>
              <Select
                value={formData.internetAccess}
                onValueChange={(value) => handleSelectChange("internetAccess", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select internet access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reliable">Reliable (Always available)</SelectItem>
                  <SelectItem value="intermittent">Intermittent (Sometimes available)</SelectItem>
                  <SelectItem value="limited">Limited (Rarely available)</SelectItem>
                  <SelectItem value="none">None (No internet access)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredLearning">Preferred Learning Type</Label>
              <Select
                value={formData.preferredLearning}
                onValueChange={(value) => handleSelectChange("preferredLearning", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred learning type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text-based</SelectItem>
                  <SelectItem value="video">Video-based</SelectItem>
                  <SelectItem value="audio">Audio-based</SelectItem>
                  <SelectItem value="interactive">Interactive/Hands-on</SelectItem>
                  <SelectItem value="offline">Offline materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 6: // Profile Photo
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={photoPreview || ""} />
                <AvatarFallback className="text-2xl bg-purple-100 text-purple-800">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2 w-full">
                <Label htmlFor="profilePhoto">Upload Profile Photo</Label>
                <Input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>You can also skip this step and add a photo later.</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Profile Setup</CardTitle>
            <CardDescription className="text-center">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
            </CardDescription>
            <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="h-2" />
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || loading}>
              Previous
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button onClick={handleNext} disabled={loading}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                {loading ? "Saving..." : "Complete Setup"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
