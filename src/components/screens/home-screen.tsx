"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Briefcase, Users, BookOpen, BarChart3, ChevronRight } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"

export function HomeScreen() {
  const { darkMode, navigateToScreen, userProgress } = useApp()

  const quickActions = [
    {
      title: "Take Assessment",
      description: "Discover your strengths",
      icon: Brain,
      gradient: "from-blue-500 to-blue-600",
      darkGradient: "from-blue-900 to-blue-800",
      screen: "test" as const,
    },
    {
      title: "Explore Careers",
      description: "Find your perfect match",
      icon: Briefcase,
      gradient: "from-purple-500 to-purple-600",
      darkGradient: "from-purple-900 to-purple-800",
      screen: "recommendations" as const,
    },
  ]

  const features = [
    {
      title: "Find a Mentor",
      description: "Connect with industry experts",
      icon: Users,
      gradient: "from-green-400 to-blue-500",
      screen: "mentorship" as const,
    },
    {
      title: "Skill Development",
      description: "Bridge your skill gaps",
      icon: BookOpen,
      gradient: "from-orange-400 to-red-500",
      screen: "skill-gap" as const,
    },
    {
      title: "Track Progress",
      description: "Monitor your journey",
      icon: BarChart3,
      gradient: "from-pink-400 to-purple-500",
      screen: "progress" as const,
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header title="Good morning, Alex! 👋" showProfile={true} showDarkMode={true} />

      <div className="p-6 space-y-6">
        {/* Progress Card */}
        <Card
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-3xl overflow-hidden`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Your Journey</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 rounded-full">
                {userProgress}% Complete
              </Badge>
            </div>
            <Progress value={userProgress} className="mb-3" />
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Complete your assessment to unlock personalized recommendations
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className={`${
                darkMode ? `bg-gradient-to-br ${action.darkGradient}` : `bg-gradient-to-br ${action.gradient}`
              } border-0 shadow-lg rounded-3xl cursor-pointer transition-transform duration-300 hover:scale-105`}
              onClick={() => navigateToScreen(action.screen)}
            >
              <CardContent className="p-6 text-center text-white">
                <action.icon className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Explore More</h3>

          {features.map((feature, index) => (
            <Card
              key={index}
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
              } shadow-sm rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg`}
              onClick={() => navigateToScreen(feature.screen)}
            >
              <CardContent className="p-4 flex items-center space-x-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{feature.title}</h4>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{feature.description}</p>
                </div>
                <ChevronRight className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
