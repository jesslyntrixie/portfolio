# Portfolio

Personal portfolio of Jesslyn Trixie Edvilie: software engineer focused on iOS, with an AI research background.

Live: https://jesslyntrixie.vercel.app

## Structure

- `index.html`: the whole page (hero, work, publications, about, contact)
- `style.css`: all styles; colors and fonts are set at the top in `:root`
- `main.js`: the `PROJECTS` list, filters, pop-up, nav
- `404.html`: page-not-found page
- `assets/projects/<id>/`: each project's screenshots (`1.jpg` to `3.jpg`) and optional `demo.mp4`
- `assets/cv/`: the CV PDF linked from the site

## Run locally

No build step. Open the folder in VS Code and use the Live Server extension, or run:

```
python3 -m http.server 8000
``` 

then open http://localhost:8000.

## Deploy

Static site on Vercel (framework preset: Other, no build command, output directory: root).
