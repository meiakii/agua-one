const faqs = [
  {
    question: '🕒 What are your business hours and days?',
    answer: '8am - 5pm, Monday to Saturday.',
  },
  {
    question: '🧴 What bottles do you offer?',
    answer: '350ml & 500ml bottles, plus Gallon Slim or Round.',
  },
  {
    question: '📍 Where are you located?',
    answer:
      'Aguinaldo St., Baseco, Mariveles, Bataan. Near Methodist Church and Baseco Elementary School / Baseco National High School.',
  },
  {
    question: '💵 How much are your bottles?',
    answer:
      '350ml: 7 pesos per piece (bulk only, minimum 30 pieces per case). 500ml: 9 pesos per piece (bulk only, minimum 25 pieces per case). Gallon Round or Slim: 230 pesos.',
  },
  {
    question: '🚶 Do you accept walk-ins?',
    answer:
      'Yes! Walk-ins are always welcome during our operating hours. We also pick up and deliver.',
  },
  {
    question: '💳 What payment methods do you accept?',
    answer: 'Cash only. For large transactions, cash or GCash.',
  },
  {
    question: '🫙 Can I bring my own container?',
    answer: 'Unfortunately no.',
  },
  {
    question: '🧾 How can I order?',
    answer:
      'You can visit our store or place an order online through our website.',
  },
]

function FAQs() {
  return (
    <section className="space-y-8">
      <header className="space-y-2 border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#2563EB]">
          FAQs
        </p>
        <h1 className="text-3xl font-black uppercase sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="text-sm">
          Quick answers about our products, hours, and ordering.
        </p>
      </header>

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <p className="text-sm font-black uppercase tracking-wide">
              {faq.question}
            </p>
            <p className="mt-2 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQs
