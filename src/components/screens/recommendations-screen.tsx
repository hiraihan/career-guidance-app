"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Heart, DollarSign, MapPin } from "lucide-react"
import { useApp } from "../../contexts/app-context"
import { Header } from "../shared/header"
import { BottomNavigation } from "../shared/bottom-navigation"
import { careers } from "../../data/app-data"
import type { Career } from "../../contexts/app-context"

export function RecommendationsScreen() {
  const { darkMode, navigateToScreen, setSelectedCareer, savedCareers, toggleSavedCareer } = useApp()

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCareers, setFilteredCareers] = useState(careers)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = careers.filter(
      (career) =>
        career.title.toLowerCase().includes(term.toLowerCase()) ||
        career.company.toLowerCase().includes(term.toLowerCase()) ||
        career.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
    )
    setFilteredCareers(filtered)
  }

  const handleCareerClick = (career: Career) => {
    // Change from any to Career
    setSelectedCareer(career)
    navigateToScreen("career-detail")
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"} pb-20`}>
      <Header
        title="Career Matches"
        showBack={true}
        backScreen="home"
        rightAction={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Filter className="w-5 h-5" />
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              darkMode ? "text-gray-400" : "text-gray-400"
            }`}
          />
          <Input
            placeholder="Search careers..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={`pl-12 h-12 rounded-2xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Top Matches for You</h2>
          <Badge variant="secondary" className="bg-green-100 text-green-800 rounded-full">
            {filteredCareers.length} found
          </Badge>
        </div>

        {/* Career Cards */}
        <div className="space-y-4">
          {filteredCareers.map((career) => (
            <Card
              key={career.id}
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
              } shadow-lg rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
              onClick={() => handleCareerClick(career)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{career.icon}</div>
                    <div>
                      <h3 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {career.title}
                      </h3>
                      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{career.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          career.match >= 90 ? "bg-green-500" : career.match >= 80 ? "bg-yellow-500" : "bg-orange-500"
                        }`}
                      />
                      <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {career.match}% match
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSavedCareer(career.id)
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${savedCareers.includes(career.id) ? "fill-current text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <DollarSign className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{career.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{career.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {career.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
