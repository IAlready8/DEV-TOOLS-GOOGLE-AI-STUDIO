import React, { useState } from 'react';
import { convertCode } from '../../services/geminiService';
import Button from '../Button';
import { ArrowRight, Code, RefreshCw } from 'lucide-react';

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 
  'C++', 'Go', 'Rust', 'PHP', 'Swift', 'Kotlin', 'SQL'
];

const CodeConverter: React.FC = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [sourceLang, setSourceLang] = useState('JavaScript');
  const [targetLang, setTargetLang] = useState('Python');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!sourceCode.trim()) return;
    setLoading(true);
    const converted = await convertCode(sourceCode, sourceLang, targetLang);
    setResult(converted);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Controls */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
           <span className="text-sm text-slate-400">From</span>
           <select 
             value={sourceLang}
             onChange={(e) => setSourceLang(e.target.value)}
             className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none w-full"
           >
             {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
           </select>
        </div>

        <div className="hidden md:flex text-slate-500"><ArrowRight className="w-5 h-5"/></div>

        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
           <span className="text-sm text-slate-400">To</span>
           <select 
             value={targetLang}
             onChange={(e) => setTargetLang(e.target.value)}
             className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none w-full"
           >
             {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
           </select>
        </div>

        <Button onClick={handleConvert} isLoading={loading} className="w-full md:w-auto">
          <RefreshCw className="w-4 h-4" /> Convert
        </Button>
      </div>

      {/* Editors */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col h-full">
           <label className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-2">
             <Code className="w-4 h-4" /> Source: {sourceLang}
           </label>
           <textarea 
             className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none leading-6"
             placeholder={`// Paste your ${sourceLang} code here...`}
             value={sourceCode}
             onChange={(e) => setSourceCode(e.target.value)}
             spellCheck={false}
           />
        </div>

        <div className="flex flex-col h-full">
           <label className="text-xs font-semibold text-blue-400 uppercase mb-2 flex items-center gap-2">
             <Code className="w-4 h-4" /> Target: {targetLang}
           </label>
           <textarea 
             readOnly
             className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm text-green-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none leading-6"
             placeholder="// Result will appear here..."
             value={result}
             spellCheck={false}
           />
        </div>
      </div>
    </div>
  );
};

export default CodeConverter;
