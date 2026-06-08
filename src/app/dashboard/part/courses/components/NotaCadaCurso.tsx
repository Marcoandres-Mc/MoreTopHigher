// src/app/dashboard/courses/components/NotaCadaCurso.tsx
import React from "react";

interface Grade {
  id: number;
  name: string;
  score: number;
  weight: number;
}

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

interface Course {
  id: number;
  name: string;
  credits: number;
  grades: Grade[];
  resources: Resource[];
  weeks: WeekResource[];
}

interface NotaCadaCursoProps {
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course) => void;
  calculateCourseAverage: (grades: Grade[]) => number;
  deleteCourse: (id: number) => void;
  setEditingCourse: (course: Course) => void;
  setShowCourseModal: (value: boolean) => void;
  setEditingGrade: (grade: Grade | null) => void;
  setShowGradeModal: (value: boolean) => void;
  deleteGrade: (courseId: number, gradeId: number) => void;
  setShowResourceModal: (value: boolean) => void;
  deleteResource: (courseId: number, resourceId: number) => void;
  getResourceIcon: (type: string) => string;
}

const NotaCadaCurso: React.FC<NotaCadaCursoProps> = ({
  courses,
  selectedCourse,
  setSelectedCourse,
  calculateCourseAverage,
  deleteCourse,
  setEditingCourse,
  setShowCourseModal,
  setEditingGrade,
  setShowGradeModal,
  deleteGrade,
  setShowResourceModal,
  deleteResource,
  getResourceIcon,
}) => {
  return (
    <div className="w-1/2">
      

      {/* Detalle del curso seleccionado */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
        {selectedCourse ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedCourse.name}</h2>
                <p className="text-sm text-gray-500">{selectedCourse.credits} créditos</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{calculateCourseAverage(selectedCourse.grades).toFixed(1)}%</p>
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
                          onClick={() => {
                            setEditingGrade(grade);
                            setShowGradeModal(true);
                          }}
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
                <button onClick={() => setShowResourceModal(true)} className="text-sm text-blue-600 hover:text-blue-700">
                  + Agregar recurso
                </button>
              </div>
              {selectedCourse.resources.length > 0 ? (
                <div className="space-y-2">
                  {selectedCourse.resources.map((resource) => (
                    <div key={resource.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-lg">{getResourceIcon(resource.type)}</span>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex-1">
                          {resource.name}
                        </a>
                      </div>
                      <button onClick={() => deleteResource(selectedCourse.id, resource.id)} className="text-gray-400 hover:text-red-600">
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
  );
};

export default NotaCadaCurso;