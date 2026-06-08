"use client";
import { useState, type ReactNode } from "react";

type Paso = {
  id: number;
  titulo: string;
  contenido: ReactNode;
  colorFondo: string;
  colorBorde: string;
};

export default function PactoGrandezaPage() {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({
    comoTeSientes: "",
    queConseguiras: "",
    masImportante: "",
  });

  // Estados para los pasos interactivos (agradecimiento, pensamientos)
  const [fraseAgradecimiento, setFraseAgradecimiento] = useState("");
  const [fraseGraciasPor, setFraseGraciasPor] = useState("");
  const [fraseAgradecidoPor, setFraseAgradecidoPor] = useState("");
  const [fraseGraciasVida, setFraseGraciasVida] = useState("");

  const [pensamientoGanador1, setPensamientoGanador1] = useState("");
  const [pensamientoGanador2, setPensamientoGanador2] = useState("");
  const [pensamientoGanador3, setPensamientoGanador3] = useState("");
  const [pensamientoGanador4, setPensamientoGanador4] = useState("");

  const avanzar = () => {
    if (pasoActual < pasos.length - 1) setPasoActual(pasoActual + 1);
  };
  const retroceder = () => {
    if (pasoActual > 0) setPasoActual(pasoActual - 1);
  };

  // --- Definición de cada paso ---
  const pasos: Paso[] = [
    {
      id: 1,
      titulo: "🌿 PAZ Y TRANQUILIDAD",
      contenido: (
        <div className="space-y-6 text-center">
          <div className="bg-amber-500/20 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
            <span className="text-5xl">📿</span>
          </div>
          <p className="text-white text-lg font-medium">
            Ten el collar en la mano.
          </p>
          <p className="text-gray-200">
            Respira profundo y no pienses en nada. Solo siente el presente.
          </p>
          <div className="animate-pulse text-amber-300 text-sm">
            🌬️ Inhala... exhala...
          </div>
        </div>
      ),
      colorFondo: "from-indigo-900/80 to-purple-900/80",
      colorBorde: "border-indigo-400/50",
    },
    {
      id: 2,
      titulo: "🙏 AGRADECIMIENTO",
      contenido: (
        <div className="space-y-4">
          <p className="text-white text-center">
            Completa las frases desde el corazón:
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Me siento agradecido..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={fraseAgradecimiento}
              onChange={(e) => setFraseAgradecimiento(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gracias por..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={fraseGraciasPor}
              onChange={(e) => setFraseGraciasPor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Estoy agradecido porque tendré..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={fraseAgradecidoPor}
              onChange={(e) => setFraseAgradecidoPor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gracias vida porque conseguiré..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={fraseGraciasVida}
              onChange={(e) => setFraseGraciasVida(e.target.value)}
            />
          </div>
          <p className="text-emerald-300 italic text-center mt-4">
            “Agradezco a la vida porque tendré un maravilloso día”
          </p>
        </div>
      ),
      colorFondo: "from-emerald-900/80 to-teal-900/80",
      colorBorde: "border-emerald-400/50",
    },
    {
      id: 3,
      titulo: "🏆 PENSAMIENTOS DE GANADOR",
      contenido: (
        <div className="space-y-4">
          <p className="text-white text-center">
            Escribe tus afirmaciones de poder:
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Soy el mejor..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={pensamientoGanador1}
              onChange={(e) => setPensamientoGanador1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Todo me pertenece..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={pensamientoGanador2}
              onChange={(e) => setPensamientoGanador2(e.target.value)}
            />
            <input
              type="text"
              placeholder="Soy increíble..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={pensamientoGanador3}
              onChange={(e) => setPensamientoGanador3(e.target.value)}
            />
            <input
              type="text"
              placeholder="Me comportaré como el mejor de todos..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={pensamientoGanador4}
              onChange={(e) => setPensamientoGanador4(e.target.value)}
            />
          </div>
          <div className="bg-white/5 rounded-2xl p-2 text-center border-l-4 border-amber-400">
            <p className="text-amber-200 italic text-lg">
              “Prometo dar lo mejor de mí hasta terminar el día”
            </p>
          </div>
        </div>
      ),
      colorFondo: "from-amber-900/80 to-orange-900/80",
      colorBorde: "border-amber-400/50",
    },
    {
      id: 4,
      titulo: "🎙️ ENTREVISTA INTERIOR",
      contenido: (
        <div className="space-y-2">
          <div className="space-y-2">
            <label className="text-white font-medium block">¿Cómo te sientes?</label>
            <textarea
              rows={2}
              className="w-full p-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={respuestas.comoTeSientes}
              onChange={(e) => setRespuestas({ ...respuestas, comoTeSientes: e.target.value })}
              placeholder="Escribe aquí..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-white font-medium block">¿Qué pasará o conseguirás hoy día?</label>
            <textarea
              rows={2}
              className="w-full p-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={respuestas.queConseguiras}
              onChange={(e) => setRespuestas({ ...respuestas, queConseguiras: e.target.value })}
              placeholder="Escribe aquí..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-white font-medium block">¿Qué será lo más importante o desafiante de hoy?</label>
            <textarea
              rows={2}
              className="w-full p-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={respuestas.masImportante}
              onChange={(e) => setRespuestas({ ...respuestas, masImportante: e.target.value })}
              placeholder="Escribe aquí..."
            />
          </div>
        </div>
      ),
      colorFondo: "from-blue-900/80 to-cyan-900/80",
      colorBorde: "border-blue-400/50",
    },
    {
      id: 5,
      titulo: "✨ DECLARACIÓN FINAL",
      contenido: (
        <div className="space-y-6 text-center">
          <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl p-6 border border-amber-400/50">
            <h3 className="text-2xl font-bold text-amber-200">AGRADEZCO A LA VIDA PORQUE PRONTO TENDRE ESTO</h3>
            <div className="mt-4 space-y-2 text-white text-lg">
              <p className="font-mono text-amber-300">⚡ ATLAXIO</p>
              <p className="font-mono text-amber-300">✨ Décimo superior</p>
            </div>
            <p className="mt-6 text-gray-200 italic">
              “Compórtate como si ya lo tuvieras, para que física y mentalmente estés preparado de recibir todo lo que me pertenece.”
            </p>
          </div>
          <div className="text-sm text-white/60">
            El pacto está sellado. Confía en el proceso.
          </div>
        </div>
      ),
      colorFondo: "from-rose-900/80 to-pink-900/80",
      colorBorde: "border-rose-400/50",
    },
  ];

  const paso = pasos[pasoActual];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden">
        {/* Blobs decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-4 pt-8">
          {/* Tarjeta del paso actual */}
          <div
            className={`bg-gradient-to-br ${paso.colorFondo} backdrop-blur-xl rounded-3xl border ${paso.colorBorde} shadow-2xl p-6 md:p-8 transition-all duration-500`}
          >
            <div className="flex justify-between items-center mb-4 text-white/70 text-sm">
              <span>Paso {pasoActual + 1} de {pasos.length}</span>
              <span className="capitalize">{paso.titulo.split(" ")[0]}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              {paso.titulo}
            </h2>
            <div className="min-h-[320px]">{paso.contenido}</div>

            {/* Botones de navegación */}
            <div className="flex justify-between mt-4 gap-3">
              <button
                onClick={retroceder}
                disabled={pasoActual === 0}
                className="px-5 py-2 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition"
              >
                ← Anterior
              </button>
              {pasoActual === pasos.length - 1 ? (
                <a
                  href="/dashboard/part/mindset"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:scale-105 transition"
                >
                  Completar Pacto
                </a>
              ) : (
                <button
                  onClick={avanzar}
                  className="px-5 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
                >
                  Siguiente →
                </button>
              )}
            </div>
          </div>

          {/* Indicador de progreso */}
          <div className="flex justify-center gap-2 mt-6">
            {pasos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPasoActual(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === pasoActual ? "w-8 bg-amber-400" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}