import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PortfolioMetric } from '@/data/portfolio-data'

interface PortfolioMetricsProps {
  metrics: PortfolioMetric[]
}

// Ícones mapping
const iconMap: { [key: string]: React.ReactNode } = {
  TrendingUp: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L7 17" />
    </svg>
  ),
  Clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Layers: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  Eye: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  CheckCircle: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M12 4.354c-1.889 0-3.516 1.379-3.814 3.246m7.628 0c.298-1.867-1.925-3.246-3.814-3.246m0 8.048a4 4 0 110 8.048m0-8.048c-1.889 0-3.516 1.379-3.814 3.246m7.628 0c.298-1.867-1.925-3.246-3.814-3.246" />
    </svg>
  ),
  DollarSign: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Heart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
}

// Componente para animar número
const AnimatedCounter: React.FC<{ value: string; duration?: number }> = ({ value, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    // Extrair número do valor (ex: "60%" -> 60)
    const numericValue = parseInt(value.replace(/\D/g, ''), 10)
    const suffix = value.replace(/[0-9]/g, '')

    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    let currentValue = 0
    const increment = numericValue / (duration * 60)
    const interval = setInterval(() => {
      currentValue += increment
      if (currentValue >= numericValue) {
        setDisplayValue(numericValue + suffix)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(currentValue) + suffix)
      }
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [isInView, value, duration])

  return <span ref={ref}>{displayValue}</span>
}

const PortfolioMetrics: React.FC<PortfolioMetricsProps> = ({ metrics }) => {
  if (!metrics || metrics.length === 0) {
    return null
  }

  const gridColsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }
  const gridCols = gridColsMap[Math.min(metrics.length, 4)] || 'grid-cols-1'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`grid gap-6 ${gridCols}`}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ translateY: -5 }}
          className="group relative"
        >
          {/* Card */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/10 group-hover:border-primary/30 transition-all duration-300 h-full overflow-hidden">
            {/* Background effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            </div>

            {/* Conteúdo */}
            <div className="relative z-10">
              {/* Ícone */}
              {metric.icon && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary/30 transition-colors duration-300"
                >
                  {iconMap[metric.icon] || <span>→</span>}
                </motion.div>
              )}

              {/* Valor */}
              <div className="mb-3">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-1">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="h-1 w-12 bg-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              {/* Label */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                {metric.label}
              </p>
            </div>

            {/* Border animation */}
            <motion.div
              className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none"
              initial={{ borderColor: 'transparent' }}
              whileHover={{ borderColor: 'rgba(236, 200, 11, 0.2)' }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PortfolioMetrics
