import {mkdir,copyFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const source=fileURLToPath(new URL('.',import.meta.url));
const destination=path.resolve(process.argv[2]||path.join(source,'_site'));
const files=['index.html','app.js','core.js','export.js','manual.js','github.js','publish-ui.js','folder-github.js','folder-ui.js','styles.css','.nojekyll','vendor/qrcode.min.js','vendor/LICENSE-qrcode-svg.txt'];
const allowed=new Set(['index.html','contact.vcf','qr.svg','qr.png','card.json','USER-MANUAL.html','USER-MANUAL.txt','.nojekyll','README.md']);
for(const folder of await readdir(source,{withFileTypes:true})){if(!folder.isDirectory()||!/^Vcard-[a-z0-9][a-z0-9-]*$/.test(folder.name))continue;for(const file of await readdir(path.join(source,folder.name),{withFileTypes:true})){if(file.isFile()&&(allowed.has(file.name)||/^[a-z0-9-]+-draft\.json$/.test(file.name)))files.push(folder.name+'/'+file.name);}}
for(const file of files){const target=path.join(destination,file);await mkdir(path.dirname(target),{recursive:true});await copyFile(path.join(source,file),target);}
console.log(`Prepared ${files.length} static files in ${destination}`);
