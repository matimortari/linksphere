"use client"

import { fetchUserSettings, handleSubmit } from "@/src/lib/actions"
import {
	BORDER_RADIUS_OPTIONS,
	PADDING_OPTIONS,
	SLUG_TEXT_SIZE_OPTIONS,
	SLUG_TEXT_WEIGHT_OPTIONS,
	defaultSettings,
} from "@/src/lib/utils"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

const ColorInput = ({ id, label, value, onChange }) => (
	<div className="mb-4 flex items-center space-x-2">
		<input id={id} type="color" value={value} onChange={onChange} className="h-8 w-8 rounded" />
		<label htmlFor={id} className="font-medium">
			{label}
		</label>
	</div>
)

const RadioOptions = ({ options, name, value, onChange, label }) => (
	<div className="mb-4">
		<p className="mb-2 font-medium">{label}</p>
		<div className="space-y-1">
			{options.map((option) => (
				<label key={option.value} className="flex items-center space-x-2 text-sm">
					<input
						type="radio"
						name={name}
						value={option.value}
						checked={value === option.value}
						onChange={onChange}
						className="mr-2"
					/>
					<span>{option.label}</span>
				</label>
			))}
		</div>
	</div>
)

export default function AppearanceForm() {
	const { settings, setSettings } = useGlobalContext()
	const [error, setError] = useState<string>("")
	const [success, setSuccess] = useState<string>("")

	useEffect(() => {
		fetchUserSettings()
	}, [setSettings])

	const onSubmit = (e: React.FormEvent) => {
		handleSubmit(e, settings, setSettings, setError, setSuccess)
	}

	const handleReset = () => {
		setSettings(defaultSettings)
	}

	const currentSettings = { ...defaultSettings, ...settings }

	const handleColorChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings({ ...settings, [key]: e.target.value })
	}

	const handleRadioChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings({ ...settings, [key]: e.target.value })
	}

	return (
		<>
			<form onSubmit={onSubmit} className="flex flex-wrap">
				<div className="flex w-full flex-col md:w-1/2">
					<ColorInput
						id="backgroundColor"
						label="Main Background Color"
						value={currentSettings.backgroundColor}
						onChange={handleColorChange("backgroundColor")}
					/>

					<ColorInput
						id="slugTextColor"
						label="Username Text Color"
						value={currentSettings.slugTextColor}
						onChange={handleColorChange("slugTextColor")}
					/>

					<ColorInput
						id="headerTextColor"
						label="Header Text Color"
						value={currentSettings.headerTextColor}
						onChange={handleColorChange("headerTextColor")}
					/>

					<RadioOptions
						name="slugTextSize"
						label="Username Text Size"
						options={SLUG_TEXT_SIZE_OPTIONS}
						value={currentSettings.slugTextSize}
						onChange={handleRadioChange("slugTextSize")}
					/>

					<RadioOptions
						name="slugTextWeight"
						label="Username Text Weight"
						options={SLUG_TEXT_WEIGHT_OPTIONS}
						value={currentSettings.slugTextWeight}
						onChange={handleRadioChange("slugTextWeight")}
					/>
				</div>

				<div className="flex w-full flex-col md:w-1/2">
					<ColorInput
						id="linkBackgroundColor"
						label="Link Background Color"
						value={currentSettings.linkBackgroundColor}
						onChange={handleColorChange("linkBackgroundColor")}
					/>
					<ColorInput
						id="linkTextColor"
						label="Link Text Color"
						value={currentSettings.linkTextColor}
						onChange={handleColorChange("linkTextColor")}
					/>

					<ColorInput
						id="linkHoverBackgroundColor"
						label="Button Hover Background Color"
						value={currentSettings.linkHoverBackgroundColor}
						onChange={handleColorChange("linkHoverBackgroundColor")}
					/>

					<ColorInput
						id="linkShadowColor"
						label="Button Shadow Color"
						value={currentSettings.linkShadowColor}
						onChange={handleColorChange("linkShadowColor")}
					/>

					<RadioOptions
						name="linkBorderRadius"
						label="Button Border Radius"
						options={BORDER_RADIUS_OPTIONS}
						value={currentSettings.linkBorderRadius}
						onChange={handleRadioChange("linkBorderRadius")}
					/>

					<RadioOptions
						name="linkPadding"
						label="Button Padding"
						options={PADDING_OPTIONS}
						value={currentSettings.linkPadding}
						onChange={handleRadioChange("linkPadding")}
					/>
				</div>

				<div className="button-container justify-end">
					<button type="submit" className="button bg-primary text-primary-foreground">
						Update Settings
					</button>
					<button type="button" onClick={handleReset} className="button bg-destructive text-destructive-foreground">
						Reset to Default
					</button>
				</div>
			</form>

			<div className="font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</>
	)
}
