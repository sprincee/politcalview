import axios from "axios";
import { ErrorBoundaryHandler } from "next/dist/client/components/error-boundary";

const CONGRESS_API_KEY = process.env.NEXT_PUBLIC_CONGRESS_API_KEY;
const CONGRESS_API_BASE_URL = 'https://api.congress.gov/v3';

const congressApi = axios.create({
    baseURL: CONGRESS_API_BASE_URL,
    params: {
        api_key: CONGRESS_API_KEY
    }
});

export const fetchRecentBills = async (limit = 20, offset = 0) => {
    try {
        const response = await congressApi.get('/bill/188', {
            params: {
                limit,
                offset,
                format: 'json'
            }
        });
        return response.data.bills;
    } catch (error) {
        console.error('Error fetching recent bills:', error);
    } throw error
};

export const searchBills = async (query, limit = 20, offset = 0) => {
    try {
        const response = await congressApi.get('/bill/188', {
            params: {
                query,
                limit,
                offset,
                format: 'json'
            }
        });
        return response.data.bills;
    } catch (error) {
        console.error('Error searching bills:', error);
        throw error
    } 
};

export const getBillDetails = async (congressNum, billType, billNumber) => {
    try {
        const response = await congressApi.get(`/bill/${congress}/${billType}/${billNumber}`, {
            params: {
                format: 'json'
            }
        });
        return response.data.bill;
    } catch (error) {
        console.error('Error fetching bill details:', error);
    } throw error;
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
    } throw error
};