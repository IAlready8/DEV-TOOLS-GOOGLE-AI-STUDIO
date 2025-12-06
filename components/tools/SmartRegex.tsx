import React, { useState } from 'react';
import { generateRegex } from '../../services/geminiService';
import Button from '../Button';
import { Clipboard, Wand2, RefreshCw } from 'lucide-react';

const SmartRegex: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateRegex(`Create a regex for: ${input}`);
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <label className="block text-sm font-medium text-slate-400 mb-2">Describe what you want to match</label>
        <textarea 
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="e.g., A valid email address ending in .edu"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading}>
            <Wand2 className="w-4 h-4" />
            Generate Regex
          </Button>
        </div>
      </div>

      {result && (
        <div className="flex-1 bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-slate-400">Result & Explanation</h3>
            <div className="flex gap-2">
              <button onClick={() => setResult('')} className="p-1 hover:bg-slate-700 rounded text-slate-400">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={copyToClipboard} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-blue-400">
                <Clipboard className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartRegex;
