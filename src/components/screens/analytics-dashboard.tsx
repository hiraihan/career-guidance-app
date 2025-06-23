"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Users, Clock, Target, Brain, Zap, Award } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"
import { AnimatedCounter } from "../ui/animated-counter"
import { SkillRadarChart } from "../ui/skill-radar-chart"

interface AnalyticsData {
  overview: {
    totalSessions: number
    avgSessionTime: number
    completionRate: number
    streakDays: number
    totalXP: number
    level: number
  }
  engagement: {
    dailyActive: number[]
    weeklyActive: number[]
    monthlyActive: number[]
    featureUsage: Record<string, number>
    timeSpent: Record<string, number>
  }
  progress: {
    skillsImproved: number
    coursesCompleted: number
    mentorSessions: number
    jobApplications: number
    achievementsUnlocked: number
  }
  insights: {
    mostActiveTime: string
    preferredLearningStyle: string
    strongestSkills: string[]
    improvementAreas: string[]
    careerReadiness: number
  }
}

export function AnalyticsDashboard() {
  const { darkMode, navigateToScreen } = useApp()
  const [timeRange, setTimeRange] = useState("7d")
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalyticsData({
        overview: {
          totalSessions: 47,
          avgSessionTime: 12.5,
          completionRate: 78,
          streakDays: 7,
          totalXP: 1250,
          level: 3,
        },
        engagement: {
          dailyActive: [12, 15, 8, 22, 18, 25, 20],
          weeklyActive: [85, 92, 78, 95],
          monthlyActive: [320, 340, 365],
          featureUsage: {
            "Career Exploration": 35,
            "Skill Assessment": 28,
            Mentorship: 15,
            "Job Tracking": 12,
            "AI Advisor": 22,
          },
          timeSpent: {
            Monday: 45,
            Tuesday: 32,
            Wednesday: 28,
            Thursday: 55,
            Friday: 38,
            Saturday: 25,
            Sunday: 15,
          },
        },
        progress: {
          skillsImproved: 8,
          coursesCompleted: 3,
          mentorSessions: 2,
          jobApplications: 5,
          achievementsUnlocked: 12,
        },
        insights: {
          mostActiveTime: "Thursday 2-4 PM",
          preferredLearningStyle: "Visual & Interactive",
          strongestSkills: ["Design Thinking", "Communication", "Problem Solving"],
          improvementAreas: ["Data Analysis", "Leadership", "Technical Skills"],
          careerReadiness: 72,
        },
      })
      setIsLoading(false)
    }, 1500)
  }, [timeRange])

  if (isLoading || !analyticsData) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>Loading your analytics...</p>
        </div>
      </div>
    )
  }

  const skillData = [
    { skill: "Design", current: 85, target: 95, color: "#3b82f6" },
    { skill: "Research", current: 60, target: 85, color: "#8b5cf6" },
    { skill: "Strategy", current: 45, target: 80, color: "#f59e0b" },
    { skill: "Leadership", current: 30, target: 70, color: "#ef4444" },
    { skill: "Technical", current: 55, target: 85, color: "#06b6d4" },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header
        title="Analytics Dashboard"
        showBack={true}
        backScreen="home"
        rightAction={
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-20 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7D</SelectItem>
              <SelectItem value="30d">30D</SelectItem>
              <SelectItem value="90d">90D</SelectItem>
              <SelectItem value="1y">1Y</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Avg Session
                </span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                <AnimatedCounter end={analyticsData.overview.avgSessionTime} suffix="m" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-green-500 mr-2" />
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Completion
                </span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                <AnimatedCounter end={analyticsData.overview.completionRate} suffix="%" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Streak</span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                <AnimatedCounter end={analyticsData.overview.streakDays} suffix=" days" />
              </div>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-purple-500 mr-2" />
                <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Level</span>
              </div>
              <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                <AnimatedCounter end={analyticsData.overview.level} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="engagement" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="engagement" className="text-xs">
              Engagement
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs">
              Progress
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              Skills
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-4">
            {/* Feature Usage Chart */}
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
              <CardHeader>
                <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Feature Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analyticsData.engagement.featureUsage).map(([feature, usage]) => (
                    <div key={feature} className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{feature}</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-24 h-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden`}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                            style={{ width: `${usage}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {usage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Activity */}
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
              <CardHeader>
                <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Daily Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32 space-x-2">
                  {analyticsData.engagement.dailyActive.map((activity, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-1000 hover:scale-105"
                        style={{ height: `${(activity / Math.max(...analyticsData.engagement.dailyActive)) * 100}%` }}
                      />
                      <span className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(analyticsData.progress).map(([key, value]) => (
                <Card
                  key={key}
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      {key === "skillsImproved" && <Brain className="w-6 h-6 text-white" />}
                      {key === "coursesCompleted" && <Target className="w-6 h-6 text-white" />}
                      {key === "mentorSessions" && <Users className="w-6 h-6 text-white" />}
                      {key === "jobApplications" && <BarChart3 className="w-6 h-6 text-white" />}
                      {key === "achievementsUnlocked" && <Award className="w-6 h-6 text-white" />}
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      <AnimatedCounter end={value} />
                    </div>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
              <CardHeader>
                <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Skill Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <SkillRadarChart skills={skillData} size={250} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Strongest Skills
                    </h4>
                    <div className="space-y-2">
                      {analyticsData.insights.strongestSkills.map((skill, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800 rounded-full">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Improvement Areas
                    </h4>
                    <div className="space-y-2">
                      {analyticsData.insights.improvementAreas.map((area, index) => (
                        <Badge key={index} className="bg-orange-100 text-orange-800 rounded-full">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
                <CardHeader>
                  <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Career Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      <AnimatedCounter end={analyticsData.insights.careerReadiness} suffix="%" />
                    </div>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      You&apos;re {analyticsData.insights.careerReadiness}% ready for your target career
                    </p>
                  </div>
                  <div
                    className={`w-full h-4 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-2000"
                      style={{ width: `${analyticsData.insights.careerReadiness}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-2xl`}>
                <CardHeader>
                  <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Personal Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Most Active Time</p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {analyticsData.insights.mostActiveTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Learning Style</p>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {analyticsData.insights.preferredLearningStyle}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${darkMode ? "bg-gradient-to-r from-blue-900/60 to-purple-900/60 border-blue-700/50" : "bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-blue-200/50"} shadow-lg rounded-2xl`}
              >
                <CardContent className="p-6 text-center">
                  <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    AI Recommendation
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Based on your activity patterns, focus on skill development during your peak hours (Thursday 2-4 PM)
                    and consider booking a mentor session to accelerate your progress in Data Analysis.
                  </p>
                  <Button
                    className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl"
                    onClick={() => navigateToScreen("mentorship")}
                  >
                    Book Mentor Session
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}
