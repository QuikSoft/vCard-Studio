# vCard Studio

A static GitHub Pages app for creating, downloading and publishing digital contact cards.

## Administrator: mandatory URL prefix

Edit `config.js` in the repository:

```js
export const config = Object.freeze({
  urlPrefix: 'https://quiksoft.github.io/vCard-Studio/Vcard-',
  githubOwner: 'quiksoft',
  githubRepository: 'vCard-Studio'
});
```

Users edit only the URL name after the prefix, such as `jan-ziegler` or `jziegler`. A trailing slash is added automatically. The displayed URL, QR code, downloaded package and publishing destination use the same configured prefix. Repository owner, repository name, full URL and folder prefix are not editable in the UI. Custom-URL and separate-repository publishing options have been removed from the interface because they would bypass this rule.

To change hosting, update all three config values consistently and redeploy. The prefix must use HTTPS and end with a folder prefix such as `Vcard-` or `Profile-`. For GitHub-hosted domains the config checks that the URL matches the repository. For a custom domain, configure that domain in GitHub Pages separately and set the matching prefix here. This does not move existing published cards: changing the prefix requires republishing at the new location and replacing old QR images.

config.js is public deployment configuration, not a place for secrets. GitHub write permissions control who can edit it. Browser-side validation is not a substitute for GitHub authorization.

## Deploy the creator

1. Extract the app ZIP and upload the folder contents to the repository root. Include config.js, build.mjs, vendor files and .github/workflows/pages.yml. Keep existing card folders.
2. Select Settings > Pages > Source > GitHub Actions.
3. Run Deploy vCard Studio to GitHub Pages under Actions. Later pushes to the default branch deploy automatically.
4. Open the deployment URL after the workflow succeeds.

The build includes the app and card folders matching the configured prefix, with their generated assets and named draft files. No npm install, server, database or API key is needed to run the creator. Generated card JSON and images are public when published.

## Create and download a card

1. Contact: enter contact details.
2. Appearance: choose profile picture, company logo, theme and accent color (picker or hex code).
3. QR code: edit only the URL name. The fixed prefix is shown above it and the calculated full address below it. Use lowercase letters, numbers and hyphens. An omitted suffix defaults to the contact's name. Optionally include the company logo and caption.
4. Export: download the contact, webpage, QR image or complete website ZIP.

The complete ZIP contains index.html, contact.vcf, QR SVG/PNG, USER-MANUAL.html and USER-MANUAL.txt, card.json and a name-draft.json file. The manual explains iPhone/Android sharing, contact imports and wallet options. Apple Wallet pass creation is not built in. The contact webpage does not display a QR code.

## Publish or edit cards

Choose Publish to card folder in Export. The repository and folder are taken from the configured URL and the name entered in the creation flow. A short-lived fine-grained GitHub token needs access to only this repository, with Contents: Read and write and Pages: Read. No account password is requested. Credentials are sent only to api.github.com and are not stored in drafts or exported files.

Review the public destination and confirm publication. The app uploads only the generated files in the selected folder. Existing folders cannot be accidentally replaced. A successful commit triggers deployment, which may take several minutes; check GitHub Actions before sharing the URL.

Choose Edit published card in Contact or Export to select a published folder. Loading replaces the local editor draft. Edit and use Update published card to publish changes at its existing address. Concurrent repository/card edits are detected instead of overwritten. Refreshing the app clears the update association; load the published card again to resume an update.

The published card.json and name-draft.json contain public contact details and images, never tokens. You can also open either file through Open a saved draft. Older Quiksoft draft URLs are migrated into the configured prefix, retaining their card alias. Review the URL before publishing. Older cards without editable JSON require their original saved draft.

## Local use and verification

```sh
node serve.mjs
node tests/core.test.mjs
node build.mjs
```

Open http://localhost:4173 to use the creator. Do not double-click index.html; JavaScript modules require a web server. Thirty automated checks cover contact serialization, QR payloads, packages, publishing, concurrent edits and mandatory URL configuration. Live browser/GitHub publishing remains unverified in this session.

## Third-party library

The supplied qrcode-svg library is retained with its MIT license in vendor/LICENSE-qrcode-svg.txt. Its byte encoder supports UTF-8 using TextEncoder. Upstream: https://github.com/papnkukn/qrcode-svg
