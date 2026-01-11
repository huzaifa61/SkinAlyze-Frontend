import { useState } from 'react';
import { Sparkles, Sun, Moon, ShoppingBag, Lightbulb, AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { recommendationService, UserProfile, WeeklyPlanRecommendation } from '../../services/recommendationService';

export default function RecommendationsPage() {
    const [showProfileForm, setShowProfileForm] = useState(true);
    const [recommendations, setRecommendations] = useState<WeeklyPlanRecommendation[]>([]);
    const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const [profile, setProfile] = useState<UserProfile>({
        skinType: 'COMBINATION',
        age: 28,
        skinCondition: 'Generally good with occasional breakouts',
        concerns: ['Acne', 'Oiliness'],
        currentProducts: ['Cleanser', 'Moisturizer', 'Sunscreen'],
        goals: ['Clear skin', 'Reduce oiliness'],
        budget: 'Moderate',
        climate: 'Humid',
    });

    const handleGeneratePlan = async () => {
        setIsGenerating(true);
        setError('');

        try {
            console.log('🤖 Generating AI-powered recommendations...');

            const plans = await recommendationService.generateWeeklyPlan(profile);

            console.log('✅ Received AI recommendations:', plans);
            setRecommendations(plans);
            setShowProfileForm(false);
            setExpandedWeek(1);

        } catch (error: any) {
            console.error('❌ Error generating recommendations:', error);
            setError(error.response?.data?.message || 'Failed to generate recommendations. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const toggleWeek = (weekNum: number) => {
        setExpandedWeek(expandedWeek === weekNum ? null : weekNum);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                        <Sparkles className="mr-3 h-8 w-8 text-purple-600" />
                        AI Skincare Recommendations
                    </h1>
                    <p className="text-gray-600">Personalized weekly plans powered by AI (Groq LLaMA 3.1)</p>
                </div>
                {!showProfileForm && (
                    <button
                        onClick={() => setShowProfileForm(true)}
                        className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                        Update Profile
                    </button>
                )}
            </div>

            {/* Profile Form */}
            {showProfileForm && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Skin Profile</h2>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                            ❌ {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Skin Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Skin Type *
                            </label>
                            <select
                                value={profile.skinType}
                                onChange={(e) => setProfile({ ...profile, skinType: e.target.value as any })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="OILY">Oily</option>
                                <option value="DRY">Dry</option>
                                <option value="COMBINATION">Combination</option>
                                <option value="SENSITIVE">Sensitive</option>
                                <option value="NORMAL">Normal</option>
                            </select>
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Age *
                            </label>
                            <input
                                type="number"
                                value={profile.age}
                                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                                min="13"
                                max="100"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        {/* Current Condition */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Skin Condition
                            </label>
                            <textarea
                                value={profile.skinCondition}
                                onChange={(e) => setProfile({ ...profile, skinCondition: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                placeholder="e.g., Generally clear with occasional breakouts on forehead"
                            />
                        </div>

                        {/* Main Concerns */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Main Concerns (comma separated)
                            </label>
                            <input
                                type="text"
                                value={profile.concerns.join(', ')}
                                onChange={(e) => setProfile({ ...profile, concerns: e.target.value.split(',').map(c => c.trim()) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                placeholder="e.g., Acne, Dark spots, Fine lines, Oiliness"
                            />
                        </div>

                        {/* Goals */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Goals
                            </label>
                            <input
                                type="text"
                                value={profile.goals.join(', ')}
                                onChange={(e) => setProfile({ ...profile, goals: e.target.value.split(',').map(g => g.trim()) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                placeholder="e.g., Clear skin, Reduce wrinkles, Even skin tone"
                            />
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Budget
                            </label>
                            <select
                                value={profile.budget}
                                onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="Budget">Budget-friendly ($)</option>
                                <option value="Moderate">Moderate ($$)</option>
                                <option value="Premium">Premium ($$$)</option>
                            </select>
                        </div>

                        {/* Climate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Climate
                            </label>
                            <select
                                value={profile.climate}
                                onChange={(e) => setProfile({ ...profile, climate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="Humid">Humid</option>
                                <option value="Dry">Dry</option>
                                <option value="Cold">Cold</option>
                                <option value="Temperate">Temperate</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleGeneratePlan}
                            disabled={isGenerating}
                            className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    AI is thinking...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Generate AI-Powered Plan
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {isGenerating && (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Loader2 className="animate-spin h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900">🤖 AI is analyzing your skin profile...</p>
                    <p className="text-sm text-gray-600 mt-2">Creating personalized recommendations using Groq LLaMA 3.1</p>
                </div>
            )}

            {/* Recommendations */}
            {!showProfileForm && recommendations.length > 0 && (
                <div className="space-y-6">
                    {/* AI Badge */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
                        <div className="flex items-center mb-3">
                            <Sparkles className="h-6 w-6 mr-2" />
                            <h3 className="text-xl font-semibold">AI-Powered Personalized Plan</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-purple-100">Skin Type</p>
                                <p className="font-semibold text-lg">{profile.skinType}</p>
                            </div>
                            <div>
                                <p className="text-purple-100">Age</p>
                                <p className="font-semibold text-lg">{profile.age} years</p>
                            </div>
                            <div>
                                <p className="text-purple-100">Main Concerns</p>
                                <p className="font-semibold text-lg">{profile.concerns.length}</p>
                            </div>
                            <div>
                                <p className="text-purple-100">Budget</p>
                                <p className="font-semibold text-lg">{profile.budget}</p>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Plans */}
                    {recommendations.map((week) => (
                        <div key={week.weekNumber} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Week Header */}
                            <button
                                onClick={() => toggleWeek(week.weekNumber)}
                                className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                                        {week.weekNumber}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-gray-900">Week {week.weekNumber}</h3>
                                        <p className="text-sm text-gray-600">{week.focus}</p>
                                    </div>
                                </div>
                                {expandedWeek === week.weekNumber ? (
                                    <ChevronUp className="h-6 w-6 text-gray-600" />
                                ) : (
                                    <ChevronDown className="h-6 w-6 text-gray-600" />
                                )}
                            </button>

                            {/* Week Content */}
                            {expandedWeek === week.weekNumber && (
                                <div className="p-6 space-y-6">
                                    {/* Routines */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Morning Routine */}
                                        <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                                            <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                                                <Sun className="mr-2 h-5 w-5 text-yellow-600" />
                                                Morning Routine
                                            </h4>
                                            <div className="space-y-3">
                                                {week.morningRoutine.map((step) => (
                                                    <div key={step.step} className="flex items-start">
                                                        <div className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-1">
                                                            {step.step}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{step.product}</p>
                                                            <p className="text-sm text-gray-600">{step.instructions}</p>
                                                            {step.duration && (
                                                                <p className="text-xs text-gray-500 mt-1">⏱️ {step.duration}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Evening Routine */}
                                        <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
                                            <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                                                <Moon className="mr-2 h-5 w-5 text-indigo-600" />
                                                Evening Routine
                                            </h4>
                                            <div className="space-y-3">
                                                {week.eveningRoutine.map((step) => (
                                                    <div key={step.step} className="flex items-start">
                                                        <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-1">
                                                            {step.step}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{step.product}</p>
                                                            <p className="text-sm text-gray-600">{step.instructions}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Recommendations */}
                                    {week.productRecommendations && week.productRecommendations.length > 0 && (
                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                            <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                                                <ShoppingBag className="mr-2 h-5 w-5 text-purple-600" />
                                                Product Recommendations
                                            </h4>
                                            <div className="space-y-3">
                                                {week.productRecommendations.map((product, idx) => (
                                                    <div key={idx} className="bg-white rounded-lg p-4">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <p className="font-semibold text-gray-900">{product.name}</p>
                                                                <p className="text-xs text-purple-600 font-medium">{product.type}</p>
                                                            </div>
                                                            {product.price && (
                                                                <span className="text-sm font-medium text-gray-700">{product.price}</span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-700 mb-2">{product.why}</p>
                                                        {product.alternatives && product.alternatives.length > 0 && (
                                                            <p className="text-xs text-gray-500">
                                                                <strong>Alternatives:</strong> {product.alternatives.join(', ')}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tips */}
                                    {week.tips && week.tips.length > 0 && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                                                <Lightbulb className="mr-2 h-5 w-5 text-blue-600" />
                                                Pro Tips for This Week
                                            </h4>
                                            <ul className="space-y-2">
                                                {week.tips.map((tip, idx) => (
                                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                                        <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
                                                        {tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Warnings */}
                                    {week.warnings && week.warnings.length > 0 && (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                            <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                                                <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
                                                Important Notes
                                            </h4>
                                            <ul className="space-y-2">
                                                {week.warnings.map((warning, idx) => (
                                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                                        <span className="text-orange-600 mr-2 flex-shrink-0">⚠️</span>
                                                        {warning}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Expected Results */}
                                    {week.expectedResults && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-2">
                                                <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                                                Expected Results
                                            </h4>
                                            <p className="text-sm text-gray-700">{week.expectedResults}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* AI Disclaimer */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs text-gray-600 text-center">
                            <strong>AI-Powered by Groq LLaMA 3.1:</strong> These recommendations are AI-generated based on your profile.
                            Always patch test new products and consult a dermatologist for persistent skin concerns.
                            Individual results may vary.
                        </p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!showProfileForm && recommendations.length === 0 && !isGenerating && (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Your AI-Powered Plan</h3>
                    <p className="text-gray-600 mb-6">Fill out your skin profile to receive personalized weekly recommendations</p>
                    <button
                        onClick={() => setShowProfileForm(true)}
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-lg"
                    >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Start Now
                    </button>
                </div>
            )}
        </div>
    );
}
