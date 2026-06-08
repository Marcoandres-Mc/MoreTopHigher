// src/app/dashboard/courses/components/CourseAccordion.tsx
"use client";
import React, { useState } from 'react';

interface Resource {
  id: number;
  name: string;
  url: string;
  type: string;
}

interface WeekResource {
  id: number;
  weekNumber: number;
  resources: Resource[];
}

interface CourseAccordionProps {
  selectedCourse: {
    id: number;
    name: string;
    weeks: WeekResource[];
  };
  onAddWeek: (courseId: number) => void;
  onDeleteWeek: (courseId: number, weekId: number) => void;
  onAddResourceToWeek: (courseId: number, weekId: number, resource: Omit<Resource, "id">) => void;
  onDeleteResourceFromWeek: (courseId: number, weekId: number, resourceId: number) => void;
}

const CourseAccordion: React.FC<CourseAccordionProps> = ({
  selectedCourse,
  onAddWeek,
  onDeleteWeek,
  onAddResourceToWeek,
  onDeleteResourceFromWeek,
}) => {
  const [openSection, setOpenSection] = useState<string | null>("introduccion");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const getResourceIcon = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'video': return '🎬';
      case 'link': return '🔗';
      default: return '📁';
    }
  };

  const semanasNormales = selectedCourse.weeks.filter(w => w.weekNumber >= 1 && w.weekNumber <= 15);
  const semanasExtras = selectedCourse.weeks.filter(w => w.weekNumber > 15);

  return (
    <div className="space-y-4">
      {/* SECCIÓN 1: INTRODUCCIÓN */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("introduccion")}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📘</span>
            <h3 className="text-lg font-semibold text-gray-800">Introducción</h3>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Syllabus</span>
          </div>
          <span className="text-gray-400 transition-transform duration-200">
            {openSection === "introduccion" ? "▲" : "▼"}
          </span>
        </button>

        {openSection === "introduccion" && (
          <div className="p-6 border-t border-gray-100">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📋</span> Syllabus / Temario
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Temas principales del curso: Fundamentos, desarrollo práctico, evaluación continua.
                </p>
                <button className="text-xs text-blue-500 hover:text-blue-700">
                  + Ver documento completo
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>✅</span> Requisitos previos
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Conocimientos básicos de programación</li>
                  <li>Computadora con acceso a internet</li>
                  <li>Software necesario instalado (VS Code, Git)</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>🎯</span> Objetivos del curso
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Dominar los fundamentos de la materia</li>
                  <li>Aplicar conceptos en proyectos prácticos</li>
                  <li>Prepararse para certificaciones o niveles superiores</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECCIÓN 2: SEMANAS 1-15 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("semanas")}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <h3 className="text-lg font-semibold text-gray-800">Semanas (1 al 15)</h3>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
              {semanasNormales.length} semanas
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); onAddWeek(selectedCourse.id); }}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              + Agregar semana
            </button>
            <span className="text-gray-400 transition-transform duration-200">
              {openSection === "semanas" ? "▲" : "▼"}
            </span>
          </div>
        </button>

        {openSection === "semanas" && (
          <div className="p-6 border-t border-gray-100">
            {semanasNormales.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">
                No hay semanas creadas. Agrega una semana para organizar los recursos.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {semanasNormales.map((week) => (
                  <div key={week.id} className="border border-gray-200 rounded-xl p-3 bg-gray-50 hover:shadow-md transition">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800">Semana {week.weekNumber}</h4>
                      <button
                        onClick={() => onDeleteWeek(selectedCourse.id, week.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="space-y-2 mb-2 max-h-40 overflow-y-auto">
                      {week.resources.length === 0 && (
                        <p className="text-xs text-gray-400">No hay recursos</p>
                      )}
                      {week.resources.map((res) => (
                        <div key={res.id} className="flex justify-between items-center bg-white p-2 rounded-lg">
                          <div className="flex items-center gap-2 flex-1">
                            <span>{getResourceIcon(res.type)}</span>
                            <a href={res.url} target="_blank" className="text-xs text-blue-600 hover:underline truncate">
                              {res.name}
                            </a>
                          </div>
                          <button
                            onClick={() => onDeleteResourceFromWeek(selectedCourse.id, week.id, res.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const name = prompt("Nombre del recurso:");
                        if (!name) return;
                        const url = prompt("URL:");
                        if (!url) return;
                        const type = prompt("Tipo (pdf, video, link):") || "link";
                        onAddResourceToWeek(selectedCourse.id, week.id, { name, url, type });
                      }}
                      className="text-xs text-blue-500 hover:text-blue-700 mt-1"
                    >
                      + Añadir recurso
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECCIÓN 3: FINAL / ADICIONAL */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("final")}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏁</span>
            <h3 className="text-lg font-semibold text-gray-800">Final / Adicional</h3>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
              Proyecto final + extras
            </span>
          </div>
          <span className="text-gray-400 transition-transform duration-200">
            {openSection === "final" ? "▲" : "▼"}
          </span>
        </button>

        {openSection === "final" && (
          <div className="p-6 border-t border-gray-100">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>🏆</span> Proyecto Final
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Descripción del proyecto final, fechas de entrega y rúbrica de evaluación.
                </p>
                <div className="flex gap-3">
                  <button className="text-xs text-blue-500 hover:text-blue-700">📋 Ver rúbrica</button>
                  <button className="text-xs text-blue-500 hover:text-blue-700">📎 Subir proyecto</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📝</span> Examen Final
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Fecha: Por definir | Formato: Práctico + Teórico
                </p>
                <button className="text-xs text-blue-500 hover:text-blue-700">📚 Material de estudio</button>
              </div>

              {semanasExtras.length > 0 && (
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span>➕</span> Contenido adicional
                  </h4>
                  <div className="space-y-2">
                    {semanasExtras.map((week) => (
                      <div key={week.id} className="border-b border-gray-200 pb-2 last:border-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">Semana {week.weekNumber}</span>
                          <button onClick={() => onDeleteWeek(selectedCourse.id, week.id)} className="text-xs text-red-500">Eliminar</button>
                        </div>
                        {week.resources.map((res) => (
                          <div key={res.id} className="flex items-center gap-2 ml-4 mt-1">
                            <span>{getResourceIcon(res.type)}</span>
                            <a href={res.url} target="_blank" className="text-xs text-blue-600">{res.name}</a>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  const weekNumber = parseInt(prompt("Número de semana (ej. 16, 17):") || "0");
                  if (weekNumber > 15) {
                    onAddWeek(selectedCourse.id);
                  } else {
                    alert("Las semanas adicionales deben ser mayores a 15");
                  }
                }}
                className="text-sm text-purple-500 hover:text-purple-700 flex items-center gap-1"
              >
                + Agregar contenido adicional (semana &gt;15)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAccordion;  // ← EXPORTACIÓN POR DEFECTO