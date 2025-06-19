import { useEffect, useState } from "react";
import { FaChevronLeft, FaImage, FaPause, FaPlay } from "react-icons/fa";
import { backgroundImages } from "../data/background";
import type { BackgroundImage } from "../types";



interface BackgroundProps {
  currentBackground: BackgroundImage;
  onBackgroundChange: (background: BackgroundImage) => void;
}

export function BackgroundImages ({currentBackground, onBackgroundChange} : BackgroundProps) {
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const index = backgroundImages.findIndex((bg) => bg.id === currentBackground.id)
    setCurrentIndex(index => 0 ? index : 0)
  }, [currentBackground])

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % backgroundImages.length
      setCurrentIndex(nextIndex)
      onBackgroundChange(backgroundImages[nextIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, currentIndex, onBackgroundChange])

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? backgroundImages.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    onBackgroundChange(backgroundImages[prevIndex])
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % backgroundImages.length
    setCurrentIndex(nextIndex)
    onBackgroundChange(backgroundImages[nextIndex])
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  return (
    <div className="backdrop-blur-xl bg-black/20 border-white/10 p-4 rounded-xl shadow-xl">
      <div className="space-y-3">
        <h3 className="font-mono text-sm text-purple-400 flex items-center gap-2">
          <FaImage className="w-4 h-4" />
          // BACKGROUND
        </h3>

        <div className="flex items-center justify-between">
          <button onClick={handlePrevious}  className="text-white hover:bg-white/10 p-1">
            <FaChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 text-center">
            <p className="font-mono text-xs text-white">{currentBackground.name}</p>
            <div className="flex justify-center gap-1 mt-1">
              {backgroundImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${index === currentIndex ? "bg-purple-400" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>

          <button onClick={handleNext} className="text-white hover:bg-white/10 p-1">
            <FaChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={toggleAutoPlay}
          className={`w-full font-mono text-xs ${
            isAutoPlay
              ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
              : "bg-white/10 border-white/20 text-white"
          } hover:bg-white/20`}
        >
          {isAutoPlay ? <FaPause className="w-3 h-3 mr-1" /> : <FaPlay className="w-3 h-3 mr-1" />}
          {isAutoPlay ? "PAUSE" : "AUTO"}
        </button>
      </div>
    </div>
  )
}
