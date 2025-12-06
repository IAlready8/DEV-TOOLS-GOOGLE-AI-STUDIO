import React, { useState } from 'react';
import { Wifi, QrCode, Download } from 'lucide-react';

const WifiQr: React.FC = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [hidden, setHidden] = useState(false);

  // Format: WIFI:T:WPA;S:mynetwork;P:mypass;;
  const qrString = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}&bgcolor=1e293b&color=3b82f6`;

  return (
    <div className="flex flex-col md:flex-row h-full gap-8 max-w-5xl mx-auto w-full items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl w-full max-w-md space-y-6">
        <div className="flex items-center gap-3 text-white mb-2">
           <Wifi className="w-6 h-6 text-blue-400" />
           <h3 className="font-bold text-lg">WiFi Config</h3>
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Network Name (SSID)</label>
           <input 
             type="text" 
             className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500"
             value={ssid}
             onChange={(e) => setSsid(e.target.value)}
             placeholder="MyHomeWiFi"
           />
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
           <input 
             type="text" 
             className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="secret123"
           />
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Encryption</label>
           <select 
             className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500"
             value={encryption}
             onChange={(e) => setEncryption(e.target.value)}
           >
             <option value="WPA">WPA/WPA2</option>
             <option value="WEP">WEP</option>
             <option value="nopass">None</option>
           </select>
        </div>

        <label className="flex items-center gap-3 text-slate-300 cursor-pointer">
           <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="rounded border-slate-600 bg-slate-700" />
           <span className="text-sm">Hidden Network</span>
        </label>
      </div>

      {ssid && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl">
             <img src={qrUrl} alt="WiFi QR" className="rounded-xl w-64 h-64 mix-blend-lighten" />
          </div>
          <p className="text-sm text-slate-400">Scan to connect</p>
        </div>
      )}
    </div>
  );
};

export default WifiQr;