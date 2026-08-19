// src/app/dashboard/trabajo/page.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "@/app/dashboard/components/Nav";
import EmailCards from "./components/EmailCards";

interface Postulacion {
  id: number;
  empresa: string;
  puesto: string;
  estado: "Enviado" | "Entrevista" | "Rechazado" | "Ofrecido";
  fecha: string;
  url: string;
}

interface Canal {
  id: number;
  nombre: string;
  url: string;
  revisado: boolean;
  img: string; // URL de la imagen del canal (opcional)
}

interface Correo {
  id: number;
  nombre: string;
  url: string;
  revisado: boolean;
}

export default function TrabajoPage() {
  // --- Canales de búsqueda (plataformas y correos) - CORREGIDO (sin duplicados) ---
  const [canales, setCanales] = useState<Canal[]>([
    { 
      id: 1, 
      nombre: "LinkedIn", 
      url: "https://www.linkedin.com/jobs/", 
      revisado: false, 
      img: "https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original" // SVG oficial
    },
    { 
      id: 2, 
      nombre: "Computrabajo", 
      url: "https://www.computrabajo.com.pe/", 
      revisado: false, 
      img: "https://cp.ct-stc.com/web8/20260727.02_01.41/c/img/logos/logoct-ogp.png" // Logo oficial
    },
    { 
      id: 3, 
      nombre: "Indeed", 
      url: "https://pe.indeed.com/", 
      revisado: false, 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4F9Wirf_1Lek-YsjCcd6n0xvryPKQPvfClvTuUHqg0ixFBar-wfsrvWLn&s=10"
    },
    { 
      id: 4, 
      nombre: "Bumeran", 
      url: "https://www.bumeran.com.pe/", 
      revisado: false, 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavAGxmW7bYLgkfWLVnljBybGhEJT4fGHklOu3w67nUH5UnrgDxhAJE5w&s=10"
    },
    { 
      id: 5, 
      nombre: "UPC Bolsa de trabajo", 
      url: "https://upc-csm.symplicity.com/students/app/home", 
      revisado: false, 
      img: "https://upload.wikimedia.org/wikipedia/commons/f/fc/UPC_logo_transparente.png"
    },
    { 
      id: 6, 
      nombre: "Noticias UPC", 
      url: "https://bolsadetrabajo.upc.edu.pe/noticias/", 
      revisado: false, 
      img: "https://upload.wikimedia.org/wikipedia/commons/f/fc/UPC_logo_transparente.png"
    },
  ]);

  // --- Correos (nuevo array separado) ---
  const [correos, setCorreos] = useState<Correo[]>([
    { 
      id: 1, 
      nombre: "Correo UPC (FCE)", 
      url: "https://outlook.office.com/mail/inbox/id/AAQkADRiNjA4OGE5LWJlYjYtNDM0YS05MTA0LTQ5NDRiY2ZlMTEwMQAQAMK6ZXs%2BIiBDvZcoXfRwDFU%3D", 
      revisado: false 
    },
    { 
      id: 2, 
      nombre: "Correo Personal", 
      url: "https://mail.google.com/", 
      revisado: false 
    },
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
      // Defer state updates to avoid synchronous setState calls inside the effect
      setTimeout(() => {
        setCanales(data.canales);
        setCorreos(data.correos || correos);
        setPostulaciones(data.postulaciones || postulaciones);
        setTareas(data.tareas || tareas);
        setCorreosPendientes(data.correosPendientes || correosPendientes);
      }, 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "trabajo_progreso",
      JSON.stringify({ canales, correos, postulaciones, tareas, correosPendientes })
    );
  }, [canales, correos, postulaciones, tareas, correosPendientes]);

  // --- Funciones ---
  const toggleCanal = (id: number) => {
    setCanales(prev =>
      prev.map(c => (c.id === id ? { ...c, revisado: !c.revisado } : c))
    );
  };

  const toggleCorreo = (id: number) => {
    setCorreos(prev =>
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
  const correosRevisados = correos.filter(c => c.revisado).length;
  const totalCorreos = correos.length;
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
                <div className="text-2xl font-bold text-purple-600">{correosRevisados}/{totalCorreos}</div>
                <div className="text-xs text-gray-500">Correos revisados</div>
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
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {canales.map((canal) => (
                    <div key={canal.id} className="relative group">
                      <input
                        type="checkbox"
                        checked={canal.revisado}
                        onChange={() => toggleCanal(canal.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-1 left-1 z-10 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer bg-white/80 backdrop-blur-sm"
                      />
                      <a
                        href={canal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 hover:bg-gray-100 rounded-xl transition"
                      >
                        <img
                          src={canal.img}
                          alt={canal.nombre}
                          className="w-full h-auto aspect-square object-contain max-w-[80px] mx-auto"
                        />
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

            

              
            </div>

            {/* Columna derecha: tareas, correos pendientes y tips */}
            <div className="space-y-6">
              {/* Tarjeta: Correos importantes */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <span className="text-2xl">📧</span> Correos importantes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {correos.map(correo => (
                    <div
                      key={correo.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        correo.revisado 
                          ? "bg-gray-100 border border-gray-200" 
                          : "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200"
                      }`}
                      onClick={() => window.open(correo.url, "_blank")}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {correo.nombre.includes("UPC") ? "🏫" : "👤"}
                          </span>
                          <h3 className="font-semibold text-gray-800 text-sm">{correo.nombre}</h3>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCorreo(correo.id);
                          }}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            correo.revisado
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-500 hover:bg-green-400 hover:text-white"
                          }`}
                        >
                          {correo.revisado ? "✓" : "○"}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {new URL(correo.url).hostname}
                      </p>
                      {correo.revisado && (
                        <span className="text-xs text-green-600 mt-2 inline-block">Revisado</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>



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
                        className="w-4 h-4 text-blue-600 rounded"
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