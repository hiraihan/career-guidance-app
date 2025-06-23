"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Sparkles, X, Trophy } from "lucide-react"

interface Achievement {
  id: number
  title: string
  description: string
  points: number
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface AchievementCelebrationProps {
  achievement: Achievement | null
  onCloseAction: () => void
}

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-600",
}

const rarityGlow = {
  common: "shadow-gray-500/50",
  rare: "shadow-blue-500/50",
  epic: "shadow-purple-500/50",
  legendary: "shadow-yellow-500/50",
}

export function AchievementCelebration({ achievement, onCloseAction }: AchievementCelebrationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onCloseAction, 300)
  }, [onCloseAction])

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)

      // Generate confetti particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(newParticles)

      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        handleClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [achievement, handleClose])

  if (!achievement) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent pointer-events-none"
      }`}
    >
      {/* Confetti Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <Card
        className={`max-w-sm w-full transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        } bg-gradient-to-br ${rarityColors[achievement.rarity]} text-white border-0 shadow-2xl ${rarityGlow[achievement.rarity]} relative overflow-hidden`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />

        <CardContent className="p-8 text-center relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="flex justify-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < (achievement.rarity === "legendary" ? 5 : achievement.rarity === "epic" ? 4 : achievement.rarity === "rare" ? 3 : 2) ? "text-yellow-300 fill-current" : "text-white/30"}`}
                />
              ))}
            </div>
            <Badge className="bg-white/20 text-white border-white/30 rounded-full px-3 py-1 text-xs font-medium mb-4">
              {achievement.rarity.toUpperCase()}
            </Badge>
          </div>

          <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
          <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
          <p className="text-white/90 mb-6 leading-relaxed">{achievement.description}</p>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-lg font-bold">+{achievement.points} XP</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>

          <Button
            onClick={handleClose}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-2xl px-8 py-2 backdrop-blur-sm transition-all duration-300"
          >
            Awesome!
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
