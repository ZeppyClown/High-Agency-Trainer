const { categorise } = require("./categoriser");

async function getActiveWindow() {
    // The activeWindow function is the default export
    const activeWindow = (await import('active-win')).default;
    const window = await activeWindow();
    console.log(window);
    console.log(activeWindow);
    console.log(categorise(window.owner.name, window.title));

}

module.exports = { getActiveWindow };