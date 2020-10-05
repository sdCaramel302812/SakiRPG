const HandCard = require('./handCard.js');
const utils = require('./utils.js');


/**
 * 
 * @param {object} card handcard object
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

                if (remain.length >= 3 && remain[0] === remain[1] && remain[0] === remain[2]) {
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

function tenpaiCheck(card) {

}

function richiCheck(card) {

}

function pointCheck(card) {
    
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