const { categorise } = require("./categoriser");
const { insertActivity } = require("../db/database");

async function getActiveWindow() {
    try {
        const activeWindow = (await import('active-win')).default;
        const window = await activeWindow();
        if (!window) return; // No focused window (e.g. desktop is active)
        insertActivity(window.owner.name, window.title, categorise(window.owner.name, window.title), window.url);
    } catch (err) {
        console.error('Failed to get active window:', err.message);
    }
}

module.exports = { getActiveWindow };