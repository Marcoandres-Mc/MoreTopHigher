// src/app/dashboard/exercise/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";

export default function ExercisePage() {
  // Métricas principales
  const [nivelEjercicio, setNivelEjercicio] = useState(65); // porcentaje de consistencia
  const [rachaActual, setRachaActual] = useState(5); // días seguidos entrenando
  const [diasEntrenadosSemana, setDiasEntrenadosSemana] = useState(4);
  const [metaDiasSemana, setMetaDiasSemana] = useState(5);
  const [minutosTotalesSemana, setMinutosTotalesSemana] = useState(210);
  const [metaMinutosSemana, setMetaMinutosSemana] = useState(300);
  const [caloriasEstimadas, setCaloriasEstimadas] = useState(1250);

  // Entrenamientos registrados (historial)
  const [entrenamientos, setEntrenamientos] = useState([
    { id: 1, fecha: "2025-04-07", tipo: "🏃 Correr", duracion: 30, calorias: 250 },
    { id: 2, fecha: "2025-04-06", tipo: "💪 Fuerza", duracion: 45, calorias: 200 },
    { id: 3, fecha: "2025-04-05", tipo: "🧘 Yoga", duracion: 60, calorias: 150 },
    { id: 4, fecha: "2025-04-04", tipo: "🏃 Correr", duracion: 25, calorias: 210 },
  ]);

  // Tipos de ejercicio predefinidos
  const tiposEjercicio = [
    { value: "🏃 Correr", label: "Correr" },
    { value: "💪 Fuerza", label: "Entrenamiento de fuerza" },
    { value: "🧘 Yoga", label: "Yoga / Estiramientos" },
    { value: "🚴 Ciclismo", label: "Ciclismo" },
    { value: "🏊 Natación", label: "Natación" },
    { value: "⚽ Deporte", label: "Deporte en equipo" },
    { value: "🏋️ Crossfit", label: "Crossfit" },
    { value: "🚶 Caminata", label: "Caminata" },
  ];

  // Recursos (videos, apps, rutinas)
  const [recursos, setRecursos] = useState([
    { id: 1, nombre: "Rutina de 30 min en casa", url: "https://www.youtube.com/watch?v=example1", categoria: "🎥 Video" },
    { id: 2, nombre: "Nike Training Club", url: "https://www.nike.com/ntc-app", categoria: "📱 App" },
    { id: 3, nombre: "7 Minute Workout", url: "https://www.7minuteworkout.com", categoria: "📱 App" },
    { id: 4, nombre: "Guía de estiramientos", url: "https://www.ejemplo.com/estiramientos", categoria: "📄 PDF" },
  ]);

  // Modal para agregar entrenamiento
  const [showModal, setShowModal] = useState(false);
  const [nuevoTipo, setNuevoTipo] = useState(tiposEjercicio[0].value);
  const [nuevaDuracion, setNuevaDuracion] = useState(30);
  const [nuevaFecha, setNuevaFecha] = useState(new Date().toISOString().split('T')[0]);

  const agregarEntrenamiento = () => {
    const nuevasCalorias = Math.round((nuevaDuracion * 6.5)); // estimación simple
    const nuevoId = Math.max(...entrenamientos.map(e => e.id), 0) + 1;
    const nuevo = {
      id: nuevoId,
      fecha: nuevaFecha,
      tipo: nuevoTipo,
      duracion: nuevaDuracion,
      calorias: nuevasCalorias,
    };
    setEntrenamientos([nuevo, ...entrenamientos]);
    // Actualizar métricas
    const nuevosMinutos = minutosTotalesSemana + nuevaDuracion;
    setMinutosTotalesSemana(nuevosMinutos);
    setCaloriasEstimadas(caloriasEstimadas + nuevasCalorias);
    // Contar días únicos esta semana (simplificado, idealmente agrupar por fecha)
    const diasUnicos = new Set(entrenamientos.map(e => e.fecha)).size;
    setDiasEntrenadosSemana(diasUnicos + 1);
    setShowModal(false);
  };

  const eliminarEntrenamiento = (id: number) => {
    if (confirm("¿Eliminar este entrenamiento?")) {
      const eliminado = entrenamientos.find(e => e.id === id);
      if (eliminado) {
        setMinutosTotalesSemana(minutosTotalesSemana - eliminado.duracion);
        setCaloriasEstimadas(caloriasEstimadas - eliminado.calorias);
        // Recalcular días entrenados (simplificado, se recalcularía con filtro)
      }
      setEntrenamientos(entrenamientos.filter(e => e.id !== id));
    }
  };

  const agregarRecurso = () => {
    const nombre = prompt("Nombre del recurso:", "");
    if (!nombre) return;
    const url = prompt("URL:", "https://");
    if (!url) return;
    const categoria = prompt("Categoría (🎥 Video, 📱 App, 📄 PDF, 📖 Blog):", "🎥 Video");
    const nuevoId = Math.max(...recursos.map(r => r.id), 0) + 1;
    setRecursos([...recursos, { id: nuevoId, nombre, url, categoria: categoria || "🎥 Video" }]);
  };

  const eliminarRecurso = (id: number) => {
    if (confirm("¿Eliminar este recurso?")) {
      setRecursos(recursos.filter(r => r.id !== id));
    }
  };

  const progresoDias = Math.min(100, (diasEntrenadosSemana / metaDiasSemana) * 100);
  const progresoMinutos = Math.min(100, (minutosTotalesSemana / metaMinutosSemana) * 100);

  // Calcular nivel de ejercicio (consistencia)
  const nivelCalculado = Math.round((diasEntrenadosSemana / metaDiasSemana) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-4xl">💪</span> Ejercicio físico
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tarjeta de nivel general */}
          <div className="bg-gradient-to-br from-red-50 to-rose-100/40 rounded-2xl shadow-md border border-rose-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center">
              <ScoreCircle score={nivelCalculado} size={140} />
              <p className="text-sm font-semibold text-rose-700 mt-2">Consistencia</p>
              <p className="text-xs text-gray-500">Basado en meta semanal</p>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                <span className="text-gray-600">🔥 Racha actual</span>
                <span className="font-bold text-rose-700">{rachaActual} días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">🎯 Meta semanal</span>
                <span className="font-bold text-rose-700">{metaDiasSemana} días / semana</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">🔥 Calorías estimadas</span>
                <span className="font-bold text-rose-700">{caloriasEstimadas} kcal</span>
              </div>
            </div>
          </div>

          {/* Metas semanales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <span>📅</span> Días entrenados
              </h3>
              <div className="text-3xl font-bold text-rose-600 mb-2">
                {diasEntrenadosSemana} / {metaDiasSemana}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: `${progresoDias}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Meta: {metaDiasSemana} días/semana</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <span>⏱️</span> Minutos de ejercicio
              </h3>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {minutosTotalesSemana} / {metaMinutosSemana} min
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${progresoMinutos}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Meta semanal: {metaMinutosSemana} minutos</p>
            </div>
          </div>

          {/* Historial de entrenamientos */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📋</span> Historial de entrenamientos
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-rose-700 transition"
              >
                + Registrar entrenamiento
              </button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {entrenamientos.map((e) => (
                <div key={e.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{e.tipo}</p>
                    <p className="text-xs text-gray-500">{e.fecha} • {e.duracion} min • {e.calorias} kcal</p>
                  </div>
                  <button
                    onClick={() => eliminarEntrenamiento(e.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              {entrenamientos.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">No hay entrenamientos registrados</p>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha (1/3) */}
        <div className="space-y-6">
          {/* Logros / Insignias */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-sm border border-amber-200 p-5">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <span>🏅</span> Logros cercanos
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>🔥 Racha de 7 días</span>
                <span className="text-amber-700">{rachaActual}/7</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(rachaActual/7)*100}%` }} />
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>💪 10 entrenamientos</span>
                <span className="text-amber-700">{entrenamientos.length}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (entrenamientos.length/10)*100)}%` }} />
              </div>
            </div>
          </div>

          {/* Recursos recomendados */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-xl">📺</span> Recursos de ejercicio
              </h2>
              <button
                onClick={agregarRecurso}
                className="text-rose-600 text-sm bg-rose-50 px-3 py-1 rounded-full hover:bg-rose-100 transition"
              >
                + Añadir
              </button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
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
                    <p className="text-sm font-medium text-gray-800">{recurso.nombre}</p>
                    <span className="text-xs text-gray-400">{recurso.categoria}</span>
                  </div>
                  <span className="text-gray-300 text-xs">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip del día */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-sm border border-sky-200 p-5">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <span>💡</span> Tip del día
            </h3>
            <p className="text-sm text-gray-600">
              El mejor momento para hacer ejercicio es cuando más pereza te da. Ese es el momento que más cuenta.
            </p>
          </div>

          {/* Cita motivadora */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            <span className="text-2xl mb-2 block">🏆</span>
            <p className="text-sm text-gray-600 italic">
              El cuerpo logra lo que la mente cree.
            </p>
          </div>
        </div>
      </div>

      {/* Modal para agregar entrenamiento */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Registrar entrenamiento</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de ejercicio</label>
                <select
                  value={nuevoTipo}
                  onChange={(e) => setNuevoTipo(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  {tiposEjercicio.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
                <input
                  type="number"
                  value={nuevaDuracion}
                  onChange={(e) => setNuevaDuracion(Number(e.target.value))}
                  className="w-full border rounded-lg p-2"
                  min={1}
                  step={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={nuevaFecha}
                  onChange={(e) => setNuevaFecha(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
                <button onClick={agregarEntrenamiento} className="px-4 py-2 bg-rose-600 text-white rounded-lg">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}