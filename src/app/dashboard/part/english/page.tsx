// src/app/dashboard/english/page.tsx
"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import ScoreCircle from "@/components/ScoreCircle";
import Nav from "../../components/Nav";

// Tipo para los links de recursos
interface ResourceLink {
  id: number;
  nombre: string;
  url: string;
  categoria: string;
}

const agregarLink = (
  links: ResourceLink[],
  setLinks: Dispatch<SetStateAction<ResourceLink[]>>
) => {
  const nombre = prompt("Nombre del recurso:", "");
  if (!nombre) return;
  const url = prompt("URL completa (incluye https://):", "https://");
  if (!url) return;
  const categoria = prompt("Categoría (app, video, podcast, web, herramienta, etc.):", "recurso");
  const nuevoId = Math.max(...links.map((l) => l.id), 0) + 1;
  setLinks([...links, { id: nuevoId, nombre, url, categoria: categoria || "recurso" }]);
};

const eliminarLink = (
  id: number,
  links: ResourceLink[],
  setLinks: Dispatch<SetStateAction<ResourceLink[]>>
) => {
  if (confirm("¿Eliminar este enlace?")) {
    setLinks(links.filter((l) => l.id !== id));
  }
};

const ResourceSection = ({
  links,
  setLinks,
  title,
}: {
  links: ResourceLink[];
  setLinks: Dispatch<SetStateAction<ResourceLink[]>>;
  title: string;
}) => (
  <div className="mt-4 pt-3 border-t border-gray-200">
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-medium text-gray-500">{title}</span>
      <button
        onClick={() => agregarLink(links, setLinks)}
        className="text-xs text-blue-500 hover:text-blue-700"
      >
        + Agregar recurso
      </button>
    </div>
    <div className="space-y-1 max-h-32 overflow-y-auto">
      {links.length === 0 ? (
        <p className="text-xs text-gray-400">No hay recursos</p>
      ) : (
        links.map((link) => (
          <div key={link.id} className="group flex items-center justify-between p-1 rounded hover:bg-gray-100">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 flex-1"
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=16`}
                alt={link.nombre}
                className="w-4 h-4 rounded"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span className="text-xs text-blue-600 hover:underline truncate max-w-[120px]">
                {link.nombre}
              </span>
              <span className="text-[10px] text-gray-400">{link.categoria}</span>
            </a>
            <button
              onClick={() => eliminarLink(link.id, links, setLinks)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition text-xs"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default function EnglishPage() {
  // Datos generales
  const [nivelIngles, setNivelIngles] = useState(65);
  const [metaSemanal, setMetaSemanal] = useState(10);
  const [horasEstudiadas, setHorasEstudiadas] = useState(7);
  const [racha, setRacha] = useState(12);
  const [palabrasAprendidas, setPalabrasAprendidas] = useState(450);
  const [metaPalabras, setMetaPalabras] = useState(1000);

  // Progreso por habilidad (valores actuales)
  const [progresoListening, setProgresoListening] = useState(45);
  const [metaListening, setMetaListening] = useState(100);
  const [progresoWriting, setProgresoWriting] = useState(12);
  const [metaWriting, setMetaWriting] = useState(100);
  const [progresoReading, setProgresoReading] = useState(30);
  const [metaReading, setMetaReading] = useState(80);
  const [progresoSpeaking, setProgresoSpeaking] = useState(8);
  const [metaSpeaking, setMetaSpeaking] = useState(40);

  // ========== LINKS POR HABILIDAD ==========
  // Listening - Recursos
  const [listeningLinks, setListeningLinks] = useState<ResourceLink[]>([
    { id: 1, nombre: "Chanel for listen", url: "https://www.youtube.com/@VolkaEnglish/videos", categoria: "video" },
    { id: 2, nombre: "Video fonetica", url: "https://www.youtube.com/watch?v=JuFBtVFbtkA", categoria: "video" },
  ]);

  // Speaking - Recursos
  const [speakingLinks, setSpeakingLinks] = useState<ResourceLink[]>([
    { id: 1, nombre: "IA for speack", url: "https://chatgpt.com/c/6a24cc07-c990-83e9-bad9-50329d03eacd", categoria: "app" },
    { id: 2, nombre: "Reapeat words", url: "https://docs.google.com/document/d/17UcqRqaZYj2EDBkMcwHD0KHFsuHffhZmyFl6QWudG4c/edit?usp=sharing", categoria: "video" },
  ]);

  // Reading - Recursos
  const [readingLinks, setReadingLinks] = useState<ResourceLink[]>([
    { id: 1, nombre: "News in Levels", url: "https://newsinlevels.com", categoria: "web" },
    { id: 2, nombre: "Medium - English", url: "https://medium.com/tag/english", categoria: "blog" },
  ]);

  // Writing - Recursos
  const [writingLinks, setWritingLinks] = useState<ResourceLink[]>([
    { id: 1, nombre: "Grammarly", url: "https://grammarly.com", categoria: "herramienta" },
    { id: 2, nombre: "Hemingway Editor", url: "https://hemingwayapp.com", categoria: "herramienta" },
  ]);

  // Vocabulario - Recursos
  const [vocabularyLinks, setVocabularyLinks] = useState<ResourceLink[]>([
    { id: 1, nombre: "Memrise", url: "https://memrise.com", categoria: "app" },
    { id: 2, nombre: "Aki", url: "https://ankiweb.net/decks", categoria: "app" },
  ]);

  // Links generales de cursos y recursos (columna derecha)
  const [generalLinks, setGeneralLinks] = useState<ResourceLink[]>([
    { id: 1, nombre: "Duolingo", url: "https://www.duolingo.com", categoria: "app" },
    { id: 2, nombre: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", categoria: "curso" },
    { id: 3, nombre: "Cambridge English", url: "https://www.cambridgeenglish.org", categoria: "examen" },
  ]);

  // Calcular porcentajes
  const progresoMeta = Math.min(100, (horasEstudiadas / metaSemanal) * 100);
  const progresoPalabras = Math.min(100, (palabrasAprendidas / metaPalabras) * 100);

  return (
    <>
      <Nav />
      <div className="space-y-6 bg-gradient-to-br from-slate-50 to-gray-100 p-10">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Habilidades: Listening, Speaking, Reading, Writing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <span>📖</span> Vocabulario
                </h3>
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {palabrasAprendidas} / {metaPalabras}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${progresoPalabras}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Palabras aprendidas</p>
                <ResourceSection links={vocabularyLinks} setLinks={setVocabularyLinks} title="📚 Recursos de vocabulario" />
              </div>

              {/* Listening */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <span>🎧</span> Listening
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {progresoListening} / {metaListening}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(progresoListening / metaListening) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Ejercicios completados</p>
                <ResourceSection links={listeningLinks} setLinks={setListeningLinks} title="🎧 Recursos de Listening" />
              </div>
              
              {/* Speaking */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <span>🗣️</span> Speaking
                </h3>
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {progresoSpeaking} / {metaSpeaking}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: `${(progresoSpeaking / metaSpeaking) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Diálogos practicados</p>
                <ResourceSection links={speakingLinks} setLinks={setSpeakingLinks} title="🗣️ Recursos de Speaking" />
              </div>

              {/* Reading */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <span>📖</span> Reading
                </h3>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {progresoReading} / {metaReading}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${(progresoReading / metaReading) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Textos leídos</p>
                <ResourceSection links={readingLinks} setLinks={setReadingLinks} title="📖 Recursos de Reading" />
              </div>

              {/* Writing */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <span>✍️</span> Writing
                </h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {progresoWriting} / {metaWriting}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(progresoWriting / metaWriting) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Redacciones aprobadas</p>
                <ResourceSection links={writingLinks} setLinks={setWritingLinks} title="✍️ Recursos de Writing" />
              </div>
            </div>
          </div>

          {/* Columna derecha (1/3) */}
          <div className="space-y-6">
            {/* Tarjeta de nivel general */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100/40 rounded-2xl shadow-md border border-emerald-200 p-4 flex flex-col items-center text-center">
              <ScoreCircle score={nivelIngles} size={140} />
              <p className="text-sm font-semibold text-emerald-700 mt-2">Nivel general</p>
              <p className="text-xs text-gray-500">Intermedio alto (B2)</p>
              <div className="w-full mt-4 space-y-2">
                <div className="flex justify-between text-sm border-b border-emerald-200 pb-2">
                  <span className="text-gray-600">🎯 Meta del curso</span>
                  <span className="font-bold text-emerald-700">C1 Avanzado</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">🔥 Racha actual</span>
                  <span className="font-bold text-orange-600">{racha} días</span>
                </div>
              </div>
              
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <span>⏰</span> Horas de estudio
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {horasEstudiadas} / {metaSemanal} hrs
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progresoMeta}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Meta semanal: {metaSemanal} horas</p>
               
              </div>

            {/* Links generales de cursos y recursos */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-xl">📚</span> Cursos y recursos generales
                </h2>
                <button
                  onClick={() => agregarLink(generalLinks, setGeneralLinks)}
                  className="text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
                >
                  + Añadir
                </button>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {generalLinks.map((link) => (
                  <div
                    key={link.id}
                    className="group relative flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); eliminarLink(link.id, generalLinks, setGeneralLinks); }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      ✕
                    </button>
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=32`}
                      alt={link.nombre}
                      className="w-5 h-5 rounded"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{link.nombre}</p>
                      <span className="text-xs text-gray-400">{link.categoria}</span>
                    </div>
                    <span className="text-gray-300 text-xs">→</span>
                  </div>
                ))}
                {generalLinks.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">No hay enlaces. Añade tu primer curso.</p>
                )}
              </div>
            </div>

            {/* Tarjeta de recomendación */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <span>💡</span> Tip del día
              </h3>
              <p className="text-sm text-gray-600">
                Escucha 15 minutos de podcast en inglés antes de dormir. Mejora tu listening sin esfuerzo.
              </p>
              <button className="mt-3 text-xs text-amber-700 hover:text-amber-900 font-medium">
                Ver más consejos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}