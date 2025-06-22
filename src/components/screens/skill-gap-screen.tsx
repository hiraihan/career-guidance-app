"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, CheckCircle, Play, Clock, Star, BookOpen, TrendingUp, Users } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"

export function SkillGapScreen() {
  const { darkMode, navigateToScreen, updateProgress } = useApp()
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([])

  const skillAssessment = [
    {
      category: "Design Fundamentals",
      current: 90,
      target: 95,
      status: "strong",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Prototyping Tools",
      current: 60,
      target: 85,
      status: "improving",
      icon: Play,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      category: "User Research",
      current: 25,
      target: 80,
      status: "priority",
      icon: Target,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      category: "Design Systems",
      current: 45,
      target: 75,
      status: "developing",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ]

  const recommendedCourses = [
    {
      id: 1,
      title: "User Research Fundamentals",
      provider: "Design Academy",
      duration: "6 weeks",
      rating: 4.8,
      students: "2.1k",
      price: "Free",
      level: "Beginner",
      skills: ["User Interviews", "Usability Testing", "Research Methods"],
      description: "Learn to conduct effective user interviews and usability testing",
    },
    {
      id: 2,
      title: "Advanced Figma Techniques",
      provider: "UX Institute",
      duration: "4 weeks",
      rating: 4.9,
      students: "1.8k",
      price: "$49",
      level: "Intermediate",
      skills: ["Figma", "Prototyping", "Design Systems"],
      description: "Master advanced prototyping and design system creation",
    },
    {
      id: 3,
      title: "Design Systems Mastery",
      provider: "Tech Design Co",
      duration: "8 weeks",
      rating: 4.7,
      students: "1.2k",
      price: "$79",
      level: "Advanced",
      skills: ["Design Systems", "Component Libraries", "Documentation"],
      description: "Build scalable design systems for large organizations",
    },
  ]

  const learningPath = [
    {
      phase: "Foundation",
      duration: "2-3 months",
      courses: ["User Research Fundamentals", "Design Thinking Basics"],
      completed: true,
    },
    {
      phase: "Skill Building",
      duration: "3-4 months",
      courses: ["Advanced Figma Techniques", "Prototyping Mastery"],
      completed: false,
      current: true,
    },
    {
      phase: "Specialization",
      duration: "2-3 months",
      courses: ["Design Systems Mastery", "UX Strategy"],
      completed: false,
    },
  ]

  const handleEnrollCourse = (courseId: number) => {
    setEnrolledCourses((prev) => [...prev, courseId])
    updateProgress(75) // Update overall progress
  }

  const overallProgress = 65

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header title="Skill Development" showBack={true} backScreen="career-detail" />

      <div className="p-6 space-y-6">
        {/* Progress Overview */}
        <Card
          className={`${
            darkMode ? "bg-gradient-to-br from-green-900 to-blue-900" : "bg-gradient-to-br from-green-500 to-blue-600"
          } border-0 shadow-lg rounded-3xl text-white`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Progress</h2>
              <Target className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Overall Readiness</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="bg-white/20" />
              <p className="text-sm opacity-90">You&apos;re on track! Complete 3 more courses to reach 80% readiness.</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="assessment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assessment">Skills</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="path">Learning Path</TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Skill Assessment</h3>

            {skillAssessment.map((skill, index) => (
              <Card
                key={index}
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${skill.bgColor} rounded-2xl flex items-center justify-center`}>
                        <skill.icon className={`w-5 h-5 ${skill.color}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {skill.category}
                        </h4>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {skill.current}% → {skill.target}% target
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        skill.status === "strong"
                          ? "bg-green-100 text-green-800"
                          : skill.status === "improving"
                            ? "bg-yellow-100 text-yellow-800"
                            : skill.status === "priority"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                      } rounded-full`}
                    >
                      {skill.current}%
                    </Badge>
                  </div>
                  <Progress value={skill.current} className="mb-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Current</span>
                    <span>Target: {skill.target}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Recommended Courses
            </h3>

            {recommendedCourses.map((course) => (
              <Card
                key={course.id}
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{course.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {course.provider}
                      </p>
                      <p className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {course.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                            {course.rating} ({course.students})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{course.students}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className={`font-semibold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {course.price}
                      </p>
                      {enrolledCourses.includes(course.id) ? (
                        <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
                      ) : (
                        <Button size="sm" className="rounded-full" onClick={() => handleEnrollCourse(course.id)}>
                          Enroll
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="path" className="space-y-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Learning Path</h3>

            {learningPath.map((phase, index) => (
              <Card
                key={index}
                className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl ${
                  phase.current ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        phase.completed ? "bg-green-100" : phase.current ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      {phase.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : phase.current ? (
                        <Play className="w-6 h-6 text-blue-600" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Phase {index + 1}: {phase.phase}
                      </h4>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{phase.duration}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {phase.courses.map((course, courseIndex) => (
                          <Badge key={courseIndex} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {phase.current && <Badge className="bg-blue-100 text-blue-800">Current</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Button */}
        <Button
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => navigateToScreen("mentorship")}
        >
          <Users className="w-4 h-4 mr-2" />
          Get Mentorship for Skill Development
        </Button>
      </div>
    </div>
  )
}
