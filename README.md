# Flight Explorer — interface upgrade

Launch with **START_FLIGHT_LAB.bat** as before. Paste your token under **Map settings & Cesium token**, or configure `config.js`. Your token is not included in this download; copy your own config value from the previous folder if needed.

New features:
- Larger map and scrollable compact sidebar, with collapsed token settings.
- Destination cards: **Visit instantly** teleports and pauses; **Fly here** flies from your current position.
- A local SVG airplane icon rotates with the simulated heading. No external model download.
- **Follow plane**, **Top-down**, and **Entire route** camera modes. While paused, camera dragging is not overridden; press a mode button to recenter.
- Dashboard with departure/destination, route progress, surface distance remaining, and accelerated-animation time remaining. This is not a real-world arrival estimate.
- Cyan planned route and gold completed route. The trail resets per leg; it is not a full-trip history.
- **1× / 2× / 5×** route playback. This affects destination routes only; manual flight keeps its m/s speed.
- **Skip to arrival** completes the current leg and stops the remaining tour, leaving you paused at the destination.
- Expand **Manual controls & CS learning** for coordinates, simulation time, dt, and explanations of the manual speed-times-dt calculation versus geodesic route interpolation.

Validation: 12 Node integration checks passed using real Cesium 1.145 geographic math and mocked rendering/network (`evidence/explorer-upgrade.txt`). The 11 core movement tests also still pass. New visual rendering, aircraft orientation, camera framing, and responsive layout need browser verification; no new browser screenshot is claimed.

Suggested manual check: launch, open settings and connect imagery, visit Kyoto instantly, fly Osaka → Tokyo at 5×, pause and drag the camera, try all three views, skip to arrival, and confirm 100% progress with 0.0 km remaining. Expand the learning panel and try a manual single step after Reset.

---

# Double-click launcher and quick routes

**Windows:** Extract the ZIP, open the Flight_Lab folder, and double-click **START_FLIGHT_LAB.bat**. It starts a local server and opens the page automatically. Python 3 must be installed (the same installation used for the earlier working command). Leave its window open while flying; close it to stop. No commands to type. Do not double-click index.html. The server listens only on your computer and chooses an available port.

**Quick visits:** Click a Japan city button to jump there immediately and pause. This cancels any active trip.

**Custom flight:** Select Starting location and Ending location, then click **Fly selected route**. Choosing a named starting city relocates you there first. “Current position” starts wherever the marker is now. Selecting the same city for both ends leaves you paused. The full Reading-to-Japan trip remains available.

Token configuration still works through the page or config.js. If your ion token has URL restrictions, allow the local launch address; its port can change each launch.

Validation: eight integration checks pass, including quick Kyoto jump, Osaka-to-Okinawa route, and identical endpoints (`evidence/quick-routes.txt`). The launcher served the page successfully over HTTP (`evidence/launcher.txt`). Windows double-click execution was not performed in this Linux environment. The user confirmed the previous version rendered successfully when served through HTTP; that is user-reported evidence, not an assistant browser test.

---

# Reading → Japan update

## Start here
Run the local server using the steps below. Paste your Cesium ion token into the page and click **Use token & load satellite map**. This actually sets `Cesium.Ion.defaultAccessToken` and requests ion World Imagery with labels. A no-token Natural Earth overview map loads first. The camera explicitly points down at the marker; **Recenter globe** restores that view.

To configure a token in a file, edit **config.js**:

```js
window.FLIGHT_CONFIG = { cesiumToken: 'PASTE_YOUR_TOKEN_HERE' };
```

Use a browser/public token with access to World Imagery. A token in this file is visible to visitors if published; keep private account-management tokens out of it. The page's token field keeps the value only in memory until reload; it is sent to Cesium to request imagery, not saved by this app. Clear token removes the ion imagery layer. Connection or permission failures appear under the token controls.

Click **Reading → Japan: full trip** for Reading → Tokyo → Kyoto → Osaka → Hiroshima → Fukuoka → Naha (Okinawa) → Sapporo. Or choose any city, including Reading, and click **Fly to destination** to travel from the current position. Each leg lasts 12, 25, or 45 simulated seconds as selected before starting that leg. These are accelerated teaching animations, not airline routes or flight schedules. Approximate city coordinates live in `places.js`; map links are supplied for student verification, not claimed as checked landmark sources.

**Pause** stops a route and **Fly** resumes it. Step is disabled during a destination route. Changing heading, speed, or height cancels the route and returns to manual flight; Reset cancels everything and restores the original starter location. The altitude arch and zoom-out during travel are illustrative. The imagery is satellite photography over an ellipsoid, not 3D terrain or photorealistic buildings.

