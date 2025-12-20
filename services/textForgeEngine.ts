
// Types
export type ForgeMode = 
  | 'leet' | 'glitch' | 'glitch_hard' | 'mirror' | 'fancy' | 'monospaced' 
  | 'bold_fraktur' | 'zerowidth' | 'clap' | 'vaporwave' | 'redacted' 
  | 'upside' | 'smallcaps' | 'bubble' | 'square' | 'chaos' | 'strike' 
  | 'slash' | 'bracketed' | 'aesthetic';

export interface ForgeOptions {
  mode: ForgeMode;
  intensity: number; // 0-100
  seed: number;
  preserveCase?: boolean;
}

// Data Maps
const LEET_MAP: Record<string, string[]> = {
  'a': ['4', '@', '/-\\', '^'],
  'b': ['8', '|3', '13', '|}'],
  'c': ['(', '<', '[', '{'],
  'd': ['|)', '|]', 'cl'],
  'e': ['3', '£', '&'],
  'f': ['|=', 'ph', 'v'],
  'g': ['6', '9', '&', '(_+'],
  'h': ['#', '|-|', '(-)', ')-( '],
  'i': ['1', '!', '|', '][', '¡'],
  'j': ['_|', '_/', '</'],
  'k': ['|<', '|{', '/<'],
  'l': ['1', '|', '|_', '£'],
  'm': ['/\\/\\', '|\\/|', 'em', '(V)'],
  'n': ['|\\|', '/\\/', '[\\]', '<\\>'],
  'o': ['0', '()', '[]', '<>'],
  'p': ['|*', '|o', '|D', '|"'],
  'q': ['0_', '(,)', '<|', 'kw'],
  'r': ['|2', '|?', '/2', '|^'],
  's': ['5', '$', 'z', '§'],
  't': ['7', '+', '-|-', "']['"],
  'u': ['|_|', '(_)', 'L|', 'v'],
  'v': ['\\/', '|/', '\\|'],
  'w': ['\\/\\/', 'vv', '\\|/', '\\^/'],
  'x': ['><', '}{', ')(', 'ecks'],
  'y': ['`/', '`|', '-/', '\\|/'],
  'z': ['2', '7_', '-/_', '%']
};

const FANCY_MAPS: Record<string, string> = {
  normal: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  bold: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗',
  italic: '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡0123456789',
  script: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝘔𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵0123456789',
  fraktur: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789',
  bold_fraktur: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅0123456789',
  double: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
  monospaced: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
  smallcaps: 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789',
  bubble: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨',
  square: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺current🄼current🄾🄿current🅁current🅃🅄current🅆current🅈current🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺current🄼current🄾🄿current🅁current🅃🅄current🅆current🅈current0123456789'
};

const UPSIDE_MAP: Record<string, string> = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ı', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ɯ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'y', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
  '.': '˙', ',': '\'', '\'': ',', '"': '„', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾'
};

const CHAOS_SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '_', '~', '+', '=', '/', '\\', '|', ':', ';', '.', ',', '∅', '∞', '≈', '∆', 'Σ'];

const ZALGO_UP = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
const ZALGO_DOWN = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
const ZALGO_MID = ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0360', '\u0361', '\u0362'];

