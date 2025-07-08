"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Calendar,
  MessageCircle,
  Video,
  CheckCircle,
  User,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Brain,
  Heart,
  Zap,
  Target,
  Lightbulb,
  Coffee,
  Laptop,
  BookOpen,
  Mic,
  Eye,
  Handshake,
  TrendingUp,
  Shield,
  Compass,
  Puzzle,
} from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"

interface BookedSession {
  id: number
  mentor: EnhancedMentor
  time: string
  type: "video" | "chat"
  goal: string
  status: string
}

interface EnhancedMentor {
  id: number
  name: string
  role: string
  company: string
  experience: string
  rating: number
  sessions: number
  price: string
  expertise: string[]
  bio: string
  education: string
  location: string
  languages: string[]
  responseTime: string
  icon: typeof User
  color: string
  verified: boolean
  topMentor: boolean
}

interface PersonalityQuestion {
  id: number
  question: string
  category:
    | "energy"
    | "information"
    | "decisions"
    | "lifestyle"
    | "communication"
    | "work_style"
    | "motivation"
    | "stress"
  options: Array<{
    text: string
    type: "extrovert" | "introvert" | "sensing" | "intuitive" | "thinking" | "feeling" | "judging" | "perceiving"
    icon: typeof Coffee
  }>
}

