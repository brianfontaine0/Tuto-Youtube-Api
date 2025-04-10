import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');
const outputFile = path.join(__dirname, '../src/interfaces/types.ts');

// Mapping JS -> TS
const mapJSTypeToTSType = (value: any): string => {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (Array.isArray(value)) {
    const first = value[0];
    return first ? `${mapJSTypeToTSType(first)}[]` : 'any[]';
  }
  if (typeof value === 'object' && value !== null) return 'Record<string, any>';
  return 'any';
};

// Génération d'une interface TypeScript
const generateInterface = (name: string, example: Record<string, any>): string => {
  const fields = Object.entries(example)
    .map(([key, value]) => `  ${key}: ${mapJSTypeToTSType(value)};`)
    .join('\n');

  return `export interface ${capitalize(name)} {\n${fields}\n}`;
};

// Capitalisation (post -> Post)
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/s$/, ''); // pluriel → singulier

// Génération principale
const generateTypes = () => {
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

  const interfaces: string[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dataDir, file), 'utf-8');
    const data = JSON.parse(raw);

    if (!Array.isArray(data) || data.length === 0) continue;

    const baseName = path.basename(file, '.json') + 'Type';
    const example = data[0];
    interfaces.push(generateInterface(baseName, example));
  }

  fs.writeFileSync(outputFile, interfaces.join('\n\n'));
  console.log('✅ types.ts généré avec succès !');
};

generateTypes();
