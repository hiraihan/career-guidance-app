"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Briefcase,
  Users,
  BookOpen,
  BarChart3,
  ChevronRight,
  MessageCircle,
  Bell,
  Sparkles,
  Trophy,
  Zap,
  TrendingUp,
  PieChart,
  Compass,
} from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"
import { AnimatedCounter } from "../ui/animated-counter"
import { AchievementCelebration } from "../ui/achievement-celebration"

interface Achievement {
  id: number
  title: string
  description: string
  points: number
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export function HomeScreen() {
  const { darkMode, navigateToScreen, userProgress } = useApp()
  const [showAchievement, setShowAchievement] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)
  const [achievementShown, setAchievementShown] = useState(false)
  const [streak] = useState(7)
  const [totalXP] = useState(1250)

  const handleCloseAchievement = useCallback(() => {
    setShowAchievement(false)
    setCurrentAchievement(null)
  }, [])

  // Show achievement only once per session
  useEffect(() => {
    if (!achievementShown) {
      const timer = setTimeout(() => {
        setCurrentAchievement({
          id: 1,
          title: "Career Explorer",
          description: "You've explored 5 different career paths! Keep discovering new opportunities.",
          points: 150,
          icon: "trophy",
          rarity: "rare",
        })
        setShowAchievement(true)
        setAchievementShown(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [achievementShown])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const skillData = [
    { skill: "Design", current: 85, target: 95, color: "#3b82f6" },
    { skill: "Research", current: 60, target: 85, color: "#8b5cf6" },
    { skill: "Prototyping", current: 75, target: 90, color: "#06b6d4" },
    { skill: "Strategy", current: 45, target: 80, color: "#f59e0b" },
    { skill: "Leadership", current: 30, target: 70, color: "#ef4444" },
  ]

  const quickActions = [
    {
      title: "Take Assessment",
      description: "Discover your strengths",
      icon: Brain,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      darkGradient: "from-blue-900 via-blue-800 to-indigo-900",
      screen: "test" as const,
      glow: "shadow-blue-500/25",
      xp: "+50 XP",
    },
    {
      title: "Explore Careers",
      description: "Find your perfect match",
      icon: Briefcase,
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      darkGradient: "from-purple-900 via-purple-800 to-pink-900",
      screen: "recommendations" as const,
      glow: "shadow-purple-500/25",
      xp: "+25 XP",
    },
  ]

  const features = [
    {
      title: "Find a Mentor",
      description: "Connect with industry experts",
      icon: Users,
      gradient: "from-emerald-400 to-cyan-500",
      screen: "mentorship" as const,
      badge: "Popular",
      badgeColor: "bg-emerald-100 text-emerald-700",
      xp: "+75 XP",
    },
    {
      title: "Skill Development",
      description: "Bridge your skill gaps",
      icon: BookOpen,
      gradient: "from-orange-400 to-red-500",
      screen: "skill-gap" as const,
      badge: "New",
      badgeColor: "bg-orange-100 text-orange-700",
      xp: "+100 XP",
    },
    {
      title: "Track Progress",
      description: "Monitor your journey",
      icon: BarChart3,
      gradient: "from-pink-400 to-purple-500",
      screen: "progress" as const,
      xp: "+30 XP",
    },
    {
      title: "AI Career Advisor",
      description: "Get instant career advice",
      icon: MessageCircle,
      gradient: "from-blue-400 to-cyan-500",
      screen: "ai-advisor" as const,
      badge: "AI",
      badgeColor: "bg-blue-100 text-blue-700",
      xp: "+40 XP",
    },
    {
      title: "Job Applications",
      description: "Track your applications",
      icon: Briefcase,
      gradient: "from-violet-400 to-indigo-500",
      screen: "job-tracker" as const,
      xp: "+60 XP",
    },
    {
      title: "Analytics Dashboard",
      description: "View detailed insights",
      icon: PieChart,
      gradient: "from-indigo-400 to-purple-500",
      screen: "analytics" as const,
      badge: "Pro",
      badgeColor: "bg-indigo-100 text-indigo-700",
      xp: "+20 XP",
    },
    {
      title: "Notifications",
      description: "Stay updated on your journey",
      icon: Bell,
      gradient: "from-rose-400 to-pink-500",
      screen: "notifications" as const,
      xp: "+20 XP",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-900 to-slate-900" : "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30"} pb-20 relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <Header
        title={
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center relative">
              <Compass className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-yellow-800" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CareerCompass
              </h1>
              <p className="text-xs text-gray-500">Good morning, Alex! 👋</p>
            </div>
          </div>
        }
        showProfile={true}
        showDarkMode={true}
      />

      <div className="p-4 sm:p-6 space-y-8 relative">
        {/* Hero Stats - Improved */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Zap, label: "Streak", value: streak, suffix: " days", color: "from-yellow-400 to-orange-500" },
            { icon: Trophy, label: "Total XP", value: totalXP, suffix: "", color: "from-purple-400 to-pink-500" },
            {
              icon: TrendingUp,
              label: "Level",
              value: Math.floor(totalXP / 500) + 1,
              suffix: "",
              color: "from-green-400 to-blue-500",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`${darkMode ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-white/20"} backdrop-blur-xl shadow-xl rounded-3xl hover:scale-105 transition-all duration-300 group`}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Progress Card - Redesigned */}
        <Card
          className={`${darkMode ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-white/20"} backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative group`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-8 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold text-2xl ${darkMode ? "text-white" : "text-gray-900"} mb-1`}>
                    Your Journey
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>You&apos;re doing amazing! 🚀</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-1`}>
                  <AnimatedCounter end={userProgress} suffix="%" />
                </div>
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0 px-3 py-1 rounded-full">
                  Complete
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <Progress value={userProgress} className="h-4 rounded-full" />
              <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                You&apos;re making excellent progress! Complete your assessment to unlock personalized recommendations and
                accelerate your career growth.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Improved Layout */}
        <div className="space-y-4">
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className={`${darkMode ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-white/20"} backdrop-blur-xl shadow-xl rounded-3xl cursor-pointer group hover:scale-105 hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
                onClick={() => navigateToScreen(action.screen)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-xl mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {action.title}
                      </h3>
                      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-3`}>{action.description}</p>
                      <Badge className="bg-green-100 text-green-700 border-0 px-3 py-1 rounded-full">{action.xp}</Badge>
                    </div>
                    <ChevronRight
                      className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-500"} group-hover:translate-x-2 transition-transform duration-300`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Grid - Better Organization */}
        <div className="space-y-4">
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>Explore Features</h2>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className={`${darkMode ? "bg-gray-800/80 border-gray-700/50" : "bg-white/80 border-white/20"} backdrop-blur-xl shadow-lg rounded-3xl cursor-pointer group hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                onClick={() => navigateToScreen(feature.screen)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <CardContent className="p-6 relative text-center">
                  <div
                    className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{feature.title}</h3>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mb-3 line-clamp-2`}>
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-700 border-0 text-xs px-2 py-1 rounded-full">
                      {feature.xp}
                    </Badge>
                    {feature.badge && (
                      <Badge className={`${feature.badgeColor} border-0 text-xs px-2 py-1 rounded-full`}>
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />

      {/* Achievement Celebration - Only show once */}
      {showAchievement && currentAchievement && (
        <AchievementCelebration achievement={currentAchievement} onCloseAction={handleCloseAchievement} />
      )}
    </div>
  )
}

// Export both named and default exports
export default HomeScreen
