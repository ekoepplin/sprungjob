# Render CVs as HTML/CSS to PDF, not via LaTeX

AltaCV is a LaTeX class; true fidelity would mean shelling out to `pdflatex`/`xelatex` server-side. We're instead cloning AltaCV's visual design (two-column sidebar, colored section headers, skill-bar ratings, icons) in HTML/CSS and rendering to PDF with a headless browser (e.g. Puppeteer/Playwright). A LaTeX toolchain is a heavy, slow-cold-start dependency for what's fundamentally a styled document; HTML/CSS keeps the deploy simple and is easy to host anywhere Node runs.

Consequence: the generated CV is a visual clone of AltaCV, not the LaTeX class itself — it won't automatically track upstream AltaCV changes and needs to be kept in sync by hand as new CVTemplates are added.
