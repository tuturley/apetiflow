import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { OrdersProvider } from '@/context/OrdersContext'
import { AdminPage } from '@/pages/AdminPage'
import { TVMotoboysPage } from '@/pages/TVMotoboysPage'

export default function App() {
  return (
    <OrdersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/tv" element={<TVMotoboysPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </OrdersProvider>
  )
}
