"use client"

import { presets } from "@/src/data/presets"
import { Icon } from "@iconify/react"
import { useState } from "react"
import CarouselPreview from "./CarouselPreview"

export const CardCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % presets.length)
	}

	const prevCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + presets.length) % presets.length)
	}

	return (
		<div className="relative flex h-[500px] items-center justify-center">
			<button
				onClick={prevCard}
				className="absolute -left-6 z-10 flex items-center justify-center rounded-full border border-accent hover:bg-accent md:left-24"
				style={{ top: "50%", transform: "translateY(-50%)" }}
			>
				<Icon icon="ri:arrow-left-s-line" className="icon h-8 w-8 hover:text-background" />
			</button>

			<div className="flex items-center">
				<CarouselPreview presetId={currentIndex} />
			</div>

			<button
				onClick={nextCard}
				className="absolute -right-6 z-10 flex items-center justify-center rounded-full border border-accent hover:bg-accent md:right-24"
				style={{ top: "50%", transform: "translateY(-50%)" }}
			>
				<Icon icon="ri:arrow-right-s-line" className="icon h-8 w-8 hover:text-background" />
			</button>
		</div>
	)
}
