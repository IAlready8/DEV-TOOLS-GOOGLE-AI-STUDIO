import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setHeader('');
      setPayload('');
      setIsValid(false);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT structure');
      
      const decode = (str: string) => decodeURIComponent(atob(str.replace(/_/g, '/').replace(/-/g, '+')).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      
      setHeader(JSON.stringify(JSON.parse(decode(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(decode(parts[1])), null, 2));
      setIsValid(true);
    } catch (e) {
      setHeader('');
      setPayload('');
      setIsValid(false);
    }
  }, [token]);

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto w-full">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-slate-400">Encoded Token</label>
          {token && (
            <span className={`text-xs flex items-center gap-1 ${isValid ? 'text-green-400' : 'text-red-400'}`}>
              {isValid ? <CheckCircle className="w-3 h-3"/> : <ShieldAlert className="w-3 h-3"/>}
              {isValid ? 'Valid Format' : 'Invalid Format'}
            </span>
          )}
        </div>
        <textarea 
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono text-xs break-all resize-none focus:ring-2 focus:ring-purple-500"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Header</label>
          <pre className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 text-red-300 font-mono text-xs overflow-auto">
            {header || '// Header'}
          </pre>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Payload</label>
          <pre className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 text-purple-300 font-mono text-xs overflow-auto">
            {payload || '// Payload'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JwtDecoder;