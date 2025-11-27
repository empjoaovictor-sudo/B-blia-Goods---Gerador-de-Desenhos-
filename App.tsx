import React, { useState, useEffect } from 'react';
import { generateColoringPage } from './services/geminiService';
import { getRandomPrompt } from './services/promptService';
import { AppState, UserProgress } from './types';
import { Button } from './components/Button';
import { ProgressBar } from './components/ProgressBar';
import { ImageDisplay } from './components/ImageDisplay';
import { Download, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Persist progress in local storage
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('bibliaGoodsProgress');
    return saved ? JSON.parse(saved) : {
      score: 0,
      drawingsGenerated: 0,
      level: "Novo Artista",
      unlockedBadges: []
    };
  });

  useEffect(() => {
    localStorage.setItem('bibliaGoodsProgress', JSON.stringify(progress));
  }, [progress]);

  const handleGenerate = async () => {
    setAppState(AppState.GENERATING);
    setErrorMsg(null);
    
    try {
      // 1. Get a random prompt (avoiding recent history)
      const prompt = getRandomPrompt(promptHistory);
      
      // 2. Call API
      const base64Image = await generateColoringPage(prompt);
      
      // 3. Update State
      setCurrentImage(base64Image);
      setPromptHistory(prev => [...prev.slice(-10), prompt]); // Keep last 10
      
      // 4. Update Progress (Gamification)
      setProgress(prev => ({
        ...prev,
        score: prev.score + 100,
        drawingsGenerated: prev.drawingsGenerated + 1
      }));
      
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Ops! Algo deu errado ao criar a arte. Tente novamente.");
      setAppState(AppState.ERROR);
    }
  };

  const handleDownload = () => {
    if (!currentImage) return;

    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `BibliaGoods_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-display font-bold text-slate-800 tracking-normal">
            Biblia <span className="text-teal-500">Goods</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Bobbie Goods Bíblico</p>
        </header>

        {/* Gamification Bar */}
        <ProgressBar progress={progress} />

        {/* Main Display */}
        <div className="relative">
          <ImageDisplay state={appState} imageData={currentImage} />
          
          {/* Floating Badge for visual flair upon success */}
          {appState === AppState.SUCCESS && (
            <div className="absolute -top-4 -right-4 bg-orange-400 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg transform rotate-12 animate-bounce">
              Novo!
            </div>
          )}
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={20} />
            {errorMsg}
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col gap-3 mt-2">
          <Button 
            onClick={handleGenerate} 
            isLoading={appState === AppState.GENERATING}
            className="w-full text-lg"
          >
            <Sparkles size={20} className={appState === AppState.GENERATING ? "hidden" : "block"} />
            {currentImage ? "Gerar Outro Desenho" : "Gerar Desenho"}
          </Button>

          {currentImage && appState !== AppState.GENERATING && (
            <Button 
              variant="secondary" 
              onClick={handleDownload}
              className="w-full"
            >
              <Download size={20} />
              Baixar para o Dispositivo
            </Button>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-slate-400 text-xs">
          <p>© {new Date().getFullYear()} Biblia Goods App</p>
          <p className="mt-1 opacity-60">IA Generativa • Estilo Bobbie Goods</p>
        </footer>
      </div>
    </div>
  );
};

export default App;