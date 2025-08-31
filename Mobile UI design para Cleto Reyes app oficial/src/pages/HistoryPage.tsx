
import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Trophy, Star, Users } from 'lucide-react'

const HistoryPage: React.FC = () => {
  const timelineEvents = [
    {
      year: '1945',
      title: 'Los Inicios',
      description: 'Cleto Reyes funda la empresa en una pequeña tienda en el centro de México.',
      image: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
      icon: Star
    },
    {
      year: '1960',
      title: 'Primeros Campeones',
      description: 'Los guantes Cleto Reyes son usados por primera vez en un campeonato mundial.',
      image: 'https://images.pexels.com/photos/4754147/pexels-photo-4754147.jpeg',
      icon: Trophy
    },
    {
      year: '1980',
      title: 'Reconocimiento Mundial',
      description: 'Cleto Reyes se convierte en la marca oficial de múltiples organizaciones de boxeo.',
      image: 'https://images.pexels.com/photos/4753975/pexels-photo-4753975.jpeg',
      icon: Users
    },
    {
      year: '2000',
      title: 'Nueva Era',
      description: 'Expansión internacional y modernización de los procesos de manufactura.',
      image: 'https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg',
      icon: Clock
    },
    {
      year: '2020',
      title: 'Furia Mexa',
      description: 'Lanzamiento de la línea exclusiva para mujeres boxeadoras.',
      image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg',
      icon: Star
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        className="px-6 mb-12 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold font-oswald text-yellow-500 mb-4">
          NUESTRA HISTORIA
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Más de 80 años forjando campeones y construyendo el legado 
          más importante del boxeo mexicano.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="px-6 max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 to-red-500" />

          {timelineEvents.map((event, index) => {
            const Icon = event.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex items-start mb-16 last:mb-0"
              >
                {/* Timeline Icon */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mr-8">
                  <Icon className="text-black" size={24} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-yellow-500/50 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="text-3xl font-bold text-yellow-500 mb-2">
                          {event.year}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Legacy Section */}
      <motion.section 
        variants={itemVariants}
        className="py-20 px-6 mt-20 bg-gradient-to-r from-yellow-900/20 to-red-900/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-oswald text-white mb-8">
            EL LEGADO CONTINÚA
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="text-4xl font-bold text-yellow-500 mb-2">500+</div>
              <div className="text-white font-medium mb-2">Campeones Mundiales</div>
              <div className="text-gray-400 text-sm">Han usado nuestros guantes</div>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-yellow-500 mb-2">80+</div>
              <div className="text-white font-medium mb-2">Años de Historia</div>
              <div className="text-gray-400 text-sm">Perfeccionando nuestro arte</div>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-yellow-500 mb-2">100%</div>
              <div className="text-white font-medium mb-2">Hecho en México</div>
              <div className="text-gray-400 text-sm">Con orgullo y tradición</div>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Desde 1945, cada par de guantes Cleto Reyes lleva consigo la pasión, 
            el orgullo y la tradición mexicana. No solo fabricamos equipamiento de boxeo, 
            forjamos sueños y construimos leyendas.
          </p>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default HistoryPage
