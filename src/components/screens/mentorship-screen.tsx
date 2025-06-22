"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, Users, Clock, Calendar, MessageCircle, Video, CheckCircle } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"
import { mentors } from "../../data/app-data"

interface BookedSession {
  id: number
  mentor: (typeof mentors)[0]
  time: string
  type: "video" | "chat"
  goal: string
  status: string
}

export function MentorshipScreen() {
  const { darkMode, navigateToScreen } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentors)[0] | null>(null)
  const [bookingStep, setBookingStep] = useState<"select" | "book" | "confirm">("select")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState<"video" | "chat">("video")
  const [sessionGoal, setSessionGoal] = useState("")
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([])

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const availableTimes = [
    { time: "Today 2:00 PM", available: true },
    { time: "Today 4:00 PM", available: false },
    { time: "Tomorrow 10:00 AM", available: true },
    { time: "Tomorrow 2:00 PM", available: true },
    { time: "Friday 9:00 AM", available: true },
    { time: "Friday 3:00 PM", available: true },
  ]

  const handleMentorSelect = (mentor: (typeof mentors)[0]) => {
    setSelectedMentor(mentor)
    setBookingStep("book")
  }

  const handleBookSession = () => {
    if (selectedMentor && selectedTime && sessionGoal) {
      const newSession: BookedSession = {
        id: Date.now(),
        mentor: selectedMentor,
        time: selectedTime,
        type: sessionType,
        goal: sessionGoal,
        status: "upcoming",
      }
      setBookedSessions((prev) => [...prev, newSession])
      setBookingStep("confirm")
    }
  }

  const handleBackToMentors = () => {
    setBookingStep("select")
    setSelectedMentor(null)
    setSelectedTime("")
    setSessionGoal("")
  }

  if (bookingStep === "confirm") {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Header title="Booking Confirmed" showBack={false} />
        <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Session Booked Successfully!
          </h2>
          <p className={`text-center mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Your {sessionType} session with {selectedMentor?.name} has been confirmed for {selectedTime}.
          </p>
          <div className="space-y-3 w-full max-w-sm">
            <Button
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={() => navigateToScreen("progress")}
            >
              View My Sessions
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-2xl" onClick={handleBackToMentors}>
              Book Another Session
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (bookingStep === "book" && selectedMentor) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Header title="Book Session" showBack={true} backScreen="mentorship" />
        <div className="p-6 space-y-6">
          {/* Mentor Info */}
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedMentor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedMentor.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {selectedMentor.name}
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{selectedMentor.role}</p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{selectedMentor.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Type */}
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Session Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={sessionType === "video" ? "default" : "outline"}
                  className="h-16 rounded-2xl flex flex-col items-center space-y-2"
                  onClick={() => setSessionType("video")}
                >
                  <Video className="w-5 h-5" />
                  <span>Video Call</span>
                </Button>
                <Button
                  variant={sessionType === "chat" ? "default" : "outline"}
                  className="h-16 rounded-2xl flex flex-col items-center space-y-2"
                  onClick={() => setSessionType("chat")}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Text Chat</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Times */}
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Available Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {availableTimes.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  disabled={!slot.available}
                  className="w-full h-12 rounded-2xl justify-between"
                  onClick={() => setSelectedTime(slot.time)}
                >
                  <span>{slot.time}</span>
                  {!slot.available && <span className="text-xs">Booked</span>}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Session Goal */}
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Session Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What would you like to discuss in this session? (e.g., Portfolio review, Career advice, Skill development)"
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                className={`rounded-2xl ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Book Button */}
          <Button
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={handleBookSession}
            disabled={!selectedTime || !sessionGoal}
          >
            Book Session - {selectedMentor.price}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header
        title="Find a Mentor"
        showBack={true}
        backScreen="home"
        rightAction={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Filter className="w-5 h-5" />
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        <Tabs defaultValue="mentors" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions ({bookedSessions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-400"
                }`}
              />
              <Input
                placeholder="Search by expertise, company, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 h-12 rounded-2xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
              />
            </div>

            {/* Featured Mentors */}
            <div className="space-y-4">
              <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Top Mentors for You
              </h2>

              {filteredMentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  className={`${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                  } shadow-lg rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
                  onClick={() => handleMentorSelect(mentor)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {mentor.name}
                        </h3>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>{mentor.role}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{mentor.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                              {mentor.sessions} sessions
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{mentor.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {mentor.price}
                        </p>
                        <Button size="sm" className="mt-2 rounded-full">
                          Book Session
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 rounded-full px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>My Sessions</h2>

            {bookedSessions.length === 0 ? (
              <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
                <CardContent className="p-8 text-center">
                  <Calendar className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    No sessions booked yet
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Book your first mentorship session to get started
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookedSessions.map((session) => (
                  <Card
                    key={session.id}
                    className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={session.mentor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {session.mentor.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {session.mentor.name}
                          </h4>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {session.time} • {session.type === "video" ? "Video Call" : "Text Chat"}
                          </p>
                          <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {session.goal}
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}
