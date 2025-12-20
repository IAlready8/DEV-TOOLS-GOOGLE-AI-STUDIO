
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { transform, ForgeOptions, ForgeMode, PRESETS } from '../../services/textForgeEngine';
import Button from '../Button';
import { 
  Wand2, Copy, RotateCcw, Save, History, 
  ArrowRightLeft, Sliders, Type, EyeOff, 
  AlertTriangle, Upload, Download, Sparkles,
  Command, Box, Circle, Trash2, FlipVertical,
  Minus, Terminal, Skull, Hash, Braces
} from 'lucide-react';

const TextForge: React.FC = () => {
  // State
  const [input, setInput] = useState('EXECUTE_MISSION_PROTOCOL_7');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<ForgeMode>('chaos');
  const [intensity, setIntensity] = useState(65);
  const [seed, setSeed] = useState(Date.now() % 100000);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autoApply, setAutoApply] = useState(true);

  // Debounce ref
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // History management
  const pushHistory = useCallback((text: string) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), text].slice(-20);
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
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [runTransform, autoApply]);

  // Initial history push
  useEffect(() => {
    if (input && (history.length === 0 || history[historyIndex] !== input)) {
      const timer = setTimeout(() => pushHistory(input), 1000);
      return () => clearTimeout(timer);
    }
  }, [input, pushHistory, history, historyIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    setMode(p.mode as ForgeMode);
    setIntensity(p.intensity);
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header / Toolbar */}
      <div className="bg-[#0f172a] p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Skull className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-black text-white uppercase tracking-tighter">Text Forge 8.0</h3>
            <p className="text-[10px] text-slate-500 font-mono">SUPREME BRUTALIST ENGINE</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => loadPreset(p)}
              className="px-4 py-1.5 rounded-lg bg-black/40 hover:bg-blue-600/20 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-200 border border-white/5 transition-all hover:border-blue-500/50 whitespace-nowrap"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* COL 1: Input */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Raw_Source
            </span>
            <div className="flex gap-2">
              <button onClick={undo} disabled={historyIndex <= 0} className="p-1 text-slate-500 hover:text-white disabled:opacity-30">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-1 text-slate-500 hover:text-white disabled:opacity-30">
                <RotateCcw className="w-3.5 h-3.5 scale-x-[-1]" />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#020617] border border-white/5 rounded-xl p-6 text-slate-100 resize-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 font-mono text-sm leading-relaxed transition-all shadow-inner"
            placeholder="INPUT_MISSION_DATA..."
          />
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 px-2 uppercase tracking-widest">
            <span>Buffer: {input.length}</span>
            <button onClick={() => setInput('')} className="hover:text-red-500 flex items-center gap-1 transition-colors">
              <Trash2 className="w-3 h-3" /> Wipe_Buffer
            </button>
          </div>
        </div>

        {/* COL 2: Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6 bg-[#0f172a]/60 backdrop-blur-2xl rounded-xl border border-white/10 p-6 overflow-y-auto custom-scrollbar shadow-2xl">
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Sliders className="w-3 h-3" /> Mutation_Logic
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'chaos', label: 'Grunge', icon: <Skull className="w-3 h-3" /> },
                { id: 'glitch_hard', label: 'Glitch Max', icon: <AlertTriangle className="w-3 h-3" /> },
                { id: 'bracketed', label: 'Brackets', icon: <Braces className="w-3 h-3" /> },
                { id: 'bold_fraktur', label: 'Gothic', icon: <Type className="w-3 h-3" /> },
                { id: 'monospaced', label: 'Mono', icon: <Terminal className="w-3 h-3" /> },
                { id: 'upside', label: 'Flip', icon: <FlipVertical className="w-3 h-3" /> },
                { id: 'leet', label: '1337', icon: <Hash className="w-3 h-3" /> },
                { id: 'smallcaps', label: 'Caps', icon: <Type className="w-3 h-3" /> },
                { id: 'aesthetic', label: 'Vibe', icon: <Sparkles className="w-3 h-3" /> },
                { id: 'bubble', label: 'Circle', icon: <Circle className="w-3 h-3" /> },
                { id: 'square', label: 'Block', icon: <Box className="w-3 h-3" /> },
                { id: 'redacted', label: 'Void', icon: <EyeOff className="w-3 h-3" /> },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as ForgeMode)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all border ${
                    mode === m.id 
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/50 scale-105' 
                      : 'bg-black/30 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                  }`}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Radiation_Level</label>
              <span className="text-[10px] font-mono text-blue-400">{intensity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={intensity} 
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-1 bg-[#020617] rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Entropy_Seed</label>
            <div className="flex gap-2">
              <input 
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                className="flex-1 bg-black/40 border border-white/5 rounded-lg px-4 py-2 text-xs font-mono text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={() => setSeed(Math.floor(Math.random() * 100000))} 
                className="p-2.5 bg-white/5 hover:bg-blue-600 rounded-lg text-slate-300 transition-colors border border-white/5"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <label className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 cursor-pointer group">
              <div className={`w-4 h-4 rounded border border-white/10 flex items-center justify-center transition-colors ${autoApply ? 'bg-blue-600 border-blue-400' : 'bg-black'}`}>
                {autoApply && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <input 
                type="checkbox" 
                checked={autoApply} 
                onChange={(e) => setAutoApply(e.target.checked)}
                className="hidden"
              />
              Live_Entropy_Sync
            </label>
            <Button onClick={runTransform} className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 border border-blue-400/50">
              <Wand2 className="w-5 h-5" /> Execute_Mutation
            </Button>
          </div>

        </div>

        {/* COL 3: Output */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Mutated_Result
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCopy} disabled={!output} className="h-7 text-[10px] px-4 font-black uppercase tracking-widest bg-white/5 border-white/5 hover:bg-blue-600/20">
                <Copy className="w-3 h-3" /> Copy_Result
              </Button>
            </div>
          </div>
          <div className="flex-1 relative bg-black rounded-xl border border-white/10 overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
            <textarea
              readOnly
              value={output}
              className="w-full h-full bg-transparent p-6 text-blue-50 resize-none focus:outline-none font-mono text-sm leading-relaxed"
              placeholder="AWAITING_FORGE_EXECUTION..."
            />
            {output && (
              <div className="absolute bottom-4 right-4 text-[9px] font-mono bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg text-blue-400 border border-blue-500/20 uppercase tracking-widest shadow-xl">
                Entropy_Signature: {output.length}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TextForge;
