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
			className="max-w-sm"
		>
			<CarouselContent>
				{presets.map((preset, index) => (
					<CarouselItem key={index}>
						<CarouselPreview presetId={index} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
