import { useEffect, useState } from "react";
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

}
