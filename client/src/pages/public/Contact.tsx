function Contact() {
  return (
    <section className="space-y-8">
      <header className="space-y-2 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#2563EB]">
          Contact Us
        </p>
        <h1 className="text-3xl font-black uppercase sm:text-4xl">
          Let’s Talk Big Orders & Partnerships
        </h1>
        <p className="text-sm">
          Reach out and we’ll respond as soon as we can.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase">Contact Details</h2>
          <p className="text-sm">
            For bulk orders, business partnerships, and deliveries.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center border-2 border-black bg-[#2563EB] px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              href="https://www.facebook.com/aguaoneph"
              target="_blank"
              rel="noreferrer"
            >
              Message on Facebook
            </a>
            <a
              className="inline-flex items-center border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              href="tel:09065522676"
            >
              0906 552 2676
            </a>
            <a
              className="inline-flex items-center border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              href="mailto:aguaonewrs@gmail.com"
            >
              aguaonewrs@gmail.com
            </a>
          </div>
        </div>

        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black uppercase">Visit Us</h2>
          <p className="mt-2 text-sm">
            8 Aguinaldo St., Brgy. Baseco, Mariveles, Bataan 2105
          </p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide">
            Mon-Sat 8am-5pm
          </p>
          <div className="mt-4 border-2 border-black bg-white p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <iframe
              title="Agua-One Water Refilling Station Map"
              className="h-56 w-full border-2 border-black"
              src="https://www.google.com/maps?q=Agua-One%20Water%20Refilling%20Station,%20Mariveles&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
