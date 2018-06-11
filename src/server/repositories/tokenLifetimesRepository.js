const db = require('../models');
const TokenLifetime = db.token_lifetime;

function addToken(token) {
    return TokenLifetime.create(token)
        .catch(error => console.log(error));
}

function deleteToken(tokenId) {
    return TokenLifetime.destroy({
        where: {id: tokenId}
    }).catch(error => console.log(error));
}

function findAndDeleteExpiredTokens() {
    return TokenLifetime.destroy({where: {
            lifetime_end: {
                [Op.gte]: Date.now(),
            }
        }}).catch(error => console.log(error));
}

function getTokenLifetime(token) {
    return TokenLifetime.find({where: {token: token}})
        .then(token => token.get())
        .catch(error => console.log(error));
}

module.exports = {
    addToken: addToken,
    deleteToken: deleteToken,
    findAndDeleteExpiredTokens: findAndDeleteExpiredTokens,
    getTokenLifetime: getTokenLifetime
};