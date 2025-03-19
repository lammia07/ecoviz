import { BrowserWindow, dialog } from 'electron';

export async function save(maindWindow: BrowserWindow): Promise<SaveResult> {
  console.log('save called');

  const val = await dialog.showOpenDialog(maindWindow);

  if (val.canceled) return [];

  return val.filePaths;
}
