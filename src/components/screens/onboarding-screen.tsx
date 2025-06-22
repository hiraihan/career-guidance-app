"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Brain, Briefcase, Users } from "lucide-react"
import { useApp } from "../../contexts/app-context"

export function OnboardingScreen() {
  const { darkMode, navigateToScreen } = useApp()

  const features = [
    {
      icon: Brain,
      title: "Personality Assessment",
      description: "Discover your strengths & interests",
      gradient: "from-green-400 to-blue-500",
    },
    {
      icon: Briefcase,
      title: "Career Matching",
      description: "Get personalized career recommendations",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Connect with industry professionals",
      gradient: "from-orange-400 to-red-500",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Target className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>CareerCompass</h1>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-sm`}>
            Discover your perfect career path with AI-powered guidance
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{feature.title}</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => navigateToScreen("home")}
          className="w-full max-w-sm h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
