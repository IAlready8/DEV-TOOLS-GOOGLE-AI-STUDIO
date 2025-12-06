import React, { useState } from 'react';
import Button from '../Button';
import { Binary, ArrowRightLeft } from 'lucide-react';

const BinaryConverter: React.FC = () => {
  const [input, setInput] = useState('Hello');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'text2bin' | 'bin2text'>('text2bin');

  const convert = () => {
    try {
      if (mode === 'text2bin') {
        setOutput(input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
      } else {
        setOutput(input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join(''));
      }
    } catch (e) {
      setOutput('Error processing binary');
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-4 text-slate-200">
          <Binary className="w-5 h-5" />
          <span className={`text-sm font-bold ${mode === 'text2bin' ? 'text-green-400' : 'text-slate-500'}`}>TEXT</span>
          <button onClick={() => setMode(m => m === 'text2bin' ? 'bin2text' : 'text2bin')} className="p-2 hover:bg-slate-700 rounded-full">
            <ArrowRightLeft className="w-5 h-5 text-slate-400" />
          </button>
          <span className={`text-sm font-bold ${mode === 'bin2text' ? 'text-green-400' : 'text-slate-500'}`}>BINARY</span>
        </div>
        <Button onClick={convert}>Convert</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <textarea
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm resize-none"
          placeholder={mode === 'text2bin' ? "Type text..." : "Type binary (0101 0010)..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <textarea
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm resize-none text-green-400"
          placeholder="Result..."
          readOnly
          value={output}
        />
      </div>
    </div>
  );
};

export default BinaryConverter;