import apiClient from './apiClient';

export type GoalType = 'SUNSCREEN_CONSISTENCY' | 'REDUCE_BREAKOUTS' | 'WATER_INTAKE' | 'SLEEP_HOURS' | 'CUSTOM';
export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

export interface GoalRequest {
  goalType: GoalType;
  targetValue: number;
  startDate: string;
  endDate?: string;
}

export interface Goal {
  id: number;
  userId: number;
  goalType: GoalType;
  targetValue: number;
  currentValue: number;
  startDate: string;
  endDate?: string;
  status: GoalStatus;
  createdAt: string;
}

export interface GoalProgress {
  id: number;
  goalId: number;
  progressDate: string;
  progressValue: number;
  notes?: string;
}

export const goalService = {
  getAll: async (): Promise<Goal[]> => {
    const response = await apiClient.get('/goals');
    return response.data;
  },

  getById: async (id: number): Promise<Goal> => {
    const response = await apiClient.get(`/goals/${id}`);
    return response.data;
  },

  create: async (goalData: GoalRequest): Promise<Goal> => {
    const response = await apiClient.post('/goals', goalData);
    return response.data;
  },

  update: async (id: number, goalData: Partial<GoalRequest>): Promise<Goal> => {
    const response = await apiClient.put(`/goals/${id}`, goalData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/goals/${id}`);
  },

  getProgress: async (id: number): Promise<GoalProgress[]> => {
    const response = await apiClient.get(`/goals/${id}/progress`);
    return response.data;
  },

  updateProgress: async (id: number, increment: number): Promise<Goal> => {
    const response = await apiClient.post(`/goals/${id}/progress`, { increment });
    return response.data;
  },
};
