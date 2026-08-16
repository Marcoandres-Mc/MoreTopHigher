// src/components/TechResources.tsx
"use client";
import { useState } from "react";

interface Tech {
  id: number;
  nombre?: string;
  icono: string; // emoji o URL de imagen
  descripcion: string;
  documentoLink?: string;
  documentoLink2?: string;
  practicaLinks: { nombre: string; url: string }[];
}

const techIcons: { [key: string]: string } = {
  Git: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJ9UWoE_bUWWCmeLvjGOtQsMljYb-akn-OOXBZAqdPg&s=10",
  SQL: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg",
  IngSoftware: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/software.svg",
  // puedes agregar más mapeos si quieres
};

const defaultTechs: Tech[] = [
  {
    id: 1,
    nombre: "Git",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJ9UWoE_bUWWCmeLvjGOtQsMljYb-akn-OOXBZAqdPg&s=10",
    descripcion: "Control de versiones y flujo de trabajo",
    documentoLink: "https://docs.google.com/document/d/1b5r9fh1wb6q0PFOzrySQ_TQFNba8vqwUEtNhnoxh5EA/edit?usp=sharing",
    documentoLink2: "https://docs.google.com/document/d/18nXX1S13WQIMl7KjSBtuu31UB9slfJ-uazC1ewOMgUU/edit?usp=sharing",
    practicaLinks: [
      { nombre: "GitHub Learning Lab", url: "https://lab.github.com/" },
      { nombre: "Oh My Git!", url: "https://ohmygit.org/" },
      { nombre: "Atlassian Git Tutorials", url: "https://www.atlassian.com/git/tutorials" },
    ],
  },
  {
    id: 2,
    nombre: "SQL",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uBUvpL1uGvndTaddFLoUjaT_Aqc1XueBJhHeRxkiIg&s=10",
    descripcion: "Bases de datos relacionales y consultas",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "SQLBolt", url: "https://sqlbolt.com/"},
      { nombre: "SQLZoo", url: "https://sqlzoo.net/" },
      { nombre: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql" },
      { nombre: "LeetCode SQL", url: "https://leetcode.com/problemset/database/" },
      { nombre: "W3Schools SQL", url: "https://www.w3schools.com/sql/" },
    ],
  },
  {
    id: 3,
    nombre: "Ingeniería de Software",
    icono: "🛠️",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
];

export default function TechResources() {
  const [techs, setTechs] = useState<Tech[]>(defaultTechs);
  const [showModal, setShowModal] = useState(false);
  const [editingTech, setEditingTech] = useState<Tech | null>(null);

  // --- Agregar nueva tecnología ---
  const agregarTech = (newTech: Omit<Tech, "id">) => {
    const nuevoId = Math.max(...techs.map(t => t.id), 0) + 1;
    setTechs([...techs, { ...newTech, id: nuevoId }]);
  };

  // --- Editar tecnología existente ---
  const editarTech = (updatedTech: Tech) => {
    setTechs(techs.map(t => (t.id === updatedTech.id ? updatedTech : t)));
  };

  // --- Eliminar tecnología ---
  const eliminarTech = (id: number) => {
    if (confirm("¿Eliminar esta tecnología?")) {
      setTechs(techs.filter(t => t.id !== id));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-3xl">💻</span> Code Mode – Recursos por tecnología
        </h2>
        <button
          onClick={() => {
            setEditingTech(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Agregar tecnología
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techs.map((tech) => (
          <div
            key={tech.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition group"
          >
            {/* Cabecera con icono y nombre */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-4 flex items-center gap-3 ">
              <div className="flex-shrink-0 bg-amber-50 rounded-full p-2 flex items-center justify-center w-24 h-12">
                {tech.icono.startsWith("http") ? (
                  <img src={tech.icono} alt={tech.nombre} className="w-20 h-8 " />
                ) : (
                  <span className="text-2xl">{tech.icono}</span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white">{tech.nombre}</h3>
              <span className="ml-auto text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                {tech.practicaLinks.length} recursos
              </span>
            </div>

            {/* Cuerpo */}
            <div className="p-5">
              <p className="text-gray-600 text-sm mb-4">{tech.descripcion}</p>

              {tech.documentoLink && (
                <div className="mb-3">
                  <a
                    href={tech.documentoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <span>📄</span> Ver documento
                  </a>
                </div>
              )}

              {tech.documentoLink2 && (
                <div className="mb-3">
                  <a
                    href={tech.documentoLink2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <span>📄</span> Ver documento 2
                  </a>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  🎯 Práctica
                </p>
                <div className="flex flex-wrap gap-2">
                  {tech.practicaLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition"
                    >
                      {link.nombre} →
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      // Aquí podrías abrir un modal para añadir un nuevo enlace de práctica
                      const nombre = prompt("Nombre del recurso de práctica:");
                      if (!nombre) return;
                      const url = prompt("URL:");
                      if (!url) return;
                      const updated = { ...tech, practicaLinks: [...tech.practicaLinks, { nombre, url }] };
                      editarTech(updated);
                    }}
                    className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
                  >
                    + añadir
                  </button>
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setEditingTech(tech);
                    setShowModal(true);
                  }}
                  className="text-xs text-gray-400 hover:text-blue-600"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminarTech(tech.id)}
                  className="text-xs text-gray-400 hover:text-red-600"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar/editar tecnología */}
      {showModal && (
        <TechModal
          tech={editingTech}
          onSave={(data) => {
            if (editingTech) {
              editarTech({ ...data, id: editingTech.id, practicaLinks: editingTech.practicaLinks });
            } else {
              agregarTech({ ...data, practicaLinks: [] });
            }
            setShowModal(false);
            setEditingTech(null);
          }}
          onClose={() => {
            setShowModal(false);
            setEditingTech(null);
          }}
        />
      )}
    </div>
  );
}

// ==================== MODAL PARA TECNOLOGÍAS ====================

function TechModal({
  tech,
  onSave,
  onClose,
}: {
  tech?: Tech | null;
  onSave: (data: Omit<Tech, "id" | "practicaLinks">) => void;
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState(tech?.nombre || "");
  const [icono, setIcono] = useState(tech?.icono || "📘");
  const [descripcion, setDescripcion] = useState(tech?.descripcion || "");
  const [documentoLink, setDocumentoLink] = useState(tech?.documentoLink || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onSave({ nombre, icono, descripcion, documentoLink });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {tech ? "Editar tecnología" : "Nueva tecnología"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre (ej. Git, SQL)"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
            required
          />
          <input
            type="text"
            placeholder="Icono (emoji o URL de imagen)"
            value={icono}
            onChange={(e) => setIcono(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
          />
          <input
            type="text"
            placeholder="Descripción corta"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
          />
          <input
            type="url"
            placeholder="Link a documento (opcional)"
            value={documentoLink}
            onChange={(e) => setDocumentoLink(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-4"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-xl">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
