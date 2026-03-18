async function getActiveWindow() {
    // The activeWindow function is the default export
    const activeWindow = (await import('active-win')).default;
    const window = await activeWindow();
    console.log(window);
}

module.exports = { getActiveWindow };