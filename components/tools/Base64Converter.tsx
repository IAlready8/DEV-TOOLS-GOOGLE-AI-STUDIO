import React, { useState } from 'react';
import Button from '../Button';
import { ArrowDownUp, Copy, RefreshCw, Trash2 } from 'lucide-react';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const process = () => {
    setError(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        // UTF-8 safe encoding
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        // UTF-8 safe decoding
        setOutput(decodeURIComponent(escape(window.atob(input))));
      }
    } catch (err) {
      setError('Invalid input for Base64 ' + mode);
      setOutput('');
    }
  };

  const swap = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input); // Swapping content logic is a bit tricky if there was an error, but this is standard behavior
    setError(null);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold ${mode === 'encode' ? 'text-blue-400' : 'text-slate-500'}`}>TEXT</span>
          <button onClick={swap} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <ArrowDownUp className="w-5 h-5 text-slate-400" />
          </button>
          <span className={`text-sm font-bold ${mode === 'decode' ? 'text-blue-400' : 'text-slate-500'}`}>BASE64</span>
        </div>
        <div className="flex gap-2">
           <Button onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="ghost" className="text-sm">
             <Trash2 className="w-4 h-4" /> Clear
           </Button>
           <Button onClick={process}>
             <RefreshCw className="w-4 h-4" /> Convert
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-400 mb-2">Input</label>
          <textarea
            className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={mode === 'encode' ? "Type text to encode..." : "Paste Base64 string to decode..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-slate-400 mb-2">Output</label>
          <textarea
            readOnly
            className={`flex-1 w-full bg-slate-900 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg p-3 text-slate-200 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
            placeholder="Result will appear here..."
            value={error || output}
          />
          {output && !error && (
            <button 
              onClick={() => navigator.clipboard.writeText(output)}
              className="absolute top-9 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-600 shadow-lg"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
