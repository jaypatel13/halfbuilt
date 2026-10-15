import { useRef } from 'react'
import logo from '../assets/wordmark_animation/green_wordmark.png'
import { sitePages } from '../data/site-pages'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function NavBar() {
  const brickRef = useRef<HTMLSpanElement>(null)
  useGSAP(() => {
    gsap.from(brickRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'bounce.out',
      delay: 0.2,
    })
  })

  return (
    <header className="fixed inset-x-3 top-3 z-50">
      <div className="@container/site relative">
        <nav className="flex items-center justify-between rounded-xl bg-background py-2 pr-2 pl-5 shadow-sm">
          <div className="relative w-30">
            <img src={logo} alt="halfbuilt" className="w-30" />
            <span
              ref={brickRef}
              className="absolute left-[11.83%] top-[64.2%] w-[4.33%] h-[14.4%] bg-accent"
            />
          </div>

          <div className="flex items-center gap-2 @max-[760px]/site:hidden">
            {sitePages.map((page) => (
              <button
                key={page.id}
                className="rounded-md px-3 py-1 font-display text-base font-semibold text-text transition-colors hover:bg-surface"
              >
                {page.title}
              </button>
            ))}

            <button className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-6 font-display text-base font-semibold text-accent-contrast transition-colors hover:bg-mustard-400">
              Contact
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12 h16 M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <button className="hidden h-11 w-24 items-center justify-between rounded-full border border-border pr-3 pl-4 font-display text-base font-semibold text-text transition-colors hover:bg-surface @max-[760px]/site:inline-flex">
            Menu
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M4 8 h16 M4 16 h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
