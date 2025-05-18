'use client';

import {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';
import { getUserSavedBills, getUserProfile, getUserSearchHistory } from '@/lib/supabaseApi';

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [savedBills, setSavedBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('saved');

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            try {
                const bills = await getUserSavedBills(user.id);
                setSavedBills(bills || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, router]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <main className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='md:flex md:items-center md:justify-between mb-8'>
                    <div className='flex-1 min-w-0'>
                        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
                        <p className='mt-1 text-sm text-gray-500'>
                            Track legislation and manage your saved bills
                        </p>
                    </div>
                </div>

                <div className='border-b border-gray-200 mb-8'>
                    <nav className='-mb-px flex space-x-8'>
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`${
                                activeTab === 'saved'
                                    ? 'border-green-800 text-green-800'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Saved Bills
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`${
                                activeTab === 'history'
                                    ? 'border-green-800 text-green-800'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Search History
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`${
                                activeTab === 'notifications'
                                    ? 'border-green-800 text-green-800'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`${
                                activeTab === 'settings'
                                    ? 'border-green-800 text-green-800'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Settings
                        </button>      
                    </nav>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'saved' && (
                            <div className='bg-white rounded-lg border border-gray-200 p-8 text-center'>
                                <div className='flex flex-col items-center justify-center mb-4'>
                                    <div className='h-12 w-12 text-gray-400 mb-3'>📋</div>
                                    <div className='ml-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                                        In Development
                                    </div>
                                </div>
                                <h3 className='text-lg font-medium text-gray-900'>Your Saved Bills</h3>
                                <p className='mt-2 text-gray-500'>
                                    This feature is currently under development.
                                </p>
                                <div className='mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50'>
                                    <p className='text-sm text-gray-500 italic'>
                                        Soon... you'll be able to save bills of interest and track their progress through the legislative process.
                                    </p>
                                </div>
                                <div className='mt-6'>
                                    <a
                                        href='/bills'
                                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-700'
                                    >
                                        Explore Bills
                                    </a>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className='bg-white rounded-lg border border-gray-200 p-8 text-center'>
                                <div className='flex flex-col items-center justify-center mb-4'>
                                    <div className='h-12 w-12 text-gray-400 mb-3'>🔍</div>
                                    <div className='ml-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                                        In Development
                                    </div>
                                </div>
                                <h3 className='text-lg font-medium text-gray-900'>Search History</h3>
                                <p className='mt-2 text-gray-500'>
                                    This feature is currently under development.
                                </p>
                                <div className='mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50'>
                                    <p className='text-sm text-gray-500 italic'>
                                        Soon... your search history will help you quickly return to previous searches and track your research on legislation.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className='bg-white rounded-lg border border-gray-200 p-8 text-center'>
                                <div className='flex flex-col items-center justify-center mb-4'>
                                    <div className='h-12 w-12 text-gray-400 mb-3'>🔔</div>
                                    <div className='ml-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                                        In Development
                                    </div>
                                </div>
                                <h3 className='text-lg font-medium text-gray-900'>Notification Center</h3>
                                <p className='mt-2 text-gray-500'>
                                    This feature is currently under development. 
                                </p>
                                <div className='mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50'>
                                    <p className='text-sm text-gray-500 italic'>
                                    Soon... your notification center will allow you to stay informed about real-time updates for saved bills, receive vote alerts, and customize your notification preferences.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className='bg-white rounded-lg border border-gray-200 p-8 text-center'>
                                <div className='flex flex-col items-center justify-center mb-4'>
                                    <div className='h-12 w-12 text-gray-400 mb-3'>⚙️</div>
                                    <div className='ml-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                                        In Development
                                    </div>
                                </div>
                                <h3 className='text-lg font-medium text-gray-900'>Account Settings</h3>
                                <p className='mt-2 text-gray-500'>
                                    This feature is currently under development. 
                                </p>
                                <div className='mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50'>
                                    <p className='text-sm text-gray-500 italic'>
                                    Soon... you will be able to customize your notification preferences and update your profile information.
                                    </p>
                                    <div className='mt-4 text-sm text-gray-500 italic'>
                                        <p className='text-sm text-gray-500 italic'>
                                            Current user: <span className='font-medium'>{user?.email}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}