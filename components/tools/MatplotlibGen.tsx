import React, { useState } from 'react';
import { generateMatplotlib } from '../../services/geminiService';
import Button from '../Button';
import { BarChart2, Code, Copy, Play } from 'lucide-react';

const MatplotlibGen: React.FC = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await generateMatplotlib(input);
    setCode(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 className="w-5 h-5 text-orange-400" />
          <h3 className="font-semibold text-slate-200">Describe your plot</h3>
        </div>
        <div className="flex gap-4">
            <textarea
              className="flex-1 h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 resize-none placeholder:text-slate-600"
              placeholder="e.g. A heat map showing correlation between age, income, and spending score."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleGenerate} isLoading={loading} className="h-24 bg-orange-600 hover:bg-orange-500">
              <Play className="w-5 h-5" />
            </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(code)} disabled={!code} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy Code
           </Button>
        </div>
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4 flex items-center gap-2">
           <Code className="w-3 h-3" /> Python / Matplotlib Source
        </div>
        <textarea 
          readOnly
          className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-green-400 resize-none focus:outline-none leading-relaxed"
          placeholder="# Generated Python code will appear here..."
          value={code}
        />
      </div>
    </div>
  );
};

export default MatplotlibGen;