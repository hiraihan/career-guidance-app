"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Briefcase, CheckCircle, MessageCircle, type LucideIcon } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"

type NotificationType = "reminder" | "achievement" | "message" | "opportunity"

interface Notification {
  id: number
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
  actionable: boolean
  icon: LucideIcon
  color: string
}

export function NotificationsScreen() {
  const { darkMode, navigateToScreen } = useApp()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "reminder",
      title: "Mentor Session Tomorrow",
      description: "Video call with Sarah Chen at 2:00 PM",
      time: "2 hours ago",
      read: false,
      actionable: true,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "achievement",
      title: "New Achievement Unlocked!",
      description: "You've completed your first skill assessment",
      time: "1 day ago",
      read: false,
      actionable: false,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "opportunity",
      title: "New Job Match Found",
      description: "3 new UX Designer positions match your profile",
      time: "2 days ago",
      read: true,
      actionable: true,
      icon: Briefcase,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "message",
      title: "Message from Mentor",
      description: "Sarah Chen sent you course recommendations",
      time: "3 days ago",
      read: true,
      actionable: true,
      icon: MessageCircle,
      color: "text-orange-600",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length
  const todayNotifications = notifications.filter((n) => n.time.includes("hours") || n.time.includes("Today"))
  const earlierNotifications = notifications.filter((n) => n.time.includes("day") || n.time.includes("week"))

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header
        title="Notifications"
        showBack={true}
        backScreen="home"
        rightAction={
          unreadCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-blue-600">
              Mark all read
            </Button>
          ) : null
        }
      />

      <div className="p-6 space-y-6">
        {/* Notification Summary */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {unreadCount > 0 ? `${unreadCount} New Notifications` : "All Caught Up!"}
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {unreadCount > 0 ? "Stay on top of your career journey" : "No new notifications"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {todayNotifications.length > 0 && (
              <div className="space-y-3">
                <h3
                  className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"} uppercase tracking-wide`}
                >
                  Today
                </h3>
                {todayNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    darkMode={darkMode}
                    onMarkRead={markAsRead}
                    onAction={() => {
                      if (notification.type === "reminder") navigateToScreen("mentorship")
                      if (notification.type === "opportunity") navigateToScreen("recommendations")
                    }}
                  />
                ))}
              </div>
            )}

            {earlierNotifications.length > 0 && (
              <div className="space-y-3">
                <h3
                  className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"} uppercase tracking-wide`}
                >
                  Earlier
                </h3>
                {earlierNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    darkMode={darkMode}
                    onMarkRead={markAsRead}
                    onAction={() => {
                      if (notification.type === "opportunity") navigateToScreen("recommendations")
                      if (notification.type === "message") navigateToScreen("mentorship")
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  darkMode={darkMode}
                  onMarkRead={markAsRead}
                  onAction={() => {
                    if (notification.type === "reminder") navigateToScreen("mentorship")
                    if (notification.type === "opportunity") navigateToScreen("recommendations")
                  }}
                />
              ))}
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            {notifications
              .filter((n) => n.type === "reminder")
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  darkMode={darkMode}
                  onMarkRead={markAsRead}
                  onAction={() => navigateToScreen("mentorship")}
                />
              ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {notifications
              .filter((n) => n.type === "achievement")
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  darkMode={darkMode}
                  onMarkRead={markAsRead}
                  onAction={() => navigateToScreen("progress")}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}

function NotificationCard({
  notification,
  darkMode,
  onMarkRead,
  onAction,
}: {
  notification: Notification
  darkMode: boolean
  onMarkRead: (id: number) => void
  onAction: () => void
}) {
  return (
    <Card
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-sm rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
        !notification.read ? "ring-2 ring-blue-500/20" : ""
      }`}
      onClick={() => {
        onMarkRead(notification.id)
        if (notification.actionable) onAction()
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div
            className={`w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center ${
              !notification.read ? "bg-blue-50" : ""
            }`}
          >
            <notification.icon className={`w-5 h-5 ${notification.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{notification.title}</h4>
              <div className="flex items-center space-x-2">
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{notification.time}</span>
              </div>
            </div>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{notification.description}</p>
            {notification.actionable && (
              <Button size="sm" variant="ghost" className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700">
                View Details →
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
