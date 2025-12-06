import React, { useState } from 'react';
import Button from '../Button';
import { ArrowRightLeft, FileJson, Table } from 'lucide-react';

const CsvJsonConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'csv2json' | 'json2csv'>('csv2json');

  const convert = () => {
    try {
      if (mode === 'csv2json') {
        const lines = input.split('\n');
        const headers = lines[0].split(',');
        const result = lines.slice(1).map(line => {
          const obj: any = {};
          const currentline = line.split(',');
          headers.forEach((h, i) => obj[h.trim()] = currentline[i]?.trim());
          return obj;
        });
        setOutput(JSON.stringify(result, null, 2));
      } else {
        const obj = JSON.parse(input);
        const array = Array.isArray(obj) ? obj : [obj];
        const headers = Object.keys(array[0]);
        const csv = [
          headers.join(','),
          ...array.map((row: any) => headers.map(fieldName => JSON.stringify(row[fieldName], (_, v) => v ?? '')).join(','))
        ].join('\n');
        setOutput(csv);
      }
    } catch (e) {
      setOutput('Error: Invalid Input Format');
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold ${mode === 'csv2json' ? 'text-blue-400' : 'text-slate-500'}`}>CSV</span>
          <button onClick={() => setMode(m => m === 'csv2json' ? 'json2csv' : 'csv2json')} className="p-2 hover:bg-slate-700 rounded-full">
            <ArrowRightLeft className="w-5 h-5 text-slate-400" />
          </button>
          <span className={`text-sm font-bold ${mode === 'json2csv' ? 'text-blue-400' : 'text-slate-500'}`}>JSON</span>
        </div>
        <Button onClick={convert}>Convert</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <textarea
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm resize-none"
          placeholder={mode === 'csv2json' ? "Paste CSV..." : "Paste JSON..."}
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

export default CsvJsonConverter;