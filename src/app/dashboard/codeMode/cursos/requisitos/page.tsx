// src/app/dashboard/requirements/page.tsx
"use client";
import { useState, useEffect } from "react";
import Nav from "@/app/dashboard/components/Nav";

// ========== DEFINICIÓN DE FASES Y TEMAS ==========

interface Topic {
  id: string;
  nombre: string;
  descripcion: string;
  fase: string;
  documentoLink: string;
  practicaLink: string;
  completado: boolean;
}

const defaultTopics: Topic[] = [
  // Fase 1: Entender el problema
  {
    id: "1",
    nombre: "Identificación de interesados",
    descripcion: "¿Quiénes participan? (estudiantes, profesores, administradores)",
    fase: "🔍 Entender el problema",
    documentoLink: "https://es.wikipedia.org/wiki/Parte_interesada",
    practicaLink: "https://www.visual-paradigm.com/guide/software-development-process/stakeholder-identification/",
    completado: false,
  },
  // Fase 2: Necesidades y requisitos
  {
    id: "2",
    nombre: "Requisitos funcionales",
    descripcion: "¿Qué debe hacer el sistema? (ej: registrar matrícula)",
    fase: "📋 Necesidades y requisitos",
    documentoLink: "https://es.wikipedia.org/wiki/Requisito_funcional",
    practicaLink: "https://www.ibm.com/docs/es/elm/6.0?topic=requirements-functional",
    completado: false,
  },
  {
    id: "3",
    nombre: "Requisitos no funcionales",
    descripcion: "¿Cómo debe ser el sistema? (rendimiento, seguridad, usabilidad)",
    fase: "📋 Necesidades y requisitos",
    documentoLink: "https://es.wikipedia.org/wiki/Requisito_no_funcional",
    practicaLink: "https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/requisitos-no-funcionales/",
    completado: false,
  },
  {
    id: "4",
    nombre: "Reglas de negocio",
    descripcion: "Políticas y restricciones del negocio (ej: un estudiante no puede matricularse si tiene deuda)",
    fase: "📋 Necesidades y requisitos",
    documentoLink: "https://es.wikipedia.org/wiki/Regla_de_negocio",
    practicaLink: "https://www.visual-paradigm.com/guide/software-development-process/business-rule-examples/",
    completado: false,
  },
  {
    id: "5",
    nombre: "Priorización",
    descripcion: "¿Qué es más importante? (MoSCoW, Eisenhower)",
    fase: "📋 Necesidades y requisitos",
    documentoLink: "https://es.wikipedia.org/wiki/M%C3%A9todo_MoSCoW",
    practicaLink: "https://www.productplan.com/glossary/moscow-prioritization/",
    completado: false,
  },
  {
    id: "6",
    nombre: "Validación y verificación",
    descripcion: "¿Estamos construyendo lo correcto? ¿Lo estamos construyendo bien?",
    fase: "📋 Necesidades y requisitos",
    documentoLink: "https://es.wikipedia.org/wiki/Verificaci%C3%B3n_y_validaci%C3%B3n_(ingenier%C3%ADa_de_software)",
    practicaLink: "https://www.ibm.com/docs/es/engineering-lifecycle-management-suite/7.0.2?topic=requirements-validation-verification",
    completado: false,
  },
  // Fase 3: Historias y casos de uso
  {
    id: "7",
    nombre: "Historias de usuario",
    descripcion: "Como [rol], quiero [acción] para [beneficio]",
    fase: "📝 Historias y casos de uso",
    documentoLink: "https://es.wikipedia.org/wiki/Historia_de_usuario",
    practicaLink: "https://www.atlassian.com/es/agile/project-management/user-stories",
    completado: false,
  },
  {
    id: "8",
    nombre: "Criterios de aceptación",
    descripcion: "Condiciones que debe cumplir una historia para ser aceptada",
    fase: "📝 Historias y casos de uso",
    documentoLink: "https://es.wikipedia.org/wiki/Criterios_de_aceptaci%C3%B3n",
    practicaLink: "https://www.centro-virtual.com/recursos/biblioteca/criterios_de_aceptacion.pdf",
    completado: false,
  },
  {
    id: "9",
    nombre: "Casos de uso",
    descripcion: "Interacción entre actor y sistema para lograr un objetivo",
    fase: "📝 Historias y casos de uso",
    documentoLink: "https://es.wikipedia.org/wiki/Caso_de_uso",
    practicaLink: "https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-use-case-diagram/",
    completado: false,
  },
  // Fase 4: Modelado
  {
    id: "10",
    nombre: "Diagramas UML",
    descripcion: "Representación visual del sistema (clases, secuencia, estados)",
    fase: "📐 Modelado",
    documentoLink: "https://es.wikipedia.org/wiki/Lenguaje_unificado_de_modelado",
    practicaLink: "https://www.uml-diagrams.org/",
    completado: false,
  },
  {
    id: "11",
    nombre: "Modelado de procesos",
    descripcion: "Flujos de trabajo y procesos de negocio (BPMN, diagramas de actividades)",
    fase: "📐 Modelado",
    documentoLink: "https://es.wikipedia.org/wiki/Modelado_de_procesos_de_negocio",
    practicaLink: "https://www.bpmn.org/",
    completado: false,
  },
  {
    id: "12",
    nombre: "Event Storming",
    descripcion: "Taller colaborativo para descubrir eventos del dominio",
    fase: "📐 Modelado",
    documentoLink: "https://es.wikipedia.org/wiki/Event_Storming",
    practicaLink: "https://www.eventstorming.com/",
    completado: false,
  },
  {
    id: "13",
    nombre: "Lenguaje ubicuo",
    descripcion: "Vocabulario común entre negocio y desarrollo (DDD)",
    fase: "📐 Modelado",
    documentoLink: "https://es.wikipedia.org/wiki/Dise%C3%B1o_impulsado_por_el_dominio#Lenguaje_ubicuo",
    practicaLink: "https://martinfowler.com/bliki/UbiquitousLanguage.html",
    completado: false,
  },
];

