// src/app/dashboard/mindset/page.tsx
"use client";
import { useState } from "react";
import Nav from "@/app/dashboard/components/Nav";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  imagen: string; // URL de la portada
  documentoLink: string; // URL del documento (PDF, Google Docs, etc.)
  descripcion?: string;
}

export default function MindsetPage() {
  // Lista de libros de mentalidad/desarrollo personal
  const [libros, setLibros] = useState<Libro[]>([
    {
      id: 1,
      titulo: "Diario para estoicos",
      autor: "Ryan Holiday",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK3RiqqLbvDgKyg-s9Gzc42zbjqycWj2-rIyyEYjgVVUvx3LU-XmH0MV-6&s=10",
      documentoLink: "https://docs.google.com/document/d/1WtyejHMu29BTpctNs3MtnJbJwoxFxrKq2pMz6HWCmk4/edit?usp=sharing",
      descripcion: "366 reflexiones sobre la sabiduría, la perseverancia y el arte de vivir.",
    },
    {
      id: 2,
      titulo: "El poder del ahora",
      autor: "Eckhart Tolle",
      imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/61/4a/614ab7a7b23b97e6c77ff6cc46cd9e7e.jpg",
      documentoLink: "https://drive.google.com/file/d/tu-enlace-2/view",
      descripcion: "Guía espiritual para vivir en el presente.",
    },
    {
      id: 3,
      titulo: "Mindset: La actitud del éxito",
      autor: "Carol S. Dweck",
      imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/18/85/18858c1d84b33b9f820c1248c1df8b19.jpg",
      documentoLink: "https://drive.google.com/file/d/tu-enlace-3/view",
      descripcion: "Descubre cómo tu mentalidad determina tu éxito.",
    },
    {
      id: 4,
      titulo: "Hábitos atómicos",
      autor: "James Clear",
      imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/1b/a4/1ba4ce3fa320d26b8f3d9ef5c005c508.jpg",
      documentoLink: "https://drive.google.com/file/d/tu-enlace-4/view",
      descripcion: "Cambia tus hábitos para transformar tu vida.",
    },
    {
      id: 5,
      titulo: "El arte de la buena vida",
      autor: "William B. Irvine",
      imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/8a/67/8a67d04dbb1cb2a2305347e0b6c45fc3.jpg",
      documentoLink: "https://drive.google.com/file/d/tu-enlace-5/view",
      descripcion: "Filosofía estoica para la vida moderna.",
    },
    {
      id: 6,
      titulo: "El monje que vendió su Ferrari",
      autor: "Robin Sharma",
      imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/aa/43/aa4303fb1777de47137acaa08508560c.jpg",
      documentoLink: "https://drive.google.com/file/d/tu-enlace-6/view",
      descripcion: "Fábula sobre equilibrio y realización personal.",
    },
  ]);

  // Estado para el modal de agregar/editar (opcional)
  const [showModal, setShowModal] = useState(false);
  const [editingLibro, setEditingLibro] = useState<Libro | null>(null);

  // Función para agregar libro (opcional)
  const agregarLibro = (nuevoLibro: Omit<Libro, "id">) => {
    const nuevoId = Math.max(...libros.map(l => l.id), 0) + 1;
    setLibros([...libros, { ...nuevoLibro, id: nuevoId }]);
  };

  // Función para eliminar libro
  const eliminarLibro = (id: number) => {
    if (confirm("¿Eliminar este libro?")) {
      setLibros(libros.filter(l => l.id !== id));
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/20 to-yellow-50 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-4xl">🧠</span> Biblioteca de Mentalidad
              </h1>
              <p className="text-gray-500 mt-1">Libros para tu crecimiento personal y profesional</p>
            </div>
            <button
              onClick={() => {
                setEditingLibro(null);
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
            >
              + Agregar libro
            </button>
          </div>

          {/* Grid de libros */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {libros.map((libro) => (
                <div
                key={libro.id}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1"
                >
                <a
                    href={libro.documentoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    {/* Imagen más pequeña */}
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                        src={libro.imagen}
                        alt={libro.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x300?text=📖";
                        }}
                    />
                    </div>
                    
                    {/* Información compacta */}
                    <div className="p-2.5">
                    <h3 className="font-semibold text-gray-800 text-xs line-clamp-2">{libro.titulo}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">{libro.autor}</p>
                    {libro.descripcion && (
                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{libro.descripcion}</p>
                    )}
                    <div className="mt-2 text-[10px] text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition">
                        <span>Ver</span>
                        <span>→</span>
                    </div>
                    </div>
                </a>

                {/* Botones más pequeños */}
                <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition">
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditingLibro(libro);
                        setShowModal(true);
                    }}
                    className="p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-600 hover:text-blue-600 text-xs"
                    title="Editar"
                    >
                    ✏️
                    </button>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        eliminarLibro(libro.id);
                    }}
                    className="p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-600 hover:text-red-600 text-xs"
                    title="Eliminar"
                    >
                    🗑️
                    </button>
                </div>
                </div>
            ))}
            </div>

          {libros.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No hay libros en tu biblioteca. ¡Agrega tu primer libro!
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar libro (opcional) */}
      {showModal && (
        <LibroModal
          libro={editingLibro}
          onSave={(data) => {
            if (editingLibro) {
              setLibros(libros.map(l => l.id === editingLibro.id ? { ...data, id: editingLibro.id } : l));
            } else {
              agregarLibro(data);
            }
            setShowModal(false);
            setEditingLibro(null);
          }}
          onClose={() => {
            setShowModal(false);
            setEditingLibro(null);
          }}
        />
      )}
    </>
  );
}

// ==================== MODAL PARA LIBROS ====================

function LibroModal({
  libro,
  onSave,
  onClose,
}: {
  libro?: Libro | null;
  onSave: (data: Omit<Libro, "id">) => void;
  onClose: () => void;
}) {
  const [titulo, setTitulo] = useState(libro?.titulo || "");
  const [autor, setAutor] = useState(libro?.autor || "");
  const [imagen, setImagen] = useState(libro?.imagen || "");
  const [documentoLink, setDocumentoLink] = useState(libro?.documentoLink || "");
  const [descripcion, setDescripcion] = useState(libro?.descripcion || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !documentoLink.trim()) return;
    onSave({ titulo, autor, imagen, documentoLink, descripcion });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {libro ? "Editar libro" : "Agregar nuevo libro"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título del libro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
            required
          />
          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
          />
          <input
            type="url"
            placeholder="URL de la imagen de portada"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
          />
          <input
            type="url"
            placeholder="URL del documento (PDF, Google Docs)"
            value={documentoLink}
            onChange={(e) => setDocumentoLink(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-3"
            required
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-xl mb-4"
            rows={2}
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