const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 1,
    question: "How do you prefer to recharge after a long day?",
    category: "energy",
    options: [
      {
        text: "Spend time with friends or colleagues",
        type: "extrovert",
        icon: Users,
      },
      {
        text: "Have some quiet time alone",
        type: "introvert",
        icon: Coffee,
      },
      {
        text: "Engage in social activities or events",
        type: "extrovert",
        icon: Mic,
      },
      {
        text: "Read a book or listen to music",
        type: "introvert",
        icon: BookOpen,
      },
    ],
  },
  {
    id: 2,
    question: "When working on a project, you prefer to:",
    category: "work_style",
    options: [
      {
        text: "Collaborate with a team and brainstorm ideas together",
        type: "extrovert",
        icon: Users,
      },
      {
        text: "Work independently and think through solutions alone",
        type: "introvert",
        icon: Laptop,
      },
      {
        text: "Focus on logical analysis and data-driven decisions",
        type: "thinking",
        icon: TrendingUp,
      },
      {
        text: "Consider team dynamics and emotional impact",
        type: "feeling",
        icon: Heart,
      },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to gather information?",
    category: "information",
    options: [
      {
        text: "Focus on concrete facts and details",
        type: "sensing",
        icon: Eye,
      },
      {
        text: "Look for patterns and future possibilities",
        type: "intuitive",
        icon: Compass,
      },
      {
        text: "Rely on past experiences and proven methods",
        type: "sensing",
        icon: Shield,
      },
      {
        text: "Explore new ideas and innovative approaches",
        type: "intuitive",
        icon: Lightbulb,
      },
    ],
  },
  {
    id: 4,
    question: "When making important decisions, you typically:",
    category: "decisions",
    options: [
      {
        text: "Analyze pros and cons systematically",
        type: "thinking",
        icon: TrendingUp,
      },
      {
        text: "Consider how it affects your relationships and values",
        type: "feeling",
        icon: Heart,
      },
      {
        text: "Use logical reasoning and objective criteria",
        type: "thinking",
        icon: Puzzle,
      },
      {
        text: "Trust your gut feeling and personal values",
        type: "feeling",
        icon: Compass,
      },
    ],
  },
  {
    id: 5,
    question: "In your ideal work environment, you would:",
    category: "lifestyle",
    options: [
      {
        text: "Have a structured schedule with clear deadlines",
        type: "judging",
        icon: Calendar,
      },
      {
        text: "Enjoy flexibility and adapt to changing priorities",
        type: "perceiving",
        icon: Zap,
      },
      {
        text: "Plan everything out in advance",
        type: "judging",
        icon: Target,
      },
      {
        text: "Keep options open and decide as you go",
        type: "perceiving",
        icon: Compass,
      },
    ],
  },
  {
    id: 6,
    question: "How do you prefer to communicate with colleagues?",
    category: "communication",
    options: [
      {
        text: "Face-to-face meetings and group discussions",
        type: "extrovert",
        icon: Mic,
      },
      {
        text: "Written communication and one-on-one conversations",
        type: "introvert",
        icon: BookOpen,
      },
      {
        text: "Direct and straightforward communication",
        type: "thinking",
        icon: Target,
      },
      {
        text: "Diplomatic and considerate communication",
        type: "feeling",
        icon: Handshake,
      },
    ],
  },
  {
    id: 7,
    question: "What motivates you most in your career?",
    category: "motivation",
    options: [
      {
        text: "Achieving measurable results and goals",
        type: "thinking",
        icon: TrendingUp,
      },
      {
        text: "Making a positive impact on others",
        type: "feeling",
        icon: Heart,
      },
      {
        text: "Exploring new possibilities and innovations",
        type: "intuitive",
        icon: Lightbulb,
      },
      {
        text: "Building expertise and mastering skills",
        type: "sensing",
        icon: Award,
      },
    ],
  },
  {
    id: 8,
    question: "How do you handle stress and pressure?",
    category: "stress",
    options: [
      {
        text: "Talk it through with others",
        type: "extrovert",
        icon: Users,
      },
      {
        text: "Take time to reflect and process internally",
        type: "introvert",
        icon: Coffee,
      },
      {
        text: "Focus on practical solutions and action steps",
        type: "sensing",
        icon: Target,
      },
      {
        text: "Look for creative alternatives and new approaches",
        type: "intuitive",
        icon: Lightbulb,
      },
    ],
  },
  {
    id: 9,
    question: "When learning new skills, you prefer to:",
    category: "information",
    options: [
      {
        text: "Follow step-by-step instructions and examples",
        type: "sensing",
        icon: BookOpen,
      },
      {
        text: "Understand the big picture and underlying concepts",
        type: "intuitive",
        icon: Eye,
      },
      {
        text: "Practice hands-on with real applications",
        type: "sensing",
        icon: Laptop,
      },
      {
        text: "Experiment and discover through trial and error",
        type: "intuitive",
        icon: Puzzle,
      },
    ],
  },
  {
    id: 10,
    question: "How do you approach deadlines and time management?",
    category: "lifestyle",
    options: [
      {
        text: "Plan ahead and finish tasks early",
        type: "judging",
        icon: Calendar,
      },
      {
        text: "Work best under pressure and last-minute rushes",
        type: "perceiving",
        icon: Zap,
      },
      {
        text: "Create detailed schedules and stick to them",
        type: "judging",
        icon: Target,
      },
      {
        text: "Prefer flexible timelines and spontaneous work",
        type: "perceiving",
        icon: Compass,
      },
    ],
  },
  {
    id: 11,
    question: "In team meetings, you typically:",
    category: "communication",
    options: [
      {
        text: "Actively participate and share ideas openly",
        type: "extrovert",
        icon: Mic,
      },
      {
        text: "Listen carefully and contribute when asked",
        type: "introvert",
        icon: Eye,
      },
      {
        text: "Focus on facts, data, and logical arguments",
        type: "thinking",
        icon: TrendingUp,
      },
      {
        text: "Consider team harmony and everyone's input",
        type: "feeling",
        icon: Handshake,
      },
    ],
  },
  {
    id: 12,
    question: "What type of work environment energizes you most?",
    category: "energy",
    options: [
      {
        text: "Busy, collaborative spaces with lots of interaction",
        type: "extrovert",
        icon: Users,
      },
      {
        text: "Quiet, private spaces for focused work",
        type: "introvert",
        icon: Coffee,
      },
      {
        text: "Structured environments with clear processes",
        type: "judging",
        icon: Shield,
      },
      {
        text: "Dynamic environments with variety and change",
        type: "perceiving",
        icon: Zap,
      },
    ],
  },
]

