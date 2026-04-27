"use client";
import Link from 'next/link';
import { BookOpen, Gauge } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-black uppercase italic tracking-tighter">
        CVC Infinity <span className="text-blue-500">Pro</span>
      </h1>
      <p className="text-slate-500 text-sm">Choisissez votre mode</p>
      <div className="flex gap-6">
        <Link href="/learn"
          className="flex flex-col items-center gap-3 p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-blue-500 transition-all">
          <BookOpen size={32} className="text-blue-500" />
          <span className="font-bold">Mode Apprentissage</span>
          <span className="text-xs text-slate-500">Cours + Simulateur</span>
        </Link>
        <Link href="/simulator"
          className="flex flex-col items-center gap-3 p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-blue-500 transition-all">
          <Gauge size={32} className="text-blue-500" />
          <span className="font-bold">Mode Expert</span>
          <span className="text-xs text-slate-500">Diagramme de Mollier</span>
        </Link>
      </div>
    </div>
  );
}
