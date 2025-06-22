"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Award, Briefcase, Heart, Target, CheckCircle, Clock, BookOpen, Users } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"
import { careers } from "../../data/app-data"

export function ProgressScreen() {
  const { darkMode, navigateToScreen, setSelectedCareer, savedCareers, userProgress } = useApp()

  const achievements = [
    {
      id: 1,
      title: "Assessment Complete",
      description: "Completed personality and interest assessment",
      icon: Award,
      color: "from-yellow-400 to-orange-500",
      date: "2 days ago",
      points: 100,
      unlocked: true,
    },
    {
      id: 2,
      title: "First Career Match",
      description: "Found 3 careers with 85%+ compatibility",
      icon: Briefcase,
      color: "from-blue-400 to-purple-500",
      date: "1 day ago",
      points: 150,
      unlocked: true,
    },
    {
      id: 3,
      title: "Skill Explorer",
      description: "Analyzed skill gaps for career readiness",
      icon: Target,
      color: "from-green-400 to-blue-500",
      date: "Today",
      points: 200,
      unlocked: true,
    },
    {
      id: 4,
      title: "Mentor Connection",
      description: "Book your first mentorship session",
      icon: Users,
      color: "from-purple-400 to-pink-500",
      date: "Locked",
      points: 250,
      unlocked: false,
    },
    {
      id: 5,
      title: "Course Completion",
      description: "Complete your first recommended course",
      icon: BookOpen,
      color: "from-indigo-400 to-purple-500",
      date: "Locked",
      points: 300,
      unlocked: false,
    },
  ]

  const milestones = [
    { title: "Complete Assessment", completed: true, date: "Dec 20" },
    { title: "Explore 5 Careers", completed: true, date: "Dec 21" },
    { title: "Save 3 Careers", completed: true, date: "Dec 22" },
    { title: "Book First Mentor Session", completed: false, date: "Pending" },
    { title: "Complete First Course", completed: false, date: "Pending" },
    { title: "Update Resume", completed: false, date: "Pending" },
    { title: "Apply to First Job", completed: false, date: "Pending" },
  ]

  const savedCareersList = careers.filter((career) => savedCareers.includes(career.id))

  const totalPoints = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header title="Your Progress" showBack={true} backScreen="home" />

      <div className="p-6 space-y-6">
        {/* Overall Progress */}
        <Card
          className={`${
            darkMode ? "bg-gradient-to-br from-purple-900 to-pink-900" : "bg-gradient-to-br from-purple-500 to-pink-600"
          } border-0 shadow-lg rounded-3xl text-white`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Career Journey</h2>
              <BarChart3 className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{userProgress}%</span>
              </div>
              <Progress value={userProgress} className="bg-white/20" />
              <div className="flex justify-between items-center">
                <p className="text-sm opacity-90">Great progress! You&apos;ve completed 8 out of 11 milestones.</p>
                <div className="text-right">
                  <p className="text-sm opacity-75">Total Points</p>
                  <p className="font-bold text-lg">{totalPoints}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="saved">Saved ({savedCareersList.length})</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Recent Achievements
              </h3>
              <Badge className="bg-purple-100 text-purple-800 rounded-full">
                {achievements.filter((a) => a.unlocked).length}/{achievements.length}
              </Badge>
            </div>

            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                } shadow-sm rounded-2xl ${achievement.unlocked ? "" : "opacity-60"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center`}
                    >
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {achievement.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                          {achievement.date}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          +{achievement.points} pts
                        </Badge>
                      </div>
                    </div>
                    {achievement.unlocked ? (
                      <Badge className="bg-green-100 text-green-800 rounded-full">Unlocked</Badge>
                    ) : (
                      <Badge variant="outline" className="rounded-full">
                        Locked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Saved Careers</h3>

            {savedCareersList.length === 0 ? (
              <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
                <CardContent className="p-8 text-center">
                  <Heart className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    No saved careers yet
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Save careers you&apos;re interested in to track them here
                  </p>
                  <Button className="rounded-2xl" onClick={() => navigateToScreen("recommendations")}>
                    Explore Careers
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {savedCareersList.map((career) => (
                  <Card
                    key={career.id}
                    className={`${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                    } shadow-sm rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg`}
                    onClick={() => {
                      setSelectedCareer(career)
                      navigateToScreen("career-detail")
                    }}
                  >
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="text-2xl">{career.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{career.title}</h4>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {career.match}% match • {career.company}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {career.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Heart className="w-4 h-4 fill-current text-red-500" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Career Milestones</h3>

            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <Card
                  key={index}
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          milestone.completed ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold ${
                            milestone.completed
                              ? darkMode
                                ? "text-white"
                                : "text-gray-900"
                              : darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                          }`}
                        >
                          {milestone.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{milestone.date}</p>
                      </div>
                      {milestone.completed && (
                        <Badge className="bg-green-100 text-green-800 rounded-full">Complete</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Next Steps */}
            <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
              <CardHeader>
                <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Book your first mentor session</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-bold">2</span>
                  </div>
                  <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Complete a recommended course</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-bold">3</span>
                  </div>
                  <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Update your resume</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => navigateToScreen("mentorship")}
          >
            <Users className="w-4 h-4 mr-2" />
            Book Mentor Session
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-2xl" onClick={() => navigateToScreen("skill-gap")}>
            <BookOpen className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
