// src/app/dashboard/mindset/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";
import Nav from "@/app/dashboard/components/Nav";
import FeatureCard from "../../components/FeatureCard";

export default function MindsetPage() {
  // Métricas de mentalidad
  const [mentalidadGeneral, setMentalidadGeneral] = useState(72);
  const [pensamientoPositivo, setPensamientoPositivo] = useState(68);
  const [autoconocimiento, setAutoconocimiento] = useState(65);
  const [gestionEmocional, setGestionEmocional] = useState(70);
  const [resiliencia, setResiliencia] = useState(75);

  const [rachaAfirmaciones, setRachaAfirmaciones] = useState(7);
  const [diarioEscrito, setDiarioEscrito] = useState(12);
  const [metaDiario, setMetaDiario] = useState(20);

  // Afirmaciones diarias
  const [afirmacionDiaria, setAfirmacionDiaria] = useState(
    "Soy capaz de lograr todo lo que me propongo con disciplina y fe.",
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
    {
      id: 1,
      fecha: "2025-04-07",
      texto: "Hoy me sentí muy productivo. Logré terminar mis tareas temprano.",
    },
    {
      id: 2,
      fecha: "2025-04-06",
      texto: "Aprendí a manejar mejor mi ansiedad con respiración profunda.",
    },
  ]);

  // Recursos de mentalidad
  const [recursos, setRecursos] = useState([
    {
      id: 1,
      nombre: "Los 7 hábitos de la gente altamente efectiva",
      url: "https://www.amazon.com/dp/1982137274",
      categoria: "📖 Libro",
    },
    {
      id: 2,
      nombre: "El poder de los hábitos",
      url: "https://www.amazon.com/dp/081298160X",
      categoria: "📖 Libro",
    },
    {
      id: 3,
      nombre: "Podcast: El Podcast de Marco",
      url: "https://open.spotify.com/show/example",
      categoria: "🎙️ Podcast",
    },
    {
      id: 4,
      nombre: "Mindset - Carol Dweck (resumen)",
      url: "https://www.youtube.com/watch?v=8n6E3M8w6FQ",
      categoria: "🎥 Video",
    },
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
    const categoria = prompt(
      "Categoría (📖 Libro, 🎙️ Podcast, 🎥 Video, 📚 Blog):",
      "📖 Libro",
    );
    const nuevoId = Math.max(...recursos.map((r) => r.id), 0) + 1;
    setRecursos([
      ...recursos,
      { id: nuevoId, nombre, url, categoria: categoria || "📖 Libro" },
    ]);
  };

  const eliminarRecurso = (id: number) => {
    if (confirm("¿Eliminar este recurso?")) {
      setRecursos(recursos.filter((r) => r.id !== id));
    }
  };

  const guardarPensamiento = () => {
    if (!pensamientoDia.trim()) return;
    const nuevaEntrada = {
      id: Date.now(),
      fecha: new Date().toISOString().split("T")[0],
      texto: pensamientoDia,
    };
    setEntradasDiario([nuevaEntrada, ...entradasDiario]);
    setPensamientoDia("");
  };

  const progresoDiario = Math.min(100, (diarioEscrito / metaDiario) * 100);
  const mentalidadPromedio = Math.round(
    (pensamientoPositivo + autoconocimiento + gestionEmocional + resiliencia) /
      4,
  );

  return (
    <>
      <Nav />
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
          {/* Encabezado con gradiente y glow */}
          <div className="text-center md:text-left">
            <h1 className="inline-flex items-center gap-3 text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-500 bg-clip-text text-transparent">
              <span className="text-5xl drop-shadow-lg">🧠</span>
              Mentalidad y desarrollo personal
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto md:mx-0">
              Cultiva una mente fuerte, positiva y resiliente. Cada pequeño paso
              cuenta.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Métricas detalladas - tarjeta con gradiente sutil */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80 p-6 transition-all hover:shadow-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Áreas de desarrollo
                  mental
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      label: "💭 Pensamiento positivo",
                      value: pensamientoPositivo,
                      color: "from-green-400 to-emerald-500",
                    },
                    {
                      label: "🔍 Autoconocimiento",
                      value: autoconocimiento,
                      color: "from-blue-400 to-indigo-500",
                    },
                    {
                      label: "🌊 Gestión emocional",
                      value: gestionEmocional,
                      color: "from-purple-400 to-pink-500",
                    },
                    {
                      label: "⚡ Resiliencia",
                      value: resiliencia,
                      color: "from-orange-400 to-red-500",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-bold text-gray-800">
                          {item.value}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${item.color} h-2.5 rounded-full transition-all duration-700 ease-out group-hover:scale-x-105`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80 p-6 transition-all hover:shadow-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Áreas de desarrollo
                  mental
                </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FeatureCard
                  icon="🧘"
                  title="Meditación guiada"
                  subtitle="5 minutos diarios"
                  description="Reduce el estrés y mejora tu enfoque con sesiones breves de mindfulness."
                  badge="Popular"
                >
                  <button className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition">
                    Comenzar
                  </button>
                </FeatureCard>

                <FeatureCard
                  image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop"
                  title="Pacto de grandeza"
                  subtitle="Despertarse temprano y con propósito"
                  description="Prometo dar lo mejor de mi hasta terminar el dia, sin importar lo que pase. Cada día es una nueva oportunidad para crecer."
                  gradient="from-purple-50/80 to-pink-50/80"
                  url="./mindset/pacto"
                >
                </FeatureCard>

                <FeatureCard
                  icon="📖"
                  title="Lectura semanal"
                  subtitle="Capítulo 3: El poder del ahora"
                  description="Lee un fragmento y reflexiona sobre cómo aplicarlo en tu vida."
                  onClick={() => alert("Abrir lectura")}
                >
                  <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition">
                    Marcar como leído
                  </button>
                </FeatureCard>

                <FeatureCard
                  image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop"
                  title="Respiración profunda"
                  subtitle="Técnica 4-7-8"
                  description="Inhala 4 seg, retén 7, exhala 8. Calma la ansiedad al instante."
                  badge="Nuevo"
                />
              </div>
              </div>

              {/* Afirmación del día - con efecto de tarjeta flotante */}
              <div className="relative bg-gradient-to-r from-indigo-50/90 to-purple-50/90 backdrop-blur-sm rounded-3xl shadow-md border border-indigo-200/60 p-6 transition-all duration-300 hover:shadow-lg">
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-2xl opacity-50"></div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                      <span className="text-2xl">✨</span> Afirmación del día
                    </h3>
                    <p className="text-gray-700 italic text-xl mt-2 leading-relaxed">
                      {afirmacionDiaria}
                    </p>
                  </div>
                  <button
                    onClick={cambiarAfirmacion}
                    className="shrink-0 text-sm bg-white/70 hover:bg-white px-4 py-2 rounded-full text-purple-700 border border-purple-200 shadow-sm transition-all hover:shadow-md hover:scale-105"
                  >
                    🔄 Nueva frase
                  </button>
                </div>
              </div>

              {/* Journaling rápido - con diseño más limpio */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80 p-6 transition-all hover:shadow-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📝</span> Pensamiento del día
                </h2>
                <textarea
                  value={pensamientoDia}
                  onChange={(e) => setPensamientoDia(e.target.value)}
                  placeholder="Escribe cómo te sientes, qué aprendiste hoy o algo por lo que estás agradecido..."
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none bg-gray-50/50 transition"
                  rows={3}
                />
                <button
                  onClick={guardarPensamiento}
                  className="mt-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                >
                  Guardar reflexión ✨
                </button>

                <div className="mt-8">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <span>📖</span> Últimas reflexiones
                  </h3>
                  <div className="space-y-3 max-h-52 overflow-y-auto pr-2 custom-scrollbar">
                    {entradasDiario.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-gray-50/80 rounded-xl p-4 border-l-4 border-orange-300 hover:shadow-sm transition"
                      >
                        <span className="text-xs text-gray-400 font-mono">
                          {entry.fecha}
                        </span>
                        <p className="text-gray-700 mt-1 text-sm">
                          {entry.texto}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha (1/3) */}
            <div className="space-y-6">
              {/* Tarjeta de mentalidad general - efecto glassmorphism mejorado */}
              <div className="relative group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/30 rounded-3xl -z-10"></div>
                <div className="flex flex-col items-center transform transition-transform group-hover:scale-105">
                  <ScoreCircle score={mentalidadGeneral} size={140} />
                  <p className="text-sm font-bold text-orange-700 mt-3">
                    Mentalidad general
                  </p>
                  <p className="text-xs text-gray-500">
                    Promedio de todas las áreas
                  </p>
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex items-center justify-between border-b border-orange-200/50 pb-2">
                    <span className="text-gray-700 font-medium flex items-center gap-1">
                      💪 Resiliencia
                    </span>
                    <span className="font-bold text-orange-600">
                      {resiliencia}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-orange-200/50 pb-2">
                    <span className="text-gray-700 font-medium flex items-center gap-1">
                      🎯 Autoconocimiento
                    </span>
                    <span className="font-bold text-orange-600">
                      {autoconocimiento}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium flex items-center gap-1">
                      🔥 Racha de afirmaciones
                    </span>
                    <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                      {rachaAfirmaciones} días
                    </span>
                  </div>
                </div>
              </div>
              {/* Meta del diario - tarjeta con contador animado */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80 p-6 text-center transition-all hover:shadow-xl">
                <div className="flex justify-center text-4xl mb-2">📓</div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Diario personal
                </h3>
                <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  {diarioEscrito}{" "}
                  <span className="text-2xl text-gray-400">/ {metaDiario}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${progresoDiario}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Días escritos este mes
                </p>
                <div className="mt-4 text-sm text-orange-600 bg-orange-50 inline-block px-3 py-1 rounded-full">
                  🎯 Meta: {metaDiario} días
                </div>
              </div>

              {/* Recursos recomendados - con hover cards */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80 p-5 transition-all hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-xl">📚</span> Recursos de mentalidad
                  </h2>
                  <button
                    onClick={agregarRecurso}
                    className="text-sm bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
                  >
                    + Añadir
                  </button>
                </div>
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                  {recursos.map((recurso) => (
                    <div
                      key={recurso.id}
                      className="group relative flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-white cursor-pointer transition-all duration-200 hover:shadow-md border border-transparent hover:border-orange-100"
                      onClick={() => window.open(recurso.url, "_blank")}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarRecurso(recurso.id);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-md hover:scale-110"
                      >
                        ✕
                      </button>
                      <div className="w-10 h-10 flex items-center justify-center text-xl bg-white rounded-full shadow-sm">
                        {recurso.categoria.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {recurso.nombre}
                        </p>
                        <span className="text-xs text-gray-400">
                          {recurso.categoria}
                        </span>
                      </div>
                      <span className="text-gray-300 text-sm group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip del día - con borde decorativo */}
              <div className="relative bg-gradient-to-br from-amber-50/80 to-yellow-50/80 backdrop-blur-sm rounded-3xl shadow-md border border-amber-200/60 p-5 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200/30 rounded-full blur-2xl"></div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <span className="text-xl">💡</span> Tip mental
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  La calidad de tus pensamientos determina la calidad de tu
                  vida. Dedica 5 minutos cada mañana a visualizar tu día ideal.
                </p>
                <div className="mt-3 flex justify-end text-xs text-amber-600 font-medium">
                  #Mindfulness
                </div>
              </div>

              {/* Frase motivadora - con efecto cita */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80 p-6 text-center transition-all hover:shadow-xl">
                <div className="text-4xl mb-3 animate-pulse">🌟</div>
                <p className="text-gray-700 italic leading-relaxed">
                  “La mente lo es todo. En lo que pienses, te convertirás.”
                </p>
                <p className="text-xs text-gray-400 mt-3">— Buda</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
