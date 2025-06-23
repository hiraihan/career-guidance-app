"use client"
import { AppProvider, useApp } from "@/contexts/app-context"
import { OnboardingScreen } from "@/components/screens/onboarding-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { TestScreen } from "@/components/screens/test-screen"
import { RecommendationsScreen } from "@/components/screens/recommendations-screen"
import { CareerDetailScreen } from "@/components/screens/career-detail-screen"
import { SkillGapScreen } from "@/components/screens/skill-gap-screen"
import { MentorshipScreen } from "@/components/screens/mentorship-screen"
import { ProgressScreen } from "@/components/screens/progress-screen"
import { NotificationsScreen } from "@/components/screens/notifications-screen"
import { AIAdvisorScreen } from "@/components/screens/ai-advisor-screen"
import { JobTrackerScreen } from "@/components/screens/job-tracker-screen"
import { AnalyticsDashboard } from "@/components/screens/analytics-dashboard"
import { PushNotificationComponent, usePushNotifications } from "@/components/ui/push-notification"
import { SocialSharing, useSocialSharing } from "@/components/ui/social-sharing"
import { useEffect, useState } from "react"

function AppContent() {
  const { currentScreen, darkMode } = useApp()
  const { notifications, removeNotification, templates } = usePushNotifications()
  const { isSharing, shareContent, closeSharing } = useSocialSharing()
  const [notificationsInitialized, setNotificationsInitialized] = useState(false)

  // Initialize notifications only once and with longer intervals
  useEffect(() => {
    if (!notificationsInitialized) {
      setNotificationsInitialized(true)

      // Show welcome notification after 10 seconds
      const welcomeTimer = setTimeout(() => {
        templates.dailyReminder()
      }, 10000)

      // Show achievement notification after 30 seconds (only once)
      const achievementTimer = setTimeout(() => {
        templates.achievementUnlocked("Welcome Aboard")
      }, 30000)

      // Show job match notification after 2 minutes
      const jobTimer = setTimeout(() => {
        templates.newJobMatch(2)
      }, 120000)

      return () => {
        clearTimeout(welcomeTimer)
        clearTimeout(achievementTimer)
        clearTimeout(jobTimer)
      }
    }
  }, [templates, notificationsInitialized])

  const screens = {
    onboarding: OnboardingScreen,
    home: HomeScreen,
    test: TestScreen,
    recommendations: RecommendationsScreen,
    "career-detail": CareerDetailScreen,
    "skill-gap": SkillGapScreen,
    mentorship: MentorshipScreen,
    progress: ProgressScreen,
    notifications: NotificationsScreen,
    "ai-advisor": AIAdvisorScreen,
    "job-tracker": JobTrackerScreen,
    analytics: AnalyticsDashboard,
  }

  const CurrentScreen = screens[currentScreen as keyof typeof screens] || HomeScreen

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden min-h-screen relative">
      <CurrentScreen />

      {/* Push Notifications */}
      {notifications.map((notification) => (
        <PushNotificationComponent key={notification.id} notification={notification} onCloseAction={removeNotification} />
      ))}

      {/* Social Sharing Modal */}
      {isSharing && shareContent && <SocialSharing content={shareContent} onCloseAction={closeSharing} darkMode={darkMode} />}
    </div>
  )
}

export default function CareerGuidanceApp() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
