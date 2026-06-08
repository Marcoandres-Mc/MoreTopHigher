// src/app/dashboard/habits/page.tsx
"use client";
import { useState, useEffect } from "react";
import HabitsTable from "./components/HabitsTable";
import Nav from "@/app/dashboard/components/Nav";

// Tipo para los links de recursos
interface ResourceLink {
  id: number;
  nombre: string;
  url: string;
  categoria: string;
}

export default function HabitsPage() {
  // --- Links de recursos recomendados ---
  const [recursos, setRecursos] = useState<ResourceLink[]>([
    { id: 1, nombre: "Plan 2026", url: "https://docs.google.com/presentation/d/1YY7hV4I406u-wpXxT-GNFqYPvm0CRj8wyNd67FXrAo8/edit?usp=sharing", categoria: "📖 Libro" },
    { id: 2, nombre: "Tabla de habitos", url: "https://docs.google.com/spreadsheets/d/1q-K0287ABsOhAWaRPxxsAvmcXVAoGW960BZc0xtSijg/edit?usp=sharing", categoria: "📱 App" },
  ]);

  // --- Citas motivacionales ---
  const [citaActual, setCitaActual] = useState({
    texto: "La calidad de tu vida depende de la calidad de tus hábitos.",
    autor: "James Clear"
  });

  const citas = [
    { texto: "Pequeños hábitos, grandes resultados.", autor: "Aristóteles" },
    { texto: "No tienes que ser perfecto, solo constante.", autor: "Desconocido" },
    { texto: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", autor: "Robert Collier" },
    { texto: "Crea el hábito, y el hábito te creará a ti.", autor: "John Dryden" },
  ];

  // --- Tips del día ---
  const [tipActual, setTipActual] = useState({
    titulo: "💡 Tip del día",
    contenido: "Comienza con hábitos de 2 minutos. Es más fácil mantener una rutina corta que empezar con algo ambicioso."
  });

  const tips = [
    { titulo: "🎯 Ley de los 2 minutos", contenido: "Si te cuesta empezar, hazlo solo por 2 minutos. Luego será más fácil continuar." },
    { titulo: "📅 Apila tus hábitos", contenido: "Ata un hábito nuevo a uno existente: 'Después de cepillarme los dientes, meditaré 5 minutos'." },
    { titulo: "🏆 Celebra los logros", contenido: "Cada vez que completes un hábito, date un pequeño reconocimiento. Refuerza la conducta." },
    { titulo: "📉 No rompas la cadena", contenido: "Marca cada día que cumples tu hábito. No permitas que la cadena se rompa." },
  ];

  const cambiarCita = () => {
    const nueva = citas[Math.floor(Math.random() * citas.length)];
    setCitaActual(nueva);
  };

  const cambiarTip = () => {
    const nuevo = tips[Math.floor(Math.random() * tips.length)];
    setTipActual(nuevo);
  };

  // --- Función para agregar recurso ---
  const agregarRecurso = () => {
    const nombre = prompt("Nombre del recurso:", "");
    if (!nombre) return;
    const url = prompt("URL completa (incluye https://):", "https://");
    if (!url) return;
    const categoria = prompt("Categoría (📖 Libro, 📱 App, 🎥 Video, 🎙️ Podcast):", "📖 Libro");
    const nuevoId = Math.max(...recursos.map(r => r.id), 0) + 1;
    setRecursos([...recursos, { id: nuevoId, nombre, url, categoria: categoria || "📖 Libro" }]);
  };

  const eliminarRecurso = (id: number) => {
    if (confirm("¿Eliminar este recurso?")) {
      setRecursos(recursos.filter(r => r.id !== id));
    }
  };

  // Función para obtener el icono según la categoría
  const getCategoriaIcon = (categoria: string) => {
    if (categoria.includes("📖") || categoria.includes("Libro")) return "📖";
    if (categoria.includes("📱") || categoria.includes("App")) return "📱";
    if (categoria.includes("🎥") || categoria.includes("Video")) return "🎥";
    if (categoria.includes("🎙️") || categoria.includes("Podcast")) return "🎙️";
    return "📚";
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/20 to-yellow-50 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header con decoración */}
          <div className="mb-8 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl" />
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 relative z-10">
              <span className="text-4xl" suppressHydrationWarning>✅</span> Mis hábitos diarios
            </h1>
            <p className="text-gray-500 mt-1 relative z-10">
              Organiza y da seguimiento a tus rutinas diarias
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna principal: Tabla de hábitos */}
            <div className="lg:col-span-2 space-y-6">
              <HabitsTable />
            </div>

            {/* Columna derecha: Recursos, tips y motivación */}
            <div className="space-y-6">
              {/* Tarjeta de progreso general */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-5 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" suppressHydrationWarning>🏆</span>
                  <h3 className="font-bold text-lg">Tu racha actual</h3>
                </div>
                <div className="text-4xl font-bold mb-1">12 días</div>
                <p className="text-emerald-100 text-sm">¡Sigue así! Cada día cuenta.</p>
                <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: "85%" }} />
                </div>
                <p className="text-emerald-100 text-xs mt-2">85% de consistencia esta semana</p>
              </div>

              {/* Tarjeta de recursos recomendados */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-xl" suppressHydrationWarning>📚</span> Recursos para crear hábitos
                  </h3>
                  <button
                    onClick={agregarRecurso}
                    className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full hover:bg-emerald-100 transition"
                  >
                    + Añadir
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {recursos.map((recurso) => (
                    <div
                      key={recurso.id}
                      className="group relative flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => window.open(recurso.url, "_blank")}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); eliminarRecurso(recurso.id); }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                      >
                        ✕
                      </button>
                      <div className="w-8 h-8 flex items-center justify-center text-lg bg-gray-100 rounded-lg" suppressHydrationWarning>
                        {getCategoriaIcon(recurso.categoria)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{recurso.nombre}</p>
                        <span className="text-xs text-gray-400">{recurso.categoria}</span>
                      </div>
                      <span className="text-gray-300 text-xs">→</span>
                    </div>
                  ))}
                  {recursos.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">
                      No hay recursos. Añade tu primer libro o app.
                    </p>
                  )}
                </div>
              </div>

              {/* Tarjeta de cita motivacional */}
              <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl" suppressHydrationWarning>✨</span> Frase del día
                  </h3>
                  <button
                    onClick={cambiarCita}
                    className="text-xs text-amber-600 hover:text-amber-700 bg-amber-50 px-2 py-1 rounded-full"
                  >
                    Nueva frase
                  </button>
                </div>
                <p className="text-gray-700 italic text-center py-2">{citaActual.texto}</p>
                <p className="text-right text-xs text-gray-400 mt-2">— {citaActual.autor}</p>
              </div>

              {/* Tarjeta de tip del día */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200 p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-xl" suppressHydrationWarning>
                      {tipActual.titulo.charAt(0) === "💡" ? "💡" : tipActual.titulo.charAt(0)}
                    </span> 
                    <span suppressHydrationWarning>{tipActual.titulo.substring(1)}</span>
                  </h3>
                  <button
                    onClick={cambiarTip}
                    className="text-xs text-amber-600 hover:text-amber-700 bg-white/60 px-2 py-1 rounded-full"
                  >
                    Otro tip
                  </button>
                </div>
                <p className="text-sm text-gray-600">{tipActual.contenido}</p>
              </div>

              {/* Insignias / Logros */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <span suppressHydrationWarning>🏅</span> Logros desbloqueados
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full" suppressHydrationWarning>🏆 5 días seguidos</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full" suppressHydrationWarning>⭐ Primer hábito completado</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs rounded-full" suppressHydrationWarning>🔒 15 días</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs rounded-full" suppressHydrationWarning>🔒 30 días</span>
                </div>
                <button className="mt-3 text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  Ver todos los logros →
                </button>
              </div>

              {/* Frase de cierre */}
              <div className="text-center text-gray-400 text-xs py-2">
                <p>La consistencia supera la perfección.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}