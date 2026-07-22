// tsc only emits compiled .js — copy the static renderer files alongside it.
const fs = require('node:fs');
fs.cpSync('src/renderer/popup.html', 'dist/renderer/popup.html');
fs.cpSync('src/renderer/popup.css', 'dist/renderer/popup.css');
fs.cpSync('src/renderer/recording-indicator.html', 'dist/renderer/recording-indicator.html');
fs.cpSync('src/renderer/map.css', 'dist/renderer/map.css');

// Main-process asset (the tray icon), not a renderer file, but the same
// "tsc doesn't copy static files" problem applies — dist/assets/ has no
// compilation step to create it, unlike dist/renderer/ which tsc creates
// as a side effect of compiling the renderer TS files.
fs.mkdirSync('dist/assets', { recursive: true });
fs.cpSync('assets/tray-icon.png', 'dist/assets/tray-icon.png');
