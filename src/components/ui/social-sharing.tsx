"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Copy,
  Download,
  Users,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react"

interface ShareableContent {
  type: "achievement" | "progress" | "milestone" | "career_match" | "skill_progress"
  title: string
  description: string
  stats?: Record<string, string | number>
  image?: string
  url?: string
}

interface SocialSharingProps {
  content: ShareableContent
  onCloseAction: () => void
  darkMode?: boolean
}

export function SocialSharing({ content, onCloseAction, darkMode = false }: SocialSharingProps) {
  const [customMessage, setCustomMessage] = useState("")
  const [isSharing, setIsSharing] = useState(false)

  const generateShareText = (platform: string) => {
    const baseText = customMessage || content.description
    const hashtags = "#CareerGrowth #ProfessionalDevelopment #CareerCompass"

    switch (platform) {
      case "twitter":
        return `${baseText} ${hashtags} ${content.url || ""}`
      case "linkedin":
        return `${baseText}\n\n${content.url || ""}`
      case "facebook":
        return `${baseText} ${content.url || ""}`
      case "instagram":
        return `${baseText}\n\n${hashtags}`
      default:
        return baseText
    }
  }

  const shareToSocial = async (platform: string) => {
    setIsSharing(true)

    const text = generateShareText(platform)
    const url = content.url || window.location.href

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      instagram: `https://www.instagram.com/`,
    }

    if (platform === "native" && navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: text,
          url: url,
        })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log("Share cancelled")
      }
    } else if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
    }

    setIsSharing(false)
  }

  const copyToClipboard = async () => {
    const text = generateShareText("copy")
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Handle error silently
    }
  }

  const downloadAsImage = () => {
    // Create a canvas with the achievement/progress data
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600)
    gradient.addColorStop(0, "#667eea")
    gradient.addColorStop(1, "#764ba2")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)

    // Add content
    ctx.fillStyle = "white"
    ctx.font = "bold 48px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(content.title, 400, 200)

    ctx.font = "24px Inter, sans-serif"
    ctx.fillText(content.description, 400, 300)

    // Add stats if available
    if (content.stats) {
      let y = 400
      Object.entries(content.stats).forEach(([key, value]) => {
        ctx.fillText(`${key}: ${value}`, 400, y)
        y += 40
      })
    }

    // Add branding
    ctx.font = "18px Inter, sans-serif"
    ctx.fillText("CareerCompass - Your Career Journey", 400, 550)

    // Download the image
    const link = document.createElement("a")
    link.download = `career-achievement-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const shareTemplates = {
    achievement: "🎉 Just unlocked a new achievement on my career journey! Every step forward counts. #CareerGrowth",
    progress:
      "📈 Making steady progress on my career development! Consistency is key to success. #ProfessionalDevelopment",
    milestone: "🎯 Hit another important milestone in my career journey! Celebrating the small wins. #CareerSuccess",
    career_match: "🔍 Found some amazing career matches that align with my goals and interests! #CareerExploration",
    skill_progress: "📚 Leveling up my skills and closing the gap to my dream career! #SkillDevelopment",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card
        className={`w-full max-w-md ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-2xl rounded-3xl`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Share Your Success</CardTitle>
            <Button variant="ghost" size="icon" onClick={onCloseAction} className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Preview Card */}
          <Card
            className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} border rounded-2xl`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  {content.type === "achievement" && <Trophy className="w-6 h-6 text-white" />}
                  {content.type === "progress" && <TrendingUp className="w-6 h-6 text-white" />}
                  {content.type === "milestone" && <Target className="w-6 h-6 text-white" />}
                  {content.type === "career_match" && <Users className="w-6 h-6 text-white" />}
                  {content.type === "skill_progress" && <TrendingUp className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{content.title}</h3>
                  <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {content.description}
                  </p>
                  {content.stats && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(content.stats).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {key}: {value}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Message */}
          <div>
            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Custom Message (Optional)
            </label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={shareTemplates[content.type]}
              className={`mt-1 rounded-2xl ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white"}`}
              rows={3}
            />
          </div>

          {/* Social Platform Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => shareToSocial("twitter")}
              disabled={isSharing}
              className="h-12 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white border-0"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>

            <Button
              onClick={() => shareToSocial("linkedin")}
              disabled={isSharing}
              className="h-12 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white border-0"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>

            <Button
              onClick={() => shareToSocial("facebook")}
              disabled={isSharing}
              className="h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>

            <Button
              onClick={() => shareToSocial("instagram")}
              disabled={isSharing}
              className="h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={copyToClipboard} variant="outline" className="h-10 rounded-2xl">
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>

            <Button onClick={downloadAsImage} variant="outline" className="h-10 rounded-2xl">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Native Share (if supported) */}
          {navigator.share && typeof navigator.share === "function" && (
            <Button
              onClick={() => shareToSocial("native")}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share via Apps
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for managing social sharing
export function useSocialSharing() {
  const [isSharing, setIsSharing] = useState(false)
  const [shareContent, setShareContent] = useState<ShareableContent | null>(null)

  const shareAchievement = (title: string, description: string, stats?: Record<string, string | number>) => {
    setShareContent({
      type: "achievement",
      title,
      description,
      stats,
      url: window.location.href,
    })
    setIsSharing(true)
  }

  const shareProgress = (title: string, description: string, stats?: Record<string, string | number>) => {
    setShareContent({
      type: "progress",
      title,
      description,
      stats,
      url: window.location.href,
    })
    setIsSharing(true)
  }

  const shareMilestone = (title: string, description: string, stats?: Record<string, string | number>) => {
    setShareContent({
      type: "milestone",
      title,
      description,
      stats,
      url: window.location.href,
    })
    setIsSharing(true)
  }

  const shareCareerMatch = (title: string, description: string, stats?: Record<string, string | number>) => {
    setShareContent({
      type: "career_match",
      title,
      description,
      stats,
      url: window.location.href,
    })
    setIsSharing(true)
  }

  const shareSkillProgress = (title: string, description: string, stats?: Record<string, string | number>) => {
    setShareContent({
      type: "skill_progress",
      title,
      description,
      stats,
      url: window.location.href,
    })
    setIsSharing(true)
  }

  const closeSharing = () => {
    setIsSharing(false)
    setShareContent(null)
  }

  return {
    isSharing,
    shareContent,
    shareAchievement,
    shareProgress,
    shareMilestone,
    shareCareerMatch,
    shareSkillProgress,
    closeSharing,
  }
}
