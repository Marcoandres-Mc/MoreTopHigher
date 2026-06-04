// src/app/dashboard/trabajo/page.tsx
"use client";
import { useState, useEffect } from "react";
import Nav from "@/app/dashboard/components/Nav";

interface Postulacion {
  id: number;
  empresa: string;
  puesto: string;
  estado: "Enviado" | "Entrevista" | "Rechazado" | "Ofrecido";
  fecha: string;
  url: string;
}

export default function TrabajoPage() {
  // --- Canales de búsqueda (plataformas y correos) ---
  const [canales, setCanales] = useState([
    { id: 1, nombre: "LinkedIn", url: "https://www.linkedin.com/jobs/", revisado: false },
    { id: 2, nombre: "Computrabajo", url: "https://www.computrabajo.com.pe/", revisado: false },
    { id: 3, nombre: "GetOnBoard", url: "https://www.getonboard.com/", revisado: false },
    { id: 4, nombre: "Correo UPC (FCE)", url: "https://outlook.office.com/mail/", revisado: false },
    { id: 5, nombre: "Correo Personal", url: "https://mail.google.com/", revisado: false },
  ]);

  // --- Postulaciones registradas ---
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([
    {
      id: 1,
      empresa: "Empresa Alpha",
      puesto: "Desarrollador Frontend",
      estado: "Enviado",
      fecha: "2025-04-10",
      url: "https://www.linkedin.com/jobs/view/123",
    },
    {
      id: 2,
      empresa: "Startup Beta",
      puesto: "Analista de Datos",
      estado: "Entrevista",
      fecha: "2025-04-08",
      url: "https://www.computrabajo.com.pe/ofertas/456",
    },
  ]);

  // --- Estado del formulario ---
  const [nuevaPostulacion, setNuevaPostulacion] = useState({
    empresa: "",
    puesto: "",
    estado: "Enviado" as Postulacion["estado"],
    url: "",
  });

  // --- Correos pendientes (simulados) ---
  const [correosPendientes, setCorreosPendientes] = useState([
    { id: 1, asunto: "Respuesta a tu postulación - Empresa Alpha", leido: false },
    { id: 2, asunto: "Invitación a entrevista - Startup Beta", leido: false },
  ]);

  // --- Tareas diarias (checklist) ---
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Revisar al menos 3 canales", completado: false },
    { id: 2, texto: "Enviar al menos 1 postulación", completado: false },
    { id: 3, texto: "Actualizar perfil de LinkedIn", completado: false },
  ]);

  // --- Efecto para guardar/recuperar progreso en localStorage ---
  useEffect(() => {
    const saved = localStorage.getItem("trabajo_progreso");
    if (saved) {
      const data = JSON.parse(saved);
      setCanales(data.canales || canales);
      setPostulaciones(data.postulaciones || postulaciones);
      setTareas(data.tareas || tareas);
      setCorreosPendientes(data.correosPendientes || correosPendientes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "trabajo_progreso",
      JSON.stringify({ canales, postulaciones, tareas, correosPendientes })
    );
  }, [canales, postulaciones, tareas, correosPendientes]);

  // --- Funciones ---
  const toggleCanal = (id: number) => {
    setCanales(prev =>
      prev.map(c => (c.id === id ? { ...c, revisado: !c.revisado } : c))
    );
  };

  const agregarPostulacion = () => {
    if (!nuevaPostulacion.empresa || !nuevaPostulacion.puesto) return;
    const nueva: Postulacion = {
      id: Date.now(),
      ...nuevaPostulacion,
      fecha: new Date().toISOString().slice(0, 10),
    };
    setPostulaciones([nueva, ...postulaciones]);
    setNuevaPostulacion({ empresa: "", puesto: "", estado: "Enviado", url: "" });
    // Marcar tarea de "enviar postulación" como completada
    setTareas(prev =>
      prev.map(t => (t.id === 2 ? { ...t, completado: true } : t))
    );
  };

  const toggleTarea = (id: number) => {
    setTareas(prev =>
      prev.map(t => (t.id === id ? { ...t, completado: !t.completado } : t))
    );
  };

  const marcarCorreoLeido = (id: number) => {
    setCorreosPendientes(prev =>
      prev.map(c => (c.id === id ? { ...c, leido: true } : c))
    );
  };

  // Contadores
  const canalesRevisados = canales.filter(c => c.revisado).length;
  const totalCanales = canales.length;
  const tareasCompletadas = tareas.filter(t => t.completado).length;
  const totalTareas = tareas.length;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header con resumen */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-4xl">💼</span> Centro de Seguimiento
              </h1>
              <p className="text-gray-500 mt-1">Revisa, postula y mantén el control de tu búsqueda laboral.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm px-4 py-2 flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{canalesRevisados}/{totalCanales}</div>
                <div className="text-xs text-gray-500">Canales revisados</div>
              </div>
              <div className="text-center border-l border-gray-200 pl-4">
                <div className="text-2xl font-bold text-green-600">{postulaciones.length}</div>
                <div className="text-xs text-gray-500">Postulaciones</div>
              </div>
              <div className="text-center border-l border-gray-200 pl-4">
                <div className="text-2xl font-bold text-amber-600">{tareasCompletadas}/{totalTareas}</div>
                <div className="text-xs text-gray-500">Tareas hoy</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna principal: canales y postulaciones */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tarjeta: Canales de búsqueda */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <span className="text-2xl">🔍</span> Canales a revisar hoy
                </h2>
                <div className="space-y-3">
                  {canales.map(canal => (
                    <div key={canal.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={canal.revisado}
                          onChange={() => toggleCanal(canal.id)}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`text-gray-700 ${canal.revisado ? "line-through text-gray-400" : ""}`}>
                          {canal.nombre}
                        </span>
                      </div>
                      <a
                        href={canal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-600 transition"
                      >
                        Abrir →
                      </a>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500 border-t pt-3">
                  {canalesRevisados === totalCanales ? (
                    <span className="text-green-600 flex items-center gap-1">✅ ¡Completaste todas las revisiones de hoy!</span>
                  ) : (
                    <span>Te faltan {totalCanales - canalesRevisados} canales por revisar.</span>
                  )}
                </div>
              </div>

              {/* Tarjeta: Agregar nueva postulación */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <span className="text-2xl">📝</span> Registrar postulación
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Empresa"
                    value={nuevaPostulacion.empresa}
                    onChange={(e) => setNuevaPostulacion({ ...nuevaPostulacion, empresa: e.target.value })}
                    className="p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Puesto"
                    value={nuevaPostulacion.puesto}
                    onChange={(e) => setNuevaPostulacion({ ...nuevaPostulacion, puesto: e.target.value })}
                    className="p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={nuevaPostulacion.estado}
                    onChange={(e) => setNuevaPostulacion({ ...nuevaPostulacion, estado: e.target.value as Postulacion["estado"] })}
                    className="p-2 border border-gray-200 rounded-xl"
                  >
                    <option value="Enviado">Enviado</option>
                    <option value="Entrevista">Entrevista</option>
                    <option value="Rechazado">Rechazado</option>
                    <option value="Ofrecido">Ofrecido</option>
                  </select>
                  <input
                    type="url"
                    placeholder="URL de la oferta (opcional)"
                    value={nuevaPostulacion.url}
                    onChange={(e) => setNuevaPostulacion({ ...nuevaPostulacion, url: e.target.value })}
                    className="p-2 border border-gray-200 rounded-xl"
                  />
                </div>
                <button
                  onClick={agregarPostulacion}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
                >
                  + Agregar postulación
                </button>
              </div>

              {/* Tabla de postulaciones */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <span className="text-2xl">📋</span> Mis postulaciones
                </h2>
                {postulaciones.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">Aún no has registrado postulaciones.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-gray-200">
                        <tr className="text-left text-gray-500">
                          <th className="pb-2">Empresa</th>
                          <th className="pb-2">Puesto</th>
                          <th className="pb-2">Estado</th>
                          <th className="pb-2">Fecha</th>
                          <th className="pb-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {postulaciones.map((p) => (
                          <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 font-medium">{p.empresa}</td>
                            <td className="py-2">{p.puesto}</td>
                            <td className="py-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                ${p.estado === "Enviado" ? "bg-blue-100 text-blue-700" : ""}
                                ${p.estado === "Entrevista" ? "bg-yellow-100 text-yellow-700" : ""}
                                ${p.estado === "Rechazado" ? "bg-red-100 text-red-700" : ""}
                                ${p.estado === "Ofrecido" ? "bg-green-100 text-green-700" : ""}
                              `}>
                                {p.estado}
                              </span>
                            </td>
                            <td className="py-2 text-gray-500">{p.fecha}</td>
                            <td className="py-2">
                              {p.url && (
                                <a href={p.url} target="_blank" className="text-blue-600 hover:underline text-xs">Ver</a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha: tareas, correos y tips */}
            <div className="space-y-6">
              {/* Checklist de tareas diarias */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <span>✅</span> Tareas del día
                </h3>
                <div className="space-y-2">
                  {tareas.map(tarea => (
                    <label key={tarea.id} className="flex items-center gap-3 cursor-pointer p-1 rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={tarea.completado}
                        onChange={() => toggleTarea(tarea.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className={`text-gray-700 text-sm ${tarea.completado ? "line-through text-gray-400" : ""}`}>
                        {tarea.texto}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t text-xs text-gray-400">
                  {tareasCompletadas === totalTareas ? "🎉 ¡Todas las tareas completadas!" : `Progreso: ${tareasCompletadas}/${totalTareas}`}
                </div>
              </div>

              {/* Bandeja de correos pendientes (simulada) */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <span>📧</span> Correos por revisar
                </h3>
                {correosPendientes.filter(c => !c.leido).length === 0 ? (
                  <p className="text-gray-400 text-sm">✅ No hay correos nuevos pendientes.</p>
                ) : (
                  <div className="space-y-2">
                    {correosPendientes.map(correo => !correo.leido && (
                      <div key={correo.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                        <span className="text-sm text-gray-700 truncate">{correo.asunto}</span>
                        <button
                          onClick={() => marcarCorreoLeido(correo.id)}
                          className="text-xs bg-white border border-gray-300 px-2 py-1 rounded-full hover:bg-gray-100"
                        >
                          Marcar leído
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tip del día */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-sm border border-indigo-200 p-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <span>💡</span> Tip para hoy
                </h3>
                <p className="text-sm text-gray-600">
                  Personaliza cada CV y carta de presentación según la empresa. Usa palabras clave de la oferta para superar filtros ATS.
                </p>
              </div>

              {/* Frase motivacional */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
                <span className="text-3xl block mb-1">🎯</span>
                <p className="text-sm text-gray-600 italic">
                  El éxito es la suma de pequeños esfuerzos repetidos día tras día.
                </p>
                <p className="text-xs text-gray-400 mt-1">— Robert Collier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}