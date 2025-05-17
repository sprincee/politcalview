'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchRecentBills, searchBills } from '../../lib/congress';
import { saveBillToDb } from '../../lib/supabaseApi';
import Navbar from '@/components/ui/Navbar';

function BillsContent() {
    const searchParams = useSearchParams();
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const query = searchParams.get('q');

    useEffect(() => {
        const loadBills = async () => {
            setLoading(true);
            try {
                let billsData = [];
                if (query) {
                    billsData = await searchBills(query);
                    console.log(`Search returned ${billsData.length} bills`);
                } else {
                    billsData = await fetchRecentBills();
                    console.log(`Fetch returned ${billsData.length} bills`);
                }

                if (billsData && billsData.length > 0) {
                    console.log('Saving bills to database...');
                    for (const bill of billsData) {
                        try {
                            await saveBillToDb({
                                ...bill,
                                source: 'federal'
                            });
                        } catch (error) {
                            console.error('Error saving bill, continuing:', error);
                        }
                    }
                } else {
                    console.log('No bills to save');
                }

                setBills(billsData);
            } catch (error) {
                console.error('Error loading bills:', error);
                setError('Failed to load bills. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadBills();
    }, [query]);

    return (
        <main className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Browse Legislation</h1>
                    <p className='mt-2 text-sm text-gray-900'>
                        Search and explore federal bills to stay informed on legislative activities.
                    </p>
                </div>

                <div className='mb-8'>
                    <form action='/bills' method='get' className='flex max-w-3xl'>
                        <input
                            type='text'
                            name='q'
                            placeholder='Search bills by keyword, number, or topic...'
                            defaultValue={query || ''}
                            className='flex-1 min-w-0 block w-full px-4 py-3 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500'
                        />
                        <button
                            type='submit'
                            className='bg-green-800 text-white px-6 py-3 rounded-r-md hover:bg-green-700 transition-colors font-medium'
                        >
                            Search
                        </button>
                    </form>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800'></div>
                    </div>
                ) : bills.length === 0 ? (
                    <div className='bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm'>
                        <div className='mx-auto h-12 w-12 text-gray-400 mb-4'>I</div>
                        <h3 className='text-lg font-medium text-gray-900'>No bills found.</h3>
                        <p className='mt-2 text-gray-500'>
                            Try adjusting your search to find what you're looking for.
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {bills.map(bill => (
                            <div
                                key={bill.id || Math.random()}
                                className='border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'
                            >
                                <div className='p-5'>
                                    <div className='flex justify-between items-center mb-3'>
                                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                            {bill.bill_number}
                                        </span>
                                        <span className='text-xs text-gray-500'>
                                            {bill.chamber === 'house' ? 'House' : 'Senate'}
                                        </span>
                                    </div>

                                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                        {bill.title}
                                    </h3>

                                    <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                                        {bill.description || 'No description available.'}
                                    </p>

                                    <div className='flex items-center justify-between text-sm'>
                                        <div className='text-gray-500'>
                                            Introduced: {new Date(bill.introduced_date).toLocaleDateString()}
                                        </div>
                                        <span className='px-2.5 p-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                                            {bill.status || 'Unknown status'}
                                        </span>
                                    </div>

                                    <div className='mt-4 pt-3 border-t border-gray-100 text-right'>
                                        <a
                                            href={`/bills/${bill.id}`}
                                            className='text-green-800 hover:text-green-700 text-sm font-medium'
                                        >
                                            View Details -
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                 </div>
            )}
        </div>
    </main>
    );
}

export default function BillsPage() {
    return (
        <main className='min-h-screen bg-gray-50'>
            <Navbar />
            <Suspense fallback={<div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800'></div>
            </div>}>
                <BillsContent />
            </Suspense>
        </main>
    )
}

        


        /*
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Browse Legislation</h1>
          
          <div className="mb-6">
            <form action="/bills" method="get" className="flex">
              <input 
                type="text"
                name="q"
                placeholder="Search bills..."
                defaultValue={query || ''}
                className="flex-1 px-4 py-2 border rounded-l"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Search
              </button>
            </form>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
                <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
          ) : bills.length === 0 ? (
            <div className="bg-gray-100 px-4 py-8 rounded text-center">
                No bills found. Try adjusting your search.
            </div>
          ) : (
            <div className="space-y-4">
                {bills.map(bill => (
                    <div
                        key={bill.id || Math.random()}
                        className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                        <h3 className="text-lg font-semibold text-blue-600 mb-1">
                            {bill.bill_number}: {bill.title}
                        </h3>
                        <div className="text-sm text-gray-500 mb-2">
                            {bill.chamber === 'house' ? 'House' : 'Senate'} • 
                            Introduced: {new Date(bill.introduced_date).toLocaleDateString()}
                        </div>
                        <p className="text-gray-700 mb-3">
                            {bill.description || 'No description available.'}
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="px-2 py-2 text-xs rounded-full bg-blue-100 text-blue-800">
                                {bill.status || 'Unknown status'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </div>
    );
}
    */
