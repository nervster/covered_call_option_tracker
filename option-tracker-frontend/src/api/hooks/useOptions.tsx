import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { optionsApi } from '../optionsApi';
import type { OptionData } from '../../features/types/OptionsData';
import { useAuth } from '@clerk/clerk-react';

export const useOptions = () => {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    // 1. Fetch History Query
    const historyQuery = useQuery({
        queryKey: ['options', 'history'],
        queryFn: async () => {
            const token = await getToken();
            if (!token) throw new Error("Not authenticated");
            const res = await optionsApi.fetchHistory(token);
            return res.data as OptionData[];
        }
    });

    // 2. Analyze Mutation (Use Mutation for POST/PUT/DELETE)
    const analyzeMutation = useMutation({

        mutationFn: async (newTrade: OptionData) => {
            const token = await getToken();
            if (!token) throw new Error("Not authenticated");
            return optionsApi.analyzeTrade(newTrade, token);
        },
        onSuccess: () => {
            // This "invalidates" the cache, forcing a refresh of the history automatically!
            queryClient.invalidateQueries({ queryKey: ['options', 'history'] });
        }
    });

    return { historyQuery, analyzeMutation };
};