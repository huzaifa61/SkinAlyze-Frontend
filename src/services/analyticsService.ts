import apiClient from './apiClient';

export interface WeeklySummary {
  weekStartDate: string;
  avgSkinScore: number;
  routineConsistency: number;
  insights: Record<string, any>;
}

export interface Correlation {
  id: number;
  userId: number;
  factorType: string;
  correlationStrength: number;
  confidence: string;
  sampleSize: number;
  lastUpdated: string;
}

export interface InsightData {
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning';
}

export const analyticsService = {
  getWeeklySummary: async (): Promise<WeeklySummary> => {
    const response = await apiClient.get('/analytics/weekly-summary');
    return response.data;
  },

  getInsights: async (): Promise<InsightData[]> => {
    const response = await apiClient.get('/analytics/insights');
    return response.data;
  },

  getCorrelations: async (): Promise<Correlation[]> => {
    const response = await apiClient.get('/analytics/correlations');
    return response.data;
  },

  getSkinScoreTrend: async (from?: string, to?: string): Promise<any[]> => {
    const response = await apiClient.get('/analytics/skin-score-trend', {
      params: { from, to },
    });
    return response.data;
  },
};
