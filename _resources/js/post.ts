import { addClass } from "./functions"

declare global {
	interface Window {
		getReactions: Function
		mentionsUrl: string
	}

	interface Reactions {
		count: number
		type: Object
	}
}

const loadReactions = async () => {
	const reactionsSection: HTMLElement = document.getElementById("reactions")

	const title: HTMLHeadingElement = document.createElement("h3")
	addClass(title, ["title", "is-3"]).appendChild(
		document.createTextNode("Reacciones")
	)

	reactionsSection.appendChild(title)

	const availableReactions = {
		like: {
			iconClass: ["fas", "fa-star", "has-text-warning"],
			filter: "like-of",
		},
		repost: {
			iconClass: ["fas", "fa-retweet", "has-text-success"],
			filter: "repost-of",
		},
		mention: {
			iconClass: ["fas", "fa-quote-right", "has-text-text"],
			filter: "mention-of",
		},
		reply: {
			iconClass: ["fas", "fa-comment-dots", "has-text-text"],
			filter: "in-reply-to",
		},
	}

	const iconsDiv: HTMLDivElement = document.createElement("div")
	addClass(iconsDiv, ["flex"])

	const reactions: Reactions = await window.getReactions()

	Object.keys(availableReactions).forEach((key: string) => {
		const reactionCategory = availableReactions[key]
		const link: HTMLAnchorElement = document.createElement("a")
		addClass(link, "flex-1")

		link.href = `${window.mentionsUrl}&wm-property=${reactionCategory.filter}`

		const icon: HTMLElement = document.createElement("i")
		addClass(icon, [...reactionCategory.iconClass, "mr-2"])

		link.appendChild(icon)
		link.appendChild(document.createTextNode(reactions.type[key] || 0))

		iconsDiv.appendChild(link)
	})

	reactionsSection.appendChild(iconsDiv)
}

loadReactions()
