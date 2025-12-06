import React, { useState } from 'react';
import { generateSqlFromText } from '../../services/geminiService';
import Button from '../Button';
import { Database, MessageSquare, Copy } from 'lucide-react';

const TextToSql: React.FC = () => {
  const [input, setInput] = useState('');
  const [sql, setSql] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await generateSqlFromText(input);
    setSql(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-slate-200">Natural Language Query</h3>
        </div>
        <textarea
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-600"
          placeholder="e.g. Find all users who signed up last month and ordered a premium plan, sorted by total spend."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading}>
            <Database className="w-4 h-4" /> Generate SQL
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(sql)} disabled={!sql} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy
           </Button>
        </div>
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4 flex items-center gap-2">
           <Database className="w-3 h-3" /> SQL Output
        </div>
        <textarea 
          readOnly
          className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-blue-300 resize-none focus:outline-none leading-relaxed"
          placeholder="-- Generated SQL query will appear here..."
          value={sql}
        />
      </div>
    </div>
  );
};

export default TextToSql;