import logo from '../assets/wordmark_animation/green_wordmark.png'
import { sitePages } from '../data/site-pages'

function NavBar() {
  return (
    <header className="fixed inset-x-3 top-3 z-50">
      <nav className="flex items-center justify-between rounded-xl bg-background py-2 pr-2 pl-5 shadow-sm">
        <img src={logo} alt="halfbuilt" className="w-30" />
        <div className="flex items-center gap-2">
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
      </nav>
    </header>
  )
}

export default NavBar
