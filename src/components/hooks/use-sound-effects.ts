"use client"

import { useEffect, useState, useCallback } from "react"

type SoundType =
  | "click"
  | "hover"
  | "success"
  | "error"
  | "notification"
  | "achievement"
  | "send"
  | "receive"
  | "switch"
  | "level_up"
  | "coin"
  | "whoosh"
  | "pop"
  | "ding"

interface SoundConfig {
  volume: number
  pitch: number
  duration: number
  type: "sine" | "square" | "sawtooth" | "triangle"
}

const soundConfigs: Record<SoundType, SoundConfig> = {
  click: { volume: 0.3, pitch: 800, duration: 100, type: "sine" },
  hover: { volume: 0.1, pitch: 600, duration: 50, type: "sine" },
  success: { volume: 0.4, pitch: 523, duration: 200, type: "sine" },
  error: { volume: 0.4, pitch: 200, duration: 300, type: "sawtooth" },
  notification: { volume: 0.5, pitch: 440, duration: 150, type: "sine" },
  achievement: { volume: 0.6, pitch: 659, duration: 500, type: "sine" },
  send: { volume: 0.3, pitch: 1000, duration: 80, type: "triangle" },
  receive: { volume: 0.3, pitch: 500, duration: 120, type: "sine" },
  switch: { volume: 0.2, pitch: 700, duration: 60, type: "square" },
  level_up: { volume: 0.7, pitch: 523, duration: 800, type: "sine" },
  coin: { volume: 0.4, pitch: 1319, duration: 100, type: "sine" },
  whoosh: { volume: 0.3, pitch: 100, duration: 200, type: "sawtooth" },
  pop: { volume: 0.4, pitch: 1000, duration: 50, type: "sine" },
  ding: { volume: 0.5, pitch: 2093, duration: 300, type: "sine" },
}

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined" && "AudioContext" in window) {
      const context = new AudioContext()
      setAudioContext(context)

      // Resume audio context on user interaction (required by browsers)
      const resumeAudio = () => {
        if (context.state === "suspended") {
          context.resume()
        }
      }

      document.addEventListener("click", resumeAudio, { once: true })
      document.addEventListener("touchstart", resumeAudio, { once: true })

      return () => {
        context.close()
        document.removeEventListener("click", resumeAudio)
        document.removeEventListener("touchstart", resumeAudio)
      }
    }
  }, [])

  const playSound = useCallback(
    (soundType: SoundType) => {
      if (isMuted || !audioContext) return

      const config = soundConfigs[soundType]

      try {
        // Create oscillator for the sound
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.type = config.type
        oscillator.frequency.setValueAtTime(config.pitch, audioContext.currentTime)

        // Create envelope for natural sound
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(config.volume, audioContext.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration / 1000)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + config.duration / 1000)

        // Special effects for certain sounds
        if (soundType === "achievement") {
          // Play a chord for achievement
          setTimeout(() => playChord([523, 659, 784]), 100)
          setTimeout(() => playChord([659, 784, 988]), 200)
        } else if (soundType === "level_up") {
          // Ascending notes for level up
          setTimeout(() => playNote(659, 100), 100)
          setTimeout(() => playNote(784, 100), 200)
          setTimeout(() => playNote(988, 200), 300)
        }
      } catch (error) {
        console.warn("Sound playback failed:", error)
      }
    },
    [isMuted, audioContext],
  )

  const playNote = useCallback(
    (frequency: number, duration: number) => {
      if (isMuted || !audioContext) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    },
    [isMuted, audioContext],
  )

  const playChord = useCallback(
    (frequencies: number[]) => {
      frequencies.forEach((freq) => playNote(freq, 200))
    },
    [playNote],
  )

  const playMelody = useCallback(
    (notes: Array<{ frequency: number; duration: number }>) => {
      let currentTime = 0
      notes.forEach((note) => {
        setTimeout(() => playNote(note.frequency, note.duration), currentTime)
        currentTime += note.duration + 50 // Small gap between notes
      })
    },
    [playNote],
  )

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
    // Play a confirmation sound when unmuting
    if (isMuted) {
      setTimeout(() => playSound("ding"), 100)
    }
  }, [isMuted, playSound])

  // Predefined melodies
  const melodies = {
    success: [
      { frequency: 523, duration: 150 },
      { frequency: 659, duration: 150 },
      { frequency: 784, duration: 300 },
    ],
    levelUp: [
      { frequency: 523, duration: 100 },
      { frequency: 659, duration: 100 },
      { frequency: 784, duration: 100 },
      { frequency: 1047, duration: 400 },
    ],
    achievement: [
      { frequency: 659, duration: 200 },
      { frequency: 784, duration: 200 },
      { frequency: 988, duration: 200 },
      { frequency: 1319, duration: 400 },
    ],
  }

  return {
    playSound,
    playNote,
    playChord,
    playMelody,
    toggleMute,
    isMuted,
    melodies,
  }
}
