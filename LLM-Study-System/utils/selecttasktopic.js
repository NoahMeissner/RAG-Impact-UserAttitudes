export function selectTask(obj) {
    // Without removing this part of the obj it cant generate the right topic :F
    delete obj.evalGrade;
    let topics = Object.keys(obj).filter(key => obj[key] >= -1 && obj[key] <= 1);
    // If there are no mild topics, check for -2 or 2
    if (topics.length === 0) {
        topics = Object.keys(obj).filter(key => obj[key] === -2 || obj[key] === 2);
        if (topics.length === 0) {
            // If there are no mild, -2, or 2 topics, check for -3 or 3
            topics = Object.keys(obj).filter(key => obj[key] === -3 || obj[key] === 3);
        }
    }

    // If there's only one topic in the category
    if (topics === 1) {
        return topics[0];
    }

    // If there are multiple topics, choose a random one
    const randomIndex = Math.floor(Math.random() * topics.length);
    return topics[randomIndex];
}

