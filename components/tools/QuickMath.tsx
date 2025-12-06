
import React, { useState } from 'react';
import { solveMath } from '../../services/geminiService';
import Button from '../Button';
import { Calculator, HelpCircle } from 'lucide-react';

const QuickMath: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSolve = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await solveMath(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-3xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <label className="block text-sm font-medium text-slate-400 mb-3">
          Enter a math problem or word problem
        </label>
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 text-lg placeholder:text-slate-600"
            placeholder="e.g., Integral of x^2 or 'If I have 5 apples...'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
          />
          <Button onClick={handleSolve} isLoading={loading} className="px-6 bg-emerald-600 hover:bg-emerald-500">
            <Calculator className="w-5 h-5" />
            Solve
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 animate-slide-up">
           <div className="flex items-center gap-2 mb-4">
             <HelpCircle className="w-5 h-5 text-emerald-400" />
             <span className="font-semibold text-slate-200">Solution</span>
           </div>
           <div className="prose prose-invert max-w-none text-slate-300">
             <pre className="whitespace-pre-wrap font-sans text-base bg-transparent p-0 border-none">
               {result}
             </pre>
           </div>
        </div>
      )}
    </div>
  );
};

export default QuickMath;
