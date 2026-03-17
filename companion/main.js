const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Load the index.html from the renderer directory
    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 1) createWindow();
    });

    tray = new Tray(nativeImage.createEmpty());
    tray.setTitle('Companion');
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open', click: () => { if (mainWindow) mainWindow.show(); } },
        { label: 'Quit', click: () => app.quit() }
    ]);
    app.dock.hide();
    tray.setContextMenu(contextMenu);

    mainWindow.on('blur', () => {
        mainWindow.hide();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});