// src/app/dashboard/empresa/page.tsx
"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/app/dashboard/components/Nav";

// Tipos
interface Proyecto {
  id: string;
  nombre: string;
  cliente: string;
  progreso: number; // 0-100
  fechaEntrega: string;
  estado: "En desarrollo" | "En revisión" | "Completado";
}

interface Lead {
  id: string;
  empresa: string;
  contacto: string;
  email: string;
  etapa: "Nuevo" | "Contactado" | "Negociación" | "Cerrado";
}

export default function EmpresaPage() {
  const router = useRouter();

  // --- Estado: Proyectos ---
  const getInitialProyectos = (): Proyecto[] => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("empresa_proyectos");
      if (stored) return JSON.parse(stored);
    }
    return [
      {
        id: "1",
        nombre: "App Móvil Cliente A",
        cliente: "TechMovil S.A.",
        progreso: 75,
        fechaEntrega: "2025-06-15",
        estado: "En desarrollo",
      },
      {
        id: "2",
        nombre: "Dashboard Analítica",
        cliente: "DataCorp",
        progreso: 40,
        fechaEntrega: "2025-07-01",
        estado: "En desarrollo",
      },
      {
        id: "3",
        nombre: "Sistema de Ventas",
        cliente: "Retail Plus",
        progreso: 100,
        fechaEntrega: "2025-05-20",
        estado: "Completado",
      },
    ];
  };

  const getInitialLeads = (): Lead[] => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("empresa_leads");
      if (stored) return JSON.parse(stored);
    }
    return [
      {
        id: "1",
        empresa: "Fintech Start",
        contacto: "Carlos López",
        email: "carlos@fintechstart.com",
        etapa: "Negociación",
      },
      {
        id: "2",
        empresa: "EduOnline",
        contacto: "María García",
        email: "maria@eduonline.com",
        etapa: "Contactado",
      },
    ];
  };

  const [proyectos, setProyectos] = useState<Proyecto[]>(getInitialProyectos);
  const [leads, setLeads] = useState<Lead[]>(getInitialLeads);

  // --- Estado: Documento e Ideas (NUEVO) ---
  const [documentoLink, setDocumentoLink] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("empresa_documento") || "";
    }
    return "";
  });
  const [mostrarEditorDocumento, setMostrarEditorDocumento] = useState(false);

  const [ideas, setIdeas] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("empresa_ideas") || "";
    }
    return "";
  });

  // Guardar documento e ideas en localStorage
  useEffect(() => {
    localStorage.setItem("empresa_documento", documentoLink);
  }, [documentoLink]);

  useEffect(() => {
    localStorage.setItem("empresa_ideas", ideas);
  }, [ideas]);

  // --- Estado: Leads (nuevo) ---
  const [mostrarModalLead, setMostrarModalLead] = useState(false);
  const [nuevoLead, setNuevoLead] = useState<Omit<Lead, "id">>({
    empresa: "",
    contacto: "",
    email: "",
    etapa: "Nuevo",
  });

  // --- Estado: Proyectos (modal) ---
  const [mostrarModalProyecto, setMostrarModalProyecto] = useState(false);
  const [nuevoProyecto, setNuevoProyecto] = useState<Omit<Proyecto, "id">>({
    nombre: "",
    cliente: "",
    progreso: 0,
    fechaEntrega: "",
    estado: "En desarrollo",
  });

  // --- KPIs ---
  const ingresosMensuales = 12500;
  const totalClientes = [...new Set(proyectos.map(p => p.cliente))].length;
  const proyectosActivos = proyectos.filter(p => p.estado !== "Completado").length;
  const satisfaccion = 92;

  // --- Funciones proyectos ---
  const agregarProyecto = () => {
    if (!nuevoProyecto.nombre || !nuevoProyecto.cliente || !nuevoProyecto.fechaEntrega) return;
    const nuevoId = Date.now().toString();
    setProyectos([...proyectos, { id: nuevoId, ...nuevoProyecto }]);
    setNuevoProyecto({ nombre: "", cliente: "", progreso: 0, fechaEntrega: "", estado: "En desarrollo" });
    setMostrarModalProyecto(false);
  };

  const actualizarProgreso = (id: string, nuevoProgreso: number) => {
    setProyectos(proyectos.map(p => p.id === id ? { ...p, progreso: nuevoProgreso } : p));
  };

  const eliminarProyecto = (id: string) => {
    if (confirm("¿Eliminar este proyecto?")) {
      setProyectos(proyectos.filter(p => p.id !== id));
    }
  };

  // --- Funciones leads ---
  const agregarLead = () => {
    if (!nuevoLead.empresa || !nuevoLead.contacto || !nuevoLead.email) return;
    const nuevoId = Date.now().toString();
    setLeads([...leads, { id: nuevoId, ...nuevoLead }]);
    setNuevoLead({ empresa: "", contacto: "", email: "", etapa: "Nuevo" });
    setMostrarModalLead(false);
  };

  const eliminarLead = (id: string) => {
    if (confirm("¿Eliminar este lead?")) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-4xl">🏢</span> Mi Empresa de Software
              </h1>
              <p className="text-gray-500 mt-1">Gestión de proyectos, clientes y métricas clave.</p>
            </div>
            <button
              onClick={() => setMostrarModalProyecto(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
            >
              + Nuevo proyecto
            </button>
          </div>

          

          {/* Proyectos y Leads en dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tabla de proyectos */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📊</span> Proyectos en curso
              </h2>
              {proyectos.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No hay proyectos. Agrega uno.</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {proyectos.map(proyecto => (
                    <div key={proyecto.id} className="border-b pb-3 last:border-0 group">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-800">{proyecto.nombre}</p>
                          <p className="text-xs text-gray-500">Cliente: {proyecto.cliente}</p>
                          <p className="text-xs text-gray-400">Entrega: {proyecto.fechaEntrega}</p>
                        </div>
                        <button onClick={() => eliminarProyecto(proyecto.id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progreso</span>
                          <span className="font-bold">{proyecto.progreso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${proyecto.progreso}%` }} />
                        </div>
                        <div className="mt-1 flex justify-between text-xs">
                          <span className={`px-2 py-0.5 rounded-full ${
                            proyecto.estado === "Completado" ? "bg-green-100 text-green-700" :
                            proyecto.estado === "En revisión" ? "bg-yellow-100 text-yellow-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>
                            {proyecto.estado}
                          </span>
                          <div className="flex gap-2">
                            <button onClick={() => actualizarProgreso(proyecto.id, Math.min(100, proyecto.progreso + 10))} className="text-xs text-blue-600">+10%</button>
                            <button onClick={() => actualizarProgreso(proyecto.id, Math.max(0, proyecto.progreso - 10))} className="text-xs text-gray-500">-10%</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Tarjeta: Ideas */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                <span>💡</span> Mis ideas
              </h3>
              <textarea
                value={ideas}
                onChange={(e) => setIdeas(e.target.value)}
                placeholder="Escribe aquí tus ideas de negocio, mejoras, reflexiones..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 resize-none h-32 text-sm"
              />
              <p className="text-xs text-gray-400 mt-2">Se guarda automáticamente mientras escribes.</p>
            </div>

            
          </div>
          

          

          

          
        </div>
      </div>

      {/* Modal: Nuevo proyecto */}
      {mostrarModalProyecto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Nuevo proyecto</h2>
            <input
              type="text"
              placeholder="Nombre del proyecto"
              value={nuevoProyecto.nombre}
              onChange={e => setNuevoProyecto({ ...nuevoProyecto, nombre: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <input
              type="text"
              placeholder="Cliente"
              value={nuevoProyecto.cliente}
              onChange={e => setNuevoProyecto({ ...nuevoProyecto, cliente: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <input
              type="date"
              value={nuevoProyecto.fechaEntrega}
              onChange={e => setNuevoProyecto({ ...nuevoProyecto, fechaEntrega: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <select
              value={nuevoProyecto.estado}
              onChange={e => setNuevoProyecto({ ...nuevoProyecto, estado: e.target.value as Proyecto["estado"] })}
              className="w-full p-2 border rounded-xl mb-4"
            >
              <option value="En desarrollo">En desarrollo</option>
              <option value="En revisión">En revisión</option>
              <option value="Completado">Completado</option>
            </select>
            <div className="flex justify-end gap-3">
              <button onClick={() => setMostrarModalProyecto(false)} className="px-4 py-2 border rounded-xl">Cancelar</button>
              <button onClick={agregarProyecto} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Nuevo lead */}
      {mostrarModalLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Nuevo lead</h2>
            <input
              type="text"
              placeholder="Empresa"
              value={nuevoLead.empresa}
              onChange={e => setNuevoLead({ ...nuevoLead, empresa: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <input
              type="text"
              placeholder="Contacto"
              value={nuevoLead.contacto}
              onChange={e => setNuevoLead({ ...nuevoLead, contacto: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={nuevoLead.email}
              onChange={e => setNuevoLead({ ...nuevoLead, email: e.target.value })}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <select
              value={nuevoLead.etapa}
              onChange={e => setNuevoLead({ ...nuevoLead, etapa: e.target.value as Lead["etapa"] })}
              className="w-full p-2 border rounded-xl mb-4"
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Contactado">Contactado</option>
              <option value="Negociación">Negociación</option>
              <option value="Cerrado">Cerrado</option>
            </select>
            <div className="flex justify-end gap-3">
              <button onClick={() => setMostrarModalLead(false)} className="px-4 py-2 border rounded-xl">Cancelar</button>
              <button onClick={agregarLead} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}