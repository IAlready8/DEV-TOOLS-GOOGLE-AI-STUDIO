import React, { useState, useEffect, useCallback, useRef } from 'react';
import { transform, ForgeOptions, ForgeMode, PRESETS } from '../../services/textForgeEngine';
import Button from '../Button';
import { 
  Wand2, Copy, RotateCcw, Save, History, 
  ArrowRightLeft, Sliders, Type, EyeOff, 
  AlertTriangle, Upload, Download, Sparkles
} from 'lucide-react';

const TextForge: React.FC = () => {
  // State
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<ForgeMode>('leet');
  const [intensity, setIntensity] = useState(50);
  const [seed, setSeed] = useState(12345);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autoApply, setAutoApply] = useState(true);

  // Debounce ref
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // History management
  const pushHistory = useCallback((text: string) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), text].slice(-20); // Keep last 20
      setHistoryIndex(newHistory.length - 1);
      return newHistory;
    });
  }, [historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setInput(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setInput(history[historyIndex + 1]);
    }
  };

  // Transformation logic
  const runTransform = useCallback(() => {
    const opts: ForgeOptions = { mode, intensity, seed };
    const result = transform(input, opts);
    setOutput(result);
  }, [input, mode, intensity, seed]);

  // Effect for Auto-Apply
  useEffect(() => {
    if (!autoApply) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      runTransform();
    }, 150); // Debounce 150ms

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [runTransform, autoApply]);

  // Initial history push
  useEffect(() => {
    if (input && (history.length === 0 || history[historyIndex] !== input)) {
      const timer = setTimeout(() => pushHistory(input), 1000); // Debounce history
      return () => clearTimeout(timer);
    }
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    setMode(p.mode as ForgeMode);
    setIntensity(p.intensity);
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-[1600px] mx-auto">
      {/* Header / Toolbar */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">Text Forge</h3>
            <p className="text-xs text-slate-400">Advanced Text Mutator</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => loadPreset(p)}
              className="px-3 py-1.5 rounded-full bg-slate-700/50 hover:bg-slate-600 text-xs text-slate-300 border border-slate-600 whitespace-nowrap transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* COL 1: Input (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Input Source</span>
            <div className="flex gap-2">
              <button onClick={undo} disabled={historyIndex <= 0} className="p-1 text-slate-400 hover:text-white disabled:opacity-30">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-1 text-slate-400 hover:text-white disabled:opacity-30">
                <RotateCcw className="w-4 h-4 scale-x-[-1]" />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm leading-relaxed"
            placeholder="Type or paste text to forge..."
          />
          <div className="flex justify-between items-center text-xs text-slate-500 px-2">
            <span>{input.length} chars</span>
            <button onClick={() => setInput('')} className="hover:text-red-400">Clear</button>
          </div>
        </div>

        {/* COL 2: Controls (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-6 bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 overflow-y-auto custom-scrollbar">
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3 h-3" /> Transformation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'leet', label: '1337', icon: <Type className="w-3 h-3" /> },
                { id: 'glitch', label: 'Glitch', icon: <AlertTriangle className="w-3 h-3" /> },
                { id: 'mirror', label: 'Mirror', icon: <ArrowRightLeft className="w-3 h-3" /> },
                { id: 'fancy', label: 'Fancy', icon: <Sparkles className="w-3 h-3" /> },
                { id: 'vaporwave', label: 'Vapor', icon: <Type className="w-3 h-3" /> },
                { id: 'redacted', label: 'Redact', icon: <EyeOff className="w-3 h-3" /> },
                { id: 'clap', label: 'Clap', icon: <Type className="w-3 h-3" /> },
                { id: 'zerowidth', label: 'Hidden', icon: <EyeOff className="w-3 h-3" /> },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as ForgeMode)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border ${
                    mode === m.id 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-700/50" />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase">Intensity</label>
              <span className="text-xs font-mono text-indigo-400">{intensity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={intensity} 
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <p className="text-[10px] text-slate-500 leading-tight">
              Controls chaos level, probability of mutation, or font weight depending on mode.
            </p>
          </div>

          <div className="h-px bg-slate-700/50" />

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase">Seed</label>
            <div className="flex gap-2">
              <input 
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
              <button 
                onClick={() => setSeed(Math.floor(Math.random() * 100000))} 
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300"
                title="Randomize"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <label className="flex items-center gap-2 text-sm text-slate-300 mb-4 cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoApply} 
                onChange={(e) => setAutoApply(e.target.checked)}
                className="rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-offset-slate-800"
              />
              Auto-Apply Transforms
            </label>
            <Button onClick={runTransform} className="w-full bg-indigo-600 hover:bg-indigo-500">
              <Wand2 className="w-4 h-4" /> Forge Text
            </Button>
          </div>

        </div>

        {/* COL 3: Output (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Result</span>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleCopy} disabled={!output} className="h-7 text-xs px-3">
                <Copy className="w-3 h-3" /> Copy
              </Button>
            </div>
          </div>
          <div className="flex-1 relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group">
            <textarea
              readOnly
              value={output}
              className="w-full h-full bg-transparent p-6 text-slate-100 resize-none focus:outline-none font-mono text-sm leading-relaxed"
              placeholder="Forged output will appear here..."
            />
            {output && (
              <div className="absolute bottom-4 right-4 text-xs bg-slate-900/80 backdrop-blur px-2 py-1 rounded text-slate-500 border border-slate-800">
                {output.length} chars
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TextForge;