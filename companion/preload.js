const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveGoal: (goal, descriptionOfGoal, targetDate) => ipcRenderer.invoke('save-goal', goal, descriptionOfGoal, targetDate),
    getGoal: () => ipcRenderer.invoke('get-goal'),
});
