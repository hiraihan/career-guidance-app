"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Briefcase, Users, BookOpen, Trophy } from "lucide-react"

interface PushNotification {
  id: string
  title: string
  message: string
  type: "reminder" | "achievement" | "opportunity" | "social" | "system"
  priority: "low" | "medium" | "high" | "urgent"
  icon: typeof Calendar
  action?: {
    label: string
    callback: () => void
  }
  timestamp: Date
  autoClose?: number
}

interface PushNotificationProps {
  notification: PushNotification | null
  onCloseAction: (id: string) => void
  onAction?: (notification: PushNotification) => void
}

const typeColors = {
  reminder: "from-blue-500 to-blue-600",
  achievement: "from-green-500 to-green-600",
  opportunity: "from-purple-500 to-purple-600",
  social: "from-pink-500 to-pink-600",
  system: "from-gray-500 to-gray-600",
}

const priorityStyles = {
  low: "border-l-4 border-l-gray-400",
  medium: "border-l-4 border-l-blue-400",
  high: "border-l-4 border-l-orange-400",
  urgent: "border-l-4 border-l-red-500 animate-pulse",
}

export function PushNotificationComponent({ notification, onCloseAction, onAction }: PushNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      if (notification) {
        onCloseAction(notification.id)
      }
    }, 300)
  }, [notification, onCloseAction])

  useEffect(() => {
    if (notification) {
      setIsVisible(true)

      // Auto-close timer
      if (notification.autoClose) {
        const interval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev - 100 / (notification.autoClose! / 100)
            if (newProgress <= 0) {
              handleClose()
              return 0
            }
            return newProgress
          })
        }, 100)

        return () => clearInterval(interval)
      }
    }
  }, [notification, handleClose])

  const handleAction = () => {
    if (notification?.action) {
      notification.action.callback()
      onAction?.(notification)
    }
  }

  if (!notification) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card
        className={`w-80 shadow-2xl rounded-2xl overflow-hidden ${priorityStyles[notification.priority]} bg-white dark:bg-gray-800 border-0`}
      >
        {notification.autoClose && (
          <div
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        )}

        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-r ${typeColors[notification.type]} flex items-center justify-center flex-shrink-0`}
            >
              <notification.icon className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{notification.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{notification.message}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="w-6 h-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {notification.type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {notification.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                {notification.action && (
                  <Button
                    size="sm"
                    onClick={handleAction}
                    className="h-6 px-3 text-xs rounded-full bg-blue-600 hover:bg-blue-700"
                  >
                    {notification.action.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Push Notification Manager Hook
export function usePushNotifications() {
  const [notifications, setNotifications] = useState<PushNotification[]>([])
  const [permission, setPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window) {
      setPermission(Notification.permission)

      if (Notification.permission === "default") {
        Notification.requestPermission().then((result) => {
          setPermission(result)
        })
      }
    }
  }, [])

  const showNotification = (notification: Omit<PushNotification, "id" | "timestamp">) => {
    const newNotification: PushNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    setNotifications((prev) => [...prev, newNotification])

    // Show browser notification if permission granted
    if (permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      })
    }

    return newNotification.id
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Predefined notification templates
  const templates = {
    dailyReminder: () =>
      showNotification({
        title: "Daily Check-in",
        message: "Don't forget to log your progress today! Keep your streak alive.",
        type: "reminder",
        priority: "medium",
        icon: Calendar,
        autoClose: 5000,
        action: {
          label: "Check In",
          callback: () => console.log("Navigate to progress"),
        },
      }),

    achievementUnlocked: (achievementName: string) =>
      showNotification({
        title: "Achievement Unlocked! 🎉",
        message: `Congratulations! You've earned "${achievementName}". Keep up the great work!`,
        type: "achievement",
        priority: "high",
        icon: Trophy,
        autoClose: 8000,
        action: {
          label: "View",
          callback: () => console.log("Navigate to achievements"),
        },
      }),

    newJobMatch: (count: number) =>
      showNotification({
        title: "New Job Opportunities",
        message: `${count} new jobs match your profile. Check them out before they're gone!`,
        type: "opportunity",
        priority: "high",
        icon: Briefcase,
        autoClose: 10000,
        action: {
          label: "View Jobs",
          callback: () => console.log("Navigate to job tracker"),
        },
      }),

    mentorMessage: (mentorName: string) =>
      showNotification({
        title: "Message from Mentor",
        message: `${mentorName} sent you a message with career advice.`,
        type: "social",
        priority: "medium",
        icon: Users,
        autoClose: 7000,
        action: {
          label: "Reply",
          callback: () => console.log("Navigate to mentorship"),
        },
      }),

    courseReminder: (courseName: string) =>
      showNotification({
        title: "Course Reminder",
        message: `Your course "${courseName}" has a new lesson available.`,
        type: "reminder",
        priority: "medium",
        icon: BookOpen,
        autoClose: 6000,
        action: {
          label: "Continue",
          callback: () => console.log("Navigate to courses"),
        },
      }),
  }

  return {
    notifications,
    showNotification,
    removeNotification,
    clearAllNotifications,
    templates,
    permission,
  }
}
