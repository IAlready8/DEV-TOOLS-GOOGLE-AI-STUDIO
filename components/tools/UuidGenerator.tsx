import React, { useState } from 'react';
import Button from '../Button';
import { Copy, RefreshCw, List } from 'lucide-react';

const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-2xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-4 mb-6">
          <label className="text-slate-300 font-medium">Quantity:</label>
          <input 
            type="number" 
            min="1" 
            max="50" 
            value={count} 
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleGenerate} className="ml-auto">
            <RefreshCw className="w-4 h-4" /> Generate
          </Button>
        </div>

        {uuids.length > 0 && (
          <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border-b border-slate-700">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <List className="w-3 h-3" /> Generated UUIDs
              </span>
              <button 
                onClick={copyAll}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" /> Copy All
              </button>
            </div>
            <ul className="divide-y divide-slate-800 max-h-[400px] overflow-auto">
              {uuids.map((uuid, idx) => (
                <li key={idx} className="flex justify-between items-center p-3 hover:bg-slate-800/50 transition-colors group">
                  <code className="font-mono text-slate-300 text-sm">{uuid}</code>
                  <button 
                    onClick={() => navigator.clipboard.writeText(uuid)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-700 rounded text-slate-400 transition-all"
                    title="Copy"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UuidGenerator;
