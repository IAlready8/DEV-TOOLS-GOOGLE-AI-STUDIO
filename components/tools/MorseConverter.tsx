import React, { useState } from 'react';
import { MoreHorizontal, ArrowRightLeft, Copy, Trash2 } from 'lucide-react';
import Button from '../Button';

const MORSE_CODE: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_CODE).reduce((acc, [k, v]) => ({...acc, [v]: k}), {});

const MorseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');

  const handleTextChange = (val: string) => {
    setText(val);
    setMorse(val.toUpperCase().split('').map(c => MORSE_CODE[c] || c).join(' '));
  };

  const handleMorseChange = (val: string) => {
    setMorse(val);
    setText(val.split(' ').map(c => REVERSE_MORSE[c] || c).join(''));
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto w-full">
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
           <MoreHorizontal className="w-5 h-5 text-blue-400" />
           <span className="font-bold text-slate-200">Morse Code Translator</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
         <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-2">
               <label className="text-xs font-bold text-slate-500 uppercase">Text</label>
               <button onClick={() => {setText(''); setMorse('')}} className="text-xs text-slate-500 hover:text-red-400"><Trash2 className="w-3 h-3"/></button>
            </div>
            <textarea
              className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white resize-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              placeholder="Type text here..."
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
            />
         </div>

         <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-2">
               <label className="text-xs font-bold text-slate-500 uppercase">Morse Code</label>
               <button onClick={() => navigator.clipboard.writeText(morse)} className="text-xs text-slate-500 hover:text-blue-400"><Copy className="w-3 h-3"/></button>
            </div>
            <textarea
              className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-green-400 font-mono text-lg resize-none focus:ring-2 focus:ring-green-500 placeholder:text-slate-600"
              placeholder=".- -... -.-."
              value={morse}
              onChange={(e) => handleMorseChange(e.target.value)}
            />
         </div>
      </div>
    </div>
  );
};

export default MorseConverter;