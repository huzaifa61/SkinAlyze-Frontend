import apiClient from './apiClient';

export interface UserProfile {
    skinType: 'OILY' | 'DRY' | 'COMBINATION' | 'SENSITIVE' | 'NORMAL';
    age: number;
    skinCondition: string;
    concerns: string[];
    currentProducts: string[];
    goals: string[];
    budget?: string;
    climate?: string;
}

export interface WeeklyPlanRecommendation {
    weekNumber: number;
    focus: string;
    morningRoutine: RoutineStep[];
    eveningRoutine: RoutineStep[];
    productRecommendations: ProductRecommendation[];
    tips: string[];
    warnings: string[];
    expectedResults: string;
}

export interface RoutineStep {
    step: number;
    product: string;
    instructions: string;
    duration?: string;
}

export interface ProductRecommendation {
    name: string;
    type: string;
    why: string;
    alternatives?: string[];
    price?: string;
}

export const recommendationService = {
    // Generate weekly plan using REAL AI (Groq with LLaMA)
    generateWeeklyPlan: async (userProfile: UserProfile): Promise<WeeklyPlanRecommendation[]> => {
        console.log('🤖 Calling REAL AI API (Groq/LLaMA) for personalized recommendations');
        console.log('User Profile:', userProfile);

        try {
            const response = await apiClient.post('/recommendations/generate-plan', userProfile);
            console.log('✅ AI API Response received:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('❌ Error calling AI API:', error);
            console.error('Error details:', error.response?.data);
            throw error;
        }
    },

    // Get AI-powered skincare advice
    getAIAdvice: async (userProfile: UserProfile, question: string): Promise<string> => {
        const response = await apiClient.post('/recommendations/ai-advice', {
            userProfile,
            question,
        });
        return response.data.advice;
    },
};
