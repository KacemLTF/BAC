Study Hub — HTML / CSS / JS version
====================================

Files in this folder:

  index.html        Homepage with the three year cards (2nd / 3rd / 4th Year)
  year.html         Subject selection page  (uses ?year=...)
  subject.html      Courses + Exercises page (uses ?year=...&subject=...)
  styles.css        All styling (theme, animations, responsive layout)
  script.js         Page rendering logic (router, components, icons)
  data.js           The curriculum data — edit this to add/remove lessons
  pdfs/             All downloadable PDF files, organized by:
                      pdfs/<year>/<subject>/<courses|exercises>/t<n>/<file>.pdf

How to use
----------

1. Just double-click index.html to open it in your browser, or
   serve the folder with any local web server, for example:

       # Python 3
       python3 -m http.server 8000

       # Node.js
       npx serve .

   Then visit http://localhost:8000/

2. To replace a placeholder PDF with your real lesson:
   keep the same filename and drop it in the same folder under pdfs/.

3. To rename a lesson or add a new one:
   open data.js and edit the title arrays. The PDF path is
   automatically computed from the title (lowercased and dashed),
   so make sure your file in pdfs/ matches.

4. To change the author signature in the bottom-right corner:
   open script.js and search for "By Mr. Karim" — change to your name.

Notes
-----
- All downloads use the HTML "download" attribute, so PDFs are
  downloaded directly without opening in the browser preview.
- Fully responsive: works on phones, tablets, and desktop.
- A fixed back button on inner pages makes navigation easy.
