import React, { useState } from 'react';
import { generatePalette } from '../../services/geminiService';
import Button from '../Button';
import { Palette, Copy, Sparkles, RefreshCcw } from 'lucide-react';
import { ColorPalette as PaletteType } from '../../types';

const ColorPalette: React.FC = () => {
  const [input, setInput] = useState('');
  const [palette, setPalette] = useState<PaletteType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generatePalette(input);
    setPalette(data);
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-5xl mx-auto w-full">
      <div className="glass-panel p-8 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Palette className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Color Studio</h3>
            <p className="text-slate-400 text-sm">Generate award-winning color schemes from a vibe or description.</p>
          </div>
        </div>
        
        <div className="relative">
          <input 
            type="text"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-5 py-4 pr-32 text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all shadow-inner text-lg"
            placeholder="e.g., Cyberpunk Tokyo Night, or Pastel Beach Wedding"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <div className="absolute right-2 top-2 bottom-2">
            <Button onClick={handleGenerate} isLoading={loading} className="h-full bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/20">
              <Sparkles className="w-4 h-4" /> Generate
            </Button>
          </div>
        </div>
      </div>

      {palette && (
        <div className="animate-slide-up space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {palette.name}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic">
              "{palette.description}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-96">
            {palette.colors.map((color, idx) => (
              <div 
                key={idx} 
                className="group relative flex-1 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-x-0 bottom-0 p-4 bg-black/20 backdrop-blur-md border-t border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium truncate">{color.name}</p>
                  <p className="text-white/70 text-xs font-mono uppercase tracking-wider">{color.hex}</p>
                </div>
                
                <button 
                  onClick={() => copyToClipboard(color.hex)}
                  className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 text-white"
                  title="Copy Hex"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                  <span className="text-white/20 text-4xl font-black tracking-widest rotate-90 md:rotate-0">
                    {idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="secondary" onClick={() => copyToClipboard(JSON.stringify(palette, null, 2))}>
              <Copy className="w-4 h-4" /> Copy Palette JSON
            </Button>
          </div>
        </div>
      )}

      {!palette && !loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30 mt-8">
          {[1,2,3,4].map(i => (
             <div key={i} className="aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;