"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Screen =
  | "onboarding"
  | "home"
  | "test"
  | "recommendations"
  | "career-detail"
  | "skill-gap"
  | "mentorship"
  | "progress"
  | "notifications"
  | "ai-advisor"
  | "job-tracker"
  | "analytics"

export interface Career {
  id: number
  title: string
  company: string
  match: number
  salary: string
  location: string
  tags: string[]
  icon: string
  description: string
  skills: string[]
  outlook: string
  requirements: string
}

export interface Mentor {
  id: number
  name: string
  role: string
  experience: string
  rating: number
  sessions: number
  price: string
  avatar: string
  expertise: string[]
}

export interface Question {
  question: string
  options: string[]
}

interface AppContextType {
  currentScreen: Screen
  darkMode: boolean
  currentQuestion: number
  selectedCareer: Career | null
  selectedMentor: Mentor | null
  testAnswers: string[]
  savedCareers: number[]
  userProgress: number
  navigateToScreen: (screen: Screen) => void
  toggleDarkMode: () => void
  setCurrentQuestion: (question: number) => void
  setSelectedCareer: (career: Career | null) => void
  setSelectedMentor: (mentor: Mentor | null) => void
  addTestAnswer: (answer: string) => void
  toggleSavedCareer: (careerId: number) => void
  updateProgress: (progress: number) => void
  goBack: () => void
  navigationHistory: Screen[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding")
  const [darkMode, setDarkMode] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [testAnswers, setTestAnswers] = useState<string[]>([])
  const [savedCareers, setSavedCareers] = useState<number[]>([])
  const [userProgress, setUserProgress] = useState(60)
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>(["onboarding"])

  const navigateToScreen = (screen: Screen) => {
    setNavigationHistory((prev) => [...prev, screen])
    setCurrentScreen(screen)
  }

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1)
      setNavigationHistory(newHistory)
      setCurrentScreen(newHistory[newHistory.length - 1])
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const addTestAnswer = (answer: string) => {
    const newAnswers = [...testAnswers]
    newAnswers[currentQuestion] = answer
    setTestAnswers(newAnswers)
  }

  const toggleSavedCareer = (careerId: number) => {
    setSavedCareers((prev) => (prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]))
  }

  const updateProgress = (progress: number) => {
    setUserProgress(progress)
  }

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        darkMode,
        currentQuestion,
        selectedCareer,
        selectedMentor,
        testAnswers,
        savedCareers,
        userProgress,
        navigateToScreen,
        toggleDarkMode,
        setCurrentQuestion,
        setSelectedCareer,
        setSelectedMentor,
        addTestAnswer,
        toggleSavedCareer,
        updateProgress,
        goBack,
        navigationHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
