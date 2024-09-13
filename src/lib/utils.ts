import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { twMerge } from "tailwind-merge"
import { authOptions } from "./auth"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function validateLinkData(data: any) {
	return data && typeof data.title === "string" && typeof data.url === "string"
}

export function validateButtonData(data: any) {
	return data && typeof data.platform === "string" && typeof data.url === "string" && typeof data.icon === "string"
}

export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}
	return { error: false, session }
}

export async function handleFormSubmit(
	e: React.FormEvent,
	url: string,
	payload: object,
	setSuccess: React.Dispatch<React.SetStateAction<string | null>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	onSuccess?: () => void
) {
	e.preventDefault()

	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		})

		const data = await response.json()
		if (!response.ok) throw new Error(data.error)

		setSuccess("Updated successfully!")
		onSuccess?.()
	} catch (error) {
		setError((error as Error).message)
	}
}
