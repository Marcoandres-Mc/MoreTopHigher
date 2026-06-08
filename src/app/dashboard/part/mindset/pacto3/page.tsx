// src/app/dashboard/pacto/page.tsx
"use client";
import { useState, useEffect } from "react";

export default function PactoPage() {
  const [respirando, setRespirando] = useState(false);
  const [pasos, setPasos] = useState({ respiracion: false, asentir: false });

  useEffect(() => {
    if (respirando) {
      const timer = setTimeout(() => setRespirando(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [respirando]);

  const handleRespiracion = () => {
    setRespirando(true);
    setPasos((prev) => ({ ...prev, respiracion: true }));
  };

  const handleAsentir = () => {
    setPasos((prev) => ({ ...prev, asentir: true }));
  };

  const valores = [
    { nombre: "Mentalidad", icono: "🧠", color: "from-indigo-400 to-purple-500" },
    { nombre: "Disciplina", icono: "⚡", color: "from-blue-400 to-cyan-500" },
    { nombre: "Determinación", icono: "🎯", color: "from-orange-400 to-red-500" },
    { nombre: "Confianza", icono: "💪", color: "from-green-400 to-emerald-500" },
    { nombre: "Suerte 100%", icono: "🍀", color: "from-amber-400 to-yellow-500" },
  ];

  const todosPasosCompletados = pasos.respiracion && pasos.asentir;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 py-2 md:py-2">
          {/* Tarjeta principal - efecto vidrio */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-4 md:p-6 transition-all hover:shadow-amber-500/20 hover:shadow-xl">
            
            {/* Collar / medallón simbólico */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg ring-4 ring-white/30">
                  <span className="text-5xl md:text-6xl">📿</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-amber-400/50" />
              </div>
            </div>

            {/* Título principal */}
            <h1 className="text-3xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
              PACTO DE GRANDEZA
            </h1>

            {/* Frase del collar */}
            <p className="text-center text-amber-100/80 italic text-lg mt-4 border-l-4 border-amber-400 pl-4 max-w-md mx-auto">
              “Este collar me recuerda quién quiero ser hoy.”
            </p>

            {/* Pasos de respiración y asentir */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleRespiracion}
                  disabled={pasos.respiracion}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${
                    pasos.respiracion
                      ? "bg-green-500/30 text-green-200 cursor-default"
                      : "bg-white/10 hover:bg-white/20 border border-white/20 hover:scale-105"
                  }`}
                >
                  <span className="text-2xl group-hover:animate-pulse">🌬️</span>
                  <span className="font-medium">Respira profundo 3 veces</span>
                  {pasos.respiracion && <span className="text-green-300">✓</span>}
                </button>

                <button
                  onClick={handleAsentir}
                  disabled={pasos.asentir}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${
                    pasos.asentir
                      ? "bg-green-500/30 text-green-200 cursor-default"
                      : "bg-white/10 hover:bg-white/20 border border-white/20 hover:scale-105"
                  }`}
                >
                  <span className="text-2xl">👍</span>
                  <span className="font-medium">Asentir con la cabeza</span>
                  {pasos.asentir && <span className="text-green-300">✓</span>}
                </button>
              </div>
              {respirando && (
                <div className="text-center text-amber-200 text-sm animate-pulse">
                  🧘‍♂️ Respira... inhala... exhala...
                </div>
              )}
            </div>

            {/* Promesa */}
            {todosPasosCompletados && (
              <div className="mt-6 text-center animate-fadeIn">
                <p className="text-amber-100 text-lg md:text-xl font-medium bg-white/5 rounded-2xl py-3 px-4 inline-block">
                  “Prometo dar lo mejor de mí hasta terminar el día”
                </p>
              </div>
            )}

            {/* Valores */}
            <div className="mt-10">
              <h3 className="text-center text-amber-200 text-sm uppercase tracking-wider mb-4">
                Mi código de grandeza
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {valores.map((val) => (
                  <div
                    key={val.nombre}
                    className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10 hover:scale-105 transition-transform"
                  >
                    <div className={`text-2xl bg-gradient-to-r ${val.color} bg-clip-text text-transparent`}>
                      {val.icono}
                    </div>
                    <p className="text-white/80 text-sm font-medium mt-1">{val.nombre}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Firma / Recordatorio */}
            <div className="mt-8 text-center text-white/40 text-xs">
              Repite este pacto cada mañana. Tú decides tu grandeza.
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}