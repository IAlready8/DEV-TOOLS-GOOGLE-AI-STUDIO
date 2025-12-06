import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState('');
  const [isoStr, setIsoStr] = useState('');

  useEffect(() => {
    const ts = parseInt(timestamp);
    if (!isNaN(ts)) {
      const date = new Date(ts * 1000);
      setDateStr(date.toLocaleString());
      setIsoStr(date.toISOString());
    }
  }, [timestamp]);

  const setNow = () => setTimestamp(Math.floor(Date.now() / 1000).toString());

  return (
    <div className="max-w-xl mx-auto w-full pt-10">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl space-y-8">
        <div className="flex items-center gap-3 text-white">
          <Clock className="w-6 h-6 text-orange-400" />
          <h3 className="text-xl font-bold">Epoch Converter</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Unix Timestamp (Seconds)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white font-mono text-lg"
            />
            <button onClick={setNow} className="bg-slate-700 px-4 rounded-lg text-sm text-white hover:bg-slate-600">Now</button>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-700">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Local Time</label>
            <div className="text-lg text-emerald-400 font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
              {dateStr}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ISO 8601</label>
            <div className="text-lg text-blue-400 font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
              {isoStr}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;