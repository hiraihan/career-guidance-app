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
      } border-t shadow-2xl z-50`}
    >
      <div className="flex justify-around items-center max-w-sm mx-auto px-4 py-4">
        {navItems.map((item) => (
          <Button
            key={item.screen}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-3xl transition-all duration-300 hover:scale-110 active:scale-95 relative ${
              currentScreen === item.screen
                ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 shadow-lg scale-110"
                : darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
            }`}
            onClick={() => handleNavigation(item.screen)}
          >
            {currentScreen === item.screen && (
              <div className="absolute -top-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
            <item.icon
              className={`w-6 h-6 transition-all duration-300 ${currentScreen === item.screen ? "scale-110" : ""}`}
            />
            <span className={`text-xs font-medium ${currentScreen === item.screen ? "font-bold" : ""}`}>
              {item.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
