"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Briefcase, Users, Compass, Sparkles } from "lucide-react"
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
          <div className="relative mb-4">
            {/* New Logo Design - Smaller */}
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl rotate-6 opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="relative">
                  <Compass className="w-12 h-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-yellow-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements - smaller */}
            <div className="absolute top-0 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-bounce delay-1000"></div>
            <div className="absolute top-6 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-bounce delay-2000"></div>
          </div>

          <h1
            className={`text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}
          >
            CareerCompass
          </h1>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-sm leading-relaxed`}>
            Navigate your career journey with AI-powered guidance and expert mentorship
          </p>
        </div>

        <div className="space-y-6 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-5 group hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"} mb-1`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                  {feature.description}
                </p>
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
