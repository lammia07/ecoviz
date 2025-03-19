import electron from 'electron';

// add functionality into window object of front end application
electron.contextBridge.exposeInMainWorld('electron', {
  save: () => ipcInvoce('save'),
} satisfies Window['electron']);

// Wrapper methods for type-save invoke and on methods of ipcRenderer

function ipcInvoce<T extends keyof EventPayloadMapping>(
  key: T
): Promise<EventPayloadMapping[T]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<T extends keyof EventPayloadMapping>(
  key: T,
  callback: (payload: EventPayloadMapping[T]) => void
): UnsubscribeFunction {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
