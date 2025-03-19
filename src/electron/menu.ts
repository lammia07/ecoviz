import { app, BrowserWindow, Menu } from 'electron';
import { ipcWebContentsSend, isDev } from './util.js';

export function createMenu(maindWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === 'darwin' ? undefined : 'File', // first menu item will always have application name on mac
        type: 'submenu',
        submenu: [
          {
            label: 'Save',
            click: app.quit,
          },
          {
            label: 'DevTools',
            click: () => maindWindow.webContents.openDevTools(),
            visible: isDev(),
          },
        ],
      },
      // {
      //   label: 'View',
      //   type: 'submenu',
      //   submenu: [
      //     {
      //       label: 'CPU',
      //       click: () =>
      //         ipcWebContentsSend('changeView', maindWindow.webContents, 'CPU'),
      //     },
      //     {
      //       label: 'RAM',
      //       click: () =>
      //         ipcWebContentsSend('changeView', maindWindow.webContents, 'RAM'),
      //     },
      //     {
      //       label: 'STORAGE',
      //       click: () =>
      //         ipcWebContentsSend(
      //           'changeView',
      //           maindWindow.webContents,
      //           'STORAGE'
      //         ),
      //     },
      // ],
      // },
    ])
  );
}
