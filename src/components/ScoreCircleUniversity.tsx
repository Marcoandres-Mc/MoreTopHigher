// src/components/ScoreCircleUniversity.tsx
interface ScoreCircleUniversityProps {
  score: number;           // nota de 1 a 20
  maxScore?: number;       // máximo posible (por defecto 20)
  size?: number;           // diámetro en píxeles (default: 140)
  showPercentage?: boolean; // mostrar porcentaje en el centro (default: true)
  label?: string;          // texto opcional debajo del círculo
}

export default function ScoreCircleUniversity({
  score,
  maxScore = 20,
  size = 140,
  showPercentage = true,
  label,
}: ScoreCircleUniversityProps) {
  // Calcular porcentaje (ej. 15/20 = 75%)
  const percentage = (Math.min(score, maxScore) / maxScore) * 100;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Texto central: porcentaje o nota "15/20"
  const centerText = showPercentage ? `${Math.round(percentage)}%` : `${score}/${maxScore}`;

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
        {/* Texto central */}
        <text
          x={size / 2}
          y={size / 2 + 6}
          textAnchor="middle"
          fontSize={size * 0.18}
          fontWeight="bold"
          fill="#1e293b"
          dominantBaseline="middle"
        >
          {centerText}
        </text>
      </svg>
      {label && <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>}
      {!label && showPercentage === false && (
        <p className="mt-2 text-xs text-gray-500">Nota: {score}/{maxScore}</p>
      )}
    </div>
  );
}