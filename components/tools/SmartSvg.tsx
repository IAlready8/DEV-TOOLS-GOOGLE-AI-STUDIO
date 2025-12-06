import React, { useState } from 'react';
import { generateSvg } from '../../services/geminiService';
import Button from '../Button';
import { PenTool, Code, Eye } from 'lucide-react';

const SmartSvg: React.FC = () => {
  const [input, setInput] = useState('');
  const [svgCode, setSvgCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const code = await generateSvg(input);
    setSvgCode(code);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex gap-4 items-start">
        <div className="relative flex-1">
           <input 
             type="text"
             className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-4 pr-32 text-slate-200 focus:ring-2 focus:ring-pink-500 shadow-lg"
             placeholder="e.g., A flat minimal rocket ship icon, blue and white"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
           />
           <div className="absolute right-2 top-2 bottom-2">
             <Button onClick={handleGenerate} isLoading={loading} className="h-full bg-pink-600 hover:bg-pink-500">
               <PenTool className="w-4 h-4" /> Draw
             </Button>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
        {/* Preview */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden relative">
          <div className="bg-slate-900/50 p-3 border-b border-slate-700 flex items-center gap-2">
            <Eye className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">Preview</span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] p-8">
            {svgCode ? (
              <div 
                className="w-48 h-48 drop-shadow-xl transition-all hover:scale-110" 
                dangerouslySetInnerHTML={{ __html: svgCode }}
              />
            ) : (
              <span className="text-slate-600 text-sm">SVG will render here</span>
            )}
          </div>
        </div>

        {/* Code */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
          <div className="bg-slate-900/50 p-3 border-b border-slate-700 flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">SVG Code</span>
          </div>
          <textarea 
            className="flex-1 w-full bg-slate-900 p-4 font-mono text-xs text-blue-300 resize-none focus:outline-none"
            value={svgCode}
            readOnly
            placeholder="<svg>...</svg>"
          />
        </div>
      </div>
    </div>
  );
};

export default SmartSvg;