// src/app/dashboard/git/page.tsx
"use client";
import { useState, useEffect } from "react";
import Nav from "@/app/dashboard/components/Nav";

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
  // Bloque 1: Fundamentos
  {
    id: "1",
    nombre: "Repositorios",
    descripcion: "Crear, clonar e inicializar un repositorio Git",
    fase: "📁 Fundamentos",
    documentoLink: "https://git-scm.com/book/es/v2/Fundamentos-de-Git-Repositorios",
    practicaLink: "https://github.com/",
    completado: false,
  },
  {
    id: "2",
    nombre: "add, commit, push, pull",
    descripcion: "Flujo básico de trabajo: staging, guardado y sincronización",
    fase: "📁 Fundamentos",
    documentoLink: "https://git-scm.com/book/es/v2/Fundamentos-de-Git-Registrar-cambios-en-el-repositorio",
    practicaLink: "https://learngitbranching.js.org/",
    completado: false,
  },
  {
    id: "3",
    nombre: "Ramas (branches)",
    descripcion: "Crear, cambiar y eliminar ramas para desarrollo paralelo",
    fase: "📁 Fundamentos",
    documentoLink: "https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Ramificaciones-b%C3%A1sicas",
    practicaLink: "https://learngitbranching.js.org/?locale=es_ES",
    completado: false,
  },
  {
    id: "4",
    nombre: "Merge",
    descripcion: "Unir cambios de una rama a otra (fast-forward, 3-way)",
    fase: "📁 Fundamentos",
    documentoLink: "https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Procedimientos-b%C3%A1sicos-para-ramificaciones-y-fusiones",
    practicaLink: "https://learngitbranching.js.org/?locale=es_ES",
    completado: false,
  },
  {
    id: "5",
    nombre: "Conflictos",
    descripcion: "Resolver conflictos de fusión cuando dos ramas modifican las mismas líneas",
    fase: "📁 Fundamentos",
    documentoLink: "https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Conflictos-de-fusi%C3%B3n",
    practicaLink: "https://learngitbranching.js.org/?locale=es_ES",
    completado: false,
  },
  // Bloque 2: Colaboración
  {
    id: "6",
    nombre: "Pull requests",
    descripcion: "Solicitud de fusión para revisión de código (GitHub)",
    fase: "🤝 Colaboración",
    documentoLink: "https://docs.github.com/es/pull-requests",
    practicaLink: "https://docs.github.com/es/get-started/quickstart/hello-world",
    completado: false,
  },
  {
    id: "7",
    nombre: "Issues",
    descripcion: "Seguimiento de tareas, bugs y mejoras en GitHub",
    fase: "🤝 Colaboración",
    documentoLink: "https://docs.github.com/es/issues",
    practicaLink: "https://docs.github.com/es/issues/tracking-your-work-with-issues/about-issues",
    completado: false,
  },
  {
    id: "8",
    nombre: "Revisión de código",
    descripcion: "Revisar código en pull requests: comentarios, sugerencias, aprobación",
    fase: "🤝 Colaboración",
    documentoLink: "https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests",
    practicaLink: "https://github.com/features/code-review",
    completado: false,
  },
  // Bloque 3: Buenas prácticas
  {
    id: "9",
    nombre: ".gitignore",
    descripcion: "Excluir archivos y carpetas del repositorio (node_modules, .env, etc.)",
    fase: "✨ Buenas prácticas",
    documentoLink: "https://git-scm.com/docs/gitignore",
    practicaLink: "https://www.toptal.com/developers/gitignore",
    completado: false,
  },
  {
    id: "10",
    nombre: "Buenas descripciones de commits",
    descripcion: "Escribir mensajes claros: tipo(alcance): asunto (ej: feat(auth): validar correo)",
    fase: "✨ Buenas prácticas",
    documentoLink: "https://www.conventionalcommits.org/es/v1.0.0/",
    practicaLink: "https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit",
    completado: false,
  },
  {
    id: "11",
    nombre: "GitHub Actions básico",
    descripcion: "Automatización de pruebas y despliegue con workflows",
    fase: "✨ Buenas prácticas",
    documentoLink: "https://docs.github.com/es/actions",
    practicaLink: "https://github.com/features/actions",
    completado: false,
  },
  // Bloque 4: Gestión y versionado
  {
    id: "12",
    nombre: "Etiquetas y versiones",
    descripcion: "Crear etiquetas (tags) para releases y versionado semántico",
    fase: "📦 Gestión y versionado",
    documentoLink: "https://git-scm.com/book/es/v2/Fundamentos-de-Git-Etiquetado",
    practicaLink: "https://semver.org/lang/es/",
    completado: false,
  },
];

export default function GitPage() {
  const [topics, setTopics] = useState<Topic[]>(defaultTopics);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar desde localStorage fusionando con defaults
  useEffect(() => {
    const stored = localStorage.getItem("git_topics");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
    localStorage.setItem("git_topics", JSON.stringify(topics));
  }, [topics]);

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

  const phases = ["📁 Fundamentos", "🤝 Colaboración", "✨ Buenas prácticas", "📦 Gestión y versionado"];
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Cabecera */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-4xl">🐙</span> Git y GitHub
            </h1>
            <p className="text-gray-500 mt-1">
              Aprende a gestionar tu código con control de versiones y colaborar en equipo.
            </p>
          </div>

          {/* Buenas prácticas destacadas */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-5 mb-8">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span>📝</span> Buenas prácticas de commits
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              En lugar de <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">arreglos</span>, escribe:
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">
                fix: validar correo duplicado durante el registro
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Usa el formato: <strong>tipo(alcance): asunto</strong> (ej: feat(auth): agregar login con Google)
            </p>
          </div>

          {/* Ejemplo de README */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <span>📖</span> Estructura de un buen README
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Descripción del problema</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Tecnologías</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Instalación</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Imágenes</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Arquitectura</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Funcionalidades</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Pruebas</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-center">Enlace de demostración</span>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Todo proyecto debe incluir estos apartados para ser profesional y comprensible.
            </p>
          </div>

          {/* Progreso global */}
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

          {/* Temas agrupados por fase */}
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

      {/* Modal */}
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