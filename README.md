# vCard Studio

A guided, browser-based creator for digital business cards, built for GitHub Pages. No account, API key, build step, or backend is needed. The original supplied files are unchanged.

## Run locally

With Node.js installed, open a terminal in this folder and run:

```sh
node serve.mjs
```

Then open http://localhost:4173. Use a web server rather than double-clicking index.html, because the app uses JavaScript modules.

## Publish the creator as a GitHub Pages app

1. Extract the ZIP. Create a GitHub repository, for example `vcard-studio`.
2. Commit/upload **the contents** of the vcard-studio folder to the repository root, including `.github/workflows/pages.yml`, `.nojekyll`, and the vendor folder. Do not upload the ZIP itself or nest the app inside another folder.
3. In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
4. Open **Actions → Deploy vCard Studio to GitHub Pages → Run workflow**. Subsequent pushes to the repository default branch deploy automatically, including commits made by the card publisher.
5. After the workflow succeeds, open the deployment URL, typically `https://YOUR-USERNAME.github.io/vcard-studio/`.

The workflow runs the checks, packages only the app's static files, and deploys them. No npm installation, server, API key, or database is required. Relative asset and module paths support both repository subpaths and custom domains. On GitHub Free, use a public repository.

If uploading through the website omits hidden folders, use Git or GitHub Desktop to commit all files. You can also use **Deploy from a branch**, selecting your branch and root folder, instead of the Actions workflow for this static app.

