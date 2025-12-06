import React, { useState } from 'react';
import { generateCron } from '../../services/geminiService';
import Button from '../Button';
import { Clock, Copy, Info } from 'lucide-react';

const SmartCron: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{cron: string, explanation: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateCron(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-3xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <label className="block text-sm font-medium text-slate-400 mb-3">
          Describe your schedule in plain English
        </label>
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg placeholder:text-slate-600"
            placeholder="e.g., Every weekday at 9:30 AM"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <Button onClick={handleGenerate} isLoading={loading} className="px-6">
            <Clock className="w-5 h-5" />
            Generate
          </Button>
        </div>
      </div>

      {result && (
        <div className="space-y-4 animate-[slideDown_0.3s_ease-out]">
          {/* Cron Expression Display */}
          <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 border border-blue-500/30 p-8 rounded-xl text-center relative group">
             <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Cron Expression</div>
             <div className="text-4xl md:text-5xl font-mono text-white font-bold tracking-wider">
               {result.cron}
             </div>
             <button 
               onClick={() => navigator.clipboard.writeText(result.cron)}
               className="absolute top-4 right-4 p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 transition-colors opacity-0 group-hover:opacity-100"
             >
               <Copy className="w-5 h-5" />
             </button>
          </div>

          {/* Explanation */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex gap-4">
             <div className="p-3 bg-slate-700/50 rounded-lg h-fit">
               <Info className="w-6 h-6 text-slate-400" />
             </div>
             <div>
               <h3 className="text-lg font-semibold text-slate-200 mb-1">Explanation</h3>
               <p className="text-slate-400 leading-relaxed">
                 {result.explanation}
               </p>
             </div>
          </div>
        </div>
      )}

      {/* Quick Reference */}
      {!result && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 opacity-50">
           {['minute', 'hour', 'day (month)', 'month', 'day (week)'].map((label, i) => (
             <div key={i} className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-800">
               <div className="text-2xl font-bold text-slate-600 mb-1">*</div>
               <div className="text-xs text-slate-500 uppercase">{label}</div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default SmartCron;
