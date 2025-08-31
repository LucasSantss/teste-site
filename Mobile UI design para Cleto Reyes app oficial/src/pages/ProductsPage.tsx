
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronRight, Star } from 'lucide-react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
  category: string
  inStock: boolean
  featured: boolean
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'todos', name: 'Todos', count: 0 },
    { id: 'guantes', name: 'Guantes', count: 0 },
    { id: 'sacos', name: 'Sacos', count: 0 },
    { id: 'vendas', name: 'Vendas', count: 0 },
    { id: 'ropa', name: 'Ropa', count: 0 },
    { id: 'furia-mexa', name: 'Furia Mexa', count: 0 },
    { id: 'accesorios', name: 'Accesorios', count: 0 }
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { list } = await lumi.entities.products.list()
        setProducts(list)
        setFilteredProducts(list)
      } catch (error) {
        console.error('Error fetching products:', error)
        toast.error('Error al cargar productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm])

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
      className="min-h-screen bg-black pt-6"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="px-6 mb-8"
      >
        <h1 className="text-4xl font-bold font-oswald text-yellow-500 mb-2">
          PRODUCTOS
        </h1>
        <p className="text-gray-400">
          Equipamiento profesional para campeones
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        variants={itemVariants}
        className="px-6 mb-8"
      >
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-400 hover:text-yellow-500 hover:border-yellow-500 transition-colors"
          >
            <Filter size={20} />
          </motion.button>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: showFilters ? 'auto' : 0, 
            opacity: showFilters ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex gap-2 overflow-x-auto pb-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Products Grid */}
      <motion.div 
        variants={itemVariants}
        className="px-6"
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              No se encontraron productos
            </div>
            <p className="text-gray-500">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
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
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {product.featured && (
                          <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
                            <Star size={12} className="mr-1" />
                            Destacado
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Agotado
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-6">
                      <div className="text-xs text-yellow-500 font-medium mb-2 uppercase tracking-wide">
                        {product.category.replace('-', ' ')}
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-yellow-500">
                          ${product.price}
                        </p>
                        
                        <motion.div
                          className="flex items-center text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
      </motion.div>

      {/* Results Counter */}
      {!loading && (
        <motion.div 
          variants={itemVariants}
          className="px-6 py-8 text-center"
        >
          <p className="text-gray-400">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProductsPage
