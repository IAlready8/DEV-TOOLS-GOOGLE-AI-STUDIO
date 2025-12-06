import React, { useState } from 'react';
import { summarizeText } from '../../services/geminiService';
import Button from '../Button';
import { FileText, AlignLeft, Copy, Eraser } from 'lucide-react';

const SmartSummarizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await summarizeText(input);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-1/2">
        <div className="flex items-center gap-3 mb-4">
          <AlignLeft className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-slate-200">Original Text</h3>
        </div>
        <textarea
          className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-600"
          placeholder="Paste articles, documents, or long text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-between">
           <Button variant="ghost" onClick={() => {setInput(''); setSummary('');}} className="text-slate-400 hover:text-white">
             <Eraser className="w-4 h-4" /> Clear
           </Button>
           <Button onClick={handleSummarize} isLoading={loading}>
             <FileText className="w-4 h-4" /> Summarize
           </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(summary)} disabled={!summary} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy
           </Button>
        </div>
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4">
           Summary
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {summary ? (
            <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{summary}</p>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 italic">
              Summarized text will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSummarizer;