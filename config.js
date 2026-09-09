// Administrator settings. Edit this file and redeploy the app.
// Users can change only the name appended to urlPrefix.
export const config = Object.freeze({
  urlPrefix: 'https://quiksoft.github.io/vCard-Studio/Vcard-',
  githubOwner: 'quiksoft',
  githubRepository: 'vCard-Studio'
});
export function hostingSettings(value=config){
 const u=new URL(value.urlPrefix);
 if(u.protocol!=='https:'||u.search||u.hash||u.username||u.password)throw Error('config.js: urlPrefix must be an HTTPS URL without query, fragment or credentials.');
 const slash=u.pathname.lastIndexOf('/'),folderPrefix=u.pathname.slice(slash+1);
 if(!/^[a-zA-Z0-9-]+-$/.test(folderPrefix))throw Error('config.js: urlPrefix must end in a folder prefix such as Vcard-.');
 const baseURL=u.origin+u.pathname.slice(0,slash+1);
 if(u.hostname.endsWith('.github.io')){const expected='https://'+value.githubOwner.toLowerCase()+'.github.io/'+(value.githubRepository.toLowerCase()===value.githubOwner.toLowerCase()+'.github.io'?'':value.githubRepository+'/');if(baseURL!==expected)throw Error('config.js: URL prefix must match githubOwner and githubRepository.');}
 return {...value,baseURL,folderPrefix};
}
