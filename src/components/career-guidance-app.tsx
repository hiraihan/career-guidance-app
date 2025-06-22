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

function AppContent() {
  const { currentScreen } = useApp()

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
  }

  const CurrentScreen = screens[currentScreen]

  return (
    <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden min-h-screen">
      <CurrentScreen />
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
