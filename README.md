## Interactive landmark photos (October 7, 2026)

Seven photo markers are now anchored to landmarks: Senso-ji, Fushimi Inari,
Osaka Castle, Atomic Bomb Dome, Fukuoka Tower, Shurijo Castle Park, and
Sapporo Clock Tower. Zoom into Japan or visit a region to reveal nearby photos.
Click/tap a thumbnail to read its short description and see a larger picture.
Opening it pauses the flight/tour; closing leaves it paused. Use Fly or Resume
tour to continue. Escape closes the card and returns focus to the opener.

The controls panel's **Explore landmark photos** list supports keyboard access
and locations not currently visible. **View this location on the map** leaves
any active tour and centers that landmark. **Show photo markers** hides/shows
the map thumbnails. Markers on the far side of Earth, outside the viewport,
or overlapping another marker are hidden; all seven remain in the list.

Photos load from Wikimedia over the internet, independently of the Cesium token.
Network/privacy filters may block them; descriptions and source links still work.
These are dated photographs, not live imagery. Shuri's 2007 photo is explicitly
marked historical. All viewing pins remain approximate. Photo credits, license
links and capture dates appear in every card; see PHOTO_CREDITS.md.

Photo records are in photos.js; interaction/positioning is in photo-map.js.
The Pages build includes both files. Upload all updated website files to GitHub,
including these two new scripts. Existing run steps and token setup still apply.

Verification: `node verify-photos.cjs /path/to/Cesium.js` checks photo selection,
pause callback, focus return, image failure, locate action, toggle and visibility
with real Cesium 1.145 geometry plus mocked projection/DOM. `verify-japan.cjs`
checks tour pause through the photo callback and the complete 35-stop itinerary.
Both passed. Live WebGL, browser layout, touch and image loading on the deployed
site are still manual checks; they were not performed in this environment.

# Japan landmark tours — 35 locations

Click **Tour Japan · 35 landmarks** for all seven regions, or open **Explore destinations** and choose **Tour these 5 spots** on a city card.

For each region, the camera moves to a broad overview, holds for three seconds, zooms to its first landmark, then visits all five. After the fifth landmark it moves to the next region. Regional moves take seven animation seconds and landmark moves four, before playback multipliers. The reading selector gives each landmark 8, 12, or 20 seconds; reading holds do not accelerate at 2× or 5×. Choose the reading time before starting the tour.

The floating stop card shows the region, title, description, landmark number, official source, and description-check date. Use **Previous / Pause tour / Next / Close tour**. Pause allows unlimited reading and manual map inspection. Resume continues from the paused phase; a paused Next/Previous selects the next target but movement waits for Resume. Switching tabs also pauses. The existing Fly and Pause controls resume/pause the guided tour. Skip advances to the next guided view; in ordinary flight mode it retains the previous skip-to-arrival behavior.

Selecting a new flight, instant visit, reset, or globe entrance cancels the guided itinerary. Camera mode buttons can adjust a reading view, but the tour takes camera control again when its next movement begins. The last landmark stays visible when the tour ends. A guided itinerary does not simulate a real airline flight.

| Region / scope | Five landmarks |
| --- | --- |
| Tokyo Metropolis | Senso-ji; Tokyo Skytree; Imperial Palace grounds; Meiji Jingu; Shibuya Scramble Crossing |
| Kyoto Prefecture / Kyoto city | Fushimi Inari Taisha; Kiyomizu-dera; Nijo Castle; Kinkaku-ji; Arashiyama Bamboo Grove |
| Osaka Prefecture / Osaka city | Osaka Castle; Umeda Sky Building; Dotonbori; Shitenno-ji; Tsutenkaku |
| Hiroshima Prefecture | Atomic Bomb Dome; Peace Memorial Park; Hiroshima Castle grounds; Shukkeien; Itsukushima Shrine on Miyajima |
| Fukuoka Prefecture | Fukuoka Tower; Ohori Park; Fukuoka Castle ruins; Kushida Shrine; Dazaifu Tenmangu |
| Okinawa Prefecture / main island | Kokusai Street; Shurijo Castle Park; Cape Manzamo; Churaumi Aquarium; Nakijin Castle ruins |
| Hokkaido / Sapporo area | Odori Park; Clock Tower; Beer Museum; Hokkaido Shrine; Mount Moiwa viewpoint |

