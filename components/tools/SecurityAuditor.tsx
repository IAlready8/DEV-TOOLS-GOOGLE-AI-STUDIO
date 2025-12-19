
import React, { useState } from 'react';
import { auditSecurity } from '../../services/geminiService';
import Button from '../Button';
import { ShieldAlert, Lock, Copy, AlertCircle } from 'lucide-react';

const SecurityAuditor: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const data = await auditSecurity(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-1/2">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-red-400" />
          <h3 className="font-semibold text-slate-200">Security Auditor</h3>
        </div>
        <textarea
          className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-500 resize-none placeholder:text-slate-600 font-mono text-xs"
          placeholder="Paste code or configuration files to scan for security risks..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAudit} isLoading={loading} className="bg-red-600 hover:bg-red-500">
            <Lock className="w-4 h-4 mr-2" /> Audit Code
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 flex flex-col relative min-h-0 overflow-hidden group">
        <div className="bg-slate-950 p-2 border-b border-slate-800 text-xs text-slate-500 font-bold uppercase tracking-wider px-4 flex items-center gap-2">
           <AlertCircle className="w-3 h-3 text-red-400" /> Security Report
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {result ? (
            <div className="prose prose-invert max-w-none text-sm text-slate-300">
               <pre className="whitespace-pre-wrap font-sans bg-transparent">{result}</pre>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 italic">
              Security audit report will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditor;
