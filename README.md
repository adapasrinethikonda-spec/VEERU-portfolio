# VEERU — Video Editor Portfolio

A simple 3-page website (Home, Previous Work, About/Contact). Plain HTML, CSS and JavaScript. No Node.js, no server, no database.

## What is in the folder

```
index.html            Home page
work.html             Previous Work page (5 videos)
about.html            About / Contact page
assets/
  css/style.css       Colours and layout
  js/config.js        <-- THE ONLY FILE YOU EDIT (text, videos, skills...)
  js/site.js          Makes the pages work (do not edit)
  favicon.svg         Small icon in the browser tab
public/
  videos/             PUT YOUR 5 MP4 FILES HERE
  images/             PUT YOUR 5 THUMBNAIL IMAGES HERE
  resume.pdf          (optional) add later for the Download Resume button
```

## 1. Where to put your MP4 files

Copy your 5 videos into `public/videos/` and name them:

```
video-01.mp4
video-02.mp4
video-03.mp4
video-04.mp4
video-05.mp4
```

Your original files are never changed. Copy them, rename the copies, and keep your originals safe.

## 2. Where to put your thumbnails

Make one JPG image for each video (a nice frame from the video, 1280 x 720 works well) and put them in `public/images/`:

```
video-01.jpg ... video-05.jpg
```

If a thumbnail is missing, the player still works. It just shows a blue box until you press play.

## 3. How to change a video later

1. Put the new MP4 in `public/videos/` (for example `new-edit.mp4`).
2. Open `assets/js/config.js`.
3. Find the video's line and change the name:

```js
{ video: "new-edit.mp4", poster: "new-edit.jpg", label: "Video 1" },
```

4. Save. Done. File names with spaces also work, but simple names are safer.

The **Showreel** on the Home page uses `video-01.mp4` by default. To use a separate showreel, change the `showreel` block in `config.js`.

## 4. Where to host the videos (important)

GitHub blocks any single file larger than 100 MB. Your videos are "about 100 MB", so some may be too big. The GitHub website upload also only accepts files up to 25 MB, and Git LFS does not work with GitHub Pages.

**Best way for you:**

- Keep the **website** on GitHub Pages (free).
- Keep the **videos** on a video-friendly file host that gives direct MP4 links. A good free choice is **Cloudflare R2** (free storage allowance and no charge for downloads, as far as I know; please check their current free plan).

Steps for Cloudflare R2:

1. Create a free Cloudflare account, open **R2**, and create a bucket (for example `veeru-videos`).
2. Upload your 5 MP4 files.
3. In the bucket settings, turn on **Public access** (the free `r2.dev` address is fine, or connect your own domain).
4. Open one video link in your browser. It must start playing as a plain video. That means it is a direct MP4 link.
5. In `assets/js/config.js`, change one line:

```js
videoFolder: "https://pub-xxxxxxxx.r2.dev/",
```

(use your own address; it must end with `/`). The file names in the list stay the same.

Or, to host just one video elsewhere, put the full link in its line: `video: "https://.../my-video.mp4"`.

**Not allowed as a video source:** YouTube links, Google Drive share links, Instagram links. These are web pages, not MP4 files, so the player cannot play them.

**If every video is under 100 MB** you can keep them inside `public/videos/` and upload with **GitHub Desktop** (not the browser upload). This works, but GitHub Pages is not meant for heavy video traffic, so the separate host is the safer choice.

Tip for future exports from Premiere Pro: tick **Optimize for Network Use** (or "Fast Start"). The video then starts playing faster in a browser. Your existing files still work without it.

## 5. How to publish with GitHub Pages

1. Sign in to GitHub and click **New repository**. Name it, for example, `portfolio`. Keep it **Public**.
2. Upload this project's files so that `index.html` is at the top level of the repository (not inside another folder). With GitHub Desktop: add the repository, copy the files in, **Commit**, then **Publish**.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
5. Wait 1–2 minutes. GitHub shows your link, which looks like `https://YOUR-USERNAME.github.io/portfolio/`.
6. Open the link, check all 3 pages, and play each video. Then send the link to clients.

All file paths in this site are relative, so it works at that address without any changes.

## 6. Other things you can change

- **Text, email, phone, skills, software:** `assets/js/config.js`.
- **Colours:** top of `assets/css/style.css` (the `:root` block).
- **Page titles and the text people see when the link is shared:** the `<title>` and `<meta ...>` lines at the top of each HTML file.
- **Resume:** put your PDF at `public/resume.pdf`. The "Download Resume" button appears on the About page by itself. Until then it stays hidden.
- **Social links:** none are added. Ask if you want them later.
- **Share image (optional):** after publishing, add this line inside `<head>` of each page, using your real full link: `<meta property="og:image" content="https://YOUR-USERNAME.github.io/portfolio/public/images/video-01.jpg">`

## If something does not work

- **A video shows "This video could not be loaded":** the message tells you the exact file it expected. Check that the file is in that place, with exactly that name (letters in lower case, `.mp4` at the end).
- **A video plays with no picture, or not at all:** the video may use a format the browser cannot play. Export from Premiere Pro as **H.264** MP4 with AAC audio.
- **Page looks empty:** make sure `assets/js/config.js` has no typo (every line needs its quote marks and comma).
