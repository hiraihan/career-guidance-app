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
} from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"
import { AnimatedCounter } from "../ui/animated-counter"
import { AchievementCelebration } from "../ui/achievement-celebration"
import { SkillRadarChart } from "../ui/skill-radar-chart"

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

      <Header title="Good morning, Alex! 👋" showProfile={true} showDarkMode={true} />

      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 relative">
        {/* Gamification Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <Card
            className={`${darkMode ? "bg-gray-800/60 border-gray-700/50 backdrop-blur-xl" : "bg-white/70 border-white/20 backdrop-blur-xl"} shadow-lg rounded-2xl`}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-yellow-500 mr-1" />
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Streak</span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                <AnimatedCounter end={streak} suffix=" days" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${darkMode ? "bg-gray-800/60 border-gray-700/50 backdrop-blur-xl" : "bg-white/70 border-white/20 backdrop-blur-xl"} shadow-lg rounded-2xl`}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-purple-500 mr-1" />
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total XP</span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                <AnimatedCounter end={totalXP} />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${darkMode ? "bg-gray-800/60 border-gray-700/50 backdrop-blur-xl" : "bg-white/70 border-white/20 backdrop-blur-xl"} shadow-lg rounded-2xl`}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Level</span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                <AnimatedCounter end={Math.floor(totalXP / 500) + 1} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Progress Card with Skill Radar */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800/60 border-gray-700/50 backdrop-blur-xl"
              : "bg-white/70 border-white/20 backdrop-blur-xl"
          } shadow-2xl rounded-3xl overflow-hidden relative group hover:shadow-3xl transition-all duration-500`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-6 sm:p-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Your Journey</h3>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Keep up the great work!
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-0 px-3 py-1 rounded-full"
                  >
                    <AnimatedCounter end={userProgress} suffix="% Complete" />
                  </Badge>
                </div>

                <div className="space-y-4">
                  <Progress
                    value={userProgress}
                    className={`h-3 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden`}
                  />
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    You&apos;re making excellent progress! Complete your assessment to unlock personalized recommendations
                    and accelerate your career growth.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <h4 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Skill Overview</h4>
                  <SkillRadarChart skills={skillData} size={180} />
                  <div className="flex items-center justify-center mt-4 space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Current</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 border-2 border-purple-500 border-dashed rounded-full" />
                      <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Target</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className={`${
                darkMode
                  ? "bg-gray-800/60 border-gray-700/50 backdrop-blur-xl hover:bg-gray-800/80"
                  : "bg-white/70 border-white/20 backdrop-blur-xl hover:bg-white/90"
              } shadow-xl rounded-3xl cursor-pointer group hover:scale-105 hover:shadow-2xl transition-all duration-500 ${action.glow} relative overflow-hidden`}
              onClick={() => navigateToScreen(action.screen)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${darkMode ? action.darkGradient : action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-0">
                      {action.xp}
                    </Badge>
                    <ChevronRight
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"} group-hover:translate-x-1 transition-transform duration-300`}
                    />
                  </div>
                </div>
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={`${
                darkMode
                  ? "bg-gray-800/60 border-gray-700/50 backdrop-blur-xl hover:bg-gray-800/80"
                  : "bg-white/70 border-white/20 backdrop-blur-xl hover:bg-white/90"
              } shadow-lg rounded-2xl cursor-pointer group hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
              onClick={() => navigateToScreen(feature.screen)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {feature.badge && (
                      <Badge className={`text-xs ${feature.badgeColor} border-0 px-2 py-1 rounded-full`}>
                        {feature.badge}
                      </Badge>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"} group-hover:translate-x-1 transition-transform duration-300`}
                    />
                  </div>
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>{feature.description}</p>
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-0">
                  {feature.xp}
                </Badge>
              </CardContent>
            </Card>
          ))}
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
