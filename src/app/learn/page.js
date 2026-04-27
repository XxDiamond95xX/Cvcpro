"use client";
import React from 'react';
import { useLearningStore } from '@/store/useLearningStore';
import { useThermodynamics } from '@/hooks/useThermodynamics';
import MollierChart from '@/components/MollierChart';
import { ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';

const COMPONENT_STYLES = {
  compressor: { border: 'border-red-500', bg: 'bg-red-500/10', label: 'COMPRESSEUR', pos: 'top-6 left-6' },
  condenser:  { border: 'border-orange-500', bg: 'bg-orange-500/10', label: 'CONDENSEUR', pos: 'top-6 right-6' },
  expansion:  { border: 'border-yellow-500', bg: 'bg-yellow-500/10', label: 'DÉTENDEUR', pos: 'bottom-6 right-6' },
  evaporator: { border: 'border-cyan-500', bg: 'bg-cyan-500/10', label: 'ÉVAPORATEUR', pos: 'bottom-6 left-6' },
};

export default function LearningInterface() {
  const { currentModule, currentChapterIndex, nextChapter, prevChapter, activeSimulationParams, highlightedComponent } = useLearningStore();
  const cycle = useThermodynamics(activeSimulationParams);
  const chapter = currentModule.chapters[currentChapterIndex];
  const isLast = currentChapterIndex === currentModule.chapters.length - 1;
  const isFirst = currentChapterIndex === 0;

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">

      {/* GAUCHE : COURS */}
      <section className="w-[38%] border-r border-slate-800 flex flex-col bg-slate-900/50 shrink-0">
        <header className="p-5 border-b border-slate-800 flex items-center gap-3">
          <Link href="/" className="text-slate-600 hover:text-slate-400 text-xs">←</Link>
          <BookOpen className="text-blue-500" size={16} />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 truncate">
            {currentModule.title}
          </h2>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-3 text-xs font-bold text-blue-500 uppercase">
            Chapitre {currentChapterIndex + 1} / {currentModule.chapters.length}
          </div>
          <h1 className="text-2xl font-black mb-6 leading-tight text-white">
            {chapter.title}
          </h1>
          <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
            {chapter.content}
          </div>
        </main>

        <footer className="p-5 border-t border-slate-800 flex justify-between bg-slate-900">
          <button onClick={prevChapter} disabled={isFirst}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition flex items-center gap-2 text-sm">
            <ChevronLeft size={16} /> Précédent
          </button>
          <button onClick={nextChapter} disabled={isLast}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 font-bold transition flex items-center gap-2 text-sm text-white">
            {isLast ? 'Terminer' : 'Suivant'} <ChevronRight size={16} />
          </button>
        </footer>
      </section>

      {/* DROITE : SIMULATION */}
      <section className="flex-1 flex flex-col p-6 gap-5 overflow-y-auto">

        {/* Valeurs actives */}
        <div className="flex gap-4 flex-wrap">
          {Object.entries(activeSimulationParams).map(([k, v]) => (
            <div key={k} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 font-mono text-sm">
              <span className="text-slate-500 uppercase text-xs">{k} </span>
              <span className="text-blue-400 font-bold">{v}</span>
            </div>
          ))}
        </div>

        {/* Schéma interactif */}
        <div className="relative bg-black border border-slate-800 rounded-3xl p-6 aspect-video flex items-center justify-center">
          {/* Flèches du cycle */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="none">
            <path d="M 80 110 L 200 110 L 200 50 L 320 50 L 320 170 L 200 170 L 200 110" fill="none" stroke="#1e293b" strokeWidth="2" />
          </svg>

          {Object.entries(COMPONENT_STYLES).map(([key, s]) => {
            const isActive = highlightedComponent === key || highlightedComponent === 'all';
            return (
              <div key={key} className={`absolute ${s.pos} px-5 py-3 rounded-xl border-2 transition-all duration-500 font-mono text-sm font-bold
                ${isActive ? `${s.border} ${s.bg} text-white` : 'border-slate-800 text-slate-700'}`}>
                {s.label}
              </div>
            );
          })}

          <div className="text-slate-700 text-xs text-center">
            <div className="text-2xl mb-1">♾️</div>
            Schéma interactif CVC
          </div>
        </div>

        {/* Diagramme de Mollier */}
        <MollierChart cycle={cycle} />
      </section>
    </div>
  );
}
