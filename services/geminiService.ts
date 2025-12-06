
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { 
  GEMINI_FLASH_MODEL, 
  GEMINI_PRO_MODEL, 
  SYSTEM_INSTRUCTION_SQL, 
  SYSTEM_INSTRUCTION_REGEX, 
  SYSTEM_INSTRUCTION_CHART,
  SYSTEM_INSTRUCTION_CRON,
  SYSTEM_INSTRUCTION_CONVERTER,
  SYSTEM_INSTRUCTION_PALETTE,
  SYSTEM_INSTRUCTION_POLISHER,
  SYSTEM_INSTRUCTION_COMMIT,
  SYSTEM_INSTRUCTION_README,
  SYSTEM_INSTRUCTION_CSS,
  SYSTEM_INSTRUCTION_MOCK,
  SYSTEM_INSTRUCTION_META,
  SYSTEM_INSTRUCTION_MATH,
  SYSTEM_INSTRUCTION_PROMPT,
  SYSTEM_INSTRUCTION_SVG,
  SYSTEM_INSTRUCTION_CURL,
  SYSTEM_INSTRUCTION_TEXT_TO_SQL,
  SYSTEM_INSTRUCTION_MATPLOTLIB,
  SYSTEM_INSTRUCTION_MERMAID,
  SYSTEM_INSTRUCTION_SUMMARIZER,
  SYSTEM_INSTRUCTION_SENTIMENT,
  SYSTEM_INSTRUCTION_EMOJI,
  SYSTEM_INSTRUCTION_SCAFFOLD,
  SYSTEM_INSTRUCTION_DIFF_ANALYSIS
} from "../constants";
import { GeneratedChartData, ColorPalette, AppSettings } from "../types";

const LS_KEY = 'devtools_ai_settings';

export const getSettings = (): AppSettings => {
  if (typeof window === 'undefined') return { apiKey: '', provider: 'google', model: '' };
  try {
    const item = localStorage.getItem(LS_KEY);
    return item ? JSON.parse(item) : { apiKey: '', provider: 'google', model: '' };
  } catch {
    return { apiKey: '', provider: 'google', model: '' };
  }
};

export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem(LS_KEY, JSON.stringify(settings));
};

// Helper to determine which model to use
const getModel = (defaultModel: string) => {
  const settings = getSettings();
  if (settings.provider === 'google' && settings.model) {
    return settings.model;
  }
  return defaultModel;
};

// Helper to get AI instance safely
const getAiClient = () => {
  const settings = getSettings();
  const apiKey = settings.apiKey || process.env.API_KEY || '';

  if (!apiKey) {
    throw new Error("API Key is missing. Please check Settings or environment configuration.");
  }
  
  return new GoogleGenAI({ apiKey });
};

// --- Existing Methods ---

export const generateSqlAdvice = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_SQL,
      },
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini SQL Error:", error);
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const generateRegex = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_REGEX,
      },
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Regex Error:", error);
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const generateChartData = async (prompt: string): Promise<GeneratedChartData | null> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_CHART,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["bar", "line", "area", "pie"] },
            xAxisKey: { type: Type.STRING },
            dataKey: { type: Type.STRING },
            data: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                }
              }
            }
          }
        }
      },
    });
    
    if (response.text) {
      return JSON.parse(response.text) as GeneratedChartData;
    }
    return null;
  } catch (error) {
    console.error("Gemini Chart Error:", error);
    return null;
  }
};

export const generateCron = async (prompt: string): Promise<{cron: string, explanation: string}> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION_CRON },
    });
    const text = response.text || "";
    
    const cronMatch = text.match(/CRON:\s*(.+)/);
    const explMatch = text.match(/EXPLANATION:\s*(.+)/s);

    if (!cronMatch) {
       return { cron: text, explanation: "AI provided response without strict formatting." };
    }

    return {
      cron: cronMatch ? cronMatch[1].trim() : "Unable to generate",
      explanation: explMatch ? explMatch[1].trim() : "No explanation provided."
    };
  } catch (error) {
    return { cron: "Error", explanation: String(error) };
  }
};

