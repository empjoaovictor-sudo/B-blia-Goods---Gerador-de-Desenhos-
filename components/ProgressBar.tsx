import React from 'react';
import { UserProgress, LEVELS } from '../types';

interface ProgressBarProps {
  progress: UserProgress;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Determine next level
  const nextLevel = LEVELS.find(l => l.threshold > progress.drawingsGenerated) || LEVELS[LEVELS.length - 1];
  const currentLevel = LEVELS.slice().reverse().find(l => l.threshold <= progress.drawingsGenerated) || LEVELS[0];
  
  // Calculate percentage
  const prevThreshold = currentLevel.threshold;
  const nextThreshold = nextLevel.threshold === currentLevel.threshold ? currentLevel.threshold + 20 : nextLevel.threshold;
  
  const percent = Math.min(100, Math.max(0, 
    ((progress.drawingsGenerated - prevThreshold) / (nextThreshold - prevThreshold)) * 100
  ));

  return (
    <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-100 mb-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Nível Atual</span>
          <h3 className="text-lg font-display font-bold text-teal-600">{currentLevel.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Desenhos Criados</span>
          <p className="text-lg font-bold text-slate-700">{progress.drawingsGenerated}</p>
        </div>
      </div>
      
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-teal-300 to-teal-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      
      <div className="mt-2 text-xs text-center text-slate-400">
        {nextLevel !== currentLevel ? `Faltam ${nextThreshold - progress.drawingsGenerated} para o nível ${nextLevel.name}` : "Nível Máximo Alcançado!"}
      </div>
    </div>
  );
};