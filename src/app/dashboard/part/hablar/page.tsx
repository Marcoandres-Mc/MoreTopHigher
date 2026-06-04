// src/app/dashboard/influencia/page.tsx
"use client";
import { useState, useEffect } from "react";
import Nav from "@/app/dashboard/components/Nav";
import ScoreCircle from "@/components/ScoreCircle";

export default function InfluenciaPage() {
  // Estado para el nivel de influencia (simulado)
  const [nivelInfluencia, setNivelInfluencia] = useState(68);
  const [frasePractica, setFrasePractica] = useState("");
  const [frasesGuardadas, setFrasesGuardadas] = useState<string[]>([]);
  const [checklist, setChecklist] = useState([
    { id: 1, texto: "Mantener contacto visual", completado: false },
    { id: 2, texto: "Usar pausas efectivas", completado: false },
    { id: 3, texto: "Escuchar activamente", completado: false },
    { id: 4, texto: "Hablar con convicción", completado: false },
  ]);
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

  // Cargar frases guardadas
  useEffect(() => {
    const stored = localStorage.getItem("influencia_frases");
    if (stored) setFrasesGuardadas(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("influencia_frases", JSON.stringify(frasesGuardadas));
  }, [frasesGuardadas]);

  const guardarFrase = () => {
    if (frasePractica.trim()) {
      setFrasesGuardadas([frasePractica, ...frasesGuardadas]);
      setFrasePractica("");
    }
  };

  const toggleChecklist = (id: number) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, completado: !item.completado } : item))
    );
  };

  const cambiarTip = () => {
    const nuevo = tips[Math.floor(Math.random() * tips.length)];
    setTipDelDia(nuevo);
  };

  const completados = checklist.filter(c => c.completado).length;
  const totalChecklist = checklist.length;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
              <span>🎙️</span> Oratoria & Influencia
            </h1>
            <p className="text-purple-200 mt-2 text-lg">Habla con poder, convence con ética y lidera con tu voz.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda: Nivel de influencia + Frases de poder */}
            <div className="space-y-6">
              {/* Medidor de influencia */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 text-center">
                <h2 className="text-white text-xl font-semibold mb-3">💪 Tu nivel de influencia</h2>
                <div className="flex justify-center">
                  <ScoreCircle score={nivelInfluencia} size={140} />
                </div>
                <p className="text-purple-200 text-sm mt-3">
                  Basado en tus ejercicios de oratoria y persuasión
                </p>
                <button
                  onClick={() => setNivelInfluencia(Math.min(100, nivelInfluencia + 5))}
                  className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white text-sm transition"
                >
                  + Practicar (sube nivel)
                </button>
              </div>

              {/* Frases de poder (ejercicio) */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5">
                <h3 className="text-white font-semibold text-lg mb-3">📝 Frase de poder</h3>
                <textarea
                  value={frasePractica}
                  onChange={(e) => setFrasePractica(e.target.value)}
                  placeholder="Escribe una frase que quieras practicar (ej. una presentación, un argumento de venta, etc.)"
                  className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={3}
                />
                <button
                  onClick={guardarFrase}
                  className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl hover:shadow-lg transition"
                >
                  Guardar y practicar
                </button>
                {frasesGuardadas.length > 0 && (
                  <div className="mt-4">
                    <p className="text-white/80 text-sm mb-2">Tus frases guardadas:</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {frasesGuardadas.map((f, idx) => (
                        <div key={idx} className="bg-white/10 rounded-lg p-2 text-white text-sm">
                          “{f}”
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Columna central: Técnicas de influencia */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5">
                <h2 className="text-white text-xl font-semibold flex items-center gap-2 mb-4">
                  <span>🧠</span> Principios de persuasión
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { principio: "Reciprocidad", desc: "Da valor primero, luego pide." },
                    { principio: "Escasez", desc: "Destaca lo exclusivo o limitado." },
                    { principio: "Autoridad", desc: "Muestra credibilidad y conocimiento." },
                    { principio: "Consistencia", desc: "Compromisos pequeños llevan a grandes." },
                    { principio: "Simpatía", desc: "Genera afinidad, sonríe, escucha." },
                    { principio: "Prueba social", desc: "Comparte casos de éxito." },
                  ].map((p) => (
                    <div key={p.principio} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
                      <h4 className="text-purple-300 font-bold">{p.principio}</h4>
                      <p className="text-white/70 text-sm">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip del día */}
              <div className="bg-gradient-to-r from-indigo-600/40 to-purple-600/40 rounded-3xl border border-indigo-400/30 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <span>💡</span> Tip de oratoria
                    </h3>
                    <p className="text-white/90 text-lg italic mt-2">{tipDelDia}</p>
                  </div>
                  <button
                    onClick={cambiarTip}
                    className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-white transition"
                  >
                    Nuevo tip
                  </button>
                </div>
              </div>

              {/* Ejercicio rápido: story cube */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5">
                <h3 className="text-white font-semibold mb-2">📖 Storytelling en 3 pasos</h3>
                <p className="text-white/70 text-sm mb-3">
                  Para cautivar, cuenta una historia: 1) Un personaje, 2) Un problema, 3) Una solución.
                </p>
                <div className="bg-white/5 rounded-xl p-3 text-white text-sm">
                  <span className="text-purple-300">Ejemplo:</span> "Cuando empecé a hablar en público, temblaba. Pero un día decidí practicar 5 minutos al día. Hoy hablo con seguridad."
                </div>
              </div>
            </div>

            {/* Columna derecha: Checklist de comunicación */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5">
                <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
                  ✅ Checklist diario
                </h3>
                <div className="space-y-3">
                  {checklist.map(item => (
                    <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={item.completado}
                        onChange={() => toggleChecklist(item.id)}
                        className="w-5 h-5 rounded border-white/30 bg-white/10 accent-purple-500"
                      />
                      <span className={`text-white/90 group-hover:text-white transition ${item.completado ? "line-through text-white/40" : ""}`}>
                        {item.texto}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-white/20 text-white/70 text-sm">
                  Progreso: {completados}/{totalChecklist}
                </div>
              </div>

              {/* Recursos recomendados */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5">
                <h3 className="text-white font-semibold text-lg mb-3">📚 Recursos para aprender</h3>
                <div className="space-y-2">
                  {[
                    { nombre: "Libro: 'Influencia' de Robert Cialdini", url: "https://www.amazon.com/dp/006124189X" },
                    { nombre: "Ted Talk: Cómo hablar para que otros escuchen", url: "https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen" },
                    { nombre: "Curso: Oratoria en Coursera", url: "https://www.coursera.org/learn/public-speaking" },
                    { nombre: "Podcast: 'The Art of Charm'", url: "https://artofcharm.com/podcast/" },
                  ].map((recurso, idx) => (
                    <a
                      key={idx}
                      href={recurso.url}
                      target="_blank"
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition group"
                    >
                      <span className="text-white/80 text-sm group-hover:text-white">{recurso.nombre}</span>
                      <span className="text-white/40 text-xs">→</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Frase motivacional */}
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl border border-amber-400/30 p-5 text-center">
                <span className="text-3xl block mb-2">🗣️</span>
                <p className="text-white italic">
                  "La gente olvidará lo que dijiste, olvidará lo que hiciste, pero nunca olvidará cómo los hiciste sentir."
                </p>
                <p className="text-white/50 text-xs mt-2">— Maya Angelou</p>
              </div>
            </div>
          </div>

          {/* Botón para volver a Mindset */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => router.push("/dashboard/mindset")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:scale-105 transition shadow-lg"
            >
              Volver a Mindset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}