"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/app/dashboard/components/Nav";

export default function MarcodeTimePage() {
  const router = useRouter();
  const [pasoActual, setPasoActual] = useState(0);
  const [objetivo, setObjetivo] = useState("");
  const [minutos, setMinutos] = useState(25);
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [sesionesCompletadas, setSesionesCompletadas] = useState(() => {
    if (typeof window === "undefined") return 0;
    const guardadas = localStorage.getItem("marcode_sesiones");
    return guardadas ? parseInt(guardadas) : 0;
  });
  const [mostrarAfirmacion, setMostrarAfirmacion] = useState(false);

  // Estados para los pasos iniciales
  const [respiracionCompleta, setRespiracionCompleta] = useState(false);
  const [asentirCompleto, setAsentirCompleto] = useState(false);
  const [fraseDicha, setFraseDicha] = useState(false);

  // Lógica del temporizador
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (activo && (minutos > 0 || segundos > 0)) {
      intervalo = setInterval(() => {
        if (segundos === 0) {
          if (minutos === 0) {
            clearInterval(intervalo);
            setActivo(false);
            // Sesión completada
            const nuevas = sesionesCompletadas + 1;
            setSesionesCompletadas(nuevas);
            localStorage.setItem("marcode_sesiones", nuevas.toString());
            setMostrarAfirmacion(true);
            setTimeout(() => setMostrarAfirmacion(false), 5000);
          } else {
            setMinutos(minutos - 1);
            setSegundos(59);
          }
        } else {
          setSegundos(segundos - 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [activo, minutos, segundos, sesionesCompletadas]);

  const iniciarModo = () => {
    if (respiracionCompleta && asentirCompleto && fraseDicha && objetivo.trim() !== "") {
      setPasoActual(3);
      setActivo(true);
    } else {
      alert("Completa los 3 pasos de preparación y escribe tu objetivo.");
    }
  };

  const pausarReanudar = () => setActivo(!activo);
  const reiniciarTimer = () => {
    setActivo(false);
    setMinutos(25);
    setSegundos(0);
  };

  const formatTiempo = () => `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

  // Los tres pasos previos
  const pasosPrevios = [
    {
      titulo: "🌬️ RESPIRACIÓN",
      contenido: (
        <div className="text-center space-y-4">
          <p className="text-white">Respira profundo 3 veces. Siente el aire llenar tus pulmones.</p>
          <button
            onClick={() => setRespiracionCompleta(true)}
            disabled={respiracionCompleta}
            className={`px-6 py-3 rounded-full ${respiracionCompleta ? "bg-green-500/50" : "bg-white/20 hover:bg-white/30"} transition`}
          >
            {respiracionCompleta ? "✓ Completado" : "Hacer respiración"}
          </button>
        </div>
      ),
    },
    {
      titulo: "👍 ASENTIR",
      contenido: (
        <div className="text-center space-y-4">
          <p className="text-white">Asiente con la cabeza, afirmando que estás listo para el modo MarCode.</p>
          <button
            onClick={() => setAsentirCompleto(true)}
            disabled={asentirCompleto}
            className={`px-6 py-3 rounded-full ${asentirCompleto ? "bg-green-500/50" : "bg-white/20 hover:bg-white/30"} transition`}
          >
            {asentirCompleto ? "✓ Asentido" : "Asentir"}
          </button>
        </div>
      ),
    },
    {
      titulo: "🗣️ DECLARACIÓN DE PODER",
      contenido: (
        <div className="text-center space-y-4">
          <p className="text-white italic text-lg">“Soy el mejor, es momento del MarCode Time”</p>
          <button
            onClick={() => setFraseDicha(true)}
            disabled={fraseDicha}
            className={`px-6 py-3 rounded-full ${fraseDicha ? "bg-green-500/50" : "bg-white/20 hover:bg-white/30"} transition`}
          >
            {fraseDicha ? "✓ Frase dicha" : "Decir frase"}
          </button>
        </div>
      ),
    },
  ];

  const paso = pasosPrevios[pasoActual];

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 relative overflow-hidden">
        {/* Blobs decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-4 py-12">
          {pasoActual < 3 ? (
            // Pasos de preparación
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-cyan-400/50 shadow-2xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-4 text-white/70">
                <span>Paso {pasoActual + 1} de 3</span>
                <span>Preparación</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">{paso.titulo}</h2>
              <div className="min-h-[200px]">{paso.contenido}</div>
              <div className="flex justify-between mt-8">
                {pasoActual > 0 && (
                  <button onClick={() => setPasoActual(pasoActual - 1)} className="px-5 py-2 rounded-full bg-white/10 text-white">
                    ← Anterior
                  </button>
                )}
                {pasoActual < 2 ? (
                  <button
                    onClick={() => {
                      if (
                        (pasoActual === 0 && respiracionCompleta) ||
                        (pasoActual === 1 && asentirCompleto) ||
                        (pasoActual === 2 && fraseDicha)
                      )
                        setPasoActual(pasoActual + 1);
                      else alert("Completa este paso primero");
                    }}
                    className="ml-auto px-5 py-2 rounded-full bg-white/20 text-white hover:bg-white/30"
                  >
                    Siguiente →
                  </button>
                ) : (
                  <button
                    onClick={() => setPasoActual(3)}
                    disabled={!fraseDicha}
                    className="ml-auto px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold disabled:opacity-50"
                  >
                    Ir al modo →
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Modo activo (pantalla de enfoque)
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-cyan-400 shadow-2xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                  MARCODE TIME ACTIVADO
                </h2>
                <p className="text-gray-300 mt-2">Enfoque total, mente fría, modo competitivo.</p>
              </div>

              {/* Objetivo actual */}
              <div className="mb-6">
                <label className="text-white block mb-2 font-medium">🎯 Objetivo a lograr:</label>
                <input
                  type="text"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  placeholder="Ej: Examen de matemáticas, presentación importante..."
                  className="w-full p-3 rounded-xl bg-white/10 border border-cyan-400/50 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Temporizador */}
              <div className="text-center mb-8">
                <div className="text-6xl font-mono font-bold text-white bg-white/5 rounded-2xl py-4 px-2 inline-block w-full max-w-xs mx-auto">
                  {formatTiempo()}
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {!activo ? (
                    <button onClick={iniciarModo} className="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold">
                      Iniciar enfoque
                    </button>
                  ) : (
                    <button onClick={pausarReanudar} className="px-6 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold">
                      Pausar
                    </button>
                  )}
                  <button onClick={reiniciarTimer} className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white">
                    Reiniciar
                  </button>
                </div>
              </div>

              {/* Afirmación emergente al completar */}
              {mostrarAfirmacion && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4 rounded-2xl shadow-xl animate-bounce z-50 whitespace-nowrap">
                  🏆 ¡Sesión completada! +1 punto de disciplina. ¡Eres imparable!
                </div>
              )}

              {/* Características del modo (badges) */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { label: "Enfoque total", icon: "🎯", color: "cyan" },
                  { label: "Mente fría", icon: "❄️", color: "blue" },
                  { label: "Modo competitivo", icon: "⚡", color: "indigo" },
                  { label: "Tranquilidad 100%", icon: "🧘", color: "teal" },
                  { label: "Energía 100%", icon: "🔥", color: "orange" },
                ].map((c) => (
                  <div key={c.label} className={`bg-${c.color}-500/20 rounded-xl p-2 text-center text-white text-sm font-medium`}>
                    {c.icon} {c.label}
                  </div>
                ))}
              </div>

              {/* Contador de sesiones y botón de finalizar */}
              <div className="mt-8 flex justify-between items-center border-t border-white/20 pt-4">
                <div className="text-white/70 text-sm">🏅 Sesiones completadas: {sesionesCompletadas}</div>
                <button
                  onClick={() => router.push("/dashboard/mindset")}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:scale-105 transition"
                >
                  Finalizar MarCode →
                </button>
              </div>
            </div>
          )}

          {/* Indicadores de progreso solo en preparación */}
          {pasoActual < 3 && (
            <div className="flex justify-center gap-2 mt-6">
              {pasosPrevios.map((_, idx) => (
                <div key={idx} className={`h-2 rounded-full transition-all ${idx === pasoActual ? "w-6 bg-cyan-400" : "w-2 bg-white/30"}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}