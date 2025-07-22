"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Type,
  Palette,
  Ruler,
  Grid,
  Compass,
  Sparkles,
  Layout,
  Smartphone,
  Eye,
  Download,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export function DesignSystemHub() {
  const guidelines = [
    {
      title: "Logo Guidelines",
      description: "Complete brand identity system with logo variations, usage rules, and assets",
      icon: Compass,
      href: "/logo-guidelines",
      color: "from-indigo-500 to-purple-600",
      features: ["Logo variations", "Usage rules", "Color specifications", "Download assets"],
    },
    {
      title: "Typography",
      description: "Font system, heading hierarchy, and text styling guidelines",
      icon: Type,
      href: "/typography-guidelines",
      color: "from-purple-500 to-pink-600",
      features: ["Font families", "Heading scale", "Body text", "Special text"],
    },
    {
      title: "Color System",
      description: "Primary, semantic, and neutral colors with accessibility guidelines",
      icon: Palette,
      href: "/color-guidelines",
      color: "from-pink-500 to-red-600",
      features: ["Color palettes", "Gradients", "Semantic colors", "Accessibility"],
    },
    {
      title: "Spacing System",
      description: "Consistent spacing scale for layouts, components, and responsive design",
      icon: Ruler,
      href: "/spacing-guidelines",
      color: "from-blue-500 to-indigo-600",
      features: ["Spacing scale", "Component spacing", "Layout patterns", "Responsive"],
    },
    {
      title: "Component Library",
      description: "UI components with specifications and usage examples",
      icon: Grid,
      href: "/design-system",
      color: "from-green-500 to-blue-600",
      features: ["Button styles", "Form elements", "Cards", "Navigation"],
    },
    {
      title: "Mobile Guidelines",
      description: "Mobile-specific design patterns and responsive considerations",
      icon: Smartphone,
      href: "/mobile-guidelines",
      color: "from-yellow-500 to-orange-600",
      features: ["Touch targets", "Mobile patterns", "Responsive design", "Accessibility"],
    },
  ]

  const quickLinks = [
    { name: "Figma Export Guide", href: "/figma-guide", icon: ExternalLink },
    { name: "Design Tokens", href: "/design-tokens", icon: Download },
    { name: "Accessibility Guide", href: "/accessibility", icon: Eye },
    { name: "Component Specs", href: "/component-specs", icon: Layout },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="relative">
                <Compass className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-1.5 h-1.5 text-yellow-800" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CareerCompass Design System
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete design guidelines and resources for consistent user experience across all platforms
          </p>
        </div>

        {/* Main Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guidelines.map((guideline, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${guideline.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <guideline.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{guideline.title}</CardTitle>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{guideline.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {guideline.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Link href={guideline.href}>
                    <Button className="w-full group-hover:bg-gray-900 transition-colors">
                      View Guidelines
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layout className="w-5 h-5" />
              <span>Quick Links</span>
            </CardTitle>
            <p className="text-gray-600">Additional resources and tools for designers and developers</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Button
                    variant="outline"
                    className="w-full h-16 flex flex-col items-center justify-center space-y-1 hover:bg-white transition-colors bg-transparent"
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm">{link.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <p className="text-gray-600">How to use this design system effectively</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Explore Guidelines</h4>
                <p className="text-sm text-gray-600">
                  Start with logo and typography guidelines to understand the brand foundation
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Use Components</h4>
                <p className="text-sm text-gray-600">Apply color and spacing systems to create consistent components</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-pink-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Export Assets</h4>
                <p className="text-sm text-gray-600">Download logos, export to Figma, and implement in your projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
