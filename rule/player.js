const HandCard = require('./handCard');


class Player {
    constructor() {
        this.card = new HandCard();
    }

    canWin(tile) {
        
    }

    canKan(tile) {

    }

    canPon(tile) {

    }

    canChi(tile) {

    }

    /**
     * 
     * @param {string} action what kind of action
     */
    sendRequest(action) {
        switch(action) {
            case 'kan':
                break;
            case 'pon':
                break;
            case 'chi':
                break;
        }
    }
}

function test() {
    var pl = new Player();
}


if (require.main === module) {
    test();
}


module.exports = Player;