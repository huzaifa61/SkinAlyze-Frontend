import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Droplet, Moon, Apple, Brain, Save, CheckCircle } from 'lucide-react';
import { dailyLogService } from '../../services/dailyLogService';

type SkinCondition = 'CLEAR' | 'OKAY' | 'BREAKOUT' | 'SENSITIVE';
type DietQuality = 'EXCELLENT' | 'GOOD' | 'OKAY' | 'POOR';
type StressLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export default function DailyLogPage() {
    const [logDate, setLogDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [skinCondition, setSkinCondition] = useState<SkinCondition | ''>('');
    const [waterIntake, setWaterIntake] = useState(6);
    const [sleepHours, setSleepHours] = useState(7);
    const [dietQuality, setDietQuality] = useState<DietQuality>('GOOD');
    const [stressLevel, setStressLevel] = useState<StressLevel>('MEDIUM');
    const [notes, setNotes] = useState('');
    const [routine, setRoutine] = useState({
        cleanser: true,
        moisturizer: true,
        sunscreen: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const skinConditions: { value: SkinCondition; label: string; emoji: string; color: string }[] = [
        { value: 'CLEAR', label: 'Clear', emoji: '✨', color: 'bg-green-100 border-green-300 text-green-800' },
        { value: 'OKAY', label: 'Okay', emoji: '🙂', color: 'bg-blue-100 border-blue-300 text-blue-800' },
        { value: 'BREAKOUT', label: 'Breakout', emoji: '😣', color: 'bg-red-100 border-red-300 text-red-800' },
        { value: 'SENSITIVE', label: 'Sensitive', emoji: '😬', color: 'bg-orange-100 border-orange-300 text-orange-800' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!skinCondition) {
            alert('Please select your skin condition');
            return;
        }

        setIsSubmitting(true);
        setShowSuccess(false);
        setShowError(false);

        const logData = {
            logDate,
            skinCondition,
            waterIntake,
            sleepHours,
            dietQuality,
            stressLevel,
            notes,
            routine,
        };

        try {
            console.log('Sending daily log to API:', logData);
            const response = await dailyLogService.create(logData);
            console.log('API Response:', response);

            // Force state update
            setShowSuccess(true);
            setIsSubmitting(false);

            // Scroll to top to see message
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Reset form after delay
            setTimeout(() => {
                setShowSuccess(false);
                setSkinCondition('');
                setWaterIntake(6);
                setSleepHours(7);
                setDietQuality('GOOD');
                setStressLevel('MEDIUM');
                setNotes('');
                setRoutine({ cleanser: true, moisturizer: true, sunscreen: false });
                setLogDate(format(new Date(), 'yyyy-MM-dd'));
            }, 3000);

        } catch (error: any) {
            console.error('Error saving log:', error);
            console.error('Error details:', error.response);

            setIsSubmitting(false);
            setShowError(true);
            setErrorMessage(error.response?.data?.message || 'Failed to save log. Please try again.');

            setTimeout(() => {
                setShowError(false);
            }, 5000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Log</h1>
                <p className="text-gray-600">Track your skin condition and lifestyle factors (takes less than 1 minute)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Success Message */}
                {showSuccess && (
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center animate-fadeIn">
                        <CheckCircle className="h-6 w-6 mr-3" />
                        <span className="text-lg font-semibold">✅ Daily log saved successfully! 🎉</span>
                    </div>
                )}

                {/* Error Message */}
                {showError && (
                    <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fadeIn">
                        <span className="text-lg font-semibold">❌ {errorMessage}</span>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6">
                    <label className="flex items-center text-lg font-medium text-gray-900 mb-3">
                        <Calendar className="mr-2 h-5 w-5 text-primary-600" />
                        Date
                    </label>
                    <input
                        type="date"
                        value={logDate}
                        onChange={(e) => setLogDate(e.target.value)}
                        max={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <label className="text-lg font-medium text-gray-900 mb-4 block">
                        How's your skin today? *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {skinConditions.map((condition) => (
                            <button
                                key={condition.value}
                                type="button"
                                onClick={() => setSkinCondition(condition.value)}
                                className={`p-4 border-2 rounded-lg transition-all hover:scale-105 ${
                                    skinCondition === condition.value
                                        ? condition.color + ' border-current shadow-md'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <div className="text-3xl mb-2">{condition.emoji}</div>
                                <div className="font-medium">{condition.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Lifestyle Factors</h3>

                    <div>
                        <label className="flex items-center justify-between mb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                Water Intake
              </span>
                            <span className="text-primary-600 font-semibold">{waterIntake} glasses</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="15"
                            value={waterIntake}
                            onChange={(e) => setWaterIntake(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0</span>
                            <span>15+</span>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center justify-between mb-2">
              <span className="flex items-center text-gray-700 font-medium">
                <Moon className="mr-2 h-5 w-5 text-indigo-500" />
                Sleep Hours
              </span>
                            <span className="text-primary-600 font-semibold">{sleepHours} hours</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="12"
                            step="0.5"
                            value={sleepHours}
                            onChange={(e) => setSleepHours(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0</span>
                            <span>12</span>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center mb-2">
                            <Apple className="mr-2 h-5 w-5 text-green-500" />
                            <span className="text-gray-700 font-medium">Diet Quality</span>
                        </label>
                        <select
                            value={dietQuality}
                            onChange={(e) => setDietQuality(e.target.value as DietQuality)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="EXCELLENT">Excellent</option>
                            <option value="GOOD">Good</option>
                            <option value="OKAY">Okay</option>
                            <option value="POOR">Poor</option>
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center mb-2">
                            <Brain className="mr-2 h-5 w-5 text-purple-500" />
                            <span className="text-gray-700 font-medium">Stress Level</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {(['LOW', 'MEDIUM', 'HIGH'] as StressLevel[]).map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setStressLevel(level)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                        stressLevel === level
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Routine</h3>
                    <div className="space-y-3">
                        {Object.entries(routine).map(([key, checked]) => (
                            <label key={key} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => setRoutine({ ...routine, [key]: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="ml-3 text-gray-700 group-hover:text-gray-900 capitalize">
                  {key}
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <label className="text-lg font-medium text-gray-900 mb-3 block">
                        Notes (optional)
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special observations, new products, or changes today?"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => {
                            setSkinCondition('');
                            setWaterIntake(6);
                            setSleepHours(7);
                            setDietQuality('GOOD');
                            setStressLevel('MEDIUM');
                            setNotes('');
                            setRoutine({ cleanser: true, moisturizer: true, sunscreen: false });
                        }}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || !skinCondition}
                        className="flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <Save className="mr-2 h-5 w-5" />
                        {isSubmitting ? 'Saving...' : 'Save Log'}
                    </button>
                </div>
            </form>

            {/* Debug Info - Remove after testing */}
            {showSuccess && (
                <div className="fixed top-20 right-8 z-50 bg-green-500 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center animate-fadeIn">
                    <CheckCircle className="h-8 w-8 mr-3" />
                    <div>
                        <p className="text-xl font-bold">Success! 🎉</p>
                        <p className="text-sm">Daily log saved to database</p>
                    </div>
                </div>
            )}

            {showError && (
                <div className="fixed top-20 right-8 z-50 bg-red-500 text-white px-8 py-4 rounded-lg shadow-2xl animate-fadeIn">
                    <p className="text-xl font-bold">❌ Error</p>
                    <p className="text-sm">{errorMessage}</p>
                </div>
            )}
        </div>
    );
}
