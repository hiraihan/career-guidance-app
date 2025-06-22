"use client"

import { Button } from "@/components/ui/button"
import { Home, Search, Heart, User } from "lucide-react"
import { useApp } from "@/contexts/app-context"

export function BottomNavigation() {
  const { darkMode, navigateToScreen, currentScreen } = useApp()

  const navItems = [
    { icon: Home, label: "Home", screen: "home" as const },
    { icon: Search, label: "Explore", screen: "recommendations" as const },
    { icon: Heart, label: "Saved", screen: "progress" as const },
    { icon: User, label: "Profile", screen: "progress" as const },
  ]

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} border-t px-6 py-4`}
    >
      <div className="flex justify-around max-w-sm mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.screen}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 ${currentScreen === item.screen ? "text-blue-600" : ""}`}
            onClick={() => navigateToScreen(item.screen)}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
