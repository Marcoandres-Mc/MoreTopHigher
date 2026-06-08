// src/app/dashboard/courses/components/MaterialCursos.tsx
import React from 'react';
import CourseAccordion from './CourseAccordion';


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
  weeks: WeekResource[];
}

interface MaterialCursosProps {
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  calculateCourseAverage: (grades: Grade[]) => number;
  deleteCourse: (id: number) => void;
  setEditingCourse: (course: Course | null) => void;
  setShowCourseModal: (show: boolean) => void;
  onAddWeek: (courseId: number) => void;
  onDeleteWeek: (courseId: number, weekId: number) => void;
  onAddResourceToWeek: (courseId: number, weekId: number, resource: Omit<Resource, "id">) => void;
  onDeleteResourceFromWeek: (courseId: number, weekId: number, resourceId: number) => void;
}

const MaterialCursos: React.FC<MaterialCursosProps> = ({
  selectedCourse,
  onAddWeek,
  onDeleteWeek,
  onAddResourceToWeek,
  onDeleteResourceFromWeek,
}) => {
  if (!selectedCourse) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center h-64 text-gray-400">
        <span className="text-5xl mb-3">📦</span>
        <p>Selecciona un curso para ver sus materiales</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{selectedCourse.name}</h2>
        <p className="text-sm text-gray-500">{selectedCourse.credits} créditos</p>
      </div>

      <CourseAccordion
        selectedCourse={selectedCourse}
        onAddWeek={onAddWeek}
        onDeleteWeek={onDeleteWeek}
        onAddResourceToWeek={onAddResourceToWeek}
        onDeleteResourceFromWeek={onDeleteResourceFromWeek}
      />
    </div>
  );
};

export default MaterialCursos;