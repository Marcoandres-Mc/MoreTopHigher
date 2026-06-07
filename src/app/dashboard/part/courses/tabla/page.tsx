// src/app/dashboard/notas/page.tsx
"use client";
import { useState, useEffect } from "react";
import Nav from "@/app/dashboard/components/Nav";
import ScoreCircle from "@/components/ScoreCircle";

// Tipos de datos
interface Evaluacion {
  id: string;
  nombre: string;
  porcentaje: number; // ej: 20, 30, etc.
  nota: number;       // 0-20
}

interface Curso {
  id: string;
  nombre: string;
  creditos: number;
  evaluaciones: Evaluacion[];
}

export default function NotasPage() {
  // Datos de ejemplo iniciales (detallados por evaluación)
  const initialCursos: Curso[] = [
    {
      id: "1",
      nombre: "Matemática",
      creditos: 5,
      evaluaciones: [
        { id: "e1", nombre: "Parcial 1", porcentaje: 30, nota: 18 },
        { id: "e2", nombre: "Parcial 2", porcentaje: 30, nota: 19 },
        { id: "e3", nombre: "Final", porcentaje: 40, nota: 20 },
      ],
    },
    {
      id: "2",
      nombre: "Comunicación",
      creditos: 4,
      evaluaciones: [
        { id: "e4", nombre: "Trabajo 1", porcentaje: 25, nota: 16 },
        { id: "e5", nombre: "Examen", porcentaje: 50, nota: 15 },
        { id: "e6", nombre: "Participación", porcentaje: 25, nota: 17 },
      ],
    },
    {
      id: "3",
      nombre: "Programación",
      creditos: 6,
      evaluaciones: [
        { id: "e7", nombre: "Práctica 1", porcentaje: 20, nota: 20 },
        { id: "e8", nombre: "Proyecto", porcentaje: 40, nota: 19 },
        { id: "e9", nombre: "Examen final", porcentaje: 40, nota: 18 },
      ],
    },
  ];

  const [cursos, setCursos] = useState<Curso[]>(() => {
    if (typeof window === "undefined") return initialCursos;
    const stored = localStorage.getItem("notas_cursos_detalle");
    return stored ? JSON.parse(stored) : initialCursos;
  });

  // Estados para modales
  const [mostrarModalCurso, setMostrarModalCurso] = useState(false);
  const [mostrarModalEval, setMostrarModalEval] = useState(false);
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);
  const [evalEditando, setEvalEditando] = useState<{ cursoId: string; eval: Evaluacion | null } | null>(null);
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: "", creditos: 3 });
  const [nuevaEval, setNuevaEval] = useState({ nombre: "", porcentaje: 0, nota: 0 });

  useEffect(() => {
    localStorage.setItem("notas_cursos_detalle", JSON.stringify(cursos));
  }, [cursos]);

  // Calcular promedio ponderado de un curso
  const calcularPromedioCurso = (curso: Curso): number => {
    const totalPorcentaje = curso.evaluaciones.reduce((sum, e) => sum + e.porcentaje, 0);
    if (totalPorcentaje === 0) return 0;
    const sumaPonderada = curso.evaluaciones.reduce((sum, e) => sum + (e.nota * e.porcentaje), 0);
    return sumaPonderada / totalPorcentaje;
  };

  // Calcular total global (promedio ponderado por créditos)
  const calcularTotalGlobal = (): number => {
    let sumaPonderadaCreditos = 0;
    let totalCreditos = 0;
    cursos.forEach(curso => {
      const promCurso = calcularPromedioCurso(curso);
      sumaPonderadaCreditos += promCurso * curso.creditos;
      totalCreditos += curso.creditos;
    });
    return totalCreditos === 0 ? 0 : sumaPonderadaCreditos / totalCreditos;
  };

  // Estadísticas para tarjetas resumen
  const totalCreditos = cursos.reduce((sum, c) => sum + c.creditos, 0);
  const promedioGeneral = calcularTotalGlobal();
  const cursosAprobados = cursos.filter(c => calcularPromedioCurso(c) >= 13).length;
  const cursosDesaprobados = cursos.length - cursosAprobados;
  const cursosConPromedio = cursos.map(c => ({ ...c, promedio: calcularPromedioCurso(c) }));
  const notaMaxima = cursos.length ? Math.max(...cursosConPromedio.map(c => c.promedio)) : 0;
  const cursosOrdenados = [...cursosConPromedio].sort((a, b) => b.promedio - a.promedio);
  const top3 = cursosOrdenados.slice(0, 3);

  // Obtener color según nota (para cada evaluación individual)
  const getColorPorNota = (nota: number): string => {
    if (nota === 20) return "bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 font-bold";
    if (nota === 19) return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-bold";
    if (nota === 18) return "bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-bold";
    if (nota >= 16) return "bg-green-100 text-green-800";
    if (nota >= 13) return "bg-blue-100 text-blue-800";
    return "bg-red-100 text-red-800";
  };

  // CRUD cursos
  const agregarCurso = () => {
    if (!nuevoCurso.nombre) return;
    const nuevoId = Date.now().toString();
    setCursos([
      ...cursos,
      {
        id: nuevoId,
        nombre: nuevoCurso.nombre,
        creditos: nuevoCurso.creditos,
        evaluaciones: [],
      },
    ]);
    setNuevoCurso({ nombre: "", creditos: 3 });
    setMostrarModalCurso(false);
  };

  const editarCurso = () => {
    if (!cursoEditando) return;
    setCursos(cursos.map(c => c.id === cursoEditando.id ? { ...c, nombre: nuevoCurso.nombre, creditos: nuevoCurso.creditos } : c));
    setCursoEditando(null);
    setNuevoCurso({ nombre: "", creditos: 3 });
    setMostrarModalCurso(false);
  };

  const eliminarCurso = (id: string) => {
    if (confirm("¿Eliminar curso y todas sus evaluaciones?")) {
      setCursos(cursos.filter(c => c.id !== id));
    }
  };

  // CRUD evaluaciones
  const abrirModalEval = (cursoId: string, evalObj: Evaluacion | null = null) => {
    if (evalObj) {
      setEvalEditando({ cursoId, eval: evalObj });
      setNuevaEval({ nombre: evalObj.nombre, porcentaje: evalObj.porcentaje, nota: evalObj.nota });
    } else {
      setEvalEditando({ cursoId, eval: null });
      setNuevaEval({ nombre: "", porcentaje: 0, nota: 0 });
    }
    setMostrarModalEval(true);
  };

  const guardarEvaluacion = () => {
    if (!evalEditando) return;
    const { cursoId, eval: oldEval } = evalEditando;
    if (!nuevaEval.nombre || nuevaEval.porcentaje <= 0 || nuevaEval.nota < 0 || nuevaEval.nota > 20) return;

    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) return;

    if (oldEval) {
      // Editar
      const nuevasEvals = curso.evaluaciones.map(e => e.id === oldEval.id ? { ...e, ...nuevaEval } : e);
      setCursos(cursos.map(c => c.id === cursoId ? { ...c, evaluaciones: nuevasEvals } : c));
    } else {
      // Agregar
      const nuevaId = Date.now().toString();
      const nuevaEvalObj = { id: nuevaId, ...nuevaEval };
      setCursos(cursos.map(c => c.id === cursoId ? { ...c, evaluaciones: [...c.evaluaciones, nuevaEvalObj] } : c));
    }
    setMostrarModalEval(false);
    setEvalEditando(null);
    setNuevaEval({ nombre: "", porcentaje: 0, nota: 0 });
  };

  const eliminarEvaluacion = (cursoId: string, evalId: string) => {
    if (confirm("¿Eliminar esta evaluación?")) {
      setCursos(cursos.map(c => c.id === cursoId ? { ...c, evaluaciones: c.evaluaciones.filter(e => e.id !== evalId) } : c));
    }
  };

  const objetivo = 18.333; // meta deseada

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-4xl">📊</span> Control de Notas por Evaluación
              </h1>
              <p className="text-gray-500 mt-1">Cada evaluación tiene su nota y porcentaje. Promedio ponderado automático.</p>
            </div>
            <button
              onClick={() => { setCursoEditando(null); setNuevoCurso({ nombre: "", creditos: 3 }); setMostrarModalCurso(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
            >
              + Agregar curso
            </button>
          </div>

          {/* Tarjetas resumen (estilo simple) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Promedio ponderado</p>
                <p className="text-3xl font-bold text-gray-800">{promedioGeneral.toFixed(2)}</p>
                <p className="text-xs text-gray-400">sobre 20</p>
              </div>
              <ScoreCircle score={promedioGeneral} size={60} />
            </div>
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <p className="text-gray-500 text-sm">Créditos totales</p>
              <p className="text-3xl font-bold text-gray-800">{totalCreditos}</p>
              <p className="text-xs text-gray-400">{cursos.length} cursos</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <p className="text-gray-500 text-sm">Aprobados / Desaprobados</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-600">{cursosAprobados}</span>
                <span className="text-gray-400">/</span>
                <span className="text-3xl font-bold text-red-500">{cursosDesaprobados}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${cursos.length ? (cursosAprobados / cursos.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <p className="text-gray-500 text-sm">Nota máxima</p>
              <p className="text-3xl font-bold text-amber-500">{notaMaxima.toFixed(2)}</p>
              {top3[0] && <p className="text-xs text-gray-500 truncate">{top3[0].nombre}</p>}
            </div>
          </div>

          {/* Top 3 medallas (podio) */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border p-5 mb-8">
            <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">🥇 Podio de honor</h2>
            <div className="flex flex-wrap gap-4">
              {top3.map((curso, idx) => {
                const colores = ["text-yellow-500", "text-gray-400", "text-amber-600"];
                const medallas = ["🥇", "🥈", "🥉"];
                return (
                  <div key={curso.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 shadow-sm">
                    <span className="text-2xl">{medallas[idx]}</span>
                    <div>
                      <p className="font-medium text-gray-800">{curso.nombre}</p>
                      <p className={`text-sm ${colores[idx]} font-bold`}>{curso.promedio.toFixed(2)} pts</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabla de cursos y evaluaciones (formato tipo PDF) */}
<div className="bg-white rounded-2xl shadow-lg border overflow-x-auto">
  <table className="w-full text-sm border-collapse">
    <thead className="bg-gray-50 border-b-2 border-gray-200">
      <tr>
        <th className="px-4 py-3 text-left text-gray-700">Curso (créditos)</th>
        <th className="px-4 py-3 text-left text-gray-700">Evaluación</th>
        <th className="px-2 py-3 text-center text-gray-700">%</th>
        <th className="px-2 py-3 text-center text-gray-700">Nota</th>
        <th className="px-4 py-3 text-center text-gray-700">Promedio Curso</th>
        <th className="px-4 py-3 text-center text-gray-700">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {cursos.map((curso, idx) => {
        const promCurso = calcularPromedioCurso(curso);
        const numEvals = curso.evaluaciones.length;
        return (
          <div key={curso.id}>
            {curso.evaluaciones.map((evalItem, evalIdx) => (
              <tr key={evalItem.id} className="border-b border-gray-200 hover:bg-gray-50">
                {/* Celda del nombre del curso (con rowspan solo en la primera evaluación) */}
                {evalIdx === 0 && (
                  <td
                    rowSpan={numEvals || 1}
                    className="px-4 py-3 font-medium align-middle bg-white"
                  >
                    {curso.nombre} <span className="text-xs text-gray-400">({curso.creditos} cr)</span>
                  </td>
                )}
                <td className="px-4 py-2">
                  <span className="text-gray-700">{evalItem.nombre}</span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="text-gray-500">{evalItem.porcentaje}%</span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-sm ${getColorPorNota(evalItem.nota)}`}>
                    {evalItem.nota.toFixed(1)}
                  </span>
                </td>
                {/* Celda del promedio del curso (con rowspan) */}
                {evalIdx === 0 && (
                  <td
                    rowSpan={numEvals || 1}
                    className="px-4 py-3 text-center font-bold text-gray-800 align-middle bg-white"
                  >
                    {promCurso.toFixed(2)}
                  </td>
                )}
                {/* Celda de acciones (con rowspan) */}
                {evalIdx === 0 && (
                  <td
                    rowSpan={numEvals || 1}
                    className="px-4 py-3 text-center align-middle bg-white"
                  >
                    <button
                      onClick={() => {
                        setCursoEditando(curso);
                        setNuevoCurso({ nombre: curso.nombre, creditos: curso.creditos });
                        setMostrarModalCurso(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => eliminarCurso(curso.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                    <br />
                    <button
                      onClick={() => abrirModalEval(curso.id)}
                      className="text-xs text-blue-600 mt-1 hover:underline"
                    >
                      + Agregar eval
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {/* Si el curso no tiene evaluaciones, mostrar una fila con mensaje */}
            {numEvals === 0 && (
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium align-middle">
                  {curso.nombre} <span className="text-xs text-gray-400">({curso.creditos} cr)</span>
                </td>
                <td colSpan={2} className="px-4 py-2 text-center text-gray-400">
                  Sin evaluaciones
                </td>
                <td className="px-2 py-2 text-center">-</td>
                <td className="px-4 py-3 text-center font-bold text-gray-800 align-middle">
                  {promCurso.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <button
                    onClick={() => {
                      setCursoEditando(curso);
                      setNuevoCurso({ nombre: curso.nombre, creditos: curso.creditos });
                      setMostrarModalCurso(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => eliminarCurso(curso.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                  <br />
                  <button
                    onClick={() => abrirModalEval(curso.id)}
                    className="text-xs text-blue-600 mt-1 hover:underline"
                  >
                    + Agregar eval
                  </button>
                </td>
              </tr>
            )}
          </div>
        );
      })}
      {cursos.length === 0 && (
        <tr>
          <td colSpan={6} className="text-center py-8 text-gray-400">
            No hay cursos. Agrega uno para comenzar.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

          {/* Resumen global y objetivo (extra) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <span>📈</span> Total Global
              </h3>
              <p className="text-4xl font-bold text-blue-800 mt-2">{promedioGeneral.toFixed(4)}</p>
              <p className="text-sm text-gray-500 mt-1">Promedio ponderado por créditos</p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <span>🎯</span> Objetivo
              </h3>
              <p className="text-4xl font-bold text-amber-700 mt-2">{objetivo.toFixed(4)}</p>
              <p className="text-sm text-gray-500 mt-1">Meta deseada</p>
              {promedioGeneral >= objetivo ? (
                <p className="text-green-600 text-sm mt-2 flex items-center gap-1">✅ ¡Superaste el objetivo!</p>
              ) : (
                <p className="text-red-500 text-sm mt-2">Faltan {(objetivo - promedioGeneral).toFixed(4)} puntos</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para curso */}
      {mostrarModalCurso && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{cursoEditando ? "Editar curso" : "Nuevo curso"}</h2>
            <input
              type="text"
              placeholder="Nombre del curso"
              value={nuevoCurso.nombre}
              onChange={e => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <input
              type="number"
              placeholder="Créditos"
              value={nuevoCurso.creditos}
              onChange={e => setNuevoCurso({ ...nuevoCurso, creditos: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border rounded-xl mb-4"
              min="1"
              step="1"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setMostrarModalCurso(false)} className="px-4 py-2 border rounded-xl hover:bg-gray-50">Cancelar</button>
              <button onClick={cursoEditando ? editarCurso : agregarCurso} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para evaluación */}
      {mostrarModalEval && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{evalEditando?.eval ? "Editar evaluación" : "Nueva evaluación"}</h2>
            <input
              type="text"
              placeholder="Nombre de la evaluación"
              value={nuevaEval.nombre}
              onChange={e => setNuevaEval({ ...nuevaEval, nombre: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <input
              type="number"
              placeholder="Porcentaje (%)"
              value={nuevaEval.porcentaje}
              onChange={e => setNuevaEval({ ...nuevaEval, porcentaje: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded-xl mb-3"
              step="0.5"
              min="0"
              max="100"
            />
            <input
              type="number"
              placeholder="Nota (0-20)"
              value={nuevaEval.nota}
              onChange={e => setNuevaEval({ ...nuevaEval, nota: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border rounded-xl mb-4"
              step="0.5"
              min="0"
              max="20"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setMostrarModalEval(false)} className="px-4 py-2 border rounded-xl hover:bg-gray-50">Cancelar</button>
              <button onClick={guardarEvaluacion} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}