
import { ReactNode } from 'react';

export enum ToolCategory {
  AI = 'AI Powered',
  FORMATTERS = 'Formatters',
  GENERATORS = 'Generators',
  CONVERTERS = 'Converters',
  CREATIVE = 'Creative & Lifestyle',
  TEXT_FX = 'Industrial Text Forge',
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: ReactNode;
  component: ReactNode;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface GeneratedChartData {
  title: string;
  type: 'bar' | 'line' | 'area' | 'pie';
  data: ChartDataPoint[];
  xAxisKey: string;
  dataKey: string;
}

export interface ColorPalette {
  name: string;
  description: string;
  colors: {
    hex: string;
    name: string;
  }[];
}

export interface AppSettings {
  apiKey: string;
  provider: 'google' | 'openai' | 'anthropic';
  model: string;
}
