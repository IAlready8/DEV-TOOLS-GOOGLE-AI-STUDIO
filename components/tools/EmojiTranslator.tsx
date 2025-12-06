import React, { useState } from 'react';
import { emojifyText } from '../../services/geminiService';
import Button from '../Button';
import { Smile, Copy, Wand2 } from 'lucide-react';

const EmojiTranslator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await emojifyText(input);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-3xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Smile className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-slate-200">Emoji Translator</h3>
        </div>
        <textarea
          className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-yellow-500 resize-none placeholder:text-slate-600"
          placeholder="e.g. I am flying to Paris for a vacation"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleConvert} isLoading={loading} className="bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-bold">
            <Wand2 className="w-4 h-4 mr-2" /> Emojify
          </Button>
        </div>
      </div>

      {output && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 relative animate-slide-up shadow-xl">
           <button 
             onClick={() => navigator.clipboard.writeText(output)}
             className="absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors"
           >
             <Copy className="w-4 h-4" />
           </button>
           <p className="text-2xl md:text-4xl text-center leading-relaxed font-medium text-white drop-shadow-md">
             {output}
           </p>
        </div>
      )}
    </div>
  );
};

export default EmojiTranslator;