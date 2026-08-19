// src/components/TechResources.tsx
"use client";
import { useState } from "react";

interface Tech {
  id: number;
  nombre: string;
  icono: string;
  descripcion: string;
  documentoLink?: string;
  documentoLink2?: string;
  practicaLinks: { nombre: string; url: string }[];
}

// Definimos las categorías con los índices de defaultTechs
const categorias = [
  {
    nombre: "📐 Ingeniería de Software",
    items: [0, 1], // ids 1 y 2
  },
  {
    nombre: "💻 Programación",
    items: [2, 3, 4], // ids 3, 4, 5
  },
  {
    nombre: "🗄️ Bases de datos y Backend",
    items: [6, 7], // ids 7 y 8 (SQL, Backend)
  },
  {
    nombre: "☁️ DevOps, nube y arquitectura",
    items: [10, 11], // ids 11 y 12 (Arquitectura, Docker/DevOps)
  },
  {
    nombre: "🛠️ Herramientas y desarrollo",
    items: [5, 8, 9], // ids 6, 9, 10 (Git, App móviles, Pruebas)
  },
];

const defaultTechs: Tech[] = [
  // --- Ingeniería de Software (ids 1,2) ---
  {
    id: 1,
    nombre: "Ingeniería de Software",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ia6p8k7ivJeN8fSAc_AapZ4bEuP8ffyjWVJKP6cmiSon3nnFhnmAP7Lu&s=10",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  {
    id: 2,
    nombre: "Requisitos y modelado",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDvy2fLsuxsIcH11pSUR3MdBFqOuAjyMof3u3nhXiHuQ&s=10",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "/dashboard/codeMode/cursos/requisitos",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  // --- Programación (ids 3,4,5) ---
  {
    id: 3,
    nombre: "Programación",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6LxKivfOQTyTQzndeaHBva8NNXKTMc0VgW6Mz4t7jjhSVqNRGyFvpW4zw&s=10",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "/dashboard/codeMode/cursos/programacion",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  {
    id: 4,
    nombre: "Programación POO",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz28WWxQQpVGZhO5EIdV1tVxxQdJPZjlgViZLW8Jdtt4MS8uhmK0jX8Ys&s=10",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "/dashboard/codeMode/cursos/programacionPoo",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  {
    id: 5,
    nombre: "Algoritmos y estructuras de datos",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT810tsT-2oz90xs1PMIOSyjdtoZNhErzLbV7ZnTawD4W7Oy9ft3aQU0dg&s=10",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "/dashboard/codeMode/cursos/algoritmos-estructura",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  // --- Herramientas y desarrollo (ids 6,9,10) ---
  {
    id: 6,
    nombre: "Git",
    icono: "https://norvicsoftware.com/wp-content/uploads/2024/01/que-es-git.png",
    descripcion: "Control de versiones y flujo de trabajo",
    documentoLink: "/dashboard/codeMode/cursos/git-github",
    practicaLinks: [
      { nombre: "GitHub Learning Lab", url: "https://lab.github.com/" },
      { nombre: "Oh My Git!", url: "https://ohmygit.org/" },
      { nombre: "Atlassian Git Tutorials", url: "https://www.atlassian.com/git/tutorials" },
    ],
  },
  // --- Bases de datos y Backend (ids 7,8) ---
  {
    id: 7,
    nombre: "SQL",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uBUvpL1uGvndTaddFLoUjaT_Aqc1XueBJhHeRxkiIg&s=10",
    descripcion: "Bases de datos relacionales y consultas",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "SQLBolt", url: "https://sqlbolt.com/" },
      { nombre: "SQLZoo", url: "https://sqlzoo.net/" },
      { nombre: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql" },
      { nombre: "LeetCode SQL", url: "https://leetcode.com/problemset/database/" },
      { nombre: "W3Schools SQL", url: "https://www.w3schools.com/sql/" },
    ],
  },
  {
    id: 8,
    nombre: "Backend",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT88_3uog0FJw1HOuAiha_W_xtYaQOQp4kCMarojNKVpg&s=10",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  // --- Herramientas y desarrollo (ids 9,10) ---
  {
    id: 9,
    nombre: "App móviles",
    icono: "https://www.beetrack.com/hs-fs/hubfs/Stock%20images/Hand%20holding%20smartphone%20with%20colorful%20app%20icons%20concept.jpeg?width=1600&name=Hand%20holding%20smartphone%20with%20colorful%20app%20icons%20concept.jpeg",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  {
    id: 10,
    nombre: "Pruebas y calidad del software",
    icono: "https://i0.wp.com/zimbronapps.com/wp-content/uploads/2017/11/calidad-de-sotfware.png?fit=400%2C389&ssl=1",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  // --- DevOps, nube y arquitectura (ids 11,12) ---
  {
    id: 11,
    nombre: "Arquitectura de software",
    icono: "https://www.bbva.com/wp-content/uploads/2024/05/bbva-arquitectura-software-innovacion.png",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
  {
    id: 12,
    nombre: "Docker, DevOps y nube",
    icono: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1SJxzgkmCGjyaA35uRq4hqR9GOrI874pK2Mx3JzQkxrWgevugX_U18VI&s=10",
    descripcion: "Principios y prácticas de desarrollo de software",
    documentoLink: "https://docs.google.com/document/d/1t-AMAF0qd8GpHFW1rP3YCA3TySqFGf42qaK7BTTl0XM/edit?usp=sharing",
    practicaLinks: [
      { nombre: "Clean Code", url: "https://www.oreilly.com/library/view/clean-code/9780136083238/" },
      { nombre: "Refactoring Guru", url: "https://refactoring.guru/" },
      { nombre: "Design Patterns", url: "https://sourcemaking.com/design_patterns" },
    ],
  },
];

// ===== COMPONENTE FEATURECARD (COMPACTO) =====
function FeatureCard({
  image,
  title,
  gradient = "from-blue-900/40 to-purple-900/40",
  url = "#",
  children,
  badge,
}: {
  image?: string;
  title: string;
  gradient?: string;
  url?: string;
  children?: React.ReactNode;
  badge?: string;
}) {
  return (
    <div
      className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer overflow-hidden`}
    >
      {badge && (
        <span className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
          {badge}
        </span>
      )}
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {image && (
          <div className="overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-3">
          <h3 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
            {title}
          </h3>
          {children && <div className="mt-2 flex flex-wrap gap-1">{children}</div>}
        </div>
      </a>
    </div>
  );
}

export default function TechResources() {
  const [techs, setTechs] = useState<Tech[]>(defaultTechs);
  const [showModal, setShowModal] = useState(false);
  const [editingTech, setEditingTech] = useState<Tech | null>(null);

  const agregarTech = (newTech: Omit<Tech, "id">) => {
    const nuevoId = Math.max(...techs.map(t => t.id), 0) + 1;
    setTechs([...techs, { ...newTech, id: nuevoId }]);
  };

  const editarTech = (updatedTech: Tech) => {
    setTechs(techs.map(t => (t.id === updatedTech.id ? updatedTech : t)));
  };

  const eliminarTech = (id: number) => {
    if (confirm("¿Eliminar esta tecnología?")) {
      setTechs(techs.filter(t => t.id !== id));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
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

      {/* Renderizado por categorías */}
      {categorias.map((cat) => (
        <div key={cat.nombre} className="mb-10">
          <h3 className="text-lg font-semibold text-white/80 mb-3 border-b border-white/10 pb-2">
            {cat.nombre}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cat.items.map((idx) => {
              const tech = techs[idx];
              if (!tech) return null;
              return (
                <FeatureCard
                  key={tech.id}
                  image={tech.icono}
                  title={tech.nombre}
                  url={tech.documentoLink || "#"}
                />
              );
            })}
          </div>
        </div>
      ))}

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
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">
          {tech ? "Editar tecnología" : "Nueva tecnología"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre (ej. Git, SQL)"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl mb-3 text-white"
            required
          />
          <input
            type="text"
            placeholder="Icono (URL o emoji)"
            value={icono}
            onChange={(e) => setIcono(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl mb-3 text-white"
          />
          <input
            type="text"
            placeholder="Descripción corta"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl mb-3 text-white"
          />
          <input
            type="url"
            placeholder="Link a documento"
            value={documentoLink}
            onChange={(e) => setDocumentoLink(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl mb-4 text-white"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-xl hover:bg-gray-500 transition">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}