const priceLines = [
  {
    title: '350ml Bottles',
    details: [
      '7 pesos per piece',
      'Bulk only (minimum 30 pieces per case)',
      'No singles',
    ],
  },
  {
    title: '500ml Bottles',
    details: [
      '9 pesos per piece',
      'Bulk only (minimum 25 pieces per case)',
      'No singles',
    ],
  },
  {
    title: 'Gallon (Round or Slim)',
    details: ['230 pesos per gallon'],
  },
  {
    title: 'Gallon Refill',
    details: ['25 pesos per refill'],
  },
  {
    title: 'Other Items',
    details: [
      'Big cap - 25 pesos',
      'Small cap - 10 pesos',
      'White inner cover - 20 pesos',
      'Cap for round gallon - 15 pesos',
    ],
  },
]

function Prices() {
  return (
    <section className="space-y-8">
      <header className="space-y-2 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#2563EB]">
          Prices
        </p>
        <h1 className="text-3xl font-black uppercase">Agua-One Price List</h1>
        <p className="text-sm">
          Bulk-friendly pricing for refills, bottles, and accessories.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          {priceLines.map((line) => (
            <div
              key={line.title}
              className="space-y-2 border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-lg font-black uppercase">{line.title}</h2>
              <ul className="space-y-1 text-sm font-semibold uppercase tracking-wide">
                {line.details.map((detail) => (
                  <li key={detail}>• {detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#2563EB]">
            Price Photo
          </p>
          <div className="flex flex-1 items-center justify-center border-2 border-black bg-gray-200 text-xs font-bold uppercase tracking-wide text-gray-700">
            Price List Photo Placeholder
          </div>
          <p className="text-sm">
            Replace with the latest price poster when available.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Prices
