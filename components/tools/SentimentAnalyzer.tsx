import React, { useState } from 'react';
import { analyzeSentiment } from '../../services/geminiService';
import Button from '../Button';
import { Heart, ThumbsUp, ThumbsDown, Minus, Play } from 'lucide-react';

const SentimentAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{score: number, label: string, reasoning: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await analyzeSentiment(input);
    setResult(data);
    setLoading(false);
  };

  const getIcon = () => {
    if (!result) return <Heart className="w-12 h-12 text-slate-600" />;
    if (result.label === 'Positive') return <ThumbsUp className="w-12 h-12 text-green-400" />;
    if (result.label === 'Negative') return <ThumbsDown className="w-12 h-12 text-red-400" />;
    return <Minus className="w-12 h-12 text-yellow-400" />;
  };

  const getColor = () => {
    if (!result) return 'bg-slate-700';
    if (result.label === 'Positive') return 'bg-green-500';
    if (result.label === 'Negative') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-4xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-5 h-5 text-pink-400" />
          <h3 className="font-semibold text-slate-200">Analyze Tone</h3>
        </div>
        <textarea
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 resize-none placeholder:text-slate-600"
          placeholder="Type or paste text to detect its emotional sentiment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAnalyze} isLoading={loading} className="bg-pink-600 hover:bg-pink-500">
            <Play className="w-4 h-4" /> Analyze
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 animate-slide-up">
           <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2 min-w-[100px]">
                 {getIcon()}
                 <span className={`text-xl font-bold ${result.label === 'Positive' ? 'text-green-400' : result.label === 'Negative' ? 'text-red-400' : 'text-yellow-400'}`}>
                   {result.label}
                 </span>
              </div>
              
              <div className="flex-1 space-y-4">
                 <div>
                   <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-1">
                     <span>Negative</span>
                     <span>Neutral</span>
                     <span>Positive</span>
                   </div>
                   <div className="h-4 bg-slate-900 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-600" />
                      <div 
                        className={`absolute top-0 bottom-0 w-4 h-4 rounded-full border-2 border-white shadow transition-all duration-500 ${getColor()}`}
                        style={{ left: `${((result.score + 1) / 2) * 100}%`, transform: 'translateX(-50%)' }}
                      />
                   </div>
                   <div className="text-center mt-1 text-xs font-mono text-slate-400">Score: {result.score}</div>
                 </div>
                 
                 <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-slate-300 text-sm italic">"{result.reasoning}"</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;