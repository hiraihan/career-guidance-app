"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Briefcase, Calendar, MapPin, DollarSign, Clock, CheckCircle, AlertCircle, X } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"

type ApplicationStatus = "applied" | "interview" | "offer" | "rejected" | "withdrawn"
type ApplicationPriority = "high" | "medium" | "low"

interface JobApplication {
  id: number
  company: string
  position: string
  location: string
  salary: string
  status: ApplicationStatus
  appliedDate: string
  lastUpdate: string
  notes: string
  interviewDate?: string
  priority: ApplicationPriority
}

const statusColors: Record<ApplicationStatus, string> = {
  applied: "bg-blue-100 text-blue-800",
  interview: "bg-yellow-100 text-yellow-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-gray-100 text-gray-800",
}

const statusIcons: Record<ApplicationStatus, typeof Clock> = {
  applied: Clock,
  interview: Calendar,
  offer: CheckCircle,
  rejected: X,
  withdrawn: AlertCircle,
}

const priorityColors: Record<ApplicationPriority, string> = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
}

export function JobTrackerScreen() {
  const { darkMode } = useApp()
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      company: "Google",
      position: "UX Designer",
      location: "Mountain View, CA",
      salary: "$120k - $150k",
      status: "interview",
      appliedDate: "2024-01-15",
      lastUpdate: "2024-01-20",
      notes: "Phone screening went well. Technical interview scheduled.",
      interviewDate: "2024-01-25",
      priority: "high",
    },
    {
      id: 2,
      company: "Spotify",
      position: "Product Designer",
      location: "New York, NY",
      salary: "$100k - $130k",
      status: "applied",
      appliedDate: "2024-01-18",
      lastUpdate: "2024-01-18",
      notes: "Applied through company website. Waiting for response.",
      priority: "medium",
    },
    {
      id: 3,
      company: "Airbnb",
      position: "Senior UX Researcher",
      location: "San Francisco, CA",
      salary: "$130k - $160k",
      status: "offer",
      appliedDate: "2024-01-10",
      lastUpdate: "2024-01-22",
      notes: "Received offer! Need to respond by Jan 30th.",
      priority: "high",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newApplication, setNewApplication] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "applied" as ApplicationStatus,
    notes: "",
    priority: "medium" as ApplicationPriority,
  })

  const handleAddApplication = () => {
    if (newApplication.company && newApplication.position) {
      const application: JobApplication = {
        id: Date.now(),
        ...newApplication,
        appliedDate: new Date().toISOString().split("T")[0],
        lastUpdate: new Date().toISOString().split("T")[0],
      }
      setApplications((prev) => [application, ...prev])
      setNewApplication({
        company: "",
        position: "",
        location: "",
        salary: "",
        status: "applied",
        notes: "",
        priority: "medium",
      })
      setShowAddForm(false)
    }
  }

  const updateApplicationStatus = (id: number, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status, lastUpdate: new Date().toISOString().split("T")[0] } : app)),
    )
  }

  const getStatusStats = () => {
    const stats = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1
        return acc
      },
      {} as Record<ApplicationStatus, number>,
    )

    return {
      total: applications.length,
      applied: stats.applied || 0,
      interview: stats.interview || 0,
      offer: stats.offer || 0,
      rejected: stats.rejected || 0,
    }
  }

  const stats = getStatusStats()

  if (showAddForm) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Header
          title="Add Application"
          showBack={true}
          backScreen="job-tracker"
          rightAction={
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          }
        />

        <div className="p-6 space-y-6">
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Company *
                  </label>
                  <Input
                    value={newApplication.company}
                    onChange={(e) => setNewApplication((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Company name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Position *
                  </label>
                  <Input
                    value={newApplication.position}
                    onChange={(e) => setNewApplication((prev) => ({ ...prev, position: e.target.value }))}
                    placeholder="Job title"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Location
                  </label>
                  <Input
                    value={newApplication.location}
                    onChange={(e) => setNewApplication((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Salary Range
                  </label>
                  <Input
                    value={newApplication.salary}
                    onChange={(e) => setNewApplication((prev) => ({ ...prev, salary: e.target.value }))}
                    placeholder="$80k - $100k"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Status
                  </label>
                  <Select
                    value={newApplication.status}
                    onValueChange={(value: ApplicationStatus) =>
                      setNewApplication((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Priority
                  </label>
                  <Select
                    value={newApplication.priority}
                    onValueChange={(value: ApplicationPriority) =>
                      setNewApplication((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Notes</label>
                <Textarea
                  value={newApplication.notes}
                  onChange={(e) => setNewApplication((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Application notes, interview details, etc."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleAddApplication}
                disabled={!newApplication.company || !newApplication.position}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Add Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header
        title="Job Applications"
        showBack={true}
        backScreen="home"
        rightAction={
          <Button
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Applications</div>
            </CardContent>
          </Card>
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.interview + stats.offer}</div>
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Active Opportunities</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="active">Active ({stats.interview + stats.offer})</TabsTrigger>
            <TabsTrigger value="applied">Applied ({stats.applied})</TabsTrigger>
            <TabsTrigger value="offers">Offers ({stats.offer})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                darkMode={darkMode}
                onStatusUpdate={updateApplicationStatus}
              />
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {applications
              .filter((app) => app.status === "interview" || app.status === "offer")
              .map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  darkMode={darkMode}
                  onStatusUpdate={updateApplicationStatus}
                />
              ))}
          </TabsContent>

          <TabsContent value="applied" className="space-y-4">
            {applications
              .filter((app) => app.status === "applied")
              .map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  darkMode={darkMode}
                  onStatusUpdate={updateApplicationStatus}
                />
              ))}
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            {applications
              .filter((app) => app.status === "offer")
              .map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  darkMode={darkMode}
                  onStatusUpdate={updateApplicationStatus}
                />
              ))}
          </TabsContent>
        </Tabs>

        {applications.length === 0 && (
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
            <CardContent className="p-8 text-center">
              <Briefcase className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>No applications yet</h3>
              <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Start tracking your job applications to stay organized
              </p>
              <Button className="rounded-2xl" onClick={() => setShowAddForm(true)}>
                Add Your First Application
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}

function ApplicationCard({
  application,
  darkMode,
  onStatusUpdate,
}: {
  application: JobApplication
  darkMode: boolean
  onStatusUpdate: (id: number, status: ApplicationStatus) => void
}) {
  const StatusIcon = statusIcons[application.status]

  return (
    <Card
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl border-l-4 ${priorityColors[application.priority]}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
              {application.position}
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{application.company}</p>
          </div>
          <Badge className={`${statusColors[application.status]} rounded-full flex items-center space-x-1`}>
            <StatusIcon className="w-3 h-3" />
            <span className="capitalize">{application.status}</span>
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          {application.location && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{application.location}</span>
            </div>
          )}
          {application.salary && (
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{application.salary}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Applied: {new Date(application.appliedDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {application.notes && (
          <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{application.notes}</p>
        )}

        <div className="flex space-x-2">
          {application.status === "applied" && (
            <Button size="sm" variant="outline" onClick={() => onStatusUpdate(application.id, "interview")}>
              Mark as Interview
            </Button>
          )}
          {application.status === "interview" && (
            <Button size="sm" variant="outline" onClick={() => onStatusUpdate(application.id, "offer")}>
              Got Offer
            </Button>
          )}
          <Button size="sm" variant="ghost" className="text-red-600">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
