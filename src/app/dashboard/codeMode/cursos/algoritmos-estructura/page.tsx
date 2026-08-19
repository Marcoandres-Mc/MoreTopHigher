// src/app/dashboard/algorithms/page.tsx
"use client";
import { useState, useEffect } from "react";
import Nav from "@/app/dashboard/components/Nav";

interface Topic {
  id: string;
  name: string;
  description: string;
  fase: string;
  docLink: string;
  practiceLink: string;
  completed: boolean;
}

const defaultTopics: Topic[] = [
  // FASE 1 — Fundamentos
  {
    id: "1",
    name: "Big O",
    description: "Análisis de complejidad temporal y espacial",
    fase: "📐 FASE 1 — Fundamentos",
    docLink: "https://www.bigocheatsheet.com/",
    practiceLink: "https://leetcode.com/explore/learn/card/the-leetcode-beginners-guide/",
    completed: false,
  },
  {
    id: "2",
    name: "Arrays",
    description: "Estructura lineal, acceso por índice, operaciones básicas",
    fase: "📐 FASE 1 — Fundamentos",
    docLink: "https://www.w3schools.com/js/js_arrays.asp",
    practiceLink: "https://leetcode.com/tag/array/",
    completed: false,
  },
  {
    id: "3",
    name: "Vectors (ArrayList)",
    description: "Arrays dinámicos, redimensionamiento automático",
    fase: "📐 FASE 1 — Fundamentos",
    docLink: "https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html",
    practiceLink: "https://leetcode.com/tag/array/",
    completed: false,
  },
  {
    id: "4",
    name: "Searching (Búsqueda)",
    description: "Búsqueda lineal y binaria",
    fase: "📐 FASE 1 — Fundamentos",
    docLink: "https://www.geeksforgeeks.org/searching-algorithms/",
    practiceLink: "https://leetcode.com/tag/binary-search/",
    completed: false,
  },
  {
    id: "5",
    name: "Sorting (Ordenamiento)",
    description: "Burbuja, selección, inserción, merge, quick, heap",
    fase: "📐 FASE 1 — Fundamentos",
    docLink: "https://www.geeksforgeeks.org/sorting-algorithms/",
    practiceLink: "https://leetcode.com/tag/sorting/",
    completed: false,
  },

  // FASE 2 — Estructuras lineales
  {
    id: "6",
    name: "Linked List",
    description: "Lista enlazada simple, doble y circular",
    fase: "🔗 FASE 2 — Estructuras lineales",
    docLink: "https://www.geeksforgeeks.org/data-structures/linked-list/",
    practiceLink: "https://leetcode.com/tag/linked-list/",
    completed: false,
  },
  {
    id: "7",
    name: "Stack",
    description: "Pila (LIFO), operaciones push, pop, peek",
    fase: "🔗 FASE 2 — Estructuras lineales",
    docLink: "https://www.geeksforgeeks.org/stack-data-structure/",
    practiceLink: "https://leetcode.com/tag/stack/",
    completed: false,
  },
  {
    id: "8",
    name: "Queue",
    description: "Cola (FIFO), operaciones enqueue, dequeue",
    fase: "🔗 FASE 2 — Estructuras lineales",
    docLink: "https://www.geeksforgeeks.org/queue-data-structure/",
    practiceLink: "https://leetcode.com/tag/queue/",
    completed: false,
  },
  {
    id: "9",
    name: "Deque",
    description: "Cola doblemente terminada (inserción/eliminación en ambos extremos)",
    fase: "🔗 FASE 2 — Estructuras lineales",
    docLink: "https://www.geeksforgeeks.org/deque-data-structure/",
    practiceLink: "https://leetcode.com/tag/queue/",
    completed: false,
  },
  {
    id: "10",
    name: "Hash Table",
    description: "Tabla hash, funciones hash, manejo de colisiones",
    fase: "🔗 FASE 2 — Estructuras lineales",
    docLink: "https://www.geeksforgeeks.org/hashing-data-structure/",
    practiceLink: "https://leetcode.com/tag/hash-table/",
    completed: false,
  },

  // FASE 3 — Técnicas
  {
    id: "11",
    name: "Recursión",
    description: "Funciones recursivas, casos base y recursivos",
    fase: "⚡ FASE 3 — Técnicas",
    docLink: "https://www.geeksforgeeks.org/recursion/",
    practiceLink: "https://leetcode.com/tag/recursion/",
    completed: false,
  },
  {
    id: "12",
    name: "Divide & Conquer",
    description: "Dividir, resolver y combinar (ej. Merge Sort, Quick Sort)",
    fase: "⚡ FASE 3 — Técnicas",
    docLink: "https://www.geeksforgeeks.org/divide-and-conquer/",
    practiceLink: "https://leetcode.com/tag/divide-and-conquer/",
    completed: false,
  },
  {
    id: "13",
    name: "Two Pointers",
    description: "Dos punteros para recorrer arrays (suma de dos, palíndromos)",
    fase: "⚡ FASE 3 — Técnicas",
    docLink: "https://www.geeksforgeeks.org/two-pointers-technique/",
    practiceLink: "https://leetcode.com/tag/two-pointers/",
    completed: false,
  },
  {
    id: "14",
    name: "Sliding Window",
    description: "Ventana deslizante para subarrays/substrings",
    fase: "⚡ FASE 3 — Técnicas",
    docLink: "https://www.geeksforgeeks.org/window-sliding-technique/",
    practiceLink: "https://leetcode.com/tag/sliding-window/",
    completed: false,
  },
  {
    id: "15",
    name: "Prefix Sum",
    description: "Suma de prefijos para consultas de rango",
    fase: "⚡ FASE 3 — Técnicas",
    docLink: "https://www.geeksforgeeks.org/prefix-sum-array/",
    practiceLink: "https://leetcode.com/tag/prefix-sum/",
    completed: false,
  },

  // FASE 4 — Estructuras jerárquicas
  {
    id: "16",
    name: "Trees",
    description: "Árboles generales, terminología, recorridos",
    fase: "🌳 FASE 4 — Estructuras jerárquicas",
    docLink: "https://www.geeksforgeeks.org/tree-data-structure/",
    practiceLink: "https://leetcode.com/tag/tree/",
    completed: false,
  },
  {
    id: "17",
    name: "Binary Trees",
    description: "Árboles binarios, propiedades, recorridos (pre, in, post)",
    fase: "🌳 FASE 4 — Estructuras jerárquicas",
    docLink: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
    practiceLink: "https://leetcode.com/tag/binary-tree/",
    completed: false,
  },
  {
    id: "18",
    name: "BST (Binary Search Tree)",
    description: "Árbol binario de búsqueda, búsqueda, inserción, eliminación",
    fase: "🌳 FASE 4 — Estructuras jerárquicas",
    docLink: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
    practiceLink: "https://leetcode.com/tag/binary-search-tree/",
    completed: false,
  },
  {
    id: "19",
    name: "Heap",
    description: "Heap binario (max-heap, min-heap), operaciones",
    fase: "🌳 FASE 4 — Estructuras jerárquicas",
    docLink: "https://www.geeksforgeeks.org/heap-data-structure/",
    practiceLink: "https://leetcode.com/tag/heap/",
    completed: false,
  },
  {
    id: "20",
    name: "Priority Queue",
    description: "Cola de prioridad implementada con heap",
    fase: "🌳 FASE 4 — Estructuras jerárquicas",
    docLink: "https://www.geeksforgeeks.org/priority-queue-set-1-introduction/",
    practiceLink: "https://leetcode.com/tag/priority-queue/",
    completed: false,
  },

  // FASE 5 — Grafos
  {
    id: "21",
    name: "Graph representation",
    description: "Matriz de adyacencia, lista de adyacencia",
    fase: "🕸️ FASE 5 — Grafos",
    docLink: "https://www.geeksforgeeks.org/graph-and-its-representations/",
    practiceLink: "https://leetcode.com/tag/graph/",
    completed: false,
  },
  {
    id: "22",
    name: "BFS (Breadth-First Search)",
    description: "Recorrido en anchura en grafos",
    fase: "🕸️ FASE 5 — Grafos",
    docLink: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
    practiceLink: "https://leetcode.com/tag/bfs/",
    completed: false,
  },
  {
    id: "23",
    name: "DFS (Depth-First Search)",
    description: "Recorrido en profundidad en grafos",
    fase: "🕸️ FASE 5 — Grafos",
    docLink: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/",
    practiceLink: "https://leetcode.com/tag/dfs/",
    completed: false,
  },
  {
    id: "24",
    name: "Dijkstra",
    description: "Camino más corto en grafos con pesos no negativos",
    fase: "🕸️ FASE 5 — Grafos",
    docLink: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
    practiceLink: "https://leetcode.com/tag/shortest-path/",
    completed: false,
  },
  {
    id: "25",
    name: "MST (Minimum Spanning Tree)",
    description: "Prim, Kruskal para árbol de expansión mínima",
    fase: "🕸️ FASE 5 — Grafos",
    docLink: "https://www.geeksforgeeks.org/spanning-tree-and-minimum-spanning-tree/",
    practiceLink: "https://leetcode.com/tag/minimum-spanning-tree/",
    completed: false,
  },
  {
    id: "26",
    name: "DSU (Disjoint Set Union)",
    description: "Estructura Union-Find para componentes conexas",
    fase: "🕸️ FASE 5 — Grafos",
    docLink: "https://www.geeksforgeeks.org/disjoint-set-data-structures/",
    practiceLink: "https://leetcode.com/tag/union-find/",
    completed: false,
  },

  // FASE 6 — Técnicas avanzadas
  {
    id: "27",
    name: "Greedy",
    description: "Algoritmos voraces, optimización local",
    fase: "🚀 FASE 6 — Técnicas avanzadas",
    docLink: "https://www.geeksforgeeks.org/greedy-algorithms/",
    practiceLink: "https://leetcode.com/tag/greedy/",
    completed: false,
  },
  {
    id: "28",
    name: "Backtracking",
    description: "Búsqueda exhaustiva con poda (N-Reinas, Sudoku)",
    fase: "🚀 FASE 6 — Técnicas avanzadas",
    docLink: "https://www.geeksforgeeks.org/backtracking-algorithms/",
    practiceLink: "https://leetcode.com/tag/backtracking/",
    completed: false,
  },
  {
    id: "29",
    name: "Dynamic Programming",
    description: "Programación dinámica, memorización, tabulación",
    fase: "🚀 FASE 6 — Técnicas avanzadas",
    docLink: "https://www.geeksforgeeks.org/dynamic-programming/",
    practiceLink: "https://leetcode.com/tag/dynamic-programming/",
    completed: false,
  },

  // FASE 7 — Avanzado
  {
    id: "30",
    name: "Trie",
    description: "Árbol de prefijos para búsqueda eficiente de cadenas",
    fase: "🏆 FASE 7 — Avanzado",
    docLink: "https://www.geeksforgeeks.org/trie-insert-and-search/",
    practiceLink: "https://leetcode.com/tag/trie/",
    completed: false,
  },
  {
    id: "31",
    name: "Segment Tree",
    description: "Árbol de segmentos para consultas de rango y actualizaciones",
    fase: "🏆 FASE 7 — Avanzado",
    docLink: "https://www.geeksforgeeks.org/segment-tree-data-structure/",
    practiceLink: "https://leetcode.com/tag/segment-tree/",
    completed: false,
  },
  {
    id: "32",
    name: "Fenwick Tree (BIT)",
    description: "Árbol de índices de Fenwick para consultas de prefijos",
    fase: "🏆 FASE 7 — Avanzado",
    docLink: "https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree/",
    practiceLink: "https://leetcode.com/tag/binary-indexed-tree/",
    completed: false,
  },
  {
    id: "33",
    name: "KMP (Knuth-Morris-Pratt)",
    description: "Algoritmo de búsqueda de patrones en cadenas",
    fase: "🏆 FASE 7 — Avanzado",
    docLink: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/",
    practiceLink: "https://leetcode.com/tag/string-matching/",
    completed: false,
  },
  {
    id: "34",
    name: "Algoritmos avanzados",
    description: "Flujo máximo, matching, geometría computacional",
    fase: "🏆 FASE 7 — Avanzado",
    docLink: "https://www.geeksforgeeks.org/max-flow-introduction/",
    practiceLink: "https://leetcode.com/tag/graph/",
    completed: false,
  },
];

