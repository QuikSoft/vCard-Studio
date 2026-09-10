import {hostingSettings} from './config.js';
import {mkdir,copyFile,readdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const source=fileURLToPath(new URL('.',import.meta.url));
const destination=path.resolve(process.argv[2]||path.join(source,'_site'));
const files=['index.html','config.js','app.js','core.js','export.js','manual.js','github.js','publish-ui.js','folder-github.js','folder-ui.js','styles.css','vendor/qrcode.min.js','vendor/LICENSE-qrcode-svg.txt'];
const allowed=new Set(['index.html','contact.vcf','qr.svg','qr.png','card.json','USER-MANUAL.html','USER-MANUAL.txt','.nojekyll','README.md']);
for(const folder of await readdir(source,{withFileTypes:true})){if(!folder.isDirectory()||!folder.name.startsWith(hostingSettings().folderPrefix))continue;for(const file of await readdir(path.join(source,folder.name),{withFileTypes:true})){if(file.isFile()&&(allowed.has(file.name)||/^[a-z0-9-]+-draft\.json$/.test(file.name)))files.push(folder.name+'/'+file.name);}}
for(const file of files){const target=path.join(destination,file);await mkdir(path.dirname(target),{recursive:true});await copyFile(path.join(source,file),target);}
await writeFile(path.join(destination,'.nojekyll'),'');
console.log(`Prepared ${files.length + 1} static files in ${destination}`);

