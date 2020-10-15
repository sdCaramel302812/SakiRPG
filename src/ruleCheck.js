const HandCard = require('./handCard.js');
const utils = require('./utils.js');
const Point = require('./point.js');
const e = require('express');
const { util } = require('chai');


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
    if (i != 6 && utils.isSameTile(card.card[i * 2], card.card[(i + 1) * 2])) {
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
        if (remain.length >= 3 && 
                    utils.isSameTile(remain[0], remain[1]) && 
                    utils.isSameTile(remain[0], remain[2])) {
          // s1 s1 s1
          remain.splice(0, 3);
          continue;
        } else if (remain.length >= 3 && utils.checkOrder[remain[0]] <= 27 &&
                utils.checkOrder[remain[2]] - utils.checkOrder[remain[1]] === 1 && 
                utils.checkOrder[remain[2]] - utils.checkOrder[remain[0]] === 2) {
          // s1 s2 s3
          remain.splice(0, 3);
          continue;
        } else if (remain.length >= 4 && utils.checkOrder[remain[0]] <= 27 &&
                utils.checkOrder[remain[3]] == utils.checkOrder[remain[2]] &&
                utils.checkOrder[remain[3]] == utils.checkOrder[remain[1]]
        ) {
          // s1 s2 s2 s2 s2 s3
          remain.splice(1, 3);
          continue;
        } else if (remain.length >= 4 && utils.checkOrder[remain[0]] <= 27 &&
                utils.checkOrder[remain[3]] - utils.checkOrder[remain[2]] === 1 &&
                utils.checkOrder[remain[3]] - utils.checkOrder[remain[0]] === 2) {
          // s1 s2 s2 s3 s3 s4
          remain.splice(0, 2);
          remain.splice(1, 1);
          continue;
        } else if (remain.length >= 5 && utils.checkOrder[remain[0]] <= 27 &&
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
      other[utils.checkOrder[card.card[i]] - 31] += 1;
    } else if (utils.checkOrder[card.card[i]] > 20) {
      sou[utils.checkOrder[card.card[i]] - 21] += 1;
    } else if (utils.checkOrder[card.card[i]] > 10) {
      man[utils.checkOrder[card.card[i]] - 11] += 1;
    } else {
      pin[utils.checkOrder[card.card[i]] - 1] += 1;
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
 * @param {[string]} dora 
 * @param {[string]} uradora 
 * @returns {object} point object
 */
function pointCheck(card, chanfon, menfon, first, last, rinshan, chankan, ibatsu, dora, uradora) {
  if (winCheck(card)) {
    const yaku = new Point();

    let minKo19 = 0;
    let anKo19 = 0;
    let minKo28 = 0;
    let anKo28 = 0;
    let minKan19 = 0;
    let anKan19 = 0;
    let minKan28 = 0;
    let anKan28 = 0;
    let pair = '';
    let tenPaiFu = true;
    let pinHu = true;
    let peiKo = 0;
    let ipekoWithPair = '';
    let chitoi = false;
    let tanyao = true;
    let menzen = true;

    let lastTile = card.ronTile || card.newTile;
    // TODO uncertain variable ( see old code )

    let mentsu = [];

    if (card.chiCard.length > 0 || card.ponCard.length > 0) {
      menzen = false;
    }
    // count minko, yaku hai
    for (let i = 0; i < card.ponCard.length; ++i) {
      if (card.ponCard[i][0] == 'p1' ||
                card.ponCard[i][0] == 'p9' ||
                card.ponCard[i][0] == 'w1' ||
                card.ponCard[i][0] == 'w9' ||
                card.ponCard[i][0] == 's1' ||
                checkOrder(card.ponCard[i][0]) >= 29) {
        minKo19 += 1;
        if (card.ponCard[i][0] == chanfon) {
          yaku.yaku.CHAN_FON = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.ponCard[i][0] == menfon) {
          yaku.yaku.MEN_FON = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.ponCard[i][0] == '5H') {
          yaku.yaku.HAKU = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.ponCard[i][0] == '6F') {
          yaku.yaku.FA = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.ponCard[i][0] == '7C') {
          yaku.yaku.CHUN = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
      } else {
        minKo28 += 1;
      }
    }

    // count kan, yaku hai
    for (let i = 0; i < card.kanCard.length; ++i) {
      if (card.kanCard[i][0] == 'p1' ||
                card.kanCard[i][0] == 'p9' ||
                card.kanCard[i][0] == 'w1' ||
                card.kanCard[i][0] == 'w9' ||
                card.kanCard[i][0] == 's1' ||
                checkOrder(card.kanCard[i][0]) >= 29) {
        if (card.kanCard[i][4] == 'self') {
          anKan19 += 1;
        } else {
          minKan19 += 1;
          menzen = false;
        }
        if (card.kanCard[i][0] == chanfon) {
          yaku.yaku.CHAN_FON = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.kanCard[i][0] == menfon) {
          yaku.yaku.MEN_FON = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.kanCard[i][0] == '5H') {
          yaku.yaku.HAKU = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.kanCard[i][0] == '6F') {
          yaku.yaku.FA = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
        if (card.kanCard[i][0] == '7C') {
          yaku.yaku.CHUN = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
        }
      } else {
        if (card.kanCard[i][4] == 'self') {
          anKan28 += 1;
        } else {
          minKan28 += 1;
        }
      }
    }

    // check kokushi
    const isKokushi = kokushiCheck(card);
    if (isKokushi) {
      // TODO
    }

    // find mentsu
    if (card.card.length == 2) {
      pair = card.card[0];
      tenPaiFu = true;
    } else if (!isKokushi) {
      let done = false;

      for (let i = 0; i < card.card.length - 1; ++i) {
        if (done) {
          break;
        }
        // find pair
        let remain = Object.assign([], card.card);
        if (utils.isSameTile(remain[i], remain[i + 1])) {
          pair = remain[i];
          if (pair === chanfon || pair == menfon || utils.checkOrder[pair] >= 35) {
            pinHu = false;
          } else {
            pinHu = true;
          }

          remain.splice(i, 2);
          mentsu = [];
          peiKo = 0;
          ipekoWithPair = 0;

          // check mentsu
          while (true) {
            if (remain.length == 0) {
              done = true;
              break;
            }
            // TODO special case
            // s1 s1 s1 s2 s2 s2 s3 s3 s3
            // s2 s2 s2 s2 s3 s3 s3 s3 s4 s4 s4 s4 s5 s5
            if (remain.length >= 3 && 
                            utils.isSameTile(remain[0], remain[1]) && 
                            utils.isSameTile(remain[0], remain[2])) {
              // s1 s1 s1
              mentsu.push([remain[0], remain[1], remain[2]]);
              remain.splice(0, 3);
              continue;
            } else if (remain.length >= 3 &&  utils.checkOrder[remain[0]] <= 27 &&
                        utils.checkOrder[remain[2]] - utils.checkOrder[remain[1]] === 1 && 
                        utils.checkOrder[remain[2]] - utils.checkOrder[remain[0]] === 2) {
              // s1 s2 s3
              mentsu.push([remain[0], remain[1], remain[2]]);
              remain.splice(0, 3);
              continue;
            } else if (remain.length >= 4 && utils.checkOrder[remain[0]] <= 27 &&
                        utils.checkOrder[remain[3]] == utils.checkOrder[remain[2]] &&
                        utils.checkOrder[remain[3]] == utils.checkOrder[remain[1]]
            ) {
              // s1 s2 s2 s2 s2 s3
              mentsu.push([remain[1], remain[2], remain[3]]);
              remain.splice(1, 3);
              continue;
            } else if (remain.length >= 4 && utils.checkOrder[remain[0]] <= 27 &&
                        utils.checkOrder[remain[3]] - utils.checkOrder[remain[2]] === 1 &&
                        utils.checkOrder[remain[3]] - utils.checkOrder[remain[0]] === 2) {
              // s1 s2 s2 s3 s3 s4
              mentsu.push([remain[0], remain[1], remain[3]]);
              remain.splice(0, 2);
              remain.splice(1, 1);
              continue;
            } else if (remain.length >= 5 && utils.checkOrder[remain[0]] <= 27 &&
                        utils.checkOrder[remain[4]] - utils.checkOrder[remain[3]] === 1 &&
                        utils.checkOrder[remain[4]] - utils.checkOrder[remain[0]] === 2) {
              // s1 s1 s2 s2 s3 s3
              peiKo += 1;
              // TODO i pei ko case
              mentsu.push([remain[0], remain[2], remain[4]]);
              remain.splice(0, 1);
              remain.splice(2, 2);
              continue;
            } else {
              break;
            }
            // TODO daisharin case
          }
        }
      }
    }

    if (chitoiCheck(card)) {
      chitoi = true;
      yaku.yaku.CHI_TOI = true;
    }
    // check an ko and pinhu
    for (let i = 0; i < mentsu.length; ++i) {
      if (utils.isSameTile(mentsu[i][0], mentsu[i][1])) {
        let isAnko = true;
        if (utils.isSameTile(mentsu[i][0], card.ronTile)) {
          isAnko = false;
        }
        if (mentsu[i][0] == chanfon) {
          yaku.yaku.CHAN_FON = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
          if (isAnko) {
            anKo19 += 1;
          } else {
            minKo19 += 1;
          }
          tanyao = false;
        } else if (mentsu[i][0] == menfon) {
          yaku.yaku.MEN_FON = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
          if (isAnko) {
            anKo19 += 1;
          } else {
            minKo19 += 1;
          }
          tanyao = false;
        } else if (mentsu[i][0] == '5H') {
          yaku.yaku.HAKU = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
          if (isAnko) {
            anKo19 += 1;
          } else {
            minKo19 += 1;
          }
          tanyao = false;
        } else if (mentsu[i][0] == '6F') {
          yaku.yaku.FA = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
          if (isAnko) {
            anKo19 += 1;
          } else {
            minKo19 += 1;
          }
          tanyao = false;
        } else if (mentsu[i][0] == '7C') {
          yaku.yaku.CHUN = true;
          yaku.property.noYaku = false;
          yaku.property.han += 1;
          if (isAnko) {
            anKo19 += 1;
          } else {
            minKo19 += 1;
          }
          tanyao = false;
        } else if (mentsu[i][0] == 's1' || mentsu[i][0] == 's9' ||
                mentsu[i][0] == 'w1' || mentsu[i][0] == 'w9' ||
                mentsu[i][0] == 'p1' || mentsu[i][0] == 'p9') {
          if (isAnko) {
            anKo19 += 1;
          } else {
            minKo19 += 1;
          }
          tanyao = false;
        } else {
          if (isAnko) {
            anKo28 += 1;
          } else {
            minKo28 += 1;
          }
        }
      } else {
        if (!pinHu) {
          continue;
        }
        if (!menzen) {
          pinHu = false;
          continue;
        }
        if (anKan19 != 0 || anKan28 != 0 || anKo19 != 0 || anKo28 != 0) {
          pinHu = false;
          continue;
        }
        if ((utils.isSameTile(mentsu[i][0], lastTile) && mentsu[i][2] != 's9' && mentsu[i][2] != 'w9' && mentsu[i][2] != 'p9') ||
                    (utils.isSameTile(mentsu[i][2], lastTile) && mentsu[i][0] != 's1' && mentsu[i][0] != 'w1' && mentsu[i][0] != 'p1')) {
          tenPaiFu = false;
        }
      }
    }

    // count fu
    let fu = 20;
    fu += minKo28 * 2;
    fu += anKo28 * 4;
    fu += minKo19 * 4;
    fu += anKo19 * 8;
    fu += minKan28 * 8;
    fu += anKan28 * 16;
    fu += minKan19 * 16;
    fu += anKan19 * 32;
    if (pair == chanfon || pair == menfon || pair == '5H' || pair == '6F' || pair == '7C') {
      fu += 2;
    }
    if (card.newTile) {
      fu += 2;
    }
    if (tenPaiFu) {
      fu += 2;
    }
    if (menzen && card.ronTile) {
      fu += 10;
    }
    if (pinHu && card.newTile) {
      fu = 20;
    }
    if (pinHu && card.ronTile) {
      fu = 30;
    }
    fu = Math.ceil(fu / 10) * 10;

    //
    //  check yaku
    //

    // aka dora
    for (i of card.card) {
      if (i == 'p5r' || i == 'w5r' || i == 's5r') {
        yaku.property.akadora += 1;
        yaku.property.han += 1;
      }
    }
    for (eat of card.chiCard) {
      for (i of eat) {
        if (i == 'p5r' || i == 'w5r' || i == 's5r') {
          yaku.property.akadora += 1;
          yaku.property.han += 1;
        }
      }
    }
    for (pon of card.ponCard) {
      for (i of pon) {
        if (i == 'p5r' || i == 'w5r' || i == 's5r') {
          yaku.property.akadora += 1;
          yaku.property.han += 1;
        }
      }
    }
    for (kan of card.kanCard) {
      for (i of kan) {
        if (i == 'p5r' || i == 'w5r' || i == 's5r') {
          yaku.property.akadora += 1;
          yaku.property.han += 1;
        }
      }
    }
    // dora
    for (d of dora) {
      for (i of card.card) {
        if (utils.isSameTile(i, d)) {
          yaku.property.dora += 1;
          yaku.property.han += 1;
        }
      }
      for (eat of card.chiCard) {
        for (i of eat) {
          if (utils.isSameTile(i, d)) {
            yaku.property.dora += 1;
            yaku.property.han += 1;
          }
        }
      }
      for (pon of card.ponCard) {
        for (i of pon) {
          if (utils.isSameTile(i, d)) {
            yaku.property.dora += 1;
            yaku.property.han += 1;
          }
        }
      }
      for (kan of card.kanCard) {
        for (i of kan) {
          if (utils.isSameTile(i, d)) {
            yaku.property.dora += 1;
            yaku.property.han += 1;
          }
        }
      }
    }
    // uradora
    for (d of uradora) {
      for (i of card.card) {
        if (utils.isSameTile(i, d)) {
          yaku.property.uradora += 1;
          yaku.property.han += 1;
        }
      }
      for (eat of card.chiCard) {
        for (i of eat) {
          if (utils.isSameTile(i, d)) {
            yaku.property.uradora += 1;
            yaku.property.han += 1;
          }
        }
      }
      for (pon of card.ponCard) {
        for (i of pon) {
          if (utils.isSameTile(i, d)) {
            yaku.property.uradora += 1;
            yaku.property.han += 1;
          }
        }
      }
      for (kan of card.kanCard) {
        for (i of kan) {
          if (utils.isSameTile(i, d)) {
            yaku.property.uradora += 1;
            yaku.property.han += 1;
          }
        }
      }
    }
        
    // pinhu
    if (peiKo == 2) {
      chitoi = false;
    }
    if (pinHu && !tenPaiFu && !chitoi) {
      yaku.yaku.PIN_HU = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // tanyao
    for (t of card.card) {
      if (t == 'p1' || t == 'p9' || t == 'w1' || t == 'w9' || t == 's1' || utils.checkOrder[t] >= 29) {
        tanyao = false;
      }
    }
    for (chi of card.chiCard) {
      for (t of chi) {
        if (t == 'p1' || t == 'p9' || t == 'w1' || t == 'w9' || t == 's1' || utils.checkOrder[t] >= 29) {
          tanyao = false;
        }
      }
    }
    if (minKan19 || minKo19 || anKan19 || anKo19) {
      tanyao = false;
    }
    if (tanyao) {
      yaku.yaku.TAN_YAO = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // tsumo
    if (menzen && card.newTile) {
      yaku.yaku.MEN_ZEN_TSUMO = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // rinshan
    if (rinshan) {
      yaku.yaku.RIN_SHAN = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // chankan
    if (chankan) {
      yaku.yaku.CHAN_KAN = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // haitei
    if (last && card.newTile) {
      yaku.yaku.HAI_TEI = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // houtei
    if (last && card.ronTile) {
      yaku.yaku.HOU_TEI = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // w richi
    if (first && card.richi) {
      yaku.yaku.W_RICHI = true;
      yaku.property.han += 2;
      yaku.property.noYaku = false;
    }
    // richi
    if (card.richi && !yaku.yaku.W_RICHI) {
      yaku.yaku.RICHI = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // ibatsu
    if (ibatsu) {
      yaku.yaku.I_BATSU = true;
      yaku.property.han += 1;
      yaku.property.noYaku = false;
    }
    // toitoi
    if (anKo19 + anKo28 + anKan19 + anKan28 + minKo19 + minKo28 + minKan19 + minKan28 == 4) {
      yaku.yaku.TOI_TOI = true;
      yaku.property.han += 2;
      yaku.property.noYaku = false;
    }
    // sanshukuJ
    let pin = [0, 0, 0, 0, 0, 0, 0];
    let man = [0, 0, 0, 0, 0, 0, 0];
    let sou = [0, 0, 0, 0, 0, 0, 0];
    for (chi of card.chiCard) {
      let minTile = 50;
      for (t of chi) {
        if (utils.checkOrder[t] < minTile) {
          minTile = utils.checkOrder[t];
        }
      }
      if (minTile > 20) {
        sou[minTile - 21] += 1;
      } else if (minTile > 10) {
        man[minTile - 11] += 1;
      } else {
        pin[minTile - 1] += 1;
      }
    }
    for (m of mentsu) {
      if (utils.isSameTile(m[0], m[1])) {
        continue;
      }
      if (utils.checkOrder[m[0]] > 20) {
        sou[utils.checkOrder[m[0]] - 21] += 1;
      } else if (utils.checkOrder[m[0]] > 10) {
        man[utils.checkOrder[m[0]] - 11] += 1;
      } else {
        pin[utils.checkOrder[m[0]] - 1] += 1;
      }
    }
    if (ipekoWithPair) {
      // TODO check the usage of this parameter
    }
    for (let i = 0; i < 7; ++i) {
      if (pin[i] > 0 && man[i] > 0 && sou[i] > 0) {
        yaku.yaku.SAN_SHUKU_J = true;
        yaku.property.noYaku = false;
        if (menzen) {
          yaku.property.han += 2;
        } else {
          yaku.property.han += 1;
        }
        break;
      }
    }
    // shanshuku K
    pin = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    man = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    sou = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (pon of card.ponCard) {
      if (utils.checkOrder[pon[0]] > 30) {
        continue;
      } else if (utils.checkOrder[pon[0]] > 20) {
        sou[utils.checkOrder[pon[0]] - 21] += 1;
      } else if (utils.checkOrder[pon[0]] > 10) {
        man[utils.checkOrder[pon[0]] - 11] += 1;
      } else {
        pin[utils.checkOrder[pon[0]] - 1] += 1;
      }
    }
    for (kan of card.ponCard) {
      if (utils.checkOrder[kan[0]] > 30) {
        continue;
      } else if (utils.checkOrder[kan[0]] > 20) {
        sou[utils.checkOrder[kan[0]] - 21] += 1;
      } else if (utils.checkOrder[kan[0]] > 10) {
        man[utils.checkOrder[kan[0]] - 11] += 1;
      } else {
        pin[utils.checkOrder[kan[0]] - 1] += 1;
      }
    }
    for (m of mentsu) {
      if (!utils.isSameTile(m[0], m[1])) {
        continue;
      }
      if (utils.checkOrder[m[0]] > 30) {
        continue;
      } else if (utils.checkOrder[m[0]] > 20) {
        sou[utils.checkOrder[m[0]] - 21] += 1;
      } else if (utils.checkOrder[m[0]] > 10) {
        man[utils.checkOrder[m[0]] - 11] += 1;
      } else {
        pin[utils.checkOrder[m[0]] - 1] += 1;
      }
    }
    for (let i = 0; i < 9; ++i) {
      if (pin[i] > 0 && man[i] > 0 && sou[i] > 0) {
        yaku.yaku.SAN_SHUKU_K = true;
        yaku.property.noYaku = false;
        yaku.property.han += 2;
        break;
      }
    }
    // ikki
    pin = [0, 0, 0];
    man = [0, 0, 0];
    sou = [0, 0, 0];
    for (chi of card.chiCard) {
      let minTile = 50;
      for (t of chi) {
        if (utils.checkOrder[t] < minTile) {
          minTile = utils.checkOrder[t];
        }
        if (minTile == 1) {
          pin[0] += 1;
        } else if (minTile == 4) {
          pin[1] += 1;
        } else if (minTile == 7) {
          pin[2] += 1;
        } else if (minTile == 11) {
          man[0] += 1;
        } else if (minTile == 14) {
          man[1] += 1;
        } else if (minTile == 17) {
          man[2] += 1;
        } else if (minTile == 21) {
          sou[0] += 1;
        } else if (minTile == 24) {
          sou[1] += 1;
        } else if (minTile == 27) {
          sou[2] += 1;
        }
      }
      for (m of mentsu) {
        let minTile = utils.checkOrder[m[0]];
        if (minTile == 1) {
          pin[0] += 1;
        } else if (minTile == 4) {
          pin[1] += 1;
        } else if (minTile == 7) {
          pin[2] += 1;
        } else if (minTile == 11) {
          man[0] += 1;
        } else if (minTile == 14) {
          man[1] += 1;
        } else if (minTile == 17) {
          man[2] += 1;
        } else if (minTile == 21) {
          sou[0] += 1;
        } else if (minTile == 24) {
          sou[1] += 1;
        } else if (minTile == 27) {
          sou[2] += 1;
        }
      }
      if ((pin[0] > 0 && pin[1] > 0 && pin[2] > 0) || 
            (man[0] > 0 && man[1] > 0 && man[2] > 0) ||
            (sou[0] > 0 && sou[1] > 0 && sou[2] > 0)) {
        yaku.yaku.IKKI = true;
        yaku.property.noYaku = false;
        if (menzen) {
          yaku.property.han += 2;
        } else {
          yaku.property.han += 1;
        }
      }
    }
    // san an ko
    if (anKo19 + anKo28 + anKan19 + anKan28 == 3) {
      yaku.yaku.SAN_AN_KO = true;
      yaku.property.noYaku = false;
      yaku.property.han += 2;
    }
    // san kan tsu
    if (minKan19 + minKan28 + anKan19 + anKan28 == 3) {
      yaku.yaku.SAN_KAN_TSU = true;
      yaku.property.noYaku = false;
      yaku.property.han += 2;
    }
    // ryan pei ko
    if (peiKo == 2 && menzen) {
      yaku.yaku.RYAN_PEI_KO = true;
      yaku.property.noYaku = false;
      yaku.property.han += 3;
    }
    if (chitoi && peiko != 2) {
      if (chitoi) {
        fu = 25;
      }
    }
    // i pei ko
    if (peiKo == 1 && !chitoi && menzen) {
      yaku.yaku.I_PEI_KO = true;
      yaku.property.noYaku = false;
      yaku.property.han += 1;
    }
    // chi toi
    if (chitoi && peiKo != 2) {
      yaku.yaku.CHI_TOI = true;
      yaku.property.noYaku = false;
      yaku.property.han += 2;
    }
    // chin i tsu, hon i tsu
    let chin = true;
    let hon = true;
    let color = [0, 0, 0, 0];
    for (t of card.card) {
      color[Math.floor(utils.checkOrder[t] / 10)] += 1;
    }
    for (t of card.chiCard) {
      color[Math.floor(utils.checkOrder[t[0]] / 10)] += 1;
    }
    for (t of card.ponCard) {
      color[Math.floor(utils.checkOrder[t[0]] / 10)] += 1;
    }
    for (t of card.kanCard) {
      color[Math.floor(utils.checkOrder[t[0]] / 10)] += 1;
    }
    if ((color[0] > 0 && color[1] > 0) || (color[0] > 0 && color[2] > 0) || (color[1] > 0 && color[2] > 0)) {
      hon = false;
      chin = false;
    }
    if (color[3] > 0) {
      chin = false;
    }
    if (chin) {
      yaku.yaku.CHIN_I_TSU = true;
      yaku.property.noYaku = false;
      if (menzen) {
        yaku.property.han += 6;
      } else {
        yaku.property.han += 5;
      }
    }
    if (hon && !chin) {
      yaku.yaku.HON_I_TSU = true;
      yaku.property.noYaku = false;
      if (menzen) {
        yaku.property.han += 3;
      } else {
        yaku.property.han += 2;
      }
    }
    // jun chan
    let junchan = true;
    if (yaku.yaku.CHI_TOI) {
      junchan = false;
    }
    let pNumber = utils.checkOrder[pair];
    if (!(pNumber % 10 === 1 || pNumber % 10 === 9)) {
      junchan = false;
    }
    for (chi of card.chiCard) {
      let minTile = 50;
      for (t of chi) {
        if (utils.checkOrder[t] < minTile) {
          minTile = utils.checkOrder[t];
        }
      }
      if (!(minTile % 10 == 1 || minTile % 10 == 7)) {
        junchan = false;
        break;
      }
    }
    for (pon of card.ponCard) {
      let minTile = utils.checkOrder[pon[0]];
      if (minTile > 30 || !(minTile % 10 == 1 || minTile % 10 == 9)) {
        junchan = false;
        break;
      }
    }
    for (kan of card.kanCard) {
      let minTile = utils.checkOrder[kan[0]];
      if (minTile > 30 || !(minTile % 10 == 1 || minTile % 10 == 9)) {
        junchan = false;
        break;
      }
    }
    for (m of mentsu) {
      let minTile = utils.checkOrder[m[0]];
      if (utils.isSameTile(m[0], m[1])) {
        if (minTile > 30 || !(minTile % 10 == 1 || minTile % 10 == 9)) {
          junchan = false;
          break;
        }
      } else {
        if (!(minTile % 10 == 1 || minTile % 10 == 7)) {
          junchan = false;
          break;
        }
      }
    }
    if (junchan) {
      yaku.yaku.JUN_CHAN = true;
      yaku.property.noYaku = false;
      if (menzen) {
        yaku.property.han += 3;
      } else {
        yaku.property.han += 2;
      }
    }
    // hon ro to
    if (minKo19 + minKan19 + anKo19 + anKan19 == 4 && 
        (pair == 'p1' || pair == 'p9' || pair == 'w1' || pair == 'w9' || pair == 's1' || utils.checkOrder[pair] >= 29)) {
      yaku.yaku.HON_RO_ROU = true;
      yaku.property.noYaku = false;
      yaku.property.han += 2;
    }
    if (chitoi) {
      let honroto = true;
      for (t of card.card) {
        let tile = utils.checkOrder[t];
        if (!(tile === 1 || tile === 9 || tile === 11 || tile === 19 || tile === 21 || tile >= 29)) {
          honroto = false;
          break;
        }
      }
      if (honroto) {
        yaku.yaku.HON_RO_ROU = true;
        yaku.property.noYaku = false;
        yaku.property.han += 2;
      }
    }
    // chan ta
    let chanta = true;
    if (yaku.yaku.CHI_TOI) {
      chanta = false;
    }
    pNumber = utils.checkOrder[pair];
    if (!(pNumber % 10 === 1 || pNumber % 10 === 9 || pNumber > 30)) {
      chanta = false;
    }
    for (chi of card.chiCard) {
      let minTile = 50;
      for (t of chi) {
        if (utils.checkOrder[t] < minTile) {
          minTile = utils.checkOrder[t];
        }
      }
      if (!(minTile % 10 == 1 || minTile % 10 == 7)) {
        chanta = false;
        break;
      }
    }
    for (pon of card.ponCard) {
      let minTile = utils.checkOrder[pon[0]];
      if (!(minTile % 10 == 1 || minTile % 10 == 9)) {
        chanta = false;
        break;
      }
    }
    for (kan of card.kanCard) {
      let minTile = utils.checkOrder[kan[0]];
      if (!(minTile % 10 == 1 || minTile % 10 == 9)) {
        chanta = false;
        break;
      }
    }
    for (m of mentsu) {
      let minTile = utils.checkOrder[m[0]];
      if (utils.isSameTile(m[0], m[1])) {
        if (!(minTile % 10 == 1 || minTile % 10 == 9)) {
          chanta = false;
          break;
        }
      } else {
        if (!(minTile % 10 == 1 || minTile % 10 == 7)) {
          chanta = false;
          break;
        }
      }
    }
    if (chanta && !yaku.yaku.JUN_CHAN && ! yaku.yaku.HON_RO_ROU) {
      yaku.yaku.CHAN_TA = true;
      yaku.property.noYaku = false;
      if (menzen) {
        yaku.property.han += 2;
      } else {
        yaku.property.han += 2;
      }
    }
    // sho san gen
    let sangen = 0;
    if (yaku.yaku.HAKU) {
      sangen += 1;
    }
    if (yaku.yaku.FA) {
      sangen += 1;
    }
    if (yaku.yaku.CHUN) {
      sangen += 1;
    }
    if (sangen == 2 && (pair == '5H' || pair == '6F' || pair == '7C')) {
      yaku.yaku.SHOU_SAN_GEN = true;
      yaku.property.noYaku = false;
      yaku.property.han += 2;
    }
    // dai san gen
    if (sangen == 3) {
      yaku.yaku.DAI_SAN_GEN = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    {
      // dai su shi, sho su shi
      let windNumber = 0;
      for (pon of card.ponCard) {
        if (pon[0] == '1E' || pon[0] == '2S' || pon[0] == '3W' || pon[0] == '4N') {
          windNumber += 1;
        }
      }
      for (kan of card.kanCard) {
        if (kan[0] == '1E' || kan[0] == '2S' || kan[0] == '3W' || kan[0] == '4N') {
          windNumber += 1;
        }
      }
      for (m of mentsu) {
        if (m[0] == '1E' || m[0] == '2S' || m[0] == '3W' || m[0] == '4N') {
          windNumber += 1;
        }
      }
      if (windNumber == 4) {
        yaku.yaku.DAI_SU_SHI = true;
        yaku.property.noYaku = false;
        yaku.property.han = 13;
      }
      if (windNumber == 3 && (pair == '1E' || pair == '2S' || pair == '3W' || pair == '4N')) {
        yaku.yaku.SHOU_SU_SHI = true;
        yaku.property.noYaku = false;
        yaku.property.han = 13;
      }
    }
    // chin ro to
    if (card.chiCard.length == 0) {
      let chinroto = true;
      if (chitoi) {
        chinroto = false;
      }
      for (pon of card.ponCard) {
        let tile = utils.checkOrder[pon[0]];
        if (tile > 30 || !(tile % 10 === 1 || tile % 10 === 9)) {
          chinroto = false;
          break;
        }
      }
      for (kan of card.kanCard) {
        let tile = utils.checkOrder[kan[0]];
        if (tile > 30 || !(tile % 10 === 1 || tile % 10 === 9)) {
          chinroto = false;
          break;
        }
      }
      for (m of mentsu) {
        if (utils.isSameTile(m[0], m[1])) {
          let tile = utils.checkOrder[m[0]];
          if (tile > 30 || !(tile % 10 === 1 || tile % 10 === 9)) {
            chinroto = false;
            break;
          }
        } else {
          chinroto = false;
          break;
        }
      }
      if (chinroto) {
        yaku.yaku.CHIN_RO_TOU = true;
        yaku.property.noYaku = false;
        yaku.property.han = 13;
      }
    }
    // su kan tsu
    if (minKan19 + minKan28 + anKan19 + anKan28 == 4) {
      yaku.yaku.SU_KAN_TSU = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    // tsu i so
    if (color[0] === 0 && color[1] === 0 && color[2] === 0) {
      yaku.yaku.TSU_I_SO = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    // ryu i so
    let ryuiso = true;
    if (chitoi) {
      ryuiso = false;
    }
    for (pon of card.ponCard) {
      if (!(pon[0] == 's2' || pon[0] == 's3' || pon[0] == 's4' || pon[0] == 's6' || pon[0] == 's8' || pon[0] == '7F')) {
        ryuiso = false;
        break;
      }
    }
    for (kan of card.kanCard) {
      if (!(kan[0] == 's2' || kan[0] == 's3' || kan[0] == 's4' || kan[0] == 's6' || kan[0] == 's8' || kan[0] == '7F')) {
        ryuiso = false;
        break;
      }
    }
    for (chi of card.chiCard) {
      for (t of chi) {
        if (!(t == 's2' || t == 's3' || t == 's4' || t == 's6' || t == 's8' || t == '7F')) {
          ryuiso = false;
          break;
        }
      }
    }
    for (m of mentsu) {
      for (t of m) {
        if (!(t == 's2' || t == 's3' || t == 's4' || t == 's6' || t == 's8' || t == '7F')) {
          ryuiso = false;
          break;
        }
      }
    }
    if (ryuiso) {
      yaku.yaku.RYU_I_SO = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    // ten ho
    if (first && menfon == '1E') {
      yaku.yaku.TEN_HO = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    // chi ho
    if (first && menfon != '1E') {
      yaku.yaku.CHI_HO = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    // su an ko
    if (anKo19 + anKo28 + anKan19 + anKan28 == 4) {
      yaku.yaku.SU_AN_KO = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    // su an ko dan ki
    if (yaku.yaku.SU_AN_KO && lastTile == pair) {
      yaku.yaku.SU_AN_KO_DANKI = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
    }
    // kokushi
    if (isKokushi) {
      yaku.yaku.KOKUSHI = true;
      yaku.property.noYaku = false;
      yaku.property.han = 13;
      // kokushi 13
      for (let i; i < card.card.length - 1; ++i) {
        if (card.card[i] == card.card[i + 1]) {
          if (card.card[i] == pair) {
            yaku.yaku.KOKUSHI_13;
          }
        }
      }
    }
    {
      // junsei churen
      let chu = true;
      let junsei = false;
      let k = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (menzen && yaku.yaku.CHIN_I_TSU) {
        for (t of card.card) {
          k[utils.checkOrder[t] % 10 - 1] += 1;
        }
        for (let i = 0; i < 9; ++i) {
          if (i == 0 || i == 8) {
            if (k[i] < 3) {
              chu = false;
            }
          } else {
            if (k[i] < 1) {
              chu = false;
            }
          }
        }
      } else {
        chu = false;
      }
      if (chu) {
        if (utils.checkOrder[lastTile] % 10 == 1) {
          if (k[0] == 4) {
            junsei = true;
          }
        } else if (utils.checkOrder[lastTile] % 10 == 9) {
          if (k[8] == 4) {
            junsei = true;
          }
        } else {
          if (k[utils.checkOrder[lastTile] % 10 - 1] == 2) {
            junsei = true;
          }
        }
      }
      if (junsei && chu) {
        yaku.yaku.JUN_SEI_CHU_REN = true;
        yaku.property.noYaku = false;
        yaku.property.han = 13;
      }
      if (!junsei && chu) {
        yaku.yaku.CHU_REN = true;
        yaku.property.noYaku = false;
        yaku.property.han = 13;
      }
    }

    return yaku;
  }
}


// TODO shan ten check

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