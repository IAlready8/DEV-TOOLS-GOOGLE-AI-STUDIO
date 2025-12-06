import React, { useState } from 'react';
import Button from '../Button';
import { Link } from 'lucide-react';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => setOutput(encodeURIComponent(input));
  const decode = () => setOutput(decodeURIComponent(input));

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 text-slate-200">
          <Link className="w-5 h-5" />
          <span className="font-semibold">URL Encoder/Decoder</span>
        </div>
        <div className="flex gap-2">
          <Button onClick={encode}>Encode</Button>
          <Button onClick={decode} variant="secondary">Decode</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <textarea
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm resize-none"
          placeholder="Input text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <textarea
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm resize-none text-blue-300"
          placeholder="Result..."
          readOnly
          value={output}
        />
      </div>
    </div>
  );
};

export default UrlEncoder;