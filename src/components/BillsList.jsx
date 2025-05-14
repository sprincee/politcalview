import Link from "next/link";
import { useAuth } from '@context/AuthContext';
import { saveBillForUser, removeSavedBill } from '@lib/supabaseApi';
import { useState } from 'react';

export default function BillsList({ bills }) {
    const { user } = useAuth();
    const [savedBills, setSavedBills] = useState({});

    const toggleSaveBill = async (billId) => {
        if (!user) return;

        try {
            if (savedBills[billId]) {
                await removeSavedBill(user.id, billId);
                setSavedBills(prev => ({ ...prev, [billId]: false }));
            } else {
                await saveBillForUser(user.id, billId);
                setSavedBills(prev => ({ ...prev, [billId]: true }));
            }
        } catch (error) {
            console.error('Error toggling bill save status:', error);
        }
    };

    return (
        <div className="space-y-4">
            {bills.map(bill => (
                <div
                    key={bill.id}
                    className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <Link href={`/bills/${bill.id}`}>
                                    <h3 className="text-lg font-semibold text-blue-600 hover:underline mb-1">
                                        {bill.bill_number}: {bill.title}
                                    </h3>
                                </Link>
                                <div className="text-sm text-gray-500 mb-2">
                                    {bill.chamber === 'house' ? 'House' : 'Senate'} • 
                                    Introduced: {new Date(bill.introduced_date).toLocaleDateString()} •
                                    Sponsor: {bill.sponsor} 
                                </div>
                            </div>

                            {user && (
                                <button
                                    onClick={() => toggleSaveBill(bill.id)}
                                    className="text-gray-400 hover:text-yellow-500"
                                >
                                    {savedBills[bill.id] ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                      </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>

                        <p className="text-gray-700 mb-3">
                            {bill.description || 'No description available.'}
                        </p>

                        <div className="flex items-center space-x-2">
                            <span className={`px-2 py-2 text-xs rounded-full ${
                                bill.status === 'introduced' ? 'bg-blue-100 text-blue-800' :
                                bill.status === 'passed' ? 'bg-green-100 text-green-800' :
                                bill.status === 'enacted' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {bill.status}
                            </span>

                            {bill.tags && bill.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-2 text-xs rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}