---
name: image-to-threejs
description: Build or improve an editable Three.js scene from a reference image, with deliberate composition, responsive framing, and verified rendering.
---

# Image to Three.js

Use this skill only when the user asks for a 3D scene, Three.js implementation, or conversion of a reference image into an editable scene. Do not apply it to ordinary 2D UI work.

## Workflow

1. Inspect the reference image and identify its subject, dominant shapes, depth cues, camera angle, palette, lighting, and which details matter to recognition.
2. Inspect the existing Three.js setup, asset pipeline, canvas sizing, and interaction model before changing implementation choices.
3. Build an editable scene with Three.js primitives, imported assets, or generated bitmap textures as appropriate. Keep the scene understandable and separate geometry, materials, lighting, camera, and animation concerns.
4. Match composition before adding detail: camera framing, subject scale, silhouette, horizon, focal point, and contrast are higher priority than ornamental effects.
5. Make the canvas responsive and interactive when the request implies it. Handle resize, device pixel ratio, cleanup, and reduced-motion preferences where relevant.
6. Verify the scene in a browser at desktop and mobile sizes. Confirm the canvas is nonblank, the subject is correctly framed, assets load, animation is running when expected, and controls do not overlap the scene.

## Output

Describe any interpretation made from the reference image, keep external assets licensed or replaceable, and leave the scene easy to tune rather than baking the result into an opaque effect.
