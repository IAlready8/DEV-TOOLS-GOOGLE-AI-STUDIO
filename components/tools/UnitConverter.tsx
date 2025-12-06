
import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Ruler, Weight, Thermometer } from 'lucide-react';

const CATEGORIES = {
  Length: {
    icon: <Ruler className="w-4 h-4" />,
    units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254, mi: 1609.34 }
  },
  Weight: {
    icon: <Weight className="w-4 h-4" />,
    units: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 }
  },
  Temp: {
    icon: <Thermometer className="w-4 h-4" />,
    units: ['C', 'F', 'K'] // Special handling
  }
};

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<keyof typeof CATEGORIES>('Length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [value, setValue] = useState<string>('1');
  const [result, setResult] = useState<number>(0);

  // Update units when category changes
  useEffect(() => {
    if (category === 'Length') { setFromUnit('m'); setToUnit('ft'); }
    if (category === 'Weight') { setFromUnit('kg'); setToUnit('lb'); }
    if (category === 'Temp') { setFromUnit('C'); setToUnit('F'); }
  }, [category]);

  useEffect(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    if (category === 'Temp') {
      let tempInC = val;
      if (fromUnit === 'F') tempInC = (val - 32) * 5/9;
      if (fromUnit === 'K') tempInC = val - 273.15;

      let final = tempInC;
      if (toUnit === 'F') final = (tempInC * 9/5) + 32;
      if (toUnit === 'K') final = tempInC + 273.15;
      
      setResult(final);
    } else {
      // @ts-ignore
      const base = val * CATEGORIES[category].units[fromUnit];
      // @ts-ignore
      const final = base / CATEGORIES[category].units[toUnit];
      setResult(final);
    }
  }, [value, fromUnit, toUnit, category]);

  return (
    <div className="max-w-2xl mx-auto w-full pt-6">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
        
        {/* Category Selector */}
        <div className="flex justify-center gap-2 mb-8">
           {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(cat => (
             <button
               key={cat}
               onClick={() => setCategory(cat)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
             >
               {CATEGORIES[cat].icon} {cat}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
           {/* From */}
           <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
             <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">From</label>
             <input 
               type="number" 
               className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none"
               value={value}
               onChange={(e) => setValue(e.target.value)}
             />
             <select 
               value={fromUnit}
               onChange={(e) => setFromUnit(e.target.value)}
               className="w-full mt-2 bg-slate-800 text-slate-300 text-sm rounded p-1 border border-slate-700"
             >
               {category === 'Temp' 
                 ? CATEGORIES.Temp.units.map(u => <option key={u} value={u}>{u}</option>)
                 // @ts-ignore
                 : Object.keys(CATEGORIES[category].units).map(u => <option key={u} value={u}>{u}</option>)
               }
             </select>
           </div>

           <div className="text-slate-500">
             <ArrowLeftRight className="w-6 h-6" />
           </div>

           {/* To */}
           <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
             <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">To</label>
             <div className="text-2xl font-bold text-blue-400 truncate">
               {Number(result.toFixed(4))}
             </div>
             <select 
               value={toUnit}
               onChange={(e) => setToUnit(e.target.value)}
               className="w-full mt-2 bg-slate-800 text-slate-300 text-sm rounded p-1 border border-slate-700"
             >
               {category === 'Temp' 
                 ? CATEGORIES.Temp.units.map(u => <option key={u} value={u}>{u}</option>)
                 // @ts-ignore
                 : Object.keys(CATEGORIES[category].units).map(u => <option key={u} value={u}>{u}</option>)
               }
             </select>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
