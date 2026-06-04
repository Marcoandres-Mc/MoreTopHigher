// src/app/dashboard/english/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";
import Nav from "../../components/Nav";

export default function EnglishPage() {
  // Datos de ejemplo (después conectarás a tu base de datos)
  const [nivelIngles, setNivelIngles] = useState(65); // porcentaje de avance (0-100%)
  const [metaSemanal, setMetaSemanal] = useState(10); // horas meta por semana
  const [horasEstudiadas, setHorasEstudiadas] = useState(7); // horas esta semana
  const [racha, setRacha] = useState(12); // días seguidos
  const [palabrasAprendidas, setPalabrasAprendidas] = useState(450);
  const [metaPalabras, setMetaPalabras] = useState(1000);
const [progresoListening, setProgresoListening] = useState(45);
const [metaListening, setMetaListening] = useState(100);

const [progresoWriting, setProgresoWriting] = useState(12);
const [metaWriting, setMetaWriting] = useState(100);

const [progresoReading, setProgresoReading] = useState(30);
const [metaReading, setMetaReading] = useState(80);

const [progresoSpeaking, setProgresoSpeaking] = useState(8);
const [metaSpeaking, setMetaSpeaking] = useState(40);
  // Habilidades (ejemplo)
  const habilidades = [
    { nombre: "Listening", porcentaje: 70 },
    { nombre: "Reading", porcentaje: 80 },
    { nombre: "Speaking", porcentaje: 55 },
    { nombre: "Writing", porcentaje: 60 },
  ];

  // Links de cursos y páginas
  const [links, setLinks] = useState([
    {
      id: 1,
      nombre: "Duolingo",
      url: "https://www.duolingo.com",
      categoria: "app",
    },
    {
      id: 2,
      nombre: "BBC Learning English",
      url: "https://www.bbc.co.uk/learningenglish",
      categoria: "curso",
    },
    {
      id: 3,
      nombre: "Grammarly",
      url: "https://www.grammarly.com",
      categoria: "herramienta",
    },
    {
      id: 4,
      nombre: "YouTube - English Addict",
      url: "https://www.youtube.com/@EnglishAddict",
      categoria: "video",
    },
    {
      id: 5,
      nombre: "Cambridge English",
      url: "https://www.cambridgeenglish.org",
      categoria: "examen",
    },
  ]);

  // Función para agregar nuevo link
  const agregarLink = () => {
    const nombre = prompt("Nombre del curso/página:", "");
    if (!nombre) return;
    const url = prompt("URL completa (incluye https://):", "https://");
    if (!url) return;
    const nuevaCategoria = prompt(
      "Categoría (app, curso, herramienta, video, examen):",
      "curso",
    );
    const nuevoId = Math.max(...links.map((l) => l.id), 0) + 1;
    setLinks([
      ...links,
      { id: nuevoId, nombre, url, categoria: nuevaCategoria || "curso" },
    ]);
  };

  // Función para eliminar link
  const eliminarLink = (id: number) => {
    if (confirm("¿Eliminar este enlace?")) {
      setLinks(links.filter((l) => l.id !== id));
    }
  };

  // Calcular porcentaje de meta semanal
  const progresoMeta = Math.min(100, (horasEstudiadas / metaSemanal) * 100);
  const progresoPalabras = Math.min(
    100,
    (palabrasAprendidas / metaPalabras) * 100,
  );

  return (
    <>
      <Nav />
      <div className="space-y-6 bg-gradient-to-br from-slate-50 to-gray-100 p-10">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Habilidades específicas */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span> Habilidades por área
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habilidades.map((hab) => (
                  <div key={hab.nombre}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{hab.nombre}</span>
                      <span className="font-bold">{hab.porcentaje}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${hab.porcentaje}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metas semanales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <span>⏰</span> Horas de estudio
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {horasEstudiadas} / {metaSemanal} hrs
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${progresoMeta}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Meta semanal: {metaSemanal} horas
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <span>📖</span> Vocabulario
                </h3>
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {palabrasAprendidas} / {metaPalabras}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-600 h-3 rounded-full"
                    style={{ width: `${progresoPalabras}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Palabras aprendidas
                </p>
              </div>

              {/* Listening */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <span>🎧</span> Listening
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {progresoListening} / {metaListening}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${(progresoListening / metaListening) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Ejercicios completados
                </p>
              </div>

              {/* Writing */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <span>✍️</span> Writing
                </h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {progresoWriting} / {metaWriting}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{
                      width: `${(progresoWriting / metaWriting) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Redacciones aprobadas
                </p>
              </div>

              {/* Reading */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <span>📖</span> Reading
                </h3>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {progresoReading} / {metaReading}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-600 h-3 rounded-full"
                    style={{
                      width: `${(progresoReading / metaReading) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Textos leídos</p>
              </div>

              {/* Speaking */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <span>🗣️</span> Speaking
                </h3>
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {progresoSpeaking} / {metaSpeaking}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-pink-600 h-3 rounded-full"
                    style={{
                      width: `${(progresoSpeaking / metaSpeaking) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Diálogos practicados
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha (1/3) - Links de cursos */}
          <div className="space-y-6">
            {/* Tarjeta de nivel general */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100/40 rounded-2xl shadow-md border border-emerald-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center text-center">
                <ScoreCircle score={nivelIngles} size={140} />
                <p className="text-sm font-semibold text-emerald-700 mt-2">
                  Nivel general
                </p>
                <p className="text-xs text-gray-500">Intermedio alto (B2)</p>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <span className="text-gray-600">🎯 Meta del curso</span>
                  <span className="font-bold text-emerald-700">
                    C1 Avanzado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">🔥 Racha actual</span>
                  <span className="font-bold text-orange-600">
                    {racha} días seguidos
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">📅 Última actividad</span>
                  <span className="font-bold text-gray-700">Hoy</span>
                </div>
              </div>
            </div>

            {/* Links a cursos y páginas */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-xl">📚</span> Cursos y recursos
                </h2>
                <button
                  onClick={agregarLink}
                  className="text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
                >
                  + Añadir
                </button>
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="group relative flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarLink(link.id);
                      }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      ✕
                    </button>
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=32`}
                      alt={link.nombre}
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {link.nombre}
                      </p>
                      <span className="text-xs text-gray-400">
                        {link.categoria}
                      </span>
                    </div>
                    <span className="text-gray-300 text-xs">→</span>
                  </div>
                ))}
                {links.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">
                    No hay enlaces. Añade tu primer curso.
                  </p>
                )}
              </div>
            </div>

            {/* Tarjeta de recomendación */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span>💡</span> Tip del día
              </h3>
              <p className="text-sm text-gray-600">
                Escucha 15 minutos de podcast en inglés antes de dormir. Mejora
                tu listening sin esfuerzo.
              </p>
              <button className="mt-3 text-xs text-amber-700 hover:text-amber-900 font-medium">
                Ver más consejos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
