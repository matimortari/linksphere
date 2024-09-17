import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel"

export function CardCarousel() {
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			orientation="horizontal"
			className="w-full max-w-sm"
		>
			<CarouselContent className="-mt-1 h-[400px]">
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index} className="h-full">
						<div className="bg-muted p-1">
							<div className="flex h-[400px] items-center justify-center rounded-lg p-6">
								<span className="text-3xl font-semibold">{index + 1}</span>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
