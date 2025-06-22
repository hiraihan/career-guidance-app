"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Lightbulb, Briefcase, BookOpen, Users } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function AIAdvisorScreen() {
  const { darkMode } = useApp()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hi! I'm your AI Career Advisor. I'm here to help you with career guidance, skill development, and job search strategies. What would you like to discuss today?",
      timestamp: new Date(),
      suggestions: [
        "Help me choose between careers",
        "What skills should I develop?",
        "How to prepare for interviews?",
        "Salary negotiation tips",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses: { [key: string]: string } = {
    career:
      "Based on your assessment results, I see you have strong analytical skills and enjoy creative problem-solving. Have you considered UX Research or Product Management? These roles combine analytical thinking with creative strategy.",
    skills:
      "For your target career in UX Design, I recommend focusing on: 1) User Research Methods 2) Prototyping Tools (Figma, Sketch) 3) Design Systems 4) Data Analysis. Would you like specific course recommendations for any of these?",
    interview:
      "Great question! For UX interviews, prepare for: 1) Portfolio presentation (15-20 min) 2) Design challenges 3) Behavioral questions 4) Questions about your process. Practice explaining your design decisions clearly.",
    salary:
      "Research shows UX Designers in your area earn $65k-$95k. For negotiation: 1) Research market rates 2) Document your achievements 3) Practice your pitch 4) Consider total compensation, not just salary.",
    default:
      "That's an interesting question! Based on your profile and career goals, I'd suggest exploring this further. Would you like me to connect you with a mentor who specializes in this area, or shall we dive deeper into specific aspects?",
  }

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    if (message.includes("career") || message.includes("job") || message.includes("choose")) {
      return aiResponses.career
    } else if (message.includes("skill") || message.includes("learn") || message.includes("develop")) {
      return aiResponses.skills
    } else if (message.includes("interview") || message.includes("prepare")) {
      return aiResponses.interview
    } else if (message.includes("salary") || message.includes("negotiate") || message.includes("pay")) {
      return aiResponses.salary
    } else {
      return aiResponses.default
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "Show me relevant courses",
          "Connect me with a mentor",
          "What's the next step?",
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const quickActions = [
    { icon: Briefcase, label: "Career Match", message: "What careers match my profile?" },
    { icon: BookOpen, label: "Skill Gap", message: "What skills should I develop?" },
    { icon: Users, label: "Find Mentor", message: "Help me find the right mentor" },
    { icon: Lightbulb, label: "Interview Prep", message: "How should I prepare for interviews?" },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header title="AI Career Advisor" showBack={true} backScreen="home" />

      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.type === "ai" ? "bg-blue-100" : "bg-purple-100"}>
                    {message.type === "ai" ? (
                      <Bot className="w-4 h-4 text-blue-600" />
                    ) : (
                      <User className="w-4 h-4 text-purple-600" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl p-4 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : darkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white shadow-sm"
                  }`}
                >
                  <p
                    className={`text-sm ${message.type === "ai" && darkMode ? "text-white" : message.type === "ai" ? "text-gray-900" : ""}`}
                  >
                    {message.content}
                  </p>
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 rounded-full"
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
                  <AvatarFallback className="bg-blue-100">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-sm"}`}
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
        {messages.length === 1 && (
          <div className="p-6 pt-0">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 rounded-2xl flex flex-col items-center space-y-2"
                  onClick={() => handleSuggestionClick(action.message)}
                >
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 pt-0">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about your career..."
              className={`flex-1 h-12 rounded-2xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
