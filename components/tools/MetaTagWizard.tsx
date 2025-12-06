
import React, { useState } from 'react';
import { generateMetaTags } from '../../services/geminiService';
import Button from '../Button';
import { Globe, Search, Copy } from 'lucide-react';

const MetaTagWizard: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateMetaTags(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4 text-slate-200">
           <Globe className="w-5 h-5 text-blue-400" />
           <h3 className="font-semibold">Describe your page content</h3>
        </div>
        <textarea 
          className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="e.g., A blog post about the top 10 React performance tips for 2025..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading}>
            <Search className="w-4 h-4" /> Generate Tags
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 relative animate-slide-up">
           <button 
             onClick={() => navigator.clipboard.writeText(result)}
             className="absolute top-4 right-4 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-400"
           >
             <Copy className="w-4 h-4" />
           </button>
           <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">HTML Output</h4>
           <pre className="font-mono text-sm text-blue-300 whitespace-pre-wrap">
             {result}
           </pre>
        </div>
      )}
    </div>
  );
};

export default MetaTagWizard;
