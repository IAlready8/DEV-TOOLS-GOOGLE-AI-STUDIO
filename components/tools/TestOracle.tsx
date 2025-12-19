
import React, { useState } from 'react';
import { generateTests } from '../../services/geminiService';
import Button from '../Button';
import { ShieldCheck, Code, Copy, Beaker } from 'lucide-react';

const TestOracle: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateTests(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-1/2">
        <div className="flex items-center gap-3 mb-4">
          <Beaker className="w-6 h-6 text-green-400" />
          <h3 className="font-semibold text-slate-200">Test Oracle</h3>
        </div>
        <textarea
          className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-green-500 resize-none placeholder:text-slate-600 font-mono text-xs"
          placeholder="Paste your code snippet here to generate unit tests..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading} className="bg-green-600 hover:bg-green-500">
            <ShieldCheck className="w-4 h-4 mr-2" /> Generate Unit Tests
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(result)} disabled={!result} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy
           </Button>
        </div>
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4 flex items-center gap-2">
           <Code className="w-3 h-3" /> Test Suite
        </div>
        <textarea 
          readOnly
          className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-blue-300 resize-none focus:outline-none leading-relaxed"
          placeholder="// Unit tests will appear here..."
          value={result}
        />
      </div>
    </div>
  );
};

export default TestOracle;
