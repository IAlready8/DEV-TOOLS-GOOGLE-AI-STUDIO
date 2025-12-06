import React, { useState } from 'react';
import { Hash } from 'lucide-react';

const NumberBaseConverter: React.FC = () => {
  const [value, setValue] = useState('255');
  
  const parseVal = (v: string) => parseInt(v || '0', 10); // Assume decimal input for simplicity for now, or detect

  // Better approach: store strict decimal value, update all inputs
  const [decimal, setDecimal] = useState<number>(255);

  const updateFrom = (val: string, radix: number) => {
    const parsed = parseInt(val, radix);
    if (!isNaN(parsed)) setDecimal(parsed);
  };

  return (
    <div className="max-w-xl mx-auto w-full pt-10 flex flex-col gap-6">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <div className="flex items-center gap-3 text-white mb-4">
          <Hash className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold">Radix Converter</h3>
        </div>

        <BaseInput label="Decimal (10)" radix={10} value={decimal.toString(10)} onChange={(v) => updateFrom(v, 10)} />
        <BaseInput label="Hexadecimal (16)" radix={16} value={decimal.toString(16).toUpperCase()} onChange={(v) => updateFrom(v, 16)} />
        <BaseInput label="Binary (2)" radix={2} value={decimal.toString(2)} onChange={(v) => updateFrom(v, 2)} />
        <BaseInput label="Octal (8)" radix={8} value={decimal.toString(8)} onChange={(v) => updateFrom(v, 8)} />
      </div>
    </div>
  );
};

const BaseInput = ({ label, value, onChange, radix }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-slate-200 font-mono focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default NumberBaseConverter;