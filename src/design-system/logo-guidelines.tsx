"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Palette,
  Eye,
  Smartphone,
  Printer,
  Compass,
  Sparkles,
  CheckCircle,
  XCircle,
  Grid,
  Zap,
} from "lucide-react"

export function LogoGuidelines() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const logoSpecs = {
    primaryColors: {
      gradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
      blue: "#4F46E5",
      purple: "#7C3AED",
      pink: "#EC4899",
      accent: "#FCD34D", // Yellow star
    },
    dimensions: {
      icon: "1024x1024px",
      favicon: "32x32px",
      appIcon: "180x180px",
      socialMedia: "400x400px",
    },
    clearSpace: "Minimum 16px on all sides",
    minSize: "24x24px (digital), 0.5 inch (print)",
  }

  const logoVariations = [
    {
      name: "Primary App Icon",
      description: "Main logo with gradient background and white compass",
      usage: "App stores, primary branding",
      background: "Gradient background included",
      format: "PNG, SVG",
    },
    {
      name: "Icon Only",
      description: "White compass symbol without background",
      usage: "Overlays, watermarks, monochrome applications",
      background: "Transparent",
      format: "PNG, SVG",
    },
    {
      name: "Monochrome",
      description: "Single color version for special applications",
      usage: "Embossing, single-color printing, accessibility",
      background: "Any solid color",
      format: "PNG, SVG",
    },
    {
      name: "Horizontal Logo",
      description: "Icon + text combination",
      usage: "Headers, business cards, signatures",
      background: "White or transparent",
      format: "PNG, SVG",
    },
  ]

  const usageGuidelines = {
    correct: [
      "Use on white or light backgrounds for maximum contrast",
      "Maintain minimum clear space around logo",
      "Use original colors and proportions",
      "Scale proportionally (maintain aspect ratio)",
      "Use high-resolution files for print",
    ],
    incorrect: [
      "Don't stretch or distort the logo",
      "Don't change colors or add effects",
      "Don't place on busy backgrounds",
      "Don't use low-resolution files",
      "Don't rotate or modify the compass orientation",
    ],
  }

  const technicalSpecs = {
    digital: {
      formats: ["PNG (with transparency)", "SVG (vector)", "ICO (favicon)"],
      resolutions: ["16x16", "32x32", "64x64", "128x128", "256x256", "512x512", "1024x1024"],
      colorSpace: "sRGB",
      compression: "Optimized for web",
    },
    print: {
      formats: ["EPS (vector)", "PDF", "PNG (300 DPI)"],
      colorSpace: "CMYK for print, RGB for digital",
      resolution: "300 DPI minimum",
      sizes: ["0.5 inch minimum", "Business card size", "Letterhead size"],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
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
              CareerCompass Logo Guidelines
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete brand guidelines and logo specifications for consistent usage across all platforms
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
            <TabsTrigger value="usage">Usage Rules</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Logo Display */}
              <Card>
                <CardHeader>
                  <CardTitle>Primary Logo</CardTitle>
                  <p className="text-gray-600">Main brand identity for CareerCompass</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                      <div className="relative">
                        <Compass className="w-16 h-16 text-white" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-yellow-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Dimensions</span>
                      <Badge variant="outline">1024x1024px</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Format</span>
                      <Badge variant="outline">PNG, SVG</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Background</span>
                      <Badge variant="outline">Gradient</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logo Anatomy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Logo Anatomy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded"></div>
                      <div>
                        <p className="font-medium">Background Gradient</p>
                        <p className="text-sm text-gray-600">Blue to purple gradient (135°)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Compass className="w-4 h-4 text-white bg-gray-800 rounded p-0.5" />
                      <div>
                        <p className="font-medium">Compass Symbol</p>
                        <p className="text-sm text-gray-600">White compass representing navigation</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="font-medium">Accent Star</p>
                        <p className="text-sm text-gray-600">Yellow sparkle for guidance/success</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-2xl"></div>
                      <div>
                        <p className="font-medium">Rounded Container</p>
                        <p className="text-sm text-gray-600">Modern app icon styling</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Color Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Color Specifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div
                      className="w-20 h-20 mx-auto mb-3 rounded-2xl shadow-lg"
                      style={{ background: logoSpecs.primaryColors.gradient }}
                    ></div>
                    <h4 className="font-semibold mb-1">Primary Gradient</h4>
                    <p className="text-xs text-gray-600 mb-2">Main background</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(logoSpecs.primaryColors.gradient, "gradient")}
                    >
                      {copiedItem === "gradient" ? "Copied!" : "Copy CSS"}
                    </Button>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-20 h-20 mx-auto mb-3 rounded-2xl shadow-lg"
                      style={{ backgroundColor: logoSpecs.primaryColors.blue }}
                    ></div>
                    <h4 className="font-semibold mb-1">Primary Blue</h4>
                    <p className="text-xs text-gray-600 mb-2">{logoSpecs.primaryColors.blue}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(logoSpecs.primaryColors.blue, "blue")}
                    >
                      {copiedItem === "blue" ? "Copied!" : "Copy Hex"}
                    </Button>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-20 h-20 mx-auto mb-3 rounded-2xl shadow-lg"
                      style={{ backgroundColor: logoSpecs.primaryColors.purple }}
                    ></div>
                    <h4 className="font-semibold mb-1">Primary Purple</h4>
                    <p className="text-xs text-gray-600 mb-2">{logoSpecs.primaryColors.purple}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(logoSpecs.primaryColors.purple, "purple")}
                    >
                      {copiedItem === "purple" ? "Copied!" : "Copy Hex"}
                    </Button>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-20 h-20 mx-auto mb-3 rounded-2xl shadow-lg"
                      style={{ backgroundColor: logoSpecs.primaryColors.accent }}
                    ></div>
                    <h4 className="font-semibold mb-1">Accent Yellow</h4>
                    <p className="text-xs text-gray-600 mb-2">{logoSpecs.primaryColors.accent}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(logoSpecs.primaryColors.accent, "accent")}
                    >
                      {copiedItem === "accent" ? "Copied!" : "Copy Hex"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Variations Tab */}
          <TabsContent value="variations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {logoVariations.map((variation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{variation.name}</CardTitle>
                    <p className="text-gray-600">{variation.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 rounded-2xl p-6 mb-4 flex items-center justify-center min-h-32">
                      {index === 0 && (
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <div className="relative">
                            <Compass className="w-10 h-10 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                              <Sparkles className="w-1.5 h-1.5 text-yellow-800" />
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="w-20 h-20 flex items-center justify-center">
                          <div className="relative">
                            <Compass className="w-12 h-12 text-gray-800" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                              <Sparkles className="w-1.5 h-1.5 text-yellow-800" />
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center">
                          <div className="relative">
                            <Compass className="w-12 h-12 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center">
                              <Sparkles className="w-1.5 h-1.5 text-gray-800" />
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <div className="relative">
                              <Compass className="w-6 h-6 text-white" />
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Sparkles className="w-1 h-1 text-yellow-800" />
                              </div>
                            </div>
                          </div>
                          <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            CareerCompass
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Usage:</span>
                        <span className="text-sm text-gray-600">{variation.usage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Background:</span>
                        <span className="text-sm text-gray-600">{variation.background}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Format:</span>
                        <span className="text-sm text-gray-600">{variation.format}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Usage Rules Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Correct Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Correct Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usageGuidelines.correct.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Incorrect Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Incorrect Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usageGuidelines.incorrect.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clear Space Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Grid className="w-5 h-5" />
                  <span>Clear Space & Sizing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Clear Space Requirements</h4>
                    <div className="bg-gray-100 rounded-2xl p-12 flex items-center justify-center mb-4 relative">
                      {/* Clear space indicators */}
                      <div className="absolute inset-8 border-2 border-dashed border-blue-300 rounded-xl"></div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-medium">
                        16px
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-medium">
                        16px
                      </div>
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-blue-600 font-medium">
                        16px
                      </div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-blue-600 font-medium">
                        16px
                      </div>

                      {/* Logo */}
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg z-10">
                        <div className="relative">
                          <Compass className="w-8 h-8 text-white" />
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Sparkles className="w-1 h-1 text-yellow-800" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Minimum 16px clear space on all sides</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Minimum Sizes</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Digital minimum</span>
                        <Badge variant="outline">24x24px</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Print minimum</span>
                        <Badge variant="outline">0.5 inch</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">App icon</span>
                        <Badge variant="outline">180x180px</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Favicon</span>
                        <Badge variant="outline">32x32px</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Specifications Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Digital Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5" />
                    <span>Digital Specifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">File Formats</h4>
                      <div className="space-y-2">
                        {technicalSpecs.digital.formats.map((format, index) => (
                          <Badge key={index} variant="outline" className="mr-2 mb-2">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Required Resolutions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {technicalSpecs.digital.resolutions.map((res, index) => (
                          <div key={index} className="text-sm p-2 bg-gray-50 rounded text-center">
                            {res}px
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Color Space</h4>
                      <p className="text-sm text-gray-600">{technicalSpecs.digital.colorSpace}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Print Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Printer className="w-5 h-5" />
                    <span>Print Specifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">File Formats</h4>
                      <div className="space-y-2">
                        {technicalSpecs.print.formats.map((format, index) => (
                          <Badge key={index} variant="outline" className="mr-2 mb-2">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Resolution</h4>
                      <p className="text-sm text-gray-600">{technicalSpecs.print.resolution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Color Space</h4>
                      <p className="text-sm text-gray-600">{technicalSpecs.print.colorSpace}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Print Sizes</h4>
                      <div className="space-y-1">
                        {technicalSpecs.print.sizes.map((size, index) => (
                          <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                            {size}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Logo Assets</span>
                </CardTitle>
                <p className="text-gray-600">Complete logo package with all variations and formats</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="min-h-[4rem] sm:min-h-[5rem] flex flex-col items-center justify-center space-y-1 p-4">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">PNG Package</span>
                    <span className="text-xs opacity-75 text-center leading-tight">All sizes, transparent</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[4rem] sm:min-h-[5rem] flex flex-col items-center justify-center space-y-1 p-4 bg-transparent"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">SVG Vector</span>
                    <span className="text-xs opacity-75 text-center leading-tight">Scalable format</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[4rem] sm:min-h-[5rem] flex flex-col items-center justify-center space-y-1 p-4 bg-transparent"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">Print Ready</span>
                    <span className="text-xs opacity-75 text-center leading-tight">EPS, PDF, 300 DPI</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[4rem] sm:min-h-[5rem] flex flex-col items-center justify-center space-y-1 p-4 bg-transparent"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">App Icons</span>
                    <span className="text-xs opacity-75 text-center leading-tight">iOS, Android sizes</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[4rem] sm:min-h-[5rem] flex flex-col items-center justify-center space-y-1 p-4 bg-transparent"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">Favicon Pack</span>
                    <span className="text-xs opacity-75 text-center leading-tight">ICO, PNG variants</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[4rem] sm:min-h-[5rem] flex flex-col items-center justify-center space-y-1 p-4 bg-transparent"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">Brand Guidelines</span>
                    <span className="text-xs opacity-75 text-center leading-tight">Complete PDF guide</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Quick Reference</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Primary Blue</p>
                        <p className="text-gray-600">#4F46E5</p>
                      </div>
                      <div>
                        <p className="font-medium">Primary Purple</p>
                        <p className="text-gray-600">#7C3AED</p>
                      </div>
                      <div>
                        <p className="font-medium">Accent Yellow</p>
                        <p className="text-gray-600">#FCD34D</p>
                      </div>
                      <div>
                        <p className="font-medium">Min Size</p>
                        <p className="text-gray-600">24x24px</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
