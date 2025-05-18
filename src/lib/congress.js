import axios from "axios";

const CONGRESS_API_KEY = process.env.NEXT_PUBLIC_CONGRESS_API_KEY;
const CONGRESS_API_BASE_URL = 'https://api.congress.gov/v3';

const congressApi = axios.create({
    baseURL: CONGRESS_API_BASE_URL,
    params: {
        api_key: CONGRESS_API_KEY
    }
});

const mockBill = {
        id: 'hr2730-118',
        bill_number: 'H.R. 2730',
        number: '2730',
        type: 'HR',
        congress: '118',
        title: 'Healthcare Accessiblity for All Act',
        description: 'A bill to improve healthcare accessbility.',
        introduced_date: '2023-04-15',
        last_action_date: '2023-06-20',
        last_action_text: 'Referred to the Subcomittee on Health',
        chamber: 'house',
        sponsor: 'Rep. Johnson, Mike [R-LA]',
        status: 'In Committee',
        source: 'federal',
        state: null,
        url: 'https://www.congress.gov/bill/118th-congress/house-bill/2730',
        simple_summary: 'N/A'
    };

export const fetchRecentBills = async (limit = 20, offset = 0) => {
    try {
        console.log('Fetching recent bills from Congress 118.')
        const response = await congressApi.get('/bill/118', {
            params: {
                limit,
                offset,
                format: 'json'
            }
        });
        if (response?.data?.bills && response.data.bills.length > 0) {
            const mappedBills = response.data.bills.map(bill => {

                const rawIntroducedDate = bill.introducedDate || bill.introduced_date || bill.introduced || null;

                let formattedIntroducedDate = null;
                if (rawIntroducedDate) {
                    const date = new Date(rawIntroducedDate);
                    if (!isNaN(date.getTime()) && date.getFullYear() >= 1970) {
                        formattedIntroducedDate = date.toISOString().split('T')[0];
                    } else {
                        console.log(`Invalid date found for bill ${bill.number}: ${rawIntroducedDate}`);
                    }
                }

                const rawLastActionDate = bill.latestAction?.actionDate || null;
                let formattedLastActionDate = null;
                if (rawLastActionDate) {
                    const date = new Date(rawLastActionDate);
                    if (!isNaN(date.getTime()) && date.getFullYear() >= 1970) {
                        formattedLastActionDate = date.toISOString().split('T')[0];
                    }
                }

                return {
                    id: `${bill.type.toLowerCase()}${bill.number}-${bill.congress}`,
                    bill_number: `${bill.type} ${bill.number}`,
                    number: bill.number,
                    type: bill.type,
                    congress: bill.congress,
                    title: bill.title || 'No title available',
                    description: bill.latestAction?.text || 'No description available',
                    introduced_date: formattedIntroducedDate,
                    last_action_date: formattedLastActionDate,
                    last_action_text: bill.latestAction?.text || '',
                    chamber: bill.originChamber?.toLowerCase() || '',
                    sponsor: bill.sponsors ? bill.sponsors[0]?.fullName || '' : '',
                    status: bill.latestAction?.text ? 'Active' : 'Unknown',
                    source: 'federal',
                    state: null,
                    url: bill.url || '',
                    simple_summary: ''
                };
            });

            console.log('Mapped bills', mappedBills.length);
            if (mappedBills.length > 0) {
                console.log('Sample bill date format check:', {
                    bill_number: mappedBills[0].bill_number,
                    introduced_date: mappedBills[0].introduced_date
                });
            }
            return mappedBills;
        }

        console.log('API returned no bills, using mock data now');
        return [mockBill];
    } catch (error) {
        console.error('Error fetching recent bills', error);
        return [mockBill];
    }
};

