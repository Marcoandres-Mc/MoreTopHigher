// src/components/HabitsTable.tsx

import { useState } from "react";

interface Habito {
  id: number;
  nombre: string;
  horario?: string; // horario por defecto (para el modal)
  dias: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  horariosDia?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

interface HabitoCompletado {
  habitoId: number;
  fecha: string;
  completado: boolean;
}

interface HabitsTableProps {
  onProgressChange?: (progreso: number) => void;
}

export default function HabitsTable({ onProgressChange }: HabitsTableProps) {
  const [habitos, setHabitos] = useState<Habito[]>([
    {
      id: 1,
      nombre: "Wake up early",
      horario: "07:00",
      dias: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      horariosDia: {
        monday: "07:00",
        tuesday: "07:00",
        wednesday: "05:30",
        thursday: "07:00",
        friday: "05:30",
        saturday: "05:30",
        sunday: "07:00",
      },
    },
    {
      id: 2,
      nombre: "Workout",
      horario: "18:00",
      dias: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      horariosDia: {
        monday: "18:00",
        tuesday: "18:00",
        wednesday: "18:00",
        thursday: "18:00",
        friday: "18:00",
        saturday: "10:00",
        sunday: "10:00",
      },
    },
    {
      id: 3,
      nombre: "Study English",
      horario: "20:00",
      dias: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      horariosDia: {
        monday: "20:00",
        tuesday: "20:00",
        wednesday: "20:00",
        thursday: "20:00",
        friday: "20:00",
      },
    },
    {
      id: 4,
      nombre: "Leer 30 min",
      horario: "22:00",
      dias: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      horariosDia: {
        monday: "22:00",
        tuesday: "22:00",
        wednesday: "22:00",
        thursday: "22:00",
        friday: "22:00",
        saturday: "23:00",
        sunday: "21:00",
      },
    },
  ]);

  const [completados, setCompletados] = useState<HabitoCompletado[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [editingHabito, setEditingHabito] = useState<Habito | null>(null);
  const [editingTime, setEditingTime] = useState<{ habitoId: number; diaKey: string; horario: string } | null>(null);
  const [nuevoHabito, setNuevoHabito] = useState({
    nombre: "",
    horario: "",
    dias: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  });

  const diasSemana = [
    { key: "monday", nombre: "Monday", abbr: "M" },
    { key: "tuesday", nombre: "Tuesday", abbr: "Tue" },
    { key: "wednesday", nombre: "Wednesday", abbr: "W" },
    { key: "thursday", nombre: "Thursday", abbr: "Th" },
    { key: "friday", nombre: "Friday", abbr: "F" },
    { key: "saturday", nombre: "Saturday", abbr: "Sat" },
    { key: "sunday", nombre: "Sunday", abbr: "Sun" },
  ];

  const obtenerFechaActual = () => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  };

  const obtenerDiaSemana = (): string => {
    const dias = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return dias[new Date().getDay()];
  };

  const obtenerHorarioDia = (habito: Habito, diaKey: string): string | null => {
    if (habito.horariosDia && habito.horariosDia[diaKey as keyof typeof habito.horariosDia]) {
      return habito.horariosDia[diaKey as keyof typeof habito.horariosDia] || null;
    }
    return habito.horario || null;
  };

  const actualizarHorarioDia = (habitoId: number, diaKey: string, horario: string) => {
    setHabitos(habitos.map(h => {
      if (h.id === habitoId) {
        const horariosDia = { ...h.horariosDia, [diaKey]: horario };
        return { ...h, horariosDia };
      }
      return h;
    }));
  };

  const isCompleted = (habitoId: number, diaKey: string): boolean => {
    const hoy = obtenerFechaActual();
    const diaActual = obtenerDiaSemana();
    if (diaKey !== diaActual) return false;
    return completados.some(
      c => c.habitoId === habitoId && c.fecha === hoy && c.completado
    );
  };

  const toggleCompletado = (habitoId: number, diaKey: string) => {
    const diaActual = obtenerDiaSemana();
    if (diaKey !== diaActual) {
      alert("Solo puedes marcar hábitos del día actual");
      return;
    }
    const hoy = obtenerFechaActual();
    const existente = completados.find(
      c => c.habitoId === habitoId && c.fecha === hoy
    );
    
    if (existente) {
      setCompletados(completados.filter(c => c !== existente));
    } else {
      setCompletados([...completados, { habitoId, fecha: hoy, completado: true }]);
    }
  };

  const calcularProgresoHoy = (): number => {
    const hoy = obtenerDiaSemana();
    const habsHoy = habitos.filter(habito => habito.dias[hoy as keyof typeof habito.dias]);
    if (habsHoy.length === 0) return 0;
    const completadosHoy = habsHoy.filter(habito => 
      completados.some(c => c.habitoId === habito.id && c.fecha === obtenerFechaActual())
    ).length;
    return Math.round((completadosHoy / habsHoy.length) * 100);
  };

  const agregarHabito = () => {
    if (!nuevoHabito.nombre.trim()) {
      alert("Ingresa un nombre para el hábito");
      return;
    }
    const nuevoId = Math.max(...habitos.map(h => h.id), 0) + 1;
    setHabitos([...habitos, { id: nuevoId, ...nuevoHabito, horariosDia: {} }]);
    setNuevoHabito({
      nombre: "",
      horario: "",
      dias: { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false },
    });
    setShowModal(false);
  };

  const editarHabito = () => {
    if (!editingHabito) return;
    setHabitos(habitos.map(h => h.id === editingHabito.id ? editingHabito : h));
    setEditingHabito(null);
    setShowModal(false);
  };

  const eliminarHabito = (id: number) => {
    if (confirm("¿Eliminar este hábito?")) {
      setHabitos(habitos.filter(h => h.id !== id));
    }
  };

  const progresoHoy = calcularProgresoHoy();

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header con progreso del día */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>✅</span> Hábitos semanales
            </h2>
            <p className="text-emerald-100 text-sm mt-1">
              Marca los hábitos que completas cada día
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{progresoHoy}%</div>
            <div className="text-xs text-emerald-100">completado hoy</div>
          </div>
        </div>
      </div>

      {/* Tabla de hábitos */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-3 text-left text-sm font-semibold text-gray-600 min-w-[180px]">
                Hábito
              </th>
              {diasSemana.map((dia) => (
                <th
                  key={dia.key}
                  className={`p-3 text-center text-sm font-semibold ${
                    obtenerDiaSemana() === dia.key ? "text-emerald-600 bg-emerald-50" : "text-gray-600"
                  }`}
                >
                  <div>{dia.nombre}</div>
                  <div className="text-xs font-normal text-gray-400">{dia.abbr}</div>
                </th>
              ))}
              <th className="p-3 text-center text-sm font-semibold text-gray-600 w-[60px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {habitos.map((habito) => (
              <tr key={habito.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-3">
                  <div className="font-medium text-gray-800">{habito.nombre}</div>
                </td>
                {diasSemana.map((dia) => {
                  const activo = habito.dias[dia.key as keyof typeof habito.dias];
                  const completado = isCompleted(habito.id, dia.key);
                  const esHoy = obtenerDiaSemana() === dia.key;
                  const horario = obtenerHorarioDia(habito, dia.key);
                  
                  return (
                    <td key={dia.key} className="p-2 text-center">
                      {activo ? (
                        <div className="flex flex-col items-center gap-1">
                          {/* Hora de inicio (clickeable) */}
                          <button
                            onClick={() => {
                              setEditingTime({
                                habitoId: habito.id,
                                diaKey: dia.key,
                                horario: horario || ""
                              });
                              setShowTimeModal(true);
                            }}
                            className="text-[10px] text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 px-1.5 py-0.5 rounded-full transition"
                          >
                            {horario || "⏰"}
                          </button>
                          {/* Check de completado */}
                          <button
                            onClick={() => toggleCompletado(habito.id, dia.key)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              completado
                                ? "bg-emerald-500 text-white shadow-md scale-110"
                                : esHoy
                                ? "bg-gray-100 hover:bg-emerald-100 text-gray-400 hover:text-emerald-600 border-2 border-dashed border-emerald-300"
                                : "bg-gray-100 text-gray-300 cursor-not-allowed opacity-50"
                            }`}
                            disabled={!esHoy}
                          >
                            {completado ? "✓" : "○"}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-[10px] text-gray-300">—</div>
                          <div className="w-8 h-8 mx-auto text-gray-300 text-sm flex items-center justify-center">—</div>
                        </div>
                      )}
                    </td>
                  );
                })}
                <td className="p-3 text-center">
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={() => {
                        setEditingHabito(habito);
                        setShowModal(true);
                      }}
                      className="text-gray-400 hover:text-blue-600 transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => eliminarHabito(habito.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con botón para agregar hábito */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button
          onClick={() => {
            setEditingHabito(null);
            setShowModal(true);
          }}
          className="w-full py-2 text-emerald-600 hover:text-emerald-700 font-medium flex items-center justify-center gap-2 transition"
        >
          <span>+</span> Agregar nuevo hábito
        </button>
      </div>

      {/* Resumen semanal */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">📊 Resumen semanal</h3>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {diasSemana.map((dia) => {
            const habsDia = habitos.filter(h => h.dias[dia.key as keyof typeof h.dias]).length;
            const completadosDia = habitos.filter(h => 
              h.dias[dia.key as keyof typeof h.dias] && 
              completados.some(c => c.habitoId === h.id && c.fecha === obtenerFechaActual() && obtenerDiaSemana() === dia.key)
            ).length;
            return (
              <div key={dia.key} className="p-1">
                <div className="font-medium text-gray-600">{dia.abbr}</div>
                <div className={`text-lg font-bold ${completadosDia === habsDia && habsDia > 0 ? "text-emerald-600" : "text-gray-500"}`}>
                  {completadosDia}/{habsDia}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para agregar/editar hábito */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingHabito ? "Editar hábito" : "Nuevo hábito"}
            </h2>
            <input
              type="text"
              placeholder="Nombre del hábito"
              value={editingHabito ? editingHabito.nombre : nuevoHabito.nombre}
              onChange={(e) => {
                if (editingHabito) {
                  setEditingHabito({ ...editingHabito, nombre: e.target.value });
                } else {
                  setNuevoHabito({ ...nuevoHabito, nombre: e.target.value });
                }
              }}
              className="w-full p-2 border border-gray-200 rounded-xl mb-3"
            />
            <input
              type="time"
              placeholder="Horario por defecto (opcional)"
              value={editingHabito ? editingHabito.horario || "" : nuevoHabito.horario}
              onChange={(e) => {
                if (editingHabito) {
                  setEditingHabito({ ...editingHabito, horario: e.target.value });
                } else {
                  setNuevoHabito({ ...nuevoHabito, horario: e.target.value });
                }
              }}
              className="w-full p-2 border border-gray-200 rounded-xl mb-4"
            />
            <p className="text-sm font-medium text-gray-700 mb-2">Días de la semana:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {diasSemana.map((dia) => (
                <label key={dia.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingHabito 
                      ? editingHabito.dias[dia.key as keyof typeof editingHabito.dias]
                      : nuevoHabito.dias[dia.key as keyof typeof nuevoHabito.dias]
                    }
                    onChange={(e) => {
                      if (editingHabito) {
                        setEditingHabito({
                          ...editingHabito,
                          dias: { ...editingHabito.dias, [dia.key]: e.target.checked },
                        });
                      } else {
                        setNuevoHabito({
                          ...nuevoHabito,
                          dias: { ...nuevoHabito.dias, [dia.key]: e.target.checked },
                        });
                      }
                    }}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm text-gray-700">{dia.nombre}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-xl">Cancelar</button>
              <button
                onClick={editingHabito ? editarHabito : agregarHabito}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
              >
                {editingHabito ? "Guardar cambios" : "Agregar hábito"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar hora de inicio por día */}
      {showTimeModal && editingTime && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Configurar hora de inicio</h2>
            <p className="text-sm text-gray-600 mb-3">
              {habitos.find(h => h.id === editingTime.habitoId)?.nombre} - {diasSemana.find(d => d.key === editingTime.diaKey)?.nombre}
            </p>
            <input
              type="time"
              value={editingTime.horario}
              onChange={(e) => setEditingTime({ ...editingTime, horario: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-xl mb-4 text-lg"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowTimeModal(false)} 
                className="px-4 py-2 bg-gray-200 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (editingTime) {
                    actualizarHorarioDia(editingTime.habitoId, editingTime.diaKey, editingTime.horario);
                  }
                  setShowTimeModal(false);
                  setEditingTime(null);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
              >
                Guardar hora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}