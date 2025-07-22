"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Type, Grid, Copy, Smartphone, Monitor, Tablet } from "lucide-react"

export function TypographyGuidelines() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const fontSystem = {
    primary: {
      name: "Inter",
      fallback: "system-ui, -apple-system, sans-serif",
      usage: "Primary interface font",
      weights: [300, 400, 500, 600, 700, 800],
      import:
        "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');",
    },
    secondary: {
      name: "JetBrains Mono",
      fallback: "Consolas, Monaco, monospace",
      usage: "Code, technical content",
      weights: [400, 500, 600, 700],
      import:
        "@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');",
    },
  }

  const headingScale = [
    {
      tag: "h1",
      name: "Display Large",
      mobile: "text-3xl", // 30px
      tablet: "text-4xl", // 36px
      desktop: "text-5xl", // 48px
      weight: "font-bold", // 700
      lineHeight: "leading-tight", // 1.25
      usage: "Page titles, hero headings",
      example: "Welcome to CareerCompass",
    },
    {
      tag: "h2",
      name: "Display Medium",
      mobile: "text-2xl", // 24px
      tablet: "text-3xl", // 30px
      desktop: "text-4xl", // 36px
      weight: "font-bold", // 700
      lineHeight: "leading-tight", // 1.25
      usage: "Section headings, card titles",
      example: "Your Career Journey",
    },
    {
      tag: "h3",
      name: "Display Small",
      mobile: "text-xl", // 20px
      tablet: "text-2xl", // 24px
      desktop: "text-3xl", // 30px
      weight: "font-semibold", // 600
      lineHeight: "leading-snug", // 1.375
      usage: "Subsection headings",
      example: "Skills Assessment",
    },
    {
      tag: "h4",
      name: "Heading Large",
      mobile: "text-lg", // 18px
      tablet: "text-xl", // 20px
      desktop: "text-2xl", // 24px
      weight: "font-semibold", // 600
      lineHeight: "leading-snug", // 1.375
      usage: "Component headings",
      example: "Recommended Courses",
    },
    {
      tag: "h5",
      name: "Heading Medium",
      mobile: "text-base", // 16px
      tablet: "text-lg", // 18px
      desktop: "text-xl", // 20px
      weight: "font-medium", // 500
      lineHeight: "leading-normal", // 1.5
      usage: "Card subtitles, form labels",
      example: "Progress Overview",
    },
    {
      tag: "h6",
      name: "Heading Small",
      mobile: "text-sm", // 14px
      tablet: "text-base", // 16px
      desktop: "text-lg", // 18px
      weight: "font-medium", // 500
      lineHeight: "leading-normal", // 1.5
      usage: "Small headings, captions",
      example: "Last Updated",
    },
  ]

  const bodyText = [
    {
      name: "Body Large",
      class: "text-lg",
      size: "18px",
      weight: "font-normal", // 400
      lineHeight: "leading-relaxed", // 1.625
      usage: "Important body text, introductions",
      example: "Discover your ideal career path with personalized recommendations and expert guidance.",
    },
    {
      name: "Body Medium",
      class: "text-base",
      size: "16px",
      weight: "font-normal", // 400
      lineHeight: "leading-normal", // 1.5
      usage: "Default body text, descriptions",
      example: "Complete your skills assessment to get personalized career recommendations.",
    },
    {
      name: "Body Small",
      class: "text-sm",
      size: "14px",
      weight: "font-normal", // 400
      lineHeight: "leading-normal", // 1.5
      usage: "Secondary text, captions",
      example: "This assessment takes approximately 10 minutes to complete.",
    },
    {
      name: "Caption",
      class: "text-xs",
      size: "12px",
      weight: "font-normal", // 400
      lineHeight: "leading-normal", // 1.5
      usage: "Fine print, timestamps, metadata",
      example: "Last updated 2 hours ago",
    },
  ]

  const specialText = [
    {
      name: "Button Text",
      class: "text-sm font-medium",
      usage: "Button labels, CTAs",
      example: "Get Started",
    },
    {
      name: "Link Text",
      class: "text-sm font-medium text-blue-600 hover:text-blue-800",
      usage: "Navigation links, inline links",
      example: "Learn more about careers",
    },
    {
      name: "Code Text",
      class: "text-sm font-mono bg-gray-100 px-1 py-0.5 rounded",
      usage: "Code snippets, technical content",
      example: "npm install career-compass",
    },
    {
      name: "Badge Text",
      class: "text-xs font-medium uppercase tracking-wide",
      usage: "Status badges, labels",
      example: "IN PROGRESS",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Type className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Typography Guidelines
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete typography system for consistent text styling across all platforms
          </p>
        </div>

        <Tabs defaultValue="fonts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fonts">Font System</TabsTrigger>
            <TabsTrigger value="headings">Headings</TabsTrigger>
            <TabsTrigger value="body">Body Text</TabsTrigger>
            <TabsTrigger value="special">Special Text</TabsTrigger>
          </TabsList>

          {/* Font System Tab */}
          <TabsContent value="fonts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Font */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="w-5 h-5" />
                    <span>Primary Font</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gray-100 rounded-2xl">
                      <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        {fontSystem.primary.name}
                      </h2>
                      <p className="text-gray-600" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Font Family:</span>
                        <span className="text-gray-600">{fontSystem.primary.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Fallback:</span>
                        <span className="text-gray-600 text-sm">{fontSystem.primary.fallback}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Usage:</span>
                        <span className="text-gray-600">{fontSystem.primary.usage}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Available Weights</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {fontSystem.primary.weights.map((weight) => (
                          <div key={weight} className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-sm font-medium">{weight}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(fontSystem.primary.import, "primary-font")}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedItem === "primary-font" ? "Copied!" : "Copy Import"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Font */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="w-5 h-5" />
                    <span>Secondary Font</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gray-100 rounded-2xl">
                      <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {fontSystem.secondary.name}
                      </h2>
                      <p className="text-gray-600" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        const career = &quot;compass&quot;;
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Font Family:</span>
                        <span className="text-gray-600">{fontSystem.secondary.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Fallback:</span>
                        <span className="text-gray-600 text-sm">{fontSystem.secondary.fallback}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Usage:</span>
                        <span className="text-gray-600">{fontSystem.secondary.usage}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Available Weights</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {fontSystem.secondary.weights.map((weight) => (
                          <div key={weight} className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-sm font-medium">{weight}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(fontSystem.secondary.import, "secondary-font")}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedItem === "secondary-font" ? "Copied!" : "Copy Import"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Responsive Typography */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Grid className="w-5 h-5" />
                  <span>Responsive Typography</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold mb-2">Mobile</h4>
                    <p className="text-sm text-gray-600 mb-3">320px - 767px</p>
                    <div className="space-y-2 text-left">
                      <div className="text-xs bg-gray-50 p-2 rounded">Base: 14px (text-sm)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Scale: 1.2x</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Line Height: 1.4</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Tablet className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold mb-2">Tablet</h4>
                    <p className="text-sm text-gray-600 mb-3">768px - 1023px</p>
                    <div className="space-y-2 text-left">
                      <div className="text-xs bg-gray-50 p-2 rounded">Base: 15px</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Scale: 1.25x</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Line Height: 1.5</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Monitor className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold mb-2">Desktop</h4>
                    <p className="text-sm text-gray-600 mb-3">1024px+</p>
                    <div className="space-y-2 text-left">
                      <div className="text-xs bg-gray-50 p-2 rounded">Base: 16px (text-base)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Scale: 1.33x</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Line Height: 1.6</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Headings Tab */}
          <TabsContent value="headings" className="space-y-6">
            <div className="space-y-6">
              {headingScale.map((heading, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Badge variant="outline">{heading.tag}</Badge>
                        <span>{heading.name}</span>
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(
                            `${heading.mobile} ${heading.tablet} ${heading.desktop} ${heading.weight} ${heading.lineHeight}`,
                            `heading-${index}`,
                          )
                        }
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedItem === `heading-${index}` ? "Copied!" : "Copy Classes"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4 p-6 bg-gray-100 rounded-2xl">
                          <div
                            className={`${heading.mobile} md:${heading.tablet} lg:${heading.desktop} ${heading.weight} ${heading.lineHeight}`}
                          >
                            {heading.example}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{heading.usage}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Mobile</h5>
                            <Badge variant="outline">{heading.mobile}</Badge>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Tablet</h5>
                            <Badge variant="outline">{heading.tablet}</Badge>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Desktop</h5>
                            <Badge variant="outline">{heading.desktop}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Weight</h5>
                            <Badge variant="outline">{heading.weight}</Badge>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Line Height</h5>
                            <Badge variant="outline">{heading.lineHeight}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Body Text Tab */}
          <TabsContent value="body" className="space-y-6">
            <div className="space-y-6">
              {bodyText.map((text, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{text.name}</CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(`${text.class} ${text.weight} ${text.lineHeight}`, `body-${index}`)
                        }
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedItem === `body-${index}` ? "Copied!" : "Copy Classes"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4 p-6 bg-gray-100 rounded-2xl">
                          <div className={`${text.class} ${text.weight} ${text.lineHeight}`}>{text.example}</div>
                        </div>
                        <p className="text-sm text-gray-600">{text.usage}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Size</h5>
                            <Badge variant="outline">{text.size}</Badge>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Class</h5>
                            <Badge variant="outline">{text.class}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Weight</h5>
                            <Badge variant="outline">{text.weight}</Badge>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm mb-1">Line Height</h5>
                            <Badge variant="outline">{text.lineHeight}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Special Text Tab */}
          <TabsContent value="special" className="space-y-6">
            <div className="space-y-6">
              {specialText.map((text, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{text.name}</CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(text.class, `special-${index}`)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedItem === `special-${index}` ? "Copied!" : "Copy Classes"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4 p-6 bg-gray-100 rounded-2xl">
                          <div className={text.class}>{text.example}</div>
                        </div>
                        <p className="text-sm text-gray-600">{text.usage}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Tailwind Classes</h5>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <code className="text-sm font-mono">{text.class}</code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