export const searchBills = async (query, limit = 100, offset = 0) => {
    try {
        console.log(`Searching bills with query: "${query}"`);
        const response = await congressApi.get('/bill/118', {
            params: {
                //q: query,
                limit: limit,
                offset,
                format: 'json'
            }
        });

        console.log('API Response Status:', response.status);
        console.log('API Response data type:', typeof response.data);
        console.log('API response data keys:', Object.keys(response.data));

        console.log('Bills array:', JSON.stringify(response.data.bills));

        if (response?.data?.bills && Array.isArray(response.data.bills) && response.data.bills.length > 0) {
            console.log(`Found ${response.data.bills.length} bills matching query`)

            let bills = response.data.bills;

            if (query && query.trim() !== '') {
                const lowerQuery = query.toLowerCase();

                bills = bills.filter(bill =>
                (bill.title?.toLowerCase().includes(lowerQuery)) ||
                (bill.latestAction?.text?.toLowerCase().includes(lowerQuery)) ||
                (`${bill.type} ${bill.number}`.toLowerCase().includes(lowerQuery))
                );

                console.log(`Filtered to ${bills.length} bills matching "${query}"`);

            } 

            const mappedBills = bills.map(bill => {
                const rawIntroducedDate = bill.introducedDate || bill.introduced_date || bill.introduced || null;
                
                let formattedIntroducedDate = null;
                if (rawIntroducedDate) {
                    const date = new Date(rawIntroducedDate);
                    if (!isNaN(date.getTime()) && date.getFullYear() >= 1970) {
                        formattedIntroducedDate = date.toISOString().split('T')[0]; 
                    } else {
                        console.log(`Invalid date found for bill ${bill.number}: ${rawIntroducedDate}`);
                    }
                }
                
                const rawLastActionDate = bill.latestAction?.actionDate || null;
                let formattedLastActionDate = null;
                if (rawLastActionDate) {
                    const date = new Date(rawLastActionDate);
                    if (!isNaN(date.getTime()) && date.getFullYear() >= 1970) {
                        formattedLastActionDate = date.toISOString().split('T')[0];
                    }
                }

                return {
                    id: `${bill.type.toLowerCase()}${bill.number}-${bill.congress}`,
                    bill_number: `${bill.type} ${bill.number}`,
                    number: bill.number,
                    type: bill.type,
                    congress: bill.congress,
                    title: bill.title || 'No title available',
                    description: bill.latestAction?.text || 'No description available',
                    introduced_date: formattedIntroducedDate,
                    last_action_date: formattedLastActionDate,
                    last_action_text: bill.latestAction?.text || '',
                    chamber: bill.originChamber?.toLowerCase() || '',
                    sponsor: bill.sponsors ? bill.sponsors[0]?.fullName || '' : '',
                    status: bill.latestAction?.text ? 'Active' : 'Unknown',
                    source: 'federal',
                    state: null,
                    url: bill.url || '',
                    simple_summary: ''
                };
            });

            console.log('Mapped bills', mappedBills.length);
            if (mappedBills.length > 0) {
                console.log('Sample bill date format check:', {
                    bill_number: mappedBills[0].bill_number,
                    introduced_date: mappedBills[0].introduced_date
                });
            }
            return mappedBills;
        } else {
            console.log('No bills found in API response');
            return [];
        }
    } catch (error) {
        console.error('Error details:', error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        return [];
    }
};

export const getBillDetails = async (congressNum, billType, billNumber) => {
    try {
        console.log(`Getting details for bill ${congressNum}/${billType}/${billNumber}`);
        const response = await congressApi.get(`/bill/${congressNum}/${billType}/${billNumber}`, {
            params: {
                format: 'json'
            }
        });
        if (response?.data?.bill) {
            return response.data.bill;
        }

        console.log('API returned no bill details, using mock data now');
        return mockBill;
    } catch (error) {
        console.error('Error fetching bill details', error);
        return mockBill;
    }
};

export const getLegislators = async (limit = 20, offset = 0) => {
    try {
        const response = await congressApi.get('/member', {
            params: {
                limit,
                offset,
                format: 'json'
            }
        });
        return response.data.members;
    } catch (error) {
        console.error('Error fetching legislators:', error);
       throw error
    }
};