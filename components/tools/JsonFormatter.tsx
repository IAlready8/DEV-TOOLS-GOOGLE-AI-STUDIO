import React, { useState } from 'react';
import Button from '../Button';
import { AlignLeft, Minimize, Copy, AlertTriangle } from 'lucide-react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2">
        <Button onClick={format} variant="secondary">
          <AlignLeft className="w-4 h-4" /> Format
        </Button>
        <Button onClick={minify} variant="secondary">
          <Minimize className="w-4 h-4" /> Minify
        </Button>
        <Button onClick={() => navigator.clipboard.writeText(input)} variant="ghost" className="ml-auto">
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>

      <div className="relative flex-1">
        <textarea
          className={`w-full h-full bg-slate-900 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg p-4 font-mono text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
          placeholder="Paste JSON here..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (!e.target.value) setError(null);
          }}
        />
        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-900/90 text-red-100 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-red-700 shadow-xl backdrop-blur-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="truncate">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonFormatter;
