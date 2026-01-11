import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Package, TrendingUp, Target, Sparkles, LogOut } from 'lucide-react';
import { useAuthStore } from '../context/authStore';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Daily Log', href: '/daily-log', icon: Calendar },
        { name: 'Products', href: '/products', icon: Package },
        { name: 'Analytics', href: '/analytics', icon: TrendingUp },
        { name: 'Goals', href: '/goals', icon: Target },
        { name: 'AI Recommendations', href: '/recommendations', icon: Sparkles },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center px-6 border-b">
                        <h1 className="text-2xl font-bold text-primary-600">SkinAlyze</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        isActive
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User section */}
                    <div className="border-t p-4">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">{user?.name || user?.email}</p>
                                <p className="text-xs text-gray-500">Account</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="pl-64">
                <main className="py-6 px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
