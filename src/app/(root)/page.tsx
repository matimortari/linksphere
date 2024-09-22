import { CardCarousel } from "@/src/components/carousel/CardCarousel"
import { Bowlby_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })

export default function Home() {
	return (
		<div className="main-container relative flex flex-col bg-card">
			<div className="absolute inset-0 z-0 mt-60 hidden md:block">
				<Image src="/grid-bg.png" alt="hero" fill={true} className="z-0" />
			</div>

			<div className="relative flex flex-col md:flex-row">
				<section className="flex flex-col items-center gap-2 p-12 md:w-7/12 md:items-start">
					<h1 className={`text-center text-3xl font-bold md:text-left md:text-5xl ${bowlby.className}`}>
						Your link-in-bio page!
					</h1>
					<p className="text-center text-xl font-bold md:text-left">Welcome to NeSS!</p>

					<p className="text-center text-xl text-muted-foreground md:text-left">
						Share your links, social profiles, <br />
						contact info & more in one page.
					</p>

					<form className="form-container">
						<span className="text-muted-foreground">ness-live.vercel.app/</span>
						<input type="text" placeholder="your_name" className="input flex-1 bg-transparent" />
						<Link href="/login" className="button bg-primary text-primary-foreground">
							Get Started!
						</Link>
					</form>

					<div className="content-container my-4">
						<ul className="list-inside list-none p-2 text-center text-foreground md:text-left">
							<li>- Customizable Themes</li>
							<li>- Unlimited Links</li>
							<li>- SEO Friendly</li>
							<li>- Detailed Analytics</li>
							<li>- Share Across All Platforms</li>
							<li className="font-bold">- Free to Use!</li>
						</ul>
					</div>
				</section>

				<section className="flex items-center justify-center p-12 md:w-5/12">
					<div className="carousel-container w-full max-w-full">
						<CardCarousel />
					</div>
				</section>
			</div>
		</div>
	)
}
