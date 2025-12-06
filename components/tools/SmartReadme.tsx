
import React, { useState } from 'react';
import { generateReadme } from '../../services/geminiService';
import Button from '../Button';
import { FileText, Wand2, Copy } from 'lucide-react';

const SmartReadme: React.FC = () => {
  const [projectname, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    const prompt = `Project Name: ${projectname}\nDescription: ${description}`;
    const data = await generateReadme(prompt);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="flex flex-col gap-4">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> Project Details
          </h3>
          
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Project Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500"
                placeholder="My Awesome App"
                value={projectname}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-slate-400 mb-1">Description & Features</label>
              <textarea 
                className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 resize-none min-h-[200px]"
                placeholder="Describe your project, tech stack, and key features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleGenerate} isLoading={loading} className="w-full">
              <Wand2 className="w-4 h-4" /> Generate README.md
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full min-h-[400px]">
        <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex-1 flex flex-col relative">
          <div className="absolute top-4 right-4 z-10">
             <Button variant="secondary" onClick={() => navigator.clipboard.writeText(result)} disabled={!result} className="text-xs h-8">
               <Copy className="w-3 h-3" /> Copy
             </Button>
          </div>
          <textarea 
            readOnly
            className="flex-1 w-full bg-slate-900 rounded-lg p-6 font-mono text-sm text-slate-300 resize-none focus:outline-none"
            placeholder="Markdown output will appear here..."
            value={result}
          />
        </div>
      </div>
    </div>
  );
};

export default SmartReadme;
