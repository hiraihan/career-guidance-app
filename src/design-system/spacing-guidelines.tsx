/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, Copy, Grid, Square, Layout, Smartphone, Monitor, Tablet } from "lucide-react"

export function SpacingGuidelines() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const spacingScale = [
    { name: "0", value: "0px", class: "0", usage: "No spacing" },
    { name: "0.5", value: "2px", class: "0.5", usage: "Hairline borders" },
    { name: "1", value: "4px", class: "1", usage: "Small gaps" },
    { name: "1.5", value: "6px", class: "1.5", usage: "Tight spacing" },
    { name: "2", value: "8px", class: "2", usage: "Small padding" },
    { name: "2.5", value: "10px", class: "2.5", usage: "Compact spacing" },
    { name: "3", value: "12px", class: "3", usage: "Default small" },
    { name: "3.5", value: "14px", class: "3.5", usage: "Medium-small" },
    { name: "4", value: "16px", class: "4", usage: "Default medium" },
    { name: "5", value: "20px", class: "5", usage: "Comfortable" },
    { name: "6", value: "24px", class: "6", usage: "Large spacing" },
    { name: "7", value: "28px", class: "7", usage: "Extra large" },
    { name: "8", value: "32px", class: "8", usage: "Section spacing" },
    { name: "9", value: "36px", class: "9", usage: "Large sections" },
    { name: "10", value: "40px", class: "10", usage: "Major spacing" },
    { name: "12", value: "48px", class: "12", usage: "Page sections" },
    { name: "16", value: "64px", class: "16", usage: "Large sections" },
    { name: "20", value: "80px", class: "20", usage: "Hero spacing" },
    { name: "24", value: "96px", class: "24", usage: "Major sections" },
    { name: "32", value: "128px", class: "32", usage: "Page spacing" },
  ]

  const componentSpacing = [
    {
      component: "Button",
      padding: "px-4 py-2",
      margin: "mr-2 mb-2",
      gap: "space-x-2",
      usage: "Standard button spacing",
    },
    {
      component: "Card",
      padding: "p-6",
      margin: "mb-6",
      gap: "space-y-4",
      usage: "Card content spacing",
    },
    {
      component: "Form Field",
      padding: "px-3 py-2",
      margin: "mb-4",
      gap: "space-y-1",
      usage: "Form input spacing",
    },
    {
      component: "Navigation",
      padding: "px-4 py-2",
      margin: "mr-6",
      gap: "space-x-6",
      usage: "Navigation item spacing",
    },
    {
      component: "List Item",
      padding: "py-3 px-4",
      margin: "mb-1",
      gap: "space-x-3",
      usage: "List content spacing",
    },
    {
      component: "Modal",
      padding: "p-8",
      margin: "m-4",
      gap: "space-y-6",
      usage: "Modal content spacing",
    },
  ]

  const layoutSpacing = [
    {
      name: "Container",
      mobile: "px-4",
      tablet: "px-6",
      desktop: "px-8",
      usage: "Main container padding",
    },
    {
      name: "Section",
      mobile: "py-8",
      tablet: "py-12",
      desktop: "py-16",
      usage: "Section vertical spacing",
    },
    {
      name: "Grid Gap",
      mobile: "gap-4",
      tablet: "gap-6",
      desktop: "gap-8",
      usage: "Grid item spacing",
    },
    {
      name: "Header",
      mobile: "h-16",
      tablet: "h-18",
      desktop: "h-20",
      usage: "Header height",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Ruler className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Spacing Guidelines
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consistent spacing system for harmonious layouts and improved user experience
          </p>
        </div>

        <Tabs defaultValue="scale" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scale">Spacing Scale</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="responsive">Responsive</TabsTrigger>
          </TabsList>

          {/* Spacing Scale Tab */}
          <TabsContent value="scale" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Grid className="w-5 h-5" />
                  <span>Base Spacing Scale</span>
                </CardTitle>
                <p className="text-gray-600">8px base unit system for consistent spacing</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spacingScale.map((space, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3 flex-1">
                        <Badge variant="outline" className="min-w-12 justify-center">
                          {space.name}
                        </Badge>
                        <div className="bg-indigo-500 h-4 rounded" style={{ width: space.value }}></div>
                        <span className="text-sm font-mono text-gray-600">{space.value}</span>
                        <span className="text-sm text-gray-500">{space.usage}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">space-{space.class}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(`space-${space.class}`, `scale-${index}`)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Patterns */}
            <Card>
              <CardHeader>
                <CardTitle>Common Spacing Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Padding Patterns</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Small components</span>
                        <code className="text-xs">p-2 (8px)</code>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Medium components</span>
                        <code className="text-xs">p-4 (16px)</code>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Large components</span>
                        <code className="text-xs">p-6 (24px)</code>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Containers</span>
                        <code className="text-xs">p-8 (32px)</code>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Margin Patterns</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Tight spacing</span>
                        <code className="text-xs">mb-2 (8px)</code>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Default spacing</span>
                        <code className="text-xs">mb-4 (16px)</code>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Section spacing</span>
                        <code className="text-xs">mb-8 (32px)</code>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Page spacing</span>
                        <code className="text-xs">mb-12 (48px)</code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {componentSpacing.map((comp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Square className="w-5 h-5" />
                      <span>{comp.component}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{comp.usage}</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Padding:</span>
                          <div className="flex items-center space-x-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{comp.padding}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(comp.padding, `comp-padding-${index}`)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Margin:</span>
                          <div className="flex items-center space-x-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{comp.margin}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(comp.margin, `comp-margin-${index}`)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Gap:</span>
                          <div className="flex items-center space-x-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{comp.gap}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(comp.gap, `comp-gap-${index}`)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <div className="space-y-6">
              {layoutSpacing.map((layout, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Layout className="w-5 h-5" />
                      <span>{layout.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{layout.usage}</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <Smartphone className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <h5 className="font-semibold text-sm mb-1">Mobile</h5>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{layout.mobile}</code>
                        </div>
                        <div className="text-center">
                          <Tablet className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <h5 className="font-semibold text-sm mb-1">Tablet</h5>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{layout.tablet}</code>
                        </div>
                        <div className="text-center">
                          <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <h5 className="font-semibold text-sm mb-1">Desktop</h5>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{layout.desktop}</code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Responsive Tab */}
          <TabsContent value="responsive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Responsive Spacing Strategy</CardTitle>
                <p className="text-gray-600">How spacing adapts across different screen sizes</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold mb-2">Mobile (&lt; 768px)</h4>
                    <div className="space-y-2 text-left">
                      <div className="text-xs bg-gray-50 p-2 rounded">Container: px-4 (16px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Sections: py-8 (32px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Cards: p-4 (16px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Grid gap: gap-4 (16px)</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Tablet className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold mb-2">Tablet (768px - 1024px)</h4>
                    <div className="space-y-2 text-left">
                      <div className="text-xs bg-gray-50 p-2 rounded">Container: px-6 (24px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Sections: py-12 (48px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Cards: p-6 (24px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Grid gap: gap-6 (24px)</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Monitor className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold mb-2">Desktop (&gt; 1024px)</h4>
                    <div className="space-y-2 text-left">
                      <div className="text-xs bg-gray-50 p-2 rounded">Container: px-8 (32px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Sections: py-16 (64px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Cards: p-8 (32px)</div>
                      <div className="text-xs bg-gray-50 p-2 rounded">Grid gap: gap-8 (32px)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsive Spacing Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Container Spacing</h4>
                    <code className="text-sm bg-gray-100 p-3 rounded-lg block">
                      className=&quot;px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16&quot;
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Grid Spacing</h4>
                    <code className="text-sm bg-gray-100 p-3 rounded-lg block">
                      className=&quot;grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3&quot;
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Card Spacing</h4>
                    <code className="text-sm bg-gray-100 p-3 rounded-lg block">
                      className=&quot;p-4 md:p-6 lg:p-8 mb-4 md:mb-6 lg:mb-8&quot;
                    </code>
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
