function capitalize(string) {
    return string.replace(/(?:^|\s)\S/g, function (l) {
        return l.toUpperCase();
    });
}

module.exports = {
    capitalize: capitalize
};