import React, { useState, useEffect } from 'react';
import { Save, Key, Server, Cpu, Check, AlertTriangle, Trash2 } from 'lucide-react';
import { getSettings, saveSettings } from '../../services/geminiService';
import { GEMINI_FLASH_MODEL, GEMINI_PRO_MODEL } from '../../constants';
import Button from '../Button';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'google' | 'openai' | 'anthropic'>('google');
  const [model, setModel] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = getSettings();
    setApiKey(settings.apiKey || '');
    setProvider(settings.provider || 'google');
    setModel(settings.model || '');
  }, []);

  const handleSave = () => {
    saveSettings({ apiKey, provider, model });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    saveSettings({ apiKey: '', provider: 'google', model: '' });
    setApiKey('');
    setProvider('google');
    setModel('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pt-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
           <Server className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">Manage API keys and AI provider preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation / Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" /> Important
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Your API keys are stored locally in your browser's <code>localStorage</code>. 
              They are never sent to our servers, only directly to the AI providers.
            </p>
            <div className="text-xs text-slate-500 font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
              Current Env Key: {process.env.API_KEY ? 'Present (Hidden)' : 'Not Set'}
            </div>
          </div>
        </div>

        {/* Main Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Provider Selection */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-400" /> Provider
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'google', label: 'Google Gemini' },
                { id: 'openai', label: 'OpenAI (Soon)', disabled: true },
                { id: 'anthropic', label: 'Anthropic (Soon)', disabled: true }
              ].map(p => (
                <button
                  key={p.id}
                  disabled={p.disabled}
                  onClick={() => setProvider(p.id as any)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    provider === p.id 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                  } ${p.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-400" /> API Key
            </h3>
            <div className="relative">
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={process.env.API_KEY ? "Using Environment Variable..." : "sk-..."}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600"
              />
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Leave empty to use the default environment variable key if configured.
            </p>
          </div>

          {/* Model Selection */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-orange-400" /> Model Preference
            </h3>
            <div className="space-y-3">
               <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${!model ? 'bg-orange-500/10 border-orange-500/50' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'}`}>
                 <input 
                   type="radio" 
                   name="model" 
                   checked={!model} 
                   onChange={() => setModel('')}
                   className="hidden" 
                 />
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!model ? 'border-orange-500' : 'border-slate-500'}`}>
                   {!model && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                 </div>
                 <div>
                   <div className="font-medium text-slate-200">Auto (Recommended)</div>
                   <div className="text-xs text-slate-500">Intelligently switches between Flash and Pro based on the task.</div>
                 </div>
               </label>

               <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${model === GEMINI_FLASH_MODEL ? 'bg-orange-500/10 border-orange-500/50' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'}`}>
                 <input 
                   type="radio" 
                   name="model" 
                   checked={model === GEMINI_FLASH_MODEL} 
                   onChange={() => setModel(GEMINI_FLASH_MODEL)}
                   className="hidden" 
                 />
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${model === GEMINI_FLASH_MODEL ? 'border-orange-500' : 'border-slate-500'}`}>
                   {model === GEMINI_FLASH_MODEL && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                 </div>
                 <div>
                   <div className="font-medium text-slate-200">Gemini 2.5 Flash</div>
                   <div className="text-xs text-slate-500">Fastest. Good for simple tasks, regex, and conversions.</div>
                 </div>
               </label>

               <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${model === GEMINI_PRO_MODEL ? 'bg-orange-500/10 border-orange-500/50' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'}`}>
                 <input 
                   type="radio" 
                   name="model" 
                   checked={model === GEMINI_PRO_MODEL} 
                   onChange={() => setModel(GEMINI_PRO_MODEL)}
                   className="hidden" 
                 />
                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${model === GEMINI_PRO_MODEL ? 'border-orange-500' : 'border-slate-500'}`}>
                   {model === GEMINI_PRO_MODEL && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                 </div>
                 <div>
                   <div className="font-medium text-slate-200">Gemini 3.0 Pro</div>
                   <div className="text-xs text-slate-500">Smartest. Best for coding, reasoning, and complex generation.</div>
                 </div>
               </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="flex-1 text-lg h-12">
              {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {saved ? 'Saved!' : 'Save Settings'}
            </Button>
            <Button onClick={handleClear} variant="secondary" className="px-6 hover:bg-red-900/50 hover:text-red-400 hover:border-red-800">
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;