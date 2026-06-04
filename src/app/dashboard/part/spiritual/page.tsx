// src/app/dashboard/spiritual/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";

export default function SpiritualPage() {
  // Métricas espirituales
  const [bienestarEspiritual, setBienestarEspiritual] = useState(78);
  const [meditacionRacha, setMeditacionRacha] = useState(12);
  const [minutosMeditacion, setMinutosMeditacion] = useState(180);
  const [metaMeditacion, setMetaMeditacion] = useState(200);
  const [gratitudPracticada, setGratitudPracticada] = useState(18); // días este mes
  const [metaGratitud, setMetaGratitud] = useState(25);
  const [conexionInterior, setConexionInterior] = useState(72);
  
  // Prácticas espirituales
  const [practicas, setPracticas] = useState([
    { id: 1, nombre: "Meditación matutina", completado: true, puntos: 20 },
    { id: 2, nombre: "Escribir 3 cosas por las que estoy agradecido", completado: false, puntos: 15 },
    { id: 3, nombre: "Respiración consciente (5 min)", completado: true, puntos: 10 },
    { id: 4, nombre: "Leer texto espiritual", completado: false, puntos: 15 },
    { id: 5, nombre: "Desconexión y silencio (10 min)", completado: false, puntos: 25 },
  ]);
  
  // Citas espirituales
  const [citaDiaria, setCitaDiaria] = useState({
    texto: "La paz no es la ausencia de conflicto, sino la capacidad de manejar la mente en medio de él.",
    autor: "Desconocido"
  });
  
  const citas = [
    { texto: "No hay camino hacia la paz, la paz es el camino.", autor: "Mahatma Gandhi" },
    { texto: "La felicidad no es algo hecho. Viene de tus propias acciones.", autor: "Dalai Lama" },
    { texto: "Dondequiera que vayas, ve con todo tu corazón.", autor: "Confucio" },
    { texto: "El propósito de la vida es encontrar tu don. El sentido de la vida es regalarlo.", autor: "Picasso" },
  ];
  
  // Recursos espirituales
  const [recursos, setRecursos] = useState([
    { id: 1, nombre: "Headspace - Meditación guiada", url: "https://www.headspace.com", categoria: "🧘 App" },
    { id: 2, nombre: "El Poder del Ahora - Eckhart Tolle", url: "https://www.amazon.com/dp/1577314808", categoria: "📖 Libro" },
    { id: 3, nombre: "Meditaciones guiadas en Español", url: "https://www.youtube.com/results?search_query=meditaciones+guiadas+español", categoria: "🎥 Videos" },
    { id: 4, nombre: "Podcast: Siente lo que te pasa", url: "https://open.spotify.com/show/4x6iF", categoria: "🎙️ Podcast" },
  ]);
  
  const cambiarCita = () => {
    const nueva = citas[Math.floor(Math.random() * citas.length)];
    setCitaDiaria(nueva);
  };
  
  const togglePractica = (id: number) => {
    setPracticas(practicas.map(p =>
      p.id === id ? { ...p, completado: !p.completado } : p
    ));
  };
  
  const agregarRecurso = () => {
    const nombre = prompt("Nombre del recurso:", "");
    if (!nombre) return;
    const url = prompt("URL:", "https://");
    if (!url) return;
    const categoria = prompt("Categoría (🧘 App, 📖 Libro, 🎥 Video, 🎙️ Podcast):", "📖 Libro");
    const nuevoId = Math.max(...recursos.map(r => r.id), 0) + 1;
    setRecursos([...recursos, { id: nuevoId, nombre, url, categoria: categoria || "📖 Libro" }]);
  };
  
  const eliminarRecurso = (id: number) => {
    if (confirm("¿Eliminar este recurso?")) {
      setRecursos(recursos.filter(r => r.id !== id));
    }
  };
  
  const progresoMeditacion = Math.min(100, (minutosMeditacion / metaMeditacion) * 100);
  const progresoGratitud = Math.min(100, (gratitudPracticada / metaGratitud) * 100);
  
  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-50 to-gray-100 p-10">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-4xl">🕊️</span> Espiritualidad y conexión interior
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tarjeta de bienestar espiritual */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-100/40 rounded-2xl shadow-md border border-purple-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center">
              <ScoreCircle score={bienestarEspiritual} size={140} />
              <p className="text-sm font-semibold text-purple-700 mt-2">Bienestar espiritual</p>
              <p className="text-xs text-gray-500">Paz interior + conexión</p>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <span className="text-gray-600">🧘 Racha de meditación</span>
                <span className="font-bold text-purple-700">{meditacionRacha} días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">💫 Conexión interior</span>
                <span className="font-bold text-purple-700">{conexionInterior}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">🙏 Prácticas completadas hoy</span>
                <span className="font-bold text-purple-700">{practicas.filter(p => p.completado).length}/{practicas.length}</span>
              </div>
            </div>
          </div>
          
          {/* Prácticas espirituales del día */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🕯️</span> Prácticas espirituales de hoy
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {practicas.map((practica) => (
                <div key={practica.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => togglePractica(practica.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition ${
                        practica.completado ? "bg-purple-500 border-purple-500" : "border-gray-300 hover:border-purple-400"
                      }`}
                    >
                      {practica.completado && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-gray-700 ${practica.completado ? "line-through text-gray-400" : ""}`}>
                      {practica.nombre}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{practica.puntos} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Metas semanales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <span>🧘</span> Meditación semanal
              </h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {minutosMeditacion} / {metaMeditacion} min
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progresoMeditacion}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Meta semanal: {metaMeditacion} minutos</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <span>🙏</span> Práctica de gratitud
              </h3>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {gratitudPracticada} / {metaGratitud}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${progresoGratitud}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Días de gratitud este mes</p>
            </div>
          </div>
          
          {/* Cita espiritual del día */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-sm border border-indigo-200 p-5">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <span>✨</span> Sabiduría del día
                </h3>
                <p className="text-gray-700 italic text-lg">{citaDiaria.texto}</p>
                <p className="text-gray-500 text-sm mt-2">— {citaDiaria.autor}</p>
              </div>
              <button
                onClick={cambiarCita}
                className="text-xs bg-white/80 hover:bg-white px-3 py-1.5 rounded-full text-purple-600 border border-purple-200 transition"
              >
                Nueva cita
              </button>
            </div>
          </div>
        </div>
        
        {/* Columna derecha (1/3) */}
        <div className="space-y-6">
          {/* Resumen de paz interior */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
              <span>📊</span> Estado espiritual
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🕊️ Paz interior</span>
                  <span className="font-bold">{bienestarEspiritual}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${bienestarEspiritual}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🔮 Conexión espiritual</span>
                  <span className="font-bold">{conexionInterior}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${conexionInterior}%` }} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Recursos espirituales */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-xl">📿</span> Recursos espirituales
              </h2>
              <button
                onClick={agregarRecurso}
                className="text-purple-600 text-sm bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100 transition"
              >
                + Añadir
              </button>
            </div>
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
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
                  <div className="w-8 h-8 flex items-center justify-center text-lg">{recurso.categoria.charAt(0)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{recurso.nombre}</p>
                    <span className="text-xs text-gray-400">{recurso.categoria}</span>
                  </div>
                  <span className="text-gray-300 text-xs">→</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Afirmación espiritual */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl shadow-sm border border-teal-200 p-5">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <span>💫</span> Afirmación para hoy
            </h3>
            <p className="text-sm text-gray-600 italic">
              Confío en el proceso de la vida. Todo llega en el momento perfecto.
            </p>
            <button className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-medium">
              Más afirmaciones →
            </button>
          </div>
          
          {/* Próxima práctica recomendada */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            <span className="text-3xl mb-2 block">🧘</span>
            <p className="text-sm font-medium text-gray-700">Próxima práctica sugerida</p>
            <p className="text-xs text-gray-500 mt-1">Meditación guiada de 10 minutos</p>
            <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition w-full">
              Comenzar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}