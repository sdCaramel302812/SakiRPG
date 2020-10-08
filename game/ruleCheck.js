const HandCard = require('./handCard.js');
const utils = require('./utils.js');
const Point = require('./point.js');


/**
 * 
 * @param {object} card handcard object, 14 tiles
 * @returns {boolean} is chitoi or not
 */
function chitoiCheck(card) {
    if (card.card.length != 14) {
        return false;
    }
    for (let i = 0; i < 7; ++i) {
        if (!utils.isSameTile(card.card[i * 2], card.card[i * 2 + 1])) {
            return false;
        }
    }

    return true;
}

/**
 * 
 * @param {object} card handcard object, 14 tiles
 * @returns {boolean} is koukushi or not 
 */
function kokushiCheck(card) {
    if (card.card.length != 14) {
        return false;
    }
    var has19 = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    for (let i = 0; i < 14; ++i) {
        switch(card.card[i]) {
            case '1E':
                has19[0] = true;
                break;
            case '2S':
                has19[1] = true;
                break;
            case '3W':
                has19[2] = true;
                break;
            case '4N':
                has19[3] = true;
                break;
            case '5H':
                has19[4] = true;
                break;
            case '6F':
                has19[5] = true;
                break;
            case '7C':
                has19[6] = true;
                break;
            case 'w1':
                has19[7] = true;
                break;
            case 'w9':
                has19[8] = true;
                break;
            case 's1':
                has19[9] = true;
                break;
            case 's9':
                has19[10] = true;
                break;
            case 'p1':
                has19[11] = true;
                break;
            case 'p9':
                has19[12] = true;
                break;
            default:
                return false;
        }
    }
    for (let i = 0; i < has19.length; ++i) {
        if (has19[i] == false) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {object} card handcrad object, 14 tiles
 * @returns {boolean} is win or not
 */
function winCheck(card) {
    if (card.card.length % 3 != 2) {
        return false;
    }

    if (chitoiCheck(card) || kokushiCheck(card)) {
        return true;
    }

    if (card.card.length == 2) {
        if (utils.isSameTile(card.card[0], card.card[1])) {
            return true;
        } else {
            return false;
        }
    }

    //  find pair
    for (let i = 0; i < card.card.length - 1; ++i) {
        var remain = Object.assign([], card.card);
        if (utils.isSameTile(remain[i], remain[i + 1])) {
            remain.splice(i, 2);

            // check mentsu
            while (true) {
                if (remain.length == 0) {
                    return true;
                }
                if (remain.length >= 3 && utils.isSameTile(remain[0], remain[1]) && utils.isSameTile(remain[0], remain[2])) {
                    // s1 s1 s1
                    remain.splice(0, 3);
                    continue;
                } else if (remain.length >= 3 && 
                utils.checkOrder[remain[2]] - utils.checkOrder[remain[1]] === 1 && 
                utils.checkOrder[remain[2]] - utils.checkOrder[remain[0]] === 2) {
                    // s1 s2 s3
                    remain.splice(0, 3);
                    continue;
                } else if (remain.length >= 4 &&
                utils.checkOrder[remain[3]] == utils.checkOrder[remain[2]] &&
                utils.checkOrder[remain[3]] == utils.checkOrder[remain[1]]
                ) {
                    // s1 s2 s2 s2 s2 s3
                    remain.splice(1, 3);
                    continue;
                } else if (remain.length >= 4 &&
                utils.checkOrder[remain[3]] - utils.checkOrder[remain[2]] === 1 &&
                utils.checkOrder[remain[3]] - utils.checkOrder[remain[0]] === 2) {
                    // s1 s2 s2 s3 s3 s4
                    remain.splice(0, 2);
                    remain.splice(1, 1);
                    continue;
                } else if (remain.length >= 5 &&
                utils.checkOrder[remain[4]] - utils.checkOrder[remain[3]] === 1 &&
                utils.checkOrder[remain[4]] - utils.checkOrder[remain[0]] === 2) {
                    // s1 s1 s2 s2 s3 s3
                    remain.splice(0, 1);
                    remain.splice(2, 2);
                    continue;
                } else {
                    break;
                }
            }
        }
    }

    return false;
}

/**
 * 
 * @param {object} card handcard object, 13 tiles
 * @returns {array} wait which tiles
 */
function tenpaiCheck(card) {
    let result = [];
    let pin = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let man = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sou = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let other = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < card.card.length; ++i) {
        if (utils.checkOrder[card.card[i]] > 30) {
            ++other[utils.checkOrder[card.card[i]] - 31];
        } else if (utils.checkOrder[card.card[i]] > 20) {
            ++sou[utils.checkOrder[card.card[i]] - 21];
        } else if (utils.checkOrder[card.card[i]] > 10) {
            ++man[utils.checkOrder[card.card[i]] - 11];
        } else {
            ++pin[utils.checkOrder[card.card[i]] - 1];
        }
    }

    let checkCard = Object.assign({}, card);
    checkCard.draw = card.draw;
    checkCard.discard = card.discard;
    // check 1
    if ((pin[0] > 0 || pin[1] > 0) && pin[0] < 4) {
        checkCard.draw(utils.arr[0]);
        if (winCheck(checkCard)) {
            result.push(utils.arr[0]);
        }
        checkCard.discard(utils.arr[0]);
    }
    if ((man[0] > 0 || man[1] > 0) && man[0] < 4) {
        checkCard.draw(utils.arr[9]);
        if (winCheck(checkCard)) {
            result.push(utils.arr[9]);
        }
        checkCard.discard(utils.arr[9]);
    }
    if ((sou[0] > 0 || sou[1] > 0) && sou[0] < 4) {
        checkCard.draw(utils.arr[18]);
        if (winCheck(checkCard)) {
            result.push(utils.arr[18]);
        }
        checkCard.discard(utils.arr[18]);
    }
    // check 2 ~ 8
    for (let i = 1; i < 8; ++i) {
        if ((pin[i - 1] > 0 || pin[i] > 0 || pin[i + 1] > 0) && pin[i] < 4) {
            checkCard.draw(utils.arr[i]);
            if (winCheck(checkCard)) {
                result.push(utils.arr[i]);
            }
            checkCard.discard(utils.arr[i]);
        }
        if ((man[i - 1] > 0 || man[i] > 0 || man[i + 1] > 0) && man[i] < 4) {
            checkCard.draw(utils.arr[i + 9]);
            if (winCheck(checkCard)) {
                result.push(utils.arr[i + 9]);
            }
            checkCard.discard(utils.arr[i + 9]);
        }
        if ((sou[i - 1] > 0 || sou[i] > 0 || sou[i + 1] > 0) && sou[i] < 4) {
            checkCard.draw(utils.arr[i + 18]);
            if (winCheck(checkCard)) {
                result.push(utils.arr[i + 18]);
            }
            checkCard.discard(utils.arr[i + 18]);
        }
    }
    // check 9
    if ((pin[8] > 0 || pin[7] > 0) && pin[8] < 4) {
        checkCard.draw(utils.arr[8]);
        if (winCheck(checkCard)) {
            result.push(utils.arr[8]);
        }
        checkCard.discard(utils.arr[8]);
    }
    if ((man[8] > 0 || man[7] > 0) && man[8] < 4) {
        checkCard.draw(utils.arr[17]);
        if (winCheck(checkCard)) {
            result.push(utils.arr[17]);
        }
        checkCard.discard(utils.arr[17]);
    }
    if ((sou[8] > 0 || sou[7] > 0) && sou[8] < 4) {
        checkCard.draw(utils.arr[26]);
        if (winCheck(checkCard)) {
            result.push(utils.arr[26]);
        }
        checkCard.discard(utils.arr[26]);
    }
    // check tsupai
    for (let i = 0; i < 7; ++i) {
        if (other[i] > 0 && other[i] < 4) {
            checkCard.draw(utils.arr[i + 27]);
            if (winCheck(checkCard)) {
                result.push(utils.arr[i + 27]);
            }
            checkCard.discard(utils.arr[i + 27]);
        }
    }

    return result;
}

/**
 * 
 * @param {object} card hand card object, 14 tiless
 * @returns {[string, array]} throw which to tenpai and wait which tiles
 */
function richiCheck(card) {
    let result = [];

    let checkCard = Object.assign({}, card);
    checkCard.draw = card.draw;
    checkCard.discard = card.discard;
    for (let i = 0; i < checkCard.card.length; ++i) {
        let currTile = checkCard.card[i]; 
        checkCard.discard(currTile);
        const tenpai = tenpaiCheck(checkCard);
        if (tenpai.length > 0) {
            result.push([currTile, tenpai]);
        }
        checkCard.draw(currTile);
    }

    return result;
}

/**
 * 
 * @param {object} card hand card object, 14 tiles
 * @param {string} chanfon 
 * @param {string} menfon 
 * @param {boolean} first check w richi, tenho, chiho
 * @param {boolean} last check haitei, houtei
 * @param {boolean} rinshan 
 * @param {boolean} chankan 
 * @param {boolean} ibatsu 
 * @param {string} dora 
 * @param {string} uradora 
 */
function pointCheck(card, chanfon, menfon, first, last, rinshan, chankan, ibatsu, dora, uradora) {
    if (winCheck(card)) {
        const yaku = new Point();

        let cardCopy = Object.assign({}, card);

        let minKo19 = 0;
        let anKo19 = 0;
        let minKo28 = 0;
        let anKo28 = 0;
        let minKan19 = 0;
        let anKan19 = 0;
        let minKan28 = 0;
        let anKan28 = 0;
        let pair = '';
        // TODO uncertain variable ( see old code )

        let mentsu = [];

    }
}

function test() {
    var hcard = new HandCard();
    //  chitoi check
    hcard.deal(['w2', 'w2', 'w3', 'w3', 's1', 's1', 's5', 's5r', 'p4', 'p4', 'p9', 'p9', '1E', '1E']);
    console.log('should be true : ' + chitoiCheck(hcard));
    hcard.discard('w2');
    hcard.draw('w1');
    console.log('should be false : ' + chitoiCheck(hcard));
    hcard.deal(['w1', 'w9', 's1', 's9', 'p1', 'p9', '1E', '2S', '3W', '4N', '5H', '6F', '7C' , '7C']);
    console.log(hcard.card);
    console.log('should be true : ' + kokushiCheck(hcard));
    hcard.discard('w1');
    hcard.draw('w2');
    console.log('should be false : ' + kokushiCheck(hcard));
    hcard.deal(['1E', '1E', '1E', 'p1', 'p1', 'p1', 'p2', 'p3', 'p3', 'p4', 'p5', 'p6' , 'p7', 'p8']);
    console.log(winCheck(hcard));
}

if (require.main === module) {
    test();
}

module.exports = {chitoiCheck,
                kokushiCheck,
                winCheck,
                tenpaiCheck,
                richiCheck,
                pointCheck
            };