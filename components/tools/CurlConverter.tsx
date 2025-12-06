import React, { useState } from 'react';
import { convertCurl } from '../../services/geminiService';
import Button from '../Button';
import { Terminal, ArrowRight, Copy } from 'lucide-react';

const TARGETS = [
  'Python (Requests)', 'JavaScript (Fetch)', 'Node.js (Axios)', 'Go', 'Rust', 'PHP', 'Java', 'Dart'
];

const CurlConverter: React.FC = () => {
  const [curl, setCurl] = useState('');
  const [target, setTarget] = useState('JavaScript (Fetch)');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!curl.trim()) return;
    setLoading(true);
    const result = await convertCurl(curl, target);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-wrap items-end gap-4">
         <div className="flex-1 min-w-[300px]">
           <label className="block text-xs font-bold text-slate-500 uppercase mb-2">cURL Command</label>
           <textarea 
             className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-xs resize-none focus:ring-2 focus:ring-blue-500"
             placeholder="curl -X POST https://api.example.com/data -d '...'"
             value={curl}
             onChange={(e) => setCurl(e.target.value)}
           />
         </div>
         <div className="flex flex-col gap-2 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-500 uppercase">Target Language</label>
            <select 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500"
            >
              {TARGETS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <Button onClick={handleConvert} isLoading={loading}>
              Convert <ArrowRight className="w-4 h-4" />
            </Button>
         </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden">
        <div className="absolute top-4 right-4">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(output)} disabled={!output} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy
           </Button>
        </div>
        <textarea 
          readOnly
          className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-green-400 resize-none focus:outline-none"
          placeholder="// Generated code will appear here..."
          value={output}
        />
      </div>
    </div>
  );
};

export default CurlConverter;