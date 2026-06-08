// src/app/dashboard/courses/page.tsx
"use client";
import { useState } from "react";
import Nav from "../../components/Nav";
import MaterialCursos from "./components/MaterialCursos";
import NotaCadaCurso from "./components/NotaCadaCurso";

// Tipos de datos
interface Grade {
  id: number;
  name: string;
  score: number;
  weight: number;
}

interface WeekResource {
  id: number;
  weekNumber: number;
  resources: Resource[];
}

interface Course {
  id: number;
  name: string;
  credits: number;
  grades: Grade[];
  resources: Resource[];
  weeks: WeekResource[];
}

interface Resource {
  id: number;
  name: string;
  url: string;
  type: string;
}

interface CourseModalData {
  name: string;
  credits: number;
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
        {
          id: 1,
          name: "Clase 1 - Derivadas",
          url: "https://youtube.com/watch?v=123",
          type: "video",
        },
        {
          id: 2,
          name: "Libro de texto",
          url: "https://drive.google.com/...",
          type: "pdf",
        },
      ],
      weeks: [],
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
        {
          id: 3,
          name: "Documentación React",
          url: "https://react.dev",
          type: "link",
        },
      ],
      weeks: [],
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
      weeks: [],
    },
  ]);

  // Estado para controlar qué panel está abierto
  const [openPanel, setOpenPanel] = useState<"materiales" | "notas" | null>(
    "materiales",
  );

  // Función para alternar entre paneles
  const togglePanel = (panel: "materiales" | "notas") => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  // ========== FUNCIONES PARA SEMANAS ==========
  const addWeek = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
    const newWeekId = Math.max(...course.weeks.map((w) => w.id), 0) + 1;
    const newWeekNumber = course.weeks.length + 1;
    const updatedWeeks = [
      ...course.weeks,
      { id: newWeekId, weekNumber: newWeekNumber, resources: [] },
    ];
    setCourses(
      courses.map((c) =>
        c.id === courseId ? { ...c, weeks: updatedWeeks } : c,
      ),
    );
  };

  const deleteWeek = (courseId: number, weekId: number) => {
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? { ...c, weeks: c.weeks.filter((w) => w.id !== weekId) }
          : c,
      ),
    );
  };

  const addResourceToWeek = (
    courseId: number,
    weekId: number,
    resource: Omit<Resource, "id">,
  ) => {
    const newId =
      Math.max(
        ...courses.flatMap((c) =>
          c.weeks.flatMap((w) => w.resources.map((r) => r.id)),
        ),
        0,
      ) + 1;
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              weeks: c.weeks.map((w) =>
                w.id === weekId
                  ? {
                      ...w,
                      resources: [...w.resources, { ...resource, id: newId }],
                    }
                  : w,
              ),
            }
          : c,
      ),
    );
  };

  const deleteResourceFromWeek = (
    courseId: number,
    weekId: number,
    resourceId: number,
  ) => {
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              weeks: c.weeks.map((w) =>
                w.id === weekId
                  ? {
                      ...w,
                      resources: w.resources.filter((r) => r.id !== resourceId),
                    }
                  : w,
              ),
            }
          : c,
      ),
    );
  };

  // ========== FUNCIONES PARA CURSOS Y NOTAS ==========
  const calculateCourseAverage = (grades: Grade[]): number => {
    if (grades.length === 0) return 0;
    let totalWeight = 0;
    let weightedSum = 0;
    grades.forEach((grade) => {
      weightedSum += grade.score * grade.weight;
      totalWeight += grade.weight;
    });
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  };

  const calculateOverallAverage = (): number => {
    let totalCredits = 0;
    let weightedSum = 0;
    courses.forEach((course) => {
      const avg = calculateCourseAverage(course.grades);
      weightedSum += avg * course.credits;
      totalCredits += course.credits;
    });
    return totalCredits > 0 ? weightedSum / totalCredits : 0;
  };

  const addCourse = (courseData: CourseModalData) => {
    const newId = Math.max(...courses.map((c) => c.id), 0) + 1;
    const newCourse: Course = {
      ...courseData,
      id: newId,
      grades: [],
      resources: [],
      weeks: [],
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(
      courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
    );
  };

  const deleteCourse = (id: number) => {
    if (
      confirm("¿Eliminar este curso? Se perderán todas las notas y recursos.")
    ) {
      setCourses(courses.filter((c) => c.id !== id));
      if (selectedCourse?.id === id) setSelectedCourse(null);
    }
  };

  const addGrade = (courseId: number, gradeData: Omit<Grade, "id">) => {
    const newId =
      Math.max(...courses.flatMap((c) => c.grades.map((g) => g.id)), 0) + 1;
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? { ...c, grades: [...c.grades, { ...gradeData, id: newId }] }
          : c,
      ),
    );
  };

  const updateGrade = (courseId: number, updatedGrade: Grade) => {
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              grades: c.grades.map((g) =>
                g.id === updatedGrade.id ? updatedGrade : g,
              ),
            }
          : c,
      ),
    );
  };

  const deleteGrade = (courseId: number, gradeId: number) => {
    if (confirm("¿Eliminar esta nota?")) {
      setCourses(
        courses.map((c) =>
          c.id === courseId
            ? { ...c, grades: c.grades.filter((g) => g.id !== gradeId) }
            : c,
        ),
      );
    }
  };

  const addResource = (
    courseId: number,
    resourceData: Omit<Resource, "id">,
  ) => {
    const newId =
      Math.max(...courses.flatMap((c) => c.resources.map((r) => r.id)), 0) + 1;
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              resources: [...c.resources, { ...resourceData, id: newId }],
            }
          : c,
      ),
    );
  };

  const deleteResource = (courseId: number, resourceId: number) => {
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? { ...c, resources: c.resources.filter((r) => r.id !== resourceId) }
          : c,
      ),
    );
  };

  const overallAverage = calculateOverallAverage();

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "video":
        return "🎥";
      case "link":
        return "🔗";
      default:
        return "📁";
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

        <div className="flex flex-row gap-8">
          {/* Columna izquierda (25%) */}
          <div className="flex flex-col gap-4 w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col items-center text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fc/UPC_logo_transparente.png"
                alt="Logo UPC"
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                Universidad Peruana de Ciencias Aplicadas
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Fundada en 1994 | Lima, Perú
              </p>
              <div className="w-full mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estudiantes</span>
                  <span className="font-semibold text-gray-800">~72,000</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Carreras</span>
                  <span className="font-semibold text-gray-800">
                    58 programas
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Acreditación</span>
                  <span className="font-semibold text-green-600">
                    WASC / SINEACE
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100 text-sm">
                    Promedio ponderado general
                  </p>
                  <p className="text-5xl font-bold">
                    {overallAverage.toFixed(1)}%
                  </p>
                  <p className="text-blue-100 text-sm mt-2">
                    Basado en {courses.length} cursos
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Créditos totales</p>
                  <p className="text-3xl font-bold">
                    {courses.reduce((sum, c) => sum + c.credits, 0)}
                  </p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${overallAverage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Mis notas de cada curso
            </h2>
            {courses.map((course) => {
              const avg = calculateCourseAverage(course.grades);
              return (
                <div
                  key={course.id}
                  className={`bg-white rounded-2xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedCourse?.id === course.id
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {course.credits} créditos
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {avg.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-400">
                        {course.grades.length} nota
                        {course.grades.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${avg}%` }}
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCourse(course);
                        setShowCourseModal(true);
                      }}
                      className="text-xs text-gray-500 hover:text-blue-600"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCourse(course.id);
                      }}
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
          <div className="w-full space-y-4">
            {/* Panel de Materiales del curso (Recursos por semanas) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => togglePanel("materiales")}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Materiales del curso
                  </h2>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                    Recursos por semanas
                  </span>
                </div>
                <span className="text-gray-400 transition-transform duration-200">
                  {openPanel === "materiales" ? "▲" : "▼"}
                </span>
              </button>

              {openPanel === "materiales" && (
                <div className="p-6 border-t border-gray-100">
                  <MaterialCursos
                    courses={courses}
                    selectedCourse={selectedCourse}
                    calculateCourseAverage={calculateCourseAverage}
                    deleteCourse={deleteCourse}
                    setSelectedCourse={setSelectedCourse}
                    setEditingCourse={setEditingCourse}
                    setShowCourseModal={setShowCourseModal}
                    onAddWeek={addWeek}
                    onDeleteWeek={deleteWeek}
                    onAddResourceToWeek={addResourceToWeek}
                    onDeleteResourceFromWeek={deleteResourceFromWeek}
                  />
                </div>
              )}
            </div>

            {/* Panel de Notas y promedio */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => togglePanel("notas")}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Notas y promedio
                  </h2>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    Calificaciones
                  </span>
                </div>
                <span className="text-gray-400 transition-transform duration-200">
                  {openPanel === "notas" ? "▲" : "▼"}
                </span>
              </button>

              {openPanel === "notas" && (
                <div className="p-6 border-t border-gray-100">
                  <NotaCadaCurso
                    courses={courses}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                    calculateCourseAverage={calculateCourseAverage}
                    deleteCourse={deleteCourse}
                    setEditingCourse={setEditingCourse}
                    setShowCourseModal={setShowCourseModal}
                    setEditingGrade={setEditingGrade}
                    setShowGradeModal={setShowGradeModal}
                    deleteGrade={deleteGrade}
                    setShowResourceModal={setShowResourceModal}
                    deleteResource={deleteResource}
                    getResourceIcon={getResourceIcon}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modales */}
        {showCourseModal && (
          <CourseModal
            course={editingCourse}
            onSave={(courseData) => {
              if (editingCourse) {
                updateCourse({
                  ...courseData,
                  id: editingCourse.id,
                  grades: editingCourse.grades,
                  resources: editingCourse.resources,
                  weeks: editingCourse.weeks,
                });
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
                updateGrade(selectedCourse.id, {
                  ...gradeData,
                  id: editingGrade.id,
                });
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

function CourseModal({
  course,
  onSave,
  onClose,
}: {
  course?: Course | null;
  onSave: (data: CourseModalData) => void;
  onClose: () => void;
}) {
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
        <h2 className="text-xl font-bold mb-4">
          {course ? "Editar curso" : "Nuevo curso"}
        </h2>
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GradeModal({
  grade,
  onSave,
  onClose,
}: {
  grade?: Grade | null;
  onSave: (data: Omit<Grade, "id">) => void;
  onClose: () => void;
}) {
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
        <h2 className="text-xl font-bold mb-4">
          {grade ? "Editar nota" : "Nueva nota"}
        </h2>
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ResourceModal({
  onSave,
  onClose,
}: {
  onSave: (data: {
    name: string;
    url: string;
    type: "pdf" | "video" | "link" | "doc";
  }) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"pdf" | "video" | "link" | "doc">("link");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onSave({ name, url, type });
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setType(e.target.value as "pdf" | "video" | "link" | "doc")
            }
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="link">🔗 Enlace</option>
            <option value="pdf">📄 PDF</option>
            <option value="video">🎥 Video</option>
            <option value="doc">📁 Documento</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
