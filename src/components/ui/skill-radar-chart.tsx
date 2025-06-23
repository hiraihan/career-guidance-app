"use client"

import { useEffect, useRef } from "react"

interface SkillData {
  skill: string
  current: number
  target: number
  color: string
}

interface SkillRadarChartProps {
  skills?: SkillData[] // now optional
  size?: number
  className?: string
}

export function SkillRadarChart({
  skills = [], // default to empty array
  size = 200,
  className = "",
}: SkillRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (skills.length === 0) return // nothing to draw

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 40

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw axes
    const angleStep = (2 * Math.PI) / skills.length
    skills.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    })

    // Draw current skills polygon
    ctx.beginPath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2

    skills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const distance = (skill.current / 100) * radius
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw target skills polygon
    ctx.beginPath()
    ctx.fillStyle = "rgba(168, 85, 247, 0.1)"
    ctx.strokeStyle = "#a855f7"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    skills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const distance = (skill.target / 100) * radius
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.setLineDash([])

    // Draw skill labels
    ctx.fillStyle = "#374151"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "center"

    skills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const labelDistance = radius + 20
      const x = centerX + Math.cos(angle) * labelDistance
      const y = centerY + Math.sin(angle) * labelDistance

      ctx.fillText(skill.skill, x, y)
    })
  }, [skills, size])

  return (
    <>
      <canvas ref={canvasRef} width={size} height={size} className={className} />
      {skills.length === 0 && <p className="text-center text-sm text-muted-foreground mt-2">No skill data available</p>}
    </>
  )
}
