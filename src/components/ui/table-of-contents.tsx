import * as React from "react"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps extends React.HTMLAttributes<HTMLDivElement> {
  headings: Heading[]
  activeId?: string
}

export function TableOfContents({ headings, activeId, className, ...props }: TableOfContentsProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="text-sm font-mono text-[var(--matrix-green)]/70 mb-4">TABLE OF CONTENTS</div>
      <div className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-sm hover:text-[var(--matrix-green)] transition-colors",
              heading.level === 2 ? "pl-0" : "pl-4",
              activeId === heading.id
                ? "text-[var(--matrix-green)]"
                : "text-[var(--matrix-green)]/70"
            )}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </div>
  )
}

export function useHeadings() {
  const [headings, setHeadings] = React.useState<Heading[]>([])
  const [activeId, setActiveId] = React.useState<string>()

  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"))
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1))
      }))
    setHeadings(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    elements.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return { headings, activeId }
} 