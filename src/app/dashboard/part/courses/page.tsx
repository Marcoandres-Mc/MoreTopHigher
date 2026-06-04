// src/app/dashboard/courses/page.tsx
"use client";
import { useState } from "react";
import Nav from "../../components/Nav";

// Tipos de datos
interface Grade {
  id: number;
  name: string;
  score: number;
  weight: number;
}

interface Course {
  id: number;
  name: string;
  credits: number;
  grades: Grade[];
  resources: Resource[];
}

interface Resource {
  id: number;
  name: string;
  url: string;
  type: "pdf" | "video" | "link" | "doc";
}

export default function CoursesPage() {
  // Estado con cursos de ejemplo
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Matemáticas Avanzadas",
      credits: 4,
      grades: [
        { id: 1, name: "Parcial 1", score: 85, weight: 0.3 },
        { id: 2, name: "Parcial 2", score: 78, weight: 0.3 },
        { id: 3, name: "Final", score: 90, weight: 0.4 },
      ],
      resources: [
        { id: 1, name: "Clase 1 - Derivadas", url: "https://youtube.com/watch?v=123", type: "video" },
        { id: 2, name: "Libro de texto", url: "https://drive.google.com/...", type: "pdf" },
      ],
    },
    {
      id: 2,
      name: "Programación Web",
      credits: 3,
      grades: [
        { id: 3, name: "Proyecto 1", score: 92, weight: 0.25 },
        { id: 4, name: "Proyecto 2", score: 88, weight: 0.25 },
        { id: 5, name: "Examen Final", score: 85, weight: 0.5 },
      ],
      resources: [
        { id: 3, name: "Documentación React", url: "https://react.dev", type: "link" },
      ],
    },
    {
      id: 3,
      name: "Bases de Datos",
      credits: 3,
      grades: [
        { id: 6, name: "Parcial 1", score: 75, weight: 0.3 },
        { id: 7, name: "Parcial 2", score: 80, weight: 0.3 },
        { id: 8, name: "Final", score: 82, weight: 0.4 },
      ],
      resources: [],
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  // Calcular promedio del curso (ponderado por pesos)
  const calculateCourseAverage = (grades: Grade[]): number => {
    if (grades.length === 0) return 0;
    let totalWeight = 0;
    let weightedSum = 0;
    grades.forEach(grade => {
      weightedSum += grade.score * grade.weight;
      totalWeight += grade.weight;
    });
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  };

  // Calcular promedio general ponderado por créditos
  const calculateOverallAverage = (): number => {
    let totalCredits = 0;
    let weightedSum = 0;
    courses.forEach(course => {
      const avg = calculateCourseAverage(course.grades);
      weightedSum += avg * course.credits;
      totalCredits += course.credits;
    });
    return totalCredits > 0 ? weightedSum / totalCredits : 0;
  };

  // Agregar nuevo curso
  const addCourse = (courseData: Omit<Course, "id" | "grades" | "resources">) => {
    const newId = Math.max(...courses.map(c => c.id), 0) + 1;
    const newCourse: Course = {
      ...courseData,
      id: newId,
      grades: [],
      resources: [],
    };
    setCourses([...courses, newCourse]);
  };

  // Editar curso
  const updateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  // Eliminar curso
  const deleteCourse = (id: number) => {
    if (confirm("¿Eliminar este curso? Se perderán todas las notas y recursos.")) {
      setCourses(courses.filter(c => c.id !== id));
      if (selectedCourse?.id === id) setSelectedCourse(null);
    }
  };

  // Agregar nota a un curso
  const addGrade = (courseId: number, gradeData: Omit<Grade, "id">) => {
    const newId = Math.max(...courses.flatMap(c => c.grades.map(g => g.id)), 0) + 1;
    setCourses(courses.map(c =>
      c.id === courseId
        ? { ...c, grades: [...c.grades, { ...gradeData, id: newId }] }
        : c
    ));
  };

  // Editar nota
  const updateGrade = (courseId: number, updatedGrade: Grade) => {
    setCourses(courses.map(c =>
      c.id === courseId
        ? { ...c, grades: c.grades.map(g => g.id === updatedGrade.id ? updatedGrade : g) }
        : c
    ));
  };

  // Eliminar nota
  const deleteGrade = (courseId: number, gradeId: number) => {
    if (confirm("¿Eliminar esta nota?")) {
      setCourses(courses.map(c =>
        c.id === courseId
          ? { ...c, grades: c.grades.filter(g => g.id !== gradeId) }
          : c
      ));
    }
  };

  // Agregar recurso al curso
  const addResource = (courseId: number, resourceData: Omit<Resource, "id">) => {
    const newId = Math.max(...courses.flatMap(c => c.resources.map(r => r.id)), 0) + 1;
    setCourses(courses.map(c =>
      c.id === courseId
        ? { ...c, resources: [...c.resources, { ...resourceData, id: newId }] }
        : c
    ));
  };

  // Eliminar recurso
  const deleteResource = (courseId: number, resourceId: number) => {
    setCourses(courses.map(c =>
      c.id === courseId
        ? { ...c, resources: c.resources.filter(r => r.id !== resourceId) }
        : c
    ));
  };

  const overallAverage = calculateOverallAverage();

  // Iconos para tipos de recurso
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf": return "📄";
      case "video": return "🎥";
      case "link": return "🔗";
      default: return "📁";
    }
  };

  return (
    <>
    <Nav />
    <div className="space-y-6 bg-gradient-to-br from-slate-50 to-gray-100 p-10">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-4xl">📚</span> Mis cursos universitarios
        </h1>
        <button
          onClick={() => {
            setEditingCourse(null);
            setShowCourseModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span>+</span> Nuevo curso
        </button>
      </div>

      {/* Tarjeta de promedio general */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-100 text-sm">Promedio ponderado general</p>
            <p className="text-5xl font-bold">{overallAverage.toFixed(1)}%</p>
            <p className="text-blue-100 text-sm mt-2">Basado en {courses.length} cursos</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Créditos totales</p>
            <p className="text-3xl font-bold">{courses.reduce((sum, c) => sum + c.credits, 0)}</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mt-4">
          <div className="bg-white h-2 rounded-full" style={{ width: `${overallAverage}%` }} />
        </div>
      </div>

      {/* Grid de cursos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de cursos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Mis cursos</h2>
          {courses.map((course) => {
            const avg = calculateCourseAverage(course.grades);
            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${
                  selectedCourse?.id === course.id ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                }`}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.credits} créditos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{avg.toFixed(1)}%</p>
                    <p className="text-xs text-gray-400">
                      {course.grades.length} nota{course.grades.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${avg}%` }} />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingCourse(course); setShowCourseModal(true); }}
                    className="text-xs text-gray-500 hover:text-blue-600"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteCourse(course.id); }}
                    className="text-xs text-gray-500 hover:text-red-600"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            );
          })}
          {courses.length === 0 && (
            <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500">
              No tienes cursos. ¡Agrega tu primer curso!
            </div>
          )}
        </div>

        {/* Detalle del curso seleccionado */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {selectedCourse ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedCourse.name}</h2>
                  <p className="text-sm text-gray-500">{selectedCourse.credits} créditos</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">
                    {calculateCourseAverage(selectedCourse.grades).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-400">promedio</p>
                </div>
              </div>

              {/* Sección de notas */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <span>📝</span> Notas
                  </h3>
                  <button
                    onClick={() => {
                      setEditingGrade(null);
                      setShowGradeModal(true);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Agregar nota
                  </button>
                </div>
                {selectedCourse.grades.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCourse.grades.map((grade) => (
                      <div key={grade.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{grade.name}</p>
                          <p className="text-xs text-gray-500">Peso: {(grade.weight * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg">{grade.score}%</span>
                          <button
                            onClick={() => { setEditingGrade(grade); setShowGradeModal(true); }}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteGrade(selectedCourse.id, grade.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No hay notas registradas</p>
                )}
              </div>

              {/* Sección de recursos */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <span>🔗</span> Recursos del curso
                  </h3>
                  <button
                    onClick={() => setShowResourceModal(true)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Agregar recurso
                  </button>
                </div>
                {selectedCourse.resources.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCourse.resources.map((resource) => (
                      <div key={resource.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-lg">{getResourceIcon(resource.type)}</span>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex-1"
                          >
                            {resource.name}
                          </a>
                        </div>
                        <button
                          onClick={() => deleteResource(selectedCourse.id, resource.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No hay recursos agregados</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <span className="text-5xl mb-3">📖</span>
              <p>Selecciona un curso para ver sus detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Modales (simplificados para no alargar, pero funcionales) */}
      {showCourseModal && (
        <CourseModal
          course={editingCourse}
          onSave={(courseData) => {
            if (editingCourse) {
              updateCourse({ ...courseData, id: editingCourse.id, grades: editingCourse.grades, resources: editingCourse.resources });
            } else {
              addCourse(courseData);
            }
            setShowCourseModal(false);
            setEditingCourse(null);
          }}
          onClose={() => {
            setShowCourseModal(false);
            setEditingCourse(null);
          }}
        />
      )}

      {showGradeModal && selectedCourse && (
        <GradeModal
          grade={editingGrade}
          onSave={(gradeData) => {
            if (editingGrade) {
              updateGrade(selectedCourse.id, { ...gradeData, id: editingGrade.id });
            } else {
              addGrade(selectedCourse.id, gradeData);
            }
            setShowGradeModal(false);
            setEditingGrade(null);
          }}
          onClose={() => {
            setShowGradeModal(false);
            setEditingGrade(null);
          }}
        />
      )}

      {showResourceModal && selectedCourse && (
        <ResourceModal
          onSave={(resourceData) => {
            addResource(selectedCourse.id, resourceData);
            setShowResourceModal(false);
          }}
          onClose={() => setShowResourceModal(false)}
        />
      )}
    </div>
    </>
  );
}

// ==================== MODALES ====================

interface CourseModalData {
  name: string;
  credits: number;
}

function CourseModal({ course, onSave, onClose }: { course?: Course | null; onSave: (data: CourseModalData) => void; onClose: () => void }) {
  const [name, setName] = useState(course?.name || "");
  const [credits, setCredits] = useState(course?.credits || 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, credits });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{course ? "Editar curso" : "Nuevo curso"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del curso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
          <input
            type="number"
            placeholder="Créditos"
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
            className="w-full border rounded-lg p-2 mb-4"
            min={1}
            max={10}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GradeModal({ grade, onSave, onClose }: { grade?: Grade | null; onSave: (data: Omit<Grade, 'id'>) => void; onClose: () => void }) {
  const [name, setName] = useState(grade?.name || "");
  const [score, setScore] = useState(grade?.score || 0);
  const [weight, setWeight] = useState(grade?.weight || 0.25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, score, weight });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{grade ? "Editar nota" : "Nueva nota"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre (ej. Parcial 1)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
          <input
            type="number"
            placeholder="Nota (0-100)"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full border rounded-lg p-2 mb-3"
            min={0}
            max={100}
            required
          />
          <input
            type="number"
            step="0.05"
            placeholder="Peso (0-1)"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full border rounded-lg p-2 mb-4"
            min={0}
            max={1}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ResourceModal({ onSave, onClose }: { onSave: (data: { name: string; url: string; type: "pdf" | "video" | "link" | "doc" }) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"pdf" | "video" | "link" | "doc">("link");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onSave({ name, url, type });
    setName("");
    setUrl("");
    setType("link");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Agregar recurso</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del recurso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
          <input
            type="url"
            placeholder="URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "pdf" | "video" | "link" | "doc")}
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="link">🔗 Enlace</option>
            <option value="pdf">📄 PDF</option>
            <option value="video">🎥 Video</option>
            <option value="doc">📁 Documento</option>
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}