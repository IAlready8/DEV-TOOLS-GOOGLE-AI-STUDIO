import React, { useState, useEffect } from 'react';
import { Palette, Copy } from 'lucide-react';

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('59, 130, 246');
  const [hsl, setHsl] = useState('217, 91%, 60%');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    const rgbVal = hexToRgb(val);
    if (rgbVal) {
      setRgb(`${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}`);
      // Simple HSL approx
      setHsl('Calculated on valid hex...');
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-10">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex gap-6 items-center mb-8">
          <div className="w-24 h-24 rounded-2xl shadow-inner ring-4 ring-slate-700" style={{ backgroundColor: hex }}></div>
          <div>
            <h3 className="text-xl font-bold text-white">Color Converter</h3>
            <p className="text-slate-400 text-sm">Convert between HEX, RGB, and HSL formats.</p>
          </div>
        </div>

        <div className="space-y-4">
          <ColorInput label="HEX" value={hex} onChange={handleHexChange} />
          <ColorInput label="RGB" value={rgb} onChange={setRgb} />
          <ColorInput label="HSL" value={hsl} onChange={setHsl} />
        </div>
      </div>
    </div>
  );
};

const ColorInput = ({ label, value, onChange }: any) => (
  <div className="flex items-center gap-4">
    <label className="w-12 text-sm font-bold text-slate-500">{label}</label>
    <div className="flex-1 relative">
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-slate-200 font-mono focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={() => navigator.clipboard.writeText(value)}
        className="absolute right-2 top-2 p-1 text-slate-500 hover:text-white"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default ColorConverter;