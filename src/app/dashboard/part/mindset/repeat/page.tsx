"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/app/dashboard/components/Nav";

export default function RepeatItPage() {
  const router = useRouter();

  const defaultMetaDiaria = 10;

  // Estados principales
  const [frase, setFrase] = useState("Yo soy constante y disciplinado.");
  const [metaDiaria, setMetaDiaria] = useState(defaultMetaDiaria);
  const [repeticionesHoy, setRepeticionesHoy] = useState(() => {
    if (typeof window === "undefined") return 0;
    const hoy = new Date().toISOString().slice(0, 10);
    const storedFecha = localStorage.getItem("repeatit_fecha");
    const storedReps = localStorage.getItem("repeatit_reps_hoy");
    return storedFecha === hoy && storedReps ? parseInt(storedReps) : 0;
  });
  const [racha, setRacha] = useState(() => {
    if (typeof window === "undefined") return 0;
    const hoy = new Date().toISOString().slice(0, 10);
    const storedFecha = localStorage.getItem("repeatit_fecha");
    const storedReps = localStorage.getItem("repeatit_reps_hoy");
    const storedRacha = localStorage.getItem("repeatit_racha");

    if (storedFecha === hoy) {
      return storedRacha ? parseInt(storedRacha) : 0;
    }

    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const fechaAyer = ayer.toISOString().slice(0, 10);

    if (storedFecha === fechaAyer && storedReps && parseInt(storedReps) >= defaultMetaDiaria) {
      return storedRacha ? parseInt(storedRacha) : 0;
    }

    return 0;
  });
  const [ultimaFecha, setUltimaFecha] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("repeatit_fecha") ?? "";
  });
  const [timerActivo, setTimerActivo] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(300); // 5 minutos en segundos
  const [tareaChecklist, setTareaChecklist] = useState([
    { id: 1, texto: "Repetir la frase principal 10 veces", completado: false },
    { id: 2, texto: "Escribir un objetivo del día", completado: false },
    { id: 3, texto: "Hacer 5 minutos de respiración consciente", completado: false },
    { id: 4, texto: "Revisar progreso de racha", completado: false },
  ]);

  // Frases sugeridas para rotar
  const frasesSugeridas = [
    "La repetición es la madre de la maestría.",
    "Cada día es una nueva oportunidad para mejorar.",
    "Soy dueño de mis hábitos, no esclavo de mis impulsos.",
    "La disciplina pesa, pero el arrepentimiento pesa más.",
    "Un pequeño paso cada día me lleva lejos.",
  ];

  // Sincronizar fecha y mantener datos iniciales sin setState directo en el efecto
  useEffect(() => {
    const hoy = new Date().toISOString().slice(0, 10);
    const storedFecha = localStorage.getItem("repeatit_fecha");
    if (storedFecha !== hoy) {
      localStorage.setItem("repeatit_fecha", hoy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repeatit_racha", racha.toString());
  }, [racha]);

  // Guardar repeticiones al cambiar
  useEffect(() => {
    localStorage.setItem("repeatit_reps_hoy", repeticionesHoy.toString());
  }, [repeticionesHoy]);

  // Lógica del temporizador
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (timerActivo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            setTimerActivo(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [timerActivo, tiempoRestante]);

  // Manejo de finalización del temporizador
  useEffect(() => {
    if (tiempoRestante === 0) {
      alert("⏰ ¡Tiempo completado! Descansa un momento.");
    }
  }, [tiempoRestante]);

  const incrementarRepeticion = () => {
    if (repeticionesHoy < metaDiaria) {
      setRepeticionesHoy(repeticionesHoy + 1);
    }
  };

  const cambiarFrase = () => {
    const nueva = frasesSugeridas[Math.floor(Math.random() * frasesSugeridas.length)];
    setFrase(nueva);
  };

  const toggleChecklist = (id: number) => {
    setTareaChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completado: !item.completado } : item))
    );
  };

  const formatearTiempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progresoRepeticiones = (repeticionesHoy / metaDiaria) * 100;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Blobs decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
            🔁 REPEAT IT
          </h1>
          <p className="text-center text-purple-200 mb-8">
            Repite hasta que se convierta en hábito. Construye tu mejor versión.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda: frase + repetidor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tarjeta de frase */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-semibold text-lg">📢 Frase del día</h3>
                  <button
                    onClick={cambiarFrase}
                    className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-white"
                  >
                    🔄 Otra
                  </button>
                </div>
                <p className="text-white text-xl italic mt-3 leading-relaxed">“{frase}”</p>
              </div>

              {/* Contador de repeticiones */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 text-center">
                <h3 className="text-white text-2xl font-bold mb-2">🔁 Repeticiones hoy</h3>
                <div className="text-6xl font-mono font-bold text-white">
                  {repeticionesHoy} <span className="text-2xl text-purple-300">/ {metaDiaria}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 mt-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-pink-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progresoRepeticiones}%` }}
                  />
                </div>
                <button
                  onClick={incrementarRepeticion}
                  disabled={repeticionesHoy >= metaDiaria}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition disabled:opacity-50 disabled:scale-100"
                >
                  +1 Repetición
                </button>
                {repeticionesHoy >= metaDiaria && (
                  <div className="mt-4 text-green-300 animate-pulse">🎉 ¡Meta diaria alcanzada! 🎉</div>
                )}
              </div>

              {/* Temporizador de práctica */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
                <h3 className="text-white font-semibold text-lg mb-3">⏱️ Temporizador de enfoque</h3>
                <div className="text-center">
                  <div className="text-5xl font-mono font-bold text-white bg-white/5 rounded-2xl py-3 px-4 inline-block mb-4">
                    {formatearTiempo(tiempoRestante)}
                  </div>
                  <div className="flex justify-center gap-3">
                    {!timerActivo ? (
                      <button
                        onClick={() => setTimerActivo(true)}
                        className="px-5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        Iniciar
                      </button>
                    ) : (
                      <button
                        onClick={() => setTimerActivo(false)}
                        className="px-5 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Pausar
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setTimerActivo(false);
                        setTiempoRestante(300);
                      }}
                      className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>
                <p className="text-purple-200 text-sm text-center mt-4">Usa este tiempo para repetir en voz alta o practicar</p>
              </div>
            </div>

            {/* Columna derecha: racha + checklist */}
            <div className="space-y-6">
              {/* Racha */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 text-center">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="text-white text-xl font-bold">Racha actual</h3>
                <div className="text-5xl font-bold text-amber-300 my-2">{racha}</div>
                <p className="text-white/70 text-sm">días consecutivos cumpliendo la meta</p>
              </div>

              {/* Checklist diario */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
                <h3 className="text-white font-semibold text-lg mb-3">✅ Hábitos del día</h3>
                <div className="space-y-3">
                  {tareaChecklist.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={item.completado}
                        onChange={() => toggleChecklist(item.id)}
                        className="w-5 h-5 rounded border-white/30 bg-white/10 accent-purple-500"
                      />
                      <span className={`text-white/90 group-hover:text-white transition ${item.completado ? "line-through text-white/50" : ""}`}>
                        {item.texto}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Motivación extra */}
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl border border-purple-400/30 p-4 text-center">
                <p className="text-white text-sm italic">“La repetición no aburre, perfecciona.”</p>
              </div>
            </div>
          </div>

          {/* Botón finalizar que redirige a Mindset */}
          <div className="flex justify-center mt-8">
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