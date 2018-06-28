const db = require('../models');
const TokenLifetime = db.token_lifetime;
const Sequelize = require('sequelize');
const op = Sequelize.Op;

function addToken(token) {
    return TokenLifetime.create(token);
}

function deleteToken(tokenId) {
    return TokenLifetime.destroy({
        where: {id: tokenId}
    });
}

function findAndDeleteExpiredTokens() {
    return TokenLifetime.destroy({
        where: {
            lifetime_end: {
                [op.lte]: Date.now(),
            }
        }
    });
}

function getTokenLifetime(token) {
    return TokenLifetime.find({where: {token: token}})
        .then(token => token.get());
}

function updateToken(token) {
    return TokenLifetime.update(token, {where: {id: token.id}});
}

module.exports = {
    addToken: addToken,
    deleteToken: deleteToken,
    findAndDeleteExpiredTokens: findAndDeleteExpiredTokens,
    getTokenLifetime: getTokenLifetime,
    updateToken: updateToken
};