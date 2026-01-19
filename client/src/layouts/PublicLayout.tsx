import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 border-2 border-black text-sm uppercase tracking-wide ${
    isActive ? 'bg-[#2563EB] text-white' : 'bg-white'
  }`

function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-20 border-b-2 border-black bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link
            to="/"
            className="text-lg font-black uppercase tracking-wide sm:text-xl"
          >
            Agua-One Water Refilling Station
          </Link>
          <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/prices" className={navLinkClass}>
              Prices
            </NavLink>
            <NavLink to="/faqs" className={navLinkClass}>
              FAQs
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/order" className={navLinkClass}>
              Order
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <Outlet />
      </main>

      <footer className="border-t-2 border-black bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 text-sm md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wide">
              Contact Us
            </p>
            <p className="font-medium">0906 552 2676</p>
            <p className="font-medium">aguaonewrs@gmail.com</p>
            <p>8 Aguinaldo St., Brgy. Baseco, Mariveles, Bataan 2105</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wide">
              Open Hours
            </p>
            <p className="font-medium">Mon-Sat 8am-5pm</p>
            <p>Closed Holidays</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wide">Socials</p>
            <a
              className="inline-flex items-center border-2 border-black bg-white px-3 py-2 font-semibold uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              href="https://www.facebook.com/aguaoneph"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
