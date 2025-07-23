import type { BackgroundImage } from '../types';
import { FaImage } from "react-icons/fa6";

interface BackgroundSelectorProps {
    images: BackgroundImage[];
    selected: BackgroundImage;
    onSelect: (image: BackgroundImage) => void;
    className?: string;
}

export function BackgroundSelector({ images, selected, onSelect, className = '' }: BackgroundSelectorProps) {
    const currentIndex = images.findIndex(img => img.id === selected.id);
    const nextIndex = (currentIndex + 1) % images.length;

    const handleSelectNext = () => {
        onSelect(images[nextIndex]);
    }

    return (
        <button
            onClick={handleSelectNext}
            className={`p-3 bg-black/30 rounded-full text-white/80 hover:bg-black/50 transition-colors ${className}`} 
            aria-label="Change background"
        >
            <FaImage size={20} />
        </button>
    );
}