**Geographic care:** descriptions were checked against official tourism/attraction sources on 2026-10-07; links are stored per stop in `landmarks.js`. Coordinates are manually curated approximate viewing pins, not independently surveyed or verified entrances. No opening hours, access status, fares, or future reopening dates are asserted. Satellite images may be older than the descriptions. Terrain/buildings remain flat imagery on an ellipsoid; zooming in does not add a 3D reconstruction. Miyajima and Dazaifu are grouped by prefecture rather than mislabeled as central-city stops.

**Implementation:** `landmarks.js` stores 7 regions × 5 landmarks. `guided-tour.js` manages overview/moving/reading/paused/completed states using elapsed time; `app.js` connects the camera and UI. `scripts/build_pages.py` includes both files in deployment. Token configuration is unchanged and can be set up later.

**Verification:** six tour-specific check groups verify all 35 unique records, exact 42-view sequence (7 overviews + 35 landmarks), coordinate ranges, positive altitude, single-region scope, pause/resume, reading holds, navigation, stop and restart. The 14 app integration checks and 11 core checks also pass. These use actual Cesium geodesic math with mocked rendering/network. The visual close-up framing and live satellite imagery still require a browser check. Run `node verify-landmarks.cjs /path/to/Cesium.js` with the version 1.145 bundle from index.html. Evidence is under `evidence/landmark-*.txt`.

Manual checks to add to your test log: tour Kyoto only; pause on the first temple and wait; resume; select Next and Previous; finish its five landmarks. Start the full tour and confirm Tokyo's fifth landmark transitions to Kyoto overview. Stop during movement and confirm no later auto-advance. Test on a narrow viewport and check title/description readability.

---

# Flight Lab — Full-screen Explorer
Computer science teaching project · CesiumJS **1.145** · Reading → Japan

## Latest changes
The globe fills the browser viewport. Branding, a hideable controls panel, flight dashboard, camera/playback toolbar, and credits overlay the map. Mobile controls start collapsed. The opening camera starts at the whole Earth, then spends six seconds approaching Reading after a one-second hold. Globe entrance replays at your current location. Reduced-motion preferences skip the animation. Selecting a destination cancels the entrance.

Reference studied: https://hiroshima.archiving.jp/index_en.html (2026-10-07). Public page structure exposes place/text search and compact utility controls. Its WebGL rendering failed in the assistant browser, so its exact transition was not observed. This redesign follows the user's whole-globe entrance description and map-first direction; it does not copy the archive's imagery, testimony, or branding.

## Local launch — token entered once in a file
1. Extract the ZIP into a new folder.
2. Copy `config.local.example.json` to **config.local.json** in the same folder as index.html.
3. Replace the placeholder in the new file with a dedicated read-only Cesium ion browser token. Keep the JSON quotes.
4. Double-click **START_FLIGHT_LAB.bat**. Python 3 is required. Leave its server window open.
5. The launcher reads the local configuration and the app loads satellite imagery automatically. No token entry on the page is necessary.

`config.local.json` is ignored by Git. **Do not upload it through GitHub's web upload interface**, which does not protect files using your local .gitignore. The example and committed config.js contain no real token. You can alternatively set a local CESIUM_ION_TOKEN environment variable; it takes precedence. The launcher serves only on loopback at an available port. On macOS/Linux run `python3 launch.py`.

Do not double-click index.html: file:// origins caused blocked Cesium workers in the user's earlier test. The plain `python -m http.server` alternative serves the app but does NOT read private configuration; use launch.py for automatic local token loading.

## GitHub Pages — automatic token, not committed in repository source
This package includes a Pages workflow and a public-files-only build script. It does not change your GitHub settings automatically.

1. Copy the contents of Flight_Lab into the repository root using GitHub Desktop. Include **.github/workflows/pages.yml**, **.gitignore**, and **scripts/build_pages.py**. Do not nest everything inside an extra Flight_Lab folder. The workflow assumes your branch is `main`; change that line if needed.
2. In the repository: **Settings → Secrets and variables → Actions → New repository secret**.
3. Name it **CESIUM_ION_TOKEN** and paste your dedicated read-only browser token as its value.
4. In **Settings → Pages → Build and deployment**, set Source to **GitHub Actions**.
5. Commit/push this update. If the secret was added afterward, run **Deploy Flight Lab** from the Actions tab or push another commit.
6. Open the deployed Pages URL. Imagery connects automatically. With no secret configured, the overview map still works.

The workflow generates `_site/config.js` from the secret during deployment. The value is not committed to source or printed by the script. Only public application files are uploaded; local JSON, documentation, and test evidence are excluded from the published build.

