import { TrendingUp, TrendingDown, Minus, Droplet, Moon, Apple, Brain, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

export default function AnalyticsPage() {
    // Mock skin score trend data
    const skinTrendData = [
        { date: 'Jan 1', score: 70 },
        { date: 'Jan 8', score: 75 },
        { date: 'Jan 15', score: 78 },
        { date: 'Jan 22', score: 82 },
        { date: 'Jan 29', score: 85 },
        { date: 'Feb 5', score: 88 },
    ];

    // Mock correlation data
    const correlations = [
        {
            factor: 'Sleep Hours',
            icon: Moon,
            strength: 0.78,
            trend: 'positive',
            description: 'Strong positive correlation: More sleep (8+ hours) linked to better skin days',
            confidence: 'HIGH',
            sampleSize: 45,
        },
        {
            factor: 'Water Intake',
            icon: Droplet,
            strength: 0.65,
            trend: 'positive',
            description: 'Moderate positive correlation: Higher water intake associated with clearer skin',
            confidence: 'MEDIUM',
            sampleSize: 45,
        },
        {
            factor: 'Stress Level',
            icon: Brain,
            strength: -0.72,
            trend: 'negative',
            description: 'Strong negative correlation: High stress days linked to increased breakouts',
            confidence: 'HIGH',
            sampleSize: 45,
        },
        {
            factor: 'Diet Quality',
            icon: Apple,
            strength: 0.58,
            trend: 'positive',
            description: 'Moderate positive correlation: Better diet quality linked to improved skin condition',
            confidence: 'MEDIUM',
            sampleSize: 45,
        },
    ];

    // Mock scatter plot data (Sleep vs Skin Score)
    const scatterData = [
        { sleep: 5, score: 65, size: 20 },
        { sleep: 6, score: 70, size: 20 },
        { sleep: 6.5, score: 72, size: 20 },
        { sleep: 7, score: 75, size: 20 },
        { sleep: 7.5, score: 80, size: 20 },
        { sleep: 8, score: 85, size: 20 },
        { sleep: 8.5, score: 88, size: 20 },
        { sleep: 9, score: 90, size: 20 },
    ];

    // Mock routine consistency data
    const routineConsistency = {
        overall: 82,
        cleanser: 95,
        moisturizer: 90,
        sunscreen: 65,
    };

    // Mock product impact
    const productImpact = [
        {
            name: 'Niacinamide Serum',
            impact: 'positive',
            change: '+12 points',
            description: 'Skin score improved significantly after starting',
            daysUsed: 30,
        },
        {
            name: 'New Vitamin C Serum',
            impact: 'negative',
            change: '-5 points',
            description: 'Increased sensitivity detected',
            daysUsed: 7,
        },
    ];

    const getCorrelationColor = (strength: number) => {
        const abs = Math.abs(strength);
        if (abs >= 0.7) return 'text-green-600';
        if (abs >= 0.5) return 'text-yellow-600';
        return 'text-gray-600';
    };

    const getCorrelationBg = (strength: number) => {
        const abs = Math.abs(strength);
        if (abs >= 0.7) return 'bg-green-50';
        if (abs >= 0.5) return 'bg-yellow-50';
        return 'bg-gray-50';
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'positive') return <TrendingUp className="h-5 w-5 text-green-600" />;
        if (trend === 'negative') return <TrendingDown className="h-5 w-5 text-red-600" />;
        return <Minus className="h-5 w-5 text-gray-600" />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
                <p className="text-gray-600">Discover patterns and correlations in your skincare journey</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Average Skin Score</h3>
                    <p className="text-4xl font-bold text-primary-600 mb-1">82/100</p>
                    <p className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +8 from last month
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Routine Consistency</h3>
                    <p className="text-4xl font-bold text-primary-600 mb-1">{routineConsistency.overall}%</p>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                        <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-primary-600 rounded-full"
                                    style={{ width: `${routineConsistency.overall}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Data Points</h3>
                    <p className="text-4xl font-bold text-primary-600 mb-1">45</p>
                    <p className="text-sm text-gray-600">Days tracked this month</p>
                </div>
            </div>

            {/* Skin Score Trend */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skin Score Trend (Last 6 Weeks)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={skinTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" domain={[0, 100]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Correlations */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Correlations</h3>
                <p className="text-sm text-gray-600 mb-6">
                    How different factors affect your skin condition
                </p>
                <div className="space-y-4">
                    {correlations.map((correlation) => {
                        const Icon = correlation.icon;
                        return (
                            <div
                                key={correlation.factor}
                                className={`p-4 rounded-lg border-2 ${getCorrelationBg(correlation.strength)} border-gray-200`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center">
                                        <Icon className="h-6 w-6 text-primary-600 mr-3" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{correlation.factor}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{correlation.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {getTrendIcon(correlation.trend)}
                                        <span className={`text-2xl font-bold ${getCorrelationColor(correlation.strength)}`}>
                      {Math.abs(correlation.strength).toFixed(2)}
                    </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <span className={`text-xs px-2 py-1 rounded ${
                      correlation.confidence === 'HIGH'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {correlation.confidence} CONFIDENCE
                  </span>
                                    <span className="text-xs text-gray-500">
                    Based on {correlation.sampleSize} data points
                  </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sleep vs Skin Score Scatter */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sleep Hours vs Skin Score</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="sleep"
                            name="Sleep Hours"
                            stroke="#6b7280"
                            label={{ value: 'Sleep Hours', position: 'bottom', offset: 0 }}
                        />
                        <YAxis
                            dataKey="score"
                            name="Skin Score"
                            stroke="#6b7280"
                            domain={[0, 100]}
                            label={{ value: 'Skin Score', angle: -90, position: 'insideLeft' }}
                        />
                        <ZAxis range={[100, 400]} />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        />
                        <Scatter data={scatterData} fill="#0ea5e9" />
                    </ScatterChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Clear positive trend: More sleep correlates with better skin scores
                </p>
            </div>

            {/* Product Impact */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Impact Analysis</h3>
                <div className="space-y-4">
                    {productImpact.map((product) => (
                        <div
                            key={product.name}
                            className={`p-4 rounded-lg border-l-4 ${
                                product.impact === 'positive'
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 flex items-center">
                                        {product.name}
                                        {product.impact === 'negative' && (
                                            <AlertCircle className="ml-2 h-5 w-5 text-red-600" />
                                        )}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                    <p className="text-xs text-gray-500 mt-2">Used for {product.daysUsed} days</p>
                                </div>
                                <div className="text-right">
                  <span className={`text-lg font-bold ${
                      product.impact === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.change}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Routine Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Routine Consistency Breakdown</h3>
                <div className="space-y-4">
                    {Object.entries(routineConsistency).filter(([key]) => key !== 'overall').map(([key, value]) => (
                        <div key={key}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                                <span className="text-sm font-semibold text-gray-900">{value}%</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${
                                        value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insights Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Understanding Correlations</h4>
                        <p className="text-sm text-blue-800">
                            Correlation values range from -1 to +1. Values above 0.7 indicate strong relationships.
                            These insights require at least 30 days of consistent tracking for accuracy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
