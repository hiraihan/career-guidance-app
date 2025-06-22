"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Lightbulb } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { Header } from "@/components/shared/header"
import { questions } from "../../data/app-data"

export function TestScreen() {
  const {
    darkMode,
    currentQuestion,
    setCurrentQuestion,
    navigateToScreen,
    addTestAnswer,
    testAnswers,
    updateProgress,
  } = useApp()

  const [selectedAnswer, setSelectedAnswer] = useState(testAnswers[currentQuestion] || "")

  const handleNext = () => {
    if (selectedAnswer) {
      addTestAnswer(selectedAnswer)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(testAnswers[currentQuestion + 1] || "")
      } else {
        // Test completed
        updateProgress(85)
        navigateToScreen("recommendations")
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(testAnswers[currentQuestion - 1] || "")
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header title="Personality Assessment" showBack={true} backScreen="home" />

      <div className="px-6 pb-4">
        <div className="text-center mb-4">
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} />
      </div>

      <div className="p-6">
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-lg rounded-3xl mb-6`}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {questions[currentQuestion].question}
              </h2>
            </div>

            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className={`flex-1 p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:bg-opacity-50 ${
                      selectedAnswer === option
                        ? darkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-50"
                        : darkMode
                          ? "border-gray-600 hover:bg-gray-700 text-white"
                          : "border-gray-200 hover:bg-gray-50 text-gray-900"
                    }`}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1 h-12 rounded-2xl"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
