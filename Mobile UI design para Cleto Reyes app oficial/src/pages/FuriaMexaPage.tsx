
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Star, Heart } from 'lucide-react'
import { lumi } from '../lib/lumi'

interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
  category: string
  gallery?: string[]
}

const FuriaMexaPage: React.FC = () => {
  const [furiaMexaProducts, setFuriaMexaProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFuriaMexaProducts = async () => {
      try {
        const { list } = await lumi.entities.products.list()
        const furiaProducts = list.filter((product: Product) => product.category === 'furia-mexa')
        setFuriaMexaProducts(furiaProducts)
      } catch (error) {
        console.error('Error fetching Furia Mexa products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFuriaMexaProducts()
  }, [])

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }

  // Componente de icono Flame personalizado
  const FlameIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
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
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg"
            alt="Furia Mexa Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/50 to-black/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <FlameIcon size={48} className="text-red-500 mr-4" />
              <h1 className="text-6xl md:text-8xl font-bold font-oswald text-red-500">
                FURIA MEXA
              </h1>
              <FlameIcon size={48} className="text-red-500 ml-4" />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6" />
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl font-light mb-4 text-white">
              Fuerza. Pasión. Actitud.
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              La colección exclusiva para mujeres que no temen mostrar su poder. 
              Diseñada por guerreras, para guerreras.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link
              to="/productos"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:from-red-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105"
            >
              Explorar Colección
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Editorial Gallery */}
      <motion.section 
        variants={itemVariants}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-oswald text-white mb-6">
              EDITORIAL URBANO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Un estilo que trasciende el ring. Furia Mexa representa la fuerza femenina 
              en cada aspecto de la vida urbana.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                image: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg",
                title: "Fuerza Interior",
                subtitle: "Descubre tu poder"
              },
              {
                image: "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg",
                title: "Estilo Urbano",
                subtitle: "Moda que inspira"
              },
              {
                image: "https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg",
                title: "Actitud Ganadora",
                subtitle: "Sin límites"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-red-400 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section 
        variants={itemVariants}
        className="py-20 px-6 bg-gradient-to-r from-red-900/10 to-pink-900/10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-oswald text-red-500 mb-4">
              COLECCIÓN EXCLUSIVA
            </h2>
            <p className="text-gray-300 text-lg">
              Equipamiento diseñado específicamente para la mujer moderna
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : furiaMexaProducts.length === 0 ? (
            <div className="text-center py-20">
              <FlameIcon size={64} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Próximamente
              </h3>
              <p className="text-gray-400">
                La colección Furia Mexa estará disponible muy pronto
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {furiaMexaProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={`/producto/${product._id}`}>
                    <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-red-500/20 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        <div className="absolute top-4 right-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-black/50 rounded-full text-red-500 hover:text-red-400 transition-colors"
                          >
                            <Heart size={20} />
                          </motion.button>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <FlameIcon size={16} className="text-red-500 mr-2" />
                          <span className="text-red-400 text-sm font-medium uppercase tracking-wide">
                            Furia Mexa
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-red-500">
                            ${product.price}
                          </p>
                          
                          <motion.div
                            className="flex items-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-sm font-medium">Ver más</span>
                            <ChevronRight size={16} className="ml-1" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Manifesto Section */}
      <motion.section 
        variants={itemVariants}
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-oswald text-white mb-8">
              EL MANIFIESTO FURIA MEXA
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                <strong className="text-red-500">Somos más que boxeadoras.</strong> 
                Somos guerreras que transformamos cada obstáculo en oportunidad.
              </p>
              
              <p>
                <strong className="text-red-500">Nuestra furia no es rabia.</strong> 
                Es pasión pura, determinación inquebrantable y amor por lo que hacemos.
              </p>
              
              <p>
                <strong className="text-red-500">Furia Mexa es actitud.</strong> 
                Es levantarse cada día dispuesta a ser mejor que ayer.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12"
            >
              <div className="text-3xl font-bold text-red-500 mb-4">
                #FuriaMexa
              </div>
              <p className="text-gray-400">
                Únete al movimiento. Comparte tu furia.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default FuriaMexaPage
