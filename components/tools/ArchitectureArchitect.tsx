
import React, { useState } from 'react';
import { generateArchitecture } from '../../services/geminiService';
import Button from '../Button';
import { Layers, Copy, Zap } from 'lucide-react';

const ArchitectureArchitect: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateArchitecture(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-6 h-6 text-indigo-400" />
          <h3 className="font-semibold text-slate-200">System Architect</h3>
        </div>
        <textarea
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 resize-none placeholder:text-slate-600"
          placeholder="e.g. A real-time chat application using WebSockets, supporting millions of users with data persistence and horizontal scaling."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading} className="bg-indigo-600 hover:bg-indigo-500">
            <Zap className="w-4 h-4 mr-2" /> Design Architecture
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(result)} disabled={!result} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy
           </Button>
        </div>
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4 flex items-center gap-2">
           <Layers className="w-3 h-3" /> Architecture Blueprint
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {result ? (
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-200">{result}</pre>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 italic">
              Architectural design will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureArchitect;
