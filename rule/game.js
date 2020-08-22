const events = require('events');
const CardStack = require('./cardStack.js');
const Player = require('./player.js');

class Game extends events.EventEmitter{
    /**
     * 
     * @param {object} config 
     * @param {number} config.redDora
     */
    constructor(config) {
        super();
        //   set listener to wait player action
        this.on('discard', (plID, tile) => {
            this.discard(plID, tile);
        });
        this.on('ponOrKan', (plID, doing) => {
            this.ponOrKan(plID, doing);
        });
        this.on('chi', (plID, doing) => {
            this.chi(plID, doing);
        });
        this.on('win', (plID) => {

        });

        this.config = config;
        this.wall = new CardStack(config.redDora);

        this.state = 'discard';
        this.gameInfo = {
            fieldWind : 'east',
            kyouku : 0,
            honba : 0,
            kyoutaku : 0,       //  richi bo
            oya : 0,
            firstOya : 0,
            currentPlayer: 0,
            remainTile : 70
        }
    }

    /**
     * 
     * @param {[Player]} playerList 
     */
    setPlayer(playerList) {
        this.playerList = playerList;
    }

    newKyouku() {

    }

    nextPlayer() {
        ++this.gameInfo.currentPlayer;
        if (this.gameInfo.currentPlayer == 4) {
            this.gameInfo.currentPlayer = 0;
        }
    }

    findNextPlayer(i) {
        var num = i + this.gameInfo.currentPlayer;
        return num % 4;
    }

    /**
     * 
     * @param {[function]} rule 
     */
    deal(rule) {
        if (rule == undefined) {
            this.wall.shuffle();
        } else {
            this.wall.specialShuffle(rule);
        }
        let cardList = this.wall.deal();
        for (let i = 0; i < 4; ++i){
            this.playerList[i].card.deal(cardList[i]);
        }
    }

    discard(plID, tile) {
        if (plID != this.gameInfo.currentPlayer) {
            return;
        }
        this.wall.discardToRiver(plID, tile);

        var waitForWinAciton = false;
        var waitForPonAction = false;
        var waitForChiAction = false;
        // check if someone can win
        for (let i = 0; i < 4; ++i) {
            if (i != plID) {
                if (this.playerList[i].canWin(tile)) {
                    this.playerList[i].sendRequest('win');
                    waitForWinAciton = true;
                }
            }
        }
        // check if someone can pon
        for (let i = 0; i < 4; ++i) {
            if (! waitForWinAciton && i != plID) {
                if (this.playerList[i].canKan(tile)) {
                    this.playerList[i].sendRequest('kan');
                    waitForPonAction = true;
                }
                if (this.playerList[i].canKan(tile)) {
                    this.playerList[i].sendRequest('pon');
                    waitForPonAction = true;
                }
            }
        }
        // if nobody can pon, then check if next player can chi
        if (!waitForPonAction) {
            if (this.playerList[this.findNextPlayer(1)].canChi(tile)) {
                this.playerList[this.findNextPlayer(1)].sendRequest('chi');
                waitForChiAction = true;
            }
        }

        if (!waitForChiAction) {
            if (this.gameInfo.remainTile == 0) {
                this.run('flow');
                return;
            }
            this.nextPlayer();
            this.run('draw', this.gameInfo.currentPlayer);
        }
    }
    ponOrKan(plID, doing) {
        if (doing == 'no') {
            //  if someone don't want to pon, then check if next player can chi
            if (this.playerList[this.findNextPlayer(1)].canChi(tile)) {
                this.playerList[this.findNextPlayer(1)].sendRequest('chi');
            }
        } else {

        }
    }
    chi(plID, doing) {

    }


    /**
     * 
     * @param {string} state  what to do
     */
    run(state, plID) {
        switch(state) {
            case 'deal':
                break;
            case 'draw':
                this.playerList[this.gameInfo.currentPlayer].card.draw(this.wall.draw());
                --this.gameInfo.remainTile;
                this.playerList[this.gameInfo.currentPlayer].sendRequest('discard');
                break;
            case 'kan':
                break;
            case 'pon':
                break;
            case 'chi':
                break;
            case 'flow':        //  流局
                break;
            case 'end-message':
                break;
        }
    }
}



function test() {
    var config = {
        redDora: 4
    }
    var g = new Game(config);
    var p1 = new Player();
    var p2 = new Player();
    var p3 = new Player();
    var p4 = new Player();

    g.setPlayer([p1, p2, p3, p4]);
    g.deal();
    console.log(g.playerList[0].card);

}

if (require.main === module) {
    test();

}
