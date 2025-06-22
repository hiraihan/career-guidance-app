"use client"
import { AppProvider, useApp } from "@/contexts/app-context"
import { OnboardingScreen } from "@/components/screens/onboarding-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { TestScreen } from "@/components/screens/test-screen"
import { RecommendationsScreen } from "@/components/screens/recommendations-screen"


function AppContent() {
  const { currentScreen } = useApp()

  const screens = {
    onboarding: OnboardingScreen,
    home: HomeScreen,
    test: TestScreen,
    recommendations: RecommendationsScreen,
    "career-detail": () => <div>Career Detail (Coming Soon)</div>,
    "skill-gap": () => <div>Skill Gap (Coming Soon)</div>,
    mentorship: () => <div>Mentorship (Coming Soon)</div>,
    progress: () => <div>Progress (Coming Soon)</div>,
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
