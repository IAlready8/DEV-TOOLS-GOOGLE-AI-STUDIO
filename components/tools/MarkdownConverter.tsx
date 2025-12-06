import React, { useState } from 'react';
import Button from '../Button';
import { FileText, Code, Eye } from 'lucide-react';

const MarkdownConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\n* Item 1\n* Item 2');
  
  // Very basic parser for demonstration
  const parseMarkdown = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/gim, '<br />');
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Code className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Markdown Input</span>
          </div>
          <textarea
            className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">HTML Preview</span>
          </div>
          <div 
            className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-200 overflow-auto prose prose-invert"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownConverter;