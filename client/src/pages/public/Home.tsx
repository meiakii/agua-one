import { useState } from 'react'
import { Link } from 'react-router-dom'

const serviceAreas = ['Palao', 'Baseco', 'Friendship', 'Sisiman']

const products = [
  { name: '350ml Bottle', image: '/350ml.png' },
  { name: '500ml Bottle', image: '' },
  { name: 'Round Gallon', image: '' },
  { name: 'Slim Gallon', image: '/slim.png' },
]

const testResults = Array.from({ length: 9 }, (_, index) => ({
  id: `test-${index + 1}`,
  src: `/test${index + 1}.png`,
}))

function Home() {
  const [activeTest, setActiveTest] = useState<string | null>(null)

  return (
    <div className="space-y-10 sm:space-y-14">
      <section className="grid gap-8 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="space-y-5">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#2563EB]">
            Agua-One
          </p>
          <h1 className="text-3xl font-black uppercase sm:text-4xl md:text-5xl">
            Agua-One Water Refilling Station
          </h1>
          <div className="inline-flex border-2 border-black bg-white p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <img
              src="/logo.png"
              alt="Agua-One logo"
              className="h-20 w-auto object-contain sm:h-24"
            />
          </div>
          <p className="text-lg font-semibold">We pick up and deliver.</p>
          <Link
            to="/order"
            className="inline-flex items-center justify-center border-2 border-black bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Order Now
          </Link>
        </div>
        <div className="flex items-center justify-center border-2 border-black bg-white p-2">
          <img
            src="/storefront.png"
            alt="Agua-One shop front"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:p-8">
        <div className="flex items-center justify-center border-2 border-black bg-white p-2">
          <img
            src="/storehours.png"
            alt="Agua-One store hours"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-5">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#2563EB]">
            Open Hours
          </p>
          <h2 className="text-3xl font-black uppercase sm:text-4xl">
            8am - 5pm
          </h2>
          <p className="text-base font-semibold uppercase tracking-wide sm:text-lg">
            Monday to Saturday
          </p>
          <p className="text-sm uppercase tracking-wide">Closed on holidays</p>
          <div className="grid gap-2 text-sm font-semibold uppercase tracking-wide">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex w-fit border-2 border-black bg-[#2563EB] px-3 py-1 text-white"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black uppercase">Our Products</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-col gap-4 border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-full border-2 border-black object-cover"
                />
              ) : (
                <div className="flex h-32 items-center justify-center border-2 border-black bg-gray-200 text-xs font-bold uppercase tracking-wide text-gray-700">
                  Image Placeholder
                </div>
              )}
              <p className="text-sm font-bold uppercase">{product.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-4 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black uppercase">
            Lab Results & Test Certificates
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {testResults.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => setActiveTest(result.src)}
                className="group border-2 border-black bg-white p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <img
                  src={result.src}
                  alt="Lab test result"
                  className="h-28 w-full object-cover"
                />
                <span className="mt-2 block text-xs font-bold uppercase tracking-wide">
                  View
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="border-2 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <iframe
            title="Agua-One Water Refilling Station Map"
            className="h-72 w-full border-2 border-black md:h-full"
            src="https://www.google.com/maps?q=Agua-One%20Water%20Refilling%20Station,%20Mariveles&output=embed"
            loading="lazy"
          />
        </div>
      </section>

      {activeTest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveTest(null)}
        >
          <div
            className="relative w-full max-w-3xl border-2 border-black bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveTest(null)}
              className="absolute right-3 top-3 border-2 border-black bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Exit
            </button>
            <img
              src={activeTest}
              alt="Lab test result"
              className="max-h-[70vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
