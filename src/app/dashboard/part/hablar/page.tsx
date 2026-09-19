// src/app/dashboard/influencia/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/app/dashboard/components/Nav";
import ScoreCircle from "@/components/ScoreCircle";

export default function InfluenciaPage() {
  const router = useRouter();

  // --- Nivel de influencia ---
  const [nivelInfluencia, setNivelInfluencia] = useState(68);

  // --- Frases de poder ---
  const [frasePractica, setFrasePractica] = useState("");
  const [frasesGuardadas, setFrasesGuardadas] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("influencia_frases");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // --- Documento y práctica ---
  const [documentoLink, setDocumentoLink] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem("influencia_documento") || "";
    } catch {
      return "";
    }
  });
  const [mostrarEditorDocumento, setMostrarEditorDocumento] = useState(false);

  useEffect(() => {
    localStorage.setItem("influencia_documento", documentoLink);
  }, [documentoLink]);

  useEffect(() => {
    localStorage.setItem("influencia_frases", JSON.stringify(frasesGuardadas));
  }, [frasesGuardadas]);

  const guardarFrase = () => {
    if (frasePractica.trim()) {
      setFrasesGuardadas([frasePractica, ...frasesGuardadas]);
      setFrasePractica("");
    }
  };

  // --- Checklist ---
  const [checklist, setChecklist] = useState([
    { id: 1, texto: "Mantener contacto visual", completado: false },
    { id: 2, texto: "Usar pausas efectivas", completado: false },
    { id: 3, texto: "Escuchar activamente", completado: false },
    { id: 4, texto: "Hablar con convicción", completado: false },
  ]);

  const toggleChecklist = (id: number) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, completado: !item.completado } : item))
    );
  };

  const completados = checklist.filter(c => c.completado).length;
  const totalChecklist = checklist.length;

  // --- Tips ---
  const [tipDelDia, setTipDelDia] = useState(
    "La primera impresión cuenta: sonríe, saluda con firmeza y muestra seguridad."
  );

  const tips = [
    "Usa el nombre de la persona para generar cercanía.",
    "El 55% de la comunicación es lenguaje corporal. Postura abierta.",
    "El 38% es tono de voz. Varía tu entonación para mantener interés.",
    "Cuenta historias cortas: el cerebro retiene mejor las anécdotas.",
    "Haz preguntas abiertas para involucrar a tu interlocutor.",
    "La reciprocidad: da algo de valor antes de pedir algo.",
    "Prueba social: menciona casos de éxito similares.",
    "Autoridad: respalda tus argumentos con datos o referencias.",
  ];

  const cambiarTip = () => {
    const nuevo = tips[Math.floor(Math.random() * tips.length)];
    setTipDelDia(nuevo);
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <span>🎙️</span> Oratoria & Influencia
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Habla con poder, convence con ética y lidera con tu voz.
            </p>
          </div>

          {/* Grid de 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda (2/3) - Contenido principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Material de estudio y práctica */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <span>📚</span> Material de estudio y práctica
                </h3>

                {/* Documento */}
                <div className="mb-5">
                  <div className="flex items-center gap-2">
                    <a
                      href="https://docs.google.com/document/d/1U0XhbAQnTAmu2KyHFNPsOTxd0nqW1SgLQrz3H0d2WQU/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-2xl">
                        📄
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">Documento</p>
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
                    <a
                      href="https://miro.com/app/board/uXjVH6_7PYI=/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-2xl">
                        🤑
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">Vender</p>
                        <p className="text-xs text-gray-500">Explicacion y mejora en el habla</p>
                      </div>
                      <span className="text-gray-300 group-hover:text-blue-500 transition text-sm">→</span>
                    </a>
                  </div>

                  {mostrarEditorDocumento && (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="url"
                        value={documentoLink}
                        onChange={(e) => setDocumentoLink(e.target.value)}
                        placeholder="Pega el enlace a tu documento (Google Docs, PDF, etc.)"
                        className="flex-1 p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => setMostrarEditorDocumento(false)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm transition"
                      >
                        Guardar
                      </button>
                    </div>
                  )}
                </div>

                {/* Enlaces de práctica - Decorados */}
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-3">🎯 Práctica de oratoria:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="https://unprompted.top/es/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-2xl">
                        🎲
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">Unprompted</p>
                        <p className="text-xs text-gray-500">Investiga y explica temas al azar</p>
                      </div>
                      <span className="text-gray-300 group-hover:text-blue-500 transition text-sm">→</span>
                    </a>
                    <a
                      href="https://improvisador.lat/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-2xl">
                        🗣️
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 group-hover:text-purple-600 transition">Improvisador</p>
                        <p className="text-xs text-gray-500">Practica hablar sin preparación</p>
                      </div>
                      <span className="text-gray-300 group-hover:text-purple-500 transition text-sm">→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Tip del día */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <span>💡</span> Tip de oratoria
                    </h3>
                    <p className="text-gray-700 text-lg italic mt-2">{tipDelDia}</p>
                  </div>
                  <button
                    onClick={cambiarTip}
                    className="text-xs bg-white/80 hover:bg-white px-3 py-1.5 rounded-full text-amber-700 border border-amber-200 transition"
                  >
                    Nuevo tip
                  </button>
                </div>
              </div>

              {/* Principios de persuasión */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <span>🧠</span> Principios de persuasión
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { principio: "Reciprocidad", desc: "Da valor primero, luego pide." },
                    { principio: "Escasez", desc: "Destaca lo exclusivo o limitado." },
                    { principio: "Autoridad", desc: "Muestra credibilidad y conocimiento." },
                    { principio: "Consistencia", desc: "Compromisos pequeños llevan a grandes." },
                    { principio: "Simpatía", desc: "Genera afinidad, sonríe, escucha." },
                    { principio: "Prueba social", desc: "Comparte casos de éxito." },
                  ].map((p) => (
                    <div key={p.principio} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition">
                      <h4 className="text-blue-700 font-bold">{p.principio}</h4>
                      <p className="text-gray-600 text-sm">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storytelling */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">📖 Storytelling en 3 pasos</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Para cautivar, cuenta una historia: <span className="font-medium">1</span> Un personaje, <span className="font-medium">2</span> Un problema, <span className="font-medium">3</span> Una solución.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm border border-gray-200">
                  <span className="text-blue-600 font-medium">Ejemplo:</span> Cuando empecé a hablar en público, temblaba. Pero un día decidí practicar 5 minutos al día. Hoy hablo con seguridad.
                </div>
              </div>
            </div>

            {/* Columna derecha (1/3) - Estadísticas y seguimiento */}
            <div className="space-y-6">
              {/* Nivel de influencia */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">💪 Tu nivel de influencia</h2>
                <div className="flex justify-center">
                  <ScoreCircle score={nivelInfluencia} size={140} />
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  Basado en tus ejercicios de oratoria y persuasión
                </p>
                <button
                  onClick={() => setNivelInfluencia(Math.min(100, nivelInfluencia + 5))}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm transition"
                >
                  + Practicar (sube nivel)
                </button>
              </div>

              {/* Frases de poder */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Frase de poder</h3>
                <textarea
                  value={frasePractica}
                  onChange={(e) => setFrasePractica(e.target.value)}
                  placeholder="Escribe una frase que quieras practicar (ej. una presentación, un argumento de venta, etc.)"
                  className="w-full p-3 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 focus:ring-2 focus:ring-blue-400 resize-none"
                  rows={3}
                />
                <button
                  onClick={guardarFrase}
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl hover:shadow-md transition"
                >
                  Guardar y practicar
                </button>
                {frasesGuardadas.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm mb-2">Tus frases guardadas:</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {frasesGuardadas.map((f, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-2 text-gray-700 text-sm border border-gray-100">
                          “{f}”
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Checklist diario */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  ✅ Checklist diario
                </h3>
                <div className="space-y-3">
                  {checklist.map(item => (
                    <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={item.completado}
                        onChange={() => toggleChecklist(item.id)}
                        className="w-5 h-5 rounded border-gray-300 accent-blue-600"
                      />
                      <span className={`text-gray-700 group-hover:text-gray-900 transition ${item.completado ? "line-through text-gray-400" : ""}`}>
                        {item.texto}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 text-gray-500 text-sm">
                  Progreso: {completados}/{totalChecklist}
                </div>
              </div>

              {/* Frase motivacional */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-5 text-center">
                <span className="text-3xl block mb-2">🗣️</span>
                <p className="text-gray-700 italic text-sm">
                  La gente olvidará lo que dijiste, olvidará lo que hiciste, pero nunca olvidará cómo los hiciste sentir.
                </p>
                <p className="text-gray-400 text-xs mt-2">— Maya Angelou</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}