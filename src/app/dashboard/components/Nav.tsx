import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
    const pathname = usePathname();
    const navSections = [
        {
        name: "Code Mode",
        href: "/dashboard/codeMode",
        icon: "💻",
        gradient: "from-blue-900/50 to-blue-800/30",
        border: "border-blue-700",
        },  
        {
        name: "UPC",
        href: "/dashboard/part/courses",
        icon: "💻",
        gradient: "from-blue-900/50 to-blue-800/30",
        border: "border-blue-700",
        },
        {
        name: "Inglés",
        href: "/dashboard/part/english",
        icon: "🌐",
        gradient: "from-sky-900/50 to-sky-800/30",
        border: "border-sky-700",
        },
        
        {
        name: "Mentalidad",
        href: "/dashboard/part/mindset",
        icon: "🧠",
        gradient: "from-orange-900/50 to-orange-800/30",
        border: "border-orange-700",
        },
        {
        name: "Hábitos",
        href: "/dashboard/part/habits",
        icon: "✅",
        gradient: "from-emerald-900/50 to-emerald-800/30",
        border: "border-emerald-700",
        },
        
        {
        name: "Ejercicio",
        href: "/dashboard/part/exercise",
        icon: "💪",
        gradient: "from-rose-900/50 to-rose-800/30",
        border: "border-rose-700",
        },
        {
        name: "Configuración",
        href: "/dashboard/settings",
        icon: "⚙️",
        gradient: "from-gray-800 to-gray-700",
        border: "border-gray-700",
        },
    ];

  return (
    <nav className="bg-black/40 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-lg top-0 mx-auto transition-all duration-500 max-w-5xl rounded-2xl bg-background/75 backdrop-blur-xl border border-border/40 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 relative flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg"></div>
                  {/* Ícono personalizado de MTH */}
                  <svg
                    viewBox="0 0 40 40"
                    className="w-10 h-10 relative z-10 text-white"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="3" fill="currentColor" />
                    <path
                      d="M8 12 Q14 8, 20 12 Q26 16, 32 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 28 Q14 32, 20 28 Q26 24, 32 28"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="8" cy="12" r="2" fill="currentColor" />
                    <circle cx="32" cy="12" r="2" fill="currentColor" />
                    <circle cx="8" cy="28" r="2" fill="currentColor" />
                    <circle cx="32" cy="28" r="2" fill="currentColor" />
                    <path
                      d="M12 20 L28 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M25 17 L28 20 L25 23"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xl font-extrabold font-display tracking-tight gradient-text whitespace-nowrap pr-0.5 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MoreTopHigher
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Menú para desktop */}
          <div className="hidden md:block ">
            <div className="ml-10 flex items-baseline space-x-2">
              {navSections.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Avatar y perfil (desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-10 w-10 rounded-full">
              <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10">
                {/* Imagen de avatar (puedes cambiarla por una real) */}
                <img
                  className="aspect-square h-full w-full"
                  src="https://lh3.googleusercontent.com/a/ACg8ocLDg-TxTg8wTfFVPC6bb25J2q1ctVDzOgbDjilcWcUVdG-mKg=s96-c"
                  alt="Avatar"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
