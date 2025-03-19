import { app, BrowserWindow, ipcMain } from 'electron';
import { ipcMainHandle, isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { save } from './save.js';

// Remove menu from application
// Menu.setApplicationMenu(null);

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  ipcMainHandle('save', () => save(mainWindow));

  handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on('close', (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  });
}
