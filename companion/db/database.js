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

const createGoalTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS goal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            goal TEXT,
            description TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            target_date DATETIME
        )
    `).run();
};

createTable();
createGoalTable();

const insertActivity = (app, title, category, url) => {
    db.prepare(`
        INSERT INTO activity_log (app, title, category, url)
        VALUES (?, ?, ?, ?)
    `).run(app, title, category, url);
};

const insertGoal = (goal, description, targetDate) => {
    db.prepare(`
        INSERT INTO goal (goal, description, target_date)
        VALUES (?, ?, ?)
    `).run(goal, description, targetDate);
}

const getActivity = () => {
    return db.prepare("SELECT * FROM activity_log").all();
};

const getGoal = () => {
    return db.prepare("SELECT * FROM goal ORDER BY id DESC LIMIT 1").get() || null;
};

module.exports = { insertActivity, getActivity, insertGoal, getGoal };