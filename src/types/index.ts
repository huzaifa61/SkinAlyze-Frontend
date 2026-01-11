// User Types
export interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}

export interface UserProfile {
  id: number;
  userId: number;
  name?: string;
  ageRange?: string;
  skinType?: string;
  createdAt: string;
  updatedAt: string;
}

// Onboarding Types
export interface SkinConcern {
  id: number;
  userId: number;
  concernType: string;
  severity?: string;
  notedAt: string;
}

export interface BaselineRoutine {
  id: number;
  userId: number;
  productType: string;
  productName?: string;
  startedAt: string;
}

// Product Types
export interface Product {
  id: number;
  userId: number;
  name: string;
  category: string;
  brand?: string;
  keyIngredients?: string;
  startedDate?: string;
  frequency?: string;
  notes?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Daily Log Types
export type SkinCondition = 'CLEAR' | 'OKAY' | 'BREAKOUT' | 'SENSITIVE';
export type DietQuality = 'EXCELLENT' | 'GOOD' | 'OKAY' | 'POOR';
export type StressLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface DailyLog {
  id: number;
  userId: number;
  logDate: string;
  skinCondition: SkinCondition;
  waterIntake?: number;
  sleepHours?: number;
  dietQuality?: DietQuality;
  stressLevel?: StressLevel;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoutineLog {
  id: number;
  dailyLogId: number;
  productId: number;
  applied: boolean;
  skipped: boolean;
  loggedAt: string;
}

// Goal Types
export type GoalType = 'SUNSCREEN_CONSISTENCY' | 'REDUCE_BREAKOUTS' | 'WATER_INTAKE' | 'SLEEP_HOURS' | 'CUSTOM';
export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

export interface Goal {
  id: number;
  userId: number;
  goalType: GoalType;
  targetValue?: number;
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

// Analytics Types
export interface WeeklyInsight {
  id: number;
  userId: number;
  weekStartDate: string;
  avgSkinScore: number;
  routineConsistency: number;
  insights: Record<string, any>;
  computedAt: string;
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

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

// Form Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface DailyLogRequest {
  logDate: string;
  skinCondition: SkinCondition;
  waterIntake?: number;
  sleepHours?: number;
  dietQuality?: DietQuality;
  stressLevel?: StressLevel;
  notes?: string;
  routineApplied?: {
    [productId: number]: boolean;
  };
  actives?: string[];
}
