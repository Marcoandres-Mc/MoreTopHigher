// src/app/dashboard/programming/page.tsx
"use client";
import { useState, useEffect } from "react";
import Nav from "@/app/dashboard/components/Nav";

interface Language {
  id: string;
  name: string;
  description: string;
  image: string; // URL de la imagen
  docLink: string;
}

const defaultLanguages: Language[] = [
  {
    id: "1",
    name: "JavaScript",
    description: "Lenguaje de programación interpretado, orientado a objetos y multiplataforma.",
    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg",
    docLink: "https://developer.mozilla.org/es/docs/Web/JavaScript",
  },
  {
    id: "2",
    name: "Python",
    description: "Lenguaje de alto nivel, interpretado y de propósito general.",
    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg",
    docLink: "https://docs.python.org/3/",
  },
  {
    id: "3",
    name: "Java",
    description: "Lenguaje de programación orientado a objetos, robusto y multiplataforma.",
    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/java.svg",
    docLink: "https://docs.oracle.com/en/java/",
  },
  {
    id: "4",
    name: "C#",
    description: "Lenguaje de programación moderno, orientado a objetos y desarrollado por Microsoft.",
    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/csharp.svg",
    docLink: "https://docs.microsoft.com/es-es/dotnet/csharp/",
  },
  {
    id: "5",
    name: "TypeScript",
    description: "Superset de JavaScript que añade tipado estático.",
    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg",
    docLink: "https://www.typescriptlang.org/docs/",
  },
  {
    id: "6",
    name: "React",
    description: "Biblioteca de JavaScript para construir interfaces de usuario.",
    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg",
    docLink: "https://react.dev/",
  },
  {
    id: "7",
    name: "Node.js",
    description: "Entorno de ejecución de JavaScript en el servidor.",
    image: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg",
    docLink: "https://nodejs.org/es/docs/",
  },
];

export default function ProgrammingPage() {
  const [languages, setLanguages] = useState<Language[]>(defaultLanguages);
  const [editingLang, setEditingLang] = useState<Language | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("programming_languages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Fusionar con defaults para agregar nuevos lenguajes si se añaden en el futuro
        const merged = defaultLanguages.map((defaultLang) => {
          const saved = parsed.find((p: Language) => p.id === defaultLang.id);
          if (saved) {
            return {
              ...defaultLang,
              image: saved.image || defaultLang.image,
              docLink: saved.docLink || defaultLang.docLink,
            };
          }
          return defaultLang;
        });
        // Agregar lenguajes que estén en saved pero no en defaults
        const extra = parsed.filter((p: Language) => !defaultLanguages.some(d => d.id === p.id));
        setLanguages([...merged, ...extra]);
      } catch (e) {
        console.error("Error cargando datos:", e);
        setLanguages(defaultLanguages);
      }
    } else {
      setLanguages(defaultLanguages);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("programming_languages", JSON.stringify(languages));
  }, [languages]);

  const addLanguage = (lang: Omit<Language, "id">) => {
    const newId = (Math.max(...languages.map(l => parseInt(l.id)), 0) + 1).toString();
    setLanguages([...languages, { ...lang, id: newId }]);
  };

  const updateLanguage = (lang: Language) => {
    setLanguages(languages.map(l => (l.id === lang.id ? lang : l)));
  };

  const deleteLanguage = (id: string) => {
    if (confirm("¿Eliminar este lenguaje?")) {
      setLanguages(languages.filter(l => l.id !== id));
    }
  };

  const openEditModal = (lang?: Language) => {
    setEditingLang(lang || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLang(null);
  };

  const handleSave = (langData: Omit<Language, "id">) => {
    if (editingLang) {
      updateLanguage({ ...langData, id: editingLang.id });
    } else {
      addLanguage(langData);
    }
    closeModal();
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <span className="text-4xl">💻</span> Lenguajes de Programación
              </h1>
              <p className="text-gray-300 mt-1">Documentación y recursos por lenguaje</p>
            </div>
            <button
              onClick={() => openEditModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              + Agregar lenguaje
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition group"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={lang.image}
                    alt={lang.name}
                    className="w-16 h-16 object-contain mb-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/64?text=💻";
                    }}
                  />
                  <h3 className="text-lg font-bold text-white">{lang.name}</h3>
                  <p className="text-sm text-gray-300 mt-1 line-clamp-2">{lang.description}</p>
                  <a
                    href={lang.docLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition"
                  >
                    📄 Documentación
                  </a>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(lang); }}
                      className="p-1 text-white/60 hover:text-white"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteLanguage(lang.id); }}
                      className="p-1 text-white/60 hover:text-red-400"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <LanguageModal
          lang={editingLang}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </>
  );
}

// Modal para agregar/editar lenguaje
function LanguageModal({
  lang,
  onSave,
  onClose,
}: {
  lang?: Language | null;
  onSave: (data: Omit<Language, "id">) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(lang?.name || "");
  const [description, setDescription] = useState(lang?.description || "");
  const [image, setImage] = useState(lang?.image || "");
  const [docLink, setDocLink] = useState(lang?.docLink || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image.trim() || !docLink.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }
    onSave({ name, description, image, docLink });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">{lang ? "Editar lenguaje" : "Nuevo lenguaje"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Ej: JavaScript"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
            <input
              type="text"
              placeholder="Breve descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-300 mb-1">URL de la imagen (logo)</label>
            <input
              type="url"
              placeholder="https://ejemplo.com/logo.svg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Enlace a documentación</label>
            <input
              type="url"
              placeholder="https://docs.ejemplo.com"
              value={docLink}
              onChange={(e) => setDocLink(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded-xl hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}