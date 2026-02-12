import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import hbs from 'hbs';

export function registerHbsPartials(partialsPath: string): void {
  const partialFiles = readdirSync(partialsPath);

  for (const partialFile of partialFiles) {
    if (!partialFile.endsWith('.hbs')) {
      continue;
    }

    const partialName = partialFile.replace(/\.hbs$/, '');
    const partialSource = readFileSync(
      join(partialsPath, partialFile),
      'utf8',
    );

    hbs.registerPartial(partialName, partialSource);
  }
}
