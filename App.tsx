
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Menu,
  X,
  Settings as SettingsIcon,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { Tool, ToolCategory } from './types';

// Tools Imports - Ensure ALL 45+ tools are imported
import SmartRegex from './components/tools/SmartRegex';
import SmartSql from './components/tools/SmartSql';
import ChartGenius from './components/tools/ChartGenius';
import JsonFormatter from './components/tools/JsonFormatter';
import UuidGenerator from './components/tools/UuidGenerator';
import SmartCron from './components/tools/SmartCron';
import CodeConverter from './components/tools/CodeConverter';
import Base64Converter from './components/tools/Base64Converter';
import ColorPalette from './components/tools/ColorPalette';
import TextPolisher from './components/tools/TextPolisher';
import GitCommitGenius from './components/tools/GitCommitGenius';
import SmartReadme from './components/tools/SmartReadme';
import CssAnimator from './components/tools/CssAnimator';
import MockDataChef from './components/tools/MockDataChef';
import MetaTagWizard from './components/tools/MetaTagWizard';
import QuickMath from './components/tools/QuickMath';
import PasswordAnalyzer from './components/tools/PasswordAnalyzer';
import UnitConverter from './components/tools/UnitConverter';
import TextForge from './components/tools/TextForge';
import MarkdownConverter from './components/tools/MarkdownConverter';
import ColorConverter from './components/tools/ColorConverter';
import CsvJsonConverter from './components/tools/CsvJsonConverter';
import JwtDecoder from './components/tools/JwtDecoder';
import NumberBaseConverter from './components/tools/NumberBaseConverter';
import TimestampConverter from './components/tools/TimestampConverter';
import UrlEncoder from './components/tools/UrlEncoder';
import StringCaseConverter from './components/tools/StringCaseConverter';
import BinaryConverter from './components/tools/BinaryConverter';
import PxRemConverter from './components/tools/PxRemConverter';
import PromptAlchemy from './components/tools/PromptAlchemy';
import SmartSvg from './components/tools/SmartSvg';
import CurlConverter from './components/tools/CurlConverter';
import DiffViewer from './components/tools/DiffViewer';
import CryptoHasher from './components/tools/CryptoHasher';
import WifiQr from './components/tools/WifiQr';
import TextToSql from './components/tools/TextToSql';
import MatplotlibGen from './components/tools/MatplotlibGen';
import MermaidGen from './components/tools/MermaidGen';
import SmartSummarizer from './components/tools/SmartSummarizer';
import SentimentAnalyzer from './components/tools/SentimentAnalyzer';
import EmojiTranslator from './components/tools/EmojiTranslator';
import MorseConverter from './components/tools/MorseConverter';
import ListTransformer from './components/tools/ListTransformer';
import ProjectScaffolder from './components/tools/ProjectScaffolder';
import SmartDiffAnalyst from './components/tools/SmartDiffAnalyst';

// New Tool Imports
import ArchitectureArchitect from './components/tools/ArchitectureArchitect';
import DockerGenius from './components/tools/DockerGenius';
import TestOracle from './components/tools/TestOracle';
import SecurityAuditor from './components/tools/SecurityAuditor';
import SchemaWeaver from './components/tools/SchemaWeaver';

// Pages
import Settings from './components/pages/Settings';

