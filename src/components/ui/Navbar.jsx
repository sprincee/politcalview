'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
    const { user } = useAuth()

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-2xl font-bold text-green-800">PoliView</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="border-transparent text-gray-500 hover:border-green-800 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Home
                            </Link>
                            <Link href="/bills" className="border-transparent text-gray-500 hover:border-green-800 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            Bills
                            </Link>
                            <Link href="/about" className="border-transparent text-gray-500 hover:border-green-800 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                            About
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {user ? (
                            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-md hover:bg-green-800 transition-colors">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-md hover:bg-green-800 transition-colors">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}