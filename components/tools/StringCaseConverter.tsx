import React, { useState } from 'react';
import { Type } from 'lucide-react';

const StringCaseConverter: React.FC = () => {
  const [input, setInput] = useState('helloWorldExample');

  const toCamel = (s: string) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
  const toSnake = (s: string) => s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
  const toKebab = (s: string) => s.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '');
  const toPascal = (s: string) => s.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()).replace(/[-_]/g, '');
  const toConstant = (s: string) => toSnake(s).toUpperCase();

  return (
    <div className="max-w-3xl mx-auto w-full pt-6 space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <label className="text-slate-400 text-sm mb-2 block">Input String</label>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-lg font-mono"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CaseBox label="camelCase" value={toCamel(input)} />
        <CaseBox label="snake_case" value={toSnake(input)} />
        <CaseBox label="kebab-case" value={toKebab(input)} />
        <CaseBox label="PascalCase" value={toPascal(input)} />
        <CaseBox label="CONSTANT_CASE" value={toConstant(input)} />
      </div>
    </div>
  );
};

const CaseBox = ({ label, value }: any) => (
  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col gap-2 relative group hover:border-blue-500/50 transition-colors">
    <span className="text-xs text-slate-500 font-bold uppercase">{label}</span>
    <code className="text-blue-300 font-mono text-sm truncate">{value}</code>
    <button 
      onClick={() => navigator.clipboard.writeText(value)}
      className="absolute top-0 right-0 bottom-0 px-4 bg-slate-700/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm rounded-r-lg"
    >
      Copy
    </button>
  </div>
);

export default StringCaseConverter;