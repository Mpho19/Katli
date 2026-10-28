# KATLI — The Birthday Issue

A flip-through birthday magazine for Katlego. Open `index.html` in a browser to read it.
No build step, no settings to edit: drop the photos in and upload.

## Where the photos go

Put every photo in the `photos` folder, named like this:

| File name | Where it appears |
|---|---|
| `cover.jpg` | Front cover |
| `photo-01.jpg` | Full page next to the Contents |
| `photo-02.jpg`, `photo-03.jpg` | Page 4, opposite Maloi's note |
| `photo-04.jpg` | End of Paballo's message |
| `photo-05.jpg` – `photo-07.jpg` | Page 9 (05 is the big one) |
| `photo-08.jpg` – `photo-11.jpg` | Page 12, after Kele's message |
| `photo-12.jpg` | Full page 13 |
| `photo-13.jpg` | Polaroid on Omphile's page |
| `photo-14.jpg` – `photo-17.jpg` | Page 15 |
| `photo-18.jpg` | End of Katli's "Dear Future Me" letter |
| `photo-19.jpg` – `photo-30.jpg` | The Album, pages 20–22 |
| `photo-31.jpg`, `photo-32.jpg` | The closing "Happy 28th" page |

`.jpeg` and `.png` also work. Any photo that is missing shows as a dashed "Photo N" box so you can spot it.

## Publish on GitHub Pages

1. In your repository, click **Add file → Upload files**.
2. Drag in everything from this folder (`index.html`, `style.css`, `README.md`, and the folders `js`, `fonts`, `photos`). Click **Commit changes**.
3. Go to **Settings → Pages**, set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, and click **Save**.
4. After a minute or two the magazine is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

Credits: page-flip by Nodlik (MIT). Fonts: Playfair Display, Lora, Caveat (SIL Open Font License).
