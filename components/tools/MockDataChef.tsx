
import React, { useState } from 'react';
import { generateMockData } from '../../services/geminiService';
import Button from '../Button';
import { Database, Download, Copy, ChefHat } from 'lucide-react';

const MockDataChef: React.FC = () => {
  const [input, setInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await generateMockData(input);
    try {
        // Pretty print
        const parsed = JSON.parse(data);
        setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
        setJsonOutput(data);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
           <div className="p-2 bg-orange-500/10 rounded-lg">
             <ChefHat className="w-6 h-6 text-orange-400" />
           </div>
           <div>
             <h3 className="text-white font-semibold">Mock Data Chef</h3>
             <p className="text-slate-400 text-sm">Cook up realistic JSON data for your API testing.</p>
           </div>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., 5 users with name, email, age, and a random vehicle"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <Button onClick={handleGenerate} isLoading={loading} className="bg-orange-600 hover:bg-orange-500">
            Generate
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden">
        <div className="absolute top-4 right-4 flex gap-2 z-10">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(jsonOutput)} disabled={!jsonOutput} className="text-xs h-8">
             <Copy className="w-3 h-3" />
           </Button>
        </div>
        <textarea 
          readOnly
          className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-orange-200 resize-none focus:outline-none"
          placeholder="JSON result will appear here..."
          value={jsonOutput}
        />
      </div>
    </div>
  );
};

export default MockDataChef;
