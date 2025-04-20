"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { doc, getDoc } from "firebase/firestore"
import { useToast } from "@/components/ui/use-toast"
import {
  Briefcase,
  FileText,
  Search,
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Bell,
  CheckCircle,
  ArrowRight,
  Bookmark,
  ExternalLink,
  Plus,
  Download,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Job = {
  id: string
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "contract" | "internship" | "remote"
  salary: string
  description: string
  requirements: string[]
  postedDate: any
  applicationDeadline: any
  logo: string
  url: string
}

type Scholarship = {
  id: string
  name: string
  organization: string
  amount: string
  deadline: any
  eligibility: string
  description: string
  url: string
}

type Application = {
  id: string
  jobId: string
  jobTitle: string
  company: string
  status: "draft" | "applied" | "interview" | "offer" | "rejected"
  appliedDate: any
  notes: string
}

export default function CareerPage() {
  const { user, db } = useFirebase()
  const { toast } = useToast()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<Job[]>([])
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [careerPaths, setCareerPaths] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")

  // Resume builder state
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: [],
    education: [],
    experience: [],
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }

        // Fetch jobs, scholarships, applications
        await fetchJobs()
        await fetchScholarships()
        await fetchApplications()

        // Generate AI career paths based on user profile
        generateCareerPaths()
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user, db])

  const fetchJobs = async () => {
    // In a real app, this would fetch from an API or Firestore
    // For demo purposes, we'll use sample data
    const sampleJobs: Job[] = [
      {
        id: "job1",
        title: "Digital Marketing Assistant",
        company: "TechGrow Solutions",
        location: "Remote",
        type: "part-time",
        salary: "₹15,000 - ₹20,000/month",
        description: "Assist in managing social media accounts, create content, and analyze campaign performance.",
        requirements: ["Basic computer skills", "Social media knowledge", "Good communication"],
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        logo: "/digi.png",
        url: "#",
      },
      {
        id: "job2",
        title: "Junior Web Developer",
        company: "CodeCraft India",
        location: "Bangalore",
        type: "full-time",
        salary: "₹25,000 - ₹35,000/month",
        description:
          "Develop and maintain websites using HTML, CSS, and JavaScript. Work with senior developers to implement new features.",
        requirements: ["HTML/CSS", "Basic JavaScript", "Responsive design knowledge"],
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        logo: "/dev.png",
        url: "#",
      },
      {
        id: "job3",
        title: "Data Entry Operator",
        company: "Rural Business Network",
        location: "Hybrid",
        type: "contract",
        salary: "₹12,000 - ₹15,000/month",
        description: "Input and process information into databases. Verify data accuracy and maintain records.",
        requirements: ["Typing skills", "Attention to detail", "Basic Excel knowledge"],
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        applicationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        logo: "/data.jpeg",
        url: "#",
      },
      {
        id: "job4",
        title: "E-commerce Assistant",
        company: "Village Crafts Collective",
        location: "Remote",
        type: "part-time",
        salary: "₹10,000 - ₹18,000/month",
        description: "Help manage online store, process orders, and coordinate with artisans for product listings.",
        requirements: ["Basic computer skills", "Good communication", "Organization skills"],
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        logo: "/ec.jpeg",
        url: "#",
      },
      {
        id: "job5",
        title: "Content Creator Intern",
        company: "Digital India Foundation",
        location: "Delhi",
        type: "internship",
        salary: "₹8,000 - ₹12,000/month",
        description: "Create engaging content for social media, blog posts, and educational materials.",
        requirements: ["Creative writing", "Basic design skills", "Social media familiarity"],
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        logo: "/cr.png",
        url: "#",
      },
    ]

    setJobs(sampleJobs)
  }

  const fetchScholarships = async () => {
    // In a real app, this would fetch from an API or Firestore
    // For demo purposes, we'll use sample data
    const sampleScholarships: Scholarship[] = [
      {
        id: "sch1",
        name: "Digital Skills Scholarship for Rural Women",
        organization: "Tech Empowerment Foundation",
        amount: "₹50,000",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        eligibility: "Women from rural areas pursuing digital skills education",
        description:
          "Scholarship to support women from rural areas in gaining digital skills through certified courses.",
        url: "#",
      },
      {
        id: "sch2",
        name: "Entrepreneurship Grant for Young Women",
        organization: "Women Business Alliance",
        amount: "₹75,000",
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        eligibility: "Women aged 18-35 with business ideas",
        description: "Financial support for young women entrepreneurs to start or grow their businesses.",
        url: "#",
      },
      {
        id: "sch3",
        name: "Coding Bootcamp Scholarship",
        organization: "CodeHers Initiative",
        amount: "Full Tuition Coverage",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        eligibility: "Women with basic computer knowledge interested in programming",
        description: "Full scholarship for a 12-week intensive coding bootcamp with job placement assistance.",
        url: "#",
      },
    ]

    setScholarships(sampleScholarships)
  }

  const fetchApplications = async () => {
    // In a real app, this would fetch from Firestore
    // For demo purposes, we'll use sample data
    const sampleApplications: Application[] = [
      {
        id: "app1",
        jobId: "job1",
        jobTitle: "Digital Marketing Assistant",
        company: "TechGrow Solutions",
        status: "applied",
        appliedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        notes: "Applied online. Received confirmation email.",
      },
      {
        id: "app2",
        jobId: "job3",
        jobTitle: "Data Entry Operator",
        company: "Rural Business Network",
        status: "interview",
        appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        notes: "Phone interview scheduled for next week.",
      },
    ]

    setApplications(sampleApplications)
  }

  const generateCareerPaths = () => {
    // In a real app, this would use AI to analyze user profile and suggest career paths
    // For demo purposes, we'll use sample data
    const sampleCareerPaths = [
      {
        id: "path1",
        title: "Digital Marketing Specialist",
        description:
          "Build skills in social media management, content creation, and digital advertising to help businesses grow their online presence.",
        matchScore: 92,
        skills: ["Social Media Management", "Content Creation", "Analytics", "SEO Basics"],
        courses: ["Digital Marketing Fundamentals", "Social Media Strategy", "Content Creation Workshop"],
        averageSalary: "₹25,000 - ₹45,000/month",
        growthPotential: "High",
        icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      },
      {
        id: "path2",
        title: "E-commerce Entrepreneur",
        description:
          "Start and grow your own online business selling products or services, leveraging digital platforms to reach customers.",
        matchScore: 85,
        skills: ["Product Management", "Customer Service", "Basic Accounting", "Digital Marketing"],
        courses: ["E-commerce Fundamentals", "Product Photography", "Online Store Management"],
        averageSalary: "Variable based on business success",
        growthPotential: "Very High",
        icon: <Briefcase className="h-8 w-8 text-green-500" />,
      },
      {
        id: "path3",
        title: "Web Developer",
        description:
          "Learn to build and maintain websites and web applications using coding skills that are in high demand.",
        matchScore: 78,
        skills: ["HTML/CSS", "JavaScript", "Responsive Design", "Basic Backend"],
        courses: ["Web Development Basics", "JavaScript Fundamentals", "Building Responsive Websites"],
        averageSalary: "₹30,000 - ₹60,000/month",
        growthPotential: "High",
        icon: <FileText className="h-8 w-8 text-blue-500" />,
      },
    ]

    setCareerPaths(sampleCareerPaths)
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = jobTypeFilter === "all" || job.type === jobTypeFilter

    const matchesLocation = locationFilter === "all" || job.location.toLowerCase() === locationFilter.toLowerCase()

    return matchesSearch && matchesType && matchesLocation
  })

  const handleSaveJob = (jobId: string) => {
    toast({
      title: "Job Saved",
      description: "This job has been saved to your bookmarks.",
    })
  }

  const handleApplyJob = (jobId: string) => {
    toast({
      title: "Application Started",
      description: "You can complete your application in the Applications tab.",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Career & Jobs</h1>
          <p className="text-gray-500">Discover opportunities and build your career path</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="btn-glow">
            <Bell className="mr-2 h-4 w-4" />
            Job Alerts
          </Button>
          <Button className="bg-primary hover:bg-primary/90 btn-glow">
            <FileText className="mr-2 h-4 w-4" />
            Build Resume
          </Button>
        </div>
      </div>

      {/* AI Career Path Suggestions */}
      <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse-slow" />
            <CardTitle>AI Career Path Suggestions</CardTitle>
          </div>
          <CardDescription>Personalized career paths based on your skills, interests, and profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerPaths.map((path) => (
              <Card key={path.id} className="card-hover-effect border-t-4 border-t-primary overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <div className="p-2 bg-primary/10 rounded-full">{path.icon}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-primary/90">{path.matchScore}% Match</Badge>
                    <Badge variant="outline">Growth: {path.growthPotential}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 mb-4">{path.description}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Key Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Recommended Courses</p>
                      <ul className="text-sm space-y-1">
                        {path.courses.map((course, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">Average Salary</p>
                      <p className="text-sm font-medium">{path.averageSalary}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 btn-glow">
                    Explore This Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="jobs">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-6 space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder="Search jobs by title, company, or keywords"
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Jobs Found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search filters or check back later for new opportunities.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setJobTypeFilter("all")
                    setLocationFilter("all")
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="card-hover-effect">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                          <img
                            src={job.logo || "/placeholder.svg?height=50&width=50"}
                            alt={job.company}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <Badge
                              className={
                                job.type === "full-time"
                                  ? "bg-blue-500"
                                  : job.type === "part-time"
                                    ? "bg-green-500"
                                    : job.type === "contract"
                                      ? "bg-amber-500"
                                      : job.type === "internship"
                                        ? "bg-purple-500"
                                        : "bg-teal-500"
                              }
                            >
                              {job.type
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-50">
                              {job.salary}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Posted {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{job.description}</p>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Requirements:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3 mt-4">
                          <Button
                            className="w-full md:w-auto bg-primary hover:bg-primary/90 btn-glow"
                            onClick={() => handleApplyJob(job.id)}
                          >
                            Apply Now
                          </Button>
                          <Button variant="outline" className="w-full md:w-auto" onClick={() => handleSaveJob(job.id)}>
                            <Bookmark className="mr-2 h-4 w-4" />
                            Save Job
                          </Button>
                          <Button variant="link" className="w-full md:w-auto" asChild>
                            <a href={job.url} target="_blank" rel="noopener noreferrer">
                              View Details
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scholarships" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id} className="card-hover-effect">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                    <Badge className="bg-primary/90">{scholarship.amount}</Badge>
                  </div>
                  <CardDescription>{scholarship.organization}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 mb-4">{scholarship.description}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Eligibility</p>
                      <p className="text-sm">{scholarship.eligibility}</p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Application Deadline</p>
                      <p className="text-sm">
                        {new Date(scholarship.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex flex-col md:flex-row gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 btn-glow">Apply Now</Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={scholarship.url} target="_blank" rel="noopener noreferrer">
                        Learn More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          {applications.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Applications Yet</h3>
                <p className="text-gray-500 mb-4">Start applying for jobs to track your applications here.</p>
                <Button className="bg-primary hover:bg-primary/90">Browse Jobs</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium">{application.jobTitle}</h3>
                        <p className="text-sm text-gray-500">{application.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={
                              application.status === "draft"
                                ? "bg-gray-500"
                                : application.status === "applied"
                                  ? "bg-blue-500"
                                  : application.status === "interview"
                                    ? "bg-amber-500"
                                    : application.status === "offer"
                                      ? "bg-green-500"
                                      : "bg-red-500"
                            }
                          >
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3 md:mt-0">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resume" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>AI-Powered Resume Builder</CardTitle>
              </div>
              <CardDescription>Create a professional resume with AI assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>

                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea id="summary" placeholder="Brief overview of your skills and experience" rows={4} />
                    <div className="flex justify-end mt-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Generate with AI
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Skills</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Skill
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                      {["Communication", "Microsoft Office", "Social Media", "Customer Service"].map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                          <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-end mt-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Suggest Skills
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Education</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Education
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">High School Diploma</p>
                            <p className="text-sm text-gray-500">Government Girls High School</p>
                          </div>
                          <div className="text-sm text-gray-500">2018 - 2020</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Experience</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Experience
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between mb-1">
                          <div>
                            <p className="font-medium">Sales Associate</p>
                            <p className="text-sm text-gray-500">Local Handicrafts Shop</p>
                          </div>
                          <div className="text-sm text-gray-500">2021 - Present</div>
                        </div>
                        <p className="text-sm">
                          Managed customer interactions and product sales for a local handicrafts business.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Improve Descriptions
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-6">
                    <Switch id="auto-update" />
                    <Label htmlFor="auto-update">Automatically update my resume with new skills and experiences</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">Preview Resume</Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button className="bg-primary hover:bg-primary/90 btn-glow">Save Resume</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
