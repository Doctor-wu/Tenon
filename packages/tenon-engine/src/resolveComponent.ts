import fs from 'fs';
import path from 'path';
import { resolveWebComponent } from './resolveWebComponent';

export const resolveComponent = (compName: string, compPath: string) => {
  const compJson = JSON.parse(fs.readFileSync(path.join(compPath, 'index.json')).toString());
  const compScript = fs.readFileSync(path.join(compPath, 'index.ts')).toString();
  const compStyle = fs.readFileSync(path.join(compPath, 'index.scss')).toString();
  const platforms = compJson.platforms;
  for (let platform of platforms) {
    switch (platform) {
      case 'web':
        resolveWebComponent(compName, compJson, compScript, compStyle);
        break;
      case 'mp':
      default:
        console.log(`Unaccessible platform: ${platform}`);

    }
  }
}