This package configures deployment; it has not been uploaded or deployed to your GitHub account. See [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Prepare the deployment files locally

`node build.mjs` copies the runtime files into `_site/`. Preview that output with `node serve.mjs _site`. The build uses only Node.js built-ins. Generated files in `_site/` are excluded from Git.

## Create cards for users

1. **Contact:** enter the name, job, company, contact links and optional bio.
2. **Appearance:** upload a profile photo and company logo, choose a color using the picker or a 3/6-digit hex code (with or without #), and select a light/dark theme.
3. **QR code:** edit the hosted URL field, prefilled with the example `https://githubuser.github.io/vcard-yournamehere`. The QR code is generated from your entered URL and updates as you type. Optionally add your logo and a caption.
4. **Export:** download a vCard, standalone HTML, QR PNG, QR SVG, or website ZIP.

The website ZIP contains index.html, a contact file, QR SVG and PNG, publishing notes, and USER-MANUAL.html / USER-MANUAL.txt. The manual includes the entered card URL, phone sharing and contact import steps, Google Wallet image-pass guidance, and the supported-pass route for Apple Wallet. Apple Wallet pass generation is not included. Upload these files to a repository named `vcard-yournamehere` under your GitHub account. Enable Pages at the repository root. For example, account `alexlee` and card name `alex` use repository `vcard-alex` and URL `https://alexlee.github.io/vcard-alex`. Repeat with a different repository name for each user. Keep the URL stable when updating a card.

The Export step now also offers Publish to GitHub. This optional flow creates a new public repository and publishes the contact page. Existing repositories are never overwritten. QR codes always encode the hosted card URL and work once that URL is live. The separate contact file still supports direct contact import.

## Drafts, images and privacy

The current draft is saved in localStorage on this browser. Download the editable JSON draft before starting a new card to keep a reusable copy. You can reopen it from the Contact step. If storage is blocked/full, download a draft to preserve your work.

Images are resized in-browser; profile photos become JPEG and logos become PNG. The exported webpage embeds both images. Contact downloads include the profile photo; QR codes encode only the hosted URL. No analytics or remote image/QR service is used. Published files expose the included contact details and images publicly.

QR images use high error correction and a four-module quiet margin. Test the actual downloaded QR on your target phones before printing, especially with a center logo. Use the final published card URL. SVG and PNG exports share the rounded charcoal frame, rounded QR corner markers, optional centre logo and caption. The published contact page does not display a QR code.

## Development and validation

```sh
node tests/core.test.mjs
```

Automated checks cover vCard escaping, UTF-8 folding, safe link handling, vector QR generation, photo exclusion from QR codes, ZIP structure, the GitHub URL template, and URL-only QR payloads (including older drafts), personalised manual content, and ZIP inclusion of both manuals plus binary PNG data. PNG packaging is checked using a mocked browser canvas; actual phone and wallet flows remain unverified. Browser visual and interaction testing was blocked by a declined local-browser access request in the creation session; responsive rendering, file upload/download interactions and physical QR scanning still need manual verification.

Files: app.js owns the guided flow; core.js owns contact serialization and rendering; export.js owns HTML/PNG/ZIP generation; styles.css owns the responsive interface.

## Third-party code

vendor/qrcode.min.js was carried forward from the supplied working project, using the qrcode-svg implementation (https://github.com/papnkukn/qrcode-svg). Its MIT license is included in vendor/LICENSE-qrcode-svg.txt. The byte encoder was updated to use TextEncoder for non-BMP Unicode support. The existing page's third-party template code and personal images were not copied into this creator.




## Publish a card directly from the app

In Export, choose **Publish to GitHub**. Enter your personal GitHub username, a new repository name (for example vcard-alex), and a short-lived fine-grained personal access token. GitHub account passwords are not used.

Create the token at https://github.com/settings/personal-access-tokens/new with your personal account as resource owner, **All repositories** access (needed to include the repository that will be created), and **Administration**, **Contents**, and **Pages** repository permissions set to **Read and write**. This grants access beyond the new card repository; revoke the token after use. If you prefer not to grant this, use the manual ZIP deployment. Only personal-account repositories are supported by this first publishing flow.

Select Review publication. The app verifies the account and checks the proposed repository. Review the card preview and destination, then confirm public publication. The app creates the repository, commits index.html and .nojekyll, enables Pages from the default branch, and updates your draft's URL and QR downloads to the returned Pages URL. The contact page remains free of QR artwork. Download the ZIP again to receive QR images and the manual with the new URL.

GitHub can take a few minutes to build the page. Publication requested is not proof that the site is already live. Check the displayed Pages settings link. If publishing partially fails, the repository may already exist; the app reports the destination and does not delete it. You can finish using the ZIP.

The token is sent in an Authorization header directly to https://api.github.com. It is not placed in URLs, logs, localStorage, drafts, generated pages or ZIPs. It is cleared after completion, cancellation or a publishing failure. Use your trusted HTTPS deployment (or localhost). This is a client-side token flow, not an OAuth/GitHub App sign-in. Never enter an account password.

Publishing is verified with mocked GitHub API tests only; no real account was used and live GitHub/CORS deployment remains unverified. Official reference: https://docs.github.com/en/rest/pages/pages and https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

## Publish multiple cards into this repository

Install this updated app package in your existing vCard-Studio repository first, **including build.mjs, the new folder modules, and .github/workflows/pages.yml**. Keep any existing Vcard- folders. Wait for the app deployment to finish. The build now copies each Vcard- folder into the Pages artifact alongside the app; it does not copy tokens or private drafts.

In Export choose **Publish to card folder**. The dialog defaults to the repository hosting this app (or quiksoft/vCard-Studio when running locally). Enter a unique folder such as Vcard-jeroen and a fine-grained GitHub token limited to this repository, with **Contents: Read and write** and **Pages: Read**. The account must have write access; a public visitor cannot publish without authorization. No new repository or Pages configuration is created by this option.

The app reads the existing Pages URL and constructs, for example, https://quiksoft.github.io/vCard-Studio/Vcard-jeroen/. It prepares the contact page, QR SVG/PNG, contact file, manuals and editable card.json using that URL, then shows a review before committing. The commit triggers the repository's existing deployment. Your editor URL and all subsequent downloads update automatically. A success message means committed, not necessarily live yet.

This supports a root-based Pages site or the supplied Actions workflow. Repositories publishing a /docs source are not supported by this folder flow. Branch protection can block direct commits; the app does not bypass it.

## Edit a published card

Choose **Edit published card** on Contact or Export. Connect to the repository, select a Vcard- folder, and choose Load into editor. This replaces the current local draft, so download a draft first if needed. Edit details, photos, branding or QR options, then choose **Update published card** in Export. The destination stays fixed so existing QR codes remain valid.

The app checks the loaded folder revision, shows an update confirmation, and writes only files in that folder. If another change happened after loading or review, it stops instead of overwriting it. Reload the latest card and apply your edits again. Repository files outside the chosen folder are preserved. Credentials are never part of card.json.

The editable published data is **public**, just like the contact details and images on the card; it is not a private draft. Only explicitly supported card fields are included. Cards published with older versions without card.json cannot be reconstructed automatically: import their saved draft and publish a new card folder. The separate-new-repository option remains available but its older single-page exports do not include editable card.json.

Refreshing the creator clears the current published-card association. Use Edit published card again to resume an update. Download website ZIP still exports the complete card package, including editable card.json, QR PNG/SVG and the user manuals. A downloaded card.json can also be opened through Open a saved draft.

Folder publishing/editing has automated API-mock coverage (24 checks in total). The actual GitHub authorization, browser UI and live deployment have not been exercised in this session.

## Consistent folder URLs and named drafts

The QR step now defaults to folder mode with Repository owner, Repository name and Card folder fields. The read-only URL is calculated from those fields, including the repository path and the exact Vcard- capitalization. For example, owner quiksoft, repository vCard-Studio and folder Vcard-jjvlebon produce https://quiksoft.github.io/vCard-Studio/Vcard-jjvlebon/. Choose Custom website URL for a separate website instead.

Older Quiksoft drafts with root-level vcard-name URLs are migrated to the vCard-Studio/Vcard-name/ address when opened. Check the displayed folder against the folder actually published. Publish to card folder uses these same fields. The separate-repository option intentionally produces a different URL.

Every full card ZIP and folder publication now contains name-draft.json alongside card.json. Both contain the supported public card fields and images, never credentials. Either can be reopened through Open a saved draft. The build includes named draft JSON files in Vcard- folders, so do not place private drafts in public card folders. Existing published files require an update/republication to receive the named draft file. Separate-repository publication also saves the named draft and card.json.

27 automated checks pass, including path preservation, migration, named draft ZIP inclusion and QR changes when the folder changes. Six supplied QR images were decoded; three used root-level URLs and three already had the repository path. Replacement PNGs were generated and decoded back to the expected full URLs. No live repositories were changed.
