'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BillsSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/bills?q=${encodeURIComponent(searchQuery.trim())}`);
    }
};

return (
    <form onSubmit={handleSearch} className="w-full">
        <div className='relative'>
            <input
                type="text"
                placeholder="Search for bills by keyword, number, or sponsor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gra-400 hover:text-blue-500"
                aria-label="Search"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    </form>
)}
