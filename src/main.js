const Player = require('./player');
const Game = require('./game');
const HandCard = require('./handCard');
const AI = require('./ai');
const { winCheck,
  tenpaiCheck,
  richiCheck,
  pointCheck
} = require('./ruleCheck');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function delay(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}


const config = {
  redDora: 4
}
const game = new Game(config);
const p1 = new Player();
const p2 = new Player();
const p3 = new Player();
const p4 = new Player();
const ai0 = new AI(0, game, p1);
const ai1 = new AI(1, game, p2);
const ai2 = new AI(2, game, p3);
const ai3 = new AI(3, game, p4);

game.setPlayer([p1, p2, p3, p4]);
game.deal();

async function discard() {
  return new Promise((resolve, reject) => {
    readline.question('Discard?', tile => {
      game.discard(0, tile);
      p1.card.discard(tile);
      p1.currentState = 'wait';
      //readline.close();
      resolve();
    });
  });
}

async function main() {
  while(true) {
    console.log(game.wall.river);
    if (p1.currentState == 'discard') {
      console.log(p1.card);
      await discard();
    }

    //ai0.run();
    ai1.run();
    ai2.run();
    ai3.run();

    await delay(1000);
  }
}

if (require.main === module) {
  main();
}