// src/components/ScoreCircleUniversity.tsx
interface ScoreCircleUniversityProps {
  score: number;           // nota de 0 a 20
  maxScore?: number;       // máximo (default 20)
  size?: number;           // diámetro del círculo (default 140)
  label?: string;          // texto opcional debajo
}

export default function ScoreCircleUniversity({
  score,
  maxScore = 20,
  size = 140,
  label,
}: ScoreCircleUniversityProps) {
  // Calcular porcentaje (0-100)
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
        {/* Círculo de fondo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
        />
        {/* Círculo de progreso (gradiente académico) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#academicGradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="academicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {/* Texto central: muestra la nota sobre el máximo */}
        <text
          x={size / 2}
          y={size / 2 + 6}
          textAnchor="middle"
          fontSize={size * 0.2}
          fontWeight="bold"
          fill="#1e293b"
          dominantBaseline="middle"
        >
          {score}
        </text>
      </svg>
      {label && <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>}
    </div>
  );
}