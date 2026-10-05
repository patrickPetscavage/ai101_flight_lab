# Reflection draft — review and personalize before submitting

For this assignment, I selected the Flight Lab path and provided the starter and requirements to AI. The project is aimed at computer science students who are learning how simulation loops update an object's state. The added feature is a “Step 0.1 seconds” button. It moves the marker once and pauses, which makes the connection between speed, elapsed time, and position easier to inspect.

AI wrote the feature and the additional tests. My contribution so far was supplying the assignment and choosing the Flight Lab path; I still need to review the implementation and demonstrate it myself. The feature reuses the existing movement function instead of introducing a separate formula. During the recorded break-and-repair exercise, AI removed `* dt`. The duration-consistency test and the seven-meter step test failed. Restoring the multiplier brought all eleven checks back to passing. This shows why speed must be multiplied by elapsed time instead of applied once per frame.

One limitation is that this is simulated movement, not realistic flight physics. The official Cesium documentation was checked for coordinate order and units, but that does not verify the origin as a campus location. Browser rendering, manual checks, and partner feedback remain unfinished. I will record those results honestly before submitting.
