const def = require('./utils.js');

class CardStack{
    constructor(redNum = 0) {
        this.wall = []
        for (let i = 0; i < 136; ++i){
            this.wall[i] = def.arr[Math.floor(i / 4)];
        }
        if (redNum >= 3) {
            this.wall[4 * 4] = 'p5r';
            this.wall[4 * (4 + 9)] = 'w5r';
            this.wall[4 * (4 + 18)] = 's5r';
        }
        if (redNum === 4) {
            this.wall[4 * 4 + 1] = 'p5r';
        }
        
        //  sute hai
        this.river = [[], [], [], []];
    }

    rinShan = 135;
    haiTei = 121;
    firstTile = 52;
    
    reset() {
        for (let i = 0; i < 136; ++i){
            this.wall[i] = def.arr[Math.floor(i / 4)];
        }
        if (redNum >= 3) {
            this.wall[4 * 4] = 'p5r';
            this.wall[4 * (4 + 9)] = 'w5r';
            this.wall[4 * (4 + 18)] = 's5r';
        }
        if (redNum === 4) {
            this.wall[4 * 4 + 1] = 'p5r';
        }

        for (let i = 0; i < 4; ++i){
            this.river[0].length = 0;
        }
    }

    shuffle() {
        for (let i = 0; i < 136; ++i) {
            let rand = Math.random();
            rand *= 136;
            rand = Math.floor(rand);
            let tmp = this.wall[i];
            this.wall[i] = this.wall[rand];
            this.wall[rand] = tmp;
        }
    }

    /**
     * 
     * @param {[function]} rule
     */
    specialShuffle(rule){
        
    }

    /**
     * 
     * @param {number} player 
     * @param {string} tile 
     */
    discardToRiver(player, tile) {
        this.river[player].push(tile);
    }

    /**
     * @returns {[[], [], [], []]}
     */
    deal() {
        this.firstTile = 52;
        return [this.wall.slice(0, 13), this.wall.slice(13, 26), this.wall.slice(26, 39), this.wall.slice(39, 52)];
    }

    /**
     * @returns {string} if draw failed, return undefined
     */
    draw() {
        if (this.firstTile <= this.haiTei) {
            ++this.firstTile;
            return this.wall[this.firstTile - 1]
        } else {
            return undefined;
        }
    }

    /**
     * @returns {string} if draw failed, return undefined
     */
    drawFromBack() {
        if (this.rinShan >= 132) {
            --this.rinShan;
            --this.haiTei;
            return this.wall[this.rinShan + 1];
        } else {
            return undefined;
        }
    }

    /**
     * @returns {[indicate, dora]}
     */
    getDora() {
        var indicate = [];
        var dora = [];
        var i = 135;
        var p = 131;
        while (this.rinShan <= i) {
            var d = def.dict[this.wall[p].slice(0, 2)] + 1;
            indicate.push(def.arr[d - 1]);
            switch (d) {
                case 34:
                    d = 31;
                    break;
                case 31:
                    d = 27;
                    break;
                case 27:
                    d = 18;
                    break;
                case 18:
                    d = 9;
                    break;
                case 9:
                    d = 0;
                    break;
            }
            dora.push(def.arr[d]);
            --i;
            p -=2;
        }

        return [indicate, dora];
    }

    /**
     * @returns {[indicate, dora]}
     */
    getUraDora() {
        var indicate = [];
        var dora = [];
        var i = 135;
        var p = 130;
        while (this.rinShan <= i) {
            var d = def.dict[this.wall[p].slice(0, 2)] + 1;
            indicate.push(def.arr[d - 1]);
            switch (d) {
                case 34:
                    d = 31;
                    break;
                case 31:
                    d = 27;
                    break;
                case 27:
                    d = 18;
                    break;
                case 18:
                    d = 9;
                    break;
                case 9:
                    d = 0;
                    break;
            }
            dora.push(def.arr[d]);
            --i;
            p -=2;
        }

        return [indicate, dora];
    }
}


function test() {
    var c = new CardStack(3);
    c.shuffle();

    console.log(c.deal());
    console.log(c.wall.slice(52, 56));
    console.log(c.draw());
    console.log(c.draw());
    console.log(c.wall.slice(132, 136));
    console.log(c.drawFromBack());
    console.log(c.drawFromBack());
    console.log(c.drawFromBack());
    console.log(c.drawFromBack());
    console.log(c.drawFromBack());

    console.log(c.getDora());

    c.discardToRiver(0, 'p5r');
    console.log(c.river);
}


if (require.main === module) {
    test();
}


module.exports = CardStack;

