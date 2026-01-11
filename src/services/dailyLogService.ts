import apiClient from './apiClient';

export interface DailyLogRequest {
    logDate: string;
    skinCondition: string;
    waterIntake?: number;
    sleepHours?: number;
    dietQuality?: string;
    stressLevel?: string;
    notes?: string;
    routine?: {
        cleanser: boolean;
        moisturizer: boolean;
        sunscreen: boolean;
    };
}

export interface DailyLogResponse {
    id: number;
    userId: number;
    logDate: string;
    skinCondition: string;
    waterIntake?: number;
    sleepHours?: number;
    dietQuality?: string;
    stressLevel?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export const dailyLogService = {
    create: async (logData: DailyLogRequest): Promise<DailyLogResponse> => {
        console.log('dailyLogService.create called with:', logData);
        const response = await apiClient.post('/daily-log', logData);
        console.log('dailyLogService.create response:', response);
        return response.data;
    },

    getByDate: async (date: string): Promise<DailyLogResponse> => {
        const response = await apiClient.get(`/daily-log/${date}`);
        return response.data;
    },

    getHistory: async (from?: string, to?: string): Promise<DailyLogResponse[]> => {
        const response = await apiClient.get('/daily-log/history', {
            params: { from, to },
        });
        return response.data;
    },

    update: async (id: number, logData: DailyLogRequest): Promise<DailyLogResponse> => {
        const response = await apiClient.put(`/daily-log/${id}`, logData);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/daily-log/${id}`);
    },
};
