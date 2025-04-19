import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Users, Heart, Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            <h1 className="text-2xl font-bold text-primary">Rural Girls Empowerment</h1>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="ghost">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 btn-glow">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">Empowering Rural Girls Through Digital Skills</h2>
            <p className="text-lg text-gray-700 mb-8">
              Access AI-driven mentorship, learn digital skills, ensure your safety, and develop entrepreneurship tools
              - all in one platform.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl animate-float">
            <Image
              src="\girls.png"
              alt="Rural girls using digital tools"
              fill
              className="object-cover"
            />
          </div>
        </main>

        {/* About Us Section */}
        <section className="py-16" id="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="g.png?height=400&width=600" alt="Our mission" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">About Us</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-pink-500" /> Our Mission
                  </h3>
                  <p className="text-gray-700">
                    We are dedicated to empowering rural girls through technology, education, and community support. Our
                    platform bridges the digital divide, providing access to skills, opportunities, and resources that
                    were previously out of reach.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-blue-500" /> Our Vision
                  </h3>
                  <p className="text-gray-700">
                    We envision a world where every rural girl has the tools, knowledge, and confidence to achieve her
                    full potential. Through digital literacy, entrepreneurship, and safety resources, we're building
                    pathways to economic independence and personal growth.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-500" /> Our Impact
                  </h3>
                  <p className="text-gray-700">
                    Since our inception, we've reached over 10,000 rural girls across 500 villages, helping them develop
                    digital skills, start small businesses, and connect with mentors who guide their journey.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-blue-100 rounded-full text-blue-400 hover:bg-blue-200 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-blue-100 rounded-full text-blue-700 hover:bg-blue-200 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="card-hover-effect">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-gray-500">contact@ruralgirls.org</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover-effect">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-gray-500">+91 98765 43210</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover-effect">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Visit Us</h3>
                  <p className="text-gray-500">123 Rural Tech Hub, Bangalore</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Mentor",
                icon: "sparkles",
                description: "Get personalized guidance and support from our AI mentor in multiple languages.",
              },
              {
                title: "Learn & Grow",
                icon: "book-open",
                description: "Access courses on digital literacy, financial skills, coding, and more.",
              },
              {
                title: "Safety First",
                icon: "shield",
                description: "Stay safe with our SOS features, emergency contacts, and safety tools.",
              },
              {
                title: "Business Toolkit",
                icon: "briefcase",
                description: "Launch and grow your business with our easy-to-use business tools.",
              },
              {
                title: "Career Support",
                icon: "graduation-cap",
                description: "Get career guidance, build your resume, and find job opportunities.",
              },
              {
                title: "Community",
                icon: "users",
                description: "Connect with mentors and peers in a safe, supportive community.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow card-hover-effect">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon === "sparkles" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary lucide lucide-sparkles"
                      >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        <path d="M5 3v4" />
                        <path d="M3 5h4" />
                        <path d="M19 17v4" />
                        <path d="M17 19h4" />
                      </svg>
                    )}
                    {feature.icon === "book-open" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary lucide lucide-book-open"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    )}
                    {feature.icon === "shield" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary lucide lucide-shield"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    )}
                    {feature.icon === "briefcase" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary lucide lucide-briefcase"
                      >
                        <rect width="20" height="14" x="2" y="7" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    )}
                    {feature.icon === "graduation-cap" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary lucide lucide-graduation-cap"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                      </svg>
                    )}
                    {feature.icon === "users" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary lucide lucide-users"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="py-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Rural Girls Empowerment</h3>
              <p className="text-gray-600">Empowering rural girls through technology and education.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-600 hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-600 hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Rural Girls Digital Empowerment Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
