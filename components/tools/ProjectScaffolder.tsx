import React, { useState } from 'react';
import { generateScaffoldScript } from '../../services/geminiService';
import Button from '../Button';
import { Hammer, Terminal, Copy, Box } from 'lucide-react';

const ProjectScaffolder: React.FC = () => {
  const [input, setInput] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await generateScaffoldScript(input);
    setScript(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Box className="w-6 h-6 text-indigo-400" />
          <h3 className="font-semibold text-slate-200">Project Scaffolder</h3>
        </div>
        <textarea
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 resize-none placeholder:text-slate-600"
          placeholder="Describe your project stack and structure. E.g., 'A React + Vite app with Tailwind, Redux Toolkit, a components folder, and a Dockerfile.'"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleGenerate} isLoading={loading} className="bg-indigo-600 hover:bg-indigo-500">
            <Hammer className="w-4 h-4 mr-2" /> Generate Script
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(script)} disabled={!script} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy Script
           </Button>
        </div>
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4 flex items-center gap-2">
           <Terminal className="w-3 h-3" /> Bash Output
        </div>
        <textarea 
          readOnly
          className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-green-400 resize-none focus:outline-none leading-relaxed"
          placeholder="# Generated shell script will appear here..."
          value={script}
        />
      </div>
    </div>
  );
};

export default ProjectScaffolder;