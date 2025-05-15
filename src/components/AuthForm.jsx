'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext.jsx'
import { useRouter } from 'next/navigation'
import { RouteMatcher } from 'next/dist/server/route-matchers/route-matcher'

export default function AuthForm({ mode = 'signin' }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formMode, setFormMode] = useState(mode)
    const { signIn, signUp } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            if (formMode === 'signin') {
                const { error } = await signIn(email, password)
                if (error) throw error
                router.push('/dashboard')
            } else {
                const { error } = await signUp(email, password)
                if (error) throw error
                setFormMode('confirmation')
            }
        } catch (error) {
            setError(error.message || 'An error occured during authentication')
        } finally {
            setLoading(false)
        }
    }

    if (formMode === 'confirmation') {
        return (
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">Confirmation email sent</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Please check your email for a confirmation link to complete your registation.
                    </p>
                    <button
                        onClick={() => setFormMode('signin')}
                        classname="mt-4 text-sm text-green-800 hover:text-green-700"
                    >
                        Return to sign in
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm">
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={formMode === 'signin' ? 'current-password' : 'new-password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm">
                        </input>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                        {loading ? 'Processing...' : formMode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <div className="text-sm text-center text-gray-600">
                    {formMode === 'signin' ? (
                        <p>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setFormMode('signup')}
                                className="font-medium text-green-800 hover:text-green-700">
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setFormMode('signin')}
                                className="font-medium text-green-800 hover:text-greeb-700">
                                Sign In
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}