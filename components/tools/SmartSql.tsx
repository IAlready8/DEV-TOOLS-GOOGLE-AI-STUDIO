import React, { useState } from 'react';
import { generateSqlAdvice } from '../../services/geminiService';
import Button from '../Button';
import { Database, Play, Eraser } from 'lucide-react';

const SmartSql: React.FC = () => {
  const [query, setQuery] = useState('');
  const [action, setAction] = useState<'optimize' | 'explain' | 'format'>('format');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const executeAction = async () => {
    if (!query.trim()) return;
    setLoading(true);
    let prompt = '';
    switch (action) {
      case 'format': prompt = `Format this SQL query to be more readable:\n\n${query}`; break;
      case 'optimize': prompt = `Analyze and optimize this SQL query for performance. Explain your changes:\n\n${query}`; break;
      case 'explain': prompt = `Explain what this SQL query does in plain English:\n\n${query}`; break;
    }
    
    const result = await generateSqlAdvice(prompt);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex-1 flex flex-col">
          <label className="block text-sm font-medium text-slate-400 mb-2">Input SQL</label>
          <textarea 
            className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="SELECT * FROM users WHERE..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-4 flex flex-wrap gap-2">
             <select 
               value={action} 
               onChange={(e) => setAction(e.target.value as any)}
               className="bg-slate-700 text-white border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
             >
               <option value="format">Format Query</option>
               <option value="optimize">Optimize Query</option>
               <option value="explain">Explain Query</option>
             </select>
             <Button onClick={executeAction} isLoading={loading}>
               <Play className="w-4 h-4" />
               Run
             </Button>
             <Button variant="ghost" onClick={() => { setQuery(''); setOutput(''); }}>
               <Eraser className="w-4 h-4" />
               Clear
             </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full min-h-[300px]">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex-1 flex flex-col">
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Output <Database className="w-3 h-3 inline ml-1"/>
          </label>
          <div className="flex-1 bg-slate-900 rounded-lg p-4 overflow-auto border border-slate-700">
            {output ? (
              <pre className="text-sm font-mono text-blue-300 whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 italic">
                Result will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSql;
