

class HandCard{
    constructor() {

    }

    card = [];
    chiCard = [];
    // t1, t2, t3, dir (self, left, front, right)
    ponCard = [];
    kanCard = [];
    newTile = '';

    reset() {

    }

    deal(card) {
        this.card = card;
        this.card.sort();
    }

    draw(tile) {
        this.newTile = tile;
        this.card.push(tile);
        this.card.sort();
    }

    discard(tile) {
        for (let i = 0; i < this.card.length; ++i) {
            if (this.card[i] === tile) {
                this.card.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * 
     * @param {string} t1 the eaten tile
     * @param {string} t2 
     * @param {string} t3 
     * @returns {boolean}
     */
    chi(t1, t2, t3) {
        if (t2 === t3) {
            return false;
        }
        var index1 = -1;
        var index2 = -1;
        for (let i = 0; i < this.card.length; ++i) {
            if (t2[0] === this.card[i][0] && t2[1] === this.card[i][1]) {
                index1 = i;
            }
            if (t3[0] === this.card[i][0] && t3[1] === this.card[i][1]) {
                index2 = i;
            }
        }
        if (index1 === -1 || index2 === -1) {
            return false;
        }

        // delete
        this.card.splice(index1, 1);
        this.card.splice(index2 - 1, 1);
        this.chiCard.push([t1, t2, t3]);

        return true;
    }

    /**
     * 
     * @param {string} tile 
     * @param {string} dir 1 : left, 2 : front, 3 : right
     * @returns {boolean}
     */
    pon(tile, dir) {
        for (let i = 0; i < this.card.length - 1; ++i) {
            if (tile[0] === this.card[i][0] && tile[1] === this.card[i][1]) {
                if (tile[0] === this.card[i + 1][0] && tile[1] === this.card[i + 1][1]) {
                    switch (dir) {
                        case 'left':
                            this.ponCard.push([tile, this.card[i], this.card[i + 1], dir]);
                            break;
                        case 'front':
                            this.ponCard.push([this.card[i], tile, this.card[i + 1], dir]);
                            break;
                        case 'right':
                            this.ponCard.push([this.card[i], this.card[i + 1], tile, dir]);
                            break;
                    }
                    this.card.splice(i, 2);
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * 
     * @param {string} tile 
     * @param {number} dir 1 : left, 2 : front, 3 : right
     * @returns {boolean}
     */
    minKan(tile, dir) {
        for (let i = 0; i < this.card.length - 2; ++i) {
            if (tile[0] === this.card[i][0] && tile[1] === this.card[i][1]) {
                if (tile[0] === this.card[i + 1][0] && tile[1] === this.card[i + 1][1] && tile[0] === this.card[i + 2][0] && tile[1] === this.card[i + 2][1]) {
                    switch (dir) {
                        case 'left':
                            this.kanCard.push([tile, this.card[i], this.card[i + 1], this.card[i + 2], dir]);
                            break;
                        case 'front':
                            this.kanCard.push([this.card[i], tile, this.card[i + 1], this.card[i + 1] ,dir]);
                            break;
                        case 'right':
                            this.kanCard.push([this.card[i], this.card[i + 1], this.card[i + 1], tile, dir]);
                            break;
                    }
                    this.card.splice(i, 3);
                    return true;
                }
            }
        }

        return false;
    }

    anKan(tile) {
        for (let i = 0; i < this.card.length - 3; ++i) {
            if (tile[0] === this.card[i][0] && tile[1] === this.card[i][1]) {
                if (tile[0] === this.card[i + 1][0] && tile[1] === this.card[i + 1][1] && tile[0] === this.card[i + 2][0] && tile[1] === this.card[i + 2][1] && tile[0] === this.card[i + 3][0] && tile[1] === this.card[i + 3][1]) {
                    this.kanCard.push([tile, this.card[i], this.card[i + 1], this.card[i + 2], 'self']);
                    this.card.splice(i, 4);
                    return true;
                }
            }
        }

        return false;
    }

    kaKan(tile) {
        for (let i = 0; i < this.ponCard.length; ++i) {
            if (tile[0] === this.ponCard[i][0][0] && tile[1] === this.ponCard[i][0][1]) {
                this.kanCard.push([tile, this.ponCard[i][0], this.ponCard[i][1], this.ponCard[i][2], this.ponCard[i][3]]);
                this.ponCard.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}

function test() {
    a = new HandCard();
    a.draw('s1');
    a.draw('s2');
    a.draw('s3');
    a.draw('s4');
    a.draw('p5');
    a.draw('p5');
    a.draw('w5');
    a.draw('w5');
    a.draw('w5');
    a.draw('w1');
    a.draw('w1');
    a.draw('w1');
    a.draw('w1');
    a.chi('s5', 's3', 's4');
    a.pon('p5r', 'front');
    a.minKan('w5r', 'right');
    a.anKan('w1');
    a.discard('s1');
    console.log(a.card);
    console.log(a.chiCard);
    console.log(a.ponCard);
    console.log(a.kanCard);
    a.kaKan('p5r');
    console.log(a.ponCard);
    console.log(a.kanCard);
}


if (require.main === module) {
    test();
  }


module.exports = HandCard;
