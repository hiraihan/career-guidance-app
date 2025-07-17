"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Layout, Zap, Eye, Download, Copy, Monitor, Tablet } from "lucide-react"

export function MockupShowcase() {
  const [selectedDevice, setSelectedDevice] = useState<"mobile" | "tablet" | "desktop">("mobile")
  const [selectedScreen, setSelectedScreen] = useState("onboarding")

  const colorPalette = {
    primary: {
      blue: { hex: "#3B82F6", name: "Primary Blue", usage: "Main actions, links" },
      purple: { hex: "#8B5CF6", name: "Primary Purple", usage: "Secondary actions" },
      indigo: { hex: "#6366F1", name: "Accent Indigo", usage: "Highlights" },
    },
    secondary: {
      green: { hex: "#10B981", name: "Success Green", usage: "Success states" },
      yellow: { hex: "#F59E0B", name: "Warning Yellow", usage: "Warnings" },
      red: { hex: "#EF4444", name: "Error Red", usage: "Errors" },
      pink: { hex: "#EC4899", name: "Accent Pink", usage: "Special features" },
    },
    neutral: {
      gray900: { hex: "#111827", name: "Dark Text", usage: "Primary text (light mode)" },
      gray600: { hex: "#4B5563", name: "Secondary Text", usage: "Secondary text" },
      gray300: { hex: "#D1D5DB", name: "Border", usage: "Borders, dividers" },
      gray50: { hex: "#F9FAFB", name: "Background", usage: "Page backgrounds" },
      white: { hex: "#FFFFFF", name: "White", usage: "Card backgrounds" },
    },
  }

  const typography = {
    headings: [
      { name: "H1 - Hero Title", size: "text-3xl", weight: "font-bold", usage: "Main page titles" },
      { name: "H2 - Section Title", size: "text-xl", weight: "font-semibold", usage: "Section headers" },
      { name: "H3 - Card Title", size: "text-lg", weight: "font-semibold", usage: "Card titles" },
      { name: "H4 - Subtitle", size: "text-base", weight: "font-medium", usage: "Subtitles" },
    ],
    body: [
      { name: "Body Large", size: "text-base", weight: "font-normal", usage: "Main content" },
      { name: "Body Medium", size: "text-sm", weight: "font-normal", usage: "Secondary content" },
      { name: "Body Small", size: "text-xs", weight: "font-normal", usage: "Captions, labels" },
    ],
  }

  const components = {
    buttons: [
      {
        name: "Primary Button",
        class: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
        usage: "Main actions",
      },
      { name: "Secondary Button", class: "border border-gray-300 text-gray-700", usage: "Secondary actions" },
      { name: "Ghost Button", class: "text-blue-600 hover:bg-blue-50", usage: "Tertiary actions" },
    ],
    cards: [
      { name: "Feature Card", class: "rounded-3xl shadow-lg", usage: "Main content cards" },
      { name: "Stats Card", class: "rounded-2xl shadow-sm", usage: "Statistics display" },
      { name: "Action Card", class: "rounded-2xl hover:scale-105", usage: "Interactive cards" },
    ],
  }

  const screens = [
    { id: "onboarding", name: "Onboarding", description: "Welcome screen with app introduction" },
    { id: "home", name: "Home Dashboard", description: "Main dashboard with progress and quick actions" },
    { id: "assessment", name: "Assessment", description: "Personality and skills assessment" },
    { id: "careers", name: "Career Recommendations", description: "Personalized career matches" },
    { id: "mentorship", name: "Mentorship", description: "Find and connect with mentors" },
    { id: "progress", name: "Progress Tracking", description: "Track learning and career progress" },
  ]

  const deviceSizes = {
    mobile: { width: "375px", height: "812px", name: "iPhone 13" },
    tablet: { width: "768px", height: "1024px", name: "iPad" },
    desktop: { width: "1440px", height: "900px", name: "Desktop" },
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            CareerCompass Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete design guidelines and mockups for the CareerCompass mobile application
          </p>
        </div>

        <Tabs defaultValue="mockups" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="mockups">Mockups</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          {/* Mockups Tab */}
          <TabsContent value="mockups" className="space-y-8">
            {/* Device Selector */}
            <div className="flex justify-center space-x-4">
              {Object.entries(deviceSizes).map(([device, specs]) => (
                <Button
                  key={device}
                  variant={selectedDevice === device ? "default" : "outline"}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => setSelectedDevice(device as any)}
                  className="flex items-center space-x-2"
                >
                  {device === "mobile" && <Smartphone className="w-4 h-4" />}
                  {device === "tablet" && <Tablet className="w-4 h-4" />}
                  {device === "desktop" && <Monitor className="w-4 h-4" />}
                  <span>{specs.name}</span>
                </Button>
              ))}
            </div>

            {/* Screen Selector */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {screens.map((screen) => (
                <Card
                  key={screen.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedScreen === screen.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedScreen(screen.id)}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-sm mb-1">{screen.name}</h3>
                    <p className="text-xs text-gray-600">{screen.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mockup Display */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800"
                  style={{
                    width: selectedDevice === "mobile" ? "375px" : selectedDevice === "tablet" ? "500px" : "800px",
                    height: selectedDevice === "mobile" ? "600px" : selectedDevice === "tablet" ? "650px" : "500px",
                  }}
                >
                  <MockupContent screen={selectedScreen} device={selectedDevice} />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="px-3 py-1">
                    {deviceSizes[selectedDevice].name} - {selectedScreen}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            {Object.entries(colorPalette).map(([category, colors]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">{category} Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(colors).map(([key, color]) => (
                      <div key={key} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 rounded-lg shadow-md" style={{ backgroundColor: color.hex }} />
                        <div className="flex-1">
                          <h4 className="font-semibold">{color.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">{color.hex}</p>
                          <p className="text-xs text-gray-500">{color.usage}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(color.hex)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            {Object.entries(typography).map(([category, styles]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {styles.map((style, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{style.name}</h4>
                          <Badge variant="outline">
                            {style.size} {style.weight}
                          </Badge>
                        </div>
                        <p className={`${style.size} ${style.weight} mb-2`}>
                          The quick brown fox jumps over the lazy dog
                        </p>
                        <p className="text-xs text-gray-500">{style.usage}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            {Object.entries(components).map(([category, items]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{item.name}</h4>
                          <Badge variant="outline">{item.usage}</Badge>
                        </div>
                        <div className="p-4 border rounded-lg bg-gray-50">
                          {category === "buttons" ? (
                            <Button className={item.class}>Sample Button</Button>
                          ) : (
                            <div className={`p-4 bg-white ${item.class}`}>Sample {item.name}</div>
                          )}
                        </div>
                        <code className="text-xs bg-gray-100 p-2 rounded block">className=&quot;{item.class}&quot;</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layout className="w-5 h-5" />
                    <span>Layout Principles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Spacing System</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Base unit: 4px (0.25rem)</li>
                      <li>• Small spacing: 8px, 12px, 16px</li>
                      <li>• Medium spacing: 20px, 24px, 32px</li>
                      <li>• Large spacing: 40px, 48px, 64px</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Grid System</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Mobile: 16px margins</li>
                      <li>• Tablet: 24px margins</li>
                      <li>• Desktop: 32px margins</li>
                      <li>• Max width: 1200px</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Visual Hierarchy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Importance Levels</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Primary: Bold colors, large text</li>
                      <li>• Secondary: Medium colors, medium text</li>
                      <li>• Tertiary: Muted colors, small text</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Interactive States</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Hover: Scale 105%, shadow increase</li>
                      <li>• Active: Scale 95%, shadow decrease</li>
                      <li>• Focus: Ring outline, accessibility</li>
                      <li>• Disabled: 50% opacity, no interaction</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Animation Guidelines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Timing</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Micro: 150ms (hover, focus)</li>
                      <li>• Small: 300ms (cards, buttons)</li>
                      <li>• Medium: 500ms (page transitions)</li>
                      <li>• Large: 800ms (complex animations)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Easing</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• ease-out: Entrances</li>
                      <li>• ease-in: Exits</li>
                      <li>• ease-in-out: Movements</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5" />
                    <span>Mobile Best Practices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Touch Targets</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Minimum: 44px × 44px</li>
                      <li>• Recommended: 48px × 48px</li>
                      <li>• Spacing: 8px between targets</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Navigation</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Bottom navigation for main sections</li>
                      <li>• Back button in top-left</li>
                      <li>• Swipe gestures for cards</li>
                      <li>• Pull-to-refresh support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Download Section */}
            <Card>
              <CardHeader>
                <CardTitle>Download Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Design Tokens (JSON)</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    <span>Figma File</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    <span>Icon Pack (SVG)</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Mockup Content Component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MockupContent({ screen, device }: { screen: string; device: string }) {
  const mockups = {
    onboarding: (
      <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CareerCompass
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">Navigate your career journey with AI-powered guidance</p>
        <div className="space-y-4 w-full max-w-sm">
          {["Personality Assessment", "Career Matching", "Expert Mentorship"].map((feature, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl"></div>
              <div>
                <h3 className="font-semibold text-sm">{feature}</h3>
                <p className="text-xs text-gray-600">Feature description</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 w-full max-w-sm">
          <div className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-semibold">Get Started</span>
          </div>
        </div>
      </div>
    ),
    home: (
      <div className="h-full bg-gray-50">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"></div>
              <div>
                <h1 className="font-bold text-sm">CareerCompass</h1>
                <p className="text-xs text-gray-500">Good morning, Alex!</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {["Streak", "XP", "Level"].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 text-center shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl mx-auto mb-2"></div>
                <div className="font-bold text-lg">7</div>
                <div className="text-xs text-gray-600">{stat}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Your Journey</h3>
              <span className="text-2xl font-bold">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">You&apos;re making excellent progress!</p>
          </div>
        </div>
      </div>
    ),
    assessment: (
      <div className="h-full bg-gray-50">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <h1 className="font-semibold">Personality Assessment</h1>
            <div className="w-6 h-6"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Question 3 of 12</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              style={{ width: "25%" }}
            ></div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-center mb-6">
              What type of work environment energizes you most?
            </h2>
            <div className="space-y-3">
              {[
                "Collaborative team settings",
                "Independent, focused work",
                "Dynamic, fast-paced environments",
                "Structured, organized spaces",
              ].map((option, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"></div>
                    <span className="text-sm">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    careers: (
      <div className="h-full bg-gray-50">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <h1 className="font-semibold">Career Matches</h1>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-3">
            <div className="w-full bg-gray-200 rounded-full h-8 mb-2"></div>
          </div>
          {[
            { title: "UX/UI Designer", company: "Tech Startup", match: 95, icon: "🎨" },
            { title: "Data Scientist", company: "Fortune 500", match: 88, icon: "📊" },
            { title: "Product Manager", company: "SaaS Company", match: 82, icon: "🚀" },
          ].map((career, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{career.icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{career.title}</h3>
                    <p className="text-xs text-gray-600">{career.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-semibold">{career.match}% match</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {["Creative", "Tech", "Design"].map((tag, j) => (
                  <div key={j} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    mentorship: (
      <div className="h-full bg-gray-50">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <h1 className="font-semibold">Find a Mentor</h1>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-3">
            <div className="w-full bg-gray-200 rounded-full h-8"></div>
          </div>
          {[
            { name: "Sarah Chen", role: "Senior UX Designer", company: "Google", rating: 4.9, price: "$45/hour" },
            {
              name: "Marcus Johnson",
              role: "Data Science Manager",
              company: "Netflix",
              rating: 4.8,
              price: "$60/hour",
            },
          ].map((mentor, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 shadow-sm">
              <div className="h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4"></div>
              <div className="flex items-start space-x-3 -mt-8">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl border-4 border-white"></div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-sm">{mentor.name}</h3>
                  <p className="text-xs text-gray-600">
                    {mentor.role} at {mentor.company}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">{mentor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="font-bold text-lg">{mentor.price}</p>
                <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Book Session</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    progress: (
      <div className="h-full bg-gray-50">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <h1 className="font-semibold">Your Progress</h1>
            <div className="w-6 h-6"></div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Career Journey</h2>
              <div className="w-8 h-8 bg-white/20 rounded-xl"></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-sm opacity-90">Great progress! You&apos;ve completed 8 out of 11 milestones.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Achievements", "Saved", "Milestones"].map((tab, i) => (
              <div
                key={i}
                className={`text-center py-2 px-3 rounded-lg text-sm ${i === 0 ? "bg-white shadow-sm font-semibold" : "text-gray-600"}`}
              >
                {tab}
              </div>
            ))}
          </div>

          {[
            { title: "Assessment Complete", desc: "Completed personality assessment", points: 100, unlocked: true },
            {
              title: "First Career Match",
              desc: "Found 3 careers with 85%+ compatibility",
              points: 150,
              unlocked: true,
            },
            { title: "Skill Explorer", desc: "Analyzed skill gaps for career readiness", points: 200, unlocked: false },
          ].map((achievement, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${achievement.unlocked ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-200"}`}
                >
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.desc}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">2 days ago</span>
                    <div className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                      +{achievement.points} pts
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${achievement.unlocked ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                >
                  {achievement.unlocked ? "Unlocked" : "Locked"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }

  return mockups[screen as keyof typeof mockups] || mockups.onboarding
}
