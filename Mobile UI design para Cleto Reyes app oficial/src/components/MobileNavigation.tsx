
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Package, 
  Clock, 
  Dumbbell, 
  Newspaper, 
  ShoppingCart 
} from 'lucide-react'

const MobileNavigation: React.FC = () => {
  const location = useLocation()
  
  // Componente de icono Flame personalizado
  const FlameIcon = ({ size = 20 }: { size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38.5-2 1-3 1.072-2.143-.224-4.054-2-6 .5 2.5 2 4.9 2 7.5 0 1.105-.672 2.113-1.5 3z"/>
      <path d="M12.5 11.5A2.5 2.5 0 0 1 15 14c0 1.38-.5 2-1 3-1.072 2.143.224 4.054 2 6-.5-2.5-2-4.9-2-7.5 0-1.105.672-2.113 1.5-3z"/>
    </svg>
  )
  
  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/productos', icon: Package, label: 'Productos' },
    { path: '/furia-mexa', icon: FlameIcon, label: 'Furia Mexa' },
    { path: '/historia', icon: Clock, label: 'Historia' },
    { path: '/entrenamiento', icon: Dumbbell, label: 'Entrenar' },
    { path: '/noticias', icon: Newspaper, label: 'Noticias' },
    { path: '/carrito', icon: ShoppingCart, label: 'Carrito' }
  ]

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center py-2 px-3 min-w-0"
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-lg"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative z-10 ${
                  isActive ? 'text-yellow-500' : 'text-gray-400'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              
              <span className={`text-xs mt-1 font-medium truncate ${
                isActive ? 'text-yellow-500' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default MobileNavigation
