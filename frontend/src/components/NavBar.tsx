import logo from '../assets/wordmark_animation/green_wordmark.png'

function NavBar() {
  return (
    <div className="flex items-center-safe h-23">
      <img src={logo} alt="halfbuilt" className="h-11  bg-forest-700" />
      <div className="ml-auto pr-4">
        <button className='bg-accent'>
          Contact
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}

export default NavBar
