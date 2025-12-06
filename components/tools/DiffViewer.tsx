import React, { useState, useMemo } from 'react';
import { Split, GitCompare } from 'lucide-react';

const DiffViewer: React.FC = () => {
  const [left, setLeft] = useState('const foo = 1;\nconsole.log(foo);');
  const [right, setRight] = useState('const foo = 2;\nconsole.log(foo);\nconsole.log("changed");');

  // Very simple line-based diff for demonstration purposes
  const diffLines = useMemo(() => {
    const linesLeft = left.split('\n');
    const linesRight = right.split('\n');
    const maxLines = Math.max(linesLeft.length, linesRight.length);
    
    const rows = [];
    for (let i = 0; i < maxLines; i++) {
      const l = linesLeft[i] || '';
      const r = linesRight[i] || '';
      const isDiff = l !== r;
      rows.push({ left: l, right: r, isDiff });
    }
    return rows;
  }, [left, right]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
         <div className="flex items-center gap-2 text-slate-200 font-bold">
           <GitCompare className="w-5 h-5" />
           Diff-o-matic
         </div>
         <div className="text-xs text-slate-500">Simple Line-by-Line Comparison</div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
         <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Original</label>
            <textarea 
              className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 font-mono text-xs resize-none focus:ring-2 focus:ring-blue-500"
              value={left}
              onChange={(e) => setLeft(e.target.value)}
            />
         </div>
         <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Modified</label>
            <textarea 
              className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 font-mono text-xs resize-none focus:ring-2 focus:ring-blue-500"
              value={right}
              onChange={(e) => setRight(e.target.value)}
            />
         </div>
      </div>

      <div className="h-1/3 bg-slate-950 rounded-xl border border-slate-800 overflow-auto custom-scrollbar">
        <table className="w-full text-xs font-mono border-collapse">
          <tbody>
            {diffLines.map((row, idx) => (
              <tr key={idx} className={row.isDiff ? "bg-red-900/10" : ""}>
                 <td className="w-10 text-right text-slate-600 px-2 py-1 select-none border-r border-slate-800">{idx + 1}</td>
                 <td className={`w-1/2 px-2 py-1 break-all ${row.isDiff ? 'bg-red-900/20 text-red-200' : 'text-slate-400'}`}>{row.left}</td>
                 <td className="w-10 text-right text-slate-600 px-2 py-1 select-none border-r border-slate-800 border-l">{idx + 1}</td>
                 <td className={`w-1/2 px-2 py-1 break-all ${row.isDiff ? 'bg-green-900/20 text-green-200' : 'text-slate-400'}`}>{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiffViewer;