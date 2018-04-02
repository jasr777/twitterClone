

module.exports = {
    getRandomID : getRandomID
}
function getRandomID() {
    return Math.random().toString(36).substring(7);
}