**Validation:** the original 11 math checks still pass. Five additional integration checks use the actual Cesium 1.145 geographic calculations with mocked rendering/network; see `evidence/japan-integration.txt`. They cover startup camera calls, pause, all seven route arrivals, reset, and token wiring. They do NOT prove browser rendering or live authentication. To reproduce: download the version-pinned Cesium.js referenced in index.html, then run `node verify-japan.cjs /path/to/Cesium.js`.

Additional manual checks: confirm visible land at startup; apply a valid token and see satellite imagery; try an invalid token and check the error; run the full trip; pause/resume mid-leg; return to Reading; verify Recenter. These remain pending until run in your browser.

API references checked 2026-10-05:
- https://cesium.com/learn/cesiumjs/ref-doc/TileMapServiceImageryProvider.html (async fromUrl factory)
- https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html
- https://cesium.com/learn/cesiumjs/ref-doc/Camera.html

The original assignment notes below remain relevant except that the grid-only display has been replaced by a geographic overview/satellite map and new destination controls.

---

# Flight Lab — Step & Inspect
Patrick Petscavage · Computer Science · Path A

## Pitch
I want to help computer science students understand time-based simulation updates using simulated speed, heading, and geographic coordinate data. Before sharing, I will verify the movement tests, the controls in a WebGL-capable browser, and the coordinate API's units and argument order.

## Submission status — read first
The assistant implemented and tested the code on October 5, 2026. All 7 original Node checks passed before editing; all 11 final checks passed. The intentional break produced two failures, and restoring `* dt` fixed both. Evidence is in `evidence/`.

**Still requires student action:** complete the Canvas page 4 warm-up; run the original starter visually and record the first successful globe checkpoint; run this project's `tests.html` in a browser; perform the six manual checks below (compare them with the actual Canvas page 6); obtain real partner feedback and make one resulting improvement; review the reflection and AI decisions in your own words. The handout pages were not supplied. No student or partner observations are invented. Publishing was not performed and is optional under the supplied instructions.

## Exact run steps (Windows)
1. Download and right-click the ZIP → Extract All. Do not run files inside the ZIP.
2. Open the extracted `Flight_Lab` folder containing `index.html`, `app.js`, and this README.
3. With Python 3 installed, click File Explorer's address bar, type `cmd`, and press Enter.
4. Run `py -m http.server 8000`. Keep that window open. If your Python command is `python`, use `python -m http.server 8000` instead.
5. Open **http://localhost:8000/index.html** in a current browser with WebGL enabled and internet access.
6. Open **http://localhost:8000/tests.html**. Expect **11 PASS lines and no FAIL lines** (7 starter checks + 4 feature checks). Take a screenshot and update `Test_Log.csv`.
7. Stop the server with Ctrl+C when finished.

On macOS/Linux, open a terminal in this folder and run `python3 -m http.server 8000`; use the same URLs. If port 8000 is occupied, replace it with 8002 in both command and URLs. If Python is unavailable, use your editor's local HTTP server and its shown URL. No build step or npm install is needed to run the app. Do not just double-click the HTML file.

**Dependency:** CesiumJS **1.145**, including matching Widgets CSS, loaded from the version-pinned Cesium CDN in `index.html`. Internet and WebGL are required. No token is needed for the overview map; optional ion imagery requires your token and account access. Keep Cesium credits visible. If the globe fails, check the on-page error, browser console, network access, and hardware acceleration; report the limitation honestly to your instructor. Math tests do not require Cesium or WebGL.

## Original baseline
Use the unmodified files under `baseline/` to reproduce the original starter: with the same server running, open **http://localhost:8000/baseline/index.html**, then **http://localhost:8000/baseline/tests.html** (7 checks).

Recorded checkpoint: the original 7 checks passed in Node on October 5, 2026 (`evidence/baseline-node.txt`). This is a math checkpoint, not a successful globe demonstration. Student's first successful original globe checkpoint: **PENDING — add date/time, browser, visible paused marker/readout, and screenshot filename here.**

## Feature and controls
**Step 0.1 seconds** advances the marker exactly one 0.1-second simulated update and leaves it paused, even if it was flying. At 70 m/s this means a 7 m surface displacement on the model sphere. Inspect the latitude readout before and after clicking. This is useful for debugging loops, units, and state transitions without chasing an animated marker.

Fly starts continuous motion; Pause stops it. Left/Right change heading by 10°. Speed clamps to 0–250 m/s and height to 50–5000 m above the ellipsoid. Height changes instantly. Reset restores the original paused state. Switching tabs pauses motion; press Fly after returning. The camera follows while flying.

