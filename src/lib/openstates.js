import axios from "axios";
import { error } from "console";

const OPENSTATES_API_KEY = process.env.NEXT_PUBLIC_OPENSTATES_API_KEY;
const OPENSTATES_API_BASE_URL = 'https://v3.openstates.org/';

const openStatesApi = axios.create({
    baseURL: OPENSTATES_API_BASE_URL,
    headers: {
        'X-API-KEY': OPENSTATES_API_KEY
    }
});

export const fetchStateBills = async (state, limit = 20, offset = 0) => {
    try {
        const response = await openStatesApi.get('/bills', {
            params: {
                state,
                per_page: limit,
                page: Math.floor(offset / limit) + 1
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching ${state} bills:`, error);
        throw error;
    }
};

export const searchStateBills = async (state, query, limit = 20, offset = 0) => {
    try {
        const response = await openStatesApi.get('/bills', {
            params: {
                state,
                q: query,
                per_page: limit,
                page: Math.floor(offset / limit) + 1
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error searching ${state} bills:`, error);
    } throw error;
};

export const getStateBillDetails = async (state, billID) => {
    try {
        const response = await openStatesApi.get(`/bills/${billID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching state bill details:', error);
    } throw error;
};

export const getStateLegislators = async (state, limit = 20, offset = 0) => {
    try {
        const response = await openStatesApi.get('/people', {
            params: {
                state,
                per_page: limit,
                page: Math.floor(offset / limit) + 1
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching ${state} legislators:`, error);
    } throw error;
};