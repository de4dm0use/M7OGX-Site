# M7OGX Radio Lab

Personal amateur-radio GitHub Pages project for **M7OGX**.

## Modules

- **Propagation** — space-weather metrics, HF band estimates and live HamQSL solar-terrestrial graphic.
- **Grey Line** — browser-side day/night terminator visualisation.
- **Repeater Explorer** — searchable Nottingham-area repeater set with DMR/FM access details.
- **APRS Explorer** — local APRS position-packet builder and copy tool.
- **Satellite Tracker** — live CelesTrak station orbital elements with browser-side SGP4 tracking.
- **OpenGD77 Lab** — MD-UV380 operating notes, DMR calculator and bindings notebook.
- **Radio Tools** — wavelength, DMR colour-code, Morse, QSO practice, PSK31/Varicode and repeater-tone utilities.
- **Logbook** — local browser QSO log with CSV export.

## Data and privacy

The site is static and GitHub Pages friendly. The logbook uses browser localStorage and is not uploaded by the site itself. The APRS builder only creates text; it does not transmit anything.
Propagation values come from the repository's generated space-weather JSON when available. The HF band scores are heuristic estimates, not a propagation prediction. The HamQSL graphic is loaded live from HamQSL.
Satellite tracking uses CelesTrak GP/TLE data and the open-source satellite.js library.

## Development

No build system is required. Edit the HTML/CSS/JS files and push to main.
The GitHub Pages deployment workflow is in .github/workflows/deploy-pages.yml.