import React from 'react';
import { AppState } from '../types';

interface ImageDisplayProps {
  state: AppState;
  imageData: string | null;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ state, imageData }) => {
  return (
    <div className="w-full aspect-square bg-white rounded-3xl shadow-md border-4 border-white overflow-hidden relative group">
      {state === AppState.IDLE && !imageData && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 p-8 text-center bg-slate-50">
          <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-display font-medium">Pronto para criar sua arte?</p>
          <p className="text-sm mt-2">Toque em "Gerar" abaixo!</p>
        </div>
      )}

      {state === AppState.GENERATING && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-2xl animate-pulse">✨</span>
            </div>
          </div>
          <p className="mt-4 font-display font-bold text-teal-500 animate-pulse">Desenhando a cena...</p>
        </div>
      )}

      {imageData && (
        <div className="relative w-full h-full bg-white">
           <img 
            src={imageData} 
            alt="Bible coloring page" 
            className={`w-full h-full object-contain transition-opacity duration-500 ${state === AppState.GENERATING ? 'opacity-50' : 'opacity-100'}`}
          />
        </div>
      )}
    </div>
  );
};