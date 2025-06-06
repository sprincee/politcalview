'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const techStack = [
    { name: 'Next.js', version: '15.3.2', color: 'bg-black text-white' },
    { name: 'React', version: '19.0', color: 'bg-blue-500 text-white' },
    { name: 'TypeScript', version: '5.x', color: 'bg-blue-600 text-white' },
    { name: 'Tailwind', version: '4.x', color: 'bg-teal-500 text-white' },
    { name: 'Supabase', version: '2.49', color: 'bg-green-600 text-white' },
    { name: 'Framer Motion', version: '12.12', color: 'bg-pink-500 text-white' }
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <motion.a
            href="hhttps://www.linkedin.com/in/mahad-skhan/" // Replace with your LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="text-sm text-gray-700 hover:text-green-800 transition-colors font-medium"
          >
            An <span className="underline decoration-2 underline-offset-2">M.K Corp.</span> project.
          </motion.a>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-2">
              {/* Version badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200"
              >
                v0.1.0
              </motion.div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Built with</span>
                <div className="flex gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium cursor-default transition-all"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}