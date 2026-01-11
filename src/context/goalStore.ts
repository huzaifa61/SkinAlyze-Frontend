import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type GoalType = 'SUNSCREEN_CONSISTENCY' | 'REDUCE_BREAKOUTS' | 'WATER_INTAKE' | 'SLEEP_HOURS' | 'CUSTOM';
type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

interface Goal {
    id: number;
    title: string;
    goalType: GoalType;
    targetValue: number;
    currentValue: number;
    unit: string;
    startDate: string;
    endDate?: string;
    status: GoalStatus;
    streak: number;
}

interface GoalState {
    goals: Goal[];
    addGoal: (goal: Omit<Goal, 'id'>) => void;
    updateGoal: (id: number, goal: Partial<Goal>) => void;
    deleteGoal: (id: number) => void;
    updateProgress: (id: number, increment: number) => void;
}

export const useGoalStore = create<GoalState>()(
    persist(
        (set) => ({
            goals: [
                {
                    id: 1,
                    title: 'Daily Sunscreen Application',
                    goalType: 'SUNSCREEN_CONSISTENCY',
                    targetValue: 30,
                    currentValue: 22,
                    unit: 'days',
                    startDate: '2024-01-01',
                    endDate: '2024-01-31',
                    status: 'ACTIVE',
                    streak: 7,
                },
                {
                    id: 2,
                    title: 'Reduce Breakouts',
                    goalType: 'REDUCE_BREAKOUTS',
                    targetValue: 5,
                    currentValue: 3,
                    unit: 'days',
                    startDate: '2024-01-01',
                    status: 'ACTIVE',
                    streak: 12,
                },
            ],
            addGoal: (goal) =>
                set((state) => ({
                    goals: [
                        ...state.goals,
                        { ...goal, id: Math.max(...state.goals.map((g) => g.id), 0) + 1 },
                    ],
                })),
            updateGoal: (id, updatedGoal) =>
                set((state) => ({
                    goals: state.goals.map((g) =>
                        g.id === id ? { ...g, ...updatedGoal } : g
                    ),
                })),
            deleteGoal: (id) =>
                set((state) => ({
                    goals: state.goals.filter((g) => g.id !== id),
                })),
            updateProgress: (id, increment) =>
                set((state) => ({
                    goals: state.goals.map((g) => {
                        if (g.id === id) {
                            const newValue = Math.max(0, Math.min(g.currentValue + increment, g.targetValue));
                            const newStreak = increment > 0 ? g.streak + 1 : Math.max(0, g.streak - 1);
                            const newStatus = newValue >= g.targetValue ? 'COMPLETED' : 'ACTIVE';
                            return { ...g, currentValue: newValue, streak: newStreak, status: newStatus };
                        }
                        return g;
                    }),
                })),
        }),
        {
            name: 'goals-storage',
        }
    )
);
