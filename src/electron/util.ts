import { ipcMain, WebContents, WebFrameMain } from 'electron';
import { pathToFileURL } from 'url';
import { getUIPath } from './pathResolver.js';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// Wrapper method for type save ipcMain handle method
export function ipcMainHandle<T extends keyof EventPayloadMapping>(
  key: T,
  handler: () => Promise<EventPayloadMapping[T]>
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

// Wrapper method for type save WebContents send method
export function ipcWebContentsSend<T extends keyof EventPayloadMapping>(
  key: T,
  webContents: WebContents,
  payload: EventPayloadMapping[T]
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain | null) {
  if (frame === null) {
    throw new Error('Malicious event');
  }

  if (isDev() && new URL(frame.url).host === 'localhost:5123') {
    return;
  }

  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('Malicious event');
  }
}