// ========== COMPONENTE PRINCIPAL ==========

export default function RequirementsPage() {
  const [topics, setTopics] = useState<Topic[]>(defaultTopics);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [problema, setProblema] = useState("");

  // Cargar desde localStorage
  // Reemplaza el useEffect de carga con este:
useEffect(() => {
  const stored = localStorage.getItem("requirements_topics");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Fusionar: para cada tema por defecto, si existe en parsed, tomar sus enlaces y completado
      const merged = defaultTopics.map((defaultTopic) => {
        const saved = parsed.find((p: Topic) => p.id === defaultTopic.id);
        if (saved) {
          return {
            ...defaultTopic,
            documentoLink: saved.documentoLink || defaultTopic.documentoLink,
            practicaLink: saved.practicaLink || defaultTopic.practicaLink,
            completado: saved.completado || false,
          };
        }
        return defaultTopic;
      });
      setTopics(merged);
    } catch (e) {
      console.error("Error cargando datos:", e);
      setTopics(defaultTopics);
    }
  } else {
    setTopics(defaultTopics);
  }
}, []);

  useEffect(() => {
    localStorage.setItem("requirements_topics", JSON.stringify(topics));
  }, [topics]);

  // Actualizar enlaces
  const updateTopic = (id: string, documentoLink: string, practicaLink: string) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, documentoLink, practicaLink, completado: Boolean(documentoLink && practicaLink) }
          : t
      )
    );
  };

  const openEditModal = (topic: Topic) => {
    setEditingTopic(topic);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTopic(null);
  };

  const handleSave = (docLink: string, pracLink: string) => {
    if (editingTopic) {
      updateTopic(editingTopic.id, docLink, pracLink);
    }
    closeModal();
  };

  // Calcular progreso por fase
  const phases = ["🔍 Entender el problema", "📋 Necesidades y requisitos", "📝 Historias y casos de uso", "📐 Modelado"];
  const getPhaseProgress = (fase: string) => {
    const items = topics.filter((t) => t.fase === fase);
    const done = items.filter((t) => t.completado).length;
    return { total: items.length, done };
  };

  const total = topics.length;
  const completed = topics.filter((t) => t.completado).length;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* ===== CABECERA ===== */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-4xl">🧠</span> Requisitos y Modelado
            </h1>
            <p className="text-gray-500 mt-1">
              Aprende a transformar un problema real en una solución de software verificable.
            </p>
          </div>

          {/* ===== FLUJO DE TRANSFORMACIÓN ===== */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 overflow-x-auto">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              🔄 Flujo de transformación (Problema → Solución)
            </h2>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 min-w-max flex-wrap">
              <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full whitespace-nowrap">⚠️ Problema</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full whitespace-nowrap">👥 Stakeholders</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full whitespace-nowrap">🎯 Necesidades</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full whitespace-nowrap">📋 Requisitos</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full whitespace-nowrap">📝 Historias</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-teal-100 text-teal-700 rounded-full whitespace-nowrap">✅ Criterios</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full whitespace-nowrap">📐 Modelo</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full whitespace-nowrap">⚙️ Diseño</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full whitespace-nowrap">💻 Código</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-full whitespace-nowrap">🧪 Pruebas</span>
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">
              ⭐ Esta conexión es la habilidad clave de un Ingeniero de Software: pasar de una necesidad a un producto funcional.
            </p>
          </div>

          {/* ===== EJEMPLO PRÁCTICO (interactivo) ===== */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-5 mb-8">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <span>💡</span> Ejemplo práctico
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Escribe un problema (ej: Una universidad quiere crear un sistema de matrícula) y observa cómo se transforma en cada fase.
            </p>
            <input
              type="text"
              placeholder='Ej: "Una universidad quiere crear un sistema de matrícula"'
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
              className="w-full p-3 border border-indigo-200 rounded-xl bg-white/70 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
            />
            {problema && (
              <div className="mt-4 text-sm text-gray-700 bg-white/60 p-4 rounded-xl border border-indigo-100">
                <p><strong>🔍 Entender el problema:</strong> ¿Quiénes participan? (estudiantes, profesores, administradores)</p>
                <p><strong>📋 Necesidades y requisitos:</strong> ¿Qué debe hacer el sistema? (registrar matrícula, validar prerrequisitos)</p>
                <p><strong>📝 Historias y casos de uso:</strong> Como estudiante, quiero matricularme para... Como administrador, quiero gestionar...</p>
                <p><strong>📐 Modelado:</strong> Diagrama de clases, secuencia, BPMN del proceso de matrícula.</p>
              </div>
            )}
          </div>

          {/* ===== PROGRESO GLOBAL ===== */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-sm text-gray-600">Progreso total</span>
              <span className="ml-2 text-lg font-bold text-blue-600">
                {completed}/{total}
              </span>
            </div>
            <div className="w-48 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </div>
          </div>

          {/* ===== TEMAS AGRUPADOS POR FASE ===== */}
          {phases.map((fase) => {
            const items = topics.filter((t) => t.fase === fase);
            const { done, total: faseTotal } = getPhaseProgress(fase);
            return (
              <div key={fase} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-gray-700">{fase}</h2>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
                    {done}/{faseTotal} completados
                  </span>
                  {done === faseTotal && faseTotal > 0 && (
                    <span className="text-green-500 text-sm">✅</span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((topic) => (
                    <div
                      key={topic.id}
                      className={`group relative bg-white rounded-2xl shadow-sm border p-5 transition-all hover:shadow-md hover:-translate-y-1 ${
                        topic.completado
                          ? "border-green-200 bg-green-50/40"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-800 text-sm pr-6">
                          {topic.nombre}
                        </h3>
                        {topic.completado && (
                          <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 mb-3 line-clamp-2">
                        {topic.descripcion}
                      </p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-400">📄</span>
                          {topic.documentoLink ? (
                            <a
                              href={topic.documentoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline truncate"
                            >
                              Documento
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">Sin documento</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-400">💻</span>
                          {topic.practicaLink ? (
                            <a
                              href={topic.practicaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline truncate"
                            >
                              Práctica
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">Sin práctica</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => openEditModal(topic)}
                        className="mt-3 w-full py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-blue-400 transition flex items-center justify-center gap-1"
                      >
                        ✏️ {topic.completado ? "Editar enlaces" : "Agregar enlaces"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && editingTopic && (
        <EditModal topic={editingTopic} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  );
}

// ==================== MODAL ====================

function EditModal({
  topic,
  onSave,
  onClose,
}: {
  topic: Topic;
  onSave: (docLink: string, pracLink: string) => void;
  onClose: () => void;
}) {
  const [docLink, setDocLink] = useState(topic.documentoLink || "");
  const [pracLink, setPracLink] = useState(topic.practicaLink || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(docLink.trim(), pracLink.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Enlaces para: {topic.nombre}</h2>
        <p className="text-sm text-gray-500 mb-4">{topic.descripcion}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📄 Documento / Teoría
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={docLink}
              onChange={(e) => setDocLink(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              💻 Práctica / Ejercicios
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={pracLink}
              onChange={(e) => setPracLink(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}