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

export const SLUG_TEXT_SIZE_OPTIONS = [
	{ label: "Small", value: "1rem" },
	{ label: "Medium", value: "2rem" },
	{ label: "Large", value: "3rem" },
	{ label: "Extra Large", value: "4rem" },
]

export const SLUG_TEXT_WEIGHT_OPTIONS = [
	{ label: "Light", value: "light" },
	{ label: "Regular", value: "normal" },
	{ label: "Semi-Bold", value: "semibold" },
	{ label: "Bold", value: "bold" },
	{ label: "Normal", value: "normal" },
	{ label: "Bold", value: "bold" },
]

export const defaultSettings = {
	backgroundColor: "#ffffff",
	slugTextColor: "#000000",
	slugTextWeight: "bold",
	slugTextSize: "2rem",
	headerTextColor: "#000000",
	linkBackgroundColor: "#ffffff",
	linkTextColor: "#000000",
	linkHoverBackgroundColor: "#eeeeee",
	linkShadowColor: "#000000",
	linkBorderRadius: "0.5rem",
	linkPadding: "0.5rem",
}