export default function AlgorithmsPage() {
  const [topics, setTopics] = useState<Topic[]>(defaultTopics);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("algorithms_topics");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const merged = defaultTopics.map((dt) => {
          const saved = parsed.find((p: Topic) => p.id === dt.id);
          if (saved) {
            return { ...dt, docLink: saved.docLink || dt.docLink, practiceLink: saved.practiceLink || dt.practiceLink, completed: saved.completed || false };
          }
          return dt;
        });
        const extra = parsed.filter((p: Topic) => !defaultTopics.some(d => d.id === p.id));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTopics([...merged, ...extra]);
      } catch (e) {
        setTopics(defaultTopics);
      }
    } else {
      setTopics(defaultTopics);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("algorithms_topics", JSON.stringify(topics));
  }, [topics]);

  const updateTopic = (id: string, docLink: string, practiceLink: string) => {
    setTopics(topics.map(t => t.id === id ? { ...t, docLink, practiceLink, completed: Boolean(docLink && practiceLink) } : t));
  };

  const deleteTopic = (id: string) => {
    if (confirm("¿Eliminar este tema?")) {
      setTopics(topics.filter(t => t.id !== id));
    }
  };

  const openEditModal = (topic: Topic) => {
    setEditingTopic(topic);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTopic(null);
  };

  const handleSave = (docLink: string, practiceLink: string) => {
    if (editingTopic) {
      updateTopic(editingTopic.id, docLink, practiceLink);
    }
    closeModal();
  };

  const phases = ["📐 FASE 1 — Fundamentos", "🔗 FASE 2 — Estructuras lineales", "⚡ FASE 3 — Técnicas", "🌳 FASE 4 — Estructuras jerárquicas", "🕸️ FASE 5 — Grafos", "🚀 FASE 6 — Técnicas avanzadas", "🏆 FASE 7 — Avanzado"];
  const getProgress = (fase: string) => {
    const items = topics.filter(t => t.fase === fase);
    const done = items.filter(t => t.completed).length;
    return { total: items.length, done };
  };

  const total = topics.length;
  const completed = topics.filter(t => t.completed).length;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <span className="text-4xl">🧩</span> Algoritmos y Estructuras de Datos
            </h1>
            <p className="text-gray-300 mt-1">Domina las bases y técnicas avanzadas para resolver problemas eficientemente.</p>
          </div>

          {/* Diagrama visual de la ruta */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8 overflow-x-auto">
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-300 min-w-max">
              <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full">📐 F1</span>
              <span className="text-gray-500">→</span>
              <span className="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full">🔗 F2</span>
              <span className="text-gray-500">→</span>
              <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full">⚡ F3</span>
              <span className="text-gray-500">→</span>
              <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full">🌳 F4</span>
              <span className="text-gray-500">→</span>
              <span className="px-3 py-1 bg-amber-900/50 text-amber-300 rounded-full">🕸️ F5</span>
              <span className="text-gray-500">→</span>
              <span className="px-3 py-1 bg-rose-900/50 text-rose-300 rounded-full">🚀 F6</span>
              <span className="text-gray-500">→</span>
              <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full">🏆 F7</span>
            </div>
          </div>

          {/* Progreso global */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-sm text-gray-300">Progreso total</span>
              <span className="ml-2 text-lg font-bold text-blue-400">{completed}/{total}</span>
            </div>
            <div className="w-48 bg-gray-700 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(completed / total) * 100}%` }} />
            </div>
          </div>

          {/* Fases */}
          {phases.map((fase) => {
            const items = topics.filter(t => t.fase === fase);
            const { done, total: faseTotal } = getProgress(fase);
            return (
              <div key={fase} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-white">{fase}</h2>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">{done}/{faseTotal}</span>
                  {done === faseTotal && faseTotal > 0 && <span className="text-green-400 text-sm">✅</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((topic) => (
                    <div key={topic.id} className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border p-5 transition-all hover:bg-white/10 hover:-translate-y-1 ${topic.completed ? 'border-green-500/50' : 'border-white/10'}`}>
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-white text-sm pr-6">{topic.name}</h3>
                        {topic.completed && <span className="text-green-400 text-lg flex-shrink-0">✅</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 mb-3 line-clamp-2">{topic.description}</p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-500">📄</span>
                          {topic.docLink ? <a href={topic.docLink} target="_blank" className="text-blue-400 hover:underline truncate">Documento</a> : <span className="text-gray-500 italic">Sin</span>}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-500">💻</span>
                          {topic.practiceLink ? <a href={topic.practiceLink} target="_blank" className="text-blue-400 hover:underline truncate">Práctica</a> : <span className="text-gray-500 italic">Sin</span>}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => openEditModal(topic)} className="flex-1 py-1.5 text-xs font-medium rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition flex items-center justify-center gap-1">✏️ {topic.completed ? 'Editar' : 'Agregar'}</button>
                        <button onClick={() => deleteTopic(topic.id)} className="py-1.5 px-3 text-xs font-medium rounded-lg border border-gray-600 text-gray-500 hover:bg-red-900/50 hover:border-red-500 transition">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && editingTopic && (
        <EditModal topic={editingTopic} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  );
}

function EditModal({ topic, onSave, onClose }: { topic: Topic; onSave: (doc: string, practice: string) => void; onClose: () => void }) {
  const [docLink, setDocLink] = useState(topic.docLink || "");
  const [practiceLink, setPracticeLink] = useState(topic.practiceLink || "");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-2">Enlaces para: {topic.name}</h2>
        <p className="text-sm text-gray-400 mb-4">{topic.description}</p>
        <form onSubmit={(e) => { e.preventDefault(); onSave(docLink.trim(), practiceLink.trim()); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">📄 Documento / Teoría</label>
            <input type="url" placeholder="https://..." value={docLink} onChange={(e) => setDocLink(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">💻 Práctica / Ejercicios</label>
            <input type="url" placeholder="https://..." value={practiceLink} onChange={(e) => setPracticeLink(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-white" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-xl hover:bg-gray-500 transition">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}