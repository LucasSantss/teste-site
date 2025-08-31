
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react'
import toast from 'react-hot-toast'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  category: string
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Guantes Cleto Reyes Professional',
      price: 249.99,
      quantity: 1,
      imageUrl: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
      category: 'guantes'
    },
    {
      id: '2',
      name: 'Furia Mexa Collection - Top Deportivo',
      price: 89.99,
      quantity: 2,
      imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg',
      category: 'furia-mexa'
    }
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    toast.success('Producto eliminado del carrito')
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 15.99
  const tax = subtotal * 0.16 // 16% IVA
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    toast.success('Redirigiendo al pago seguro...')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black flex items-center justify-center pt-6"
      >
        <div className="text-center px-6">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-400 mb-8">
            Agrega algunos productos para continuar
          </p>
          <motion.a
            href="/productos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
          >
            Explorar Productos
          </motion.a>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black pt-6"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="px-6 mb-8"
      >
        <h1 className="text-4xl font-bold font-oswald text-yellow-500 mb-2">
          CARRITO DE COMPRAS
        </h1>
        <p className="text-gray-400">
          {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
        </p>
      </motion.div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-yellow-500 text-sm uppercase tracking-wide">
                      {item.category.replace('-', ' ')}
                    </p>
                    <p className="text-xl font-bold text-yellow-500 mt-2">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-600 rounded-lg">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={16} />
                      </motion.button>
                      
                      <span className="px-3 py-2 text-white font-medium min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1"
        >
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-300">
                <span className="flex items-center">
                  <Truck size={16} className="mr-1" />
                  Envío
                </span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-500">Gratis</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-300">
                <span>IVA (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span className="text-yellow-500">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center text-green-400 mb-2">
                <Truck size={16} className="mr-2" />
                <span className="font-medium">Envío gratis</span>
              </div>
              <p className="text-green-300 text-sm">
                En pedidos superiores a $100. Tu pedido califica.
              </p>
            </div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
            >
              <CreditCard className="mr-2" size={20} />
              Proceder al Pago
            </motion.button>

            {/* Security Info */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Pago 100% seguro con encriptación SSL
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CartPage
