"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  User,
  Briefcase,
  BookOpen,
  Users,
  Brain,
  Target,
  TrendingUp,
  Share2,
  Volume2,
  VolumeX,
  Bot,
} from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
  isStreaming?: boolean
  metadata?: {
    confidence: number
    category: string
    actionable: boolean
  }
}

interface AIPersonality {
  name: string
  avatar: string
  specialty: string
  tone: string
  color: string
}

const AI_PERSONALITIES: AIPersonality[] = [
  {
    name: "Alex",
    avatar: "🤖",
    specialty: "General Career Guidance",
    tone: "Friendly & Supportive",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Maya",
    avatar: "👩‍💼",
    specialty: "Leadership & Strategy",
    tone: "Professional & Direct",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Sam",
    avatar: "👨‍💻",
    specialty: "Tech & Innovation",
    tone: "Casual & Innovative",
    color: "from-green-500 to-blue-500",
  },
  {
    name: "Jordan",
    avatar: "🎯",
    specialty: "Goal Setting & Motivation",
    tone: "Energetic & Inspiring",
    color: "from-orange-500 to-red-500",
  },
]

export function AIAdvisorScreen() {
  const { darkMode } = useApp()
  const [isMuted, setIsMuted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hi! I'm Alex, your AI Career Advisor. I've analyzed your profile and I'm excited to help you accelerate your career journey. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my career compatibility",
        "Create a personalized learning path",
        "Help me prepare for interviews",
        "Salary negotiation strategies",
      ],
      metadata: {
        confidence: 0.95,
        category: "greeting",
        actionable: true,
      },
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedPersonality, setSelectedPersonality] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const getAIResponse = useCallback((userMessage: string): { content: string; metadata: Message["metadata"] } => {
    const message = userMessage.toLowerCase()

    const responses = {
      career: [
        "Based on your assessment results and current market trends, I see exceptional potential in UX Research and Product Strategy. Your analytical mindset combined with creative problem-solving puts you in the top 15% of candidates for these roles.",
        "Let me analyze your profile deeper... Your personality type and skill set suggest you'd thrive in roles that combine creativity with data-driven decision making. Have you considered Product Management at a tech startup?",
      ],
      skills: [
        "I've identified 3 critical skill gaps that, once filled, could increase your market value by 40-60%. Let me prioritize them: 1) Advanced Data Analysis 2) Design Systems 3) Strategic Thinking. Shall I create a learning path?",
        "Your current skill portfolio is solid, but here's where you can gain a competitive edge... Focus on these emerging skills that 89% of your target roles require.",
      ],
      interview: [
        "Let's prepare you to ace those interviews! I'll create a personalized prep plan based on your target companies. We'll cover behavioral questions, technical challenges, and salary negotiation tactics.",
        "Great question! For UX roles, expect these interview formats: Portfolio presentation (20 min), Design challenge (2-3 hours), Cultural fit interview (30 min).",
      ],
      default: [
        "That's a fascinating question! Let me think about this from multiple angles... Based on current industry trends and your unique profile, here's my perspective...",
        "I love how you're thinking about this! Your question shows deep strategic thinking. Here's what the data tells us...",
      ],
    }

    let selectedResponses = responses.default
    let category = "general"
    let confidence = 0.75

    if (message.includes("career") || message.includes("job")) {
      selectedResponses = responses.career
      category = "career_analysis"
      confidence = 0.92
    } else if (message.includes("skill") || message.includes("learn")) {
      selectedResponses = responses.skills
      category = "skill_development"
      confidence = 0.88
    } else if (message.includes("interview") || message.includes("prepare")) {
      selectedResponses = responses.interview
      category = "interview_prep"
      confidence = 0.9
    }

    const randomResponse = selectedResponses[Math.floor(Math.random() * selectedResponses.length)]

    return {
      content: randomResponse,
      metadata: {
        confidence,
        category,
        actionable: true,
      },
    }
  }, [])

  const simulateStreamingResponse = useCallback(async (content: string, messageId: number) => {
    const words = content.split(" ")
    let currentContent = ""

    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? " " : "") + words[i]

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentContent, isStreaming: i < words.length - 1 } : msg,
        ),
      )

      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
    }

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                isStreaming: false,
                suggestions: [
                  "Tell me more about this",
                  "Show me relevant resources",
                  "Create an action plan",
                  "Connect me with a mentor",
                ],
              }
            : msg,
        ),
      )
    }, 500)
  }, [])

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputMessage
    setInputMessage("")
    setIsTyping(true)

    setTimeout(
      async () => {
        setIsTyping(false)

        const { content, metadata } = getAIResponse(currentInput)
        const aiMessageId = Date.now() + 1

        const aiMessage: Message = {
          id: aiMessageId,
          type: "ai",
          content: "",
          timestamp: new Date(),
          isStreaming: true,
          metadata,
        }

        setMessages((prev) => [...prev, aiMessage])
        await simulateStreamingResponse(content, aiMessageId)
      },
      1000 + Math.random() * 1000,
    )
  }, [inputMessage, getAIResponse, simulateStreamingResponse])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputMessage(suggestion)
  }, [])

  const handlePersonalityChange = useCallback((index: number) => {
    setSelectedPersonality(index)

    const personality = AI_PERSONALITIES[index]
    const welcomeMessage: Message = {
      id: Date.now(),
      type: "ai",
      content: `Hi! I'm ${personality.name}, your ${personality.specialty} advisor. My approach is ${personality.tone.toLowerCase()}. How can I help you today?`,
      timestamp: new Date(),
      suggestions: [
        `Help me with ${personality.specialty.toLowerCase()}`,
        "What's your expertise?",
        "Give me personalized advice",
        "Show me success strategies",
      ],
      metadata: {
        confidence: 0.95,
        category: "personality_switch",
        actionable: true,
      },
    }

    setMessages((prev) => [...prev, welcomeMessage])
  }, [])

  const shareConversation = useCallback(() => {
    const conversationText = messages.map((msg) => `${msg.type === "user" ? "You" : "AI"}: ${msg.content}`).join("\n\n")

    if (navigator.share) {
      navigator.share({
        title: "My Career Advice Session",
        text: conversationText,
      })
    } else {
      navigator.clipboard.writeText(conversationText)
    }
  }, [messages])

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted)
  }, [isMuted])

  const quickActions = [
    {
      icon: Briefcase,
      label: "Career Match",
      message: "Analyze my career compatibility with current market trends",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      label: "Learning Path",
      message: "Create a personalized learning roadmap for my goals",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: Users,
      label: "Find Mentor",
      message: "Help me find the perfect mentor for my career stage",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Target,
      label: "Goal Setting",
      message: "Help me set SMART career goals for the next 6 months",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      label: "Market Insights",
      message: "What are the latest trends in my industry?",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Brain,
      label: "Skill Analysis",
      message: "Analyze my skill gaps and recommend improvements",
      color: "from-pink-500 to-rose-500",
    },
  ]

  const currentPersonality = AI_PERSONALITIES[selectedPersonality]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header
        title="AI Career Advisor"
        showBack={true}
        backScreen="home"
        rightAction={
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={shareConversation} className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute} className="rounded-full">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        }
      />

      {/* AI Personality Selector */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {AI_PERSONALITIES.map((personality, index) => (
            <Button
              key={index}
              variant={selectedPersonality === index ? "default" : "outline"}
              size="sm"
              onClick={() => handlePersonalityChange(index)}
              className={`flex-shrink-0 rounded-full ${
                selectedPersonality === index ? `bg-gradient-to-r ${personality.color} text-white border-0` : ""
              }`}
            >
              <span className="mr-2">{personality.avatar}</span>
              {personality.name}
            </Button>
          ))}
        </div>
        <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {currentPersonality.specialty} • {currentPersonality.tone}
        </p>
      </div>

      <div className="flex flex-col h-[calc(100vh-160px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback
                    className={`${message.type === "ai" ? `bg-gradient-to-r ${currentPersonality.color}` : "bg-purple-100"} text-white`}
                  >
                    {message.type === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4 text-purple-600" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl p-4 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : darkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white shadow-sm border"
                  } relative`}
                >
                  {message.metadata && message.type === "ai" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(message.metadata.confidence * 100)}% confidence
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {message.metadata.category.replace("_", " ")}
                      </Badge>
                    </div>
                  )}

                  <p
                    className={`text-sm ${message.type === "ai" && darkMode ? "text-white" : message.type === "ai" ? "text-gray-900" : ""}`}
                  >
                    {message.content}
                    {message.isStreaming && <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />}
                  </p>

                  {message.suggestions && !message.isStreaming && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 rounded-full hover:scale-105 transition-transform"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={`bg-gradient-to-r ${currentPersonality.color} text-white`}>
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-sm border"}`}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-16 rounded-2xl flex flex-col items-center justify-center space-y-1 hover:scale-105 transition-all duration-300 bg-gradient-to-r ${action.color} text-white border-0 hover:shadow-lg`}
                  onClick={() => handleSuggestionClick(action.message)}
                >
                  <action.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 pt-0">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask ${currentPersonality.name} anything about your career...`}
              className={`flex-1 h-12 rounded-2xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
