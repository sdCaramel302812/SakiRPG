const Player = require('./player');
const Game = require('./game');
const HandCard = require('./handCard');


class AI {
  /**
     * 
     * @param {object} game 
     * @param {object} player 
     */
  constructor(pid, game, player) {
    this.pid = pid;
    this.game = game;
    this.pl = player;
  }

  discard() {
    let tile = this.pl.card.card[0];
    this.pl.card.discard(tile);
    this.game.discard(this.pid, tile);
    this.pl.currentState = 'wait';
  }

  run() {
    switch(this.pl.currentState) {
    case 'wait':
      break;
    case 'discard':
      this.discard();
      break;
    }
  }
}

module.exports = AI;