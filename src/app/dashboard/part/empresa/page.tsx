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

  // Datos de ejemplo o cargados desde localStorage
  const getInitialProyectos = (): Proyecto[] => {
    if (typeof window !== "undefined") {
      const storedProyectos = localStorage.getItem("empresa_proyectos");
      if (storedProyectos) return JSON.parse(storedProyectos);
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
      const storedLeads = localStorage.getItem("empresa_leads");
      if (storedLeads) return JSON.parse(storedLeads);
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

  const [mostrarModalProyecto, setMostrarModalProyecto] = useState(false);
  const [nuevoProyecto, setNuevoProyecto] = useState<Omit<Proyecto, "id">>({
    nombre: "",
    cliente: "",
    progreso: 0,
    fechaEntrega: "",
    estado: "En desarrollo",
  });

  // KPIs calculados
  const ingresosMensuales = 12500; // ejemplo fijo, podría ser dinámico
  const totalClientes = [...new Set(proyectos.map(p => p.cliente))].length;
  const proyectosActivos = proyectos.filter(p => p.estado !== "Completado").length;
  const satisfaccion = 92; // porcentaje

  useEffect(() => {
    localStorage.setItem("empresa_proyectos", JSON.stringify(proyectos));
    localStorage.setItem("empresa_leads", JSON.stringify(leads));
  }, [proyectos, leads]);

  const agregarProyecto = () => {
    if (!nuevoProyecto.nombre || !nuevoProyecto.cliente || !nuevoProyecto.fechaEntrega) return;
    const nuevoId = Date.now().toString();
    const proyectoToAgregar: Proyecto = { id: nuevoId, ...nuevoProyecto };
    setProyectos([...proyectos, proyectoToAgregar]);
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

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-5 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ingresos mensuales</p>
                <p className="text-2xl font-bold text-gray-800">${ingresosMensuales.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12% vs mes anterior</p>
              </div>
              <span className="text-3xl">💰</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-5">
              <p className="text-gray-500 text-sm">Clientes activos</p>
              <p className="text-3xl font-bold text-gray-800">{totalClientes}</p>
              <p className="text-xs text-gray-400">{proyectos.length} proyectos totales</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-5">
              <p className="text-gray-500 text-sm">Proyectos activos</p>
              <p className="text-3xl font-bold text-amber-600">{proyectosActivos}</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(proyectosActivos / proyectos.length) * 100}%` }} />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-5">
              <p className="text-gray-500 text-sm">Satisfacción cliente</p>
              <p className="text-3xl font-bold text-green-600">{satisfaccion}%</p>
              <p className="text-xs text-gray-400">Basado en encuestas</p>
            </div>
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
                        <div className="flex gap-2">
                          <button onClick={() => eliminarProyecto(proyecto.id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                        </div>
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

            {/* Leads / Clientes potenciales */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🤝</span> Leads y oportunidades
              </h2>
              {leads.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Sin leads. Agrega uno.</p>
              ) : (
                <div className="space-y-3">
                  {leads.map(lead => (
                    <div key={lead.id} className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{lead.empresa}</p>
                        <p className="text-xs text-gray-500">{lead.contacto} - {lead.email}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          lead.etapa === "Cerrado" ? "bg-green-100 text-green-700" :
                          lead.etapa === "Negociación" ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {lead.etapa}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-blue-600">✏️</button>
                    </div>
                  ))}
                </div>
              )}
              <button className="mt-4 text-blue-600 text-sm flex items-center gap-1">+ Agregar lead</button>
            </div>
          </div>

          {/* Simulador de objetivos / cronómetro de enfoque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5 border">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">🎯 Objetivo trimestral</h3>
              <p className="text-2xl font-bold text-indigo-700 mt-2">$50,000</p>
              <p className="text-sm text-gray-600">Facturación al 30 de junio</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(ingresosMensuales * 3) / 50000 * 100}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">Progreso actual: {Math.round((ingresosMensuales * 3) / 50000 * 100)}%</p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">⏱️ Enfoque empresarial</h3>
              <p className="text-sm text-gray-600">Dedica 25 minutos sin distracciones a tu empresa.</p>
              <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition">Iniciar temporizador</button>
            </div>
          </div>

          {/* Botón volver */}
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

      {/* Modal nuevo proyecto */}
      {mostrarModalProyecto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Nuevo proyecto</h2>
            <input type="text" placeholder="Nombre del proyecto" value={nuevoProyecto.nombre} onChange={e => setNuevoProyecto({ ...nuevoProyecto, nombre: e.target.value })} className="w-full p-2 border rounded-xl mb-3" />
            <input type="text" placeholder="Cliente" value={nuevoProyecto.cliente} onChange={e => setNuevoProyecto({ ...nuevoProyecto, cliente: e.target.value })} className="w-full p-2 border rounded-xl mb-3" />
            <input type="date" placeholder="Fecha entrega" value={nuevoProyecto.fechaEntrega} onChange={e => setNuevoProyecto({ ...nuevoProyecto, fechaEntrega: e.target.value })} className="w-full p-2 border rounded-xl mb-3" />
            <select value={nuevoProyecto.estado} onChange={e => setNuevoProyecto({ ...nuevoProyecto, estado: e.target.value as Proyecto["estado"] })} className="w-full p-2 border rounded-xl mb-4">
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
    </>
  );
}