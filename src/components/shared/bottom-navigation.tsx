"use client"

import { Button } from "@/components/ui/button"
import { Home, Search, Heart, User } from "lucide-react"
import { useApp } from "../../contexts/app-context"

export function BottomNavigation() {
  const { darkMode, navigateToScreen, currentScreen } = useApp()

  const navItems = [
    { icon: Home, label: "Home", screen: "home" as const },
    { icon: Search, label: "Explore", screen: "recommendations" as const },
    { icon: Heart, label: "Saved", screen: "progress" as const },
    { icon: User, label: "Profile", screen: "progress" as const },
  ]

  const handleNavigation = (screen: (typeof navItems)[0]["screen"]) => {
    // Haptic feedback untuk mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(50)
    }

    navigateToScreen(screen)
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        darkMode
          ? "bg-gray-900/95 border-gray-800/50 backdrop-blur-xl"
          : "bg-white/95 border-gray-200/50 backdrop-blur-xl"
      } border-t shadow-2xl`}
    >
      <div className="flex justify-around items-center max-w-sm mx-auto px-4 py-3 sm:py-4">
        {navItems.map((item) => (
          <Button
            key={item.screen}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
              currentScreen === item.screen
                ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-lg"
                : darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation(item.screen)}
            onTouchStart={() => {}} // Ensure touch events work
          >
            <item.icon
              className={`w-5 h-5 transition-transform duration-300 ${currentScreen === item.screen ? "scale-110" : ""}`}
            />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
