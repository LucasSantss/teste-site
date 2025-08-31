
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, User, Filter, Search } from 'lucide-react'
import { lumi } from '../lib/lumi'

interface TrainingVideo {
  _id: string
  title: string
  description: string
  level: string
  category: string
  duration: number
  thumbnailUrl: string
  instructor: string
  views: number
}

const TrainingPage: React.FC = () => {
  const [videos, setVideos] = useState<TrainingVideo[]>([])
  const [filteredVideos, setFilteredVideos] = useState<TrainingVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<string>('todos')
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [searchTerm, setSearchTerm] = useState('')

  const levels = [
    { id: 'todos', name: 'Todos los niveles' },
    { id: 'principiante', name: 'Principiante' },
    { id: 'intermedio', name: 'Intermedio' },
    { id: 'avanzado', name: 'Avanzado' },
    { id: 'profesional', name: 'Profesional' }
  ]

  const categories = [
    { id: 'todos', name: 'Todas las categorías' },
    { id: 'tecnica', name: 'Técnica' },
    { id: 'acondicionamiento', name: 'Acondicionamiento' },
    { id: 'sparring', name: 'Sparring' },
    { id: 'defensa', name: 'Defensa' },
    { id: 'ataque', name: 'Ataque' }
  ]

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { list } = await lumi.entities.training_videos.list()
        setVideos(list)
        setFilteredVideos(list)
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    let filtered = videos

    if (selectedLevel !== 'todos') {
      filtered = filtered.filter(video => video.level === selectedLevel)
    }

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(video => video.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredVideos(filtered)
  }, [videos, selectedLevel, selectedCategory, searchTerm])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'principiante': return 'text-green-500'
      case 'intermedio': return 'text-yellow-500'
      case 'avanzado': return 'text-orange-500'
      case 'profesional': return 'text-red-500'
      default: return 'text-gray-500'
    }
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
          ENTRENAMIENTO
        </h1>
        <p className="text-gray-400">
          Aprende de los mejores. Entrena como un campeón.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        variants={itemVariants}
        className="px-6 mb-8"
      >
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar videos o instructores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
          >
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-colors"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Videos Grid */}
      <motion.div 
        variants={itemVariants}
        className="px-6"
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No se encontraron videos
            </h3>
            <p className="text-gray-400">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-yellow-500 rounded-full p-4">
                        <Play className="text-black" size={24} />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center">
                      <Clock size={12} className="mr-1" />
                      {video.duration}min
                    </div>

                    {/* Level Badge */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold uppercase ${getLevelColor(video.level)} bg-black/80`}>
                      {video.level}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-yellow-500 text-xs font-medium mb-2 uppercase tracking-wide">
                      {video.category}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-400">
                        <User size={14} className="mr-1" />
                        {video.instructor}
                      </div>
                      
                      <div className="text-gray-500">
                        {video.views.toLocaleString()} vistas
                      </div>
                    </div>
                  </div>
                </div>
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
            Mostrando {filteredVideos.length} de {videos.length} videos
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TrainingPage
