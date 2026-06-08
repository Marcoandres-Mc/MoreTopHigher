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
      className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-tr-2xl rounded-tl-2xl shadow-lg border border-white/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Badge flotante */}
      {badge && (
        <span className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {badge}
        </span>
      )}

      {/* Efecto de brillo sutil en hover */}
      <div className="rounded-2xl absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Contenido */}
      <a href={url || '#'} className="relative z-0 ">
        {/* Imagen o icono */}
        {image && (
          <div className="overflow-hidden rounded-tr-2xl rounded-tl-2xl">
            <img 
              src={image} 
              alt={title}
              className="w-full h-60 object-cover  transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        {!image && icon && (
          <div className="text-5xl mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3 inline-block">
            {icon}
          </div>
        )}
        <div className="p-4 flex flex-col items-start gap-2">
          {/* Título */}
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
            {title}
            {/* Subtítulo */}
          {subtitle && (
            <p className="text-sm text-orange-600 font-medium ">{subtitle}</p>
          )}
          </h3>

          

          {/* Descripción */}
          {description && (
            <p className="text-gray-600 text-sm  leading-relaxed">{description}</p>
          )}

          {/* Children (contenido adicional) */}
          {children && (
            <div className="mt-4 flex flex-wrap gap-2">
              {children}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}