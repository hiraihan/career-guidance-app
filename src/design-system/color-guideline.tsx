"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Copy, Eye, Contrast, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"

export function ColorGuidelines() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const primaryColors = [
    { name: "Primary 50", hex: "#EEF2FF", class: "bg-indigo-50", usage: "Light backgrounds" },
    { name: "Primary 100", hex: "#E0E7FF", class: "bg-indigo-100", usage: "Subtle backgrounds" },
    { name: "Primary 200", hex: "#C7D2FE", class: "bg-indigo-200", usage: "Disabled states" },
    { name: "Primary 300", hex: "#A5B4FC", class: "bg-indigo-300", usage: "Borders, dividers" },
    { name: "Primary 400", hex: "#818CF8", class: "bg-indigo-400", usage: "Hover states" },
    { name: "Primary 500", hex: "#6366F1", class: "bg-indigo-500", usage: "Default primary" },
    { name: "Primary 600", hex: "#4F46E5", class: "bg-indigo-600", usage: "Primary buttons" },
    { name: "Primary 700", hex: "#4338CA", class: "bg-indigo-700", usage: "Active states" },
    { name: "Primary 800", hex: "#3730A3", class: "bg-indigo-800", usage: "Dark variants" },
    { name: "Primary 900", hex: "#312E81", class: "bg-indigo-900", usage: "Darkest variant" },
  ]

  const secondaryColors = [
    { name: "Secondary 50", hex: "#FAF5FF", class: "bg-purple-50", usage: "Light backgrounds" },
    { name: "Secondary 100", hex: "#F3E8FF", class: "bg-purple-100", usage: "Subtle backgrounds" },
    { name: "Secondary 200", hex: "#E9D5FF", class: "bg-purple-200", usage: "Disabled states" },
    { name: "Secondary 300", hex: "#D8B4FE", class: "bg-purple-300", usage: "Borders, dividers" },
    { name: "Secondary 400", hex: "#C084FC", class: "bg-purple-400", usage: "Hover states" },
    { name: "Secondary 500", hex: "#A855F7", class: "bg-purple-500", usage: "Default secondary" },
    { name: "Secondary 600", hex: "#9333EA", class: "bg-purple-600", usage: "Secondary buttons" },
    { name: "Secondary 700", hex: "#7C3AED", class: "bg-purple-700", usage: "Active states" },
    { name: "Secondary 800", hex: "#6B21A8", class: "bg-purple-800", usage: "Dark variants" },
    { name: "Secondary 900", hex: "#581C87", class: "bg-purple-900", usage: "Darkest variant" },
  ]

  const semanticColors = [
    {
      name: "Success",
      colors: [
        { shade: "50", hex: "#F0FDF4", class: "bg-green-50" },
        { shade: "500", hex: "#22C55E", class: "bg-green-500" },
        { shade: "600", hex: "#16A34A", class: "bg-green-600" },
        { shade: "700", hex: "#15803D", class: "bg-green-700" },
      ],
      usage: "Success messages, completed states",
      icon: CheckCircle,
    },
    {
      name: "Warning",
      colors: [
        { shade: "50", hex: "#FFFBEB", class: "bg-yellow-50" },
        { shade: "500", hex: "#F59E0B", class: "bg-yellow-500" },
        { shade: "600", hex: "#D97706", class: "bg-yellow-600" },
        { shade: "700", hex: "#B45309", class: "bg-yellow-700" },
      ],
      usage: "Warning messages, caution states",
      icon: AlertTriangle,
    },
    {
      name: "Error",
      colors: [
        { shade: "50", hex: "#FEF2F2", class: "bg-red-50" },
        { shade: "500", hex: "#EF4444", class: "bg-red-500" },
        { shade: "600", hex: "#DC2626", class: "bg-red-600" },
        { shade: "700", hex: "#B91C1C", class: "bg-red-700" },
      ],
      usage: "Error messages, destructive actions",
      icon: XCircle,
    },
    {
      name: "Info",
      colors: [
        { shade: "50", hex: "#EFF6FF", class: "bg-blue-50" },
        { shade: "500", hex: "#3B82F6", class: "bg-blue-500" },
        { shade: "600", hex: "#2563EB", class: "bg-blue-600" },
        { shade: "700", hex: "#1D4ED8", class: "bg-blue-700" },
      ],
      usage: "Info messages, neutral states",
      icon: Info,
    },
  ]

  const neutralColors = [
    { name: "White", hex: "#FFFFFF", class: "bg-white", usage: "Backgrounds, cards" },
    { name: "Gray 50", hex: "#F9FAFB", class: "bg-gray-50", usage: "Light backgrounds" },
    { name: "Gray 100", hex: "#F3F4F6", class: "bg-gray-100", usage: "Subtle backgrounds" },
    { name: "Gray 200", hex: "#E5E7EB", class: "bg-gray-200", usage: "Borders, dividers" },
    { name: "Gray 300", hex: "#D1D5DB", class: "bg-gray-300", usage: "Disabled elements" },
    { name: "Gray 400", hex: "#9CA3AF", class: "bg-gray-400", usage: "Placeholder text" },
    { name: "Gray 500", hex: "#6B7280", class: "bg-gray-500", usage: "Secondary text" },
    { name: "Gray 600", hex: "#4B5563", class: "bg-gray-600", usage: "Body text" },
    { name: "Gray 700", hex: "#374151", class: "bg-gray-700", usage: "Headings" },
    { name: "Gray 800", hex: "#1F2937", class: "bg-gray-800", usage: "Dark text" },
    { name: "Gray 900", hex: "#111827", class: "bg-gray-900", usage: "Darkest text" },
    { name: "Black", hex: "#000000", class: "bg-black", usage: "High contrast text" },
  ]

  const gradients = [
    {
      name: "Primary Gradient",
      css: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
      class: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500",
      usage: "Hero sections, CTAs, brand elements",
    },
    {
      name: "Success Gradient",
      css: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      class: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      usage: "Success states, progress indicators",
    },
    {
      name: "Warning Gradient",
      css: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      class: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      usage: "Warning states, attention grabbers",
    },
    {
      name: "Neutral Gradient",
      css: "linear-gradient(135deg, #6B7280 0%, #374151 100%)",
      class: "bg-gradient-to-br from-gray-500 to-gray-700",
      usage: "Subtle backgrounds, secondary elements",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Color Guidelines
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete color system for consistent visual design across all platforms
          </p>
        </div>

        <Tabs defaultValue="primary" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="semantic">Semantic</TabsTrigger>
            <TabsTrigger value="neutral">Neutral</TabsTrigger>
            <TabsTrigger value="gradients">Gradients</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>

          {/* Primary Colors Tab */}
          <TabsContent value="primary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Primary Colors</CardTitle>
                  <p className="text-gray-600">Main brand colors for primary actions and elements</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {primaryColors.map((color, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className={`w-8 h-8 rounded-lg shadow-sm ${color.class}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{color.name}</span>
                            <span className="text-xs text-gray-500">{color.hex}</span>
                          </div>
                          <p className="text-xs text-gray-500">{color.usage}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(color.hex, `primary-${index}`)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Secondary Colors</CardTitle>
                  <p className="text-gray-600">Supporting colors for secondary actions and accents</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {secondaryColors.map((color, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className={`w-8 h-8 rounded-lg shadow-sm ${color.class}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{color.name}</span>
                            <span className="text-xs text-gray-500">{color.hex}</span>
                          </div>
                          <p className="text-xs text-gray-500">{color.usage}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(color.hex, `secondary-${index}`)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Semantic Colors Tab */}
          <TabsContent value="semantic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {semanticColors.map((colorGroup, groupIndex) => (
                <Card key={groupIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <colorGroup.icon className="w-5 h-5" />
                      <span>{colorGroup.name}</span>
                    </CardTitle>
                    <p className="text-gray-600">{colorGroup.usage}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {colorGroup.colors.map((color, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                          <div className={`w-8 h-8 rounded-lg shadow-sm ${color.class}`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {colorGroup.name} {color.shade}
                              </span>
                              <span className="text-xs text-gray-500">{color.hex}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(color.hex, `${colorGroup.name}-${index}`)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Neutral Colors Tab */}
          <TabsContent value="neutral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Neutral Colors</CardTitle>
                <p className="text-gray-600">Grayscale colors for text, backgrounds, and UI elements</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {neutralColors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`w-10 h-10 rounded-lg shadow-sm border ${color.class}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{color.name}</span>
                          <span className="text-sm text-gray-500">{color.hex}</span>
                        </div>
                        <p className="text-sm text-gray-500">{color.usage}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(color.hex, `neutral-${index}`)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gradients Tab */}
          <TabsContent value="gradients" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gradients.map((gradient, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{gradient.name}</CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(gradient.css, `gradient-${index}`)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedItem === `gradient-${index}` ? "Copied!" : "Copy CSS"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-24 rounded-2xl shadow-lg" style={{ background: gradient.css }}></div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">{gradient.usage}</p>
                        <div className="space-y-2">
                          <div>
                            <h5 className="font-semibold text-sm">CSS</h5>
                            <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto">
                              {gradient.css}
                            </code>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm">Tailwind</h5>
                            <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto">
                              {gradient.class}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Contrast className="w-5 h-5" />
                    <span>Contrast Ratios</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-600 text-white rounded-lg">
                      <div className="flex items-center justify-between">
                        <span>Primary on White</span>
                        <Badge variant="secondary">4.5:1 ✓</Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-600 text-white rounded-lg">
                      <div className="flex items-center justify-between">
                        <span>Gray 600 on White</span>
                        <Badge variant="secondary">7.1:1 ✓</Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-green-600 text-white rounded-lg">
                      <div className="flex items-center justify-between">
                        <span>Success on White</span>
                        <Badge variant="secondary">3.9:1 ✓</Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-red-600 text-white rounded-lg">
                      <div className="flex items-center justify-between">
                        <span>Error on White</span>
                        <Badge variant="secondary">5.1:1 ✓</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Color Blindness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Guidelines</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Never rely on color alone to convey information</li>
                        <li>• Use icons, patterns, or text labels alongside colors</li>
                        <li>• Test with color blindness simulators</li>
                        <li>• Ensure sufficient contrast ratios</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Safe Color Combinations</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-blue-100 text-blue-800 rounded text-sm text-center">Blue + White</div>
                        <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">Green + White</div>
                        <div className="p-2 bg-gray-100 text-gray-800 rounded text-sm text-center">Gray + White</div>
                        <div className="p-2 bg-yellow-100 text-yellow-800 rounded text-sm text-center">
                          Yellow + Black
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
