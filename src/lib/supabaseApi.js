import supabase from './supabase';

export const saveBillToDb = async (billData) => {
    try {
        console.log('Bill data to save:', billData ?
            `ID: ${billData.id}, Title: ${billData.title?.substring(0, 20)}...` :
            'no data');


        if (!billData || !billData.id) {
            console.log('Skipping bill save due to missing required data (id)');
            return null;
        }

        if (!billData.title) {
            console.log('Skipping bill save due to missing required data (title)')
            return null;
        }
        
        const mappedData = {
                id: billData.id,
                title: billData.title,
                description: billData.description || '',
                introduced_date: billData.introduced_date || null,
                last_action_date: billData.last_action_date || null,
                last_action_text: billData.last_action_text || '',
                bill_number: billData.bill_number || '',
                bill_type: billData.type || '',
                congress: billData.congress || '',
                chamber: billData.chamber || '',
                sponsor: billData.sponsor || '',
                status: billData.status || '',
                source: billData.source || 'federal',
                state: billData.state || null,
                simple_summary: billData.simple_summary || '',
                url: billData.url || ''
            };

            console.log('Attempting to save bill to database...');

            const { data, error } = await supabase
                .from('bills')
                .upsert(mappedData);

            if (error) {
                console.error('Error saving bill to database:', error);
                return null;
            }

            console.log('Successfully saved bill to database');
            return data;
    } catch (error) {
        console.error('Exception saving bill to database:', error);
        return null;
    }
};
        

export const getUserSavedBills = async (userId) => {
    const { data, error } = await supabase
        .from('saved_bills')
        .select(`
            id,
            created_at,
            bills (*)
        `)
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching user saved bills:', error);
        throw error;
    }
    return data;


};

export const saveBillForUser = async (userId, billId) => {
    const { data, error } = await supabase
        .from('saved_bills')
        .insert({
            user_id: userId,
            bill_id: billId
        });

    if (error) {
        console.error('Error saving bill for user:', error);
        throw error;
    }
    return data;
};

export const removeSavedBill = async (userId, billId) => {
    const { data, error } = await supabase
        .from('saved_bills')
        .delete()
        .match({ user_id: userId, bill_id: billId});

    if (error) {
        console.error('Error removing saved bill:', error);
        throw error;
    }
    return data;
};

export const getUserProfie = async (userId) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
    return data;
};

export const updateUserProfile = async (userId, profile) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .update(profile)
        .eq('id', userId);

    if (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
    return data;
};

export const saveSearchQuery = async (userId, query) => {
    const { data, error } = await supabase
        .from('search_history')
        .insert({
            user_id: userId,
            query
        });

    if (error) {
        console.error('Error saving search query:', error);
        throw error;
    }
    return data;
};

export const getUserSearchHistory = async (userId, limit = 10) => {
    const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching user search history:', error);
        throw error;
    }
    return data;
};

export const saveLegislatorToDb = async (legislatorData) => {
    const { data, error } = await supabase
        .from('legislators')
        .upsert({
            id: legislatorData.id,
            first_name: legislatorData.first_name,
            last_name: legislatorData.last_name,
            full_name: legislatorData.full_name,
            state: legislatorData.state,
            chamber: legislatorData.chamber,
            party: legislatorData.party,
            photo_url: legislatorData.photo_url || '',
            website_url: legislatorData.website_url || '',
            source: legislatorData.source
        });

    if (error) {
        console.error('Error saving legislator to database:', error);
        throw error;
    }
    return data;
}