const enhancedMentors: EnhancedMentor[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior UX Designer",
    company: "Google",
    experience: "8 years",
    rating: 4.9,
    sessions: 127,
    price: "$45/hour",
    expertise: ["UX Design", "Career Transition", "Portfolio Review", "Design Systems"],
    bio: "Passionate about helping designers grow their careers. I've worked at Google, Airbnb, and several startups.",
    education: "MS in HCI, Stanford University",
    location: "San Francisco, CA",
    languages: ["English", "Mandarin"],
    responseTime: "< 2 hours",
    icon: User,
    color: "from-pink-500 to-rose-500",
    verified: true,
    topMentor: true,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Data Science Manager",
    company: "Netflix",
    experience: "10 years",
    rating: 4.8,
    sessions: 89,
    price: "$60/hour",
    expertise: ["Data Science", "Machine Learning", "Leadership", "Python"],
    bio: "Former Microsoft and Netflix data scientist. Love helping people break into tech and advance their careers.",
    education: "PhD in Computer Science, MIT",
    location: "Seattle, WA",
    languages: ["English", "Spanish"],
    responseTime: "< 4 hours",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
    verified: true,
    topMentor: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Director",
    company: "Spotify",
    experience: "12 years",
    rating: 5.0,
    sessions: 156,
    price: "$75/hour",
    expertise: ["Product Strategy", "Team Building", "Startup Advice", "Growth"],
    bio: "Built products used by millions. Experienced in both startups and big tech. Here to help you level up!",
    education: "MBA, Wharton School",
    location: "New York, NY",
    languages: ["English", "Spanish", "Portuguese"],
    responseTime: "< 1 hour",
    icon: GraduationCap,
    color: "from-purple-500 to-indigo-500",
    verified: true,
    topMentor: true,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Engineering Manager",
    company: "Meta",
    experience: "9 years",
    rating: 4.7,
    sessions: 203,
    price: "$55/hour",
    expertise: ["Software Engineering", "Technical Leadership", "System Design", "Career Growth"],
    bio: "Passionate about mentoring engineers. I've helped 50+ people get promoted and land dream jobs.",
    education: "BS Computer Science, UC Berkeley",
    location: "Menlo Park, CA",
    languages: ["English", "Korean"],
    responseTime: "< 3 hours",
    icon: Award,
    color: "from-green-500 to-emerald-500",
    verified: true,
    topMentor: false,
  },
]

