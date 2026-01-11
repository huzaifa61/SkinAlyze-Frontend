import { SkinCondition } from '@/types';

interface SkinConditionPickerProps {
  value: SkinCondition | '';
  onChange: (value: SkinCondition) => void;
}

const conditions = [
  { value: 'CLEAR' as const, label: 'Clear', emoji: '✨', color: 'bg-green-100 border-green-300 hover:bg-green-200' },
  { value: 'OKAY' as const, label: 'Okay', emoji: '🙂', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200' },
  { value: 'BREAKOUT' as const, label: 'Breakout', emoji: '😣', color: 'bg-red-100 border-red-300 hover:bg-red-200' },
  { value: 'SENSITIVE' as const, label: 'Sensitive', emoji: '😰', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200' },
];

export default function SkinConditionPicker({ value, onChange }: SkinConditionPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        How's your skin today? <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {conditions.map((condition) => (
          <button
            key={condition.value}
            type="button"
            onClick={() => onChange(condition.value)}
            className={`
              p-4 rounded-lg border-2 transition-all
              ${value === condition.value 
                ? condition.color.replace('hover:', '') + ' ring-2 ring-primary-500' 
                : condition.color
              }
            `}
          >
            <div className="text-3xl mb-2">{condition.emoji}</div>
            <div className="text-sm font-medium text-gray-700">{condition.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
