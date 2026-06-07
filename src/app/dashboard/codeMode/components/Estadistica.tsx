import React from 'react'
import { useState } from 'react';
import ScoreCircle from '../../../../components/ScoreCircle';

const Estadistica = () => {
      const [rachaCodigo, setRachaCodigo] = useState(12);
      const rachaPorcentaje = Math.min(100, (rachaCodigo / 30) * 100);
    
      const [leetCodeTotal, setLeetCodeTotal] = useState(47);
      const [leetCodeSemana, setLeetCodeSemana] = useState(5);
      const [leetCodeTarget, setLeetCodeTarget] = useState(10);
      const leetCodeProgreso = (leetCodeSemana / leetCodeTarget) * 100;
      const porcentajeUniversidad = 30; // si aún quieres mostrar algo de uni, lo dejamos como opcional
    
  return (
    <div className="flex flex-col gap-6">
          <div className="lg:col-span-6 space-y-6">
            {/* Tarjetas de métricas (Racha de código y LeetCode) */}
            <div className="flex flex-col gap-2">
              {/* Racha de código - estilo "Hábitos" */}
              <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/30 rounded-2xl border border-cyan-700 p-5 flex flex-col items-center shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">🔥</span>
                  <h3 className="text-xl font-bold text-cyan-300">
                    Racha de código
                  </h3>
                  <span className="text-xs bg-cyan-800/60 px-2 py-1 rounded-full text-cyan-200">
                    GitHub
                  </span>
                </div>
                <ScoreCircle
                  score={rachaPorcentaje}
                  size={100}
                  label={`${rachaCodigo} días`}
                />
                <div className="mt-3 w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Compromiso diario</span>
                    <span className="font-bold text-cyan-400">
                      {rachaPorcentaje}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${rachaPorcentaje}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Meta: 30 días seguidos
                </p>
              </div>

              {/* LeetCode - estilo "Universidad" */}
              <div className="bg-gradient-to-br from-emerald-900/50 to-green-900/30 rounded-2xl border border-emerald-700 p-3  flex flex-col items-center shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">⚡</span>
                  <h3 className="text-xl font-bold text-emerald-300">
                    LeetCode
                  </h3>
                  <div className="flex items-center gap-1">

                  <span className="text-xs bg-emerald-800/60 px-2 py-1 rounded-full text-emerald-200">
                    Semanal
                  </span>
                  <div className="text-1xl font-bold text-emerald-400">
                  {leetCodeSemana} / {leetCodeTarget}
                  </div>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${leetCodeProgreso}%` }}
                  />
                </div>
                <div className=" w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Total resueltos</span>
                    <span className="font-bold text-emerald-400">
                      {leetCodeTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            </div>

          
          </div>
  )
}

export default Estadistica