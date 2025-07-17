"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Copy,
  ExternalLink,
  Figma,
  Palette,
  Type,
  Layout,
  Smartphone,
  Code,
  FileText,
  Zap,
} from "lucide-react"

export function FigmaExportGuide() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const designTokens = {
    colors: {
      primary: {
        blue: "#3B82F6",
        purple: "#8B5CF6",
        indigo: "#6366F1",
      },
      secondary: {
        green: "#10B981",
        yellow: "#F59E0B",
        red: "#EF4444",
        pink: "#EC4899",
      },
      neutral: {
        gray900: "#111827",
        gray600: "#4B5563",
        gray300: "#D1D5DB",
        gray50: "#F9FAFB",
        white: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      sizes: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
      },
      weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      "3xl": "64px",
    },
    borderRadius: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      "2xl": "32px",
      full: "9999px",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    },
  }

  const figmaSteps = [
    {
      step: 1,
      title: "Setup Figma File",
      description: "Create new Figma file and setup basic structure",
      actions: [
        "Create new Figma file named 'CareerCompass Design System'",
        "Create pages: 'Design System', 'Mockups', 'Components', 'Prototypes'",
        "Setup grid system (8px base unit)",
        "Import Inter font family",
      ],
    },
    {
      step: 2,
      title: "Create Color Styles",
      description: "Setup color palette and create Figma color styles",
      actions: [
        "Create color swatches for all design tokens",
        "Setup Figma color styles for each color",
        "Create gradient styles for primary combinations",
        "Add semantic color names (primary, secondary, etc.)",
      ],
    },
    {
      step: 3,
      title: "Typography System",
      description: "Create text styles and typography hierarchy",
      actions: [
        "Create text styles for all heading levels (H1-H4)",
        "Setup body text styles (large, medium, small)",
        "Add font weights and line heights",
        "Create component text styles",
      ],
    },
    {
      step: 4,
      title: "Component Library",
      description: "Build reusable component library",
      actions: [
        "Create button components (primary, secondary, ghost)",
        "Build card components (feature, stats, action)",
        "Design input and form components",
        "Create navigation components",
      ],
    },
    {
      step: 5,
      title: "Screen Mockups",
      description: "Design all app screens using components",
      actions: [
        "Create mobile frames (375x812px)",
        "Design onboarding flow",
        "Create home dashboard",
        "Build assessment screens",
        "Design career recommendations",
        "Create mentorship screens",
      ],
    },
    {
      step: 6,
      title: "Prototyping",
      description: "Add interactions and create prototype",
      actions: [
        "Connect screens with transitions",
        "Add micro-interactions for buttons",
        "Create hover states",
        "Setup smart animate transitions",
      ],
    },
  ]

  const figmaResources = [
    {
      title: "Figma Community Templates",
      description: "Pre-built mobile app templates you can customize",
      links: [
        { name: "Mobile App Design System", url: "https://figma.com/@templates" },
        { name: "iOS App Template", url: "https://figma.com/@ios" },
        { name: "Material Design System", url: "https://figma.com/@material" },
      ],
    },
    {
      title: "Design System Plugins",
      description: "Helpful Figma plugins for design systems",
      links: [
        { name: "Design Tokens", url: "https://figma.com/plugins" },
        { name: "Color Palette Generator", url: "https://figma.com/plugins" },
        { name: "Auto Layout", url: "https://figma.com/plugins" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Figma className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Figma Design Guide
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete guide to recreate CareerCompass design in Figma with design tokens, components, and mockups
          </p>
        </div>

        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
            <TabsTrigger value="guide">Step-by-Step</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="export">Export Code</TabsTrigger>
          </TabsList>

          {/* Design Tokens Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Color Tokens</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(designTokens.colors).map(([category, colors]) => (
                    <div key={category}>
                      <h4 className="font-semibold mb-3 capitalize">{category}</h4>
                      <div className="space-y-2">
                        {Object.entries(colors).map(([name, hex]) => (
                          <div key={name} className="flex items-center space-x-3 p-2 border rounded-lg">
                            <div className="w-8 h-8 rounded-lg shadow-sm border" style={{ backgroundColor: hex }} />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{name}</p>
                              <p className="text-xs text-gray-600">{hex}</p>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(hex, `color-${name}`)}>
                              {copiedItem === `color-${name}` ? "Copied!" : <Copy className="w-3 h-3" />}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Type className="w-5 h-5" />
                  <span>Typography Tokens</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Font Sizes</h4>
                    <div className="space-y-2">
                      {Object.entries(designTokens.typography.sizes).map(([name, size]) => (
                        <div key={name} className="flex items-center justify-between p-2 border rounded-lg">
                          <span className="font-medium">{name}</span>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{size}</code>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(size, `size-${name}`)}>
                            {copiedItem === `size-${name}` ? "✓" : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Font Weights</h4>
                    <div className="space-y-2">
                      {Object.entries(designTokens.typography.weights).map(([name, weight]) => (
                        <div key={name} className="flex items-center justify-between p-2 border rounded-lg">
                          <span className="font-medium">{name}</span>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{weight}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(weight.toString(), `weight-${name}`)}
                          >
                            {copiedItem === `weight-${name}` ? "✓" : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layout className="w-5 h-5" />
                  <span>Spacing & Layout Tokens</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Spacing Scale</h4>
                    <div className="space-y-2">
                      {Object.entries(designTokens.spacing).map(([name, value]) => (
                        <div key={name} className="flex items-center justify-between p-2 border rounded-lg">
                          <span className="font-medium">{name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="bg-blue-200 h-4" style={{ width: value }} />
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{value}</code>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(value, `spacing-${name}`)}>
                            {copiedItem === `spacing-${name}` ? "✓" : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Border Radius</h4>
                    <div className="space-y-2">
                      {Object.entries(designTokens.borderRadius).map(([name, value]) => (
                        <div key={name} className="flex items-center justify-between p-2 border rounded-lg">
                          <span className="font-medium">{name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-200 border" style={{ borderRadius: value }} />
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{value}</code>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(value, `radius-${name}`)}>
                            {copiedItem === `radius-${name}` ? "✓" : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step-by-Step Guide Tab */}
          <TabsContent value="guide" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {figmaSteps.map((step) => (
                <Card key={step.step}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                      <span>{step.title}</span>
                    </CardTitle>
                    <p className="text-gray-600">{step.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {step.actions.map((action, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-sm">{action}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {figmaResources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                    <p className="text-gray-600">{resource.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {resource.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          variant="outline"
                          className="w-full justify-between bg-transparent"
                          onClick={() => window.open(link.url, "_blank")}
                        >
                          <span>{link.name}</span>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5" />
                  <span>Mobile App Specifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">iPhone 13/14</h4>
                    <p className="text-sm text-gray-600 mb-2">Primary target device</p>
                    <ul className="text-sm space-y-1">
                      <li>• Width: 375px</li>
                      <li>• Height: 812px</li>
                      <li>• Safe area: 44px top</li>
                      <li>• Bottom: 34px</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Android Large</h4>
                    <p className="text-sm text-gray-600 mb-2">Secondary target</p>
                    <ul className="text-sm space-y-1">
                      <li>• Width: 360px</li>
                      <li>• Height: 800px</li>
                      <li>• Status bar: 24px</li>
                      <li>• Navigation: 48px</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Tablet</h4>
                    <p className="text-sm text-gray-600 mb-2">Responsive layout</p>
                    <ul className="text-sm space-y-1">
                      <li>• Width: 768px</li>
                      <li>• Height: 1024px</li>
                      <li>• 2-column layout</li>
                      <li>• Larger touch targets</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Code Tab */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Design Tokens JSON</span>
                </CardTitle>
                <p className="text-gray-600">Copy this JSON to import into Figma using design tokens plugins</p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{JSON.stringify(designTokens, null, 2)}</code>
                  </pre>
                  <Button
                    className="absolute top-2 right-2"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(designTokens, null, 2), "tokens-json")}
                  >
                    {copiedItem === "tokens-json" ? "Copied!" : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>CSS Variables</span>
                </CardTitle>
                <p className="text-gray-600">CSS custom properties for web implementation</p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`:root {
  /* Colors */
  --color-primary-blue: #3B82F6;
  --color-primary-purple: #8B5CF6;
  --color-primary-indigo: #6366F1;
  
  /* Typography */
  --font-family: Inter, system-ui, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}`}</code>
                  </pre>
                  <Button
                    className="absolute top-2 right-2"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        `:root {
  /* Colors */
  --color-primary-blue: #3B82F6;
  --color-primary-purple: #8B5CF6;
  --color-primary-indigo: #6366F1;
  
  /* Typography */
  --font-family: Inter, system-ui, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}`,
                        "css-vars",
                      )
                    }
                  >
                    {copiedItem === "css-vars" ? "Copied!" : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-12 bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Download Design Tokens
              </Button>
              <Button variant="outline" className="h-12 bg-transparent">
                <Figma className="w-4 h-4 mr-2" />
                Open Figma Template
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Need Help Creating the Figma File?</h3>
                <p className="text-gray-600">I can provide more detailed guidance or specific component designs</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Get Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
