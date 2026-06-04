// src/app/dashboard/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "../../components/ScoreCircle";
import ScoreCircleUniversity from "../../components/ScoreCircleUniversity";
import Nav from "./components/Nav";

// Dentro del JSX

export default function DashboardPage() {
  // ... los mismos datos de ejemplo (importancia, habitsHoy, shortcuts, puntajes, racha)
  const [importancia] = useState([
    {
      id: 1,
      tarea: "Entregar informe de matemáticas",
      prioridad: "alta",
      fecha: "2025-04-10",
    },
    {
      id: 2,
      tarea: "Preparar presentación de programación",
      prioridad: "media",
      fecha: "2025-04-12",
    },
    {
      id: 3,
      tarea: "Estudiar para parcial de BD",
      prioridad: "alta",
      fecha: "2025-04-09",
    },
  ]);

  const [habitsHoy] = useState([
    { id: 1, nombre: "Estudiar 2h", completado: false, puntos: 10 },
    { id: 2, nombre: "Hacer ejercicio", completado: true, puntos: 15 },
    { id: 3, nombre: "Dormir 7h", completado: false, puntos: 10 },
    { id: 4, nombre: "Leer 30 min", completado: false, puntos: 8 },
  ]);

  const [shortcuts] = useState([
    {
      id: 1,
      nombre: "Leetcode",
      url: "https://leetcode.com/u/Marcoandres_23/",
    },
    { id: 2, nombre: "GitHub", url: "https://github.com/Marcoandres-Mc" },
    { id: 3, nombre: "LinkedIn", url: "https://www.linkedin.com/feed/" },
    {
      id: 4,
      nombre: "Ritual",
      url: "https://www.canva.com/design/DAHJ4Qdz26s/IyFm4t5TFRGG2YTkTp70Ig/edit",
    },
    { id: 5, nombre: "Atlaxio", url: "https://www.atlaxio.com/" },
    {
      id: 6,
      nombre: "Tabla de importancia",
      url: "https://docs.google.com/document/d/1ruPrwbe-EsvEaNmF5DAjV0HLwOd7-4WJX08vOk3WU3Y/edit?tab=t.0",
    },
    {
      id: 7,
      nombre: "Tablas de progreso",
      url: "https://docs.google.com/spreadsheets/d/1q-K0287ABsOhAWaRPxxsAvmcXVAoGW960BZc0xtSijg/edit?gid=547132401#gid=547132401",
    },
  ]);

  const puntajeHabitos = 100;
  const puntajeUniversidad = 17.26;
  const rachaActual = 2;
  const porcentajeUniversidad = 30;

  const navSections = [
    {
      name: "Mis Cursos",
      href: "/dashboard/parts/courses",
      icon: "📚",
      gradient: "from-blue-50 to-blue-100/50",
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-300",
    },
    {
      name: "Hábitos",
      href: "/dashboard/parts/habits",
      icon: "✅",
      gradient: "from-emerald-50 to-emerald-100/50",
      border: "border-emerald-200",
      hoverBorder: "hover:border-emerald-300",
    },
    {
      name: "Inglés",
      href: "/dashboard/parts/english",
      icon: "🇬🇧",
      gradient: "from-sky-50 to-sky-100/50",
      border: "border-sky-200",
      hoverBorder: "hover:border-sky-300",
    },
    {
      name: "Mentalidad",
      href: "/dashboard/parts/mindset",
      icon: "🧠",
      gradient: "from-orange-50 to-orange-100/50",
      border: "border-orange-200",
      hoverBorder: "hover:border-orange-300",
    },
    {
      name: "Espiritualidad",
      href: "/dashboard/parts/spiritual",
      icon: "🕊️",
      gradient: "from-purple-50 to-purple-100/50",
      border: "border-purple-200",
      hoverBorder: "hover:border-purple-300",
    },
    {
      name: "Configuración",
      href: "/dashboard/parts/settings",
      icon: "⚙️",
      gradient: "from-gray-50 to-gray-100/50",
      border: "border-gray-200",
      hoverBorder: "hover:border-gray-300",
    },
  ];

  return (
    <div className="flex justify-center flex-col min-h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Navbar (igual) */}
        <Nav/>

        <main className="max-w-7xl mx-auto py-6 px-4 w-full">
  {/* Grid de 3 columnas */}
  <div className="flex flex-col lg:flex-row justify-center gap-6">
    
    {/* Columna izquierda: Lista de importancia + Acceso directo */}
    <div className="flex flex-col gap-6 w-full lg:w-[300px]">
      
      {/* Lista de importancia - tarjeta con vidrio */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all hover:shadow-xl">
        <div className="px-5 py-4 border-b border-gray-100/80 bg-gradient-to-r from-amber-50/80 to-orange-50/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl drop-shadow">⭐</span> Lista de importancia
              </h2>
            </div>
            <span className="text-xs bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full text-amber-700 shadow-sm font-medium">
              Prioridad
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-100/60">
          {importancia.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 flex items-center justify-between hover:bg-amber-50/40 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full shadow-sm ${item.prioridad === "alta" ? "bg-red-500 ring-1 ring-red-200" : "bg-yellow-500 ring-1 ring-yellow-200"}`}
                />
                <div>
                  <p className="font-medium text-sm text-gray-800 group-hover:text-gray-900">
                    {item.tarea}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span>📅</span> Vence: {item.fecha}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-amber-600 text-sm transition-all hover:translate-x-0.5">
                Ver →
              </button>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100/80">
          <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1 transition-all hover:gap-2">
            <span>+</span> Agregar tarea importante
          </button>
        </div>
      </div>

      {/* Acceso directo - tarjeta con gradiente y glow */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 transition-all hover:shadow-xl">
        <h2 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚀</span> Acceso directo
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {shortcuts.map((app) => {
            let dominio = "";
            try {
              dominio = new URL(app.url).hostname;
            } catch (e) {
              dominio = "";
            }
            return (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100/60 transition-all group"
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${dominio}&sz=32`}
                  alt={app.nombre}
                  className="w-5 h-5 rounded-sm shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium truncate">
                  {app.nombre}
                </span>
              </a>
            );
          })}
          <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100/60 text-gray-500 transition-all group">
            <span className="text-xl group-hover:scale-110 transition-transform">+</span>
            <span className="text-sm">Añadir</span>
          </button>
        </div>
      </div>
    </div>

    {/* Columna central: Hábitos + Universidad + Páginas secundarias */}
    <div className="flex flex-col gap-6 w-full lg:w-[700px]">
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {/* Tarjeta Hábitos */}
        <div className="bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-200/60 p-5 transition-all hover:shadow-xl hover:scale-[1.02] duration-300 flex flex-col items-center w-full sm:w-[280px] h-[260px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl drop-shadow">🏆</span>
            <h3 className="text-xl font-bold text-gray-800">Hábitos</h3>
            <span className="text-xs bg-emerald-200/80 text-emerald-800 px-2 py-1 rounded-full font-semibold shadow-sm">
              🔥 Racha
            </span>
          </div>
          <ScoreCircle score={puntajeHabitos} size={100} label="Hábitos" />
          <div className="mt-4 w-full">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 font-medium">Completados esta semana</span>
              <span className="font-bold text-emerald-700 bg-emerald-100/50 px-2 py-0.5 rounded-full">
                {puntajeHabitos}%
              </span>
            </div>
            <div className="w-full bg-gray-200/70 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${puntajeHabitos}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">Basado en tus hábitos diarios</p>
        </div>

        {/* Tarjeta Universidad */}
        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-100/50 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/60 p-5 transition-all hover:shadow-xl hover:scale-[1.02] duration-300 flex flex-col items-center w-full sm:w-[280px] h-[260px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl drop-shadow">🎓</span>
            <h3 className="text-xl font-bold text-gray-800">Universidad</h3>
            <span className="text-xs bg-blue-200/80 text-blue-800 px-2 py-1 rounded-full font-semibold shadow-sm">
              Promedio
            </span>
          </div>
          <ScoreCircleUniversity score={puntajeUniversidad} maxScore={20} size={100} />
          <div className="mt-4 w-full">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 font-medium">Rendimiento académico</span>
              <span className="font-bold text-blue-700 bg-blue-100/50 px-2 py-0.5 rounded-full">
                {porcentajeUniversidad}%
              </span>
            </div>
            <div className="w-full bg-gray-200/70 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${porcentajeUniversidad}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">Ponderado por créditos</p>
        </div>
      </div>

      {/* Páginas secundarias - tarjeta con grid responsivo */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 transition-all hover:shadow-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <span className="text-2xl">📌</span> Páginas secundarias
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { id: 1, nombre: "Portal de estudiantes", url: "https://estudiante.upc.edu.pe/" },
            { id: 2, nombre: "UPC", url: "https://aulavirtual.upc.edu.pe/ultra/profile" },
            { id: 3, nombre: "GitHub", url: "https://github.com/Marcoandres-Mc" },
            { id: 4, nombre: "NoteBookLm", url: "https://notebooklm.google.com/" },
            { id: 5, nombre: "DiagramaUML", url: "https://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa700001" },
            { id: 6, nombre: "Google Drive", url: "https://drive.google.com" },
            { id: 7, nombre: "Classroom", url: "https://classroom.google.com" },
            { id: 8, nombre: "ChatGPT", url: "https://chat.openai.com" },
            { id: 9, nombre: "Figma", url: "https://figma.com" },
            { id: 10, nombre: "Stack Overflow", url: "https://stackoverflow.com" }
          ].map((pag) => (
            <div
              key={pag.id}
              className="relative bg-white/70 rounded-xl p-3 text-center hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200/80 group hover:border-amber-300/50"
              onClick={() => window.open(pag.url, "_blank")}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // función eliminar
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-sm"
              >
                ✕
              </button>
              <img
                src={`https://www.google.com/s2/favicons?domain=${new URL(pag.url).hostname}&sz=64`}
                alt={pag.nombre}
                className="w-10 h-10 mx-auto mb-2 rounded-md shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <p className="font-medium text-gray-800 text-xs truncate group-hover:text-amber-700">
                {pag.nombre}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Columna derecha: Calendario racha + Acceso rápido secciones */}
    <div className="flex flex-col gap-6 w-full lg:w-[300px]">
      
      {/* Calendario de racha - gradiente con efecto glass */}
      <div className="bg-gradient-to-br from-indigo-500/90 to-purple-600/90 backdrop-blur-sm rounded-2xl shadow-xl p-5 text-white border border-white/20 transition-all hover:shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-bold flex items-center gap-1">
            🔥 Racha actual
          </h2>
          <span className="bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full font-medium">
            días seguidos
          </span>
        </div>
        <div className="text-5xl font-extrabold mb-2 drop-shadow-lg">{rachaActual}</div>
        <p className="text-indigo-100 text-sm mb-5">✨ ¡Excelente! Sigue así.</p>
        <div className="flex justify-between text-xs text-indigo-200 mb-2 px-1">
          <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        <div className="flex justify-between gap-1">
          {[1, 1, 0, 1, 1, 0, 1].map((activo, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                activo 
                  ? "bg-white/30 text-white shadow-sm ring-1 ring-white/40" 
                  : "bg-white/10 text-white/50"
              }`}
            >
              {activo ? "✓" : "—"}
            </div>
          ))}
        </div>
      </div>

      {/* Acceso rápido a secciones MTH */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-5 transition-all hover:shadow-xl">
        <h2 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚀</span> Acceso rápido a secciones
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {navSections.map((section) => (
            <a
              key={section.name}
              href={section.href}
              className={`group bg-gradient-to-br ${section.gradient} rounded-xl p-3 text-center transition-all duration-200 hover:scale-105 hover:shadow-md border ${section.border} ${section.hoverBorder}`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform drop-shadow">
                {section.icon}
              </div>
              <p className="font-semibold text-gray-800 text-sm">{section.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</main>
      </div>
  );
}
