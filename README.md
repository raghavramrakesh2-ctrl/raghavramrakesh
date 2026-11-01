# PixelNest / COREBYES — upgraded gaming magazine

A colourful, dark-black + electric-blue gaming site built with HTML, CSS and vanilla JavaScript. It is lightweight and suitable for GitHub Pages. No computer at home needs to run as a server.

## What changed

- Full-screen animated COREBYES intro, then a login / create-account gate.
- Firebase Authentication (email/password and optional Google sign-in).
- Cloud-hosted comments, game ratings and editor-published stories using Firebase Cloud Firestore.
- Admin dashboard for publishing stories.
- GTA V feature zone and starter articles.
- GTA VI release countdown (editable date).
- YouTube trailer gallery.
- Interactive article search and category filters.
- Responsive layout for mobile and desktop.

**Important:** the intro is an animated HTML/CSS sequence that looks like a short video intro. It is not a separate MP4 video file. It says COREBYES and transitions to the login screen.

## No PC server required — use Firebase's hosted cloud

GitHub Pages only hosts static files; it cannot securely process logins or save shared comments by itself. Firebase provides the hosted authentication and database. Your PC is only used to edit and upload files; visitors connect directly to Firebase.

Firebase has a no-cost Spark plan with usage limits. Check the current limits and terms before launch: https://firebase.google.com/pricing

## One-time Firebase setup

1. Open https://console.firebase.google.com/ and create a project (for example `pixelnest-community`).
2. In Project settings → General, add a **Web app**. Register the app and copy the Firebase web configuration.
3. In **Authentication → Sign-in method**, enable **Email/Password**. Optionally enable **Google** too. For Google sign-in, add your published domain under Authorized domains.
4. In **Firestore Database**, create a database. Choose a region close to most of your audience.
5. Open `config.js` and replace the placeholder values in `firebase` with the web app configuration.
6. Publish the website to GitHub Pages, then add your GitHub Pages domain to Firebase Authentication → Settings → Authorized domains.
7. Open the published site and create your own account.
8. In Firebase Authentication → Users, copy your account's **UID**. Put it in `adminUIDs` in `config.js`:
   ```js
   adminUIDs: ["YOUR_REAL_FIREBASE_AUTH_UID"]
   ```
9. Set Firestore security rules (next section). Publish the rules.
10. Upload the updated `config.js` to GitHub. Sign out and sign back in. The ADMIN button should appear for your account.

### Firestore security rules

Replace `PUT_YOUR_ADMIN_UID_HERE` with your actual Firebase Authentication UID, then paste these rules in Firestore → Rules and Publish.

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }
    function isAdmin() {
      return signedIn() && request.auth.uid == 'PUT_YOUR_ADMIN_UID_HERE';
    }

    match /comments/{commentId} {
      allow read: if signedIn();
      allow create: if signedIn()
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.text is string
        && request.resource.data.text.size() > 0
        && request.resource.data.text.size() <= 500;
      allow update, delete: if isAdmin();
    }

    match /gameRatings/{ratingId} {
      allow read: if signedIn();
      allow create, update: if signedIn()
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.game == 'gta-v'
        && request.resource.data.rating is int
        && request.resource.data.rating >= 1
        && request.resource.data.rating <= 5;
      allow delete: if isAdmin();
    }

    match /articles/{articleId} {
      allow read: if signedIn();
      allow create: if isAdmin()
        && request.resource.data.title is string
        && request.resource.data.title.size() <= 100;
      allow update, delete: if isAdmin();
    }
  }
}
```

**Security note:** `adminUIDs` in `config.js` controls what the browser displays, but it is not the security boundary. The Firestore rules above enforce admin publishing on Firebase's servers. Never put a Firebase service-account key or private secret in this website.

## Edit the countdown

Open `config.js` and change:
```js
gtaVIDate: "2026-11-19T00:00:00"
```
Use the confirmed release date you want to count down to. The date is a configurable placeholder and should be checked against the publisher's latest announcement.

## Add / edit homepage stories

Open `articles.js`. Copy one article object and change its `id`, `category`, `date`, `readTime`, `title`, `excerpt`, and `body`. Supported categories are `News`, `Guides`, `Opinion`, and `GTA V`.

For a new story published through the ADMIN dashboard, sign in with your admin account, click ADMIN, fill in the form and publish. Cloud-published stories are stored in Firestore and appear for signed-in visitors.

## Add videos

The GTA V trailer is embedded from YouTube. To change it, replace the video ID in the iframe URL in `index.html`. A YouTube URL such as `https://www.youtube.com/watch?v=VIDEO_ID` has the ID after `v=`. Use videos you have permission to embed and credit the creator.

## Publish free with GitHub Pages

1. Create/sign in to GitHub: https://github.com/
2. Create a public repository named `YOUR-USERNAME.github.io` (replace with your username).
3. Upload the project files and `assets` folder to the repository root (upload the files, not the ZIP).
4. Go to repository **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
6. Your site will be at `https://YOUR-USERNAME.github.io/` after deployment.

Then add that domain to Firebase Authentication's Authorized domains.

## Google Search

After the site is live, add it to Google Search Console: https://search.google.com/search-console/ . Verify ownership and request indexing. Indexing is not instant and does not guarantee search ranking.

## Before public launch

- Set up Firebase and test account creation, login, comments, ratings and admin publishing.
- Keep Firestore rules secure. Do not use open read/write rules in production.
- Add a privacy policy explaining account data and community comments.
- Add a moderation process. The current starter has no report/block or automated moderation tools; as site owner, review and remove inappropriate content.
- Do not publish private details. Use a dedicated admin email.
- PixelNest is a provisional brand name, not trademark clearance. This fan site is not affiliated with Rockstar Games or Take-Two Interactive.
- Use only images, logos and videos you own, have permission to use, or are licensed to publish.
