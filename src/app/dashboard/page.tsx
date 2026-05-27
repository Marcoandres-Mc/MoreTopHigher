// src/app/dashboard/page.tsx
"use client";
import { useState } from "react";

export default function DashboardPage() {
  // ... los mismos datos de ejemplo (importancia, habitsHoy, shortcuts, puntajes, racha)
  const [importancia] = useState([
    { id: 1, tarea: "Entregar informe de matemáticas", prioridad: "alta", fecha: "2025-04-10" },
    { id: 2, tarea: "Preparar presentación de programación", prioridad: "media", fecha: "2025-04-12" },
    { id: 3, tarea: "Estudiar para parcial de BD", prioridad: "alta", fecha: "2025-04-09" },
  ]);

  const [habitsHoy] = useState([
    { id: 1, nombre: "Estudiar 2h", completado: false, puntos: 10 },
    { id: 2, nombre: "Hacer ejercicio", completado: true, puntos: 15 },
    { id: 3, nombre: "Dormir 7h", completado: false, puntos: 10 },
    { id: 4, nombre: "Leer 30 min", completado: false, puntos: 8 },
  ]);

  const [shortcuts] = useState([
    { id: 1, nombre: "Leetcode", url: "https://leetcode.com/u/Marcoandres_23/" },
    { id: 2, nombre: "GitHub", url: "https://github.com/Marcoandres-Mc" },
    { id: 3, nombre: "LinkedIn", url: "https://www.linkedin.com/feed/" },
    { id: 4, nombre: "Ritual", url: "https://www.canva.com/design/DAHJ4Qdz26s/IyFm4t5TFRGG2YTkTp70Ig/edit" },
    { id: 5, nombre: "Atlaxio", url: "https://www.atlaxio.com/" },
    { id: 6, nombre: "Tabla de importancia", url: "https://docs.google.com/document/d/1ruPrwbe-EsvEaNmF5DAjV0HLwOd7-4WJX08vOk3WU3Y/edit?tab=t.0" },
    { id: 7, nombre: "Tablas de progreso", url: "https://docs.google.com/spreadsheets/d/1q-K0287ABsOhAWaRPxxsAvmcXVAoGW960BZc0xtSijg/edit?gid=547132401#gid=547132401" },
  ]);

  const puntajeHabitos = 68;
  const puntajeUniversidad = 82;
  const rachaActual = 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navbar (igual) */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MTH</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                MoreTopHigher
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium">Perfil</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-sm">Salir</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        {/* Grid de 3 columnas para los "cuadrados" */}
        <div className="flex gap-2">
        
        <div className="flex flex-col gap-2 w-[300]">
 
          {/* Lista de importancia - ocupa 2 columnas en desktop */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">⭐</span> Lista de importancia
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">Tareas prioritarias - Orden por urgencia</p>
                </div>
                <span className="text-xs bg-white/60 px-2 py-1 rounded-full text-amber-700">Prioridad</span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {importancia.map((item) => (
                <div key={item.id} className="px-2 py-2 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.prioridad === "alta" ? "bg-red-500" : "bg-yellow-500"}`} />
                    <div>
                      <p className="font-medium text-xs text-gray-800">{item.tarea}</p>
                      <p className="text-xs text-gray-400">Vence: {item.fecha}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 text-sm transition">Ver →</button>
                </div>
              ))}
            </div>
            <div className="px-2 py-2 bg-gray-50 border-t border-gray-100">
              <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1">+ Agregar tarea importante</button>
            </div>
          </div>
            {/* Acceso directo */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                <h2 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">🚀 Acceso directo</h2>
                <div className="grid grid-cols-2 gap-2">
                    {shortcuts.map((app) => {
                    // Obtener dominio de la URL para el favicon
                    let dominio = '';
                    try {
                        dominio = new URL(app.url).hostname;
                    } catch (e) {
                        dominio = '';
                    }
                    return (
                        <a
                        key={app.id}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition group"
                        >
                        <img
                            src={`https://www.google.com/s2/favicons?domain=${dominio}&sz=32`}
                            alt={app.nombre}
                            className="w-5 h-5 rounded-sm"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-blue-600">{app.nombre}</span>
                        </a>
                    );
                    })}
                    <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition">
                    <span className="text-xl">+</span>
                    <span className="text-sm">Añadir</span>
                    </button>
                </div>
                </div>

           </div>


        <div className="flex flex-col gap-4 w-[700]">
            <div className= "flex gap-4 w-[700]">
            {/* Puntajes globales */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">📊 Puntajes globales</h2>
                <div className="space-y-5">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">🏆 Hábitos</span>
                    <span className="font-bold">{puntajeHabitos}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-emerald-500 h-2.5 rounded-full transition-all" style={{ width: `${puntajeHabitos}%` }} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">🎓 Universidad</span>
                    <span className="font-bold">{puntajeUniversidad}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${puntajeUniversidad}%` }} />
                    </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-sm font-semibold">
                    <span>🌟 Total MTH</span>
                    <span>{Math.round(puntajeHabitos * 0.4 + puntajeUniversidad * 0.6)}%</span>
                    </div>
                </div>
                </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">


                <h2 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">📊 Puntajes globales</h2>
                <div className="space-y-5">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">🏆 Hábitos</span>
                    <span className="font-bold">{puntajeHabitos}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-emerald-500 h-2.5 rounded-full transition-all" style={{ width: `${puntajeHabitos}%` }} />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1">🎓 Universidad</span>
                    <span className="font-bold">{puntajeUniversidad}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${puntajeUniversidad}%` }} />
                    </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-sm font-semibold">
                    <span>🌟 Total MTH</span>
                    <span>{Math.round(puntajeHabitos * 0.4 + puntajeUniversidad * 0.6)}%</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
          {/* Páginas horizontales (ocupa 2 columnas) */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📌</span> Páginas secundarias
            </h2>
             <div className="flex overflow-x-auto space-x-4 pb-3 scrollbar-thin">
            {[
                { id: 1, nombre: "Portal de estudiantes", url: "https://estudiante.upc.edu.pe/" },
                { id: 2, nombre: "UPC", url: "https://aulavirtual.upc.edu.pe/ultra/profile" },
                { id: 3, nombre: "GitHub", url: "https://github.com/Marcoandres-Mc" },
                { id: 4, nombre: "NoteBookLm", url: "https://notebooklm.google.com/" },
                { id: 5, nombre: "DiagramaUML", url: "https://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa700001" },
            ].map((pag) => (
                <div
                key={pag.id}
                className="relative flex-shrink-0 w-30 bg-white rounded-xl p-3 text-center hover:shadow-md transition-all cursor-pointer border border-gray-200 group"
                onClick={() => window.open(pag.url, '_blank')}
                >
                {/* Botón eliminar (opcional) */}
                <button
                    onClick={(e) => { e.stopPropagation(); /* Aquí puedes llamar a una función para eliminar */ }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                    ✕
                </button>
                {/* Ícono obtenido del favicon de la URL */}
                <img
                    src={`https://www.google.com/s2/favicons?domain=${new URL(pag.url).hostname}&sz=64`}
                    alt={pag.nombre}
                    className="w-10 h-10 mx-auto mb-2 rounded-md"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <p className="font-medium text-gray-800 text-sm truncate">{pag.nombre}</p>
                <p className="text-xs text-gray-400 mt-1 truncate">
                    {new URL(pag.url).hostname}
                </p>
                </div>
            ))}
            </div>
            
          </div>
               {/* Elemento extra (consejo) podría ir en un cuadrado adicional */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-2">
            <h2 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-1">📖 Consejo MTH</h2>
            <p className="text-sm text-gray-600">Divide tus tareas importantes en bloques de 25 min (Pomodoro) para mantener la concentración.</p>
          </div>

          </div>
         

          {/* Calendario de racha */}
          <div className="flex flex-col gap-4 w-[300] ">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-4 text-white">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-md font-semibold flex items-center gap-1">🔥 Racha actual</h2>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">días seguidos</span>
            </div>
            <div className="text-5xl font-bold mb-1">{rachaActual}</div>
            <p className="text-indigo-100 text-sm mb-4">¡Excelente! Sigue así.</p>
            <div className="flex justify-between text-xs text-indigo-200 mb-1">
              <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
            </div>
            <div className="flex justify-between">
              {[1, 1, 0, 1, 1, 0, 1].map((activo, i) => (
                <div key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${activo ? "bg-white/30 text-white" : "bg-white/10 text-white/50"}`}>
                  {activo ? "✓" : "-"}
                </div>
              ))}
            </div>
          </div>
              {/* Hábitos de hoy (ocupa 2 columnas) */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-2 py-2 border-b border-gray-100 bg-green-50/40">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">✅</span> Hábitos de hoy
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {habitsHoy.map((habito) => (
                <div key={habito.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition ${habito.completado ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-green-400"}`}>
                      {habito.completado && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-gray-700 text-xs ${habito.completado ? "line-through text-gray-400" : ""}`}>{habito.nombre}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{habito.puntos} pts</span>
                  </div>
                  <button className="text-blue-600 text-sm text-xs font-medium">Detalle</button>
                </div>
              ))}
            </div>
            <div className="px-4 py-1 bg-gray-50 border-t border-gray-100">
              <button className="text-blue-600 text-sm">+ Añadir hábito</button>
            </div>
          </div>



          </div>

          
          

          

         
        </div>
      </main>
    </div>
  );
}