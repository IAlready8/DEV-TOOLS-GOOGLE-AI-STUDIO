import React, { useState, useEffect } from 'react';
import { Lock, Fingerprint, Copy } from 'lucide-react';

const CryptoHasher: React.FC = () => {
  const [input, setInput] = useState('Hello World');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    const compute = async () => {
      if (!input) { setHashes({}); return; }
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const results: Record<string, string> = {};

      for (const algo of algos) {
        try {
          const hashBuffer = await crypto.subtle.digest(algo, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          results[algo] = hashHex;
        } catch (e) {
          results[algo] = 'Error';
        }
      }
      setHashes(results);
    };
    compute();
  }, [input]);

  return (
    <div className="flex flex-col h-full gap-6 max-w-4xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4 text-slate-200">
           <Lock className="w-5 h-5 text-emerald-400" />
           <h3 className="font-semibold">Input Text</h3>
        </div>
        <textarea 
          className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 resize-none font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {Object.entries(hashes).map(([algo, hash]) => (
          <div key={algo} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative group">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
               <Fingerprint className="w-3 h-3" /> {algo}
             </div>
             <code className="text-emerald-400 font-mono text-sm break-all">
               {hash}
             </code>
             <button 
               onClick={() => navigator.clipboard.writeText(hash as string)}
               className="absolute top-4 right-4 p-1.5 bg-slate-800 rounded text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
             >
               <Copy className="w-3 h-3" />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoHasher;