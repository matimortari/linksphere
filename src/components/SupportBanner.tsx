import { bannerMessages, bannerStyles } from "../lib/userSettings"

export default function SupportBanner({ bannerType }) {
	const message = bannerMessages[bannerType] || ""
	const styleClass = bannerStyles[bannerType] || ""

	return <div className={`profile-banner ${styleClass}`}>{message}</div>
}