const TOOLS: Tool[] = [
  // --- AI Powered ---
  {
    id: 'ai-arch',
    name: 'Architecture Architect',
    description: 'Design high-level system components and interactions.',
    category: ToolCategory.AI,
    icon: '🏢',
    component: <ArchitectureArchitect />
  },
  {
    id: 'ai-docker',
    name: 'Docker Genius',
    description: 'Optimized multi-stage Dockerfiles for any stack.',
    category: ToolCategory.AI,
    icon: '🐳',
    component: <DockerGenius />
  },
  {
    id: 'ai-test',
    name: 'Test Oracle',
    description: 'Generate comprehensive unit tests for your code.',
    category: ToolCategory.AI,
    icon: '🧪',
    component: <TestOracle />
  },
  {
    id: 'ai-security',
    name: 'Security Auditor',
    description: 'Audit code for common security vulnerabilities.',
    category: ToolCategory.AI,
    icon: '🔐',
    component: <SecurityAuditor />
  },
  {
    id: 'ai-prompt',
    name: 'Prompt Alchemy',
    description: 'Transform ideas into expert Midjourney/LLM prompts.',
    category: ToolCategory.AI,
    icon: '🔮',
    component: <PromptAlchemy />
  },
  {
    id: 'ai-scaffold',
    name: 'Project Scaffolder',
    description: 'Generate full-scale project setup scripts.',
    category: ToolCategory.AI,
    icon: '🏗️',
    component: <ProjectScaffolder />
  },
  {
    id: 'ai-diff',
    name: 'Smart Diff Analyst',
    description: 'Semantic analysis of text/code differences.',
    category: ToolCategory.AI,
    icon: '🧐',
    component: <SmartDiffAnalyst />
  },
  {
    id: 'ai-svg',
    name: 'Smart SVG Studio',
    description: 'Generate production-ready SVG vectors from descriptions.',
    category: ToolCategory.AI,
    icon: '✒️',
    component: <SmartSvg />
  },
  {
    id: 'ai-curl',
    name: 'cURL to Code',
    description: 'Convert cURL commands to Python, Node, Go, etc.',
    category: ToolCategory.AI,
    icon: '📟',
    component: <CurlConverter />
  },
  {
    id: 'ai-regex',
    name: 'AI Regex Wizard',
    description: 'Generate, explain, and debug regular expressions.',
    category: ToolCategory.AI,
    icon: '🪄',
    component: <SmartRegex />
  },
  {
    id: 'ai-sql',
    name: 'Smart SQL Studio',
    description: 'Optimize, format, and explain SQL queries.',
    category: ToolCategory.AI,
    icon: '🧠',
    component: <SmartSql />
  },
  {
    id: 'ai-text-sql',
    name: 'NLP to SQL',
    description: 'Convert natural language questions to SQL queries.',
    category: ToolCategory.AI,
    icon: '🗣️',
    component: <TextToSql />
  },
  {
    id: 'ai-chart',
    name: 'Data Visualizer',
    description: 'Turn text or raw data into beautiful interactive charts.',
    category: ToolCategory.AI,
    icon: '📊',
    component: <ChartGenius />
  },
  {
    id: 'ai-matplotlib',
    name: 'Python Vis Gen',
    description: 'Generate Matplotlib/Seaborn code from description.',
    category: ToolCategory.AI,
    icon: '📉',
    component: <MatplotlibGen />
  },
  {
    id: 'ai-mermaid',
    name: 'Smart Diagram',
    description: 'Generate Mermaid.js flowcharts and diagrams.',
    category: ToolCategory.AI,
    icon: '🕸️',
    component: <MermaidGen />
  },
  {
    id: 'ai-cron',
    name: 'Smart Cron',
    description: 'Natural language to Cron expressions.',
    category: ToolCategory.AI,
    icon: '⏰',
    component: <SmartCron />
  },
  {
    id: 'ai-code',
    name: 'Polyglot Converter',
    description: 'Convert code between programming languages.',
    category: ToolCategory.AI,
    icon: '🔄',
    component: <CodeConverter />
  },
  {
    id: 'ai-git',
    name: 'Git Commit Genius',
    description: 'Generate conventional commit messages.',
    category: ToolCategory.AI,
    icon: '🎋',
    component: <GitCommitGenius />
  },
  {
    id: 'ai-readme',
    name: 'Smart README',
    description: 'Generate professional project documentation.',
    category: ToolCategory.AI,
    icon: '📝',
    component: <SmartReadme />
  },
  {
    id: 'ai-sum',
    name: 'Smart Summarizer',
    description: 'Condense long articles into concise summaries.',
    category: ToolCategory.AI,
    icon: '📄',
    component: <SmartSummarizer />
  },
  {
    id: 'ai-sent',
    name: 'Sentiment Analyzer',
    description: 'Detect emotional tone and score.',
    category: ToolCategory.AI,
    icon: '❤️',
    component: <SentimentAnalyzer />
  },
  {
    id: 'ai-emoji',
    name: 'Emoji Translator',
    description: 'Turn boring text into expressive emoji sentences.',
    category: ToolCategory.AI,
    icon: '😂',
    component: <EmojiTranslator />
  },
  {
    id: 'util-math',
    name: 'Quick Math',
    description: 'Solve complex math problems with AI.',
    category: ToolCategory.AI,
    icon: '🧮',
    component: <QuickMath />
  },

  // --- Text FX ---
  {
    id: 'text-forge',
    name: 'Text Forge',
    description: 'Advanced text mutator: Leet, Glitch, Zalgo.',
    category: ToolCategory.TEXT_FX,
    icon: '⚒️',
    component: <TextForge />
  },

  // --- Creative ---
  {
    id: 'cre-palette',
    name: 'Color Studio',
    description: 'Generate cohesive color palettes from vibes.',
    category: ToolCategory.CREATIVE,
    icon: '🎨',
    component: <ColorPalette />
  },
  {
    id: 'cre-polish',
    name: 'Magic Editor',
    description: 'Text polisher with tone adjustment.',
    category: ToolCategory.CREATIVE,
    icon: '✨',
    component: <TextPolisher />
  },
  {
    id: 'cre-css',
    name: 'CSS Animator',
    description: 'Generate CSS keyframes from text.',
    category: ToolCategory.CREATIVE,
    icon: '🎬',
    component: <CssAnimator />
  },

  // --- Formatters ---
  {
    id: 'fmt-json',
    name: 'JSON Formatter',
    description: 'Validate, format, and minify JSON.',
    category: ToolCategory.FORMATTERS,
    icon: '📜',
    component: <JsonFormatter />
  },
  {
    id: 'fmt-diff',
    name: 'Diff-o-matic',
    description: 'Visual text comparison tool.',
    category: ToolCategory.FORMATTERS,
    icon: '⚖️',
    component: <DiffViewer />
  },
  {
    id: 'fmt-hash',
    name: 'Crypto Hasher',
    description: 'SHA-256/512 & HMAC calculator.',
    category: ToolCategory.FORMATTERS,
    icon: '🔒',
    component: <CryptoHasher />
  },

  // --- Generators ---
  {
    id: 'gen-wifi',
    name: 'WiFi QR Builder',
    description: 'Create secure WiFi sharing QR codes.',
    category: ToolCategory.GENERATORS,
    icon: '📡',
    component: <WifiQr />
  },
  {
    id: 'gen-uuid',
    name: 'UUID Generator',
    description: 'Generate bulk v4 UUIDs.',
    category: ToolCategory.GENERATORS,
    icon: '🆔',
    component: <UuidGenerator />
  },
  {
    id: 'gen-mock',
    name: 'Mock Data Chef',
    description: 'Generate realistic JSON datasets.',
    category: ToolCategory.GENERATORS,
    icon: '👨‍🍳',
    component: <MockDataChef />
  },
  {
    id: 'gen-meta',
    name: 'Meta Tag Wizard',
    description: 'Generate SEO HTML tags.',
    category: ToolCategory.GENERATORS,
    icon: '🏷️',
    component: <MetaTagWizard />
  },
  {
    id: 'util-pass',
    name: 'Password Analyzer',
    description: 'Check password strength client-side.',
    category: ToolCategory.GENERATORS,
    icon: '🛡️',
    component: <PasswordAnalyzer />
  },

  // --- Converters ---
  {
    id: 'conv-schema',
    name: 'Schema Weaver',
    description: 'JSON to TypeScript / Zod / JSON Schema.',
    category: ToolCategory.CONVERTERS,
    icon: '🕸️',
    component: <SchemaWeaver />
  },
  {
    id: 'conv-base64',
    name: 'Base64 Converter',
    description: 'Encode/Decode Base64 strings safely.',
    category: ToolCategory.CONVERTERS,
    icon: '📦',
    component: <Base64Converter />
  },
  {
    id: 'conv-md',
    name: 'Markdown Preview',
    description: 'Live Markdown to HTML converter.',
    category: ToolCategory.CONVERTERS,
    icon: 'Ⓜ️',
    component: <MarkdownConverter />
  },
  {
    id: 'conv-color',
    name: 'Color Converter',
    description: 'HEX <-> RGB <-> HSL.',
    category: ToolCategory.CONVERTERS,
    icon: '🌈',
    component: <ColorConverter />
  },
  {
    id: 'conv-csv',
    name: 'CSV <-> JSON',
    description: 'Convert between CSV and JSON.',
    category: ToolCategory.CONVERTERS,
    icon: '📄',
    component: <CsvJsonConverter />
  },
  {
    id: 'conv-jwt',
    name: 'JWT Decoder',
    description: 'Inspect JWT headers and payloads.',
    category: ToolCategory.CONVERTERS,
    icon: '🔐',
    component: <JwtDecoder />
  },
  {
    id: 'conv-base',
    name: 'Number Base',
    description: 'Bin / Oct / Dec / Hex converter.',
    category: ToolCategory.CONVERTERS,
    icon: '#️⃣',
    component: <NumberBaseConverter />
  },
  {
    id: 'conv-time',
    name: 'Timestamp',
    description: 'Epoch to Human Date converter.',
    category: ToolCategory.CONVERTERS,
    icon: '🕒',
    component: <TimestampConverter />
  },
  {
    id: 'conv-url',
    name: 'URL Encoder',
    description: 'Escape/Unescape URL strings.',
    category: ToolCategory.CONVERTERS,
    icon: '🔗',
    component: <UrlEncoder />
  },
  {
    id: 'conv-case',
    name: 'String Case',
    description: 'Camel / Snake / Kebab / Pascal.',
    category: ToolCategory.CONVERTERS,
    icon: '🔠',
    component: <StringCaseConverter />
  },
  {
    id: 'conv-bin',
    name: 'Binary Text',
    description: 'Convert text to binary stream.',
    category: ToolCategory.CONVERTERS,
    icon: '🤖',
    component: <BinaryConverter />
  },
  {
    id: 'conv-px',
    name: 'PX to REM',
    description: 'CSS unit calculator.',
    category: ToolCategory.CONVERTERS,
    icon: '📐',
    component: <PxRemConverter />
  },
  {
    id: 'conv-unit',
    name: 'Unit Converter',
    description: 'Length, Weight, Temperature.',
    category: ToolCategory.CONVERTERS,
    icon: '📏',
    component: <UnitConverter />
  },
  {
    id: 'conv-morse',
    name: 'Morse Code',
    description: 'Text to Dots and Dashes.',
    category: ToolCategory.CONVERTERS,
    icon: '📻',
    component: <MorseConverter />
  },
  {
    id: 'conv-list',
    name: 'List Transformer',
    description: 'Convert lists to CSV, Arrays, etc.',
    category: ToolCategory.CONVERTERS,
    icon: '📋',
    component: <ListTransformer />
  }
];

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTool = useMemo(() => 
    TOOLS.find(t => t.id === activeToolId), 
  [activeToolId]);

  const filteredTools = useMemo(() => {
    if (!searchQuery) return TOOLS;
    return TOOLS.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    }, {} as Record<string, Tool[]>);
  }, [filteredTools]);

  const handleGoHome = () => {
    setActiveToolId(null);
    setShowSettings(false);
    setSidebarOpen(false);
  };

  const handleOpenSettings = () => {
    setActiveToolId(null);
    setShowSettings(true);
    setSidebarOpen(false);
  };

  const handleSelectTool = (id: string) => {
    setActiveToolId(id);
    setShowSettings(false);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden flex">
      
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0f172a]/80 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleGoHome}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🛠️</span>
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">DevTools AI</h1>
              <p className="text-xs text-slate-500 font-medium">v2.0.0 Pro</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="w-full bg-[#1e293b]/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-6 custom-scrollbar">
          {(Object.entries(groupedTools) as [string, Tool[]][]).map(([category, tools]) => (
            <div key={category}>
              <h3 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 sticky top-0 bg-[#0f172a]/95 backdrop-blur py-2 z-10">
                {category}
              </h3>
              <div className="space-y-1">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-3 group relative overflow-hidden ${
                      activeToolId === tool.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                    }`}
                  >
                    <span className="text-xl relative z-10 group-hover:scale-110 transition-transform duration-200">
                      {tool.icon}
                    </span>
                    <span className="relative z-10 truncate">{tool.name}</span>
                    {activeToolId === tool.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-100" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Settings */}
        <div className="p-4 border-t border-white/5 bg-[#0f172a]/50">
          <button
            onClick={handleOpenSettings}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
              showSettings 
                ? 'bg-slate-800 text-white shadow-inner' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-3">
             <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-slate-400 hover:text-white">
               <Menu className="w-6 h-6" />
             </button>
             <span className="font-bold text-slate-100">
               {activeTool ? activeTool.name : showSettings ? 'Settings' : 'DevTools AI'}
             </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-slate-900/0">
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto w-full h-full flex flex-col">
            
            {/* View: Settings */}
            {showSettings && (
              <Settings />
            )}

            {/* View: Active Tool */}
            {!showSettings && activeTool && (
              <div className="flex flex-col h-full animate-fade-in">
                <header className="mb-6 flex items-center gap-4 border-b border-white/5 pb-6">
                  <button 
                    onClick={handleGoHome}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <span className="text-3xl">{activeTool.icon}</span>
                      {activeTool.name}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">{activeTool.description}</p>
                  </div>
                </header>
                <div className="flex-1 min-h-0">
                  {activeTool.component}
                </div>
              </div>
            )}

            {/* View: Home Dashboard */}
            {!showSettings && !activeTool && (
              <div className="animate-fade-in pb-20">
                <div className="text-center py-12 lg:py-20 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                    <Zap className="w-4 h-4 fill-blue-500/20" /> 50+ Professional Tools Available
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight">
                    Developer Superpowers<br/>
                    <span className="text-blue-500">Unleashed.</span>
                  </h1>
                  <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    A complete suite of AI-powered utilities, generators, and formatters designed to accelerate your workflow.
                  </p>
                </div>

                <div className="space-y-12">
                  {(Object.entries(groupedTools) as [string, Tool[]][]).map(([category, tools]) => (
                    <div key={category} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-200">{category}</h2>
                        <div className="h-px bg-white/5 flex-1" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {tools.map(tool => (
                          <button
                            key={tool.id}
                            onClick={() => handleSelectTool(tool.id)}
                            className="group relative p-6 bg-[#1e293b]/40 hover:bg-[#1e293b]/80 border border-white/5 hover:border-blue-500/30 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10 overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowLeft className="w-4 h-4 text-blue-400 rotate-180" />
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center text-2xl mb-4 transition-colors">
                              {tool.icon}
                            </div>
                            <h3 className="font-bold text-slate-200 mb-2 group-hover:text-blue-400 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                              {tool.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