**Security limit:** the deployed config.js and browser network requests necessarily expose the browser token. A GitHub Actions secret keeps it out of repository source/history, but DOES NOT make it secret on the live site. Use a dedicated token with only required read scopes/assets and URL restrictions for your actual Pages site. Never use an account-management or write token. If a real token was previously committed, revoke/rotate it; deleting the current line does not remove Git history. Keeping a credential completely hidden from visitors requires a server-side architecture and is not supplied by static GitHub Pages.

References checked 2026-10-07:
- https://cesium.com/learn/ion/cesium-ion-access-tokens/
- https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets

## Controls
- **Visit instantly**: relocate to a Japan city and pause. **Fly here**: travel from the current position.
- Start/end selectors: optionally relocate to the chosen start, then animate to the destination.
- Guided Japan tour: 35 landmarks across the seven areas listed above, beginning from the current map position.
- Fly resumes; Pause stops. Switching browser tabs also pauses.
- Playback 1×/2×/5× changes destination animation rate, not manual m/s speed.
- Skip to arrival finishes the current leg and cancels the remaining tour.
- Follow plane / Top-down / Entire route set camera modes. While paused you can drag the view freely.
- Cyan shows the planned leg; gold shows its completed portion. Approximate surface distance and accelerated animation time appear in the dashboard.
- Step 0.1 seconds advances manual simulation once and pauses. It is disabled during destination routes.
- Left/right change manual heading by 10 degrees. Editing speed/height cancels a destination route. Reset restores the original paused Reading-area teaching origin.
- Full screen uses the browser full-screen API; the globe already fills the viewport without it. Cesium attribution remains visible.

## Assignment pitch and limitations
I want to help computer science students understand time-based simulation updates using simulated speed, heading, and geographic coordinate data. Before sharing, I will verify the controls, movement tests, and API coordinate units.

This is a teaching simulation, not aircraft navigation. No lift, drag, collisions, 3D buildings, or real terrain is modeled. Imagery covers an ellipsoid. City coordinates are approximate references, not verified airport or landmark pins. The starter origin is not a verified Alvernia campus location. Manual movement uses a 6,371,000 m sphere; destination routes use Cesium ellipsoid geodesics. dt is capped at 0.1 seconds, so stalls can slow simulated time. Routes, flight altitudes, and travel times are illustrative. The API longitude/latitude order and ellipsoid height units were checked against https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html#fromDegrees on 2026-10-05.

## Tests and evidence
Open **tests.html** from the same running server or published site: 11 checks (7 starter + 4 single-step). Node equivalent:

```
node -e "require('./flight-core.js');require('./tests.js')"
```

Run `node break-repair.cjs` for an isolated mutation reproduction. Removing `* dt` makes duration consistency and the 7-meter step fail; restoring it gives 11 passes. Actual earlier on-disk mutation and restoration logs are under evidence/. Original unmodified baseline files remain in baseline/ for local reproduction.

`verify-japan.cjs` uses real Cesium 1.145 geography with mocked rendering/network. Run `node verify-japan.cjs /path/to/Cesium.js` after downloading the exact version in index.html. These checks do not prove WebGL rendering or authenticated imagery.

The user confirmed the earlier app worked through HTTP and on GitHub Pages. The latest full-screen layout and globe entrance have NOT been visually verified by the assistant: the reference browser lacked WebGL and the local preview was unreachable. Token setup and live deployment require the user's configuration. See Test_Log.csv and evidence/fullscreen-configuration.txt.

## Six manual checks (compare with actual Canvas page 6)
1. Launch: whole Earth transitions to Reading; marker/map/credits visible; controls can hide/show; reduced-motion setting avoids animation.
2. Fly/Pause: latitude changes at heading zero, then freezes; switching tabs pauses.
3. Reset, Left, Right twice: heading 0 → 350 → 0 → 10.
4. Speed zero stops motion; speed 999 clamps to 250; height 9000 to 5000 and -1 to 50.
5. Reset then Step: about 7 m north, remains paused; zero-speed Step stays fixed. Try cards, selected routes, skip, and playback separately.
6. Keyboard navigation, narrow viewport, and camera modes work; credits remain accessible. No unwanted camera snap while paused.

Record actual observations and screenshots in Test_Log.csv. Complete the Canvas page 4 warm-up separately; the full handout was not provided.

## Partner and submission
Partner name/date: PENDING
Feedback: PENDING
Improvement made from feedback: PENDING
Retest evidence: PENDING

Review AI_Excerpts.md and personalize Reflection.md before submission. Do not claim tests or partner feedback that were not performed. Include the project ZIP, completed test log, reflection, excerpts, and your published Pages URL. The earlier reflection is a draft and needs updating to your actual contribution and current outcomes.
