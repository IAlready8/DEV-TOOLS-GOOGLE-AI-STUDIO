
import React, { useState } from 'react';
import { Shield, Check, X } from 'lucide-react';

const PasswordAnalyzer: React.FC = () => {
  const [password, setPassword] = useState('');

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length > 8) score += 20;
    if (pwd.length > 12) score += 20;
    if (/[A-Z]/.test(pwd)) score += 20;
    if (/[0-9]/.test(pwd)) score += 20;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20;
    return score;
  };

  const strength = calculateStrength(password);

  const getColor = (s: number) => {
    if (s < 40) return 'bg-red-500';
    if (s < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getLabel = (s: number) => {
    if (s === 0) return 'Enter Password';
    if (s < 40) return 'Weak';
    if (s < 80) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="max-w-xl mx-auto w-full pt-10">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Shield className={`w-8 h-8 ${strength > 60 ? 'text-green-400' : 'text-slate-400'}`} />
          <h2 className="text-2xl font-bold text-white">Security Check</h2>
        </div>

        <input 
          type="text" 
          className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-center text-xl text-white tracking-wider focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-6"
          placeholder="Type a password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mb-2 flex justify-between text-sm font-medium text-slate-400">
           <span>Strength</span>
           <span className={strength > 80 ? 'text-green-400' : strength > 40 ? 'text-yellow-400' : 'text-slate-400'}>
             {getLabel(strength)}
           </span>
        </div>
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden mb-8">
           <div 
             className={`h-full transition-all duration-500 ${getColor(strength)}`} 
             style={{ width: `${strength}%` }}
           ></div>
        </div>

        <div className="space-y-3">
          <Requirement label="At least 8 characters" met={password.length >= 8} />
          <Requirement label="Contains Uppercase" met={/[A-Z]/.test(password)} />
          <Requirement label="Contains Number" met={/[0-9]/.test(password)} />
          <Requirement label="Contains Symbol" met={/[^A-Za-z0-9]/.test(password)} />
        </div>
      </div>
    </div>
  );
};

const Requirement = ({ label, met }: { label: string, met: boolean }) => (
  <div className={`flex items-center gap-3 text-sm ${met ? 'text-slate-200' : 'text-slate-500'}`}>
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${met ? 'bg-green-500/20 text-green-400' : 'bg-slate-700'}`}>
      {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
    </div>
    {label}
  </div>
);

export default PasswordAnalyzer;
