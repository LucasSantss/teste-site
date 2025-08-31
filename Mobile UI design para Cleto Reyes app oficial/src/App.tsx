
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'

// Components
import MobileNavigation from './components/MobileNavigation'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import FuriaMexaPage from './pages/FuriaMexaPage'
import HistoryPage from './pages/HistoryPage'
import TrainingPage from './pages/TrainingPage'
import NewsPage from './pages/NewsPage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#000',
            color: '#fff',
            border: '1px solid #D4AF37',
            fontSize: '14px'
          },
          success: {
            style: { background: '#D4AF37', color: '#000' }
          },
          error: {
            style: { background: '#DC2626', color: '#fff' }
          }
        }}
      />

      <Router>
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <main className="pb-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/furia-mexa" element={<FuriaMexaPage />} />
                <Route path="/historia" element={<HistoryPage />} />
                <Route path="/entrenamiento" element={<TrainingPage />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/carrito" element={<CartPage />} />
              </Routes>
            </AnimatePresence>
          </main>

          <MobileNavigation />
        </div>
      </Router>
    </>
  )
}

export default App
