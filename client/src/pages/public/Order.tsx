import { useState } from 'react'

type OrderItem = {
  product: string
  quantity: string
}

const productOptions = [
  '350 ml bottle',
  '500 ml bottle',
  'Gallon round',
  'Gallon slim',
  'Gallon Refill - Slim',
  'Gallon Refill - Round',
]

function Order() {
  const [formData, setFormData] = useState({
    customerName: '',
    deliveryLocation: '',
    address: '',
    customerPhone: '',
    instructions: '',
  })
  const [items, setItems] = useState<OrderItem[]>([
    { product: '', quantity: '1' },
  ])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )
  const [message, setMessage] = useState('')

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    )
  }

  const addItem = () => {
    setItems((prev) => [...prev, { product: '', quantity: '1' }])
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const orderItems = items
      .map((item) => ({
        product: item.product,
        quantity: Number.parseInt(item.quantity, 10) || 0,
      }))
      .filter((item) => item.product && item.quantity > 0)

    if (!orderItems.length) {
      setStatus('error')
      setMessage('Please add at least one order item.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          address: formData.address,
          deliveryLocation: formData.deliveryLocation,
          instructions: formData.instructions || undefined,
          items: orderItems,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit order.')
      }

      setStatus('success')
      setMessage('Order submitted! Our team will confirm shortly.')
      setFormData({
        customerName: '',
        deliveryLocation: '',
        address: '',
        customerPhone: '',
        instructions: '',
      })
      setItems([{ product: '', quantity: '1' }])
    } catch (error) {
      setStatus('error')
      setMessage('Submission failed. Please try again.')
    }
  }

  return (
    <section className="space-y-6 border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#2563EB]">
          Order
        </p>
        <h1 className="text-3xl font-black uppercase">
          Place Your Water Order
        </h1>
        <p className="text-sm">Fast pickup or delivery within Mariveles.</p>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold uppercase tracking-wide">
          Name
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                customerName: event.target.value,
              }))
            }
            className="border-2 border-black bg-white px-3 py-2 text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            placeholder="Full name"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold uppercase tracking-wide">
          Delivery Location
          <select
            required
            value={formData.deliveryLocation}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                deliveryLocation: event.target.value,
              }))
            }
            className="border-2 border-black bg-white px-3 py-2 text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <option value="">Select area</option>
            <option value="Palao">Palao</option>
            <option value="Baseco">Baseco</option>
            <option value="Friendship">Friendship</option>
            <option value="Sisiman">Sisiman</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold uppercase tracking-wide">
          Specific Address
          <textarea
            required
            rows={3}
            value={formData.address}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                address: event.target.value,
              }))
            }
            className="border-2 border-black bg-white px-3 py-2 text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            placeholder="House number, street, landmarks"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold uppercase tracking-wide">
          Contact Number
          <input
            type="tel"
            required
            value={formData.customerPhone}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                customerPhone: event.target.value,
              }))
            }
            className="border-2 border-black bg-white px-3 py-2 text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            placeholder="09XX XXX XXXX"
          />
        </label>

        <div className="space-y-3 border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-sm font-black uppercase tracking-wide">
            Order Items
          </p>
          <div className="grid gap-3">
            {items.map((item, index) => (
              <div
                key={`${item.product}-${index}`}
                className="grid gap-3 border-2 border-black bg-white p-3 md:grid-cols-[1fr_140px_auto] md:items-end"
              >
                <label className="grid gap-2 text-xs font-semibold uppercase tracking-wide">
                  Order
                  <select
                    required
                    value={item.product}
                    onChange={(event) =>
                      updateItem(index, 'product', event.target.value)
                    }
                    className="border-2 border-black bg-white px-3 py-2 text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <option value="">Select item</option>
                    {productOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-xs font-semibold uppercase tracking-wide">
                  Quantity
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    value={item.quantity}
                    onChange={(event) =>
                      updateItem(index, 'quantity', event.target.value)
                    }
                    className="appearance-none border-2 border-black bg-white px-3 py-2 text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] [-moz-appearance:textfield]"
                  />
                </label>
                <div className="flex items-end">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="border-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="w-fit border-2 border-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Add Another Item
          </button>
        </div>

        <label className="grid gap-2 text-sm font-semibold uppercase tracking-wide">
          Special Instructions
          <textarea
            rows={3}
            value={formData.instructions}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                instructions: event.target.value,
              }))
            }
            className="border-2 border-black bg-white px-3 py-2 text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            placeholder="Optional notes"
          />
        </label>

        {message && (
          <div
            className={`border-2 border-black px-4 py-2 text-sm font-semibold uppercase tracking-wide ${
              status === 'success'
                ? 'bg-green-100'
                : status === 'error'
                  ? 'bg-red-100'
                  : 'bg-white'
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full border-2 border-black bg-[#2563EB] px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </section>
  )
}

export default Order
