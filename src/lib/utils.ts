import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function generateSlug(name: string) {
	const baseSlug = (name || Math.random().toString(36).substring(2, 10))
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 20)

	return `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`
}

export const SLUG_TEXT_SIZE_OPTIONS = [
	{ label: "Small", value: "1rem" },
	{ label: "Medium", value: "1.5rem" },
	{ label: "Large", value: "2rem" },
	{ label: "Extra Large", value: "2.5rem" },
]

export const SLUG_TEXT_WEIGHT_OPTIONS = [
	{ label: "Extralight", value: "200" },
	{ label: "Light", value: "300" },
	{ label: "Normal", value: "400" },
	{ label: "Medium", value: "500" },
	{ label: "Semibold", value: "600" },
	{ label: "Bold", value: "700" },
	{ label: "Extrabold", value: "800" },
]

export const BORDER_RADIUS_OPTIONS = [
	{ label: "None", value: "0px" },
	{ label: "Small", value: "0.5rem" },
	{ label: "Medium", value: "1rem" },
	{ label: "Large", value: "5rem" },
]

export const PADDING_OPTIONS = [
	{ label: "Small", value: "0.25rem" },
	{ label: "Medium", value: "0.5rem" },
	{ label: "Large", value: "1rem" },
	{ label: "Extra Large", value: "1.25rem" },
]

export const SOCIAL_ICONS: { [key: string]: string } = {
	Instagram: "simple-icons:instagram",
	Email: "simple-icons:gmail",
	Facebook: "simple-icons:facebook",
	Youtube: "simple-icons:youtube",
	X: "simple-icons:x",
	Tiktok: "simple-icons:tiktok",
	Whatsapp: "simple-icons:whatsapp",
	Snapchat: "simple-icons:snapchat",
	Amazon: "simple-icons:amazon",
	Googleplay: "simple-icons:googleplay",
	Appstore: "simple-icons:appstore",
	Applemusic: "simple-icons:applemusic",
	Applepodcasts: "simple-icons:applepodcasts",
	Bandcamp: "simple-icons:bandcamp",
	Spotify: "simple-icons:spotify",
	Bluesky: "simple-icons:bluesky",
	Discord: "simple-icons:discord",
	Etsy: "simple-icons:etsy",
	Github: "simple-icons:github",
	Linkedin: "simple-icons:linkedin",
	Mastodon: "simple-icons:mastodon",
	Patreon: "simple-icons:patreon",
	Pinterest: "simple-icons:pinterest",
	Signal: "simple-icons:signal",
	Soundcloud: "simple-icons:soundcloud",
	Telegram: "simple-icons:telegram",
	Twitch: "simple-icons:twitch",
}

export const defaultSettings = {
	backgroundColor: "#e7e5e5",
	slugTextColor: "#1e1e1e",
	slugTextWeight: "500",
	slugTextSize: "1rem",
	headerTextColor: "#1e1e1e",
	buttonBackgroundColor: "#ffffff",
	buttonShadowColor: "#e7e5e5",
	buttonIconColor: "#1e1e1e",
	buttonHoverBackgroundColor: "#eeeeee",
	linkBackgroundColor: "#ffffff",
	linkTextColor: "#1e1e1e",
	linkHoverBackgroundColor: "#eeeeee",
	linkShadowColor: "#e7e5e5",
	linkBorderRadius: "0.5rem",
	linkPadding: "0.5rem",
}
