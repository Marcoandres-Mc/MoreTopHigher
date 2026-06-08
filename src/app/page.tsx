// src/app/page.tsx

export default function page(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header simple */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-800">MTH</div>
        <div className="space-x-4">
          <button className="text-gray-600 hover:text-blue-600 transition">Iniciar sesión</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Registrarse</button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          <span className="text-blue-600">More</span>{" "}
          <span className="text-blue-500">Top</span>{" "}
          <span className="text-blue-700">Higher</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Eleva tus notas y hábitos al siguiente nivel. 
          Un solo lugar para gestionar tu rendimiento académico y construir rutinas ganadoras.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
            Comenzar ahora
          </button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
            Ver demo
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">¿Qué ofrece MTH?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-semibold mb-2">Control de notas</h3>
            <p className="text-gray-600">Registra tus cursos, parciales y calcula automáticamente tu promedio ponderado.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-semibold mb-2">Hábitos con puntaje</h3>
            <p className="text-gray-600">Crea rutinas diarias, gana puntos y mejora tu productividad.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Puntaje total combinado</h3>
            <p className="text-gray-600">Unifica tus logros académicos y de hábitos en una sola métrica.</p>
          </div>
        </div>
      </section>

      {/* Atajos tipo Google (bonus visual) */}
      <section className="container mx-auto px-6 py-16 bg-white rounded-2xl shadow-sm my-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Accesos directos inteligentes</h2>
        <p className="text-center text-gray-600 mb-10">Organiza tus apps favoritas como en la página de inicio de Google</p>
        <div className="flex justify-center gap-6 flex-wrap">
          {["📚", "🎓", "📅", "☁️", "🎵", "📝"].map((icon, i) => (
            <div key={i} className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              <span className="text-3xl mb-1">{icon}</span>
              <span className="text-xs text-gray-500">App {i+1}</span>
            </div>
          ))}
          <div className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <span className="text-3xl mb-1">+</span>
            <span className="text-xs text-gray-500">Añadir</span>
          </div>
        </div>
      </section>

      {/* Llamada final */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="bg-blue-800 text-white rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-4">Empieza a subir más alto</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Únete a cientos de estudiantes que ya mejoran sus notas y hábitos con MTH.
          </p>
          <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Regístrate gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-500 text-sm border-t">
        © 2025 MoreTopHigher (MTH) – Eleva tus notas y hábitos
      </footer>
    </div>
  );
}