
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { lumi } from '../lib/lumi'

interface NewsItem {
  _id: string
  title: string
  description: string
  type: string
  imageUrl: string
  published: boolean
  eventDate?: string
  createdAt: string
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('todos')

  const newsTypes = [
    { id: 'todos', name: 'Todas las noticias' },
    { id: 'noticia', name: 'Noticias' },
    { id: 'evento', name: 'Eventos' },
    { id: 'pelea', name: 'Peleas' },
    { id: 'lanzamiento', name: 'Lanzamientos' }
  ]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { list } = await lumi.entities.news.list()
        const publishedNews = list.filter((item: NewsItem) => item.published)
        setNews(publishedNews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const filteredNews = selectedType === 'todos' 
    ? news 
    : news.filter(item => item.type === selectedType)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'noticia': return 'bg-blue-500'
      case 'evento': return 'bg-green-500'
      case 'pelea': return 'bg-red-500'
      case 'lanzamiento': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
          NOTICIAS Y EVENTOS
        </h1>
        <p className="text-gray-400">
          Mantente al día con las últimas noticias del mundo Cleto Reyes
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        variants={itemVariants}
        className="px-6 mb-8"
      >
        <div className="flex gap-2 overflow-x-auto pb-4">
          {newsTypes.map((type) => (
            <motion.button
              key={type.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedType === type.id
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {type.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* News Grid */}
      <motion.div 
        variants={itemVariants}
        className="px-6"
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              No hay noticias disponibles
            </div>
            <p className="text-gray-500">
              Vuelve pronto para más actualizaciones
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Type Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold uppercase ${getTypeColor(item.type)}`}>
                      {item.type}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatDate(item.createdAt)}
                      </div>

                      {item.eventDate && (
                        <div className="flex items-center text-yellow-500">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(item.eventDate)}
                        </div>
                      )}
                    </div>

                    <motion.div
                      className="flex items-center text-yellow-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">Leer más</span>
                      <ChevronRight size={16} className="ml-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
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
            Mostrando {filteredNews.length} de {news.length} noticias
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default NewsPage
