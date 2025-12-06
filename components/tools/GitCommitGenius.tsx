
import React, { useState } from 'react';
import { generateCommitMessage } from '../../services/geminiService';
import Button from '../Button';
import { GitCommit, Copy, RefreshCw } from 'lucide-react';

const GitCommitGenius: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateCommitMessage(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Paste staged changes (diff) or describe the update
        </label>
        <textarea 
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
          placeholder="e.g. Added a new login component and fixed the auth bug in the header..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading}>
            <GitCommit className="w-4 h-4" /> Generate Message
          </Button>
        </div>
      </div>

      {result && (
        <div className="flex-1 bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col min-h-0 animate-slide-up">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-slate-400">Commit Message</h3>
            <button 
              onClick={() => navigator.clipboard.writeText(result)} 
              className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-slate-900 rounded-lg p-4 font-mono text-sm text-yellow-400 whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitCommitGenius;
