import React, { useState } from 'react';
import { analyzeDiff } from '../../services/geminiService';
import Button from '../Button';
import { GitCompare, Search, ArrowRight } from 'lucide-react';

const SmartDiffAnalyst: React.FC = () => {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!original.trim() || !modified.trim()) return;
    setLoading(true);
    const result = await analyzeDiff(original, modified);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-1/2 min-h-[300px]">
         <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Original Text/Code</label>
            <textarea
              className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-300 font-mono text-xs resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste original version..."
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
            />
         </div>
         <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Modified Text/Code</label>
            <textarea
              className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-300 font-mono text-xs resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste modified version..."
              value={modified}
              onChange={(e) => setModified(e.target.value)}
            />
         </div>
      </div>
      
      <div className="flex justify-center">
         <Button onClick={handleAnalyze} isLoading={loading} className="px-8">
           <Search className="w-4 h-4" /> Analyze Differences
         </Button>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden">
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4 flex items-center gap-2">
           <GitCompare className="w-3 h-3" /> AI Analysis
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {analysis ? (
             <div className="prose prose-invert max-w-none text-sm text-slate-300">
               <pre className="whitespace-pre-wrap font-sans bg-transparent">{analysis}</pre>
             </div>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-600 italic">
               Analysis of changes will appear here...
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartDiffAnalyst;