interface Window {
  questbot: {
    captureScreenshot(): Promise<string[]>;
    dismiss(): Promise<void>;
  };
}
