import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { generateChartData } from '../../services/geminiService';
import Button from '../Button';
import { BarChart3, PieChart as PieIcon, Activity } from 'lucide-react';
import { GeneratedChartData } from '../../types';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const ChartGenius: React.FC = () => {
  const [input, setInput] = useState('');
  const [chartData, setChartData] = useState<GeneratedChartData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVisualize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await generateChartData(`Visualize this data: ${input}`);
    setChartData(result);
    setLoading(false);
  };

  const renderChart = () => {
    if (!chartData) return null;

    const commonProps = {
      data: chartData.data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartData.type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={chartData.xAxisKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }} />
            <Legend />
            <Line type="monotone" dataKey={chartData.dataKey} stroke="#3b82f6" activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
             <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={chartData.xAxisKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }} />
            <Legend />
            <Area type="monotone" dataKey={chartData.dataKey} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
             <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }} />
             <Legend />
            <Pie
              data={chartData.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey={chartData.dataKey}
              nameKey={chartData.xAxisKey}
            >
              {chartData.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      case 'bar':
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey={chartData.xAxisKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }} />
            <Legend />
            <Bar dataKey={chartData.dataKey} fill="#3b82f6">
              {chartData.data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <label className="block text-sm font-medium text-slate-400 mb-2">Describe your data</label>
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Monthly sales: Jan 400, Feb 300, Mar 600, Apr 800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVisualize()}
          />
          <Button onClick={handleVisualize} isLoading={loading}>
            <Activity className="w-4 h-4" />
            Visualize
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col min-h-[400px]">
        {chartData ? (
          <>
            <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">{chartData.title}</h3>
            <div className="flex-1 w-full h-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart() || <div>Error rendering chart</div>}
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <BarChart3 className="w-16 h-16 mb-4 opacity-20" />
            <p>Enter data above to generate a chart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartGenius;
