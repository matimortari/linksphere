export default function generateSlug(name) {
	const baseSlug = name
		? name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "")
				.slice(0, 20)
		: Math.random().toString(36).substr(2, 8)

	const randomString = Math.random().toString(36).substr(2, 4)

	return `${baseSlug}-${randomString}`
}
