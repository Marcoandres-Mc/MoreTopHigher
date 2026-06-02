// src/app/dashboard/importancia/page.tsx
"use client";
import { useState } from "react";

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
  fechaVencimiento: string; // formato YYYY-MM-DD
  completada: boolean;
}

export default function ImportanciaPage() {
  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: 1,
      titulo: "Entregar informe de matemáticas",
      descripcion: "Resolver ejercicios del capítulo 5",
      prioridad: "alta",
      fechaVencimiento: "2025-04-10",
      completada: false,
    },
    {
      id: 2,
      titulo: "Preparar presentación de programación",
      descripcion: "Diapositivas sobre React",
      prioridad: "media",
      fechaVencimiento: "2025-04-12",
      completada: false,
    },
    {
      id: 3,
      titulo: "Estudiar para parcial de BD",
      descripcion: "Repasar SQL y modelos relacionales",
      prioridad: "alta",
      fechaVencimiento: "2025-04-09",
      completada: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTarea, setEditingTarea] = useState<Tarea | null>(null);
  const [filtro, setFiltro] = useState<"todas" | "pendientes" | "completadas">("pendientes");

  const prioridadColores = {
    alta: "bg-red-100 text-red-800 border-red-200",
    media: "bg-yellow-100 text-yellow-800 border-yellow-200",
    baja: "bg-green-100 text-green-800 border-green-200",
  };

  const prioridadIconos = {
    alta: "🔴",
    media: "🟡",
    baja: "🟢",
  };

  const agregarTarea = (nuevaTarea: Omit<Tarea, "id">) => {
    const newId = Math.max(...tareas.map(t => t.id), 0) + 1;
    setTareas([...tareas, { ...nuevaTarea, id: newId }]);
  };

  const editarTarea = (tareaActualizada: Tarea) => {
    setTareas(tareas.map(t => t.id === tareaActualizada.id ? tareaActualizada : t));
  };

  const eliminarTarea = (id: number) => {
    if (confirm("¿Eliminar esta tarea?")) {
      setTareas(tareas.filter(t => t.id !== id));
    }
  };

  const toggleCompletada = (id: number) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const tareasFiltradas = tareas.filter(t => {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  // Ordenar: primero no completadas, luego por prioridad (alta→media→baja), luego fecha
  const tareasOrdenadas = [...tareasFiltradas].sort((a, b) => {
    if (a.completada !== b.completada) return a.completada ? 1 : -1;
    const prioridadOrden = { alta: 0, media: 1, baja: 2 };
    if (prioridadOrden[a.prioridad] !== prioridadOrden[b.prioridad])
      return prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad];
    return new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-4xl">⭐</span> Lista de importancia
        </h1>
        <button
          onClick={() => {
            setEditingTarea(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Nueva tarea importante
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
        {(["todas", "pendientes", "completadas"] as const).map((opcion) => (
          <button
            key={opcion}
            onClick={() => setFiltro(opcion)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              filtro === opcion
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {opcion === "todas" && "📋 Todas"}
            {opcion === "pendientes" && "⏳ Pendientes"}
            {opcion === "completadas" && "✅ Completadas"}
          </button>
        ))}
      </div>

      {/* Lista de tareas */}
      <div className="space-y-3">
        {tareasOrdenadas.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">
            No hay tareas que mostrar.
          </div>
        ) : (
          tareasOrdenadas.map((tarea) => (
            <div
              key={tarea.id}
              className={`bg-white rounded-xl shadow-sm border-l-8 ${
                tarea.completada ? "opacity-60 border-gray-300" : `border-${tarea.prioridad === "alta" ? "red" : tarea.prioridad === "media" ? "yellow" : "green"}-500`
              } p-4 transition hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{prioridadIconos[tarea.prioridad]}</span>
                    <h3 className={`font-bold text-gray-800 ${tarea.completada ? "line-through" : ""}`}>
                      {tarea.titulo}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${prioridadColores[tarea.prioridad]}`}
                    >
                      {tarea.prioridad.toUpperCase()}
                    </span>
                    {tarea.completada && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Completada
                      </span>
                    )}
                  </div>
                  <p className={`text-sm text-gray-600 ${tarea.completada ? "line-through" : ""}`}>
                    {tarea.descripcion}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    📅 Vence: {new Date(tarea.fechaVencimiento).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!tarea.completada && (
                    <button
                      onClick={() => toggleCompletada(tarea.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Marcar como completada"
                    >
                      ✅
                    </button>
                  )}
                  {tarea.completada && (
                    <button
                      onClick={() => toggleCompletada(tarea.id)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Reabrir tarea"
                    >
                      🔄
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingTarea(tarea);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => eliminarTarea(tarea.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para crear/editar tarea */}
      {showModal && (
        <TareaModal
          tarea={editingTarea}
          onSave={(tareaData) => {
            if (editingTarea) {
              editarTarea({ ...tareaData, id: editingTarea.id });
            } else {
              agregarTarea(tareaData);
            }
            setShowModal(false);
            setEditingTarea(null);
          }}
          onClose={() => {
            setShowModal(false);
            setEditingTarea(null);
          }}
        />
      )}
    </div>
  );
}

// Modal para agregar/editar tarea
function TareaModal({
  tarea,
  onSave,
  onClose,
}: {
  tarea?: Tarea | null;
  onSave: (data: Omit<Tarea, "id">) => void;
  onClose: () => void;
}) {
  const [titulo, setTitulo] = useState(tarea?.titulo || "");
  const [descripcion, setDescripcion] = useState(tarea?.descripcion || "");
  const [prioridad, setPrioridad] = useState<Tarea["prioridad"]>(tarea?.prioridad || "media");
  const [fechaVencimiento, setFechaVencimiento] = useState(
    tarea?.fechaVencimiento || new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onSave({ titulo, descripcion, prioridad, fechaVencimiento, completada: tarea?.completada || false });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{tarea ? "Editar tarea" : "Nueva tarea importante"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            rows={2}
          />
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value as Tarea["prioridad"])}
            className="w-full border rounded-lg p-2 mb-3"
          >
            <option value="alta">🔴 Alta prioridad</option>
            <option value="media">🟡 Media prioridad</option>
            <option value="baja">🟢 Baja prioridad</option>
          </select>
          <input
            type="date"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}