// src/components/ScoreCircle.tsx
interface ScoreCircleProps {
  score: number;        // valor de 0 a 100
  size?: number;        // diámetro en píxeles (default: 120)
  label?: string;       // texto opcional debajo del círculo
}

export default function ScoreCircle({ score, size = 120, label }: ScoreCircleProps) {
  const radius = (size - 20) / 2;      // espacio interno para el texto
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

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
        {/* Círculo de progreso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-700 ease-out"
        />
        {/* Gradiente definido dentro del SVG */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* Texto central */}
        <text
          x={size / 2}
          y={size / 2 + 6}
          textAnchor="middle"
          fontSize={size * 0.2}
          fontWeight="bold"
          fill="#1e293b"
          dominantBaseline="middle"
        >
          {Math.round(score)}
        </text>
      </svg>
    </div>
  );
}