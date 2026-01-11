import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './context/authStore';

// Layout
import Layout from './components/Layout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import DailyLogPage from './pages/dailylog/DailyLogPage';
import ProductsPage from './pages/products/ProductsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import GoalsPage from './pages/goals/GoalsPage';
import RecommendationsPage from './pages/recommendations/RecommendationsPage';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="onboarding" element={<OnboardingPage />} />
                <Route path="daily-log" element={<DailyLogPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="goals" element={<GoalsPage />} />
                <Route path="recommendations" element={<RecommendationsPage />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
