const bannerMessages = {
	LGBTQ_RIGHTS: "Pride and Inclusion: Support LGBTQ+ Rights",
	ANTI_RACISM: "Stand Against Racism: Promote Diversity and Inclusion",
	MENTAL_HEALTH: "Mental Health Matters: Support and Resources Available",
	CLIMATE_ACTION: "Act Now: Support Climate Action and Sustainability",
}

const bannerStyles = {
	LGBTQ_RIGHTS: "banner lgbtq-rights",
	ANTI_RACISM: "banner anti-racism",
	MENTAL_HEALTH: "banner mental-health",
	CLIMATE_ACTION: "banner climate-action",
}

export default function SupportBanner({ bannerType }) {
	const message = bannerMessages[bannerType] || ""
	const styleClass = bannerStyles[bannerType] || ""

	return <div className={`profile-banner ${styleClass}`}>{message}</div>
}
