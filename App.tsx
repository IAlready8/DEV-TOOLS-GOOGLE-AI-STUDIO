
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu,
  X,
  Settings as SettingsIcon,
  ArrowLeft,
  Zap,
  LayoutGrid,
  Maximize2,
  Terminal,
  Cpu,
  Github,
  Globe,
  Star,
  Layers
} from 'lucide-react';
import { Tool, ToolCategory } from './types';

// Core Tool Components
import TextConverterTable from './components/tools/TextConverterTable';
// Placeholder Tool Imports (In a real app, these would be the provided files)
import SmartRegex from './components/tools/SmartRegex';
import SmartSql from './components/tools/SmartSql';
import ChartGenius from './components/tools/ChartGenius';

// Pages
import Settings from './components/pages/Settings';

const TOOLS: Tool[] = [
  {
    id: 'text-master-converter',
    name: 'Text Engine Pro',
    description: '17+ Industrial transformations. Leet, Morse, Glitch, Zerowidth. Version 7.0 Elite performance.',
    category: ToolCategory.TEXT_FX,
    icon: '⚡',
    component: <TextConverterTable />
  },
  {
    id: 'ai-regex',
    name: 'Regex Wizard',
    description: 'Synthesize expressions with acid precision. LLM-backed pattern generation.',
    category: ToolCategory.AI,
    icon: '🪄',
    component: <SmartRegex />
  },
  {
    id: 'ai-sql',
    name: 'SQL Monolith',
    description: 'Optimize high-availability query structures. Industrial DBA automation.',
    category: ToolCategory.AI,
    icon: '🧠',
    component: <SmartSql />
  },
  {
    id: 'ai-chart',
    name: 'Data Shard',
    description: 'Geometric visualization of industrial data streams using high-fidelity vector charts.',
    category: ToolCategory.AI,
    icon: '📊',
    component: <ChartGenius />
  }
];

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 3JS Background Orchestration
  useEffect(() => {
    const container = document.getElementById('canvas-container');
    const THREE = (window as any).THREE;
    if (!container || !THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry: Brutalist Floating Shard
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xccff00, 
      wireframe: true,
      transparent: true,
      opacity: 0.1 
    });
    const shard = new THREE.Mesh(geometry, material);
    scene.add(shard);

    // Particle Cloud
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i=0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.005, color: 0xff0033, transparent: true, opacity: 0.4 });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 6;

    const animate = () => {
      requestAnimationFrame(animate);
      shard.rotation.x += 0.002;
      shard.rotation.y += 0.003;
      particlesMesh.rotation.y -= 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeTool = useMemo(() => TOOLS.find(t => t.id === activeToolId), [activeToolId]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen font-sans selection:bg-acid selection:text-brutalBlack">
      
      {/* Brutalist Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-brutalBlack border-r-8 border-brutalBlack transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col bg-brutalGray m-3 border-4 border-brutalBlack">
          <div className="p-8 border-b-8 border-brutalBlack bg-acid text-brutalBlack">
            <h1 className="font-display text-4xl font-black uppercase leading-none italic tracking-tighter">
              DevTools<br/>AI//7.0
            </h1>
            <div className="mt-4 flex gap-4 text-xs font-mono font-bold uppercase opacity-60">
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> ARCH:PRO</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> EDGE:01</span>
            </div>
          </div>

          <div className="p-5 bg-brutalBlack">
            <input 
              type="text" 
              placeholder="SEARCH_MANIFEST_" 
              className="w-full bg-industrial border-4 border-brutalWhite p-4 text-sm font-mono text-brutalWhite focus:bg-acid focus:text-brutalBlack focus:border-acid outline-none transition-all placeholder:text-brutalWhite/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <nav className="flex-1 overflow-y-auto p-5 space-y-10 custom-scrollbar">
            {Object.values(ToolCategory).map(category => (
              <div key={category} className="space-y-3">
                <h3 className="text-[10px] font-black text-acid uppercase tracking-[0.4em] mb-4 border-b-2 border-acid/10 pb-2">
                  {category}
                </h3>
                <div className="space-y-1">
                  {TOOLS.filter(t => t.category === category).map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => { setActiveToolId(tool.id); setShowSettings(false); setSidebarOpen(false); }}
                      className={`w-full text-left p-4 flex items-center gap-5 transition-all border-4 ${
                        activeToolId === tool.id 
                          ? 'bg-acid border-brutalBlack text-brutalBlack font-black shadow-[4px_4px_0px_0px_#000]' 
                          : 'bg-transparent border-transparent text-brutalWhite/40 hover:text-acid hover:translate-x-2'
                      }`}
                    >
                      <span className="text-2xl">{tool.icon}</span>
                      <span className="text-xs font-mono uppercase font-bold">{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <button
            onClick={() => { setShowSettings(true); setActiveToolId(null); setSidebarOpen(false); }}
            className={`p-8 border-t-8 border-brutalBlack flex items-center gap-4 font-mono uppercase text-xs font-black tracking-[0.2em] transition-all ${
              showSettings ? 'bg-brutalRed text-white' : 'bg-brutalWhite text-brutalBlack hover:bg-acid'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Preferences_</span>
          </button>
        </div>
      </aside>

      {/* Main Orchestrator */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-700 lg:pl-80`}>
        
        {/* Strike Header */}
        <header className="h-24 lg:h-32 bg-brutalBlack flex items-center px-10 lg:px-16 justify-between sticky top-0 z-40 border-b-8 border-brutalBlack">
          <div className="flex items-center gap-10">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-4 bg-acid text-brutalBlack brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <Menu className="w-8 h-8" />
            </button>
            <div className="hidden lg:flex items-center gap-6">
              <div className="px-3 py-1 bg-brutalRed text-white font-mono text-[10px] font-black uppercase animate-pulse">LIVE::0X7FF</div>
              <h2 className="font-display text-2xl font-black uppercase italic tracking-tighter text-white">
                {activeTool ? activeTool.name : showSettings ? 'Configuration' : 'Dashboard'}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-10 font-mono text-[11px] font-black uppercase">
            <div className="hidden xl:flex items-center gap-6 text-brutalWhite/30">
              <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> DEPLOY:GLOBAL</span>
              <span className="flex items-center gap-2"><Github className="w-3 h-3" /> REPO:STRIKE</span>
            </div>
            <div className="px-4 py-2 border-4 border-acid text-acid flex items-center gap-3 brutal-shadow-acid bg-brutalBlack">
              <Terminal className="w-4 h-4" />
              v7.0.5_STABLE
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 lg:p-16 max-w-[1600px] mx-auto w-full relative z-10">
          
          {/* Dashboard View (Pinterest-Style) */}
          {!showSettings && !activeToolId && (
            <div className="animate-fade-in space-y-16">
              <section className="space-y-8 pt-10">
                <div className="flex items-center gap-4 text-acid font-mono text-sm font-black uppercase tracking-[0.4em]">
                  <Layers className="w-5 h-5" /> 
                  System.Architecture::Personal_Portfolio
                </div>
                <h1 className="font-display text-7xl lg:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter text-brutalWhite italic drop-shadow-[10px_10px_0px_#ff0033]">
                  INDUSTRIAL<br/>
                  <span className="text-acid">DOMINANCE_</span>
                </h1>
                <p className="max-w-3xl font-mono text-2xl text-brutalWhite/40 border-l-[12px] border-acid pl-10 py-6 leading-relaxed italic">
                  Built for edge-case hardware. Zero-latency transformations. This is the industrial standard for modern workflow orchestration.
                </p>
              </section>

              <div className="masonry-grid">
                {filteredTools.map((tool, idx) => (
                  <div key={tool.id} style={{ gridRowEnd: `span ${idx % 3 === 0 ? 45 : idx % 3 === 1 ? 35 : 40}` }} className="mb-6">
                    <button
                      onClick={() => setActiveToolId(tool.id)}
                      className="w-full h-full group relative bg-brutalGray border-4 border-brutalBlack p-10 text-left transition-all hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-[15px_15px_0px_0px_#ccff00] flex flex-col overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-6 font-mono text-[10px] font-black text-acid/20 uppercase">MOD_0{idx+1}</div>
                      <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500">{tool.icon}</div>
                      <h3 className="font-display text-4xl font-black uppercase mb-4 text-brutalWhite group-hover:text-acid transition-colors">{tool.name}</h3>
                      <p className="font-mono text-sm text-brutalWhite/40 leading-relaxed mb-10 italic">{tool.description}</p>
                      
                      <div className="mt-auto flex justify-between items-center border-t-4 border-brutalBlack pt-6">
                        <span className="text-[10px] font-mono text-acid bg-acid/5 px-3 py-1 uppercase font-black border border-acid/20">{tool.category}</span>
                        <Maximize2 className="w-5 h-5 text-brutalWhite/20 group-hover:text-acid group-hover:rotate-90 transition-all duration-500" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Configuration View */}
          {showSettings && <Settings />}

          {/* Tool Workspace View */}
          {!showSettings && activeTool && (
            <div className="animate-slide-up flex flex-col h-full bg-industrial border-[12px] border-brutalBlack brutal-shadow min-h-[85vh]">
              <div className="bg-acid text-brutalBlack p-8 border-b-[12px] border-brutalBlack flex justify-between items-center">
                <div className="flex items-center gap-8">
                  <button onClick={() => setActiveToolId(null)} className="p-3 border-4 border-brutalBlack bg-brutalBlack text-white hover:bg-white hover:text-brutalBlack transition-all shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">
                    <ArrowLeft className="w-8 h-8" />
                  </button>
                  <div>
                    <h2 className="font-display text-5xl font-black uppercase tracking-tighter leading-none italic">{activeTool.name}</h2>
                    <p className="font-mono text-xs font-black opacity-60 mt-2 uppercase tracking-widest">Process_ID: {activeTool.id} // v7.0.5</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-8">
                  <span className="font-mono text-[11px] border-4 border-brutalBlack px-4 py-2 uppercase font-black tracking-widest bg-brutalWhite">SHARD::0x1A2</span>
                  <Cpu className="w-12 h-12 animate-pulse text-brutalBlack" />
                </div>
              </div>
              <div className="flex-1 p-10 overflow-auto custom-scrollbar">
                {activeTool.component}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating 3JS Asset */}
      <div id="canvas-container" className="fixed inset-0 pointer-events-none z-0 opacity-40"></div>
    </div>
  );
}
