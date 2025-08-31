
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  imageUrl: string
  gallery?: string[]
  category: string
  inStock: boolean
  weight?: string
  material?: string
  featured: boolean
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return

      try {
        const productData = await lumi.entities.products.findById(id)
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Producto no encontrado')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const addToCart = () => {
    if (!product) return
    
    // Simulate adding to cart
    toast.success(`${product.name} agregado al carrito`)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos')
  }

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }} else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copiado al portapapeles')
    }
  }

  const nextImage = () => {
    if (!product?.gallery) return
    setCurrentImageIndex((prev) => 
      prev === product.gallery!.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (!product?.gallery) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.gallery!.length - 1 : prev - 1
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Producto no encontrado</h2>
          <Link
            to="/productos"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-400"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a productos
          </Link>
        </div>
      </div>
    )
  }

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black pt-6"
    >
      {/* Header */}
      <div className="px-6 mb-6">
        <Link
          to="/productos"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver a productos
        </Link>
      </div>

      {/* Product Gallery */}
      <div className="relative mb-8">
        <div className="relative h-96 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-yellow-500' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-yellow-500 text-sm font-medium mb-2 uppercase tracking-wide">
              {product.category.replace('-', ' ')}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {product.name}
            </h1>
            {product.featured && (
              <div className="flex items-center text-yellow-500 mb-4">
                <Star size={16} className="mr-1" />
                <span className="text-sm font-medium">Producto destacado</span>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className={`p-3 rounded-full border-2 transition-colors ${
                isFavorite
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <Heart size={20} />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={shareProduct}
              className="p-3 rounded-full border-2 border-gray-600 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-bold text-yellow-500">
            ${product.price}
          </span>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-3">Descripción</h3>
          <p className="text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specifications */}
        {(product.weight || product.material) && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Especificaciones</h3>
            <div className="space-y-3">
              {product.weight && (
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Peso</span>
                  <span className="text-white">{product.weight}</span>
                </div>
              )}
              {product.material && (
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Material</span>
                  <span className="text-white">{product.material}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-gray-900 rounded-lg">
              <Truck className="text-yellow-500 mr-3" size={24} />
              <div>
                <div className="text-white font-medium">Envío gratis</div>
                <div className="text-gray-400 text-sm">En pedidos +$100</div>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-900 rounded-lg">
              <Shield className="text-yellow-500 mr-3" size={24} />
              <div>
                <div className="text-white font-medium">Garantía</div>
                <div className="text-gray-400 text-sm">12 meses</div>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-900 rounded-lg">
              <Award className="text-yellow-500 mr-3" size={24} />
              <div>
                <div className="text-white font-medium">Calidad</div>
                <div className="text-gray-400 text-sm">Profesional</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-600 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 text-white font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
            
            <div className="text-gray-400">
              {product.inStock ? 'En stock' : 'Agotado'}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={addToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              product.inStock
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="mr-3" size={20} />
            {product.inStock ? 'Agregar al carrito' : 'Producto agotado'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetailPage
