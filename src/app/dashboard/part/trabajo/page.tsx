// src/app/dashboard/trabajo/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "@/components/ScoreCircle";
import Nav from "@/app/dashboard/components/Nav";

export default function TrabajoPage() {
  // Métricas de empleabilidad
  const [empleabilidadGeneral, setEmpleabilidadGeneral] = useState(68);
  const [postulacionesEfectivas, setPostulacionesEfectivas] = useState(55);
  const [networkingActivo, setNetworkingActivo] = useState(45);
  const [marcaPersonal, setMarcaPersonal] = useState(60);
  const [preparacionEntrevistas, setPreparacionEntrevistas] = useState(70);
  
  // Estadísticas concretas
  const [postulacionesEnviadas, setPostulacionesEnviadas] = useState(12);
  const [metaPostulaciones, setMetaPostulaciones] = useState(30);
  const [entrevistasConseguidas, setEntrevistasConseguidas] = useState(3);
  const [metaEntrevistas, setMetaEntrevistas] = useState(10);
  const [contactosRed, setContactosRed] = useState(45);
  const [metaContactos, setMetaContactos] = useState(100);
  const [cursosCompletados, setCursosCompletados] = useState(2);
  const [metaCursos, setMetaCursos] = useState(5);
  
  // Afirmación profesional del día
  const [afirmacionLaboral, setAfirmacionLaboral] = useState(
    "Cada entrevista es una oportunidad para mostrar mi valor y aprender."
  );
  
  const afirmaciones = [
    "Mis habilidades son valiosas y encuentro el trabajo que merezco.",
    "El networking me abre puertas inesperadas, hoy conectaré con alguien nuevo.",
    "Confío en mi capacidad para comunicar mi experiencia con claridad.",
    "Cada 'no' me acerca a un 'sí' que realmente importa.",
    "Estoy en constante crecimiento profesional, mi momento llegará.",
    "Mi red de contactos crece cada día de forma orgánica y genuina.",
    "Merezco un trabajo donde me valoren y me paguen bien.",
  ];
  
  // Diario de búsqueda de empleo
  const [notaBusqueda, setNotaBusqueda] = useState("");
  const [entradasBitacora, setEntradasBitacora] = useState([
    { id: 1, fecha: "2025-04-07", texto: "Actualicé mi LinkedIn y recibí 5 visitas nuevas." },
    { id: 2, fecha: "2025-04-06", texto: "Envié 3 postulaciones a startups tecnológicas." },
  ]);
  
  // Recursos de empleabilidad (portales, libros, cursos)
  const [recursos, setRecursos] = useState([
    { id: 1, nombre: "LinkedIn – Guía para optimizar perfil", url: "https://www.linkedin.com/learning", categoria: "📘 Curso" },
    { id: 2, nombre: "Libro: 'Cómo conseguir trabajo' de Richard Bolles", url: "https://www.amazon.com/dp/1984856563", categoria: "📖 Libro" },
    { id: 3, nombre: "Podcast: 'Trabajo y Talento'", url: "https://open.spotify.com/show/example", categoria: "🎙️ Podcast" },
    { id: 4, nombre: "Plantilla de CV moderno (Canva)", url: "https://www.canva.com/templates", categoria: "📄 Plantilla" },
  ]);
  
  const cambiarAfirmacion = () => {
    const nueva = afirmaciones[Math.floor(Math.random() * afirmaciones.length)];
    setAfirmacionLaboral(nueva);
  };
  
  const agregarRecurso = () => {
    const nombre = prompt("Nombre del recurso:", "");
    if (!nombre) return;
    const url = prompt("URL:", "https://");
    if (!url) return;
    const categoria = prompt("Categoría (📖 Libro, 🎙️ Podcast, 🎥 Video, 📘 Curso, 📄 Plantilla):", "📖 Libro");
    const nuevoId = Math.max(...recursos.map(r => r.id), 0) + 1;
    setRecursos([...recursos, { id: nuevoId, nombre, url, categoria: categoria || "📖 Libro" }]);
  };
  
  const eliminarRecurso = (id: number) => {
    if (confirm("¿Eliminar este recurso?")) {
      setRecursos(recursos.filter(r => r.id !== id));
    }
  };
  
  const guardarNota = () => {
    if (!notaBusqueda.trim()) return;
    const nuevaEntrada = {
      id: Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      texto: notaBusqueda,
    };
    setEntradasBitacora([nuevaEntrada, ...entradasBitacora]);
    setNotaBusqueda("");
  };
  
  // Progresos para barras
  const progresoPostulaciones = Math.min(100, (postulacionesEnviadas / metaPostulaciones) * 100);
  const progresoEntrevistas = Math.min(100, (entrevistasConseguidas / metaEntrevistas) * 100);
  const progresoContactos = Math.min(100, (contactosRed / metaContactos) * 100);
  const promedioHabilidades = Math.round((postulacionesEfectivas + networkingActivo + marcaPersonal + preparacionEntrevistas) / 4);
  
  return (
    <>
      <Nav />
      <div className="space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 p-10">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-4xl">💼</span> Empleo y desarrollo profesional
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de empleabilidad general */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100/40 rounded-2xl shadow-md border border-blue-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center">
                <ScoreCircle score={empleabilidadGeneral} size={140} />
                <p className="text-sm font-semibold text-blue-700 mt-2">Índice de empleabilidad</p>
                <p className="text-xs text-gray-500">Promedio de habilidades clave</p>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                  <span className="text-gray-600">📄 Postulaciones efectivas</span>
                  <span className="font-bold text-blue-700">{postulacionesEfectivas}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">🤝 Networking activo</span>
                  <span className="font-bold text-blue-700">{networkingActivo}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">🔥 Racha de networking</span>
                  <span className="font-bold text-blue-700">{contactosRed} contactos</span>
                </div>
              </div>
            </div>
            
            {/* Métricas detalladas */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span> Habilidades para el empleo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>📄 Postulaciones efectivas</span>
                    <span className="font-bold">{postulacionesEfectivas}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2.5 rounded-full" style={{ width: `${postulacionesEfectivas}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>🤝 Networking activo</span>
                    <span className="font-bold">{networkingActivo}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-green-400 to-teal-500 h-2.5 rounded-full" style={{ width: `${networkingActivo}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>🌟 Marca personal</span>
                    <span className="font-bold">{marcaPersonal}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2.5 rounded-full" style={{ width: `${marcaPersonal}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>🎤 Preparación entrevistas</span>
                    <span className="font-bold">{preparacionEntrevistas}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full" style={{ width: `${preparacionEntrevistas}%` }} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Afirmación profesional del día */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl shadow-sm border border-sky-200 p-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <span>✨</span> Afirmación profesional del día
                  </h3>
                  <p className="text-gray-700 italic text-lg">{afirmacionLaboral}</p>
                </div>
                <button
                  onClick={cambiarAfirmacion}
                  className="text-xs bg-white/80 hover:bg-white px-3 py-1.5 rounded-full text-blue-600 border border-blue-200 transition"
                >
                  Nueva frase
                </button>
              </div>
            </div>
            
            {/* Bitácora de búsqueda de empleo */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📝</span> Bitácora de búsqueda
              </h2>
              <textarea
                value={notaBusqueda}
                onChange={(e) => setNotaBusqueda(e.target.value)}
                placeholder="Ej: Hoy contacté con un reclutador, mejoré mi CV, tuve una entrevista... ¿Qué aprendiste?"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                rows={3}
              />
              <button
                onClick={guardarNota}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
              >
                Guardar actividad
              </button>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-2">Últimas actividades</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {entradasBitacora.map((entry) => (
                    <div key={entry.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <span className="text-xs text-gray-400">{entry.fecha}</span>
                      <p className="text-gray-700 mt-1">{entry.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna derecha (1/3) */}
          <div className="space-y-6">
            {/* Metas de postulación */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <span>📮</span> Postulaciones
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">{postulacionesEnviadas} / {metaPostulaciones}</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progresoPostulaciones}%` }} />
              </div>
              
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3 mt-4">
                <span>🎯</span> Entrevistas
              </h3>
              <div className="text-3xl font-bold text-emerald-600 mb-2">{entrevistasConseguidas} / {metaEntrevistas}</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${progresoEntrevistas}%` }} />
              </div>
              
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3 mt-4">
                <span>🤝</span> Contactos en red
              </h3>
              <div className="text-3xl font-bold text-amber-600 mb-2">{contactosRed} / {metaContactos}</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${progresoContactos}%` }} />
              </div>
            </div>
            
            {/* Recursos de empleabilidad */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-xl">📚</span> Recursos profesionales
                </h2>
                <button
                  onClick={agregarRecurso}
                  className="text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
                >
                  + Añadir
                </button>
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
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
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{recurso.nombre}</p>
                      <span className="text-xs text-gray-400">{recurso.categoria}</span>
                    </div>
                    <span className="text-gray-300 text-xs">→</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tip del día (búsqueda de empleo) */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-sm border border-indigo-200 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span>💡</span> Tip para tu búsqueda
              </h3>
              <p className="text-sm text-gray-600">
                Personaliza cada carta de presentación. Menciona un logro específico de la empresa objetivo. Esto aumenta un 40% la tasa de respuesta.
              </p>
            </div>
            
            {/* Frase motivadora laboral */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
              <span className="text-3xl mb-2 block">🚀</span>
              <p className="text-sm text-gray-600 italic">
                El trabajo en equipo es el combustible que permite a la gente común alcanzar resultados poco comunes.
              </p>
              <p className="text-xs text-gray-400 mt-2">— Andrew Carnegie</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}