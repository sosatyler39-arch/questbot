// tsc only emits compiled .js — copy the static renderer files alongside it.
const fs = require('node:fs');
fs.cpSync('src/renderer/popup.html', 'dist/renderer/popup.html');
fs.cpSync('src/renderer/popup.css', 'dist/renderer/popup.css');
fs.cpSync('src/renderer/recording-indicator.html', 'dist/renderer/recording-indicator.html');
fs.cpSync('src/renderer/map.css', 'dist/renderer/map.css');
