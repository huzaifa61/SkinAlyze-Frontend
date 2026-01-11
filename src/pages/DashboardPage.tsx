import { TrendingUp, Calendar, Package, Target, Droplet, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DashboardPage() {
    // Mock data for demonstration
    const stats = [
        {
            name: 'Current Streak',
            value: '12 days',
            icon: Calendar,
            color: 'bg-blue-500',
            change: '+3 from last week',
        },
        {
            name: 'Skin Score',
            value: '85/100',
            icon: TrendingUp,
            color: 'bg-green-500',
            change: '+5 points',
        },
        {
            name: 'Active Products',
            value: '8',
            icon: Package,
            color: 'bg-purple-500',
            change: '2 new this month',
        },
        {
            name: 'Goals Progress',
            value: '75%',
            icon: Target,
            color: 'bg-orange-500',
            change: '3/4 completed',
        },
    ];

    // Mock weekly skin score data
    const skinScoreData = [
        { day: 'Mon', score: 75 },
        { day: 'Tue', score: 80 },
        { day: 'Wed', score: 78 },
        { day: 'Thu', score: 85 },
        { day: 'Fri', score: 88 },
        { day: 'Sat', score: 85 },
        { day: 'Sun', score: 90 },
    ];

    // Mock lifestyle data
    const lifestyleData = [
        { day: 'Mon', water: 6, sleep: 7 },
        { day: 'Tue', water: 8, sleep: 8 },
        { day: 'Wed', water: 7, sleep: 6 },
        { day: 'Thu', water: 9, sleep: 7.5 },
        { day: 'Fri', water: 8, sleep: 8 },
        { day: 'Sat', water: 10, sleep: 9 },
        { day: 'Sun', water: 8, sleep: 8 },
    ];

    const recentInsights = [
        {
            title: 'Great progress!',
            description: 'Your skin score improved by 15% this week',
            type: 'success',
        },
        {
            title: 'Sleep correlation',
            description: 'Better sleep (8+ hours) linked to clearer skin days',
            type: 'info',
        },
        {
            title: 'Hydration reminder',
            description: 'Water intake below target for 3 days',
            type: 'warning',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your skincare overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Skin Score Trend */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Skin Score</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={skinScoreData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="day" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#0ea5e9"
                                strokeWidth={3}
                                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Lifestyle Factors */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Factors</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={lifestyleData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="day" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            />
                            <Bar dataKey="water" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="sleep" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-6 mt-4">
                        <div className="flex items-center">
                            <Droplet className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-sm text-gray-600">Water (glasses)</span>
                        </div>
                        <div className="flex items-center">
                            <Moon className="h-4 w-4 text-purple-500 mr-2" />
                            <span className="text-sm text-gray-600">Sleep (hours)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Insights */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Insights</h3>
                <div className="space-y-3">
                    {recentInsights.map((insight, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border-l-4 ${
                                insight.type === 'success'
                                    ? 'bg-green-50 border-green-500'
                                    : insight.type === 'warning'
                                        ? 'bg-yellow-50 border-yellow-500'
                                        : 'bg-blue-50 border-blue-500'
                            }`}
                        >
                            <p className="font-medium text-gray-900">{insight.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Ready to log today?</h3>
                <p className="text-primary-100 mb-4">Track your skin condition and lifestyle factors</p>
                <button
                    onClick={() => window.location.href = '/daily-log'}
                    className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                    Create Daily Log
                </button>
            </div>
        </div>
    );
}