Implementation: `flight-core.js` adds `singleStep`, which delegates to the original `step` and returns a paused copy. `app.js` connects the button to the state, readout, and camera. `index.html` explains the feature and its CS audience. `tests.js` retains all seven original checks and adds four checks for step distance, pausing, zero speed, and input preservation.

## Six manual checks — provisional until compared with Canvas page 6
These are a runnable plan, **not recorded passes**. Record real outcomes, screenshots, date, and tester in `Test_Log.csv`.

| ID | Steps | Expected result |
| --- | --- | --- |
| M1 | Reload index.html; inspect globe, credits, and numeric readout. | Gold marker and geographic overview map load; paused, heading 0°, speed 70, height 500, lon -75.93, lat 40.33. |
| M2 | Fly at default heading; wait 2 seconds; Pause; watch for 2 more seconds. | Latitude rises while flying; coordinates stay unchanged while paused. Camera follows movement. |
| M3 | Reset; Left once; Right twice. | Heading changes 0 → 350 → 0 → 10, with camera updating. |
| M4 | Set speed to 0 and Fly; then set speed to 999 and height to 9000; commit each field with Tab. Try height -1. | Zero speed gives no displacement; inputs clamp to 250, 5000, and 50. Height changes instantly. |
| M5 | Reset; Step once; wait; Fly then Step; set speed 0 and Step; Reset. | One default step changes latitude about +0.000063° (7 m); remains paused. Step during flight pauses. At zero speed position stays fixed. Reset restores M1 values. |
| M6 | Fly; switch to another tab for 2 seconds; return; then use Tab/Enter to focus and activate Step. | Tab switch pauses; no large return jump; Step is keyboard reachable and advances once while remaining paused. |

## Automated tests and break-and-repair
Optional Node command, from this folder:

```sh
node -e "require('./flight-core.js');require('./tests.js')"
```

Run `node break-repair.cjs` for a reproducible mutation experiment in an isolated in-memory context. It uses the real source and real tests, changes `state.speed * dt` to `state.speed`, prints failures, then reruns the unmodified source. It does not leave your app broken.

The actual authoring experiment also temporarily changed `flight-core.js` on disk, ran the checks, restored the saved file, and reran the checks. See `evidence/broken-node.txt` and `evidence/repaired-node.txt`. Without `dt`, 10 updates move 700 m at 70 m/s while one update moves 70 m, regardless of elapsed time. A 0.1-second single step incorrectly moves 70 m instead of 7 m. That makes movement depend on update count. Restoration gives all 11 passes.

For a visual student demonstration, temporarily remove `* dt`, refresh `tests.html`, capture the two FAIL lines, then immediately restore it and refresh again. Record only what you actually observe.

## Partner reproduction — pending
Give a partner only this ZIP and README. Ask them to extract it, start the server, open both pages, and try Step.

- Partner name and date: **PENDING**
- What they followed / what happened: **PENDING**
- Their specific suggestion: **PENDING**
- One improvement made because of their feedback: **PENDING**
- Retest and evidence: **PENDING**

## Geographic/API care and limitations
The starter origin (-75.93, 40.33) is an approximate Reading-area teaching reference, not a verified Alvernia campus pin. No real route, aircraft feed, terrain, or navigational accuracy is claimed. Coordinates and motion are simulated; grid lines are not roads.

The assistant checked the official Cesium `Cartesian3.fromDegrees` documentation on **2026-10-05**: arguments are longitude then latitude in degrees, with height in meters above the ellipsoid. The app passes `state.lon, state.lat, state.height` in that order. Source: https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html#fromDegrees . This checks an API claim; it does not verify the campus location or prove browser rendering. Online docs may track a newer release; the application pins 1.145.

The model uses a sphere with radius 6,371,000 m while Cesium displays an ellipsoid. It has no lift, drag, banking, collision, terrain clearance, or actual aircraft physics. Frame time is capped at 0.1 s, so stalls can slow simulated time. The button advances simulated time, not real time. A passing math suite does not prove rendering, keyboard behavior, CDN availability, or camera behavior.

## Files to review before submitting
- `Test_Log.csv`: measured automated outcomes and clearly pending browser/manual checks.
- `AI_Excerpts.md`: genuine excerpts from this interaction, with proposed decisions for student review.
- `Reflection.md`: 150–250 word draft that distinguishes AI work from unfinished student work.
- `evidence/`: raw baseline, broken, and repaired outputs.
- `baseline/`: unmodified original starter for the required baseline demonstration.

The starter is retained as the foundation. CesiumJS is an external dependency with its own license and notices and is not bundled in this ZIP.
