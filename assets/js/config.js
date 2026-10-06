/* ==========================================================================
   VEERU PORTFOLIO — SETTINGS FILE
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to update your website.
   Change the text between the quote marks "like this", save the file,
   and refresh the page.

   Rules:
   - Keep the quote marks "" and the commas , at the end of each line.
   - Do not delete the { } [ ] brackets.
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------- 1. YOUR DETAILS ---------- */
  name: "VEERU",
  jobTitle: "Video Editor",
  location: "Vijayawada, India",
  email: "gingaeditsofficial@gmail.com",
  phone: "6281639605",              // shown on the website
  whatsappNumber: "916281639605",   // used for the WhatsApp link (91 = India code, then your number)

  /* ---------- 2. SHORT INTRO (shown on the Home page) ---------- */
  intro:
    "I edit YouTube documentaries, reels and shorts, with a focus on clean storytelling and good pacing.",

  /* ---------- 3. ABOUT TEXT (shown on the About page) ----------
     Each line inside [ ] is one paragraph. */
  about: [
    "I'm VEERU, a video editor from Vijayawada with 1 year of experience. Most of my work is YouTube documentary editing, along with reels, shorts and long-form YouTube content.",
    "I care about clean storytelling, steady pacing and tidy visual editing. I also enjoy adding motion graphics where they help the story."
  ],

  /* ---------- 4. SKILLS AND SOFTWARE ---------- */
  skills: [
    "Video Editing",
    "YouTube Documentary Editing",
    "Reels",
    "Shorts",
    "Motion Graphics"
  ],

  software: [
    "Adobe Premiere Pro",
    "Adobe After Effects"
  ],

  /* ---------- 5. VIDEO LOCATIONS ----------
     videoFolder  = where your MP4 files are kept inside this project.
     imageFolder  = where your thumbnail (poster) images are kept.

     Later, if you host the videos somewhere else, you can either:
       a) change videoFolder to the new folder URL, e.g.
          "https://videos.example.com/portfolio/"   (must end with /)
       b) or put a full https://....mp4 link in the "video" line of
          a single video below.
     The link must be a DIRECT .mp4 link. YouTube, Google Drive and
     Instagram page links will NOT work. */
  videoFolder: "public/videos/",
  imageFolder: "public/images/",

  /* ---------- 6. SHOWREEL (the big video on the Home page) ----------
     By default it uses your first video. When you have a separate
     showreel, put the file in public/videos/ and change the names
     here (for example "showreel.mp4" and "showreel.jpg"). */
  showreel: {
    video: "showreel",
    poster: "image-1",
    label: "VEERU showreel"
  },

  /* ---------- 7. PREVIOUS WORK (exactly 5 videos) ----------
     video  = the MP4 file name (inside the video folder above)
     poster = the thumbnail image name (inside the image folder above)
     label  = a short name read out by screen readers (not shown on screen)

     To change a video later, just change the file name on its line. */
  videos: [
    { video: "video-03", poster: "video-01.jpg", label: "Video 1" },
    { video: "video-02", poster: "video-02.jpg", label: "Video 2" },
    { video: "video-01", poster: "video-03.jpg", label: "Video 3" },
    { video: "video-04", poster: "video-04.jpg", label: "Video 4" },
    { video: "video-05", poster: "video-05.jpg", label: "Video 5" }
  ],

  /* ---------- 8. RESUME ----------
     Put your PDF at public/resume.pdf. The "Download Resume" button
     appears on the About page automatically when the file exists.
     If there is no file, the button stays hidden. */
  resume: "public/resume.pdf"
};
