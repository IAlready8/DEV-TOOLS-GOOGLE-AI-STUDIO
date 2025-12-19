
import React, { useState } from 'react';
import { generateSchema } from '../../services/geminiService';
import Button from '../Button';
import { Share2, FileJson, Copy, Database } from 'lucide-react';

const SchemaWeaver: React.FC = () => {
  const [input, setInput] = useState('{\n  "id": 1,\n  "username": "admin",\n  "active": true,\n  "meta": { "lastLogin": "2024-01-01" }\n}');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateSchema(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-1/3">
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="w-6 h-6 text-purple-400" />
          <h3 className="font-semibold text-slate-200">Schema Weaver</h3>
        </div>
        <textarea
          className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 resize-none placeholder:text-slate-600 font-mono text-sm"
          placeholder="Paste JSON sample here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading} className="bg-purple-600 hover:bg-purple-500">
            <Database className="w-4 h-4 mr-2" /> Weave Schemas
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
           <FileJson className="w-3 h-3" /> Types & Schemas
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {result ? (
            <div className="prose prose-invert max-w-none text-sm text-slate-300">
               <pre className="whitespace-pre-wrap font-sans bg-transparent text-xs">{result}</pre>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 italic">
              Resulting schemas will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaWeaver;
