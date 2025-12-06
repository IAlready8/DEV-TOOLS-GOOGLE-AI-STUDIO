import React, { useState } from 'react';
import { refinePrompt } from '../../services/geminiService';
import Button from '../Button';
import { Sparkles, Copy, Image, MessageSquare } from 'lucide-react';

const PromptAlchemy: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [type, setType] = useState<'image' | 'text'>('image');
  const [loading, setLoading] = useState(false);

  const handleRefine = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await refinePrompt(input, type);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-500/10 rounded-lg">
               <Sparkles className="w-6 h-6 text-purple-400" />
             </div>
             <h3 className="text-white font-semibold">Prompt Alchemy</h3>
          </div>
          
          <div className="flex bg-slate-900 p-1 rounded-lg">
            <button 
              onClick={() => setType('image')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${type === 'image' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Image className="w-4 h-4" /> Image
            </button>
            <button 
              onClick={() => setType('text')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${type === 'text' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <MessageSquare className="w-4 h-4" /> Text
            </button>
          </div>
        </div>
        
        <textarea 
          className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-purple-500 resize-none mb-4 placeholder:text-slate-600"
          placeholder={type === 'image' ? "e.g., A cat in space" : "e.g., Write a marketing email"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <div className="flex justify-end">
          <Button onClick={handleRefine} isLoading={loading} className="bg-purple-600 hover:bg-purple-500">
            Refine Magic
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="secondary" onClick={() => navigator.clipboard.writeText(output)} disabled={!output} className="text-xs h-8">
             <Copy className="w-3 h-3" /> Copy
           </Button>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {output ? (
             <p className="text-purple-200 text-lg leading-relaxed whitespace-pre-wrap font-medium">{output}</p>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-600 italic">
               Refined prompt will appear here...
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptAlchemy;