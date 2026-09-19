// src/app/dashboard/mindset/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";
import Nav from "@/app/dashboard/components/Nav";
import FeatureCard from "../../components/FeatureCard";
import Image from "next/image";

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
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <span>📚</span> Material de estudio y práctica
            </h3>

            {/* Documento */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <a
                  href="https://miro.com/app/board/uXjVHCBvOeQ=/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-2xl">
                    📒
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">Estilo de vida</p>
                    <p className="text-xs text-gray-500">Explicacion y mejora en el habla</p>
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-500 transition text-sm">→</span>
                </a>
                <a
                  href="https://miro.com/app/board/uXjVH6_7PYI=/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-2xl">
                    📒
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">Miro</p>
                    <p className="text-xs text-gray-500">Explicacion y mejora en el habla</p>
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-500 transition text-sm">→</span>
                </a>
              </div>
            </div>
          </div>
              

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80 p-6 transition-all hover:shadow-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Áreas de desarrollo
                  mental
                </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FeatureCard
                  image="https://cms-images.acc.indazn.com/di/library/DAZN_News/97/25/fernando-alonso-ferrari-f1_z0dtc736uawf1lfb1q3gh5r8v.jpg?t=-310499886&quality=85&w=684"
                  title="Pacto de grandeza"
                  subtitle="Despertarse temprano y con propósito"
                  description="Prometo dar lo mejor de mi hasta terminar el dia, sin importar lo que pase. Cada día es una nueva oportunidad para crecer."
                  gradient="from-purple-50/80 to-pink-50/80"
                  url="./mindset/pacto"
                >
                </FeatureCard>

                <FeatureCard
                  image="https://images.ecestaticos.com/zHKprwfvOxxwE6xnf9sqml4JKlE=/0x114:1997x1161/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd32%2F9dc%2Fc7d%2Fd329dcc7df18c141c1dcbf7c0eeb451e.jpg"
                  title="MarCode Time"
                  subtitle="Modo de enfoque, disciplina y ejecución."
                  description="Lo uso cuando necesito dejar de dudar, controlar la presión y darlo todo por el objetivo que tengo"
                  url="./mindset/mentalMode"
                >
                  <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition">
                    Marcar como leído
                  </button>
                </FeatureCard>

                <FeatureCard
                  image="https://i.scdn.co/image/ab67616d0000b273296d05fd4b9e99e88f28eac1"
                  title="Repeat it"
                  subtitle="repetir afirmaciones, hábitos o estudios."
                  description="Con un enfoque motivador que refuerza la constancia."
                  badge="Nuevo"
                />
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
              {/* Meta del diario - tarjeta con contador animado */}
              <a href="/dashboard/part/mindset/libros" className="block">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/80  text-center transition-all hover:shadow-xl">
                <img className="flex justify-center text-4xl mb-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlBbLsndNvuXKhdNCS830yEwYdn-JzMmwZtOS9QZh3UtCHJPeGomxKVtBZ&s=10" alt="Libros"  />
                <h3 className="font-semibold text-gray-800 mb-3">
                  Libros
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
              </a>
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
