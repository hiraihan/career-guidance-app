"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Sun, Moon } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import type { Screen } from "../../contexts/app-context"

interface HeaderProps {
  title: string
  showBack?: boolean
  backScreen?: Screen
  showProfile?: boolean
  showDarkMode?: boolean
  rightAction?: React.ReactNode
}

export function Header({
  title,
  showBack = false,
  backScreen,
  showProfile = false,
  showDarkMode = false,
  rightAction,
}: HeaderProps) {
  const { darkMode, toggleDarkMode, navigateToScreen } = useApp()

  const handleBackClick = () => {
    if (backScreen) {
      navigateToScreen(backScreen)
    }
  }

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
      <div className="flex items-center justify-between p-6">
        {showBack ? (
          <Button variant="ghost" size="icon" onClick={handleBackClick} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}

        <h1 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{title}</h1>

        <div className="flex items-center space-x-3">
          {showDarkMode && (
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}
          {showProfile && (
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          )}
          {rightAction}
        </div>
      </div>
    </div>
  )
}
