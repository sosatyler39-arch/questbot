import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('questbot', {
  captureScreenshot: (): Promise<string[]> => ipcRenderer.invoke('capture-screenshot'),
  dismiss: (): Promise<void> => ipcRenderer.invoke('dismiss-popup'),
});
