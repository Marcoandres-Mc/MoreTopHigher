// src/components/EmailCards.tsx
"use client";

interface EmailAccount {
  id: number;
  nombre: string;
  url: string;
  revisado: boolean;
}

interface EmailCardsProps {
  emails: EmailAccount[];
  onToggleRevisado?: (id: number) => void;
}

export default function EmailCards({ emails, onToggleRevisado }: EmailCardsProps) {
  const toggleRevisado = (id: number) => {
    if (onToggleRevisado) onToggleRevisado(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`relative rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer ${
            email.revisado ? "bg-gray-100 border border-gray-200" : "bg-gradient-to-br from-blue-50 to-indigo-100"
          }`}
          onClick={() => window.open(email.url, "_blank")}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{email.nombre.includes("UPC") ? "🏫" : "📧"}</span>
                <h3 className="font-semibold text-gray-800">{email.nombre}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRevisado(email.id);
                }}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition ${
                  email.revisado
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600 hover:bg-green-400 hover:text-white"
                }`}
              >
                {email.revisado ? "✓" : "○"}
              </button>
            </div>
            <p className="text-xs text-gray-500 truncate">{new URL(email.url).hostname}</p>
            {email.revisado && (
              <span className="text-xs text-green-600 mt-2 inline-block">✓ Revisado</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}