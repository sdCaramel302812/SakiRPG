const HandCard = require('./handCard');
const { winCheck,
        tenpaiCheck,
        richiCheck,
        pointCheck
    } = require('./ruleCheck');


class Player {
    constructor(rule) {
        this.card = new HandCard();
        this.rule = rule;
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