export const convertCode = async (code: string, from: string, to: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: `Convert this ${from} code to ${to}:\n\n${code}`,
      config: { systemInstruction: SYSTEM_INSTRUCTION_CONVERTER },
    });
    return response.text || "// No code generated";
  } catch (error) {
    return `// Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const generatePalette = async (description: string): Promise<ColorPalette | null> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: description,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_PALETTE,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            colors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING },
                  name: { type: Type.STRING }
                }
              }
            }
          }
        }
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ColorPalette;
    }
    return null;
  } catch (error) {
    console.error("Gemini Palette Error:", error);
    return null;
  }
};

export const polishText = async (text: string, tone: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: `Tone: ${tone}\n\nText to polish:\n${text}`,
      config: { systemInstruction: SYSTEM_INSTRUCTION_POLISHER },
    });
    return response.text || "Unable to polish text.";
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const generateCommitMessage = async (diff: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: diff,
      config: { systemInstruction: SYSTEM_INSTRUCTION_COMMIT },
    });
    return response.text || "";
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const generateReadme = async (projectDetails: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: projectDetails,
      config: { systemInstruction: SYSTEM_INSTRUCTION_README },
    });
    return response.text || "";
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const generateCss = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: description,
      config: { systemInstruction: SYSTEM_INSTRUCTION_CSS },
    });
    const text = response.text || "";
    return text.replace(/```css/g, '').replace(/```/g, '').trim();
  } catch (error) {
    return `/* Error: ${error} */`;
  }
};

export const generateMockData = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: description,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION_MOCK,
        responseMimeType: "application/json" 
      },
    });
    return response.text || "[]";
  } catch (error) {
    return `{"error": "${error}"}`;
  }
};

export const generateMetaTags = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: description,
      config: { systemInstruction: SYSTEM_INSTRUCTION_META },
    });
    return response.text || "";
  } catch (error) {
    return `<!-- Error: ${error} -->`;
  }
};

export const solveMath = async (problem: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: problem,
      config: { systemInstruction: SYSTEM_INSTRUCTION_MATH },
    });
    return response.text || "";
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const refinePrompt = async (idea: string, type: 'image' | 'text'): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: `Type: ${type}\nIdea: ${idea}`,
      config: { systemInstruction: SYSTEM_INSTRUCTION_PROMPT },
    });
    return response.text || "";
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const generateSvg = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: description,
      config: { systemInstruction: SYSTEM_INSTRUCTION_SVG },
    });
    const text = response.text || "";
    return text.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();
  } catch (error) {
    return `<!-- Error: ${error} -->`;
  }
};

export const convertCurl = async (curlCommand: string, targetLang: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: `Target Language: ${targetLang}\n\ncURL: ${curlCommand}`,
      config: { systemInstruction: SYSTEM_INSTRUCTION_CURL },
    });
    return response.text || "// No code generated";
  } catch (error) {
    return `// Error: ${error}`;
  }
};

export const generateSqlFromText = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL), 
      contents: description,
      config: { systemInstruction: SYSTEM_INSTRUCTION_TEXT_TO_SQL },
    });
    return response.text || "-- No SQL generated";
  } catch (error) {
    return `-- Error: ${error}`;
  }
};

export const generateMatplotlib = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: description,
      config: { systemInstruction: SYSTEM_INSTRUCTION_MATPLOTLIB },
    });
    const text = response.text || "";
    return text.replace(/```python/g, '').replace(/```/g, '').trim();
  } catch (error) {
    return `# Error: ${error}`;
  }
};

export const generateMermaid = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: description,
      config: { systemInstruction: SYSTEM_INSTRUCTION_MERMAID },
    });
    const text = response.text || "";
    return text.replace(/```mermaid/g, '').replace(/```/g, '').trim();
  } catch (error) {
    return `%% Error: ${error}`;
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: text,
      config: { systemInstruction: SYSTEM_INSTRUCTION_SUMMARIZER },
    });
    return response.text || "";
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const analyzeSentiment = async (text: string): Promise<any> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: text,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION_SENTIMENT,
        responseMimeType: "application/json"
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { error: String(error) };
  }
};

export const emojifyText = async (text: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_FLASH_MODEL),
      contents: text,
      config: { systemInstruction: SYSTEM_INSTRUCTION_EMOJI },
    });
    return response.text || "";
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const generateScaffoldScript = async (description: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: description,
      config: { systemInstruction: SYSTEM_INSTRUCTION_SCAFFOLD },
    });
    const text = response.text || "";
    return text.replace(/```bash/g, '').replace(/```sh/g, '').replace(/```/g, '').trim();
  } catch (error) {
    return `# Error generating script: ${error}`;
  }
};

export const analyzeDiff = async (original: string, modified: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: getModel(GEMINI_PRO_MODEL),
      contents: `Original:\n${original}\n\nModified:\n${modified}`,
      config: { systemInstruction: SYSTEM_INSTRUCTION_DIFF_ANALYSIS },
    });
    return response.text || "";
  } catch (error) {
    return `Error analyzing diff: ${error}`;
  }
};

export const checkApiKey = (): boolean => {
  const settings = getSettings();
  return !!(settings.apiKey || process.env.API_KEY);
};
