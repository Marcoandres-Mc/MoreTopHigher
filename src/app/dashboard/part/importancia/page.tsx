// src/app/dashboard/importancia/page.tsx
"use client";
import { useState } from "react";
import Nav from "@/app/dashboard/components/Nav";

interface TareaImportante {
  id: number;
  titulo: string;
  descripcion?: string;
  prioridad: "alta" | "media" | "baja";
  categoria: "curso" | "proyecto" | "desarrollo" | "ejercicio" | "personal";
  progreso: number; // 0-100
  url?: string;
  fechaLimite?: string;
}

export default function ImportanciaPage() {
  const [tareas, setTareas] = useState<TareaImportante[]>([
    {
      id: 1,
      titulo: "Estructura de datos",
      descripcion: "Ponerme al día del curso",
      prioridad: "alta",
      categoria: "curso",
      progreso: 45,
      url: "https://www.youtube.com/watch?v=ejemplo",
    },
    {
      id: 2,
      titulo: "Estudiar Calculo II",
      descripcion: "Ponerme lo que falta, estudiar y hacer ejercicio de preparación",
      prioridad: "alta",
      categoria: "curso",
      progreso: 30,
    },
    {
      id: 3,
      titulo: "Redes",
      descripcion: "Estudiar VLANs y avanzar el trabajo final",
      prioridad: "alta",
      categoria: "curso",
      progreso: 60,
    },
    {
      id: 4,
      titulo: "App móviles - Flutter y Dart",
      descripcion: "Curso desde cero",
      prioridad: "alta",
      categoria: "curso",
      progreso: 25,
      url: "https://www.youtube.com/watch?v=IKG1eV2SetA",
    },
    {
      id: 5,
      titulo: "Diseño de patrones",
      descripcion: "Ponerme al día en escribir cuaderno",
      prioridad: "media",
      categoria: "curso",
      progreso: 50,
    },
    {
      id: 6,
      titulo: "Mejorar portafolio web",
      descripcion: "Actualizar mi página de portafolio",
      prioridad: "alta",
      categoria: "proyecto",
      progreso: 20,
    },
    {
      id: 7,
      titulo: "Hacer ejercicio",
      descripcion: "Mantener rutina diaria",
      prioridad: "media",
      categoria: "ejercicio",
      progreso: 65,
    },
  ]);

  const [tareasDesarrollo, setTareasDesarrollo] = useState([
    { id: 1, nombre: "Curso Excel", progreso: 0, url: "#" },
    { id: 2, nombre: "Curso C# .NET", progreso: 0, url: "#" },
    { id: 3, nombre: "Curso Scrum", progreso: 0, url: "#" },
    { id: 4, nombre: "Curso Power BI", progreso: 0, url: "#" },
    { id: 5, nombre: "Curso Gestión de proyectos", progreso: 0, url: "#" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTarea, setEditingTarea] = useState<TareaImportante | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todas");

  const categorias = [
    { key: "curso", nombre: "📚 Cursos", color: "blue" },
    { key: "proyecto", nombre: "💻 Proyectos", color: "purple" },
    { key: "desarrollo", nombre: "🌱 Desarrollo personal", color: "green" },
    { key: "ejercicio", nombre: "💪 Ejercicio", color: "orange" },
    { key: "personal", nombre: "✨ Personal", color: "pink" },
  ];

  const prioridadConfig = {
    alta: { color: "red", bg: "bg-red-100", text: "text-red-700", icono: "🔴" },
    media: { color: "yellow", bg: "bg-yellow-100", text: "text-yellow-700", icono: "🟡" },
    baja: { color: "green", bg: "bg-green-100", text: "text-green-700", icono: "🟢" },
  };

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtroCategoria !== "todas" && tarea.categoria !== filtroCategoria) return false;
    if (filtroPrioridad !== "todas" && tarea.prioridad !== filtroPrioridad) return false;
    return true;
  });

  const tareasOrdenadas = [...tareasFiltradas].sort((a, b) => {
    const prioridadOrden = { alta: 0, media: 1, baja: 2 };
    return prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad];
  });

  const agregarTarea = (nuevaTarea: Omit<TareaImportante, "id">) => {
    const nuevoId = Math.max(...tareas.map(t => t.id), 0) + 1;
    setTareas([...tareas, { ...nuevaTarea, id: nuevoId }]);
  };

  const editarTarea = (tareaActualizada: TareaImportante) => {
    setTareas(tareas.map(t => t.id === tareaActualizada.id ? tareaActualizada : t));
  };

  const eliminarTarea = (id: number) => {
    if (confirm("¿Eliminar esta tarea?")) {
      setTareas(tareas.filter(t => t.id !== id));
    }
  };

  const actualizarProgreso = (id: number, nuevoProgreso: number) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, progreso: Math.min(100, Math.max(0, nuevoProgreso)) } : t));
  };

  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter(t => t.progreso === 100).length;
  const progresoGlobal = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;

  const prioridadesCount = {
    alta: tareas.filter(t => t.prioridad === "alta").length,
    media: tareas.filter(t => t.prioridad === "media").length,
    baja: tareas.filter(t => t.prioridad === "baja").length,
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header con resumen */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-4xl">⭐</span> Cuadro de importancia
            </h1>
            <p className="text-gray-500 mt-1">Organiza tus tareas según su prioridad y avance</p>
          </div>

          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-red-500">
              <div className="text-2xl font-bold text-red-600">{prioridadesCount.alta}</div>
              <div className="text-sm text-gray-500">Tareas de alta prioridad</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-yellow-500">
              <div className="text-2xl font-bold text-yellow-600">{prioridadesCount.media}</div>
              <div className="text-sm text-gray-500">Tareas de media prioridad</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-green-500">
              <div className="text-2xl font-bold text-green-600">{prioridadesCount.baja}</div>
              <div className="text-sm text-gray-500">Tareas de baja prioridad</div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-sm p-4 text-white">
              <div className="text-2xl font-bold">{progresoGlobal}%</div>
              <div className="text-sm text-blue-100">Progreso total</div>
              <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                <div className="bg-white h-1.5 rounded-full" style={{ width: `${progresoGlobal}%` }} />
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex gap-2">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="p-2 border border-gray-200 rounded-xl text-sm bg-white"
              >
                <option value="todas">📋 Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat.key} value={cat.key}>{cat.nombre}</option>
                ))}
              </select>
              <select
                value={filtroPrioridad}
                onChange={(e) => setFiltroPrioridad(e.target.value)}
                className="p-2 border border-gray-200 rounded-xl text-sm bg-white"
              >
                <option value="todas">🏷️ Todas las prioridades</option>
                <option value="alta">🔴 Alta prioridad</option>
                <option value="media">🟡 Media prioridad</option>
                <option value="baja">🟢 Baja prioridad</option>
              </select>
            </div>
            <button
              onClick={() => {
                setEditingTarea(null);
                setShowModal(true);
              }}
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>+</span> Nueva tarea importante
            </button>
          </div>

          {/* Grid de tareas principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tareas importantes */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">⭐</span> Tareas importantes
                </h2>
                <p className="text-xs text-gray-500 mt-1">Ordenadas por prioridad</p>
              </div>
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {tareasOrdenadas.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    No hay tareas. Agrega tu primera tarea importante.
                  </div>
                ) : (
                  tareasOrdenadas.map((tarea) => (
                    <div key={tarea.id} className="p-4 hover:bg-gray-50 transition group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{prioridadConfig[tarea.prioridad].icono}</span>
                            <h3 className="font-semibold text-gray-800">{tarea.titulo}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${prioridadConfig[tarea.prioridad].bg} ${prioridadConfig[tarea.prioridad].text}`}>
                              {tarea.prioridad.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-400">
                              {categorias.find(c => c.key === tarea.categoria)?.nombre}
                            </span>
                          </div>
                          {tarea.descripcion && (
                            <p className="text-sm text-gray-600 mb-2">{tarea.descripcion}</p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex-1 max-w-[200px]">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Progreso</span>
                                <span className="font-medium">{tarea.progreso}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    tarea.progreso === 100 ? "bg-green-500" : "bg-blue-500"
                                  }`}
                                  style={{ width: `${tarea.progreso}%` }}
                                />
                              </div>
                            </div>
                            {tarea.url && (
                              <a
                                href={tarea.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline"
                              >
                                Ver recurso →
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={() => {
                              setEditingTarea(tarea);
                              setShowModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => eliminarTarea(tarea.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Columna derecha: Desarrollo personal y seguimiento */}
            <div className="space-y-6">
              {/* Tarjeta de desarrollo personal */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">🌱</span> Para mi desarrollo
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Cursos y habilidades complementarias</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {tareasDesarrollo.map((curso, idx) => (
                    <div key={curso.id} className="p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{curso.nombre}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-32 bg-gray-200 rounded-full h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${curso.progreso}%` }} />
                              </div>
                              <span className="text-xs text-gray-400">{curso.progreso}%</span>
                            </div>
                          </div>
                        </div>
                        {curso.url && (
                          <a href={curso.url} target="_blank" className="text-gray-400 hover:text-blue-600 text-sm">
                            Ver →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    + Agregar curso de desarrollo
                  </button>
                </div>
              </div>

              {/* Consejos y motivación */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm border border-indigo-200 p-5">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <span>💡</span> Tip para priorizar
                </h3>
                <p className="text-sm text-gray-600">
                  Aplica la matriz de Eisenhower: Clasifica tus tareas en urgente/importante.
                  Las tareas importantes pero no urgentes son las que realmente mueven tu crecimiento.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <div className="font-bold text-red-600">Urgente + Importante</div>
                    <div className="text-gray-500">Hacer ahora</div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded-lg">
                    <div className="font-bold text-yellow-600">Importante + No urgente</div>
                    <div className="text-gray-500">Programar</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <div className="font-bold text-blue-600">Urgente + No importante</div>
                    <div className="text-gray-500">Delegar</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <div className="font-bold text-gray-600">No urgente + No importante</div>
                    <div className="text-gray-500">Eliminar</div>
                  </div>
                </div>
              </div>

              {/* Frase motivacional */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
                <span className="text-3xl mb-2 block">🎯</span>
                <p className="text-sm text-gray-600 italic">
                  Lo importante es no dejar de hacerse preguntas. La curiosidad tiene su propia razón de existir.
                </p>
                <p className="text-xs text-gray-400 mt-2">— Albert Einstein</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar/editar tarea */}
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
    </>
  );
}

// ==================== MODAL PARA TAREAS ====================

interface TareaModalData {
  titulo: string;
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
  categoria: "curso" | "proyecto" | "desarrollo" | "ejercicio" | "personal";
  progreso: number;
  url: string;
  fechaLimite: string;
}

function TareaModal({
  tarea,
  onSave,
  onClose,
}: {
  tarea?: TareaImportante | null;
  onSave: (data: Omit<TareaImportante, "id">) => void;
  onClose: () => void;
}) {
  const [titulo, setTitulo] = useState(tarea?.titulo || "");
  const [descripcion, setDescripcion] = useState(tarea?.descripcion || "");
  const [prioridad, setPrioridad] = useState(tarea?.prioridad || "media");
  const [categoria, setCategoria] = useState(tarea?.categoria || "curso");
  const [progreso, setProgreso] = useState(tarea?.progreso || 0);
  const [url, setUrl] = useState(tarea?.url || "");
  const [fechaLimite, setFechaLimite] = useState(tarea?.fechaLimite || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onSave({
      titulo,
      descripcion,
      prioridad: prioridad as "alta" | "media" | "baja",
      categoria: categoria as "curso" | "proyecto" | "desarrollo" | "ejercicio" | "personal",
      progreso,
      url,
      fechaLimite,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{tarea ? "Editar tarea" : "Nueva tarea importante"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
            required
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
            rows={2}
          />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value as TareaImportante["prioridad"])}
              className="p-2 border border-gray-200 rounded-xl"
            >
              <option value="alta">🔴 Alta prioridad</option>
              <option value="media">🟡 Media prioridad</option>
              <option value="baja">🟢 Baja prioridad</option>
            </select>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as TareaImportante["categoria"])}
              className="p-2 border border-gray-200 rounded-xl"
            >
              <option value="curso">📚 Curso</option>
              <option value="proyecto">💻 Proyecto</option>
              <option value="desarrollo">🌱 Desarrollo personal</option>
              <option value="ejercicio">💪 Ejercicio</option>
              <option value="personal">✨ Personal</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="text-sm text-gray-600 mb-1 block">Progreso: {progreso}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progreso}
              onChange={(e) => setProgreso(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <input
            type="url"
            placeholder="URL del recurso (opcional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
          />
          <input
            type="date"
            placeholder="Fecha límite (opcional)"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-4"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-xl">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}