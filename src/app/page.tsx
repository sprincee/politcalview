'use client'

import Link from 'next/link'
import Navbar from '@/components/ui/Navbar.jsx'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className='min-h-screen bg-gradient-to-b from-white to-green-50'>
      <Navbar />
      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'
        >
          <div className='text-center'>
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'
            >
              Making Legislation <span className='text-green-800'>Accessible</span> for Everyone
            </motion.h1>
            <motion.p 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className='mt-6 text-lg leading-8 text-gray-600'
            >
              PoliView simplifies legislative information from federal and state governments,
              helping citizens stay informed and engaged with the democratic process.
            </motion.p>
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className='mt-10 flex items-center justify-center gap-x-6'
            >
              <Link
                href='/bills'
                className='rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 transition-all hover:scale-105'>
                Explore Bills
              </Link>
              <Link
                href='/about'
                className='text-sm font-semibold leading-6 text-gray-900 hover:text-green-800 transition-colors'>
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mx-auto max-w-7xl pb-24'
        >
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {[
              {
                icon: "🔍",
                title: "Search Legislation",
                description: "Browse and search through federal and state bills with our intuitive interface."
              },
              {
                icon: "👥",
                title: "Track Representatives",
                description: "Follow your representatives and see their voting records on bills you care about."
              },
              {
                icon: "🔔",
                title: "Bill Notifications",
                description: "Get notified when bills you are following change status or come up for a vote."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
                className='rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all'
              >
                <div className='flex items-center justify-center'>
                  <div className='h-8 w-8 text-green-800'>
                    {feature.icon}
                  </div>
                  <h3 className='ml-3 text-lg font-medium text-gray-900'>{feature.title}</h3>
                </div>
                <p className='mt-4 text-sm text-gray-500'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}