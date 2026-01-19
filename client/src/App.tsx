import { Route, Routes } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import Home from './pages/public/Home'
import Order from './pages/public/Order'
import Prices from './pages/public/Prices'
import FAQs from './pages/public/FAQs'
import Contact from './pages/public/Contact'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
      </Route>
    </Routes>
  )
}

export default App
