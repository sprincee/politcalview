'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchRecentBills, searchBills } from '../../lib/congress';
import { saveBillToDb } from '../../lib/supabaseApi';

export default function BillsPage() {
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