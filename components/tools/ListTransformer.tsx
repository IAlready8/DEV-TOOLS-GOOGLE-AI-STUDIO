import React, { useState, useEffect } from 'react';
import { List, ArrowRight } from 'lucide-react';
import Button from '../Button';

const ListTransformer: React.FC = () => {
  const [input, setInput] = useState('Apple\nBanana\nCherry');
  const [output, setOutput] = useState('');
  const [separator, setSeparator] = useState(', ');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [quote, setQuote] = useState('None');

  useEffect(() => {
    const lines = input.split('\n').map(l => l.trim()).filter(l => l);
    const q = quote === 'Single' ? "'" : quote === 'Double' ? '"' : '';
    
    const transformed = lines.map(item => `${prefix}${q}${item}${q}${suffix}`);
    setOutput(transformed.join(separator));
  }, [input, separator, prefix, suffix, quote]);

  return (
    <div className="flex flex-col h-full gap-6">
       <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Separator</label>
             <input type="text" value={separator} onChange={e => setSeparator(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white"/>
          </div>
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Item Prefix</label>
             <input type="text" value={prefix} onChange={e => setPrefix(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white"/>
          </div>
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Item Suffix</label>
             <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white"/>
          </div>
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quotes</label>
             <select value={quote} onChange={e => setQuote(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white">
               <option value="None">None</option>
               <option value="Single">Single (')</option>
               <option value="Double">Double (")</option>
             </select>
          </div>
       </div>

       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
         <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Input List (Newlines)</label>
            <textarea
              className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white resize-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
         </div>
         <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Result</label>
            <textarea
              readOnly
              className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-green-400 font-mono resize-none focus:outline-none"
              value={output}
            />
         </div>
       </div>
    </div>
  );
};

export default ListTransformer;