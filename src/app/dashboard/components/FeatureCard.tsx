// src/components/FeatureCard.tsx
import { ReactNode } from 'react';

interface FeatureCardProps {
  image?: string;          // URL de la imagen (opcional)
  icon?: string;          // Emoji o icono de texto (alternativa a imagen)
  title: string;
  subtitle?: string;
  url?: string;          // Para hacer la tarjeta clickeable (opcional)
  description?: string;
  children?: ReactNode;   // Para contenido extra (botones, badges, etc.)
  badge?: string;         // Etiqueta pequeña (ej: "Popular", "Nuevo")
  gradient?: string;      // Clase de gradiente personalizado
  onClick?: () => void;
}

export default function FeatureCard({
  image,
  icon,
  title,
  subtitle,
  description,
  children,
  url,
  badge,
  gradient = "from-white/80 to-gray-50/80",
  onClick
}: FeatureCardProps) {
  return (
    <div 
  className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl shadow-md border border-white/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
  onClick={onClick}
>
  {/* Badge flotante más pequeño */}
  {badge && (
    <span className="absolute -top-1.5 -right-1.5 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
      {badge}
    </span>
  )}

  {/* Efecto de brillo sutil en hover */}
  <div className="rounded-2xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent" />

  {/* Contenido */}
  <a href={url || '#'} className="relative z-0 block">
    {/* Imagen o icono más pequeño */}
    {image && (
      <div className="overflow-hidden rounded-t-2xl">
        <img 
          src={image} 
          alt={title}
          className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    )}
    {!image && icon && (
      <div className="text-4xl mb-2 transform transition-transform group-hover:scale-110 group-hover:rotate-3 inline-block">
        {icon}
      </div>
    )}
    <div className="p-3 flex flex-col items-start gap-1.5">
      {/* Título más pequeño */}
      <h3 className="text-base font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
        {title}
        {/* Subtítulo más pequeño */}
        {subtitle && (
          <p className="text-xs text-orange-600 font-medium">{subtitle}</p>
        )}
      </h3>

      {/* Descripción más pequeña */}
      {description && (
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{description}</p>
      )}

      {/* Children (contenido adicional) más compacto */}
      {children && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {children}
        </div>
      )}
    </div>
  </a>
</div>
  );
}