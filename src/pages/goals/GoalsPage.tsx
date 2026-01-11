import { useState } from 'react';
import { Target, Plus, TrendingUp, CheckCircle2, X, Calendar } from 'lucide-react';
import { useGoalStore } from '../../context/goalStore';

export default function GoalsPage() {
    const { goals, addGoal, deleteGoal, updateProgress } = useGoalStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        goalType: 'CUSTOM' as any,
        targetValue: 30,
        unit: 'days',
        endDate: '',
    });

    const goalTemplates = [
        { type: 'SUNSCREEN_CONSISTENCY', title: 'Daily Sunscreen', icon: '☀️', color: 'yellow' },
        { type: 'REDUCE_BREAKOUTS', title: 'Clear Skin Streak', icon: '✨', color: 'green' },
        { type: 'WATER_INTAKE', title: 'Hydration Goal', icon: '💧', color: 'blue' },
        { type: 'SLEEP_HOURS', title: 'Better Sleep', icon: '🌙', color: 'indigo' },
        { type: 'CUSTOM', title: 'Custom Goal', icon: '🎯', color: 'purple' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newGoal = {
            title: formData.title,
            goalType: formData.goalType,
            targetValue: formData.targetValue,
            currentValue: 0,
            unit: formData.unit,
            startDate: new Date().toISOString().split('T')[0],
            endDate: formData.endDate || undefined,
            status: 'ACTIVE' as any,
            streak: 0,
        };

        addGoal(newGoal);
        setIsModalOpen(false);
        setFormData({
            title: '',
            goalType: 'CUSTOM',
            targetValue: 30,
            unit: 'days',
            endDate: '',
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            deleteGoal(id);
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 100) return 'bg-green-500';
        if (progress >= 75) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        return 'bg-gray-400';
    };

    const getProgressPercentage = (goal: any) => {
        return Math.round((goal.currentValue / goal.targetValue) * 100);
    };

    const activeGoals = goals.filter(g => g.status === 'ACTIVE');
    const completedGoals = goals.filter(g => g.status === 'COMPLETED');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Goals</h1>
                    <p className="text-gray-600">Track your skincare goals and celebrate progress</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    New Goal
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <Target className="h-8 w-8 text-primary-600 mb-3" />
                    <p className="text-gray-600 text-sm">Active Goals</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{activeGoals.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                    <p className="text-gray-600 text-sm">Completed</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">{completedGoals.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
                    <p className="text-gray-600 text-sm">Avg. Progress</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">
                        {activeGoals.length > 0
                            ? Math.round(activeGoals.reduce((acc, g) => acc + getProgressPercentage(g), 0) / activeGoals.length)
                            : 0}%
                    </p>
                </div>
            </div>

            {/* Active Goals */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Goals</h2>
                {activeGoals.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No active goals</h3>
                        <p className="text-gray-600 mb-4">Set your first goal to start tracking progress</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Create Goal
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeGoals.map((goal) => {
                            const progress = getProgressPercentage(goal);
                            return (
                                <div key={goal.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Started {new Date(goal.startDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(goal.id)}
                                            className="text-gray-400 hover:text-red-600"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">Progress</span>
                                            <span className="text-sm font-semibold text-gray-900">{progress}%</span>
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </span>
                                            {goal.endDate && (
                                                <span className="text-xs text-gray-600 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due {new Date(goal.endDate).toLocaleDateString()}
                        </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Streak */}
                                    {goal.streak > 0 && (
                                        <div className="bg-orange-50 rounded-lg p-3 mb-4">
                                            <p className="text-sm font-medium text-orange-900">
                                                🔥 {goal.streak} day streak!
                                            </p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => updateProgress(goal.id, 1)}
                                            disabled={goal.currentValue >= goal.targetValue}
                                            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            +1 Progress
                                        </button>
                                        <button
                                            onClick={() => updateProgress(goal.id, -1)}
                                            disabled={goal.currentValue <= 0}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            -1
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Completed Goals */}
            {completedGoals.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Goals 🎉</h2>
                    <div className="space-y-3">
                        {completedGoals.map((goal) => (
                            <div key={goal.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <CheckCircle2 className="h-6 w-6 text-green-600 mr-3" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                Completed {goal.targetValue} {goal.unit}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(goal.id)}
                                        className="text-gray-400 hover:text-red-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setIsModalOpen(false)} />

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-6 pt-6 pb-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Create New Goal</h3>
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>

                                    {/* Goal Templates */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Choose a template
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {goalTemplates.map((template) => (
                                                <button
                                                    key={template.type}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            goalType: template.type,
                                                            title: template.title
                                                        });
                                                    }}
                                                    className={`p-3 border-2 rounded-lg text-center transition-all hover:scale-105 ${
                                                        formData.goalType === template.type
                                                            ? 'border-primary-500 bg-primary-50'
                                                            : 'border-gray-200 bg-white'
                                                    }`}
                                                >
                                                    <div className="text-2xl mb-1">{template.icon}</div>
                                                    <div className="text-xs font-medium text-gray-700">{template.title}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Goal Title *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="e.g., Daily Sunscreen Application"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Target Value *
                                                </label>
                                                <input
                                                    type="number"
                                                    required
                                                    min="1"
                                                    value={formData.targetValue}
                                                    onChange={(e) => setFormData({ ...formData, targetValue: Number(e.target.value) })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Unit
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.unit}
                                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                    placeholder="e.g., days"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                End Date (optional)
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.endDate}
                                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    >
                                        Create Goal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
