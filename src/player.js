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
    this.currentState = 'wait';
  }

  canWin(tile) {

    return false;
  }

  canKan(tile) {

    return false;
  }

  canPon(tile) {

    return false;
  }

  canChi(tile) {

    return false;
  }

  /**
     * 
     * @param {string} action what kind of action
     */
  sendRequest(action) {
    switch(action) {
    case 'kan':
      this.currentState = 'kan';
      break;
    case 'pon':
      this.currentState = 'pon';
      break;
    case 'chi':
      this.currentState = 'chi';
      break;
    case 'discard':
      this.currentState = 'discard';
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