

export default function ScoreCircle({ score, label, size = 120 }: { score: number; label: string; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none" stroke="#e2e8f0" strokeWidth="8"
        />
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none" stroke="#3b82f6" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          className="transition-all duration-700"
        />
        <text x={size/2} y={size/2 + 8} textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1e293b">
          {Math.round(score)}
        </text>
      </svg>
      <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}