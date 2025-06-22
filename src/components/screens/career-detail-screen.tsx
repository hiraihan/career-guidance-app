"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, MapPin, Clock, Users, Heart, BookOpen, MessageCircle } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"

export function CareerDetailScreen() {
  const { darkMode, selectedCareer, navigateToScreen, savedCareers, toggleSavedCareer } = useApp()

  if (!selectedCareer) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} flex items-center justify-center`}>
        <p className={darkMode ? "text-white" : "text-gray-900"}>No career selected</p>
      </div>
    )
  }

  const skillLevels = [
    { skill: "Design Fundamentals", level: 90, color: "bg-green-500" },
    { skill: "Prototyping Tools", level: 75, color: "bg-blue-500" },
    { skill: "User Research", level: 45, color: "bg-yellow-500" },
    { skill: "Design Systems", level: 60, color: "bg-purple-500" },
  ]

  const relatedJobs = [
    { title: "Product Designer", match: 88 },
    { title: "Visual Designer", match: 82 },
    { title: "Design Researcher", match: 76 },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header
        title="Career Details"
        showBack={true}
        backScreen="recommendations"
        rightAction={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => toggleSavedCareer(selectedCareer.id)}
          >
            <Heart
              className={`w-5 h-5 ${savedCareers.includes(selectedCareer.id) ? "fill-current text-red-500" : ""}`}
            />
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Hero Card */}
        <Card
          className={`${
            darkMode ? "bg-gradient-to-br from-blue-900 to-purple-900" : "bg-gradient-to-br from-blue-500 to-purple-600"
          } border-0 shadow-lg rounded-3xl text-white`}
        >
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">{selectedCareer.icon}</div>
            <h1 className="text-2xl font-bold mb-2">{selectedCareer.title}</h1>
            <p className="opacity-90 mb-4">{selectedCareer.company}</p>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-4 h-4 rounded-full bg-green-400" />
              <span className="font-semibold">{selectedCareer.match}% Match</span>
            </div>
            <div className="flex space-x-3">
              <Button
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-2xl px-6 flex-1"
                onClick={() => navigateToScreen("skill-gap")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                View Skills
              </Button>
              <Button
                className="bg-white/20 hover:bg-white/30 rounded-2xl px-6 flex-1"
                onClick={() => navigateToScreen("mentorship")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Find Mentor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <DollarSign className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`} />
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Salary Range</p>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{selectedCareer.salary}</p>
            </CardContent>
          </Card>

          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Job Outlook</p>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Excellent</p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
          <CardHeader>
            <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>About This Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-4`}>
              {selectedCareer.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Location: {selectedCareer.location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Full-time, Remote friendly
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Skill Match */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
          <CardHeader>
            <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Your Skill Match</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillLevels.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {skill.skill}
                  </span>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Required Skills */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
          <CardHeader>
            <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCareer.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800 rounded-full px-3 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Similar Careers */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
          <CardHeader>
            <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Similar Careers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{job.title}</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 rounded-full">
                  {job.match}% match
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => navigateToScreen("mentorship")}
          >
            <Users className="w-4 h-4 mr-2" />
            Find a Mentor
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-2xl" onClick={() => navigateToScreen("skill-gap")}>
            <BookOpen className="w-4 h-4 mr-2" />
            View Learning Path
          </Button>
        </div>
      </div>
    </div>
  )
}
