// src/app/dashboard/page.tsx
"use client";
import { useState } from "react";
import ScoreCircle from "../../../components/ScoreCircle";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Nav from "../components/Nav";
import Estadistica from "./components/Estadistica";
import Container from "./components/Container";

export default function DashboardPage() {
  // ========== MÉTRICAS Y DATOS DE DESARROLLADOR ==========
  const [importancia, setImportancia] = useState([
    {
      id: 1,
      tarea: "Fix: autenticación en NextAuth",
      prioridad: "alta",
      fecha: "2025-04-10",
    },
    {
      id: 2,
      tarea: "Optimizar consultas Prisma",
      prioridad: "media",
      fecha: "2025-04-12",
    },
    {
      id: 3,
      tarea: "Documentar API REST",
      prioridad: "baja",
      fecha: "2025-04-15",
    },
  ]);

  const [accesoDirecto, setAccesoDirecto] = useState([
    {
      id: 1,
      nombre: "LeetCode",
      url: "https://leetcode.com/u/tuusuario/",
      dominio: "leetcode.com",
    },
    {
      id: 2,
      nombre: "GitHub",
      url: "https://github.com/tuusuario",
      dominio: "github.com",
    },
    {
      id: 3,
      nombre: "LinkedIn",
      url: "https://linkedin.com/in/tuusuario",
      dominio: "linkedin.com",
    },
    {
      id: 4,
      nombre: "Vercel",
      url: "https://vercel.com",
      dominio: "vercel.com",
    },
    {
      id: 5,
      nombre: "Docs React",
      url: "https://react.dev",
      dominio: "react.dev",
    },
  ]);

  const navSections = [
    {
      name: "Mis Cursos",
      href: "/dashboard/courses",
      icon: "💻",
      gradient: "from-blue-900/50 to-blue-800/30",
      border: "border-blue-700",
    },
    {
      name: "Hábitos",
      href: "/dashboard/habits",
      icon: "✅",
      gradient: "from-emerald-900/50 to-emerald-800/30",
      border: "border-emerald-700",
    },
    {
      name: "Inglés",
      href: "/dashboard/english",
      icon: "🌐",
      gradient: "from-sky-900/50 to-sky-800/30",
      border: "border-sky-700",
    },
    {
      name: "Mentalidad",
      href: "/dashboard/mindset",
      icon: "🧠",
      gradient: "from-orange-900/50 to-orange-800/30",
      border: "border-orange-700",
    },
    {
      name: "Ejercicio",
      href: "/dashboard/exercise",
      icon: "💪",
      gradient: "from-rose-900/50 to-rose-800/30",
      border: "border-rose-700",
    },
    {
      name: "Configuración",
      href: "/dashboard/settings",
      icon: "⚙️",
      gradient: "from-gray-800 to-gray-700",
      border: "border-gray-700",
    },
  ];

  const pathname = usePathname();



  const proyectosPersonales = [
    {
      id: 1,
      nombre: "Portafolio dev",
      descripcion: "Mi portafolio web personal",
      url: "https://marcoandres-mc.github.io/DevFolio/",
      icono: "💻",
    },
    {
      id: 2,
      nombre: "Linkeding",
      descripcion: "Donde encontrare mi siguiente trabajo",
      url: "https://www.linkedin.com/in/marcoandres-herrera-albites-02a404221/?locale=es",
      icono: "💼",
    },
    {
      id: 3,
      nombre: "Libreria personal",
      descripcion: "Mi portafolio web personal",
      url: "https://marcoandres-mc.github.io/DevFolio/",
      icono: "🚀",
    },
    {
      id: 4,
      nombre: "Actualizar conocimientos",
      descripcion: "Pagina de tecnologias nuevas",
      url: "https://www.thoughtworks.com/es-es/radar",
      icono: "📚",
    }
  ];

  const proyectosUniversidad = [
    {
      id: 1,
      nombre: "Sistema de notas",
      descripcion: "Aplicación web",
      url: "#",
      icono: "📚",
      materia: "Ing. Software",
    },
    {
      id: 2,
      nombre: "Análisis de datos",
      descripcion: "Python + Pandas",
      url: "#",
      icono: "🐍",
      materia: "Estadística",
    },
      {
      id: 3,
      nombre: "Simulación de colas",
      descripcion: "Simulación con Java",
      url: "#",
      icono: "☕",
      materia: "Investigación de operaciones",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-gray-900">
      <Nav />

      <main className="max-w-7xl mx-auto py-6 px-4 gap-6">
        <div className="w-[75%] flex flex-row gap-6">
          {/* COLUMNA IZQUIERDA: Lista de importancia + Acceso directo */}
          <div className="flex flex-col gap-6">
            {" "}
            {/* Quitamos flex-1 para que respete el 75% */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 p-5 shadow-xl">
              <div className=" space-y-6">
                {/* Proyectos personales */}
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 p-5 shadow-xl">
                  <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2 mb-3">
                    <span className="text-2xl">💻</span> Proyectos personales
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {proyectosPersonales.map((proyecto) => (
                      <a
                        key={proyecto.id}
                        href={proyecto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-gray-900/50 rounded-xl p-4 border border-gray-600 hover:border-blue-500 transition"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl group-hover:scale-110 transition">
                            {proyecto.icono}
                          </span>
                          <div>
                            <h3 className="font-semibold text-gray-200 group-hover:text-blue-400">
                              {proyecto.nombre}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {proyecto.descripcion}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <button className="mt-4 text-sm text-blue-400 hover:text-blue-300">
                    + Agregar proyecto
                  </button>
                </div>

                {/* Proyectos universitarios */}
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 p-5 shadow-xl">
                  <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2 mb-3">
                    <span className="text-2xl">🎓</span> Proyectos
                    universitarios
                  </h2>
                  <div className="grid grid-cols-1  gap-4">
                    {proyectosUniversidad.map((proyecto) => (
                      <div
                        key={proyecto.id}
                        rel="noopener noreferrer"
                        className="group block bg-gray-900/50 rounded-xl p-4 border border-gray-600 hover:border-purple-500 transition"
                      >
                        <div className="flex  justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="text-3xl group-hover:scale-110 transition">
                              {proyecto.icono}
                            </span>
                            <div>
                              <h3 className="font-semibold text-gray-200 group-hover:text-purple-400">
                                {proyecto.nombre}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {proyecto.descripcion}
                              </p>
                              <p className="text-[10px] text-gray-500 mt-1">
                                {proyecto.materia}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row  mt-3 text-xs text-gray-400 opacity-100 group-hover:opacity-100 transition">
                            <div className="mb-2 p-2">
                              <h3 className="">Repositorio / Documentos</h3> 
                              <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                {proyecto.nombre}
                              </a>
                            </div> 

                            <div className="my-2 border-t border-gray-700"/>

                            <div className="mb-2 p-2">
                              <h3>Requisitos</h3> 
                              <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                {proyecto.nombre}
                              </a>
                            </div>

                            <div className="my-2 border-t border-gray-700"/>
                            
                            <div className="mb-2 p-2">
                              <h3>Diagrama de clase</h3> 
                              <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                {proyecto.nombre}
                              </a>
                            </div>  
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-sm text-purple-400 hover:text-purple-300">
                    + Agregar proyecto universitario
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Estadísticas + Páginas secundarias */}     
            
            

          

        </div>
      </main>
      <Container />
    </div>
  );
}
