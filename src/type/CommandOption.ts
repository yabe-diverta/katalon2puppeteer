export interface CommandOption {
  input: string;
  basicAuth: string[];
  capture: boolean;
  captureDir?: string;
  delay: number;
  headless: boolean;
  viewportWidth: 1920;
  viewportHeight: 1080;
}
