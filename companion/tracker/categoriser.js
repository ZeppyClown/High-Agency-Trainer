function categorise(appName, windowTitle) {
    if (appName === "Arc") {
        if (windowTitle.includes("YouTube")) {
            return "distraction";
        }
        if (windowTitle.includes("LeetCode")) {
            return "leetcode";
        }
        if (windowTitle.includes("Twitter")) {
            return "distraction";
        }
        if (windowTitle.includes("Instagram")) {
            return "distraction";
        }
        if (windowTitle.includes("Facebook")) {
            return "distraction";
        }
        if (windowTitle.includes("Reddit")) {
            return "distraction";
        }
        if (windowTitle.includes("TikTok")) {
            return "distraction";
        }
        return "coding";
    }
    if (appName === "VS Code") {
        return "coding";
    }
    if (appName === "Antigravity") {
        return "coding";
    }
    if (appName === "Telegram") {
        return "distraction";
    }
    if (appName === "Spotify") {
        return "distraction";
    }
    if (appName === "Discord") {
        return "distraction";
    }
    return "distraction";
}

module.exports = { categorise };
