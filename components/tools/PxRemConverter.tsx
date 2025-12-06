import React, { useState } from 'react';
import { Scaling } from 'lucide-react';

const PxRemConverter: React.FC = () => {
  const [base, setBase] = useState(16);
  const [px, setPx] = useState(16);
  const [rem, setRem] = useState(1);

  const handlePx = (val: string) => {
    const v = parseFloat(val);
    setPx(v);
    if (!isNaN(v)) setRem(v / base);
  };

  const handleRem = (val: string) => {
    const v = parseFloat(val);
    setRem(v);
    if (!isNaN(v)) setPx(v * base);
  };

  return (
    <div className="max-w-xl mx-auto w-full pt-10">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl space-y-8">
        <div className="flex items-center gap-3 text-white mb-4">
          <Scaling className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold">CSS Unit Converter</h3>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Root Font Size (px)</label>
          <input 
            type="number" 
            value={base}
            onChange={(e) => setBase(parseFloat(e.target.value) || 16)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-400 font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2">Pixels (px)</label>
            <input 
              type="number" 
              value={px}
              onChange={(e) => handlePx(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-6 text-3xl text-white font-mono text-center focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="text-center text-slate-600 font-bold text-xl">=</div>
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2">REM</label>
            <input 
              type="number" 
              value={rem}
              onChange={(e) => handleRem(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-6 text-3xl text-pink-400 font-mono text-center focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PxRemConverter;