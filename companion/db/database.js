const Database = require("better-sqlite3");

const db = new Database("activity_log.db");

const createTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS activity_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            app TEXT,
            title TEXT,
            category TEXT,
            url TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();
};

createTable();

const insertActivity = (app, title, category, url) => {
    db.prepare(`
        INSERT INTO activity_log (app, title, category, url)
        VALUES (?, ?, ?, ?)
    `).run(app, title, category, url);
};

// insertActivity("Google Chrome", "Google", "Work");

const getActivity = () => {
    return db.prepare("SELECT * FROM activity_log").all();
};

module.exports = { insertActivity, getActivity };