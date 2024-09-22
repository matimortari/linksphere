import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel"
import { presets } from "../../lib/presets"
import CarouselPreview from "./CarouselPreview"

export function CardCarousel() {
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			orientation="horizontal"
			className="w-full max-w-sm"
		>
			<CarouselContent className="-mt-1">
				{presets.map((preset, index) => (
					<CarouselItem key={index} className="h-full">
						<CarouselPreview presetId={index} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
