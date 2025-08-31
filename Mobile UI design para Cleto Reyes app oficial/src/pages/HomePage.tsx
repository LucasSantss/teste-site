
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Star, Trophy, Users, Zap, Clock, Dumbbell } from 'lucide-react'
import { lumi } from '../lib/lumi'

interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
  featured: boolean
}

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { list } = await lumi.entities.products.list()
        const featured = list.filter((product: Product) => product.featured).slice(0, 3)
        setFeaturedProducts(featured)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Componente de icono Flame personalizado
  const FlameIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38.5-2 1-3 1.072-2.143-.224-4.054-2-6 .5 2.5 2 4.9 2 7.5 0 1.105-.672 2.113-1.5 3z"/>
      <path d="M12.5 11.5A2.5 2.5 0 0 1 15 14c0 1.38-.5 2-1 3-1.072 2.143.224 4.054 2 6-.5-2.5-2-4.9-2-7.5 0-1.105.672-2.113 1.5-3z"/>
    </svg>
  )

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black"
    >
      {/* Hero Section */}
      <motion.section 
        variants={itemVariants}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg"
            alt="Cleto Reyes Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold font-oswald text-yellow-500 mb-4">
              CLETO REYES
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-6" />
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl font-light mb-2 text-gray-200">
              No es solo boxeo.
            </p>
            <p className="text-2xl md:text-3xl font-medium text-yellow-500">
              Es cultura. Es legado.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="space-y-4"
          >
            <Link
              to="/productos"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
              Explorar Productos
              <ChevronRight className="ml-2" size={20} />
            </Link>
            
            <div className="block">
              <Link
                to="/furia-mexa"
                className="inline-flex items-center px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Descubre Furia Mexa
                <FlameIcon size={20} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-yellow-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        variants={itemVariants}
        className="py-16 px-6 bg-gradient-to-r from-gray-900 to-black"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Trophy, number: "80+", label: "Años de Historia" },
              { icon: Star, number: "500+", label: "Campeones Mundiales" },
              { icon: Users, number: "1M+", label: "Boxeadores" },
              { icon: Zap, number: "100%", label: "Hecho en México" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-black/50 rounded-xl border border-gray-800"
              >
                <stat.icon className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        variants={itemVariants}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-oswald text-yellow-500 mb-4">
              PRODUCTOS DESTACADOS
            </h2>
            <p className="text-gray-400 text-lg">
              El equipamiento preferido por campeones mundiales
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={`/producto/${product._id}`}>
                    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold text-yellow-500">
                          ${product.price}
                        </p>
                        
                        <motion.div
                          className="mt-4 flex items-center text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-sm font-medium">Ver detalles</span>
                          <ChevronRight size={16} className="ml-1" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/productos"
              className="inline-flex items-center px-8 py-4 border-2 border-yellow-500 text-yellow-500 font-bold rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Ver Todos los Productos
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        variants={itemVariants}
        className="py-20 px-6 bg-gradient-to-r from-red-900/20 to-yellow-900/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-oswald text-white mb-6">
              ÚNETE AL LEGADO
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Más de 80 años creando el mejor equipamiento de boxeo del mundo. 
              Descubre por qué los campeones eligen Cleto Reyes.
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Link
                to="/historia"
                className="inline-flex items-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Conoce Nuestra Historia
                <Clock className="ml-2" size={20} />
              </Link>
              
              <Link
                to="/entrenamiento"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Entrenar Como Campeón
                <Dumbbell className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default HomePage
