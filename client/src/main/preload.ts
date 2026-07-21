import { contextBridge, ipcRenderer } from 'electron';
import type { QuestbotSettings, HotkeyAction } from './settings-store.js';

contextBridge.exposeInMainWorld('questbot', {
  captureScreenshot: (): Promise<string[]> => ipcRenderer.invoke('capture-screenshot'),
  dismiss: (): Promise<void> => ipcRenderer.invoke('dismiss-popup'),
  getSettings: (): Promise<QuestbotSettings> => ipcRenderer.invoke('get-settings'),
  getAppVersion: (): Promise<string> => ipcRenderer.invoke('get-app-version'),
  setHotkey: (action: HotkeyAction, accelerator: string): Promise<{ ok: boolean; reason?: string }> =>
    ipcRenderer.invoke('set-hotkey', action, accelerator),
  setBufferMinutes: (minutes: number): Promise<QuestbotSettings> => ipcRenderer.invoke('set-buffer-minutes', minutes),
  setAutoDismissSeconds: (seconds: number): Promise<QuestbotSettings> => ipcRenderer.invoke('set-auto-dismiss-seconds', seconds),
  toggleContinuousMemory: (): Promise<boolean> => ipcRenderer.invoke('toggle-continuous-memory'),
  getContinuousMemoryState: (): Promise<boolean> => ipcRenderer.invoke('get-continuous-memory-state'),
  grantContinuousMemoryConsent: (): Promise<QuestbotSettings> => ipcRenderer.invoke('grant-continuous-memory-consent'),
  setOnboardingSeen: (): Promise<QuestbotSettings> => ipcRenderer.invoke('set-onboarding-seen'),
  signIn: (): Promise<boolean> => ipcRenderer.invoke('sign-in'),
  signOut: (): Promise<void> => ipcRenderer.invoke('sign-out'),
  getAuthToken: (): Promise<string | undefined> => ipcRenderer.invoke('get-auth-token'),
  startUpgrade: (): Promise<boolean> => ipcRenderer.invoke('start-upgrade'),
});
