import React from 'react'
import { useState } from 'react';

const PaginasSecundarias = () => {
    const [partePaginasSecundarias] = useState([
    {
      id: 1,
      nombre: "GitHub Actions",
      url: "https://github.com/features/actions",
    },
    { id: 2, nombre: "Prisma Docs", url: "https://www.prisma.io/docs" },
    { id: 3, nombre: "Tailwind Play", url: "https://play.tailwindcss.com/" },
    { id: 4, nombre: "Figma", url: "https://figma.com" },
    { id: 5, nombre: "Stack Overflow", url: "https://stackoverflow.com" },
    { id: 6, nombre: "Vercel Dashboard", url: "https://vercel.com/dashboard" },
    {
      id: 7,
      nombre: "TypeScript Playground",
      url: "https://www.typescriptlang.org/play",
    },
    { id: 8, nombre: "ChatGPT", url: "https://chat.openai.com" },
    { id: 9, nombre: "Canva", url: "https://canva.com" },
    { id: 10, nombre: "Notion", url: "https://notion.so" },
  ]);
  return (

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 p-2 m-2 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <span className="text-2xl">📌</span> Páginas secundarias
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                {partePaginasSecundarias.map((pag) => (
                  <div
                    key={pag.id}
                    className="relative bg-gray-700/40 rounded-xl p-2 text-center hover:shadow-md transition-all cursor-pointer border border-gray-600 group"
                    onClick={() => window.open(pag.url, "_blank")}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      ✕
                    </button>
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(pag.url).hostname}&sz=64`}
                      alt={pag.nombre}
                      className="w-6 h-6 mx-auto mb-1 rounded-md"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
  )
}

export default PaginasSecundarias;