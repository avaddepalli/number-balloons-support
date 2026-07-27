# Number Balloons Support Site

A static support website for the Number Balloons iOS app, ready for Cloudflare Pages.

## What is included

- Responsive and accessible support form
- Parent/guardian wording appropriate for a kids app
- Formspree integration without exposing the destination email address
- Support-form privacy notice
- Basic security headers
- No analytics, cookies, frameworks, or build dependencies

## Required setup before publishing the Support URL

### 1. Create a Formspree form

1. Create a free Formspree account using the private email address that should receive support notifications.
2. Create a form named `Number Balloons Support`.
3. Copy the endpoint. It will look like:

   `https://formspree.io/f/abcdefgh`

4. In `public/index.html`, replace:

   `https://formspree.io/f/REPLACE_WITH_FORM_ID`

   with the real endpoint.

The form endpoint contains only a form ID. It does not expose the notification email address in the HTML.

### 2. Test the form

Open the deployed site and submit a test request. Confirm:

- The success message appears.
- The notification arrives in the intended inbox.
- Replying goes to the sender's email.
- Spam filtering is enabled in Formspree.
- No private email address appears in the page source or repository.

### 3. Optional public contact alias

Apple says the Support URL must lead to actual contact information as required by local law. For the safest App Review setup, create a dedicated public support alias such as a separate Gmail address or a custom-domain alias, then add it to the page. Do not publish a personal mailbox.

## Cloudflare Pages configuration

- Production branch: `main`
- Framework preset: None
- Build command: leave blank, or use `exit 0`
- Build output directory: `public`
- Root directory: leave blank

After deployment, Cloudflare will provide a URL similar to:

`https://number-balloons-support.pages.dev`

Use the root URL as the App Store Connect Support URL after the form is fully tested.

## Important privacy note

`public/privacy.html` covers the support website only. Do not use it as the app's complete App Store Privacy Policy URL until it has been reviewed and updated to accurately reflect all data collected by the app, SDKs, analytics, advertising, purchases, and backend services.

## Local preview

From the repository root:

```bash
python -m http.server 8000 --directory public
```

Then open `http://localhost:8000`.

## Repository structure

```text
.
├── public
│   ├── _headers
│   ├── favicon.svg
│   ├── index.html
│   ├── privacy.html
│   ├── robots.txt
│   ├── script.js
│   └── styles.css
└── README.md
```