export function MentorshipScreen() {
  const { darkMode, navigateToScreen } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMentor, setSelectedMentor] = useState<EnhancedMentor | null>(null)
  const [bookingStep, setBookingStep] = useState<"select" | "book" | "confirm" | "personality">("select")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState<"video" | "chat">("video")
  const [sessionGoal, setSessionGoal] = useState("")
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([])

  // Personality test state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [personalityAnswers, setPersonalityAnswers] = useState<string[]>([])
  const [personalityResult, setPersonalityResult] = useState<string | null>(null)

  const filteredMentors = enhancedMentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const availableTimes = [
    { time: "Today 2:00 PM", available: true },
    { time: "Today 4:00 PM", available: false },
    { time: "Tomorrow 10:00 AM", available: true },
    { time: "Tomorrow 2:00 PM", available: true },
    { time: "Friday 9:00 AM", available: true },
    { time: "Friday 3:00 PM", available: true },
  ]

  const handleMentorSelect = (mentor: EnhancedMentor) => {
    setSelectedMentor(mentor)
    setBookingStep("book")
  }

  const handleBookSession = () => {
    if (selectedMentor && selectedTime && sessionGoal) {
      const newSession: BookedSession = {
        id: Date.now(),
        mentor: selectedMentor,
        time: selectedTime,
        type: sessionType,
        goal: sessionGoal,
        status: "upcoming",
      }
      setBookedSessions((prev) => [...prev, newSession])
      setBookingStep("confirm")
    }
  }

  const handleBackToMentors = () => {
    setBookingStep("select")
    setSelectedMentor(null)
    setSelectedTime("")
    setSessionGoal("")
    setSessionType("video")
  }

  const handlePersonalityAnswer = (answer: string) => {
    const newAnswers = [...personalityAnswers, answer]
    setPersonalityAnswers(newAnswers)

    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate personality result
      const result = calculatePersonalityType(newAnswers)
      setPersonalityResult(result)
    }
  }

  const calculatePersonalityType = (answers: string[]) => {
    // Count personality type preferences
    const scores: Record<string, number> = {
      extrovert: 0,
      introvert: 0,
      sensing: 0,
      intuitive: 0,
      thinking: 0,
      feeling: 0,
      judging: 0,
      perceiving: 0,
    }

    // This is a simplified calculation - in a real app, you'd map answers to types
    personalityQuestions.forEach((question, index) => {
      if (answers[index]) {
        const selectedOption = question.options.find((opt) => opt.text === answers[index])
        if (selectedOption) {
          scores[selectedOption.type]++
        }
      }
    })

    // Determine personality type
    const energy = scores.extrovert > scores.introvert ? "E" : "I"
    const information = scores.sensing > scores.intuitive ? "S" : "N"
    const decisions = scores.thinking > scores.feeling ? "T" : "F"
    const lifestyle = scores.judging > scores.perceiving ? "J" : "P"

    const typeCode = energy + information + decisions + lifestyle

    const typeDescriptions: Record<string, string> = {
      ENFP: "ENFP - The Campaigner",
      ENFJ: "ENFJ - The Protagonist",
      ENTP: "ENTP - The Debater",
      ENTJ: "ENTJ - The Commander",
      ESFP: "ESFP - The Entertainer",
      ESFJ: "ESFJ - The Consul",
      ESTP: "ESTP - The Entrepreneur",
      ESTJ: "ESTJ - The Executive",
      INFP: "INFP - The Mediator",
      INFJ: "INFJ - The Advocate",
      INTP: "INTP - The Thinker",
      INTJ: "INTJ - The Architect",
      ISFP: "ISFP - The Adventurer",
      ISFJ: "ISFJ - The Protector",
      ISTP: "ISTP - The Virtuoso",
      ISTJ: "ISTJ - The Logistician",
    }

    return typeDescriptions[typeCode] || `${typeCode} - Unique Personality`
  }

  const startPersonalityTest = () => {
    setBookingStep("personality")
    setCurrentQuestion(0)
    setPersonalityAnswers([])
    setPersonalityResult(null)
  }

  // const handleBackFromBooking = () => {
  //   setBookingStep("select")
  //   setSelectedMentor(null)
  //   setSelectedTime("")
  //   setSessionGoal("")
  // }

  // Personality Test Screen
  if (bookingStep === "personality") {
    if (personalityResult) {
      return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          <Header title="Personality Result" showBack={true} backScreen="mentorship" />
          <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Your Personality Type
            </h2>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-6 mb-6 max-w-md">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">{personalityResult}</h3>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Based on your responses, we&apos;ve identified mentors who work well with your personality type and
                communication style.
              </p>
            </div>
            <div className="space-y-3 w-full max-w-sm">
              <Button
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600"
                onClick={() => setBookingStep("select")}
              >
                Find Compatible Mentors
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl bg-transparent"
                onClick={() => navigateToScreen("home")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      )
    }

    const currentQ = personalityQuestions[currentQuestion]

    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Header
          title="Personality Test"
          showBack={true}
          backScreen="mentorship"
          rightAction={
            <Button variant="ghost" size="sm" onClick={() => setBookingStep("select")} className="text-blue-600">
              Cancel
            </Button>
          }
        />
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Question {currentQuestion + 1} of {personalityQuestions.length}
              </span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                {currentQ.category.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
            <Progress value={((currentQuestion + 1) / personalityQuestions.length) * 100} className="h-2" />
          </div>

          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-3xl mb-6`}>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {currentQ.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full p-4 h-auto text-left rounded-2xl transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "border-gray-600 hover:bg-gray-700 text-white"
                        : "border-gray-200 hover:bg-gray-50 text-gray-900"
                    }`}
                    onClick={() => handlePersonalityAnswer(option.text)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <option.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="flex-1">{option.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex space-x-3">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-2xl bg-transparent"
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1)
                  setPersonalityAnswers((prev) => prev.slice(0, -1))
                }}
              >
                Previous
              </Button>
            )}
            <Button variant="ghost" className="flex-1 h-12 rounded-2xl" onClick={() => setBookingStep("select")}>
              Skip Test
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Booking Confirmation Screen
  if (bookingStep === "confirm") {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Header
          title="Booking Confirmed"
          showBack={true}
          backScreen="home"
          rightAction={
            <Button variant="ghost" size="sm" onClick={() => navigateToScreen("home")} className="text-blue-600">
              Home
            </Button>
          }
        />
        <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Session Booked Successfully!
          </h2>
          <p className={`text-center mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Your {sessionType} session with {selectedMentor?.name} has been confirmed for {selectedTime}.
          </p>
          <div className="space-y-3 w-full max-w-sm">
            <Button
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={() => navigateToScreen("progress")}
            >
              View My Sessions
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-2xl bg-transparent" onClick={handleBackToMentors}>
              Book Another Session
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Booking Details Screen
  if (bookingStep === "book" && selectedMentor) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Header
          title="Book Session"
          showBack={true}
          backScreen="mentorship"
          rightAction={
            <Button variant="ghost" size="sm" onClick={handleBackToMentors} className="text-blue-600">
              Cancel
            </Button>
          }
        />
        <div className="p-6 space-y-6">
          {/* Enhanced Mentor Info */}
          <Card
            className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-3xl overflow-hidden`}
          >
            <div className={`h-20 bg-gradient-to-r ${selectedMentor.color}`} />
            <CardContent className="p-4 -mt-10">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${selectedMentor.color} rounded-2xl flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 flex-shrink-0`}
                >
                  <selectedMentor.icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 min-w-0 pt-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-bold text-lg truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {selectedMentor.name}
                    </h3>
                    <div className="flex space-x-1">
                      {selectedMentor.verified && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-1">Verified</Badge>
                      )}
                      {selectedMentor.topMentor && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1">Top</Badge>
                      )}
                    </div>
                  </div>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-2 text-sm truncate`}>
                    {selectedMentor.role} at {selectedMentor.company}
                  </p>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{selectedMentor.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs">{selectedMentor.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div></div>
                <p className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {selectedMentor.price}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Session Type */}
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardHeader>
              <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Session Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={sessionType === "video" ? "default" : "outline"}
                  className="h-16 rounded-2xl flex flex-col items-center justify-center space-y-2"
                  onClick={() => setSessionType("video")}
                >
                  <Video className="w-5 h-5" />
                  <span>Video Call</span>
                </Button>
                <Button
                  variant={sessionType === "chat" ? "default" : "outline"}
                  className="h-16 rounded-2xl flex flex-col items-center justify-center space-y-2"
                  onClick={() => setSessionType("chat")}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Text Chat</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Times */}
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardHeader>
              <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Available Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                {availableTimes.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    disabled={!slot.available}
                    className="h-12 rounded-2xl flex items-center justify-between px-4"
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    <span className="truncate">{slot.time}</span>
                    {!slot.available && <span className="text-xs ml-2 flex-shrink-0">Booked</span>}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Goal */}
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardHeader>
              <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Session Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What would you like to discuss in this session? (e.g., Portfolio review, Career advice, Skill development)"
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                className="rounded-2xl"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Book Button */}
          <Button
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={handleBookSession}
            disabled={!selectedTime || !sessionGoal}
          >
            Book Session - {selectedMentor.price}
          </Button>
        </div>
      </div>
    )
  }

  // Main Mentorship Screen
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header
        title="Find a Mentor"
        showBack={true}
        backScreen="home"
        rightAction={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Filter className="w-5 h-5" />
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        <Tabs defaultValue="mentors" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions ({bookedSessions.length})</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
              />
              <Input
                placeholder="Search by expertise, company, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 h-12 rounded-2xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
              />
            </div>

            {/* Featured Mentors */}
            <div className="space-y-4">
              <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Top Mentors for You
              </h2>

              {filteredMentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className={`${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                  } shadow-lg rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden group`}
                  onClick={() => handleMentorSelect(mentor)}
                >
                  <CardContent className="p-0">
                    {/* Header with gradient */}
                    <div className={`h-16 bg-gradient-to-r ${mentor.color} relative`}>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {mentor.topMentor && (
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1">Top Mentor</Badge>
                        )}
                        {mentor.verified && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-1">Verified</Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-4 -mt-8">
                      <div className="flex items-start space-x-3 mb-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${mentor.color} rounded-2xl flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                        >
                          <mentor.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0 pt-2">
                          <h3 className={`font-bold text-lg truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {mentor.name}
                          </h3>
                          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm truncate`}>
                            {mentor.role} at {mentor.company}
                          </p>
                          <div className="flex items-center space-x-3 text-xs mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{mentor.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className={`w-3 h-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{mentor.sessions}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className={`w-3 h-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                                {mentor.responseTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price and Book Button Row */}
                      <div className="flex items-center justify-between mb-4">
                        <p className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {mentor.price}
                        </p>
                        <Button size="sm" className="rounded-full px-4">
                          Book Session
                        </Button>
                      </div>

                      {/* Bio */}
                      <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {mentor.bio}
                      </p>

                      {/* Additional Info Grid */}
                      <div className="grid grid-cols-1 gap-2 mb-4 text-xs">
                        <div className="flex items-center space-x-2">
                          <GraduationCap
                            className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"} flex-shrink-0`}
                          />
                          <span className={`${darkMode ? "text-gray-300" : "text-gray-700"} truncate`}>
                            {mentor.education}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"} flex-shrink-0`} />
                          <span className={`${darkMode ? "text-gray-300" : "text-gray-700"} truncate`}>
                            {mentor.location}
                          </span>
                        </div>
                      </div>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-600 rounded-full px-2 py-1 text-xs"
                          >
                            +{mentor.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>My Sessions</h2>

            {bookedSessions.length === 0 ? (
              <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
                <CardContent className="p-8 text-center">
                  <Calendar className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    No sessions booked yet
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Book your first mentorship session to get started
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookedSessions.map((session) => (
                  <Card
                    key={session.id}
                    className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${session.mentor.color} rounded-2xl flex items-center justify-center`}
                        >
                          <session.mentor.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {session.mentor.name}
                          </h4>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {session.time} • {session.type === "video" ? "Video Call" : "Text Chat"}
                          </p>
                          <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {session.goal}
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-3xl`}>
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Discover Your Personality Type
                </h3>
                <p className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Take our comprehensive 12-question personality assessment to find mentors who match your working style
                  and communication preferences.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Better matches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Faster results</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Focused advice</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-green-500" />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Personal insights</span>
                  </div>
                </div>

                <Button
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={startPersonalityTest}
                >
                  Start Personality Test
                </Button>

                <p className={`text-xs mt-4 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                  Takes about 5-7 minutes • 12 questions • Completely free
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}

// Export both named and default exports
export default MentorshipScreen
