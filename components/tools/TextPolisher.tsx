import React, { useState } from 'react';
import { polishText } from '../../services/geminiService';
import Button from '../Button';
import { Feather, ArrowRight, Wand2, Copy, Eraser } from 'lucide-react';

const TONES = [
  'Professional', 'Friendly', 'Concise', 'Persuasive', 'Casual', 'Academic'
];

const TextPolisher: React.FC = () => {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('Professional');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePolish = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await polishText(input, tone);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-500/10 rounded-lg">
             <Feather className="w-6 h-6 text-pink-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-200">Magic Editor</h2>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
           {TONES.slice(0, 3).map(t => (
             <button
               key={t}
               onClick={() => setTone(t)}
               className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${tone === t ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
             >
               {t}
             </button>
           ))}
           <select 
             value={tone}
             onChange={(e) => setTone(e.target.value)}
             className="bg-transparent text-slate-400 text-sm font-medium focus:outline-none px-2 py-1.5 hover:text-slate-200 cursor-pointer"
           >
             <option disabled>More...</option>
             {TONES.slice(3).map(t => <option key={t} value={t}>{t}</option>)}
           </select>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
        <div className="flex flex-col h-full glass-panel rounded-2xl p-1">
          <textarea
            className="flex-1 w-full bg-transparent border-none rounded-xl p-6 text-slate-200 text-lg leading-relaxed focus:ring-0 resize-none placeholder:text-slate-600"
            placeholder="Paste your rough draft, email, or post here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="px-4 py-3 border-t border-white/5 flex justify-between items-center bg-slate-900/30 rounded-b-xl">
             <span className="text-xs text-slate-500 font-mono">{input.length} chars</span>
             <Button variant="ghost" onClick={() => setInput('')} className="text-xs h-8">
               <Eraser className="w-3 h-3" /> Clear
             </Button>
          </div>
        </div>

        <div className="flex flex-col h-full relative group">
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <div className="bg-slate-900 rounded-full p-2 border border-slate-700 shadow-xl text-slate-500">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {output ? (
            <div className="flex-1 flex flex-col glass-panel rounded-2xl p-1 border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
              <div className="flex-1 p-6 overflow-auto">
                <p className="text-lg leading-relaxed text-slate-100 whitespace-pre-wrap animate-fade-in">
                  {output}
                </p>
              </div>
              <div className="px-4 py-3 border-t border-white/5 flex justify-end items-center bg-slate-900/30 rounded-b-xl gap-2">
                 <Button onClick={() => navigator.clipboard.writeText(output)} className="h-8 text-xs bg-pink-600 hover:bg-pink-500">
                   <Copy className="w-3 h-3" /> Copy Result
                 </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center glass-panel rounded-2xl p-8 border-dashed border-slate-700/50">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Wand2 className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-500 text-center max-w-xs">
                Ready to polish. Select a tone and click the button below to transform your text.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center py-2">
        <Button onClick={handlePolish} isLoading={loading} className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-xl shadow-purple-900/30 transition-transform active:scale-95">
          <Wand2 className="w-5 h-5" /> Polish My Text
        </Button>
      </div>
    </div>
  );
};

export default TextPolisher;