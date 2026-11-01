# PixelNest COREBYES 2.0

A lightweight static gaming portal for GitHub Pages. No home PC server is needed.

## What's new
- Guest browsing: visitors can enter without signing in.
- Separate pages: Home, News, GTA V, Videos, Mini Games and Community.
- News search and category filters, plus Firebase admin article publishing.
- Video vault with GTA V and GTA VI official trailer embeds, plus YouTube discovery links for funny gameplay and Unity/game-dev tips.
- Three playable browser mini games: reaction test, memory match and click rush.
- Firebase login remains available. Registered accounts can comment and rate; guests can browse.
- Admin publishing remains protected by Firestore rules.

## IMPORTANT: preserve your existing Firebase config
If you are updating the PixelNest website you already configured, **do not replace or delete your existing `config.js`**. This package includes `config.js.example` only so your real Firebase API config and admin UID are not overwritten. Keep your current `config.js` in the GitHub repository.

For a fresh setup, copy `config.js.example` to `config.js`, fill it with your Firebase web app config and admin UID.

## Update your existing GitHub Pages site
1. Extract this ZIP on your PC.
2. Open your existing GitHub repository.
3. Upload the new/updated files from this folder to the repository root (not inside an extra nested folder).
4. **Do not upload `config.js.example` as `config.js`; do not overwrite your existing `config.js`.**
5. Keep `config.js`, then commit changes.
6. GitHub Pages redeploys automatically. Your website URL and Firebase project stay the same.

Files to upload: `index.html`, `news.html`, `gtav.html`, `videos.html`, `minigames.html`, `community.html`, `styles.css`, `site.js`, `home.js`, `news.js`, `community.js`, `minigames.js`, `articles.js`, `firestore.rules`, and `README.md`. You may also upload `config.js.example` as a reference.

## Firebase setup/update
Your Firebase project, Authentication users, Firestore database and GitHub Pages setup do not need to be recreated.

### 1. Authentication
Keep Email/Password enabled if you use account login. Google sign-in is optional.

### 2. Firestore rules — IMPORTANT
This version lets anyone read public articles, comments and ratings, while only signed-in accounts can write comments/ratings and only your admin UID can publish articles.
1. Open Firebase Console → Firestore Database → Rules.
2. Replace `PUT_YOUR_ADMIN_UID_HERE` in `firestore.rules` with your actual Firebase Authentication UID.
3. Paste the complete contents of `firestore.rules` into the Rules editor and Publish.

Do not use open write rules. Public reads are intentional so guests can browse stories and community posts.

### 3. Admin
Keep your existing admin UID in your existing `config.js`. Do not change it if the ADMIN button already works.

## Add stories
Open `articles.js` and add an object to the `articles` array. Each story has `id`, `category`, `date`, `readTime`, `title`, `excerpt`, and `body`. Or sign in using your admin account, open ADMIN, and publish from the dashboard. Cloud articles appear on News page.

## Videos
The Videos page embeds GTA V's official trailer (YouTube ID `QkkoHAzjnUs`) and GTA VI Trailer 1 (YouTube ID `QdBZY2fkU-0`). Funny GTA V gameplay and game development tips are YouTube search links so visitors can choose creators/videos. Replace/add links only to videos you have permission to share.

## Mini games
All three mini games run locally in the visitor's browser. They do not need Firebase or downloads.

## Privacy and moderation
Comments are publicly readable. Users must sign in to post. The site does not yet include report/block or automated moderation. Review comments regularly and publish a privacy policy before collecting real user information.

## Countdown
The date in `config.js` is editable. Verify the release date against Rockstar's current announcement before relying on it.

PixelNest is a provisional name, not trademark clearance. This fan community is not affiliated with Rockstar Games or Take-Two Interactive.
