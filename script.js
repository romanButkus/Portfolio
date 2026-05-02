const sections = document.querySelectorAll("section[id], div[id]")
const navLinks = document.querySelectorAll(".nav-links a")

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				navLinks.forEach(link => {
					link.style.color =
						link.getAttribute("href") === `#${entry.target.id}`
							? "var(--text)"
							: ""
				})
			}
		})
	},
	{ threshold: 0.5 },
)

sections.forEach(s => observer.observe(s))

// Fade-in cards on scroll
const cards = document.querySelectorAll(".card, .stat, .skill-group")

const fadeObserver = new IntersectionObserver(
	entries => {
		entries.forEach((entry, i) => {
			if (entry.isIntersecting) {
				entry.target.style.animationDelay = `${i * 0.07}s`
				entry.target.classList.add("visible")
				fadeObserver.unobserve(entry.target)
			}
		})
	},
	{ threshold: 0.1 },
)

cards.forEach(card => {
	card.style.opacity = "0"
	card.style.transform = "translateY(16px)"
	card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
	fadeObserver.observe(card)
})

// Add visible class styles via JS
const style = document.createElement("style")
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`
document.head.appendChild(style)
