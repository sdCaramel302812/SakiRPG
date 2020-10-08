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
        this.on('ponOrKan', (plID, tile, doing) => {
            this.ponOrKan(plID, tile, doing);
        });
        this.on('chi', (plID, tile, doing) => {
            this.chi(plID, tile, doing);
        });
        this.on('win', (plID, tile, doing) => {
            this.win(plID, tile, doing);
        });

        this.config = config;
        this.wall = new CardStack(config.redDora);

        this.state = 'discard';
        this.gameInfo = {
            chanfon : 'east',
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
        for (let i = 0; i < 4; ++i) {
            
        }
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

    /**
     * 
     * @param {number} plID
     * @param {number} stage 
     */
    actionAfterDiscard(plID, tile, stage) {
        var waitForWinAciton = false;
        var waitForPonAction = false;
        if (stage <= 0) {
            // check if someone can win
            for (let i = 0; i < 4; ++i) {
                if (i != plID) {
                    if (this.playerList[i].canWin(tile)) {
                        this.playerList[i].sendRequest('win');
                        waitForWinAciton = true;
                    }
                }
            }
            if (waitForWinAciton) {
                return;
            }
        }
        
        if (stage <= 1) {
            // check if someone can pon
            for (let i = 0; i < 4; ++i) {
                if (i != plID) {
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
            if (waitForPonAction) {
                return;
            }
        }
        
        if (stage <= 2) {
            // if nobody can pon, then check if next player can chi
            if (this.playerList[this.findNextPlayer(1)].canChi(tile)) {
                this.playerList[this.findNextPlayer(1)].sendRequest('chi');
                return;
            }
        }

        if (this.gameInfo.remainTile == 0) {
            this.run('flow');
            return;
        }
        this.nextPlayer();
        this.run('draw');
    }

    discard(plID, tile) {
        if (plID != this.gameInfo.currentPlayer) {
            return;
        }
        this.wall.discardToRiver(plID, tile);

        this.actionAfterDiscard(plID, tile, 0);
    }

    win(plID, doing) {
        if (doing == 'no') {
            this.actionAfterDiscard(plID, tile, 1);
        } else {

        }
    }

    ponOrKan(plID, doing) {
        if (doing == 'no') {
            this.actionAfterDiscard(plID, doing, 2);
        } else {
            this.gameInfo.currentPlayer = plID;
        }
    }

    chi(plID, doing) {
        if (doing == 'no') {
            this.actionAfterDiscard(plID, doing, 3);
        } else {
            this.gameInfo.currentPlayer = plID;
        }
    }


    /**
     * 
     * @param {string} state  what to do
     */
    run(state, plID) {
        switch(state) {
            case 'deal':
                this.deal();
                break;
            case 'draw':
                this.playerList[this.gameInfo.currentPlayer].card.draw(this.wall.draw());
                --this.gameInfo.remainTile;
                this.playerList[this.gameInfo.currentPlayer].sendRequest('discard');
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
