// src/app/dashboard/mindset/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";

export default function MindsetPage() {
  // Métricas de mentalidad
  const [mentalidadGeneral, setMentalidadGeneral] = useState(72);
  const [pensamientoPositivo, setPensamientoPositivo] = useState(68);
  const [autoconocimiento, setAutoconocimiento] = useState(65);
  const [gestionEmocional, setGestionEmocional] = useState(70);
  const [resiliencia, setResiliencia] = useState(75);
  
  const [rachaAfirmaciones, setRachaAfirmaciones] = useState(7);
  const [diarioEscrito, setDiarioEscrito] = useState(12); // días este mes
  const [metaDiario, setMetaDiario] = useState(20);
  
  // Afirmaciones diarias
  const [afirmacionDiaria, setAfirmacionDiaria] = useState(
    "Soy capaz de lograr todo lo que me propongo con disciplina y fe."
  );
  
  const afirmaciones = [
    "Hoy elijo creer en mí mismo y en mis capacidades.",
    "Mis pensamientos crean mi realidad, elijo pensamientos positivos.",
    "Cada desafío es una oportunidad para crecer.",
    "Soy suficiente tal como soy en este momento.",
    "Mi mente está tranquila, mi corazón está en paz.",
    "Aprendo de mis errores y sigo adelante con más fuerza.",
    "Merezco cosas buenas y las recibo con gratitud.",
  ];
  
  // Pensamientos del día (journaling rápido)
  const [pensamientoDia, setPensamientoDia] = useState("");
  const [entradasDiario, setEntradasDiario] = useState([
    { id: 1, fecha: "2025-04-07", texto: "Hoy me sentí muy productivo. Logré terminar mis tareas temprano." },
    { id: 2, fecha: "2025-04-06", texto: "Aprendí a manejar mejor mi ansiedad con respiración profunda." },
  ]);
  
  // Recursos de mentalidad (libros, podcasts, cursos)
  const [recursos, setRecursos] = useState([
    { id: 1, nombre: "Los 7 hábitos de la gente altamente efectiva", url: "https://www.amazon.com/dp/1982137274", categoria: "📖 Libro" },
    { id: 2, nombre: "El poder de los hábitos", url: "https://www.amazon.com/dp/081298160X", categoria: " Libro" },
    { id: 3, nombre: "Podcast: El Podcast de Marco", url: "https://open.spotify.com/show/example", categoria: "🎙️ Podcast" },
    { id: 4, nombre: "Mindset - Carol Dweck (resumen)", url: "https://www.youtube.com/watch?v=8n6E3M8w6FQ", categoria: "🎥 Video" },
  ]);
  
  const cambiarAfirmacion = () => {
    const nueva = afirmaciones[Math.floor(Math.random() * afirmaciones.length)];
    setAfirmacionDiaria(nueva);
  };
  
  const agregarRecurso = () => {
    const nombre = prompt("Nombre del recurso:", "");
    if (!nombre) return;
    const url = prompt("URL (opcional):", "https://");
    if (!url) return;
    const categoria = prompt("Categoría (📖 Libro, 🎙️ Podcast, 🎥 Video, 📚 Blog):", "📖 Libro");
    const nuevoId = Math.max(...recursos.map(r => r.id), 0) + 1;
    setRecursos([...recursos, { id: nuevoId, nombre, url, categoria: categoria || "📖 Libro" }]);
  };
  
  const eliminarRecurso = (id: number) => {
    if (confirm("¿Eliminar este recurso?")) {
      setRecursos(recursos.filter(r => r.id !== id));
    }
  };
  
  const guardarPensamiento = () => {
    if (!pensamientoDia.trim()) return;
    const nuevaEntrada = {
      id: Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      texto: pensamientoDia,
    };
    setEntradasDiario([nuevaEntrada, ...entradasDiario]);
    setPensamientoDia("");
  };
  
  const progresoDiario = Math.min(100, (diarioEscrito / metaDiario) * 100);
  const mentalidadPromedio = Math.round((pensamientoPositivo + autoconocimiento + gestionEmocional + resiliencia) / 4);
  
  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-50 to-gray-100 p-10">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-4xl">🧠</span> Mentalidad y desarrollo personal
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tarjeta de mentalidad general */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-100/40 rounded-2xl shadow-md border border-orange-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center">
              <ScoreCircle score={mentalidadGeneral} size={140} />
              <p className="text-sm font-semibold text-orange-700 mt-2">Mentalidad general</p>
              <p className="text-xs text-gray-500">Promedio de todas las áreas</p>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between border-b border-orange-200 pb-2">
                <span className="text-gray-600">💪 Resiliencia</span>
                <span className="font-bold text-orange-700">{resiliencia}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">🎯 Autoconocimiento</span>
                <span className="font-bold text-orange-700">{autoconocimiento}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">🔥 Racha de afirmaciones</span>
                <span className="font-bold text-orange-700">{rachaAfirmaciones} días</span>
              </div>
            </div>
          </div>
          
          {/* Métricas detalladas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> Áreas de desarrollo mental
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>💭 Pensamiento positivo</span>
                  <span className="font-bold">{pensamientoPositivo}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full" style={{ width: `${pensamientoPositivo}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🔍 Autoconocimiento</span>
                  <span className="font-bold">{autoconocimiento}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2.5 rounded-full" style={{ width: `${autoconocimiento}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🌊 Gestión emocional</span>
                  <span className="font-bold">{gestionEmocional}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2.5 rounded-full" style={{ width: `${gestionEmocional}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>⚡ Resiliencia</span>
                  <span className="font-bold">{resiliencia}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2.5 rounded-full" style={{ width: `${resiliencia}%` }} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Afirmación del día */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-sm border border-indigo-200 p-5">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <span>✨</span> Afirmación del día
                </h3>
                <p className="text-gray-700 italic text-lg">{afirmacionDiaria}</p>
              </div>
              <button
                onClick={cambiarAfirmacion}
                className="text-xs bg-white/80 hover:bg-white px-3 py-1.5 rounded-full text-purple-600 border border-purple-200 transition"
              >
                Nueva frase
              </button>
            </div>
          </div>
          
          {/* Journaling rápido */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span> Pensamiento del día
            </h2>
            <textarea
              value={pensamientoDia}
              onChange={(e) => setPensamientoDia(e.target.value)}
              placeholder="Escribe cómo te sientes, qué aprendiste hoy o algo por lo que estás agradecido..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
              rows={3}
            />
            <button
              onClick={guardarPensamiento}
              className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm"
            >
              Guardar reflexión
            </button>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Últimas reflexiones</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {entradasDiario.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                    <span className="text-xs text-gray-400">{entry.fecha}</span>
                    <p className="text-gray-700 mt-1">{entry.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Columna derecha (1/3) */}
        <div className="space-y-6">
          {/* Meta del diario */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
              <span>📓</span> Diario personal
            </h3>
            <div className="text-3xl font-bold text-orange-600 mb-2">{diarioEscrito} / {metaDiario}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progresoDiario}%` }} />
            </div>
            <p className="text-xs text-gray-400">Días escritos este mes</p>
          </div>
          
          {/* Recursos recomendados */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-xl">📚</span> Recursos de mentalidad
              </h2>
              <button
                onClick={agregarRecurso}
                className="text-orange-600 text-sm bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 transition"
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
          
          {/* Tip del día */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-sm border border-amber-200 p-5">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <span>💡</span> Tip mental
            </h3>
            <p className="text-sm text-gray-600">
              La calidad de tus pensamientos determina la calidad de tu vida. Dedica 5 minutos cada mañana a visualizar tu día ideal.
            </p>
          </div>
          
          {/* Frase motivadora */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            <span className="text-3xl mb-2 block">🌟</span>
            <p className="text-sm text-gray-600 italic">
              La mente lo es todo. En lo que pienses, te convertirás.
            </p>
            <p className="text-xs text-gray-400 mt-2">— Buda</p>
          </div>
        </div>
      </div>
    </div>
  );
}