// Seeded RNG
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = s * 16807 % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Transforms
const transforms = {
  leet: (text: string, opts: ForgeOptions, rng: () => number) => {
    return text.split('').map(char => {
      const lower = char.toLowerCase();
      if (!LEET_MAP[lower]) return char;
      const threshold = opts.intensity / 100;
      if (rng() > threshold) return char;
      const variants = LEET_MAP[lower];
      return variants[Math.floor(rng() * variants.length)];
    }).join('');
  },

  glitch: (text: string, opts: ForgeOptions, rng: () => number) => {
    const intensity = Math.max(1, Math.floor(opts.intensity / 5));
    return text.split('').map(char => {
      if (char === ' ') return char;
      let out = char;
      const count = Math.floor(rng() * intensity);
      for (let i = 0; i < count; i++) {
        const type = rng();
        if (type < 0.33) out += ZALGO_UP[Math.floor(rng() * ZALGO_UP.length)];
        else if (type < 0.66) out += ZALGO_DOWN[Math.floor(rng() * ZALGO_DOWN.length)];
        else out += ZALGO_MID[Math.floor(rng() * ZALGO_MID.length)];
      }
      return out;
    }).join('');
  },

  glitch_hard: (text: string, opts: ForgeOptions, rng: () => number) => {
    const intensity = Math.max(2, Math.floor(opts.intensity / 2));
    return text.split('').map(char => {
      let out = char;
      if (rng() < 0.1) out = CHAOS_SYMBOLS[Math.floor(rng() * CHAOS_SYMBOLS.length)];
      const count = Math.floor(rng() * intensity);
      for (let i = 0; i < count; i++) {
        out += ZALGO_UP[Math.floor(rng() * ZALGO_UP.length)];
        out += ZALGO_DOWN[Math.floor(rng() * ZALGO_DOWN.length)];
        out += ZALGO_MID[Math.floor(rng() * ZALGO_MID.length)];
      }
      return out;
    }).join('');
  },

  mirror: (text: string) => text.split('').reverse().join(''),

  fancy: (text: string, opts: ForgeOptions) => {
    const maps = [FANCY_MAPS.bold, FANCY_MAPS.italic, FANCY_MAPS.script, FANCY_MAPS.fraktur, FANCY_MAPS.double];
    const mapIdx = Math.floor(opts.intensity / 20) % maps.length;
    const targetMap = maps[mapIdx];
    return text.split('').map(char => {
      const idx = FANCY_MAPS.normal.indexOf(char);
      return idx !== -1 ? targetMap.substr(idx * 2, 2) : char;
    }).join('');
  },

  monospaced: (text: string) => {
    return text.split('').map(char => {
      const idx = FANCY_MAPS.normal.indexOf(char);
      return idx !== -1 ? FANCY_MAPS.monospaced.substr(idx * 2, 2) : char;
    }).join('');
  },

  bold_fraktur: (text: string) => {
    return text.split('').map(char => {
      const idx = FANCY_MAPS.normal.indexOf(char);
      return idx !== -1 ? FANCY_MAPS.bold_fraktur.substr(idx * 2, 2) : char;
    }).join('');
  },

  smallcaps: (text: string) => {
    return text.split('').map(char => {
      const idx = FANCY_MAPS.normal.indexOf(char);
      return idx !== -1 ? FANCY_MAPS.smallcaps[idx] : char;
    }).join('');
  },

  bubble: (text: string) => {
    return text.split('').map(char => {
      const idx = FANCY_MAPS.normal.indexOf(char);
      return idx !== -1 ? FANCY_MAPS.bubble.substr(idx * 2, 2) : char;
    }).join('');
  },

  square: (text: string) => {
    return text.split('').map(char => {
      const idx = FANCY_MAPS.normal.indexOf(char);
      return idx !== -1 ? FANCY_MAPS.square.substr(idx * 2, 2) : char;
    }).join('');
  },

  upside: (text: string) => {
    return text.split('').map(char => UPSIDE_MAP[char] || char).reverse().join('');
  },

  chaos: (text: string, opts: ForgeOptions, rng: () => number) => {
    const threshold = opts.intensity / 100;
    return text.split('').map(char => {
      if (rng() > threshold) return char;
      const roll = rng();
      if (roll < 0.4) return rng() > 0.5 ? char.toUpperCase() : char.toLowerCase();
      if (roll < 0.7) return CHAOS_SYMBOLS[Math.floor(rng() * CHAOS_SYMBOLS.length)];
      if (roll < 0.9) return char + ZALGO_MID[Math.floor(rng() * ZALGO_MID.length)];
      return ' ';
    }).join('');
  },

  strike: (text: string) => text.split('').map(c => c + '\u0336').join(''),
  slash: (text: string) => text.split('').map(c => c + '\u0337').join(''),

  zerowidth: (text: string, opts: ForgeOptions) => {
    if (opts.intensity > 50) {
      const binary = text.split('').map(c => {
        if (c === '\u200B') return '0';
        if (c === '\u200C') return '1';
        return '';
      }).join('');
      if (!binary) return text;
      let out = '';
      for (let i = 0; i < binary.length; i += 8) {
        out += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
      }
      return out;
    } else {
      return text.split('').map(char => {
        const bin = char.charCodeAt(0).toString(2).padStart(8, '0');
        return bin.split('').map(b => b === '0' ? '\u200B' : '\u200C').join('');
      }).join('');
    }
  },

  clap: (text: string) => text.replace(/\s+/g, ' 👏 '),
  
  vaporwave: (text: string) => {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      return (code >= 33 && code <= 126) ? String.fromCharCode(code + 65248) : char;
    }).join('  ');
  },

  redacted: (text: string, opts: ForgeOptions, rng: () => number) => {
    return text.split('').map(char => {
      if (/\s/.test(char)) return char;
      return rng() < (opts.intensity/100) ? '█' : char;
    }).join('');
  },

  bracketed: (text: string) => {
    return text.split('').map(char => {
      if (char === ' ') return '  ';
      return `[${char.toUpperCase()}]`;
    }).join('');
  },

  aesthetic: (text: string) => {
    return text.split('').map(char => char + ' ').join('').trim().toUpperCase();
  }
};

export function transform(text: string, opts: ForgeOptions): string {
  if (!text) return '';
  const rng = seededRandom(opts.seed || 12345);

  switch (opts.mode) {
    case 'leet': return transforms.leet(text, opts, rng);
    case 'glitch': return transforms.glitch(text, opts, rng);
    case 'glitch_hard': return transforms.glitch_hard(text, opts, rng);
    case 'mirror': return transforms.mirror(text);
    case 'fancy': return transforms.fancy(text, opts);
    case 'monospaced': return transforms.monospaced(text);
    case 'bold_fraktur': return transforms.bold_fraktur(text);
    case 'smallcaps': return transforms.smallcaps(text);
    case 'bubble': return transforms.bubble(text);
    case 'square': return transforms.square(text);
    case 'upside': return transforms.upside(text);
    case 'chaos': return transforms.chaos(text, opts, rng);
    case 'strike': return transforms.strike(text);
    case 'slash': return transforms.slash(text);
    case 'zerowidth': return transforms.zerowidth(text, opts);
    case 'clap': return transforms.clap(text);
    case 'vaporwave': return transforms.vaporwave(text);
    case 'redacted': return transforms.redacted(text, opts, rng);
    case 'bracketed': return transforms.bracketed(text);
    case 'aesthetic': return transforms.aesthetic(text);
    default: return text;
  }
}

export const PRESETS = [
  { name: 'Brutal Grunge', mode: 'chaos', intensity: 65 },
  { name: 'Glitch Max', mode: 'glitch_hard', intensity: 90 },
  { name: 'Underground', mode: 'upside', intensity: 100 },
  { name: 'Military Code', mode: 'bracketed', intensity: 100 },
  { name: 'Dark Ages', mode: 'bold_fraktur', intensity: 100 },
  { name: 'Bubbly', mode: 'bubble', intensity: 100 },
  { name: 'Cyber Terminal', mode: 'monospaced', intensity: 100 },
  { name: 'Cyberpunk', mode: 'vaporwave', intensity: 100 },
  { name: 'Redacted', mode: 'redacted', intensity: 100 },
];
