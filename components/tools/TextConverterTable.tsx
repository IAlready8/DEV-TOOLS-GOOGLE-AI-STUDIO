
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Wand2, Copy, RotateCcw, Save, History, 
  ArrowRightLeft, Sliders, Type, EyeOff, 
  Trash2, Download, Check, Sparkles, Terminal, Upload, FileText
} from 'lucide-react';
import Button from '../Button';

type TransformMode = 
  | 'leet' | 'binary' | 'hex' | 'base64' | 'morse' | 'caesar' 
  | 'spongebob' | 'bubble' | 'wide' | 'upsidedown' | 'mirror' 
  | 'glitch' | 'fancy' | 'ascii' | 'zerowidth' | 'combine' | 'redacted';

const TextConverterTable: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<TransformMode>('leet');
  const [intensity, setIntensity] = useState(50);
  const [history, setHistory] = useState<{in: string, out: string, mode: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shift, setShift] = useState(3); // For Caesar

  // Core Transformation Logic (Version 7.0 Performance Engine)
  const performTransform = useCallback((text: string, m: TransformMode, intense: number, cShift: number) => {
    if (!text) return '';
    
    switch (m) {
      case 'leet':
        const leetMap: any = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'b': '8', 'g': '9', 'l': '1', 'z': '2' };
        return text.toLowerCase().split('').map(c => Math.random() < (intense/100) ? (leetMap[c] || c) : c).join('');
      case 'binary':
        return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      case 'hex':
        return text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
      case 'base64':
        try { return btoa(unescape(encodeURIComponent(text))); } catch { return 'ERR:ENCODING_FAILURE'; }
      case 'spongebob':
        return text.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
      case 'mirror':
        return text.split('').reverse().join('');
      case 'caesar':
        return text.replace(/[a-z]/gi, (c) => {
          const start = c <= 'Z' ? 65 : 97;
          return String.fromCharCode(((c.charCodeAt(0) - start + cShift) % 26) + start);
        });
      case 'bubble':
        const bubbles: any = { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ' };
        return text.toLowerCase().split('').map(c => bubbles[c] || c).join('');
      case 'morse':
        const morse: any = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/' };
        return text.toUpperCase().split('').map(c => morse[c] || c).join(' ');
      case 'glitch':
        const chars = '░▒▓█<>/\\_+-*&^%$#@!ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ';
        return text.split('').map(c => Math.random() < (intense/100) ? chars[Math.floor(Math.random()*chars.length)] : c).join('');
      case 'wide':
        return text.split('').join('  ');
      case 'upsidedown':
        const udMap: any = { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z' };
        return text.toLowerCase().split('').reverse().map(c => udMap[c] || c).join('');
      case 'redacted':
        return text.split('').map(c => /\s/.test(c) ? c : '█').join('');
      case 'zerowidth':
        return text.split('').map(char => {
          const bin = char.charCodeAt(0).toString(2).padStart(8, '0');
          return bin.split('').map(b => b === '0' ? '\u200B' : '\u200C').join('');
        }).join('\u200D');
      case 'fancy':
        const fancyBold = "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳";
        return text.toLowerCase().split('').map(c => {
          const idx = "abcdefghijklmnopqrstuvwxyz".indexOf(c);
          return idx !== -1 ? fancyBold[idx*2] + fancyBold[idx*2+1] : c;
        }).join('');
      case 'combine':
        // A chaotic mix of Leet, Glitch and Mirror
        const partialMirror = text.split('').reverse().join('');
        return partialMirror.split('').map(c => Math.random() < 0.3 ? '░' : c).join('');
      default:
        return text;
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setOutput(performTransform(input, mode, intensity, shift));
      setLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [input, mode, intensity, shift, performTransform]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => setInput(re.target?.result as string);
      reader.readAsText(file);
    }
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devtools_export_${mode}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveToHistory = () => {
    if (!input) return;
    setHistory(prev => [{ in: input, out: output, mode }, ...prev].slice(0, 50));
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Heavy Brutalist Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {(['leet', 'binary', 'hex', 'base64', 'spongebob', 'caesar', 'bubble', 'morse', 'glitch', 'wide', 'upsidedown', 'mirror', 'fancy', 'zerowidth', 'redacted', 'combine'] as TransformMode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`p-4 font-mono text-[11px] uppercase font-black border-4 border-brutalBlack transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] ${
              mode === m ? 'bg-brutalRed text-white translate-x-[-4px] translate-y-[-4px] shadow-[8px_8px_0px_0px_#000]' : 'bg-brutalWhite text-brutalBlack hover:bg-acid'
            }`}
          >
            {m}_
          </button>
        ))}
      </div>

      {/* Main Workbench */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 flex-1">
        {/* Source Column */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center bg-brutalBlack text-acid p-3 border-4 border-brutalBlack font-mono text-xs uppercase font-black italic">
            <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Input_Stream::0x{input.length.toString(16)}</span>
            <div className="flex gap-4">
              <label className="cursor-pointer hover:text-white transition-colors flex items-center gap-1">
                <Upload className="w-3 h-3" /> <input type="file" className="hidden" onChange={handleFileUpload} /> Import_
              </label>
              <button onClick={() => setInput('')} className="hover:text-brutalRed transition-colors">Reset_</button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-h-[400px] bg-brutalGray border-8 border-brutalBlack p-8 font-mono text-2xl text-brutalWhite focus:border-acid outline-none resize-none leading-relaxed transition-all brutal-shadow hover:brutal-shadow-acid placeholder:text-brutalWhite/10"
            placeholder="FEED_THE_MACHINE_WITH_RAW_DATA_STREAMS..."
          />
        </div>

        {/* Forge Column */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center bg-acid text-brutalBlack p-3 border-4 border-brutalBlack font-mono text-xs uppercase font-black italic">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Output_Forge::Active</span>
            <div className="flex gap-6">
              <button onClick={saveToHistory} className="hover:underline">Commit_</button>
              <button onClick={downloadOutput} className="hover:underline">Export_</button>
              <button onClick={handleCopy} className="flex items-center gap-2 font-black">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied_' : 'Clone_'}
              </button>
            </div>
          </div>
          <div className="flex-1 relative brutal-shadow border-8 border-brutalBlack min-h-[400px]">
            <textarea
              readOnly
              value={output}
              className="w-full h-full bg-brutalWhite p-8 font-mono text-2xl text-brutalBlack resize-none focus:outline-none leading-relaxed italic font-bold"
              placeholder="THE_FORGE_AWAITS_COMMANDS..."
            />
            {loading && (
              <div className="absolute inset-0 bg-brutalBlack/90 flex flex-col items-center justify-center animate-pulse z-20">
                <div className="w-16 h-1 bg-acid animate-shudder mb-4"></div>
                <span className="font-mono text-acid text-lg font-black tracking-widest uppercase">Transforming_Matrix</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Industrial Controls */}
      <div className="bg-industrial p-8 border-8 border-brutalBlack grid grid-cols-1 md:grid-cols-3 gap-12 items-center brutal-shadow-acid">
        <div className="space-y-4">
          <div className="flex justify-between items-center font-mono text-[11px] uppercase font-black text-acid">
            <label className="flex items-center gap-2"><Sliders className="w-4 h-4" /> Entropy_Level</label>
            <span className="bg-acid text-brutalBlack px-2">{intensity}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={intensity} 
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-6 bg-brutalBlack rounded-none appearance-none cursor-pointer accent-acid border-4 border-acid"
          />
        </div>

        {mode === 'caesar' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center font-mono text-[11px] uppercase font-black text-brutalRed">
              <label className="flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Cipher_Shift</label>
              <span className="bg-brutalRed text-white px-2">{shift}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="25" 
              value={shift} 
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-full h-6 bg-brutalBlack rounded-none appearance-none cursor-pointer accent-brutalRed border-4 border-brutalRed"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
           <div className="font-mono text-[10px] uppercase font-black text-brutalWhite/30 flex items-center gap-2"><History className="w-3 h-3" /> Historical_Shards</div>
           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b-2 border-brutalBlack">
             {history.length === 0 && <span className="text-[10px] font-mono italic opacity-20">No_Commits_Found_</span>}
             {history.map((item, i) => (
               <button 
                 key={i} 
                 onClick={() => setInput(item.in)}
                 className="px-4 py-1 bg-brutalBlack border-2 border-brutalWhite/20 text-[10px] font-mono text-acid hover:border-acid transition-all hover:bg-brutalWhite hover:text-brutalBlack whitespace-nowrap font-bold"
               >
                 MOD::{item.mode}
               </button>
             ))}
           </div>
        </div>

        <div className="flex justify-end gap-5">
           <button onClick={() => setInput('')} className="group p-5 bg-brutalRed text-white font-mono font-black uppercase text-sm hover:bg-red-700 transition-all border-4 border-brutalBlack shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">
             Nuclear_Reset_
           </button>
        </div>
      </div>
    </div>
  );
};

export default TextConverterTable;
